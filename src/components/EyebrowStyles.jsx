import React from 'react';
import { motion } from 'framer-motion';

const EyebrowStyles = ({ eyebrowStyles }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      id="cejas"
      className="py-20 md:py-28 bg-background"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary font-poppins">Warriors Cejas</h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">¿Sueñas con cejas siempre impecables? Combinamos arte, técnica y las últimas tendencias para crear cejas que realzan tu mirada.</p>
        </motion.div>
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
          {eyebrowStyles.map((style) => (
            <motion.div
              key={style.id}
              className="bg-card-bg rounded-2xl overflow-hidden border border-card-bg/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="h-48">
                <img src={style.image} alt={style.name} className="w-full h-full object-contain transition-transform duration-700 hover:scale-110" loading="lazy" decoding="async" />
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-3 font-poppins">{style.name}</h3>
                <p className="text-text-secondary leading-relaxed">{style.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default EyebrowStyles;