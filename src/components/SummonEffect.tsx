/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface SummonEffectProps {
  onComplete: () => void;
}

export default function SummonEffect({ onComplete }: SummonEffectProps) {
  const [phase, setPhase] = useState<'flash' | 'fade-out'>('flash');

  useEffect(() => {
    // Stage 1: Intense white gold light flash (0.8s)
    const timer1 = setTimeout(() => {
      setPhase('fade-out');
    }, 1200);

    // Stage 2: Complete the intro and reveal main dashboard (2.2s total)
    const timer2 = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#0c0a09] flex items-center justify-center z-50 overflow-hidden select-none">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0%,rgba(12,10,9,1)_80%)]" />

      {/* Runic magic circles rotating in background */}
      <motion.div
        initial={{ rotate: 0, scale: 0.8, opacity: 0.3 }}
        animate={{ rotate: 360, scale: 1.1, opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className="absolute w-96 h-96 border border-dashed border-amber-500/20 rounded-full flex items-center justify-center pointer-events-none"
      >
        <div className="w-80 h-80 border border-amber-500/10 rounded-full" />
      </motion.div>

      {/* Central Sparkle and message */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center z-10 space-y-4 px-6"
      >
        <Sparkles className="w-10 h-10 text-amber-400 mx-auto animate-pulse" />
        <p className="text-stone-300 font-serif-kr text-sm italic font-light">
          원인 모를 빛이 온몸을 뒤덮었다...
        </p>
      </motion.div>

      {/* The Blinding Light Flash Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          phase === 'flash' 
            ? { opacity: [0, 1, 1] } 
            : { opacity: [1, 0] }
        }
        transition={{ 
          duration: phase === 'flash' ? 1.0 : 1.0,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-white flex flex-col items-center justify-center pointer-events-none z-50"
      >
        {/* Golden Core within the flash */}
        <div className="w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-70" />
      </motion.div>
    </div>
  );
}
