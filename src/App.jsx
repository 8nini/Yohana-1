import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const App = () => {
  const AnimatedSection = ({ children, id }) => (
    <motion.section
      id={id}
      className="py-24 bg-secondary"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.section>
  );

  const [selectedImage, setSelectedImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'estilos', 'artistas', 'galeria', 'contacto'];
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

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
      image: "https://images.unsplash.com/photo-1615393009319-51a6218560ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1585903651295-5e275132259d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Estilo tradicional japonés con motivos culturales, simbólicos y mitológicos que cuentan historias ancestrales."
    }
  ];

  const artist = {
    id: 1,
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
    "https://images.unsplash.com/photo-1615393009319-51a6218560ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1615393009319-51a6218560ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1577212820165-499512510092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1599644196928-6f2be051114d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1585903651295-5e275132259d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1615393009319-51a6218560ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  const eyebrowStyles = [
    {
      id: 1,
      name: "Hair Stroke – Hiperrealismo pelo a pelo",
      image: "https://i.imgur.com/WX48zNR.jpeg",
      description: "Trazos finos y precisos que imitan cada vello con realismo absoluto. Ideal para un look suave, fresco y 100% natural, incluso sin maquillaje."
    },
    {
      id: 2,
      name: "Messy Brows – Volumen con actitud",
      image: "https://i.imgur.com/Mwfwdwi.jpeg",
      description: "Un estilo moderno, espontáneo y lleno de vida. Cejas con movimiento, textura y volumen que lucen como recién peinadas… ¡sin hacer nada!"
    },
    {
      id: 3,
      name: "Tupidas y Laminadas – Densidad con brillo",
      image: "https://i.imgur.com/RgZbWg1.jpeg",
      description: "Combinamos micropigmentación con tratamiento laminado para crear cejas densas, ordenadas y con un acabado brillante y saludable que dura semanas."
    },
    {
      id: 4,
      name: "Powder Brows – Sombreado suave y elegante",
      image: "https://i.imgur.com/iTPbDvr.png",
      description: "Un relleno difuminado que imita el polvo de cejas, con bordes suaves y color uniforme. Perfecto para un look definido, moderno y natural al mismo tiempo."
    },
    {
      id: 5,
      name: "Estilo Híbrido – Lo mejor de dos mundos",
      image: "https://i.imgur.com/USQxuTo.png",
      description: "Fusionamos trazos realistas en la parte delantera con sombreado suave en el centro y cola. El equilibrio ideal entre realismo y definición."
    }
  ];

  const handleImageClick = (image) => setSelectedImage(image);
  const closeImageModal = () => setSelectedImage(null);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Enlace de WhatsApp con mensaje predeterminado
  const whatsappLink = `https://wa.me/584242049941?text=Hola%20Sergio,%20vi%20tu%20portafolio%20online%20y%20me%20gustaría%20agendar%20una%20cita%20para%20un%20tatuaje.`;

  return (
      <div className="min-h-screen bg-secondary text-white">
      {/* Header */}
        <header className="fixed w-full z-50 bg-secondary/80 backdrop-blur-md border-b border-primary/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary-gradient rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
                <h1 className="text-2xl font-bold bg-primary-gradient bg-clip-text text-transparent">
                Warriors Tattoo
              </h1>
            </div>
            <div className="hidden lg:flex space-x-4">
                {['inicio', 'estilos', 'cejas', 'artistas', 'galeria'].map((section) => (
                  <button key={section} onClick={() => scrollToSection(section)} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
                className="bg-primary-gradient px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-accent-pink/50"
            >
              Agenda tu cita
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
        <motion.section
          id="inicio"
          className="relative h-screen flex items-center justify-center bg-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src="https://images.unsplash.com/photo-1615393009319-51a6218560ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" alt="Fondo estudio" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-primary-gradient mb-4">Sergio Fernández</h1>
            <p className="text-xl md:text-2xl text-accent-blue mb-6">Artista Principal - Blackouts & Blackwork</p>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">Transformo tus ideas en arte permanente. Especialista en diseños minimalistas y transformación de tatuajes viejos.</p>
          <div className="space-x-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
                className="bg-primary-gradient px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-accent-purple/50"
            >
              Contactar por WhatsApp
            </a>
              <button onClick={() => scrollToSection('galeria')} className="border border-accent-purple hover:bg-accent-purple hover:text-white px-8 py-3 rounded-full transition-all duration-300">
              Ver Galería
            </button>
          </div>
        </div>
      </section>

      {/* Estilos */}
        <AnimatedSection id="estilos">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold mb-6 bg-primary-gradient bg-clip-text text-transparent">Estilos de Tatuaje</h2>
          <p className="text-xl text-gray-400 mb-12">Especializado en técnicas que marcan tendencia en Venezuela.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tattooStyles.map((style) => (
                <div key={style.id} className="bg-primary/50 rounded-2xl overflow-hidden border border-primary/50 hover:shadow-2xl hover:border-accent-pink transition">
                <img src={style.image} alt={style.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{style.name}</h3>
                  <p className="text-gray-300">{style.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* Cejas */}
        <AnimatedSection id="cejas">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold mb-6 bg-primary-gradient bg-clip-text text-transparent">Diseño de Cejas</h2>
            <p className="text-xl text-gray-400 mb-12">Servicios profesionales para unas cejas perfectas y modernas.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eyebrowStyles.map((style) => (
                <div key={style.id} className="bg-primary/50 rounded-2xl overflow-hidden border border-primary/50 hover:shadow-2xl hover:border-accent-blue transition">
                  <img src={style.image} alt={style.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{style.name}</h3>
                    <p className="text-gray-300">{style.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

      {/* Artista */}
        <AnimatedSection id="artistas">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold mb-6 bg-primary-gradient bg-clip-text text-transparent">Artista Principal</h2>
            <div className="bg-primary/40 rounded-3xl overflow-hidden border border-primary/50">
            <img src={artist.image} alt={artist.name} className="w-full h-96 object-cover" />
            <div className="p-10">
              <h3 className="text-4xl font-bold text-white mb-2">{artist.name}</h3>
                <p className="text-accent-blue font-medium text-xl mb-4">{artist.specialty}</p>
              <p className="text-gray-300 text-lg mb-6">{artist.bio}</p>
              <div className="flex flex-wrap justify-center gap-6">
                <span className="text-gray-400">{artist.instagram}</span>
                <span className="text-gray-400">Tel: {artist.phone}</span>
              </div>
            </div>
          </div>
        </div>
        </AnimatedSection>

      {/* Galería */}
        <AnimatedSection id="galeria">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold mb-6 bg-primary-gradient bg-clip-text text-transparent">Galería de Trabajos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {galleryImages.map((img, i) => (
                <div key={i} className="aspect-square bg-primary rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition" onClick={() => handleImageClick(img)}>
                <img src={img} alt={`Tatuaje ${i+1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        </AnimatedSection>

      {/* Footer */}
        <footer className="bg-primary py-12 border-t border-primary/50">
        <div className="max-w-6xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold bg-primary-gradient bg-clip-text text-transparent mb-4">Warriors Tattoo</h3>
          <p className="text-gray-400 mb-4">Estado Miranda, Venezuela | Tel: {artist.phone}</p>
          <p className="text-gray-500">© 2024 Sergio Fernández. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Modal de imagen */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={closeImageModal}>
          <div className="max-w-4xl max-h-full relative" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Tatuaje" className="max-w-full max-h-[90vh] object-contain rounded-2xl" />
              <button onClick={closeImageModal} className="absolute top-4 right-4 bg-accent-pink text-white p-3 rounded-full">
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;