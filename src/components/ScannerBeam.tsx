import { motion } from 'motion/react';

export default function ScannerBeam() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      <motion.div
        className="w-full h-1 relative z-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_12px_rgba(79,70,229,0.8),0_0_24px_rgba(147,51,234,0.6)]"
        initial={{ top: '0%' }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute inset-x-0 h-1/4 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"
        initial={{ top: '0%' }}
        animate={{ top: ['0%', '75%', '0%'] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
