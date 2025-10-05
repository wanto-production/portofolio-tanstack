import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef } from 'react';
import { B as BlurText } from './BlurText-DtJgmmAR.mjs';
import { i as image, T as TextType } from './nishimiya-DOF9AB_6.mjs';
import { Link } from '@tanstack/react-router';
import { useAtom, atom } from 'jotai';
import 'motion/react';
import 'gsap';

const GlareHover = ({
  width = "500px",
  height = "500px",
  background = "#000",
  borderRadius = "10px",
  borderColor = "#333",
  children,
  glareColor = "#ffffff",
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  className = "",
  style = {}
}) => {
  const hex = glareColor.replace("#", "");
  let rgba = glareColor;
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[\dA-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }
  const overlayRef = useRef(null);
  const animateIn = () => {
    const el = overlayRef.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.backgroundPosition = "-100% -100%, 0 0";
    el.style.transition = `${transitionDuration}ms ease`;
    el.style.backgroundPosition = "100% 100%, 0 0";
  };
  const animateOut = () => {
    const el = overlayRef.current;
    if (!el) return;
    if (playOnce) {
      el.style.transition = "none";
      el.style.backgroundPosition = "-100% -100%, 0 0";
    } else {
      el.style.transition = `${transitionDuration}ms ease`;
      el.style.backgroundPosition = "-100% -100%, 0 0";
    }
  };
  const overlayStyle = {
    position: "absolute",
    inset: 0,
    background: `linear-gradient(${glareAngle}deg,
        hsla(0,0%,0%,0) 60%,
        ${rgba} 70%,
        hsla(0,0%,0%,0) 100%)`,
    backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "-100% -100%, 0 0",
    pointerEvents: "none"
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `relative grid place-items-center overflow-hidden border cursor-pointer ${className}`,
      style: {
        width,
        height,
        background,
        borderRadius,
        borderColor,
        ...style
      },
      onMouseEnter: animateIn,
      onMouseLeave: animateOut,
      children: [
        /* @__PURE__ */ jsx("div", { ref: overlayRef, style: overlayStyle }),
        children
      ]
    }
  );
};
const tabsAtom = atom("story");
const NavigationTabs = () => {
  const [activeTab, setActiveTab] = useAtom(tabsAtom);
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-3 z-10 mt-4", children: ["story", "skills", "journey", "interests"].map((tab) => /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => setActiveTab(tab),
      className: `px-6 py-2 rounded-xl font-medium transition-all duration-300 capitalize ${activeTab === tab ? "bg-primary text-primary-foreground shadow-lg" : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground"}`,
      children: tab
    },
    tab
  )) });
};
const SelectionTabs = () => {
  const [activeTab] = useAtom(tabsAtom);
  return /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
    activeTab === "story" && /* @__PURE__ */ jsx(StoryTab, {}),
    activeTab === "skills" && /* @__PURE__ */ jsx(SkillsTab, {}),
    activeTab === "journey" && /* @__PURE__ */ jsx(JourneyTab, {}),
    activeTab === "interests" && /* @__PURE__ */ jsx(InterestTab, {})
  ] });
};
function StoryTab() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-12 animate-in slide-in-from-bottom-4 duration-700", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold bg-gradient-to-r from-chart-1 via-chart-4 to-chart-3 bg-clip-text text-transparent mb-6 p-2", children: "My Story" }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-muted-foreground leading-relaxed text-lg", children: [
          /* @__PURE__ */ jsx("p", { children: "My journey started with an old, barely functioning laptop. I first touched programming through Scratch, dragging colorful blocks on screen. Curiosity led me to open VSCode and write my first lines of HTML. Soon, I jumped into React without fully understanding JavaScript \u2014 and failed, but kept going." }),
          /* @__PURE__ */ jsx("p", { children: "Through persistence and late nights, I gradually built real apps. I fell in love with clean code and fast feedback loops. Today, I proudly craft projects using TypeScript, NeoVim, and modern frameworks like Nuxt, SvelteKit, and AdonisJS." }),
          /* @__PURE__ */ jsx("p", { children: "I\u2019m still learning, still building, and always excited to solve meaningful problems with code." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 mt-8", children: [
          /* @__PURE__ */ jsx("span", { className: "px-4 py-2 bg-chart-1/20 text-chart-1 rounded-full text-sm border border-chart-1/30", children: "Creative Thinker" }),
          /* @__PURE__ */ jsx("span", { className: "px-4 py-2 bg-chart-4/20 text-chart-4 rounded-full text-sm border border-chart-4/30", children: "Problem Solver" }),
          /* @__PURE__ */ jsx("span", { className: "px-4 py-2 bg-chart-3/20 text-chart-3 rounded-full text-sm border border-chart-3/30", children: "Team Player" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-chart-1/10 via-chart-4/10 to-chart-3/10 rounded-3xl p-8 backdrop-blur-sm border border-border/50", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-6", children: [
        /* @__PURE__ */ jsx("div", { className: "text-6xl", children: "\u{1F4AD}" }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold bg-gradient-to-r from-chart-1 to-chart-3 bg-clip-text text-transparent", children: "My Philosophy" }),
        /* @__PURE__ */ jsx("blockquote", { className: "text-muted-foreground text-lg italic leading-relaxed", children: '"Code is my canvas, and ambition is my fuel."' })
      ] }) }) })
    ] })
  ] });
}
function SkillsTab() {
  const skills = [
    { name: "JavaScript", level: 90, color: "from-chart-4 to-chart-1" },
    { name: "TypeScript", level: 85, color: "from-chart-3 to-chart-2" },
    { name: "React", level: 75, color: "from-chart-2 to-chart-3" },
    { name: "Qwik", level: 80, color: "from-chart-1 to-chart-4" },
    { name: "Svelte", level: 80, color: "from-chart-4 to-chart-5" },
    { name: "Node.js", level: 85, color: "from-chart-5 to-chart-3" },
    { name: "UI/UX Design", level: 70, color: "from-chart-1 to-chart-5" },
    { name: "Database", level: 70, color: "from-chart-3 to-chart-1" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-12 animate-in slide-in-from-bottom-4 duration-700", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold bg-gradient-to-r from-chart-1 via-chart-4 to-chart-3 bg-clip-text text-transparent mb-6 p-2", children: "Skills & Technologies" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg max-w-2xl mx-auto", children: "Here are the technologies I love working with and my proficiency levels" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8", children: skills.map((skill, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-card/50 rounded-2xl p-6 border border-border/50 backdrop-blur-sm",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-foreground text-lg", children: skill.name }),
            /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground font-medium", children: [
              skill.level,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-muted rounded-full h-3 overflow-hidden", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `bg-gradient-to-r ${skill.color} h-full rounded-full transition-all duration-1000 ease-out`,
              style: {
                width: `${skill.level}%`,
                animationDelay: `${index * 100}ms`
              }
            }
          ) })
        ]
      },
      skill.name
    )) }),
    /* @__PURE__ */ jsx("div", { className: "text-center bg-gradient-to-r from-chart-1/10 to-chart-4/10 rounded-2xl p-8 border border-border/50", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg", children: "\u{1F680} Always learning new technologies and staying up-to-date with the latest trends in web development" }) })
  ] });
}
function JourneyTab() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-12 animate-in slide-in-from-bottom-4 duration-700", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold bg-gradient-to-r from-chart-1 via-chart-4 to-chart-3 bg-clip-text text-transparent mb-6 p-2", children: "My Journey" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg", children: "The path that led me to where I am today" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto text-center py-16", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-24 h-24 mx-auto bg-gradient-to-r from-muted to-border rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-12 h-12 text-muted-foreground", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-foreground", children: "Journey Coming Soon" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg leading-relaxed", children: "I'm currently building my professional timeline. Check back soon to see my journey unfold!" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-6", children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/contact",
          className: "inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:shadow-lg transition-all duration-300",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.906-1.447l-3.077 1.028a.75.75 0 01-.97-.97l1.028-3.077A8.955 8.955 0 013 12C3 7.582 6.582 4 12 4s8 3.582 8 8z" }) }),
            "Let's Connect"
          ]
        }
      ) })
    ] }) })
  ] });
}
function InterestTab() {
  const interests = [
    { emoji: "\u{1F3AE}", title: "Gaming", desc: "Strategy games and indie titles" },
    { emoji: "\u{1F4DA}", title: "Learning", desc: "Always exploring new tech" },
    { emoji: "\u2615", title: "Coffee", desc: "Fuel for late-night coding" },
    { emoji: "\u{1F3B5}", title: "Music", desc: "Lo-fi beats while coding" },
    { emoji: "\u{1F31F}", title: "Open Source", desc: "Contributing to community" },
    { emoji: "\u{1F680}", title: "Innovation", desc: "Building the future" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-12 animate-in slide-in-from-bottom-4 duration-700", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold bg-gradient-to-r from-chart-1 via-chart-4 to-chart-3 bg-clip-text text-transparent mb-6 p-2", children: "Beyond Code" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg", children: "What inspires and motivates me outside of programming" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: interests.map((interest) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-card/50 rounded-2xl p-6 text-center border border-border/50 backdrop-blur-sm hover:border-border transition-all duration-300 group",
        children: [
          /* @__PURE__ */ jsx("div", { className: "text-5xl mb-4 group-hover:scale-110 transition-transform duration-300", children: interest.emoji }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-foreground mb-2", children: interest.title }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: interest.desc })
        ]
      },
      interest.title
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-chart-1/10 via-chart-4/10 to-chart-3/10 rounded-3xl p-8 text-center border border-border/50 backdrop-blur-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "text-4xl mb-4", children: "\u{1F3AF}" }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold bg-gradient-to-r from-chart-1 to-chart-3 bg-clip-text text-transparent mb-4", children: "Current Focus" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto", children: "I'm currently diving deep into performance optimization with Qwik and exploring the intersection of AI and web development. Always excited about pushing the boundaries of what's possible on the web! \u{1F680}" })
    ] })
  ] });
}
function AboutPage() {
  return /* @__PURE__ */ jsxs("main", { className: "w-full min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative w-full h-screen text-center flex flex-col items-center justify-center gap-8 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(GlareHover, { width: "150px", height: "150px", borderRadius: "100%", glareColor: "oklch(from var(--color-foreground) l c h / 0.3)", glareOpacity: 0.3, glareAngle: -30, glareSize: 300, transitionDuration: 800, playOnce: false, children: /* @__PURE__ */ jsx("img", { src: image, alt: "Profile", className: "h-[150px] w-[150px] rounded-full object-cover shadow-2xl border-4 border-border/50" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-6 p-3 z-10", children: [
        /* @__PURE__ */ jsx(BlurText, { text: "About Ikhwan Satrio", delay: 150, animateBy: "words", direction: "top", className: "font-poppins text-center text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 bg-clip-text text-transparent" }),
        /* @__PURE__ */ jsx(TextType, { className: "font-inter text-lg sm:text-xl md:text-2xl text-muted-foreground", text: ["Passionate Developer", "Problem Solver", "Tech Enthusiast", "Linux Enthusiast"], typingSpeed: 80, pauseDuration: 1800, showCursor: true, cursorCharacter: "|" })
      ] }),
      /* @__PURE__ */ jsx(NavigationTabs, {})
    ] }),
    /* @__PURE__ */ jsx("section", { className: "w-full min-h-screen flex items-center", children: /* @__PURE__ */ jsx(SelectionTabs, {}) }),
    /* @__PURE__ */ jsx("section", { className: "w-full py-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto text-center px-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-chart-1/10 via-chart-4/10 to-chart-3/10 rounded-3xl p-12 backdrop-blur-sm border border-border/50", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold bg-gradient-to-r from-chart-1 via-chart-4 to-chart-3 bg-clip-text text-transparent mb-6 p-2", children: "Let's Build Something Amazing" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed", children: "I'm always excited to work on interesting projects and collaborate with passionate people. Whether it's a challenging technical problem or an innovative idea, let's make it happen!" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(Link, { to: "/projects", className: "min-w-[150px] text-center px-8 py-3 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300", children: "View My Work" }),
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "min-w-[150px] text-center px-8 py-3 rounded-xl border border-border text-muted-foreground font-medium hover:bg-muted hover:text-foreground transition-all duration-300", children: "Get In Touch" })
      ] })
    ] }) }) })
  ] });
}

export { AboutPage as component };
//# sourceMappingURL=about-Dze5qVdj.mjs.map
