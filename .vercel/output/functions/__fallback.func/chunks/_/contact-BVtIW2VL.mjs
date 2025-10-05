import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { Link } from '@tanstack/react-router';
import { I as Icon } from './router-PHEg3tM6.mjs';
import { a as createServerFn, c as createServerRpc } from '../virtual/entry.mjs';
import { FormApi, functionalUpdate, FieldApi } from '@tanstack/form-core';
import { useStore } from '@tanstack/react-store';
import { useState, useEffect, useMemo } from 'react';
import { z } from 'zod';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import { C as ContactEmail } from './template-contact-DyNr1AQE.mjs';
import { L as LightRays } from './LightRays-B4fxQ9EO.mjs';
import { B as BlurText } from './BlurText-DtJgmmAR.mjs';
import '@tanstack/react-router-devtools';
import '@tanstack/react-form-devtools';
import '@tanstack/react-devtools';
import 'react-icons/lu';
import 'react-icons/fa';
import 'react-icons/fa6';
import 'react-icons/si';
import 'react-icons/md';
import 'react-icons/io5';
import 'react-icons/bi';
import 'react-icons/ai';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@tanstack/history';
import '@tanstack/router-core/ssr/client';
import '@tanstack/router-core';
import 'node:async_hooks';
import '@tanstack/router-core/ssr/server';
import 'rou3';
import 'srvx';
import 'tiny-invariant';
import 'seroval';
import '@tanstack/react-router/ssr/server';
import 'ogl';
import 'motion/react';

