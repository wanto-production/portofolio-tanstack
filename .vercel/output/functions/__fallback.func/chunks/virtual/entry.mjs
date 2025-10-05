import { f as fromWebHandler } from '../nitro/nitro.mjs';
import { createMemoryHistory } from '@tanstack/history';
import { mergeHeaders, json } from '@tanstack/router-core/ssr/client';
import { createSerializationAdapter, isRedirect, isNotFound, isResolvedRedirect, rootRouteId, executeRewriteInput, defaultSerovalPlugins, makeSerovalPlugin } from '@tanstack/router-core';
import { AsyncLocalStorage } from 'node:async_hooks';
import { getOrigin, attachRouterServerSsrUtils } from '@tanstack/router-core/ssr/server';
import { NullProtoObj } from 'rou3';
import { FastURL, FastResponse } from 'srvx';
import invariant from 'tiny-invariant';
import { toCrossJSONStream, toCrossJSONAsync, fromJSON } from 'seroval';
import { jsx } from 'react/jsx-runtime';
import { defineHandlerCallback, renderRouterToStream } from '@tanstack/react-router/ssr/server';
import { RouterProvider } from '@tanstack/react-router';

//#endregion
//#region src/event.ts
var H3Event = class {
	/**
	* Access to the H3 application instance.
	*/
	app;
	/**
	* Incoming HTTP request info.
	*
	* [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Request)
	*/
	req;
	/**
	* Access to the parsed request URL.
	*
	* [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/URL)
	*/
	url;
	/**
	* Event context.
	*/
	context;
	/**
	* @internal
	*/
	static __is_event__ = true;
	/**
	* @internal
	*/
	_res;
	constructor(req, context, app) {
		this.context = context || req.context || new NullProtoObj();
		this.req = req;
		this.app = app;
		const _url = req._url;
		this.url = _url && _url instanceof URL ? _url : new FastURL(req.url);
	}
	/**
	* Prepared HTTP response.
	*/
	get res() {
		if (!this._res) this._res = new H3EventResponse();
		return this._res;
	}
	/**
	* Access to runtime specific additional context.
	*
	*/
	get runtime() {
		return this.req.runtime;
	}
	/**
	* Tell the runtime about an ongoing operation that shouldn't close until the promise resolves.
	*/
	waitUntil(promise) {
		this.req.waitUntil?.(promise);
	}
	toString() {
		return `[${this.req.method}] ${this.req.url}`;
	}
	toJSON() {
		return this.toString();
	}
	/**
	* Access to the raw Node.js req/res objects.
	*
	* @deprecated Use `event.runtime.{node|deno|bun|...}.` instead.
	*/
	get node() {
		return this.req.runtime?.node;
	}
	/**
	* Access to the incoming request headers.
	*
	* @deprecated Use `event.req.headers` instead.
	*
	*/
	get headers() {
		return this.req.headers;
	}
	/**
	* Access to the incoming request url (pathname+search).
	*
	* @deprecated Use `event.url.pathname + event.url.search` instead.
	*
	* Example: `/api/hello?name=world`
	* */
	get path() {
		return this.url.pathname + this.url.search;
	}
	/**
	* Access to the incoming request method.
	*
	* @deprecated Use `event.req.method` instead.
	*/
	get method() {
		return this.req.method;
	}
};
var H3EventResponse = class {
	status;
	statusText;
	_headers;
	get headers() {
		if (!this._headers) this._headers = new Headers();
		return this._headers;
	}
};

//#endregion
//#region src/utils/sanitize.ts
const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
/**
* Make sure the status message is safe to use in a response.
*
* Allowed characters: horizontal tabs, spaces or visible ascii characters: https://www.rfc-editor.org/rfc/rfc7230#section-3.1.2
*/
function sanitizeStatusMessage(statusMessage = "") {
	return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
/**
* Make sure the status code is a valid HTTP status code.
*/
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
	if (!statusCode) return defaultStatusCode;
	if (typeof statusCode === "string") statusCode = +statusCode;
	if (statusCode < 100 || statusCode > 599) return defaultStatusCode;
	return statusCode;
}

