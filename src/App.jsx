import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle');
  const [simulatorImage, setSimulatorImage] = useState(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState('brazo');
  const [designImage, setDesignImage] = useState(null);
  const [simulatorResult, setSimulatorResult] = useState(null);
  const [showSimulator, setShowSimulator] = useState(false);
  const [showWhatsappButton, setShowWhatsappButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      setShowWhatsappButton(window.scrollY > 300);

      const sections = ['inicio', 'estilos', 'cejas', 'artistas', 'galeria', 'simulador', 'contacto'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageClick = (image) => setSelectedImage(image);
  const closeImageModal = () => setSelectedImage(null);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const whatsappLink = `https://wa.me/584242049941?text=Hola%20Sergio,%20vi%20tu%20portafolio%20online%20y%20me%20gustaría%20agendar%20una%20cita%20para%20un%20tatuaje.`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      // Aquí implementarías Formspree o similar en producción
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  // Estilos de tatuaje
  const tattooStyles = [
    {
      id: 1,
      name: "Blackwork",
      image: "https://i.imgur.com/j7Fpyo6.jpeg",
      description: "Diseños impactantes utilizando únicamente tinta negra, con contrastes dramáticos y composiciones poderosas."
    },
    {
      id: 2,
      name: "Realismo",
      image: "https://i.imgur.com/HOFNR5H.jpeg",
      description: "Tatuajes con detalles hiperrealistas que parecen fotografías en la piel. Cada sombra y textura cuidadosamente recreada."
    },
    {
      id: 3,
      name: "Tradicionales",
      image: "https://images.unsplash.com/photo-1577212820165-499512510092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Estilo clásico americano con líneas gruesas, colores vibrantes y diseños icónicos que trascienden generaciones."
    },
    {
      id: 4,
      name: "Geométricos",
      image: "https://i.imgur.com/Ujd8maG.jpeg",
      description: "Diseños precisos basados en formas geométricas, patrones simétricos y mandalas que crean armonía visual en la piel."
    },
    {
      id: 5,
      name: "Japonés",
      image: "https://i.imgur.com/X1XXM51.jpeg",
      description: "Estilo tradicional japonés con motivos culturales, simbólicos y mitológicos que cuentan historias ancestrales."
    }
  ];

  // Estilos de cejas
  const eyebrowStyles = [
    {
      id: 1,
      name: "Hair Stroke – Hiperrealismo pelo a pelo",
      description: "Trazos finos y precisos que imitan cada vello con realismo absoluto. Ideal para un look suave, fresco y 100% natural, incluso sin maquillaje."
    },
    {
      id: 2,
      name: "Messy Brows – Volumen con actitud",
      description: "Un estilo moderno, espontáneo y lleno de vida. Cejas con movimiento, textura y volumen que lucen como recién peinadas… ¡sin hacer nada!"
    },
    {
      id: 3,
      name: "Tupidas y Laminadas – Densidad con brillo",
      description: "Combinamos micropigmentación con tratamiento laminado para crear cejas densas, ordenadas y con un acabado brillante y saludable que dura semanas."
    },
    {
      id: 4,
      name: "Powder Brows – Sombreado suave y elegante",
      description: "Un relleno difuminado que imita el polvo de cejas, con bordes suaves y color uniforme. Perfecto para un look definido, moderno y natural al mismo tiempo."
    },
    {
      id: 5,
      name: "Estilo Híbrido – Lo mejor de dos mundos",
      description: "Fusionamos trazos realistas en la parte delantera con sombreado suave en el centro y cola. El equilibrio ideal entre realismo y definición."
    }
  ];

  const artist = {
    name: "Sergio Fernández",
    specialty: "Artista Principal - Blackouts y Blackwork",
    image: "https://i.imgur.com/t2rcfkO.png",
    bio: "Tatuador independiente con más de 10 años de experiencia, especializado en Blackouts y Blackwork. Experto en diseños minimalistas y con la capacidad de transformar tus tatuajes viejos en nuevos diseños innovadores. Reconocido por su técnica impecable y atención al detalle.",
    instagram: "@sergiofernandez_tattoo",
    email: "styletattoo86@gmail.com",
    phone: "0424-2049941",
    experience: "10+ años"
  };

  const galleryImages = [
    "https://i.imgur.com/PppDLeb.jpeg",
    "https://i.imgur.com/M0kkHn6.jpeg",
    "https://i.imgur.com/trNozRZ.jpeg",
    "https://i.imgur.com/p920JrQ.jpeg",
    "https://i.imgur.com/0EjSn5r.jpeg"
  ];

  const testimonials = [
    {
      id: 1,
      name: "María Rodríguez",
      text: "Sergio transformó completamente mis cejas. Ahora me levanto y ya estoy lista para el día. ¡Totalmente natural!",
      rating: 5
    },
    {
      id: 2,
      name: "Carlos Méndez",
      text: "Mi tatuaje de blackwork superó todas mis expectativas. La técnica y atención al detalle son increíbles.",
      rating: 5
    },
    {
      id: 3,
      name: "Ana Silva",
      text: "Profesionalismo, calidad y resultados espectaculares. ¡100% recomendado!",
      rating: 5
    }
  ];

  const bodyParts = [
    { id: 'brazo', name: 'Brazo' },
    { id: 'pierna', name: 'Pierna' },
    { id: 'pecho', name: 'Pecho' },
    { id: 'espalda', name: 'Espalda' },
    { id: 'hombro', name: 'Hombro' },
    { id: 'antebrazo', name: 'Antebrazo' }
  ];

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-red-500 to-pink-500 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Header */}
      <motion.header
        className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </motion.div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent font-playfair">
                Sergio Tattoo
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {['inicio', 'estilos', 'cejas', 'artistas', 'galeria', 'simulador', 'contacto'].map((section) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === section
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.button>
              ))}
            </nav>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Agenda tu cita
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-gray-800/50">
              <div className="px-4 py-4 space-y-2">
                {['inicio', 'estilos', 'cejas', 'artistas', 'galeria', 'simulador', 'contacto'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeSection === section
                        ? 'bg-red-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 mt-2"
                >
                  Agenda tu cita
                </a>
              </div>
            </div>
          )}
        </div>
      </motion.header>

      {/* Hero */}
      <section id="inicio" className="relative h-screen flex items-center justify-center bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 z-0"></div>
        <img
          src="https://images.unsplash.com/photo-1615393009319-51a6218560ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="Fondo estudio"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-4 leading-tight font-playfair"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Sergio Fernández
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-red-400 mb-6 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Artista Principal - Blackouts y Blackwork
          </motion.p>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
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
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-3.5 rounded-full font-bold text-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
            >
              Contactar por WhatsApp
            </a>
            <button
              onClick={() => scrollToSection('galeria')}
              className="border-2 border-white hover:bg-white hover:text-black px-8 py-3.5 rounded-full transition-all duration-300 font-medium transform hover:-translate-y-0.5"
            >
              Ver Galería
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Estilos */}
      <motion.section
        id="estilos"
        className="py-20 md:py-28 bg-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent font-playfair">
              Estilos de Tatuaje
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Especializado en técnicas que marcan tendencia en Venezuela.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {tattooStyles.map((style) => (
              <motion.div
                key={style.id}
                className="bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={style.image}
                    alt={style.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-playfair">{style.name}</h3>
                  <p className="text-gray-300 leading-relaxed">{style.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Estilos de Cejas */}
      <motion.section
        id="cejas"
        className="py-20 md:py-28 bg-gray-900/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-playfair">
              Descubre tu estilo perfecto
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              ¿Sueñas con cejas siempre impecables? Combinamos arte, técnica y las últimas tendencias para crear cejas que realzan tu mirada y se adaptan a tu rostro, piel y personalidad.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {eyebrowStyles.map((style) => (
              <motion.div
                key={style.id}
                className="bg-black/40 rounded-2xl p-6 border border-gray-800/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-playfair">{style.name}</h3>
                <p className="text-gray-300 leading-relaxed">{style.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonios */}
      <motion.section
        id="testimonios"
        className="py-20 md:py-28 bg-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-playfair">
              Lo que dicen mis clientes
            </h2>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50"
                variants={itemVariants}
              >
                <div className="flex mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4">"{testimonial.text}"</p>
                <p className="text-white font-semibold">- {testimonial.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Artista */}
      <motion.section
        id="artistas"
        className="py-20 md:py-28 bg-gray-900/50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent font-playfair">
              Artista Principal
            </h2>
          </div>
          <div className="bg-black/40 rounded-3xl overflow-hidden border border-gray-800/50 shadow-2xl">
            <div className="h-96 overflow-hidden">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-8 md:p-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 font-playfair">{artist.name}</h3>
              <p className="text-red-400 font-medium text-lg md:text-xl mb-6">{artist.specialty}</p>
              <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">{artist.bio}</p>
              <div className="flex flex-wrap justify-center gap-6 text-gray-400">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  {artist.instagram}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  Tel: {artist.phone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Galería */}
      <motion.section
        id="galeria"
        className="py-20 md:py-28 bg-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent font-playfair">
              Galería de Trabajos
            </h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={containerVariants}
          >
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                className="aspect-square bg-gray-900 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                onClick={() => handleImageClick(img)}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={img}
                  alt={`Trabajo ${i+1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Simulador de Tatuajes */}
      <motion.section
        id="simulador"
        className="py-20 md:py-28 bg-gray-900/30"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-playfair">
              Simulador de Tatuajes
            </h2>
            <p className="text-lg md:text-xl text-gray-400">
              ¡Prueba cómo se vería tu tatuaje antes de hacerlo!
            </p>
          </div>

          <div className="bg-black/40 rounded-3xl p-8 md:p-12 border border-gray-800/50">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 font-playfair">¿Cómo funciona?</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Sube una foto de ti (con la parte del cuerpo donde quieres el tatuaje)</li>
                <li>Selecciona o sube el diseño de tatuaje que deseas</li>
                <li>Elige la parte del cuerpo donde irá el tatuaje</li>
                <li>¡Haz clic en "Simular" y ve el resultado!</li>
              </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-bold mb-2 font-playfair">Foto del cliente</h4>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => setSimulatorImage(event.target.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                />
                {simulatorImage && (
                  <div className="mt-4">
                    <img src={simulatorImage} alt="Cliente" className="w-full h-48 object-cover rounded-lg" />
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-bold mb-2 font-playfair">Diseño de tatuaje</h4>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => setDesignImage(event.target.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                />
                {designImage && (
                  <div className="mt-4">
                    <img src={designImage} alt="Diseño" className="w-full h-48 object-cover rounded-lg" />
                  </div>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-bold mb-2 font-playfair">Parte del cuerpo</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {bodyParts.map((part) => (
                  <motion.button
                    key={part.id}
                    onClick={() => setSelectedBodyPart(part.id)}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      selectedBodyPart === part.id
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{part.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  if (!simulatorImage || !designImage) {
                    alert('Por favor, selecciona una imagen del cliente y un diseño de tatuaje');
                    return;
                  }
                  alert('¡Simulación completada! En producción, esto mostraría el resultado real.');
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 px-8 py-3.5 rounded-full font-bold text-white transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Simular Tatuaje
              </button>
            </div>
          </div>
        </motion.section>

        {/* Formulario de Contacto */}
        <motion.section
          id="contacto"
          className="py-20 md:py-28 bg-gray-900/30"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-playfair">
                Contacto
              </h2>
              <p className="text-lg md:text-xl text-gray-400">
                ¿Listo para comenzar tu próximo tatuaje? Envíame un mensaje.
              </p>
            </div>

            <div className="bg-black/40 rounded-3xl p-8 md:p-12 border border-gray-800/50">
              <form
                action="https://formspree.io/f/xyznkvap"
                method="POST"
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 font-playfair">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 font-playfair">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 font-playfair">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400 resize-none"
                    placeholder="Cuéntame sobre tu idea de tatuaje..."
                  ></textarea>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-3.5 rounded-full font-bold text-white transition-all duration-300 shadow-xl hover:shadow-2xl"
                  >
                    Enviar Mensaje
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-400 mb-4">¿Prefieres contactarme directamente?</p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-600 hover:bg-green-700 px-6 py-2.5 rounded-full font-semibold text-white transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp: {artist.phone}
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Floating WhatsApp Button */}
        {showWhatsappButton && (
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-40"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </motion.a>
          )}

        {/* Modal de imagen */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4"
            onClick={closeImageModal}
          >
            <div className="max-w-4xl max-h-full relative" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedImage}
                alt="Trabajo"
                className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              />
              <motion.button
                onClick={closeImageModal}
                className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </div>
        )}
    </div>
  );
};

export default App;