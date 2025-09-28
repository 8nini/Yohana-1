import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [simulatorImage, setSimulatorImage] = useState(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState('brazo');
  const [designImage, setDesignImage] = useState(null);
  const [simulatorResult, setSimulatorResult] = useState(null);
  const [showSimulator, setShowSimulator] = useState(false);

  // Google Analytics - Simulación (en producción usarás el script real)
  useEffect(() => {
    // En producción, esto se reemplazará con el script de Google Analytics
    console.log('Google Analytics: página cargada - Sergio Tattoo');

    const handleScroll = () => {
      const sections = ['inicio', 'estilos', 'artistas', 'galeria', 'simulador', 'contacto'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            // Google Analytics: seguimiento de secciones
            console.log(`Google Analytics: sección vista - ${section}`);
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
      // Simulación de envío de formulario (en producción usarías un servicio como Formspree, Netlify Forms, etc.)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Google Analytics: seguimiento de envío de formulario
      console.log('Google Analytics: formulario enviado');

      // Reset form after 3 seconds
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
      image: "https://images.unsplash.com/photo-1615393009319-51a6218560ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Diseños impactantes utilizando únicamente tinta negra, con contrastes dramáticos y composiciones poderosas."
    },
    {
      id: 2,
      name: "Realismo",
      image: "https://images.unsplash.com/photo-1585903651295-5e275132259d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1599644196928-6f2be051114d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Diseños precisos basados en formas geométricas, patrones simétricos y mandalas que crean armonía visual en la piel."
    },
    {
      id: 5,
      name: "Japonés",
      image: "https://images.unsplash.com/photo-1624608853174-5a7e7a5a0e5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Estilo tradicional japonés con motivos culturales, simbólicos y mitológicos que cuentan historias ancestrales."
    }
  ];

  const artist = {
    name: "Sergio Fernández",
    specialty: "Artista Principal - Blackouts y Blackwork",
    image: "https://placehold.co/800x600/1a1a1a/ffffff?text=Sergio+Fernández",
    bio: "Tatuador independiente con más de 10 años de experiencia, especializado en Blackouts y Blackwork. Experto en diseños minimalistas y con la capacidad de transformar tus tatuajes viejos en nuevos diseños innovadores. Reconocido por su técnica impecable y atención al detalle.",
    instagram: "@sergiofernandez_tattoo",
    email: "styletattoo86@gmail.com",
    phone: "0424-2049941",
    experience: "10+ años"
  };

  const galleryImages = [
    "https://images.unsplash.com/photo-1615393009319-51a6218560ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1585903651295-5e275132259d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1577212820165-499512510092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1599644196928-6f2be051114d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1624608853174-5a7e7a5a0e5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1615393009319-51a6218560ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  // Simulador de tatuajes
  const bodyParts = [
    { id: 'brazo', name: 'Brazo', image: 'https://placehold.co/400x300/1a1a1a/ffffff?text=Brazo' },
    { id: 'pierna', name: 'Pierna', image: 'https://placehold.co/400x300/1a1a1a/ffffff?text=Pierna' },
    { id: 'pecho', name: 'Pecho', image: 'https://placehold.co/400x300/1a1a1a/ffffff?text=Pecho' },
    { id: 'espalda', name: 'Espalda', image: 'https://placehold.co/400x300/1a1a1a/ffffff?text=Espalda' },
    { id: 'hombro', name: 'Hombro', image: 'https://placehold.co/400x300/1a1a1a/ffffff?text=Hombro' },
    { id: 'antebrazo', name: 'Antebrazo', image: 'https://placehold.co/400x300/1a1a1a/ffffff?text=Antebrazo' }
  ];

  const handleSimulatorImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSimulatorImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDesignImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setDesignImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateTattoo = () => {
    if (!simulatorImage || !designImage) {
      alert('Por favor, selecciona una imagen del cliente y un diseño de tatuaje');
      return;
    }

    // Simulación simple: combina las imágenes
    setSimulatorResult({
      clientImage: simulatorImage,
      designImage: designImage,
      bodyPart: selectedBodyPart,
      simulatedImage: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==`
    });

    // En producción, aquí llamarías a una API de IA para generar la simulación real
    console.log('Simulando tatuaje en:', selectedBodyPart);
  };

  // Animaciones Framer Motion
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
    <div className="min-h-screen bg-black text-white">
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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Sergio Tattoo
                </h1>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {['inicio', 'estilos', 'artistas', 'galeria', 'simulador', 'contacto'].map((section) => (
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
                  {['inicio', 'estilos', 'artistas', 'galeria', 'simulador', 'contacto'].map((section) => (
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
          />
          <motion.div
            className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-4 leading-tight"
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
              Artista Principal - Blackouts & Blackwork
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
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
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{style.name}</h3>
                    <p className="text-gray-300 leading-relaxed">{style.description}</p>
                  </div>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                Artista Principal
              </h2>
            </div>
            <div className="bg-black/40 rounded-3xl overflow-hidden border border-gray-800/50 shadow-2xl">
              <div className="h-96 overflow-hidden">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">{artist.name}</h3>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
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
                    alt={`Tatuaje ${i+1}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Simulador de Tatuajes
              </h2>
              <p className="text-lg md:text-xl text-gray-400">
                ¡Prueba cómo se vería tu tatuaje antes de hacerlo!
              </p>
            </div>

            <div className="bg-black/40 rounded-3xl p-8 md:p-12 border border-gray-800/50">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">¿Cómo funciona?</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>Sube una foto de ti (con la parte del cuerpo donde quieres el tatuaje)</li>
                  <li>Selecciona o sube el diseño de tatuaje que deseas</li>
                  <li>Elige la parte del cuerpo donde irá el tatuaje</li>
                  <li>¡Haz clic en "Simular" y ve el resultado!</li>
                </ol>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-bold mb-2">Foto del cliente</h4>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSimulatorImageChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  />
                  {simulatorImage && (
                    <div className="mt-4">
                      <img src={simulatorImage} alt="Cliente" className="w-full h-48 object-cover rounded-lg" />
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-bold mb-2">Diseño de tatuaje</h4>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleDesignImageChange}
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
                <h4 className="font-bold mb-2">Parte del cuerpo</h4>
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
                      <img src={part.image} alt={part.name} className="w-full h-24 object-cover rounded mb-2" />
                      <span>{part.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={simulateTattoo}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 px-8 py-3.5 rounded-full font-bold text-white transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  Simular Tatuaje
                </button>
              </div>

              {simulatorResult && (
                <div className="mt-8 p-6 bg-gray-800/50 rounded-lg">
                  <h4 className="font-bold mb-4">Resultado de la simulación</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">Imagen original</h5>
                      <img src={simulatorResult.clientImage} alt="Original" className="w-full h-64 object-cover rounded-lg" />
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Resultado simulado</h5>
                      <div className="w-full h-64 bg-gray-900 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87.69 6.89L12 21l-5.69-.49.69-6.89-5-4.87 6.91-1.01L12 2z"/>
                            </svg>
                          </div>
                          <p className="text-sm text-gray-400 mt-2">En producción, aquí se mostraría la simulación real con IA</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-gray-400">Este es un simulador de demostración. En producción, utilizaríamos una API de IA avanzada para generar resultados reales.</p>
                  </div>
                </div>
              )}
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Contacto
              </h2>
              <p className="text-lg md:text-xl text-gray-400">
                ¿Listo para comenzar tu próximo tatuaje? Envíame un mensaje.
              </p>
            </div>

            <div className="bg-black/40 rounded-3xl p-8 md:p-12 border border-gray-800/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400 resize-none"
                    placeholder="Cuéntame sobre tu idea de tatuaje..."
                  ></textarea>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 px-8 py-3.5 rounded-full font-bold text-white transition-all duration-300 shadow-xl hover:shadow-2xl disabled:cursor-not-allowed"
                  >
                    {formStatus === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
                  </button>
                </div>

                {formStatus === 'success' && (
                  <motion.div
                    className="mt-4 p-4 bg-green-900/30 border border-green-500 rounded-lg text-green-300 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ¡Mensaje enviado! Te responderé pronto.
                  </motion.div>
                )}

                {formStatus === 'error' && (
                  <motion.div
                    className="mt-4 p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-300 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Error al enviar. Por favor, inténtalo de nuevo.
                  </motion.div>
                )}
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

        {/* Footer */}
        <footer className="bg-black py-12 border-t border-gray-800/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Sergio Tattoo
            </h3>
            <p className="text-gray-400 mb-2">Estado Miranda, Venezuela</p>
            <p className="text-gray-400 mb-4">Tel: {artist.phone}</p>
            <div className="mt-6">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 px-6 py-2.5 rounded-full font-semibold text-white transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contactar por WhatsApp
              </a>
            </div>
            <p className="text-gray-500 mt-8">© 2024 Sergio Fernández. Todos los derechos reservados.</p>
          </div>
        </footer>

        {/* Modal de imagen */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4"
            onClick={closeImageModal}
          >
            <div className="max-w-4xl max-h-full relative" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedImage}
                alt="Tatuaje"
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