//#endregion
//#region src/error.ts
/**
* HTTPError
*/
var HTTPError = class HTTPError extends Error {
	get name() {
		return "HTTPError";
	}
	/**
	* HTTP status code in range [200...599]
	*/
	status;
	/**
	* HTTP status text
	*
	* **NOTE:** This should be short (max 512 to 1024 characters).
	* Allowed characters are tabs, spaces, visible ASCII characters, and extended characters (byte value 128–255).
	*
	* **TIP:** Use `message` for longer error descriptions in JSON body.
	*/
	statusText;
	/**
	* Additional HTTP headers to be sent in error response.
	*/
	headers;
	/**
	* Original error object that caused this error.
	*/
	cause;
	/**
	* Additional data attached in the error JSON body under `data` key.
	*/
	data;
	/**
	* Additional top level JSON body properties to attach in the error JSON body.
	*/
	body;
	/**
	* Flag to indicate that the error was not handled by the application.
	*
	* Unhandled error stack trace, data and message are hidden in non debug mode for security reasons.
	*/
	unhandled;
	/**
	* Check if the input is an instance of HTTPError using its constructor name.
	*
	* It is safer than using `instanceof` because it works across different contexts (e.g., if the error was thrown in a different module).
	*/
	static isError(input) {
		return input instanceof Error && input?.name === "HTTPError";
	}
	/**
	* Create a new HTTPError with the given status code and optional status text and details.
	*
	* @example
	*
	* HTTPError.status(404)
	* HTTPError.status(418, "I'm a teapot")
	* HTTPError.status(403, "Forbidden", { message: "Not authenticated" })
	*/
	static status(status, statusText, details) {
		return new HTTPError({
			...details,
			statusText,
			status
		});
	}
	constructor(arg1, arg2) {
		let messageInput;
		let details;
		if (typeof arg1 === "string") {
			messageInput = arg1;
			details = arg2;
		} else details = arg1;
		const status = sanitizeStatusCode(details?.status || (details?.cause)?.status || details?.status || details?.statusCode, 500);
		const statusText = sanitizeStatusMessage(details?.statusText || (details?.cause)?.statusText || details?.statusText || details?.statusMessage);
		const message = messageInput || details?.message || (details?.cause)?.message || details?.statusText || details?.statusMessage || [
			"HTTPError",
			status,
			statusText
		].filter(Boolean).join(" ");
		super(message, { cause: details });
		this.cause = details;
		Error.captureStackTrace?.(this, this.constructor);
		this.status = status;
		this.statusText = statusText || void 0;
		const rawHeaders = details?.headers || (details?.cause)?.headers;
		this.headers = rawHeaders ? new Headers(rawHeaders) : void 0;
		this.unhandled = details?.unhandled ?? (details?.cause)?.unhandled ?? void 0;
		this.data = details?.data;
		this.body = details?.body;
	}
	/**
	* @deprecated Use `status`
	*/
	get statusCode() {
		return this.status;
	}
	/**
	* @deprecated Use `statusText`
	*/
	get statusMessage() {
		return this.statusText;
	}
	toJSON() {
		const unhandled = this.unhandled;
		return {
			status: this.status,
			statusText: this.statusText,
			unhandled,
			message: unhandled ? "HTTPError" : this.message,
			data: unhandled ? void 0 : this.data,
			...unhandled ? void 0 : this.body
		};
	}
};
function isJSONSerializable(value, _type) {
	if (value === null || value === void 0) return true;
	if (_type !== "object") return _type === "boolean" || _type === "number" || _type === "string";
	if (typeof value.toJSON === "function") return true;
	if (Array.isArray(value)) return true;
	if (typeof value.pipe === "function" || typeof value.pipeTo === "function") return false;
	if (value instanceof NullProtoObj) return true;
	const proto = Object.getPrototypeOf(value);
	return proto === Object.prototype || proto === null;
}

//#endregion
//#region src/response.ts
const kNotFound = /* @__PURE__ */ Symbol.for("h3.notFound");
const kHandled = /* @__PURE__ */ Symbol.for("h3.handled");
function toResponse(val, event, config = {}) {
	if (typeof val?.then === "function") return (val.catch?.((error) => error) || Promise.resolve(val)).then((resolvedVal) => toResponse(resolvedVal, event, config));
	const response = prepareResponse(val, event, config);
	if (typeof response?.then === "function") return toResponse(response, event, config);
	const { onResponse: onResponse$1 } = config;
	return onResponse$1 ? Promise.resolve(onResponse$1(response, event)).then(() => response) : response;
}
function prepareResponse(val, event, config, nested) {
	if (val === kHandled) return new FastResponse(null);
	if (val === kNotFound) val = new HTTPError({
		status: 404,
		message: `Cannot find any route matching [${event.req.method}] ${event.url}`
	});
	if (val && val instanceof Error) {
		const isHTTPError = HTTPError.isError(val);
		const error = isHTTPError ? val : new HTTPError(val);
		if (!isHTTPError) {
			error.unhandled = true;
			if (val?.stack) error.stack = val.stack;
		}
		if (error.unhandled && !config.silent) console.error(error);
		const { onError: onError$1 } = config;
		return onError$1 && !nested ? Promise.resolve(onError$1(error, event)).catch((error$1) => error$1).then((newVal) => prepareResponse(newVal ?? val, event, config, true)) : errorResponse(error, config.debug);
	}
	const eventHeaders = event.res._headers;
	if (!(val instanceof Response)) {
		const res = prepareResponseBody(val, event, config);
		const status = event.res.status;
		return new FastResponse(nullBody(event.req.method, status) ? null : res.body, {
			status,
			statusText: event.res.statusText,
			headers: res.headers && eventHeaders ? mergeHeaders$1(res.headers, eventHeaders) : res.headers || eventHeaders
		});
	}
	if (!eventHeaders) return val;
	return new FastResponse(nullBody(event.req.method, val.status) ? null : val.body, {
		status: val.status,
		statusText: val.statusText,
		headers: mergeHeaders$1(eventHeaders, val.headers)
	});
}
function mergeHeaders$1(base, merge) {
	const mergedHeaders = new Headers(base);
	for (const [name, value] of merge) if (name === "set-cookie") mergedHeaders.append(name, value);
	else mergedHeaders.set(name, value);
	return mergedHeaders;
}
const emptyHeaders = /* @__PURE__ */ new Headers({ "content-length": "0" });
const jsonHeaders = /* @__PURE__ */ new Headers({ "content-type": "application/json;charset=UTF-8" });
function prepareResponseBody(val, event, config) {
	if (val === null || val === void 0) return {
		body: "",
		headers: emptyHeaders
	};
	const valType = typeof val;
	if (valType === "string") return { body: val };
	if (val instanceof Uint8Array) {
		event.res.headers.set("content-length", val.byteLength.toString());
		return { body: val };
	}
	if (isJSONSerializable(val, valType)) return {
		body: JSON.stringify(val, void 0, config.debug ? 2 : void 0),
		headers: jsonHeaders
	};
	if (valType === "bigint") return {
		body: val.toString(),
		headers: jsonHeaders
	};
	if (val instanceof Blob) {
		const headers = {
			"content-type": val.type,
			"content-length": val.size.toString()
		};
		let filename = val.name;
		if (filename) {
			filename = encodeURIComponent(filename);
			headers["content-disposition"] = `filename="${filename}"; filename*=UTF-8''${filename}`;
		}
		return {
			body: val.stream(),
			headers
		};
	}
	if (valType === "symbol") return { body: val.toString() };
	if (valType === "function") return { body: `${val.name}()` };
	return { body: val };
}
function nullBody(method, status) {
	return method === "HEAD" || status === 100 || status === 101 || status === 102 || status === 204 || status === 205 || status === 304;
}
function errorResponse(error, debug) {
	return new FastResponse(JSON.stringify({
		...error.toJSON(),
		stack: debug && error.stack ? error.stack.split("\n").map((l) => l.trim()) : void 0
	}, void 0, debug ? 2 : void 0), {
		status: error.status,
		statusText: error.statusText,
		headers: error.headers ? mergeHeaders$1(jsonHeaders, error.headers) : jsonHeaders
	});
}

