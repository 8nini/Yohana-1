// Trivial change to trigger Vercel deployment
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useForm, ValidationError } from '@formspree/react';
import Draggable from 'react-draggable';
import {
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  SwatchIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  ExclamationCircleIcon,
  ClockIcon,
  SunIcon,
} from '@heroicons/react/24/outline';

const App = () => {
  const [state, handleSubmit] = useForm("YOUR_FORM_ID");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [simulatorImage, setSimulatorImage] = useState(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState('brazo');
  const [designImage, setDesignImage] = useState(null);
  const [designUrl, setDesignUrl] = useState('');
  const [tattooSize, setTattooSize] = useState(100);
  const constraintsRef = useRef(null);
  const draggableRef = useRef(null);
  const [showWhatsappButton, setShowWhatsappButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      setShowWhatsappButton(window.scrollY > 300);
      
      const sections = ['inicio', 'estilos', 'sobre-nosotros', 'cejas', 'artistas', 'galeria', 'simulador', 'inspiracion-ia', 'cuidados', 'contacto'];
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

  const handleSimulatorImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSimulatorImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDesignUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setDesignImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDesignSelect = (imageSrc) => {
    setDesignImage(imageSrc);
  };

  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!aiPrompt) return;

    setIsGenerating(true);
    setAiResponse('');

    setTimeout(() => {
      const responses = [
        `Un diseño excelente podría ser un lobo con detalles geométricos en el pelaje, mirando hacia una luna con fases cambiantes. Se vería genial en blackwork.`,
        `Para un tatuaje de un león, podríamos usar un estilo de realismo para el rostro, pero que se desvanezca en patrones de mandalas en la melena.`,
        `Una idea creativa para una rosa es diseñarla en estilo tradicional, pero con espinas que se transforman en una serpiente que rodea el tallo.`
      ];
      setAiResponse(responses[Math.floor(Math.random() * responses.length)]);
      setIsGenerating(false);
    }, 2000);
  };

  const tattooStyles = [
    { id: 1, name: "Blackwork", image: "/images/blackwork.webp", description: "Diseños impactantes utilizando únicamente tinta negra, con contrastes dramáticos y composiciones poderosas." },
    { id: 2, name: "Realismo", image: "/images/realismo.webp", description: "Tatuajes con detalles hiperrealistas que parecen fotografías en la piel. Cada sombra y textura cuidadosamente recreada." },
    { id: 3, name: "Tradicionales", image: "/images/tradicionales.webp", description: "Estilo clásico americano con líneas gruesas, colores vibrantes y diseños icónicos que trascienden generaciones." },
    { id: 4, name: "Geométricos", image: "/images/geometricos.webp", description: "Diseños precisos basados en formas geométricas, patrones simétricos y mandalas que crean armonía visual en la piel." },
    { id: 5, name: "Japonés", image: "/images/japones.webp", description: "Estilo tradicional japonés con motivos culturales, simbólicos y mitológicos que cuentan historias ancestrales." }
  ];

  const eyebrowStyles = [
    { id: 1, name: "Hair Stroke – Hiperrealismo pelo a pelo", image: "/images/hair-stroke.webp", description: "Trazos finos y precisos que imitan cada vello con realismo absoluto. Ideal para un look suave, fresco y 100% natural, incluso sin maquillaje." },
    { id: 2, name: "Messy Brows – Volumen con actitud", image: "/images/messy-brows.webp", description: "Un estilo moderno, espontáneo y lleno de vida. Cejas con movimiento, textura y volumen que lucen como recién peinadas… ¡sin hacer nada!" },
    { id: 3, name: "Tupidas y Laminadas – Densidad con brillo", image: "/images/tupidas-laminadas.webp", description: "Combinamos micropigmentación con tratamiento laminado para crear cejas densas, ordenadas y con un acabado brillante y saludable que dura semanas." },
    { id: 4, name: "Powder Brows – Sombreado suave y elegante", image: "/images/powder-brows.webp", description: "Un relleno difuminado que imita el polvo de cejas, con bordes suaves y color uniforme. Perfecto para un look definido, moderno y natural al mismo tiempo." },
    { id: 5, name: "Estilo Híbrido – Lo mejor de dos mundos", image: "/images/hibrido.webp", description: "Fusionamos trazos realistas en la parte delantera con sombreado suave en el centro y cola. El equilibrio ideal entre realismo y definición." }
  ];

  const artist = {
    name: "Sergio Fernández",
    specialty: "Artista Principal - Blackouts y Blackwork",
    image: "/images/sergio.webp",
    bio: "Tatuador independiente con más de 10 años de experiencia, especializado en Blackouts y Blackwork. Experto en diseños minimalistas y con la capacidad de transformar tus tatuajes viejos en nuevos diseños innovadores. Reconocido por su técnica impecable y atención al detalle.",
    instagram: "@sergiofernandez_tattoo",
    email: "styletattoo86@gmail.com",
    phone: "0424-2049941",
    experience: "10+ años"
  };

  const galleryImages = [
    { src: "/images/galeria-1.webp", alt: "Tatuaje de rosario en hombro y brazo, estilo blackwork." },
    { src: "/images/galeria-2.webp", alt: "Tatuaje de dragón en la espalda, estilo japonés a color." },
    { src: "/images/galeria-3.webp", alt: "Tatuaje de diseño biomecánico en antebrazo, blackwork." },
    { src: "/images/galeria-4.webp", alt: "Tatuaje de rostro de mujer en antebrazo, blackwork." }
  ];

  const testimonials = [
    { id: 1, name: "María Rodríguez", text: "Sergio transformó completamente mis cejas. Ahora me levanto y ya estoy lista para el día. ¡Totalmente natural!", rating: 5 },
    { id: 2, name: "Carlos Méndez", text: "Mi tatuaje de blackwork superó todas mis expectativas. La técnica y atención al detalle son increíbles.", rating: 5 },
    { id: 3, name: "Ana Silva", text: "Profesionalismo, calidad y resultados espectaculares. ¡100% recomendado!", rating: 5 }
  ];

  const bodyParts = [
    { id: 'brazo', name: 'Brazo' }, { id: 'pierna', name: 'Pierna' }, { id: 'pecho', name: 'Pecho' },
    { id: 'espalda', name: 'Espalda' }, { id: 'hombro', name: 'Hombro' }, { id: 'antebrazo', name: 'Antebrazo' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <>
      {/* SEO Avanzado - Schema.org y Meta Tags */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TattooParlor",
          "name": "Sergio Tattoo",
          "description": "Tatuador profesional en Caracas y Miranda, Venezuela. Especialista en Blackwork, Realismo y cejas.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Caracas",
            "addressRegion": "Distrito Capital",
            "addressCountry": "VE"
          },
          "areaServed": [
            {
              "@type": "State",
              "name": "Miranda"
            },
            {
              "@type": "City",
              "name": "Caracas"
            }
          ],
          "telephone": "+584242049941",
          "url": "https://yohana-1.vercel.app",
          "sameAs": ["https://instagram.com/sergiofernandez_tattoo"],
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          "priceRange": "$$"
        })}
      </script>

      {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-T194PS9EXJ"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-T194PS9EXJ');
        `}
      </script>

      {/* Meta Tags SEO optimizados */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Tatuador profesional en Caracas y Miranda con más de 10 años de experiencia. Especialista en Blackwork, Realismo, cejas y transformación de tatuajes." />
      <meta name="keywords" content="tatuador en Caracas, tatuador en Miranda, tatuajes Distrito Capital, Blackwork Venezuela, Sergio Fernández tattoo, cejas microblading, estudio de tatuajes Venezuela, tatuajes realistas" />
      <meta name="author" content="Sergio Fernández" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta property="og:title" content="Sergio Fernández - Tatuador Profesional en Caracas y Miranda" />
      <meta property="og:description" content="Transforma tus ideas en arte permanente con un especialista en Blackwork y Realismo en Caracas y Miranda." />
      <meta property="og:image" content="https://yohana-1.vercel.app/images/hero.webp" />
      <meta property="og:url" content="https://yohana-1.vercel.app" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_VE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Sergio Fernández - Tatuador Profesional en Caracas y Miranda" />
      <meta name="twitter:description" content="Especialista en Blackwork y transformación de tatuajes en Caracas y Miranda, Venezuela." />
      <meta name="twitter:image" content="https://yohana-1.vercel.app/images/hero.webp" />
      <link rel="canonical" href="https://yohana-1.vercel.app" />
      <title>Tatuador en Caracas y Miranda - Sergio Tattoo | Blackwork & Cejas</title>

      <div className="min-h-screen bg-background text-text-primary font-inter">
        <div 
          className="fixed top-0 left-0 h-1 bg-primary-accent z-50 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        ></div>

        <motion.header 
          className="fixed w-full z-50 bg-background/90 backdrop-blur-md border-b border-card-bg/50"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="w-12 h-12 bg-primary-accent rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-7 h-7 text-background" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </motion.div>
                <h1 className="text-2xl font-bold text-primary-accent font-poppins">
                  Sergio Tattoo
                </h1>
              </div>
              
              <nav className="hidden lg:flex items-center space-x-1">
                {['inicio', 'estilos', 'sobre-nosotros', 'cejas', 'artistas', 'galeria', 'simulador', 'inspiracion-ia', 'cuidados', 'contacto'].map((section) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeSection === section
                        ? 'bg-primary-accent text-background'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section === 'sobre-nosotros' ? 'Sobre Nosotros' : section.charAt(0).toUpperCase() + section.slice(1)}
                  </motion.button>
                ))}
              </nav>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:block bg-primary-accent hover:bg-opacity-80 px-6 py-2.5 rounded-full font-semibold text-sm text-background transition-all duration-300 shadow-lg"
              >
                Agenda tu cita
              </a>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-md text-text-secondary hover:text-text-primary"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {isMenuOpen && (
              <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-card-bg/50">
                <div className="px-4 py-4 space-y-2">
                  {['inicio', 'estilos', 'sobre-nosotros', 'cejas', 'artistas', 'galeria', 'simulador', 'inspiracion-ia', 'cuidados', 'contacto'].map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeSection === section
                          ? 'bg-primary-accent text-background'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {section === 'sobre-nosotros' ? 'Sobre Nosotros' : section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  ))}
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-primary-accent hover:bg-opacity-80 px-4 py-3 rounded-lg font-semibold text-sm text-background transition-all duration-300 mt-2"
                  >
                    Agenda tu cita
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.header>

        <section id="inicio" className="relative h-screen flex items-center justify-center bg-background">
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/80 z-0"></div>
          <img 
            src="/images/hero.webp"
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

        <motion.section 
          id="estilos" 
          className="py-20 md:py-28 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary font-poppins">Estilos de Tatuaje</h2>
              <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">Especializado en técnicas que marcan tendencia en Caracas y Miranda.</p>
            </motion.div>
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
              {tattooStyles.map((style) => (
                <motion.div 
                  key={style.id} 
                  className="bg-card-bg rounded-2xl overflow-hidden border border-card-bg/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="h-48 bg-gray-900">
                     <img src={style.image} alt={style.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy" decoding="async" />
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

        <motion.section
          id="sobre-nosotros"
          className="py-20 md:py-28 bg-card-bg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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
                  <div className="h-48 bg-gray-900">
                     <img src={style.image} alt={style.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy" decoding="async" />
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

        <motion.section 
          id="testimonios" 
          className="py-20 md:py-28 bg-card-bg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary font-poppins">Lo que dicen mis clientes</h2>
            </motion.div>
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
              {testimonials.map((testimonial) => (
                <motion.div key={testimonial.id} className="bg-background rounded-2xl p-6 border border-background/50" variants={itemVariants}>
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-primary-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-text-secondary italic mb-4">"{testimonial.text}"</p>
                  <p className="text-text-primary font-semibold">- {testimonial.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="artistas" 
          className="py-20 md:py-28 bg-background"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary font-poppins">Artista Principal</h2>
            </div>
            <div className="bg-card-bg rounded-3xl overflow-hidden border border-card-bg/50 shadow-2xl">
              <div className="h-96 overflow-hidden">
                <img src={artist.image} alt={artist.name} className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
              </div>
              <div className="p-8 md:p-12">
                <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-3 font-poppins">{artist.name}</h3>
                <p className="text-primary-accent font-medium text-lg md:text-xl mb-6">{artist.specialty}</p>
                <p className="text-text-secondary text-base md:text-lg mb-8 leading-relaxed">{artist.bio}</p>
                <div className="flex flex-wrap justify-center gap-6 text-text-secondary">
                  <span className="flex items-center"><svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>{artist.instagram}</span>
                  <span className="flex items-center"><svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>Tel: {artist.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

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
                  className="aspect-square bg-background rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                  onClick={() => handleImageClick(img.src)}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" decoding="async" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="simulador"
          className="py-20 md:py-28 bg-background"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary font-poppins">Simulador de Tatuajes</h2>
              <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
                ¿No estás seguro de cómo se verá? Sube una foto de la parte de tu cuerpo que quieres tatuar y prueba cómo quedarían nuestros diseños.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Columna de Controles */}
              <div className="lg:col-span-1 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-4 font-poppins">1. Sube tu Foto</h3>
                  <div className="bg-card-bg rounded-2xl p-6 border border-card-bg/50">
                    <label htmlFor="simulator-upload" className="cursor-pointer block text-center border-2 border-dashed border-primary-accent/50 rounded-xl py-10 px-4 hover:bg-primary-accent/10 transition-all">
                      <svg className="w-12 h-12 mx-auto text-primary-accent/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      <span className="mt-2 block text-sm font-semibold text-primary-accent">
                        {simulatorImage ? "Cambiar foto" : "Seleccionar una foto"}
                      </span>
                    </label>
                    <input id="simulator-upload" type="file" accept="image/*" className="hidden" onChange={handleSimulatorImageUpload} />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-4 font-poppins">2. Elige un Diseño</h3>
                  <div className="bg-card-bg rounded-2xl p-6 border border-card-bg/50 space-y-4">
                    <p className="text-sm text-text-secondary text-center">Elige uno de nuestros diseños...</p>
                    <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                      {galleryImages.map((img, i) => (
                        <div
                          key={i}
                          className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${designImage === img.src ? 'border-primary-accent' : 'border-transparent'}`}
                          onClick={() => handleDesignSelect(img.src)}
                        >
                          <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-text-secondary text-center">...o sube el tuyo.</p>
                    <div>
                      <label htmlFor="design-upload" className="cursor-pointer text-center w-full block bg-primary-accent/10 hover:bg-primary-accent/20 text-primary-accent font-semibold py-2 px-4 rounded-lg transition-all text-sm">
                        Subir desde archivo
                      </label>
                      <input id="design-upload" type="file" accept="image/*" className="hidden" onChange={handleDesignUpload} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={designUrl}
                        onChange={(e) => setDesignUrl(e.target.value)}
                        placeholder="O pega una URL"
                        className="w-full px-3 py-2 bg-background/50 border border-background/50 rounded-lg focus:ring-1 focus:ring-primary-accent text-sm"
                      />
                      <button
                        onClick={() => {
                          const isValidImageUrl = (url) => {
                            return url.startsWith('http://') || url.startsWith('https');
                          };
                          if (isValidImageUrl(designUrl)) {
                            setDesignImage(designUrl);
                          } else {
                            alert('URL inválida. Por favor, introduce una URL de una imagen válida que empiece con http:// o https://.');
                          }
                        }}
                        className="p-2 bg-primary-accent rounded-lg text-background hover:bg-opacity-80"
                        aria-label="Cargar diseño desde URL"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-4 font-poppins">3. Ajusta el Tamaño</h3>
                   <div className="bg-card-bg rounded-2xl p-6 border border-card-bg/50">
                    <input
                      type="range"
                      min="20"
                      max="200"
                      value={tattooSize}
                      onChange={(e) => setTattooSize(e.target.value)}
                      className="w-full h-2 bg-primary-accent/20 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Columna del Simulador */}
              <div className="lg:col-span-2 bg-card-bg rounded-2xl p-4 border border-card-bg/50 min-h-[400px] lg:min-h-[600px] flex items-center justify-center">
                <div ref={constraintsRef} className="relative w-full h-full overflow-hidden">
                  {simulatorImage ? (
                    <img src={simulatorImage} alt="Parte del cuerpo para simular tatuaje" className="w-full h-full object-contain" />
                  ) : (
                     <div className="flex flex-col items-center justify-center h-full text-text-secondary">
                        <svg className="w-24 h-24 text-primary-accent/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6l.293-.293a1 1 0 011.414 0L18 10M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        <p className="mt-4 font-semibold">Sube una foto para empezar</p>
                     </div>
                  )}
                  {simulatorImage && designImage && (
                    <Draggable bounds="parent" nodeRef={draggableRef}>
                      <div ref={draggableRef} className="absolute cursor-move" style={{ width: `${tattooSize}px`, height: 'auto' }}>
                        <img src={designImage} alt="Diseño de tatuaje para simular" className="w-full h-full object-contain pointer-events-none" />
                      </div>
                    </Draggable>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="inspiracion-ia"
          className="py-20 md:py-28 bg-card-bg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary font-poppins">Inspiración con IA</h2>
              <p className="text-lg md:text-xl text-text-secondary">¿Sin ideas? Describe lo que te gustaría y deja que nuestra IA te dé una sugerencia creativa.</p>
            </div>
            <div className="bg-background rounded-3xl p-8 md:p-12 border border-background/50">
              <form onSubmit={handleAiSubmit} className="space-y-4">
                <div>
                  <label htmlFor="ai-prompt" className="block text-sm font-medium text-text-secondary mb-2 font-poppins">Describe tu idea de tatuaje</label>
                  <input
                    type="text"
                    id="ai-prompt"
                    name="ai-prompt"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="w-full px-4 py-3 bg-card-bg border border-card-bg/50 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-transparent text-text-primary placeholder-text-secondary"
                    placeholder="Ej: Un lobo aullando a la luna en estilo blackwork"
                  />
                </div>
                <div className="text-center">
                  <button type="submit" disabled={isGenerating} className="bg-primary-accent hover:bg-opacity-80 px-8 py-3.5 rounded-full font-bold text-background transition-all duration-300 shadow-xl disabled:bg-gray-500">
                    {isGenerating ? "Generando..." : "Obtener Idea"}
                  </button>
                </div>
              </form>
              {aiResponse && (
                <div className="mt-8 p-6 bg-background rounded-2xl border border-background/50">
                  <p className="text-text-secondary text-center italic">{aiResponse}</p>
                </div>
              )}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="cuidados"
          className="py-20 md:py-28 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary font-poppins">Warriors Cuidados</h2>
              <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
                Cuidados Básicos para tu Primer Tatuaje: Tu guía esencial para una curación segura y un resultado perfecto.
              </p>
            </motion.div>

            <motion.div className="space-y-12 text-left" variants={containerVariants}>
              <motion.div variants={itemVariants}>
                <h3 className="flex items-center text-2xl font-bold text-primary-accent mb-4 font-poppins">
                  <CheckBadgeIcon className="h-8 w-8 mr-3" />
                  Pasos Diarios para los Primeros 2-4 Semanas
                </h3>
                <div className="space-y-4 text-text-secondary pl-11">
                  <div>
                    <h4 className="font-semibold text-lg text-text-primary">1. Limpieza suave (2 veces al día)</h4>
                    <ul className="list-disc list-inside ml-4">
                      <li>Lávate las manos antes de tocar tu tatuaje.</li>
                      <li>Usa agua tibia y un jabón antibacteriano suave, sin fragancia (ej. Dove Sensitive, Dr. Bronner’s).</li>
                      <li>Lava con las yemas de los dedos, sin frotar.</li>
                      <li>Enjuaga bien y seca con toques suaves usando una toalla limpia o papel absorbente.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-text-primary">2. Hidratación ligera</h4>
                    <ul className="list-disc list-inside ml-4">
                      <li>Aplica una capa fina de crema o pomada para tatuajes (ej. Bepanthen, Aquaphor, o lociones sin perfume).</li>
                      <li>No uses vaselina ni productos grasos en exceso: pueden atrapar bacterias y bloquear la curación.</li>
                      <li>Hidrata 2–3 veces al día, solo cuando la piel esté seca.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-text-primary">3. Deja que respire</h4>
                    <ul className="list-disc list-inside ml-4">
                      <li>Evita cubrir el tatuaje después de las primeras horas (a menos que tu artista indique lo contrario).</li>
                      <li>Usa ropa holgada y de algodón para reducir la fricción.</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="flex items-center text-2xl font-bold text-primary-accent mb-4 font-poppins">
                  <ExclamationTriangleIcon className="h-8 w-8 mr-3" />
                  Qué Evitar ABSOLUTAMENTE
                </h3>
                <ul className="list-disc list-inside ml-11 space-y-2 text-text-secondary">
                  <li>No te rasques ni arranques las costras, aunque pique. ¡Puedes perder tinta o dejar cicatrices!</li>
                  <li>No expongas tu tatuaje al sol directo ni uses bronceadores (ni camas solares).</li>
                  <li>No nades en piscinas, mar, jacuzzis o saunas durante al menos 4 semanas.</li>
                  <li>No hagas ejercicio intenso que cause sudoración excesiva en los primeros 5–7 días.</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="flex items-center text-2xl font-bold text-primary-accent mb-4 font-poppins">
                  <SwatchIcon className="h-8 w-8 mr-3" />
                   Recomendaciones por Tipo de Piel
                </h3>
                <div className="overflow-x-auto pl-11">
                  <table className="w-full text-left bg-background rounded-lg">
                    <thead>
                      <tr>
                        <th className="p-4 font-semibold text-text-primary">Tipo de piel</th>
                        <th className="p-4 font-semibold text-text-primary">Consejo clave</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-card-bg/50">
                        <td className="p-4 text-text-secondary">Grasa</td>
                        <td className="p-4 text-text-secondary">Usa humectantes no comedogénicos (que no obstruyan poros).</td>
                      </tr>
                      <tr className="border-t border-card-bg/50">
                        <td className="p-4 text-text-secondary">Seca</td>
                        <td className="p-4 text-text-secondary">Hidrata más frecuentemente con cremas nutritivas (con aloe, manteca de karité o pantenol).</td>
                      </tr>
                      <tr className="border-t border-card-bg/50">
                        <td className="p-4 text-text-secondary">Sensible</td>
                        <td className="p-4 text-text-secondary">Elige productos sin fragancia, alcohol ni colorantes. Haz una prueba en otra zona antes de usar.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="flex items-center text-sm text-text-secondary mt-2 italic pl-11">
                  <LightBulbIcon className="h-4 w-4 mr-2" />
                  Todos los tipos de piel deben evitar el sol y mantener una higiene impecable.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="flex items-center text-2xl font-bold text-primary-accent mb-4 font-poppins">
                  <MagnifyingGlassIcon className="h-8 w-8 mr-3" />
                   Señales de Alarma: ¿Cuándo ir al médico?
                </h3>
                <p className="mb-4 text-text-secondary pl-11">Consulta a un dermatólogo de inmediato si notas:</p>
                <ul className="list-disc list-inside ml-11 space-y-2 text-text-secondary">
                  <li>Enrojecimiento que se expande o empeora después del día 3.</li>
                  <li>Hinchazón, calor intenso o dolor creciente.</li>
                  <li>Pus amarillo/verde con mal olor.</li>
                  <li>Fiebre, escalofríos o ganglios inflamados.</li>
                  <li>Picazón extrema con ampollas o erupciones (puede ser alergia a la tinta).</li>
                </ul>
                <p className="mt-4 font-semibold text-red-500 flex items-center pl-11">
                  <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                  No esperes: una infección no tratada puede dañar tu piel y tu tatuaje.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="flex items-center text-2xl font-bold text-primary-accent mb-4 font-poppins">
                  <ClockIcon className="h-8 w-8 mr-3" />
                  ¿Cuánto tarda en sanar?
                </h3>
                <ul className="list-disc list-inside ml-11 space-y-2 text-text-secondary">
                  <li><strong>Superficialmente:</strong> 2–4 semanas (costras caen, picazón disminuye).</li>
                  <li><strong>Completamente:</strong> hasta 6 meses (la tinta se fija en las capas profundas de la piel).</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="flex items-center text-2xl font-bold text-primary-accent mb-4 font-poppins">
                  <SunIcon className="h-8 w-8 mr-3" />
                  Cuidado a Largo Plazo
                </h3>
                <p className="mb-2 text-text-secondary pl-11">Una vez sano:</p>
                <ul className="list-disc list-inside ml-11 space-y-2 text-text-secondary">
                  <li>Siempre usa protector solar (FPS 30+) cuando tu tatuaje esté expuesto al sol.</li>
                  <li>Hidrata tu piel regularmente para mantener los colores vivos.</li>
                  <li>Evita cambios bruscos de peso que puedan distorsionar el diseño.</li>
                </ul>
              </motion.div>

              <motion.blockquote variants={itemVariants} className="text-center p-6 bg-background border-l-4 border-primary-accent rounded-r-lg">
                <p className="text-lg italic text-text-secondary">"Sigue las indicaciones de tu artista. Cada tatuador tiene un protocolo basado en su experiencia. Si hay dudas, ¡pregunta! Mejor prevenir que lamentar."</p>
              </motion.blockquote>

              <motion.p variants={itemVariants} className="text-center font-bold text-lg text-primary-accent">
                Con estos cuidados, tu tatuaje no solo sanará perfecto, sino que lucirá increíble por muchos años. ¡Disfrútalo con responsabilidad! 🖤
              </motion.p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="contacto" 
          className="py-20 md:py-28 bg-card-bg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary font-poppins">Contacto</h2>
              <p className="text-lg md:text-xl text-text-secondary">¿Listo para comenzar tu próximo tatuaje? Envíame un mensaje.</p>
            </div>
            <div className="bg-background rounded-3xl p-8 md:p-12 border border-background/50">
              {state.succeeded ? (
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-primary-accent mb-4">¡Gracias por tu mensaje!</h3>
                  <p className="text-text-secondary">Me pondré en contacto contigo pronto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2 font-poppins">Nombre completo</label>
                      <input type="text" id="name" name="name" required className="w-full px-4 py-3 bg-card-bg border border-card-bg/50 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-transparent text-text-primary placeholder-text-secondary" placeholder="Tu nombre" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2 font-poppins">Correo electrónico</label>
                      <input type="email" id="email" name="email" required className="w-full px-4 py-3 bg-card-bg border border-card-bg/50 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-transparent text-text-primary placeholder-text-secondary" placeholder="tu@email.com" />
                      <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2 font-poppins">Mensaje</label>
                    <textarea id="message" name="message" required rows={5} className="w-full px-4 py-3 bg-card-bg border border-card-bg/50 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-transparent text-text-primary placeholder-text-secondary resize-none" placeholder="Cuéntame sobre tu idea de tatuaje..."></textarea>
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="text-center">
                    <button type="submit" disabled={state.submitting} className="bg-primary-accent hover:bg-opacity-80 px-8 py-3.5 rounded-full font-bold text-background transition-all duration-300 shadow-xl disabled:bg-gray-500">
                      {state.submitting ? "Enviando..." : "Enviar Mensaje"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.section>

        <footer className="bg-background py-12 border-t border-card-bg/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-accent font-poppins mb-4">Sergio Tattoo</h3>
            <p className="text-text-secondary mb-2">Estudio de tatuajes en Caracas y Miranda, Venezuela</p>
            <p className="text-text-secondary mb-4">Tel: {artist.phone}</p>
            <div className="mt-6">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-green-600 hover:bg-green-700 px-6 py-2.5 rounded-full font-semibold text-white transition-all duration-300">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
            <p className="text-text-secondary mt-8">© 2024 Sergio Fernández. Todos los derechos reservados.</p>
          </div>
        </footer>

        {showWhatsappButton && (
          <motion.a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-40" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} animate={{ scale: [1, 1.1, 1]}} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </motion.a>
        )}

        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4" onClick={closeImageModal}>
            <div className="max-w-4xl max-h-full relative" onClick={(e) => e.stopPropagation()}>
              <img src={selectedImage} alt="Trabajo" className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl" />
              <motion.button onClick={closeImageModal} className="absolute top-4 right-4 bg-primary-accent hover:bg-opacity-80 text-background p-3 rounded-full shadow-lg transition-all duration-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;