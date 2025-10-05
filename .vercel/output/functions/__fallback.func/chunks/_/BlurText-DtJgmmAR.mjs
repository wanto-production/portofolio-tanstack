import { jsx, jsxs } from 'react/jsx-runtime';
import { motion } from 'motion/react';
import { useState, useRef, useEffect, useMemo } from 'react';

const buildKeyframes = (from, steps) => {
  const keys = /* @__PURE__ */ new Set([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);
  const keyframes = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};
const BlurText = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);
  const defaultFrom = useMemo(
    () => direction === "top" ? { filter: "blur(10px)", opacity: 0, y: -50 } : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );
  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5
      },
      { filter: "blur(0px)", opacity: 1, y: 0 }
    ],
    [direction]
  );
  const fromSnapshot = animationFrom != null ? animationFrom : defaultFrom;
  const toSnapshots = animationTo != null ? animationTo : defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => stepCount === 1 ? 0 : i / (stepCount - 1));
  return /* @__PURE__ */ jsx("p", { ref, className: `blur-text ${className} flex flex-wrap`, children: elements.map((segment, index) => {
    const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
    const spanTransition = {
      duration: totalDuration,
      times,
      delay: index * delay / 1e3,
      ease: easing
    };
    return /* @__PURE__ */ jsxs(
      motion.span,
      {
        initial: fromSnapshot,
        animate: inView ? animateKeyframes : fromSnapshot,
        transition: spanTransition,
        onAnimationComplete: index === elements.length - 1 ? onAnimationComplete : void 0,
        style: {
          display: "inline-block",
          willChange: "transform, filter, opacity"
        },
        children: [
          segment === " " ? "\xA0" : segment,
          animateBy === "words" && index < elements.length - 1 && "\xA0"
        ]
      },
      index
    );
  }) });
};

export { BlurText as B };
//# sourceMappingURL=BlurText-DtJgmmAR.mjs.map
