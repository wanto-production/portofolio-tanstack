import { jsx, jsxs } from 'react/jsx-runtime';
import { Link } from '@tanstack/react-router';
import { I as Icon } from './router-PHEg3tM6.mjs';
import { i as image, T as TextType } from './nishimiya-DOF9AB_6.mjs';
import { L as LightRays } from './LightRays-B4fxQ9EO.mjs';
import { useEffect } from 'react';
import { useAnimation, useMotionValue, motion } from 'motion/react';
import { B as BlurText } from './BlurText-DtJgmmAR.mjs';
import '@tanstack/react-router-devtools';
import '@tanstack/react-form-devtools';
import '@tanstack/react-devtools';
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
import 'gsap';
import 'ogl';

const getRotationTransition = (duration, from, loop = true) => ({
  from,
  to: from + 360,
  ease: "linear",
  duration,
  type: "tween",
  repeat: loop ? Infinity : 0
});
const getTransition = (duration, from) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: "spring",
    damping: 20,
    stiffness: 300
  }
});
const CircularText = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = ""
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);
  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  }, [spinDuration, text, onHover, controls]);
  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;
    let transitionConfig;
    let scaleVal = 1;
    switch (onHover) {
      case "slowDown":
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case "speedUp":
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case "pause":
        transitionConfig = {
          rotate: { type: "spring", damping: 20, stiffness: 300 },
          scale: { type: "spring", damping: 20, stiffness: 300 }
        };
        break;
      case "goBonkers":
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }
    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig
    });
  };
  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  };
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: `m-0 mx-auto rounded-full w-[200px] h-[200px] relative font-black text-white text-center cursor-pointer origin-center ${className}`,
      style: { rotate: rotation },
      initial: { rotate: 0 },
      animate: controls,
      onMouseEnter: handleHoverStart,
      onMouseLeave: handleHoverEnd,
      children: letters.map((letter, i) => {
        const rotationDeg = 360 / letters.length * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;
        return /* @__PURE__ */ jsx(
          "span",
          {
            className: "absolute inline-block inset-0 text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]",
            style: { transform, WebkitTransform: transform },
            children: letter
          },
          i
        );
      })
    }
  );
};
function HomePage() {
  return /* @__PURE__ */ jsx("main", { className: "w-full min-h-screen", children: /* @__PURE__ */ jsxs("section", { className: "relative w-full h-screen text-center flex flex-col items-center justify-center gap-8 bg-[radial-gradient(circle_at_center,_var(--sidebar),_var(--background))] overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { style: {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      zIndex: 1
    }, children: /* @__PURE__ */ jsx(LightRays, { raysOrigin: "top-center", raysColor: "hsl(var(--primary))", raysSpeed: 1.5, lightSpread: 0.8, rayLength: 1.2, followMouse: true, mouseInfluence: 0.1, noiseAmount: 0.1, distortion: 0.05, className: "custom-rays pointer-events-none" }) }),
    /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-center z-10", children: [
      /* @__PURE__ */ jsx(CircularText, { text: "*ikhwan*satrio*", spinDuration: 20, className: "custom-class" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("img", { src: image, alt: "Profile", className: "h-[130px] w-[130px] rounded-full object-cover shadow-lg" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4 p-3 z-10", children: [
      /* @__PURE__ */ jsx(BlurText, { text: "hello, i'm Ikhwan satrio", delay: 150, animateBy: "words", direction: "top", className: "font-poppins text-center text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent" }),
      /* @__PURE__ */ jsx(TextType, { className: "font-inter text-lg sm:text-xl md:text-2xl text-muted-foreground", text: ["Young Programmer", "Frontend Developer", "Loves Qwik & Svelte", "Happy coding!"], typingSpeed: 75, pauseDuration: 1500, showCursor: true, cursorCharacter: "|" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-4 justify-center z-10", children: [
      /* @__PURE__ */ jsx(Link, { to: "/projects", className: "min-w-[150px] text-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300", children: "View Projects" }),
      /* @__PURE__ */ jsxs("a", { href: "https://github.com/wanto-production", target: "_blank", rel: "noopener noreferrer", className: "min-w-[150px] text-center px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-all duration-300 flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsx(Icon, { name: "fa:github", size: 20 }),
        "Github"
      ] })
    ] })
  ] }) });
}

export { HomePage as component };
//# sourceMappingURL=index-3R_iDF0m.mjs.map