function StartServer(props) {
  return /* @__PURE__ */ jsx(RouterProvider, { router: props.router });
}
const defaultStreamHandler = defineHandlerCallback(
  ({ request, router, responseHeaders }) => renderRouterToStream({
    request,
    router,
    responseHeaders,
    children: /* @__PURE__ */ jsx(StartServer, { router })
  })
);
const TSS_FORMDATA_CONTEXT = "__TSS_CONTEXT";
const TSS_SERVER_FUNCTION = Symbol.for("TSS_SERVER_FUNCTION");
const TSS_SERVER_FUNCTION_FACTORY = Symbol.for(
  "TSS_SERVER_FUNCTION_FACTORY"
);
const X_TSS_SERIALIZED = "x-tss-serialized";
const X_TSS_RAW_RESPONSE = "x-tss-raw";
const startStorage = new AsyncLocalStorage();
async function runWithStartContext(context, fn) {
  return startStorage.run(context, fn);
}
function getStartContext(opts) {
  const context = startStorage.getStore();
  if (!context && (void 0 ) !== false) {
    throw new Error(
      `No Start context found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`
    );
  }
  return context;
}
const getServerContextAfterGlobalMiddlewares = () => {
  const start = getStartContext();
  return start.contextAfterGlobalMiddlewares;
};
const getStartOptions = () => getStartContext().startOptions;
const createServerFn = (options, __opts) => {
  const resolvedOptions = __opts || options || {};
  if (typeof resolvedOptions.method === "undefined") {
    resolvedOptions.method = "GET";
  }
  const res = {
    options: resolvedOptions,
    middleware: (middleware) => {
      const newMiddleware = [...resolvedOptions.middleware || []];
      middleware.map((m) => {
        if (TSS_SERVER_FUNCTION_FACTORY in m) {
          if (m.options.middleware) {
            newMiddleware.push(...m.options.middleware);
          }
        } else {
          newMiddleware.push(m);
        }
      });
      const newOptions = {
        ...resolvedOptions,
        middleware: newMiddleware
      };
      const res2 = createServerFn(void 0, newOptions);
      res2[TSS_SERVER_FUNCTION_FACTORY] = true;
      return res2;
    },
    inputValidator: (inputValidator) => {
      const newOptions = { ...resolvedOptions, inputValidator };
      return createServerFn(void 0, newOptions);
    },
    handler: (...args) => {
      const [extractedFn, serverFn] = args;
      const newOptions = { ...resolvedOptions, extractedFn, serverFn };
      const resolvedMiddleware = [
        ...newOptions.middleware || [],
        serverFnBaseToMiddleware(newOptions)
      ];
      return Object.assign(
        async (opts) => {
          return executeMiddleware$1(resolvedMiddleware, "client", {
            ...extractedFn,
            ...newOptions,
            data: opts == null ? void 0 : opts.data,
            headers: opts == null ? void 0 : opts.headers,
            signal: opts == null ? void 0 : opts.signal,
            context: {}
          }).then((d) => {
            if (d.error) throw d.error;
            return d.result;
          });
        },
        {
          // This copies over the URL, function ID
          ...extractedFn,
          // The extracted function on the server-side calls
          // this function
          __executeServer: async (opts, signal) => {
            const serverContextAfterGlobalMiddlewares = getServerContextAfterGlobalMiddlewares();
            const ctx = {
              ...extractedFn,
              ...opts,
              context: {
                ...serverContextAfterGlobalMiddlewares,
                ...opts.context
              },
              signal
            };
            return executeMiddleware$1(resolvedMiddleware, "server", ctx).then(
              (d) => ({
                // Only send the result and sendContext back to the client
                result: d.result,
                error: d.error,
                context: d.sendContext
              })
            );
          }
        }
      );
    }
  };
  const fun = (options2) => {
    return {
      ...res,
      options: {
        ...res.options,
        ...options2
      }
    };
  };
  return Object.assign(fun, res);
};
async function executeMiddleware$1(middlewares, env, opts) {
  var _a;
  const globalMiddlewares = ((_a = getStartOptions()) == null ? void 0 : _a.functionMiddleware) || [];
  const flattenedMiddlewares = flattenMiddlewares([
    ...globalMiddlewares,
    ...middlewares
  ]);
  const next = async (ctx) => {
    const nextMiddleware = flattenedMiddlewares.shift();
    if (!nextMiddleware) {
      return ctx;
    }
    if ("inputValidator" in nextMiddleware.options && nextMiddleware.options.inputValidator && env === "server") {
      ctx.data = await execValidator(
        nextMiddleware.options.inputValidator,
        ctx.data
      );
    }
    const middlewareFn = env === "client" && "client" in nextMiddleware.options ? nextMiddleware.options.client : nextMiddleware.options.server;
    if (middlewareFn) {
      return applyMiddleware(middlewareFn, ctx, async (newCtx) => {
        return next(newCtx).catch((error) => {
          if (isRedirect(error) || isNotFound(error)) {
            return {
              ...newCtx,
              error
            };
          }
          throw error;
        });
      });
    }
    return next(ctx);
  };
  return next({
    ...opts,
    headers: opts.headers || {},
    sendContext: opts.sendContext || {},
    context: opts.context || {}
  });
}
function flattenMiddlewares(middlewares) {
  const seen = /* @__PURE__ */ new Set();
  const flattened = [];
  const recurse = (middleware) => {
    middleware.forEach((m) => {
      if (m.options.middleware) {
        recurse(m.options.middleware);
      }
      if (!seen.has(m)) {
        seen.add(m);
        flattened.push(m);
      }
    });
  };
  recurse(middlewares);
  return flattened;
}
const applyMiddleware = async (middlewareFn, ctx, nextFn) => {
  return middlewareFn({
    ...ctx,
    next: (async (userCtx = {}) => {
      var _a, _b;
      return nextFn({
        ...ctx,
        ...userCtx,
        context: {
          ...ctx.context,
          ...userCtx.context
        },
        sendContext: {
          ...ctx.sendContext,
          ...(_a = userCtx.sendContext) != null ? _a : {}
        },
        headers: mergeHeaders(ctx.headers, userCtx.headers),
        result: userCtx.result !== void 0 ? userCtx.result : userCtx instanceof Response ? userCtx : ctx.result,
        error: (_b = userCtx.error) != null ? _b : ctx.error
      });
    })
  });
};
function execValidator(validator, input) {
  if (validator == null) return {};
  if ("~standard" in validator) {
    const result = validator["~standard"].validate(input);
    if (result instanceof Promise)
      throw new Error("Async validation not supported");
    if (result.issues)
      throw new Error(JSON.stringify(result.issues, void 0, 2));
    return result.value;
  }
  if ("parse" in validator) {
    return validator.parse(input);
  }
  if (typeof validator === "function") {
    return validator(input);
  }
  throw new Error("Invalid validator type!");
}
function serverFnBaseToMiddleware(options) {
  return {
    _types: void 0,
    options: {
      inputValidator: options.inputValidator,
      client: async ({ next, sendContext, ...ctx }) => {
        var _a;
        const payload = {
          ...ctx,
          // switch the sendContext over to context
          context: sendContext
        };
        const res = await ((_a = options.extractedFn) == null ? void 0 : _a.call(options, payload));
        return next(res);
      },
      server: async ({ next, ...ctx }) => {
        var _a;
        const result = await ((_a = options.serverFn) == null ? void 0 : _a.call(options, ctx));
        return next({
          ...ctx,
          result
        });
      }
    }
  };
}
function getDefaultSerovalPlugins() {
  var _a;
  const start = getStartOptions();
  const adapters = start == null ? void 0 : start.serializationAdapters;
  return [
    ...(_a = adapters == null ? void 0 : adapters.map(makeSerovalPlugin)) != null ? _a : [],
    ...defaultSerovalPlugins
  ];
}
const eventStorage = new AsyncLocalStorage();
function requestHandler(handler) {
  return (request, requestOpts) => {
    const h3Event = new H3Event(request);
    const response = eventStorage.run(
      { h3Event },
      () => handler(request, requestOpts)
    );
    return toResponse(response, h3Event);
  };
}
function getH3Event() {
  const event = eventStorage.getStore();
  if (!event) {
    throw new Error(
      `No StartEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`
    );
  }
  return event.h3Event;
}
function getResponse() {
  const event = getH3Event();
  return event._res;
}
const VIRTUAL_MODULES = {
  startManifest: "tanstack-start-manifest:v",
  serverFnManifest: "tanstack-start-server-fn-manifest:v",
  injectedHeadScripts: "tanstack-start-injected-head-scripts:v"
};
async function loadVirtualModule(id) {
  switch (id) {
    case VIRTUAL_MODULES.startManifest:
      return await import('../_/_tanstack-start-manifest_v-Ddnql7OJ.mjs');
    case VIRTUAL_MODULES.serverFnManifest:
      return await import('../_/_tanstack-start-server-fn-manifest_v-BRisrLwE.mjs');
    case VIRTUAL_MODULES.injectedHeadScripts:
      return await import('../_/_tanstack-start-injected-head-scripts_v-cda0Ky0D.mjs');
    default:
      throw new Error(`Unknown virtual module: ${id}`);
  }
}
async function getStartManifest() {
  const { tsrStartManifest } = await loadVirtualModule(
    VIRTUAL_MODULES.startManifest
  );
  const startManifest = tsrStartManifest();
  const rootRoute = startManifest.routes[rootRouteId] = startManifest.routes[rootRouteId] || {};
  rootRoute.assets = rootRoute.assets || [];
  let script = `import('${startManifest.clientEntry}')`;
  rootRoute.assets.push({
    tag: "script",
    attrs: {
      type: "module",
      suppressHydrationWarning: true,
      async: true
    },
    children: script
  });
  const manifest = {
    ...startManifest,
    routes: Object.fromEntries(
      Object.entries(startManifest.routes).map(([k, v]) => {
        const { preloads, assets } = v;
        return [
          k,
          {
            preloads,
            assets
          }
        ];
      })
    )
  };
  return manifest;
}
async function getServerFnById(serverFnId) {
  const { default: serverFnManifest } = await loadVirtualModule(
    VIRTUAL_MODULES.serverFnManifest
  );
  const serverFnInfo = serverFnManifest[serverFnId];
  if (!serverFnInfo) {
    console.info("serverFnManifest", serverFnManifest);
    throw new Error("Server function info not found for " + serverFnId);
  }
  const fnModule = await serverFnInfo.importer();
  if (!fnModule) {
    console.info("serverFnInfo", serverFnInfo);
    throw new Error("Server function module not resolved for " + serverFnId);
  }
  const action = fnModule[serverFnInfo.functionName];
  if (!action) {
    console.info("serverFnInfo", serverFnInfo);
    console.info("fnModule", fnModule);
    throw new Error(
      `Server function module export not resolved for serverFn ID: ${serverFnId}`
    );
  }
  return action;
}
let regex = void 0;
const handleServerAction = async ({
  request,
  context
}) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const abort = () => controller.abort();
  request.signal.addEventListener("abort", abort);
  if (regex === void 0) {
    regex = new RegExp(`${"/_serverFn/"}([^/?#]+)`);
  }
  const method = request.method;
  const url = new URL(request.url, "http://localhost:3000");
  const match = url.pathname.match(regex);
  const serverFnId = match ? match[1] : null;
  const search = Object.fromEntries(url.searchParams.entries());
  const isCreateServerFn = "createServerFn" in search;
  if (typeof serverFnId !== "string") {
    throw new Error("Invalid server action param for serverFnId: " + serverFnId);
  }
  const action = await getServerFnById(serverFnId);
  const formDataContentTypes = [
    "multipart/form-data",
    "application/x-www-form-urlencoded"
  ];
  const contentType = request.headers.get("Content-Type");
  const serovalPlugins = getDefaultSerovalPlugins();
  function parsePayload(payload) {
    const parsedPayload = fromJSON(payload, { plugins: serovalPlugins });
    return parsedPayload;
  }
  const response = await (async () => {
    var _a;
    try {
      let result = await (async () => {
        if (formDataContentTypes.some(
          (type) => contentType && contentType.includes(type)
        )) {
          invariant(
            method.toLowerCase() !== "get",
            "GET requests with FormData payloads are not supported"
          );
          const formData = await request.formData();
          const serializedContext = formData.get(TSS_FORMDATA_CONTEXT);
          formData.delete(TSS_FORMDATA_CONTEXT);
          const params = {
            context,
            data: formData
          };
          if (typeof serializedContext === "string") {
            try {
              const parsedContext = JSON.parse(serializedContext);
              if (typeof parsedContext === "object" && parsedContext) {
                params.context = { ...context, ...parsedContext };
              }
            } catch {
            }
          }
          return await action(params, signal);
        }
        if (method.toLowerCase() === "get") {
          invariant(
            isCreateServerFn,
            "expected GET request to originate from createServerFn"
          );
          let payload = search.payload;
          payload = payload ? parsePayload(JSON.parse(payload)) : payload;
          payload.context = { ...context, ...payload.context };
          return await action(payload, signal);
        }
        if (method.toLowerCase() !== "post") {
          throw new Error("expected POST method");
        }
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("expected application/json content type");
        }
        const jsonPayload = await request.json();
        if (isCreateServerFn) {
          const payload = parsePayload(jsonPayload);
          payload.context = { ...payload.context, ...context };
          return await action(payload, signal);
        }
        return await action(...jsonPayload);
      })();
      if (result.result instanceof Response) {
        result.result.headers.set(X_TSS_RAW_RESPONSE, "true");
        return result.result;
      }
      if (!isCreateServerFn) {
        result = result.result;
        if (result instanceof Response) {
          return result;
        }
      }
      if (isNotFound(result)) {
        return isNotFoundResponse(result);
      }
      const response2 = getResponse();
      let nonStreamingBody = void 0;
      if (result !== void 0) {
        let done = false;
        const callbacks = {
          onParse: (value) => {
            nonStreamingBody = value;
          },
          onDone: () => {
            done = true;
          },
          onError: (error) => {
            throw error;
          }
        };
        toCrossJSONStream(result, {
          refs: /* @__PURE__ */ new Map(),
          plugins: serovalPlugins,
          onParse(value) {
            callbacks.onParse(value);
          },
          onDone() {
            callbacks.onDone();
          },
          onError: (error) => {
            callbacks.onError(error);
          }
        });
        if (done) {
          return new Response(
            nonStreamingBody ? JSON.stringify(nonStreamingBody) : void 0,
            {
              status: response2 == null ? void 0 : response2.status,
              statusText: response2 == null ? void 0 : response2.statusText,
              headers: {
                "Content-Type": "application/json",
                [X_TSS_SERIALIZED]: "true"
              }
            }
          );
        }
        const stream = new ReadableStream({
          start(controller2) {
            callbacks.onParse = (value) => controller2.enqueue(JSON.stringify(value) + "\n");
            callbacks.onDone = () => {
              try {
                controller2.close();
              } catch (error) {
                controller2.error(error);
              }
            };
            callbacks.onError = (error) => controller2.error(error);
            if (nonStreamingBody !== void 0) {
              callbacks.onParse(nonStreamingBody);
            }
          }
        });
        return new Response(stream, {
          status: response2 == null ? void 0 : response2.status,
          statusText: response2 == null ? void 0 : response2.statusText,
          headers: {
            "Content-Type": "application/x-ndjson",
            [X_TSS_SERIALIZED]: "true"
          }
        });
      }
      return new Response(void 0, {
        status: response2 == null ? void 0 : response2.status,
        statusText: response2 == null ? void 0 : response2.statusText
      });
    } catch (error) {
      if (error instanceof Response) {
        return error;
      }
      if (isNotFound(error)) {
        return isNotFoundResponse(error);
      }
      console.info();
      console.info("Server Fn Error!");
      console.info();
      console.error(error);
      console.info();
      const serializedError = JSON.stringify(
        await Promise.resolve(
          toCrossJSONAsync(error, {
            refs: /* @__PURE__ */ new Map(),
            plugins: serovalPlugins
          })
        )
      );
      const response2 = getResponse();
      return new Response(serializedError, {
        status: (_a = response2 == null ? void 0 : response2.status) != null ? _a : 500,
        statusText: response2 == null ? void 0 : response2.statusText,
        headers: {
          "Content-Type": "application/json",
          [X_TSS_SERIALIZED]: "true"
        }
      });
    }
  })();
  request.signal.removeEventListener("abort", abort);
  return response;
};
function isNotFoundResponse(error) {
  const { headers, ...rest } = error;
  return new Response(JSON.stringify(rest), {
    status: 404,
    headers: {
      "Content-Type": "application/json",
      ...headers || {}
    }
  });
}
const HEADERS = {
  TSS_SHELL: "X-TSS_SHELL"
};
const createServerRpc = (functionId, splitImportFn) => {
  const url = "/_serverFn/" + functionId;
  return Object.assign(splitImportFn, {
    url,
    functionId,
    [TSS_SERVER_FUNCTION]: true
  });
};
const ServerFunctionSerializationAdapter = createSerializationAdapter({
  key: "$TSS/serverfn",
  test: (v) => {
    if (typeof v !== "function") return false;
    if (!(TSS_SERVER_FUNCTION in v)) return false;
    return !!v[TSS_SERVER_FUNCTION];
  },
  toSerializable: ({ functionId }) => ({ functionId }),
  fromSerializable: ({ functionId }) => {
    const fn = async (opts, signal) => {
      const serverFn = await getServerFnById(functionId);
      const result = await serverFn(opts != null ? opts : {}, signal);
      return result.result;
    };
    return createServerRpc(functionId, fn);
  }
});
function getStartResponseHeaders(opts) {
  const headers = mergeHeaders(
    {
      "Content-Type": "text/html; charset=utf-8"
    },
    ...opts.router.state.matches.map((match) => {
      return match.headers;
    })
  );
  return headers;
}
function createStartHandler(cb) {
  const ROUTER_BASEPATH = "/";
  let startRoutesManifest = null;
  let startEntry = null;
  let routerEntry = null;
  const getEntries = async () => {
    if (routerEntry === null) {
      routerEntry = await import('../_/router-PHEg3tM6.mjs').then((n) => n.r);
    }
    if (startEntry === null) {
      startEntry = await import('../_/start-HYkvq4Ni.mjs');
    }
    return {
      startEntry,
      routerEntry
    };
  };
  const originalFetch = globalThis.fetch;
  const startRequestResolver = async (request, requestOpts) => {
    var _a;
    const origin = getOrigin(request);
    globalThis.fetch = async function(input, init) {
      function resolve(url2, requestOptions) {
        const fetchRequest = new Request(url2, requestOptions);
        return startRequestResolver(fetchRequest, requestOpts);
      }
      if (typeof input === "string" && input.startsWith("/")) {
        const url2 = new URL(input, origin);
        return resolve(url2, init);
      } else if (typeof input === "object" && "url" in input && typeof input.url === "string" && input.url.startsWith("/")) {
        const url2 = new URL(input.url, origin);
        return resolve(url2, init);
      }
      return originalFetch(input, init);
    };
    const url = new URL(request.url);
    const href = url.href.replace(url.origin, "");
    let router = null;
    const getRouter = async () => {
      var _a2;
      if (router) return router;
      router = await (await getEntries()).routerEntry.getRouter();
      const isPrerendering = process.env.TSS_PRERENDERING === "true";
      let isShell = process.env.TSS_SHELL === "true";
      if (isPrerendering && !isShell) {
        isShell = request.headers.get(HEADERS.TSS_SHELL) === "true";
      }
      const history = createMemoryHistory({
        initialEntries: [href]
      });
      router.update({
        history,
        isShell,
        isPrerendering,
        origin: (_a2 = router.options.origin) != null ? _a2 : origin,
        ...{
          defaultSsr: startOptions.defaultSsr,
          serializationAdapters: startOptions.serializationAdapters
        },
        basepath: ROUTER_BASEPATH
      });
      return router;
    };
    const startOptions = await ((_a = (await getEntries()).startEntry.startInstance) == null ? void 0 : _a.getOptions()) || {};
    startOptions.serializationAdapters = startOptions.serializationAdapters || [];
    startOptions.serializationAdapters.push(ServerFunctionSerializationAdapter);
    const requestHandlerMiddleware = handlerToMiddleware(
      async ({ context }) => {
        const response2 = await runWithStartContext(
          {
            getRouter,
            startOptions,
            contextAfterGlobalMiddlewares: context
          },
          async () => {
            try {
              if (href.startsWith("/_serverFn/")) {
                return await handleServerAction({
                  request,
                  context: requestOpts == null ? void 0 : requestOpts.context
                });
              }
              const executeRouter = async ({
                serverContext
              }) => {
                const requestAcceptHeader = request.headers.get("Accept") || "*/*";
                const splitRequestAcceptHeader = requestAcceptHeader.split(",");
                const supportedMimeTypes = ["*/*", "text/html"];
                const isRouterAcceptSupported = supportedMimeTypes.some(
                  (mimeType) => splitRequestAcceptHeader.some(
                    (acceptedMimeType) => acceptedMimeType.trim().startsWith(mimeType)
                  )
                );
                if (!isRouterAcceptSupported) {
                  return json(
                    {
                      error: "Only HTML requests are supported here"
                    },
                    {
                      status: 500
                    }
                  );
                }
                if (startRoutesManifest === null) {
                  startRoutesManifest = await getStartManifest();
                }
                const router2 = await getRouter();
                attachRouterServerSsrUtils({
                  router: router2,
                  manifest: startRoutesManifest
                });
                router2.update({ additionalContext: { serverContext } });
                await router2.load();
                if (router2.state.redirect) {
                  return router2.state.redirect;
                }
                await router2.serverSsr.dehydrate();
                const responseHeaders = getStartResponseHeaders({ router: router2 });
                const response4 = await cb({
                  request,
                  router: router2,
                  responseHeaders
                });
                return response4;
              };
              const response3 = await handleServerRoutes({
                getRouter,
                request,
                executeRouter
              });
              return response3;
            } catch (err) {
              if (err instanceof Response) {
                return err;
              }
              throw err;
            }
          }
        );
        return response2;
      }
    );
    const flattenedMiddlewares = startOptions.requestMiddleware ? flattenMiddlewares(startOptions.requestMiddleware) : [];
    const middlewares = flattenedMiddlewares.map((d) => d.options.server);
    const ctx = await executeMiddleware(
      [...middlewares, requestHandlerMiddleware],
      {
        request,
        context: (requestOpts == null ? void 0 : requestOpts.context) || {}
      }
    );
    const response = ctx.response;
    if (isRedirect(response)) {
      if (isResolvedRedirect(response)) {
        if (request.headers.get("x-tsr-redirect") === "manual") {
          return json(
            {
              ...response.options,
              isSerializedRedirect: true
            },
            {
              headers: response.headers
            }
          );
        }
        return response;
      }
      if (response.options.to && typeof response.options.to === "string" && !response.options.to.startsWith("/")) {
        throw new Error(
          `Server side redirects must use absolute paths via the 'href' or 'to' options. The redirect() method's "to" property accepts an internal path only. Use the "href" property to provide an external URL. Received: ${JSON.stringify(response.options)}`
        );
      }
      if (["params", "search", "hash"].some(
        (d) => typeof response.options[d] === "function"
      )) {
        throw new Error(
          `Server side redirects must use static search, params, and hash values and do not support functional values. Received functional values for: ${Object.keys(
            response.options
          ).filter((d) => typeof response.options[d] === "function").map((d) => `"${d}"`).join(", ")}`
        );
      }
      const router2 = await getRouter();
      const redirect = router2.resolveRedirect(response);
      if (request.headers.get("x-tsr-redirect") === "manual") {
        return json(
          {
            ...response.options,
            isSerializedRedirect: true
          },
          {
            headers: response.headers
          }
        );
      }
      return redirect;
    }
    return response;
  };
  return requestHandler(startRequestResolver);
}
async function handleServerRoutes({
  getRouter,
  request,
  executeRouter
}) {
  const router = await getRouter();
  let url = new URL(request.url);
  url = executeRewriteInput(router.rewrite, url);
  const pathname = url.pathname;
  const { matchedRoutes, foundRoute, routeParams } = router.getMatchedRoutes(
    pathname,
    void 0
  );
  const middlewares = flattenMiddlewares(
    matchedRoutes.flatMap((r) => {
      var _a;
      return (_a = r.options.server) == null ? void 0 : _a.middleware;
    }).filter(Boolean)
  ).map((d) => d.options.server);
  const server2 = foundRoute == null ? void 0 : foundRoute.options.server;
  if (server2) {
    if (server2.handlers) {
      const handlers = typeof server2.handlers === "function" ? server2.handlers({
        createHandlers: (d) => d
      }) : server2.handlers;
      const requestMethod = request.method.toLowerCase();
      let method = Object.keys(handlers).find(
        (method2) => method2.toLowerCase() === requestMethod
      );
      if (!method) {
        method = Object.keys(handlers).find(
          (method2) => method2.toLowerCase() === "all"
        ) ? "all" : void 0;
      }
      if (method) {
        const handler = handlers[method];
        if (handler) {
          const mayDefer = !!foundRoute.options.component;
          if (typeof handler === "function") {
            middlewares.push(handlerToMiddleware(handler, mayDefer));
          } else {
            const { middleware } = handler;
            if (middleware && middleware.length) {
              middlewares.push(
                ...flattenMiddlewares(middleware).map((d) => d.options.server)
              );
            }
            if (handler.handler) {
              middlewares.push(handlerToMiddleware(handler.handler, mayDefer));
            }
          }
        }
      }
    }
  }
  middlewares.push(
    handlerToMiddleware((ctx2) => executeRouter({ serverContext: ctx2.context }))
  );
  const ctx = await executeMiddleware(middlewares, {
    request,
    context: {},
    params: routeParams,
    pathname
  });
  const response = ctx.response;
  return response;
}
function throwRouteHandlerError() {
  throw new Error("Internal Server Error");
}
function throwIfMayNotDefer() {
  throw new Error("Internal Server Error");
}
function handlerToMiddleware(handler, mayDefer = false) {
  if (mayDefer) {
    return handler;
  }
  return async ({ next: _next, ...rest }) => {
    const response = await handler({ ...rest, next: throwIfMayNotDefer });
    if (!response) {
      throwRouteHandlerError();
    }
    return response;
  };
}
function executeMiddleware(middlewares, ctx) {
  let index = -1;
  const next = async (ctx2) => {
    index++;
    const middleware = middlewares[index];
    if (!middleware) return ctx2;
    let result;
    try {
      result = await middleware({
        ...ctx2,
        // Allow the middleware to call the next middleware in the chain
        next: async (nextCtx) => {
          const nextResult = await next({
            ...ctx2,
            ...nextCtx,
            context: {
              ...ctx2.context,
              ...(nextCtx == null ? void 0 : nextCtx.context) || {}
            }
          });
          return Object.assign(ctx2, handleCtxResult(nextResult));
        }
        // Allow the middleware result to extend the return context
      });
    } catch (err) {
      if (isSpecialResponse(err)) {
        result = {
          response: err
        };
      } else {
        throw err;
      }
    }
    return Object.assign(ctx2, handleCtxResult(result));
  };
  return handleCtxResult(next(ctx));
}
function handleCtxResult(result) {
  if (isSpecialResponse(result)) {
    return {
      response: result
    };
  }
  return result;
}
function isSpecialResponse(err) {
  return isResponse(err) || isRedirect(err);
}
function isResponse(response) {
  return response instanceof Response;
}
const fetch = createStartHandler(defaultStreamHandler);
const server = {
  // Providing `RequestHandler` from `@tanstack/react-start/server` is required so that the output types don't import it from `@tanstack/start-server-core`
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  fetch
};

const entry = fromWebHandler(server.fetch);

const entry$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: entry
});

export { createServerFn as a, createServerRpc as c, entry$1 as e };
//# sourceMappingURL=entry.mjs.map
