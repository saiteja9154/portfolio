import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';

interface RadialProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  glow?: boolean;
}

export function RadialProgress({ percentage, size = 120, strokeWidth = 10, glow = true }: RadialProgressProps) {
  const [progress, setProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 300);
    return () => clearTimeout(timer);
  }, [percentage]);

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="rotate-270" width={size} height={size}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(30, 41, 59, 0.4)"
          strokeWidth={strokeWidth}
        />
        {/* Fill */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="url(#indigoPurpleGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            strokeDashoffset,
            transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        <defs>
          <linearGradient id="indigoPurpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F7CFF" />
            <stop offset="100%" stopColor="#00D9FF" />
          </linearGradient>
        </defs>
      </svg>
      {glow && (
        <div
          className="absolute rounded-full pointer-events-none opacity-25 blur-xl bg-gradient-to-tr from-[#4F7CFF] to-[#00D9FF]"
          style={{ width: size - strokeWidth, height: size - strokeWidth }}
        />
      )}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-bold tracking-tight text-white font-display">
          {percentage}%
        </span>
        <span className="text-[9px] font-mono tracking-widest text-[#00D9FF] font-bold">
          TRUSTED
        </span>
      </div>
    </div>
  );
}

interface AnimatedCounterProps {
  value: number;
  duration?: number;
}

export function AnimatedCounter({ value, duration = 2 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalMiliseconds = duration * 1000;
    const stepTime = Math.max(Math.floor(totalMiliseconds / end), 25);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{count}</>;
}

interface SparklineProps {
  data: number[];
  color?: string;
}

export function Sparkline({ data, color = 'stroke-[#00D9FF]' }: SparklineProps) {
  const width = 120;
  const height = 40;
  const padding = 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((val, index) => {
      const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
      const y = height - ((val - min) / range) * (height - padding * 2) - padding;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg className="overflow-visible" width={width} height={height}>
      {/* Background Gradient Area */}
      <defs>
        <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4F7CFF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`M ${padding},${height} L ${points} L ${width - padding},${height} Z`}
        fill="url(#sparklineGrad)"
        className="pointer-events-none"
      />
      {/* Sparkline Path */}
      <motion.polyline
        fill="none"
        className={`${color} stroke-[2]`}
        points={points}
        strokeDasharray="200"
        strokeDashoffset="200"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
    </svg>
  );
}
