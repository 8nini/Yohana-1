import React from 'react';
import { motion } from 'framer-motion';

const Header = ({
  scrollProgress,
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  scrollToSection,
  whatsappLink,
}) => {
  const navLinks = ['inicio', 'estilos', 'sobre-nosotros', 'cejas', 'artistas', 'galeria', 'simulador', 'inspiracion-ia', 'cuidados', 'contacto'];

  const formatNavLink = (section) => {
    if (section === 'sobre-nosotros') return 'Sobre Nosotros';
    return section
      .split('-')
      .map(word => {
        if (word.toLowerCase() === 'ia') return 'IA';
        return word.charAt(0).toUpperCase() + word.slice(1)
      })
      .join(' ');
  };

  return (
    <>
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
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </motion.div>
              <h1 className="text-2xl font-bold text-primary-accent font-poppins">
                Sergio Tattoo
              </h1>
            </div>

            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((section) => (
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
                  {formatNavLink(section)}
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
                {navLinks.map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeSection === section
                        ? 'bg-primary-accent text-background'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {formatNavLink(section)}
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
    </>
  );
};

export default Header;