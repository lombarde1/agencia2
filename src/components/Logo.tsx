import React from 'react';
import * as motion from 'framer-motion';
import { Flame, Sparkle } from 'lucide-react';

export default function Logo() {
  const MotionDiv = motion.motion.div;
  const MotionSpan = motion.motion.span;
  
  return (
    <MotionDiv 
      className="relative group"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex items-center space-x-1">
        <MotionDiv
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3 
          }}
          className="relative"
        >
          <span className="text-5xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
          Sp
          </span>
          <MotionDiv
            className="absolute -top-1 -right-1"
            animate={{ 
              rotate: [0, 10, 0],
              scale: [1, 1.2, 1] 
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Sparkle className="w-4 h-4 text-yellow-400" />
          </MotionDiv>
        </MotionDiv>

        <MotionDiv
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative"
        >
          <Flame 
            size={40} 
            className="text-pink-500 filter drop-shadow-lg" 
          />
          <MotionDiv
            className="absolute inset-0"
            animate={{
              opacity: [0, 0.5, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Flame 
              size={40} 
              className="text-purple-500 blur-sm" 
            />
          </MotionDiv>
        </MotionDiv>

        <MotionSpan
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.6 
          }}
          className="text-5xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
        >
          cy
        </MotionSpan>
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-400"
      >
        agencia
      </MotionDiv>
    </MotionDiv>
  );
}