const useIsomorphicLayoutEffect = useEffect;
function useField(opts) {
  const [fieldApi] = useState(() => {
    const api = new FieldApi({
      ...opts,
      form: opts.form,
      name: opts.name
    });
    const extendedApi = api;
    extendedApi.Field = Field;
    return extendedApi;
  });
  useIsomorphicLayoutEffect(fieldApi.mount, [fieldApi]);
  useIsomorphicLayoutEffect(() => {
    fieldApi.update(opts);
  });
  useStore(
    fieldApi.store,
    opts.mode === "array" ? (state) => {
      var _a;
      return [
        state.meta,
        Object.keys((_a = state.value) != null ? _a : []).length
      ];
    } : void 0
  );
  return fieldApi;
}
const Field = (({
  children,
  ...fieldOptions
}) => {
  const fieldApi = useField(fieldOptions);
  const jsxToDisplay = useMemo(
    () => functionalUpdate(children, fieldApi),
    /**
     * The reason this exists is to fix an issue with the React Compiler.
     * Namely, functionalUpdate is memoized where it checks for `fieldApi`, which is a static type.
     * This means that when `state.value` changes, it does not trigger a re-render. The useMemo explicitly fixes this problem
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [children, fieldApi, fieldApi.state.value, fieldApi.state.meta]
  );
  return /* @__PURE__ */ jsx(Fragment, { children: jsxToDisplay });
});
function LocalSubscribe({
  form,
  selector,
  children
}) {
  const data = useStore(form.store, selector);
  return functionalUpdate(children, data);
}
function useForm(opts) {
  const [formApi] = useState(() => {
    const api = new FormApi(opts);
    const extendedApi = api;
    extendedApi.Field = function APIField(props) {
      return /* @__PURE__ */ jsx(Field, { ...props, form: api });
    };
    extendedApi.Subscribe = function Subscribe(props) {
      return /* @__PURE__ */ jsx(
        LocalSubscribe,
        {
          form: api,
          selector: props.selector,
          children: props.children
        }
      );
    };
    return extendedApi;
  });
  useIsomorphicLayoutEffect(formApi.mount, []);
  useIsomorphicLayoutEffect(() => {
    formApi.update(opts);
  });
  return formApi;
}
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});
const sendEmail_createServerFn_handler = createServerRpc("src_components_contact_form-contact_tsx--sendEmail_createServerFn_handler", (opts, signal) => {
  return sendEmail.__executeServer(opts, signal);
});
const sendEmail = createServerFn({
  method: "POST"
}).inputValidator(contactSchema).handler(sendEmail_createServerFn_handler, async ({
  data
}) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const {
      name,
      email,
      subject,
      message
    } = data;
    const emailHtml = await render(ContactEmail({
      name,
      email,
      subject,
      message
    }));
    await resend.emails.send({
      from: `${name} <onboarding@resend.dev>`,
      to: "ikwansatria3974@gmail.com",
      subject: `Pesan Baru: ${subject}`,
      html: emailHtml
    });
    return {
      success: true
    };
  } catch (err) {
    console.error("Send email error:", err);
    return {
      success: false,
      error: "Failed to send email. Please try again."
    };
  }
});
function ContactForm() {
  const [submitResult, setSubmitResult] = useState(null);
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    },
    validators: {
      onChange: contactSchema
    },
    onSubmit: async ({
      value
    }) => {
      setSubmitResult(null);
      const result = await sendEmail({
        data: value
      });
      setSubmitResult(result);
      if (result.success) {
        form.reset();
      }
      return result;
    }
  });
  return /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  }, className: "space-y-4 sm:space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6", children: [
      /* @__PURE__ */ jsx(form.Field, { name: "name", children: (field) => {
        var _a;
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: field.name, className: "block text-sm font-medium text-foreground mb-2", children: "Name *" }),
          /* @__PURE__ */ jsx("input", { id: field.name, name: field.name, value: field.state.value, onBlur: field.handleBlur, onChange: (e) => field.handleChange(e.target.value), className: "w-full px-3 sm:px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm sm:text-base", placeholder: "Your name" }),
          field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx("p", { className: "text-destructive text-xs mt-1", children: (_a = field.state.meta.errors[0]) == null ? void 0 : _a.message })
        ] });
      } }),
      /* @__PURE__ */ jsx(form.Field, { name: "email", children: (field) => {
        var _a;
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: field.name, className: "block text-sm font-medium text-foreground mb-2", children: "Email *" }),
          /* @__PURE__ */ jsx("input", { id: field.name, name: field.name, type: "email", value: field.state.value, onBlur: field.handleBlur, onChange: (e) => field.handleChange(e.target.value), className: "w-full px-3 sm:px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm sm:text-base", placeholder: "your@email.com" }),
          field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx("p", { className: "text-destructive text-xs mt-1", children: (_a = field.state.meta.errors[0]) == null ? void 0 : _a.message })
        ] });
      } })
    ] }),
    /* @__PURE__ */ jsx(form.Field, { name: "subject", children: (field) => {
      var _a;
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: field.name, className: "block text-sm font-medium text-foreground mb-2", children: "Subject *" }),
        /* @__PURE__ */ jsx("input", { id: field.name, name: field.name, value: field.state.value, onBlur: field.handleBlur, onChange: (e) => field.handleChange(e.target.value), className: "w-full px-3 sm:px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm sm:text-base", placeholder: "Project discussion, collaboration, etc." }),
        field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx("p", { className: "text-destructive text-xs mt-1", children: (_a = field.state.meta.errors[0]) == null ? void 0 : _a.message })
      ] });
    } }),
    /* @__PURE__ */ jsx(form.Field, { name: "message", children: (field) => {
      var _a;
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: field.name, className: "block text-sm font-medium text-foreground mb-2", children: "Message *" }),
        /* @__PURE__ */ jsx("textarea", { id: field.name, name: field.name, value: field.state.value, onBlur: field.handleBlur, onChange: (e) => field.handleChange(e.target.value), rows: 5, className: "w-full px-3 sm:px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-sm sm:text-base", placeholder: "Tell me about your project, ideas, or just say hello..." }),
        field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx("p", { className: "text-destructive text-xs mt-1", children: (_a = field.state.meta.errors[0]) == null ? void 0 : _a.message })
      ] });
    } }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(form.Subscribe, { selector: (state) => [state.isSubmitting, state.canSubmit], children: ([isSubmitting, canSubmit]) => /* @__PURE__ */ jsx("button", { type: "submit", disabled: isSubmitting || !canSubmit, className: `w-full px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium text-primary-foreground transition-all duration-300 text-sm sm:text-base
                ${isSubmitting || !canSubmit ? "bg-muted cursor-not-allowed" : (submitResult == null ? void 0 : submitResult.success) ? "bg-chart-5 hover:bg-chart-5/90" : "bg-primary hover:shadow-lg hover:scale-105"}`, children: isSubmitting ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsx(Icon, { name: "lu:loader-2", size: 20, className: "animate-spin" }),
      "Sending..."
    ] }) : (submitResult == null ? void 0 : submitResult.success) ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsx(Icon, { name: "lu:check", size: 20 }),
      "Message Sent!"
    ] }) : "Send Message" }) }) }),
    (submitResult == null ? void 0 : submitResult.success) ? /* @__PURE__ */ jsx("div", { className: "p-3 sm:p-4 bg-chart-5/20 border border-chart-5/50 rounded-lg text-chart-5 text-xs sm:text-sm", children: "Thanks for reaching out! I'll get back to you soon." }) : submitResult && !submitResult.success ? /* @__PURE__ */ jsx("div", { className: "p-3 sm:p-4 bg-destructive/20 border border-destructive/50 rounded-lg text-destructive text-xs sm:text-sm", children: submitResult.error }) : null
  ] });
}
function ContactPage() {
  const contactMethods = [{
    icon: "lu:mail",
    title: "Email",
    value: "ikwansatria3974@gmail.com",
    href: "mailto:ikwansatria3974@gmail.com",
    description: "Drop me a line anytime"
  }, {
    icon: "fa:github",
    title: "GitHub",
    value: "@wanto-production",
    href: "https://github.com/wanto-production",
    description: "Check out my code"
  }, {
    icon: "fa:linkedin",
    title: "LinkedIn",
    value: "Ikhwan Satrio",
    href: "https://linkedin.com/in/ikhwan-satrio",
    description: "Let's connect professionally"
  }, {
    icon: "fa:twitter",
    title: "Twitter",
    value: "@ikhwansatrio",
    href: "https://twitter.com/ikhwansatrio",
    description: "Follow me for updates"
  }];
  const faqs = [{
    question: "What kind of projects do you work on?",
    answer: "I specialize in web applications using modern frameworks like Qwik, React, and Svelte. I also work on mobile apps, UI/UX design, and open-source projects."
  }, {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on complexity. A simple website might take 2-4 weeks, while a complex web application could take 2-3 months. I always provide detailed timelines during consultation."
  }, {
    question: "Do you work with remote clients?",
    answer: "Absolutely! I work with clients globally and have experience collaborating remotely. I use tools like Slack, Discord, and video calls to ensure smooth communication."
  }, {
    question: "What's your preferred tech stack?",
    answer: "I love working with Qwik for performance-critical apps, React for complex UIs, Svelte for lightweight projects, and TypeScript for everything. I also use Tailwind CSS, Node.js, and various databases."
  }];
  return /* @__PURE__ */ jsxs("main", { className: "w-full min-h-screen", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative w-full min-h-screen flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 bg-[radial-gradient(circle_at_center,_var(--sidebar),_var(--background))] overflow-hidden px-4 sm:px-6 md:px-8", children: [
      /* @__PURE__ */ jsx("div", { style: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        zIndex: 1
      }, children: /* @__PURE__ */ jsx(LightRays, { raysOrigin: "top-center", raysColor: "hsl(var(--primary))", raysSpeed: 0.8, lightSpread: 0.4, rayLength: 0.6, followMouse: true, mouseInfluence: 0.05, noiseAmount: 0.1, distortion: 0.03, className: "custom-rays pointer-events-none" }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-7xl mx-auto text-center space-y-6 sm:space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6", children: [
          /* @__PURE__ */ jsx(BlurText, { text: "Let's Work Together", delay: 150, animateBy: "words", direction: "top", className: "font-poppins text-center text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent leading-tight" }),
          /* @__PURE__ */ jsx("p", { className: "font-inter text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2", children: "Have a project in mind? I'd love to hear from you. Let's discuss how we can bring your ideas to life" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-lg sm:max-w-none mx-auto", children: [
          /* @__PURE__ */ jsx("a", { href: "mailto:ikwansatria3974@gmail.com", className: "w-full sm:w-auto px-6 sm:px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center", children: "Send me an Email" }),
          /* @__PURE__ */ jsx("div", { className: "text-muted-foreground text-xs sm:text-sm text-center", children: "or fill out the form below" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden sm:block", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center animate-bounce", children: [
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-xs sm:text-sm mb-2", children: "Get in Touch" }),
        /* @__PURE__ */ jsx(Icon, { name: "lu:arrow-down", size: 24, className: "text-muted-foreground" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "w-full bg-gradient-to-b from-background to-sidebar py-12 sm:py-16 md:py-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6 sm:space-y-8 order-2 lg:order-1", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4", children: "Send me a Message" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-base sm:text-lg", children: "Fill out this form and I'll get back to you within 24 hours" })
        ] }),
        /* @__PURE__ */ jsx(ContactForm, {})
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6 sm:space-y-8 order-1 lg:order-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4", children: "Get in Touch" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-base sm:text-lg", children: "Prefer to reach out directly? Here are the best ways to contact me" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3 sm:space-y-4", children: contactMethods.map((method) => /* @__PURE__ */ jsx("a", { href: method.href, target: method.href.startsWith("mailto:") ? "_self" : "_blank", rel: method.href.startsWith("mailto:") ? "" : "noopener noreferrer", className: "group block p-4 sm:p-6 bg-secondary/50 rounded-xl sm:rounded-2xl border border-border backdrop-blur-sm hover:border-primary/50 transition-all duration-300", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 sm:gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary/30 transition-all duration-300 flex-shrink-0", children: /* @__PURE__ */ jsx(Icon, { name: method.icon, size: 20 }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-foreground group-hover:text-primary transition-colors duration-300 text-sm sm:text-base", children: method.title }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground group-hover:text-foreground transition-colors duration-300 mb-1 text-sm sm:text-base break-words", children: method.value }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground/70 text-xs sm:text-sm", children: method.description })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0", children: /* @__PURE__ */ jsx(Icon, { name: "lu:external-link", size: 16, className: "text-muted-foreground" }) })
        ] }) }, method.title)) }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-6 bg-chart-5/10 rounded-xl sm:rounded-2xl border border-chart-5/30", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2 sm:mb-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-chart-5 rounded-full animate-pulse flex-shrink-0" }),
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-foreground text-sm sm:text-base", children: "Currently Available" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-foreground/80 text-xs sm:text-sm leading-relaxed", children: "I'm currently taking on new projects and collaborations. Response time is typically within 24 hours." })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "w-full bg-gradient-to-b from-sidebar to-background py-12 sm:py-16 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 sm:mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-primary mb-4 sm:mb-6", children: "Frequently Asked Questions" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-base sm:text-lg", children: "Quick answers to common questions about working together" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4 sm:space-y-6", children: faqs.map((faq, index) => /* @__PURE__ */ jsxs("div", { className: "bg-secondary/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border backdrop-blur-sm", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3 leading-snug", children: faq.question }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed text-sm sm:text-base", children: faq.answer })
      ] }, index)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "w-full bg-gradient-to-b from-background to-sidebar py-12 sm:py-16 md:py-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-primary/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 backdrop-blur-sm border border-border", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-primary mb-4 sm:mb-6", children: "Ready to Start Your Project?" }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground/80 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed", children: "Whether you have a clear vision or just an idea, I'm here to help bring it to life. Let's create something amazing together." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto", children: [
        /* @__PURE__ */ jsx("a", { href: "mailto:ikwansatria3974@gmail.com", className: "px-6 sm:px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm sm:text-base", children: "Start the Conversation" }),
        /* @__PURE__ */ jsx(Link, { to: "/projects", className: "px-6 sm:px-8 py-3 border border-border text-foreground rounded-xl font-medium hover:bg-secondary transition-all duration-300 text-sm sm:text-base", children: "View My Work" })
      ] })
    ] }) }) })
  ] });
}

export { ContactPage as component };
//# sourceMappingURL=contact-BVtIW2VL.mjs.map
