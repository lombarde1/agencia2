import React, { useState } from 'react';
import * as motion from 'framer-motion';
import { ArrowRight, Star, Heart, Award } from 'lucide-react';
import ApplicationForm from './ApplicationForm';

const stats = [
  { icon: Star, value: '500+', label: 'Criadoras Ativas' },
  { icon: Heart, value: 'R$15k+', label: 'Ganhos Mensais' },
  { icon: Award, value: '95%', label: 'Taxa de Sucesso' }
];

export default function Hero() {
  const MotionDiv = motion.motion.div;
  const [showForm, setShowForm] = useState(false);

  return (
    <>
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-black" />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <MotionDiv
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{ 
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{
              y: [null, Math.random() * -100, null],
              opacity: [null, Math.random() * 0.8 + 0.2, null]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
          >
            Transforme Sua
            <br />
            <span className="text-white">Presença Digital</span>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl"
          >
            Potencialize sua carreira com a agência que mais cresce no Brasil.
            Liberdade financeira através de conteúdo exclusivo.
          </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-500/25 flex items-center cursor-pointer"
            >
              Comece Agora <ArrowRight className="ml-2" />
            </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {stats.map((stat, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <stat.icon className="w-8 h-8 text-pink-500 mb-3 mx-auto" />
                <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
      {/* Modal Form */}
      {showForm && <ApplicationForm onClose={() => setShowForm(false)} />}
    </>
  );
}