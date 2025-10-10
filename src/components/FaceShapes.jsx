import React from 'react';

const FaceShapes = () => {
  const faceTypes = [
    {
      id: 1,
      name: "Rostro Alargado",
      image: "/images/Rostro Alargado-Rectangular.webp",
      description: "Características: Frente alta, mandíbula angulosa, largo de cara mayor que el ancho."
    },
    {
      id: 2,
      name: "Rostro Corazón",
      image: "/images/Rostro Corazón.webp",
      description: "Características: Frente ancha, barbilla puntiaguda, mejillas prominentes."
    },
    {
      id: 3,
      name: "Rostro Cuadrado",
      image: "/images/Rostro Cuadrado.webp",
      description: "Características: Mandíbula cuadrada, frente y barbilla de igual anchura, líneas fuertes."
    },
    {
      id: 4,
      name: "Rostro Diamante",
      image: "/images/Rostro Diamante.webp",
      description: "Características: Frente y barbilla estrechas, mejillas más anchas, forma de diamante."
    },
    {
      id: 5,
      name: "Rostro Ovalado",
      image: "/images/Rostro Ovalado.webp",
      description: "Características: Frente más ancha que la barbilla, curvas suaves, proporciones equilibradas."
    },
    {
      id: 6,
      name: "Rostro Redondo",
      image: "/images/Rostro Redondo.webp",
      description: "Características: Ancho y largo de cara similares, líneas suaves, mejillas redondeadas."
    }
  ];

  return (
    <section id="tipos-rostro" className="py-20 md:py-28 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Tipos de Rostro
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Descubre cuál es tu tipo de rostro para elegir el diseño de cejas perfecto.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faceTypes.map((face) => (
            <div key={face.id} className="bg-black/40 rounded-2xl overflow-hidden border border-gray-800/50">
              <div className="h-48 overflow-hidden">
                <img
                  src={face.image}
                  alt={face.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{face.name}</h3>
                <p className="text-gray-300 leading-relaxed">{face.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaceShapes;