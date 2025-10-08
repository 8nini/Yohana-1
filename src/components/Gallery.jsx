import React from 'react';
import { motion } from 'framer-motion';

const Gallery = ({ galleryImages, handleImageClick }) => {
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
      id="galeria"
      className="py-20 md:py-28 bg-card-bg"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 id="gallery-heading" className="text-4xl md:text-5xl font-bold mb-4 text-text-primary font-poppins">Galería de Trabajos</h2>
        </motion.div>
        <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" variants={containerVariants}>
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              className="aspect-square rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
              onClick={() => handleImageClick(img.src)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-contain transition-transform duration-500 hover:scale-110" loading="lazy" decoding="async" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Gallery;