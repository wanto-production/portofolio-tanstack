import { jsxs, jsx } from 'react/jsx-runtime';
import { B as BlurText } from './BlurText-DtJgmmAR.mjs';
import { L as LightRays } from './LightRays-B4fxQ9EO.mjs';
import { useAtom, atom } from 'jotai';
import { Link } from '@tanstack/react-router';
import 'motion/react';
import 'react';
import 'ogl';

const categories = [
  { id: "all", name: "All Projects", count: 3 },
  { id: "web", name: "Web Apps", count: 1 },
  { id: "mobile", name: "Mobile", count: 0 },
  { id: "ui", name: "UI/UX", count: 0 },
  { id: "opensource", name: "Open Source", count: 2 }
];
const projects = [
  {
    id: 1,
    title: "Portofolio and personal blog",
    description: "my other portofolio with personal blog features",
    category: "web",
    technologies: ["AstroJs", "TypeScript", "Tailwind CSS", "SolidJs"],
    demoUrl: "https://portofolio-ikhwan.vercel.app",
    githubUrl: "https://github.com/wanto-production/astro-portofolio",
    status: "completed"
  },
  {
    id: 2,
    title: "Lenovo vantage for linux",
    description: "Lenovo vantage for linux, build with tauri and svelte",
    category: "opensource",
    technologies: ["Svelte", "Tauri", "Rust", "Tailwind Css"],
    githubUrl: "https://github.com/wanto-production/linux_vantage",
    status: "completed"
  },
  {
    id: 3,
    title: "Telegram tiktok bot",
    description: "Telegram bot who can install tiktok video without watermark",
    category: "opensource",
    technologies: ["TypeScript", "Bun", "WebHook"],
    githubUrl: "https://github.com/wanto-production/next_webhook",
    status: "completed"
  }
];
const selectedStore = atom("all");
const ToggleFilter = () => {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedStore);
  const switchCategory = (category) => {
    setSelectedCategory(category);
  };
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4 mb-12", children: categories.map((category) => /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: () => switchCategory(category.id),
      className: `px-6 py-3 rounded-xl font-medium transition-all duration-300 ${selectedCategory === category.id ? "bg-primary text-primary-foreground shadow-lg" : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"}`,
      children: [
        category.name,
        /* @__PURE__ */ jsx("span", { className: "ml-2 px-2 py-0.5 bg-black/20 rounded-full text-xs", children: category.count })
      ]
    },
    category.id
  )) });
};
const ProjectGrid = () => {
  const [selectedCategory] = useAtom(selectedStore);
  const filteredProjects = selectedCategory === "all" ? projects : projects.filter((project) => project.category === selectedCategory);
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-chart-5";
      // hijau dari palet Anda
      case "in-progress":
        return "bg-chart-4";
      // oranye
      case "planning":
        return "bg-chart-1";
      // pink
      default:
        return "bg-muted";
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: filteredProjects.map((project) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group bg-card/50 rounded-2xl overflow-hidden border border-border/50 backdrop-blur-sm hover:border-border transition-all duration-500 hover:transform hover:-translate-y-2 flex flex-col",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative h-48 bg-gradient-to-br from-muted to-card", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "text-4xl opacity-30", children: project.category === "web" ? "\u{1F310}" : project.category === "mobile" ? "\u{1F4F1}" : project.category === "ui" ? "\u{1F3A8}" : "\u{1F527}" }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsx("div", { className: `w-3 h-3 rounded-full ${getStatusColor(project.status)}` }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col h-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300", children: project.title }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: project.description }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1", children: [
              project.technologies.slice(0, 3).map((tech) => /* @__PURE__ */ jsx(
                "span",
                {
                  className: "px-2 py-1 bg-muted text-muted-foreground text-xs rounded",
                  children: tech
                },
                tech
              )),
              project.technologies.length > 3 && /* @__PURE__ */ jsxs("span", { className: "px-2 py-1 bg-muted text-muted-foreground/70 text-xs rounded", children: [
                "+",
                project.technologies.length - 3
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-6", children: [
            project.demoUrl && /* @__PURE__ */ jsx(
              "a",
              {
                href: project.demoUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex-1 text-center px-3 py-2 bg-primary text-primary-foreground text-sm rounded-lg transition-colors duration-200 hover:bg-primary/90",
                children: "Demo"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: project.githubUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: `px-3 py-2 border border-border text-muted-foreground hover:bg-muted hover:text-foreground text-sm rounded-lg transition-all duration-200 ${project.demoUrl ? "" : "flex-1 text-center"}`,
                children: "Code"
              }
            )
          ] })
        ] })
      ]
    },
    project.id
  )) });
};
function ProjectsPage() {
  return /* @__PURE__ */ jsxs("main", { className: "w-full min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative w-full h-screen text-center flex flex-col items-center justify-center gap-8 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { style: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        zIndex: 1
      }, children: /* @__PURE__ */ jsx(LightRays, { raysOrigin: "top-center", raysColor: "oklch(from var(--color-foreground) l c h / 0.2)", raysSpeed: 1, lightSpread: 0.5, rayLength: 0.8, followMouse: true, mouseInfluence: 0.06, noiseAmount: 0.15, distortion: 0.02, className: "custom-rays pointer-events-none" }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center text-center space-y-6", children: [
          /* @__PURE__ */ jsx(BlurText, { text: "My Projects", delay: 150, animateBy: "words", direction: "top", className: "font-poppins text-center text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 bg-clip-text text-transparent p-3" }),
          /* @__PURE__ */ jsx("p", { className: "font-inter text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed", children: "A collection of projects I've worked on, from web applications to mobile apps and everything in between" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-8 mt-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold bg-gradient-to-r from-chart-1 to-chart-3 bg-clip-text text-transparent", children: "3+" }),
            /* @__PURE__ */ jsx("div", { className: "text-muted-foreground text-sm uppercase tracking-wide", children: "Projects" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold bg-gradient-to-r from-chart-4 to-chart-1 bg-clip-text text-transparent", children: "6+" }),
            /* @__PURE__ */ jsx("div", { className: "text-muted-foreground text-sm uppercase tracking-wide", children: "Technologies" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold bg-gradient-to-r from-chart-5 to-chart-2 bg-clip-text text-transparent", children: "2+" }),
            /* @__PURE__ */ jsx("div", { className: "text-muted-foreground text-sm uppercase tracking-wide", children: "Years Experience" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center animate-bounce", children: [
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm mb-2", children: "Explore Projects" }),
        /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-muted-foreground", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 14l-7 7m0 0l-7-7m7 7V3" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "w-full py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold bg-gradient-to-r from-chart-1 via-chart-4 to-chart-3 bg-clip-text text-transparent mb-6", children: "All Projects" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg max-w-2xl mx-auto", children: "Browse through all my projects by category" })
      ] }),
      /* @__PURE__ */ jsx(ToggleFilter, {}),
      /* @__PURE__ */ jsx(ProjectGrid, {})
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "w-full py-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto text-center px-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-chart-1/10 via-chart-4/10 to-chart-3/10 rounded-3xl p-12 backdrop-blur-sm border border-border/50", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold bg-gradient-to-r from-chart-1 via-chart-4 to-chart-3 bg-clip-text text-transparent mb-6", children: "Have a Project in Mind?" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed", children: "I'm always excited to work on interesting projects and collaborate with passionate people. Let's bring your ideas to life!" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300", children: "Start a Project" }),
        /* @__PURE__ */ jsx(Link, { to: "/about", className: "px-8 py-3 border border-border text-muted-foreground rounded-xl font-medium hover:bg-muted hover:text-foreground transition-all duration-300", children: "Learn More About Me" })
      ] })
    ] }) }) })
  ] });
}

export { ProjectsPage as component };
//# sourceMappingURL=projects-CIDZATwQ.mjs.map
