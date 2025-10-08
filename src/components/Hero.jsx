import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ whatsappLink, scrollToSection }) => {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/80 z-0"></div>
      <img
        src="/images/hero.jpg"
        alt="Fondo estudio"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        loading="eager"
        decoding="async"
      />
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-primary mb-4 leading-tight font-poppins"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Sergio Fernández
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-primary-accent mb-6 font-medium font-poppins"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Artista Principal - Blackouts & Blackwork
        </motion.p>
        <motion.p
          className="text-base sm:text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Transformo tus ideas en arte permanente. Especialista en diseños minimalistas y transformación de tatuajes viejos.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-accent hover:bg-opacity-80 px-8 py-3.5 rounded-full font-bold text-background transition-all duration-300 shadow-xl"
          >
            Contactar por WhatsApp
          </a>
          <button
            onClick={() => scrollToSection('galeria')}
            className="border-2 border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-background px-8 py-3.5 rounded-full transition-all duration-300 font-medium"
          >
            Ver Galería
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;