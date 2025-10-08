import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
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
      id="sobre-nosotros"
      className="py-20 md:py-28 bg-card-bg"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary font-poppins">Sobre Nosotros</h2>
          <p className="text-lg md:text-xl text-text-secondary mt-4">
            Tatuajes: Donde la Historia se Encuentra con tu Estilo
          </p>
        </motion.div>

        <motion.div className="space-y-8 text-text-secondary" variants={containerVariants}>
          <motion.p variants={itemVariants}>
            El tatuaje no es solo arte en la piel: es una tradición milenaria que ha viajado desde los rituales sagrados de Polinesia, los símbolos curativos de Ötzi (¡hace más de 5.000 años!) y los diseños espirituales del Japón antiguo, hasta convertirse en una de las formas más personales de expresión en el mundo actual.
          </motion.p>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-primary-accent mb-4 font-poppins">Raíces que inspiran</h3>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>En culturas como la maorí, el tatuaje contaba tu historia, tu linaje y tu lugar en el mundo.</li>
              <li>En el antiguo Egipto, protegía a las mujeres durante el embarazo.</li>
              <li>En Japón, los <em>irezumi</em> narraban leyendas de valentía y honor.</li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-primary-accent mb-4 font-poppins">Hoy: tu piel, tu lienzo</h3>
            <p className="mb-2">Hoy, el tatuaje fusiona esas raíces con innovación, tecnología y estilo. Ya sea que busques:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Un diseño <strong>minimalista y moderno</strong></li>
              <li>Un <strong>tribal con significado ancestral</strong></li>
              <li>Un <strong>realismo hiperdetallado</strong></li>
              <li>O un <strong>toque japonés, geométrico o acuarela</strong></li>
            </ul>
            <p className="mt-2">…lo hacemos con respeto, técnica y pasión.</p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-primary-accent mb-4 font-poppins">Seguridad + Estética = Confianza</h3>
            <p>Trabajamos con equipos esterilizados, tintas de calidad y protocolos de higiene.</p>
          </motion.div>

          <hr className="border-card-bg/50" />

          <motion.div variants={itemVariants} className="text-center">
            <h4 className="text-xl font-bold text-text-primary">¿Listo para dejar tu marca?</h4>
            <p className="mt-2">Agenda una consulta gratuita y crea un tatuaje que no solo se vea bien… sino que signifique algo.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutUs;