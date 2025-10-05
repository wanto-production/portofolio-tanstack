import { jsxs, jsx } from 'react/jsx-runtime';
import { I as Icon } from './router-PHEg3tM6.mjs';
import { Link } from '@tanstack/react-router';
import '@tanstack/react-router-devtools';
import '@tanstack/react-form-devtools';
import '@tanstack/react-devtools';
import 'react';
import 'zod';
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

const Footer = () => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const socialLinks = [
    { name: "GitHub", href: "https://github.com/wanto-production", icon: "fa:github" },
    { name: "LinkedIn", href: "https://linkedin.com/in/ikhwan-satrio", icon: "fa:linkedin" },
    { name: "Twitter", href: "https://twitter.com/ikhwansatrio", icon: "fa:twitter" },
    { name: "Instagram", href: "https://www.instagram.com/wantoobrrrrrr/", icon: "fa:instagram" }
  ];
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" }
  ];
  const techStack = ["JavaScript", "TypeScript", "React", "TanstackStart", "Bun"];
  const scrollToTop = () => {
  };
  return /* @__PURE__ */ jsxs("footer", { className: "bg-gradient-to-b from-background to-sidebar border-t border-border", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-primary-foreground font-bold text-lg", children: "IS" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-foreground", children: "Ikhwan Satrio" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Young Programmer" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-foreground/90 leading-relaxed max-w-md", children: "Passionate frontend developer crafting beautiful and performant web experiences with modern technologies. Always learning, always building." }),
          /* @__PURE__ */ jsx("div", { className: "flex space-x-3", children: socialLinks.map((social) => /* @__PURE__ */ jsx(
            "a",
            {
              href: social.href,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "w-10 h-10 bg-secondary hover:bg-primary/20 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 group border border-border",
              "aria-label": social.name,
              children: /* @__PURE__ */ jsx("span", { className: "group-hover:scale-110 transition-transform duration-200", children: /* @__PURE__ */ jsx(Icon, { name: social.icon, size: 20 }) })
            },
            social.name
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-foreground", children: "Quick Links" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: quickLinks.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: link.href,
              className: "text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group",
              children: [
                /* @__PURE__ */ jsx("span", { className: "w-1 h-1 bg-primary rounded-full mr-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" }),
                link.name
              ]
            }
          ) }, link.name)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-foreground", children: "Tech Stack" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: techStack.map((tech) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "px-3 py-1 bg-secondary text-foreground/80 text-sm rounded-full hover:bg-primary/20 hover:text-primary border border-border transition-all duration-200",
              children: tech
            },
            tech
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-chart-5 rounded-full animate-pulse" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Available for projects" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center gap-1 text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            "\xA9 ",
            currentYear,
            " Ikhwan Satrio."
          ] }),
          /* @__PURE__ */ jsx("span", { children: "Made with" }),
          /* @__PURE__ */ jsx("span", { className: "text-destructive animate-pulse", children: "\u2764\uFE0F" }),
          /* @__PURE__ */ jsx("span", { children: "and lots of" }),
          /* @__PURE__ */ jsx("span", { className: "text-chart-4", children: "\u2615" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-muted-foreground", children: [
          /* @__PURE__ */ jsx("span", { children: "Built with" }),
          /* @__PURE__ */ jsx("span", { className: "text-primary font-medium", children: "TanStack Start" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: scrollToTop,
        className: "fixed bottom-6 right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50 group",
        "aria-label": "Scroll to top",
        children: /* @__PURE__ */ jsx(
          Icon,
          {
            name: "lu:arrow-up",
            className: "mx-auto group-hover:-translate-y-0.5 transition-transform",
            size: 24
          }
        )
      }
    )
  ] });
};

export { Footer as default };
//# sourceMappingURL=footer-DIdG0BG-.mjs.map
