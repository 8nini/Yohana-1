import React from 'react';
import { motion } from 'framer-motion';

const EyebrowStyles = ({ eyebrowStyles }) => {
  const guideData = [
    {
      title: "Rostro Ovalado",
      idealShape: "Arco suave y definido, con ligera inclinación.",
      reason: "Este rostro es equilibrado, así que casi cualquier estilo le queda bien. Las cejas con arco natural alargan visualmente y mantienen la proporción.",
      image: "/images/rostro-ovalado.webp"
    },
    {
      title: "Rostro Redondo",
      idealShape: "Arco marcado y cejas más angulosas.",
      reason: "Añaden definición y alargan visualmente el rostro, contrarrestando la redondez.",
      image: "/images/rostro-redondo.webp"
    },
    {
      title: "Rostro Cuadrado",
      idealShape: "Arco suave y redondeado, evitando ángulos muy marcados.",
      reason: "Suavizan la mandíbula fuerte y aportan feminidad o equilibrio.",
      image: "/images/rostro-cuadrado.webp"
    },
    {
      title: "Rostro Alargado / Rectangular",
      idealShape: "Cejas más rectas o con arco muy suave, evitando que sean demasiado altas.",
      reason: "Acortan visualmente el rostro y evitan acentuar su longitud.",
      image: "/images/rostro-alargado.webp"
    },
    {
      title: "Rostro Corazón",
      description: "(frente ancha, mentón estrecho)",
      idealShape: "Arco suave y redondeado, con inicio bien definido.",
      reason: "Equilibran la frente ancha y suavizan la transición hacia el mentón.",
      image: "/images/rostro-corazon.webp"
    },
    {
      title: "Rostro Diamante",
      description: "(pómulos anchos, frente y mentón estrechos)",
      idealShape: "Arco redondeado y cejas más largas en la parte interna.",
      reason: "Ayudan a equilibrar los pómulos prominentes y dan armonía al tercio superior del rostro.",
      image: "/images/rostro-diamante.webp"
    }
  ];

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

        <motion.div className="mt-24" variants={itemVariants}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary font-poppins">Guía Rápida: Cejas que Armonizan con tu Rostro</h3>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Las cejas no solo enmarcan la mirada: equilibran tu rostro. Elegir el diseño ideal según tu morfología facial realza tus rasgos naturales y aporta armonía. Aquí te decimos cuál es la mejor opción para ti:
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {guideData.map((item, index) => (
              <div key={index} className="bg-card-bg p-6 rounded-2xl border border-card-bg/50 space-y-3 flex flex-col">
                <div className="h-48 mb-4 rounded-lg overflow-hidden bg-background/50 flex items-center justify-center">
                    <img src={item.image} alt={`Forma de rostro ${item.title}`} className="w-full h-full object-contain" loading="lazy" decoding="async" />
                </div>
                <h4 className="text-xl font-bold text-primary-accent font-poppins">{item.title}</h4>
                {item.description && <p className="text-sm text-text-secondary -mt-2 mb-2 italic">{item.description}</p>}
                <div className="mt-2">
                  <p className="font-semibold text-text-primary flex items-center">
                    <span className="text-green-400 mr-2">✅</span> Forma ideal:
                  </p>
                  <p className="text-text-secondary pl-7">{item.idealShape}</p>
                </div>
                <div className="mt-2">
                  <p className="font-semibold text-text-primary flex items-center">
                    <span className="mr-2">✨</span> Por qué:
                  </p>
                  <p className="text-text-secondary pl-7 italic">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default EyebrowStyles;