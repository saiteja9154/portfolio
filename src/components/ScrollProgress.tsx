import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  return (
    <motion.div
      id="scroll-progress-bar"
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4F7CFF] via-[#00D9FF] to-[#4F7CFF] origin-[0%] z-50 pointer-events-none shadow-[0_0_8px_rgba(0,217,255,0.5)]"
      style={{ scaleX }}
    />
  );
}
