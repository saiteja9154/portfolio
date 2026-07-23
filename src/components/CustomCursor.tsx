import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface Particle {
  id: number;
  targetX: number;
  targetY: number;
  color: string;
  size: number;
}

interface ClickInstance {
  id: number;
  x: number;
  y: number;
  particles: Particle[];
}

export default function CustomCursor() {
  const [hoverType, setHoverType] = useState<'none' | 'clickable' | 'card'>('none');
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [clicks, setClicks] = useState<ClickInstance[]>([]);
  
  const mousePos = useRef({ x: -100, y: -100 });
  const activeElRef = useRef<HTMLElement | null>(null);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  // Smooth springs for high-end cinematic feel
  const dotSpringConfig = { damping: 50, stiffness: 850 };
  const springConfig = { damping: 30, stiffness: 180, mass: 0.65 };

  const smoothDotX = useSpring(dotX, dotSpringConfig);
  const smoothDotY = useSpring(dotY, dotSpringConfig);

  const smoothRingX = useSpring(ringX, springConfig);
  const smoothRingY = useSpring(ringY, springConfig);

  useEffect(() => {
    // Check if device supports hover and fine pointer input (not a touch device)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Detect clickable elements
      const isClickable = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer');
      
      // Detect card-like structured layouts and bento cells for 3D magnetic tracking
      const isCard = target.closest('[id^="project-card-"], [id^="skill-card-"], #hero-verification-dashboard, .bg-slate-900\\/60, .bg-slate-900\\/40, .bg-slate-900\\/30, .bg-white\\/3, .rounded-2xl');

      if (isClickable) {
        setHoverType('clickable');
        activeElRef.current = isClickable as HTMLElement;
      } else if (isCard) {
        setHoverType('card');
        activeElRef.current = isCard as HTMLElement;
      } else {
        setHoverType('none');
        activeElRef.current = null;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);

      // Create 12 sharp, digital blue/cyan particles radiating from the exact click spot
      const fireColors = ['#00D9FF', '#4F7CFF', '#3b66df', '#80ecff', '#8bb2ff'];
      const particles: Particle[] = Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 + Math.random() * 15) * (Math.PI / 180);
        const distance = 10 + Math.random() * 18;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance - (3 + Math.random() * 4);
        const color = fireColors[Math.floor(Math.random() * fireColors.length)];
        const size = 1.8 + Math.random() * 2.2;
        return {
          id: i,
          targetX,
          targetY,
          color,
          size,
        };
      });

      const newClick: ClickInstance = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        particles,
      };

      setClicks((prev) => [...prev, newClick]);

      // Remove after the quick flame flash completes (snappy 350ms)
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== newClick.id));
      }, 350);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    let rafId: number;
    const updateCursor = () => {
      const currentX = mousePos.current.x;
      const currentY = mousePos.current.y;

      dotX.set(currentX);
      dotY.set(currentY);

      let targetRingX = currentX;
      let targetRingY = currentY;

      if (activeElRef.current) {
        if (hoverType === 'card') {
          const rect = activeElRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          // Magnetic pull: offset towards the center of card by 15%
          targetRingX = currentX + (centerX - currentX) * 0.15;
          targetRingY = currentY + (centerY - currentY) * 0.15;
        } else if (hoverType === 'clickable') {
          const rect = activeElRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          // Deeper magnetic lock onto buttons/links center coordinate by 20%
          targetRingX = currentX + (centerX - currentX) * 0.20;
          targetRingY = currentY + (centerY - currentY) * 0.20;
        }
      }

      ringX.set(targetRingX);
      ringY.set(targetRingY);

      rafId = requestAnimationFrame(updateCursor);
    };

    rafId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      cancelAnimationFrame(rafId);
    };
  }, [hoverType]);

  if (!isVisible) return null;

  // Blue / Cyan Accent follow tracking ring
  let ringSize = 28;
  let ringStyle = {};

  if (hoverType === 'clickable') {
    ringSize = 48;
    ringStyle = {
      backgroundColor: 'rgba(0, 217, 255, 0.08)',
      borderColor: 'rgba(0, 217, 255, 0.7)',
      boxShadow: '0 0 12px rgba(0, 217, 255, 0.2)',
    };
  } else if (hoverType === 'card') {
    ringSize = 64;
    ringStyle = {
      backgroundColor: 'rgba(79, 124, 255, 0.02)',
      borderColor: 'rgba(79, 124, 255, 0.3)',
      boxShadow: '0 0 8px rgba(79, 124, 255, 0.1)',
    };
  } else {
    ringSize = 28;
    ringStyle = {
      backgroundColor: 'transparent',
      borderColor: 'rgba(79, 124, 255, 0.35)',
    };
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      
      {/* Isolated localized click spark elements */}
      {clicks.map((click) => (
        <div key={`click-group-${click.id}`} className="absolute top-0 left-0 pointer-events-none">
          
          {/* Primary Spark Pulse */}
          <motion.div
            initial={{ width: 4, height: 4, opacity: 1, scale: 0.8 }}
            animate={{ width: 44, height: 44, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              position: 'fixed',
              left: click.x,
              top: click.y,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              border: '2px solid #00D9FF',
              boxShadow: '0 0 10px #4F7CFF, inset 0 0 6px #00D9FF',
              pointerEvents: 'none',
            }}
          />

          {/* Core high-intensity ignition micro-flash */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.95 }}
            animate={{ scale: 3.2, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              position: 'fixed',
              left: click.x,
              top: click.y,
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#80ecff',
              boxShadow: '0 0 12px 6px #00D9FF',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Radiating particles */}
          {click.particles.map((p) => (
            <motion.div
              key={`particle-${click.id}-${p.id}`}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: p.targetX, y: p.targetY, opacity: 0, scale: 0.1 }}
              transition={{
                duration: 0.35,
                ease: "easeOut"
              }}
              style={{
                position: 'fixed',
                left: click.x,
                top: click.y,
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                backgroundColor: p.color,
                boxShadow: `0 0 6px ${p.color}`,
                pointerEvents: 'none',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}

        </div>
      ))}

      {/* Outer Follower Ring */}
      <motion.div
        animate={{
          width: ringSize,
          height: ringSize,
          scale: isMouseDown ? 0.72 : 1,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 25 }}
        style={{
          x: smoothRingX,
          y: smoothRingY,
          translateX: '-50%',
          translateY: '-50%',
          borderWidth: '1.5px',
          borderRadius: '50%',
          ...ringStyle,
        }}
        className="fixed pointer-events-none mix-blend-screen"
      />

      {/* Inner Pinpoint Dot */}
      <motion.div
        style={{
          x: smoothDotX,
          y: smoothDotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed w-2 h-2 bg-gradient-to-r from-[#4F7CFF] to-[#00D9FF] rounded-full pointer-events-none z-50 shadow-[0_0_8px_#00D9FF]"
      />
    </div>
  );
}
