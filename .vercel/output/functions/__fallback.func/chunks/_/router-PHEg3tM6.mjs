import { createRouter, createRootRoute, createFileRoute, lazyRouteComponent, HeadContent, Scripts, ScriptOnce, Link } from '@tanstack/react-router';
import { jsxs, jsx } from 'react/jsx-runtime';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { FormDevtoolsPlugin } from '@tanstack/react-form-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { Suspense, lazy, useState, useEffect, createContext, use } from 'react';
import { z } from 'zod';
import * as LuIcons from 'react-icons/lu';
import * as FaIcons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';
import * as SiIcons from 'react-icons/si';
import * as MdIcons from 'react-icons/md';
import * as IoIcons from 'react-icons/io5';
import * as BiIcons from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const UserThemeSchema = z.enum(["light", "dark", "system"]).catch("system");
z.enum(["light", "dark"]).catch("light");
const getStoredUserTheme = () => "system";
const setStoredTheme = () => {
  throw new Error("createClientOnlyFn() functions can only be called on the client!");
};
const getSystemTheme = () => "light";
const handleThemeChange = () => {
  throw new Error("createClientOnlyFn() functions can only be called on the client!");
};
const setupPreferredListener = () => {
  throw new Error("createClientOnlyFn() functions can only be called on the client!");
};
const themeScript = (function() {
  function themeFn() {
    try {
      const storedTheme = localStorage.getItem("ui-theme") || "system";
      const validTheme = ["light", "dark", "system"].includes(storedTheme) ? storedTheme : "system";
      if (validTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        document.documentElement.classList.add(systemTheme, "system");
      } else {
        document.documentElement.classList.add(validTheme);
      }
    } catch (e) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.classList.add(systemTheme, "system");
    }
  }
  return `(${themeFn.toString()})();`;
})();
const ThemeContext = createContext(void 0);
function ThemeProvider({
  children
}) {
  const [userTheme, setUserTheme] = useState(getStoredUserTheme);
  useEffect(() => {
    if (userTheme !== "system") return;
    return setupPreferredListener();
  }, [userTheme]);
  const appTheme = userTheme === "system" ? getSystemTheme() : userTheme;
  const setTheme = (newUserTheme) => {
    const validatedTheme = UserThemeSchema.parse(newUserTheme);
    setUserTheme(validatedTheme);
    setStoredTheme();
    handleThemeChange();
  };
  return /* @__PURE__ */ jsxs(ThemeContext, { value: {
    userTheme,
    appTheme,
    setTheme
  }, children: [
    /* @__PURE__ */ jsx(ScriptOnce, { children: themeScript }),
    children
  ] });
}
const useTheme = () => {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
const icon = "/assets/favicon-AIHPMekL.png";
const toPascalCase = (str, prefix) => {
  const pascal = str.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("");
  return prefix + pascal;
};
function Icon({ name, size = 24, color, className, ...props }) {
  const [prefix, iconName] = name.split(":");
  if (!prefix || !iconName) {
    console.warn(`Invalid icon format: ${name}. Use format "prefix:icon-name"`);
    return null;
  }
  let IconComponent;
  let fullIconName;
  switch (prefix.toLowerCase()) {
    case "lu":
      fullIconName = toPascalCase(iconName, "Lu");
      IconComponent = LuIcons[fullIconName];
      break;
    case "fa":
      fullIconName = toPascalCase(iconName, "Fa");
      IconComponent = FaIcons[fullIconName];
      break;
    case "fa6":
      fullIconName = toPascalCase(iconName, "Fa");
      IconComponent = Fa6Icons[fullIconName];
      break;
    case "si":
      fullIconName = toPascalCase(iconName, "Si");
      IconComponent = SiIcons[fullIconName];
      break;
    case "md":
      fullIconName = toPascalCase(iconName, "Md");
      IconComponent = MdIcons[fullIconName];
      break;
    case "io":
      fullIconName = toPascalCase(iconName, "Io");
      IconComponent = IoIcons[fullIconName];
      break;
    case "bi":
      fullIconName = toPascalCase(iconName, "Bi");
      IconComponent = BiIcons[fullIconName];
      break;
    case "ai":
      fullIconName = toPascalCase(iconName, "Ai");
      IconComponent = AiIcons[fullIconName];
      break;
    default:
      console.warn(`Unknown icon prefix: ${prefix}`);
  }
  if (IconComponent && typeof IconComponent === "function") {
    return /* @__PURE__ */ jsx(
      IconComponent,
      {
        size,
        color,
        className,
        ...props
      }
    );
  }
  console.warn(`Icon "${name}" not found (tried: ${fullIconName})`);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className,
      style: {
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px dashed currentColor",
        borderRadius: "4px",
        fontSize: "10px",
        color: color || "currentColor"
      },
      title: `Icon not found: ${name}`,
      children: "?"
    }
  );
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { userTheme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return /* @__PURE__ */ jsx(Skeleton, { className: "w-9 h-9 rounded-md" });
  }
  const cycleTheme = () => {
    if (userTheme === "light") {
      setTheme("dark");
    } else if (userTheme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };
  const getIcon = () => {
    switch (userTheme) {
      case "light":
        return /* @__PURE__ */ jsx(Icon, { name: "lu:sun", className: "h-4 w-4" });
      case "dark":
        return /* @__PURE__ */ jsx(Icon, { name: "lu:moon", className: "h-4 w-4" });
      case "system":
        return /* @__PURE__ */ jsx(Icon, { name: "lu:monitor", className: "h-4 w-4" });
      default:
        return /* @__PURE__ */ jsx(Icon, { name: "lu:sun", className: "h-4 w-4" });
    }
  };
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: cycleTheme,
      "aria-label": `Switch to ${userTheme === "light" ? "dark" : userTheme === "dark" ? "system" : "light"} theme`,
      children: getIcon()
    }
  );
};
const Header = () => {
  const [isOpen, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs("header", { className: "fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl flex flex-col items-center z-50", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full h-[60px] flex items-center justify-between px-6 \n                  bg-background/80 backdrop-blur-md border border-border \n                  rounded-2xl shadow-lg", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("img", { src: icon, alt: "icon", className: "h-[36px] w-auto rounded-full" }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:inline font-poppins font-semibold text-foreground", children: "Ikhwan Satrio" })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-8 font-inter text-muted-foreground text-sm", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-foreground transition", children: "Home" }),
        /* @__PURE__ */ jsx(Link, { to: "/about", className: "hover:text-foreground transition", children: "About" }),
        /* @__PURE__ */ jsx(Link, { to: "/projects", className: "hover:text-foreground transition", children: "Projects" }),
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "hover:text-foreground transition", children: "Contact" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(ThemeToggle, {}),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://github.com/wanto-production",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-2 px-4 py-2 rounded-xl \n                   bg-gradient-to-r from-blue-600 to-purple-600 text-white \n                   font-medium hover:opacity-90 transition",
            children: [
              /* @__PURE__ */ jsx(Icon, { name: "fa:github" }),
              "Github"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:hidden flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(ThemeToggle, {}),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "text-muted-foreground hover:text-foreground p-2",
            onClick: () => setOpen((prev) => !prev),
            "aria-label": "Toggle menu",
            children: isOpen ? /* @__PURE__ */ jsx(Icon, { name: "lu:x", size: 20 }) : /* @__PURE__ */ jsx(Icon, { name: "lu:menu", size: 20 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `md:hidden absolute top-[72px] left-1/2 -translate-x-1/2 w-[90%] 
          bg-background/95 backdrop-blur-md border border-border 
          rounded-2xl shadow-lg flex flex-col items-center gap-4 py-6 
          transition-all duration-300 z-40
          ${isOpen ? "opacity-100 scale-100 visible pointer-events-auto" : "opacity-0 scale-95 invisible pointer-events-none"}`,
        children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/",
              className: "text-muted-foreground hover:text-foreground font-medium",
              onClick: () => setOpen(false),
              children: "Home"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/about",
              className: "text-muted-foreground hover:text-foreground font-medium",
              onClick: () => setOpen(false),
              children: "About"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/projects",
              className: "text-muted-foreground hover:text-foreground font-medium",
              onClick: () => setOpen(false),
              children: "Projects"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/contact",
              className: "text-muted-foreground hover:text-foreground font-medium",
              onClick: () => setOpen(false),
              children: "Contact"
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://github.com/wanto-production",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r \n           from-blue-600 to-purple-600 text-white font-medium \n           hover:opacity-90 transition",
              children: [
                /* @__PURE__ */ jsx(Icon, { name: "fa:github" }),
                "Github"
              ]
            }
          )
        ]
      }
    )
  ] });
};
const appCss = "/assets/styles-CW8Tvm_s.css";
const LazyFooter = lazy(() => import('./footer-DIdG0BG-.mjs'));
const Route$4 = createRootRoute({
  head: () => ({
    meta: [{
      charSet: "utf-8"
    }, {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }, {
      name: "keywords",
      content: ["portofolio", "portofolio ikhwan", "portofolio ikhwan satrio", "ikhwan,ikhwan satrio", "young dev portofolio"].join(",")
    }, {
      title: "TanStack Start Starter"
    }],
    links: [{
      rel: "stylesheet",
      href: appCss
    }, {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico"
    }]
  }),
  shellComponent: RootDocument
});
function RootDocument({
  children
}) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsxs(ThemeProvider, { children: [
        /* @__PURE__ */ jsx(Header, {}),
        children,
        /* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(LazyFooter, {}) })
      ] }),
      /* @__PURE__ */ jsx(TanStackDevtools, { config: {
        position: "bottom-left"
      }, plugins: [{
        name: "Tanstack Router",
        render: /* @__PURE__ */ jsx(TanStackRouterDevtoolsPanel, {})
      }, FormDevtoolsPlugin()] }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$3 = () => import('./projects-CIDZATwQ.mjs');
const Route$3 = createFileRoute("/projects")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  head: () => ({
    meta: [{
      title: "ikhwan | projects",
      description: "Explore the portfolio of Ikhwan Satrio - Frontend Developer. Showcasing web applications, mobile apps, and open-source projects built with modern technologies like React, and TypeScript."
    }]
  })
});
const $$splitComponentImporter$2 = () => import('./contact-BVtIW2VL.mjs');
const Route$2 = createFileRoute("/contact")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  head: () => ({
    meta: [{
      title: "ikhwan | contact"
    }, {
      name: "description",
      content: "Get in touch with Ikhwan Satrio - Frontend Developer. Contact me for web development projects, collaborations, or just to say hello. Available for freelance work and exciting opportunities."
    }]
  })
});
const $$splitComponentImporter$1 = () => import('./about-Dze5qVdj.mjs');
const Route$1 = createFileRoute("/about")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  head: () => ({
    meta: [{
      title: "ikhwan | about"
    }, {
      name: "description",
      content: "Learn more about Ikhwan Satrio - Young passionate programmer specializing in modern web development with Svelte, and React"
    }]
  })
});
const $$splitComponentImporter = () => import('./index-3R_iDF0m.mjs');
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  head: () => ({
    meta: [{
      title: "ikhwan | home"
    }, {
      name: "description",
      content: "Personal portfolio of Ikhwan Satrio - Frontend Developer"
    }]
  })
});
const ProjectsRoute = Route$3.update({
  id: "/projects",
  path: "/projects",
  getParentRoute: () => Route$4
});
const ContactRoute = Route$2.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$4
});
const AboutRoute = Route$1.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$4
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  ContactRoute,
  ProjectsRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  return createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));

export { Icon as I, router as r };
//# sourceMappingURL=router-PHEg3tM6.mjs.map
