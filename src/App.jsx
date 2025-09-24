import React, { useState, useEffect } from "react";

const App = () => {
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
    image: "https://i.imgur.com/8LkYtRm.png",
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
    "https://images.unsplash.com/photo-1585903651295-5e275132259d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1615393009319-51a6218560ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Warriors Tattoo
              </h1>
            </div>
            <div className="hidden lg:flex space-x-4">
              {['inicio', 'estilos', 'artistas', 'galeria'].map((section) => (
                <button key={section} onClick={() => scrollToSection(section)} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg"
            >
              Agenda tu cita
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="inicio" className="relative h-screen flex items-center justify-center bg-black">
        <img src="https://images.unsplash.com/photo-1615393009319-51a6218560ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" alt="Fondo estudio" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4">Sergio Fernández</h1>
          <p className="text-xl md:text-2xl text-red-400 mb-6">Artista Principal - Blackouts & Blackwork</p>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">Transformo tus ideas en arte permanente. Especialista en diseños minimalistas y transformación de tatuajes viejos.</p>
          <div className="space-x-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg"
            >
              Contactar por WhatsApp
            </a>
            <button onClick={() => scrollToSection('galeria')} className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-full transition-all duration-300">
              Ver Galería
            </button>
          </div>
        </div>
      </section>

      {/* Estilos */}
      <section id="estilos" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Estilos de Tatuaje</h2>
          <p className="text-xl text-gray-400 mb-12">Especializado en técnicas que marcan tendencia en Venezuela.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tattooStyles.map((style) => (
              <div key={style.id} className="bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800/50 hover:shadow-2xl transition">
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

      {/* Artista */}
      <section id="artistas" className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">Artista Principal</h2>
          <div className="bg-black/40 rounded-3xl overflow-hidden border border-gray-800/50">
            <img src={artist.image} alt={artist.name} className="w-full h-96 object-cover" />
            <div className="p-10">
              <h3 className="text-4xl font-bold text-white mb-2">{artist.name}</h3>
              <p className="text-red-400 font-medium text-xl mb-4">{artist.specialty}</p>
              <p className="text-gray-300 text-lg mb-6">{artist.bio}</p>
              <div className="flex flex-wrap justify-center gap-6">
                <span className="text-gray-400">{artist.instagram}</span>
                <span className="text-gray-400">Tel: {artist.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section id="galeria" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Galería de Trabajos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {galleryImages.map((img, i) => (
              <div key={i} className="aspect-square bg-gray-900 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition" onClick={() => handleImageClick(img)}>
                <img src={img} alt={`Tatuaje ${i+1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-4">Warriors Tattoo</h3>
          <p className="text-gray-400 mb-4">Estado Miranda, Venezuela | Tel: {artist.phone}</p>
          <p className="text-gray-500">© 2024 Sergio Fernández. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Modal de imagen */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={closeImageModal}>
          <div className="max-w-4xl max-h-full relative" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Tatuaje" className="max-w-full max-h-[90vh] object-contain rounded-2xl" />
            <button onClick={closeImageModal} className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-full">
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;