import React from 'react';

const FaceShapes = () => {
  const faceTypes = [
    {
      id: 1,
      name: "Rostro Alargado-Rectangular",
      image: "/images/Rostro Alargado-Rectangular.webp",
      description: "Características: Frente alta, mandíbula angulosa, largo de cara mayor que el ancho.",
      idealShape: "Cejas más rectas o con arco muy suave, evitando que sean demasiado altas.",
      reason: "Acortan visualmente el rostro y evitan acentuar su longitud."
    },
    {
      id: 2,
      name: "Rostro Corazón",
      image: "/images/Rostro Corazón.webp",
      description: "Características: Frente ancha, barbilla puntiaguda, mejillas prominentes.",
      idealShape: "Arco suave y redondeado, con inicio bien definido.",
      reason: "Equilibran la frente ancha y suavizan la transición hacia el mentón."
    },
    {
      id: 3,
      name: "Rostro Cuadrado",
      image: "/images/Rostro Cuadrado.webp",
      description: "Características: Mandíbula cuadrada, frente y barbilla de igual anchura, líneas fuertes.",
      idealShape: "Arco suave y redondeado, evitando ángulos muy marcados.",
      reason: "Suavizan la mandíbula fuerte y aportan feminidad o equilibrio."
    },
    {
      id: 4,
      name: "Rostro Diamante",
      image: "/images/Rostro Diamante.webp",
      description: "Características: Frente y barbilla estrechas, mejillas más anchas, forma de diamante.",
      idealShape: "Arco redondeado y cejas más largas en la parte interna.",
      reason: "Ayudan a equilibrar los pómulos prominentes y dan armonía al tercio superior del rostro."
    },
    {
      id: 5,
      name: "Rostro Ovalado",
      image: "/images/Rostro Ovalado.webp",
      description: "Características: Frente más ancha que la barbilla, curvas suaves, proporciones equilibradas.",
      idealShape: "Arco suave y definido, con ligera inclinación.",
      reason: "Este rostro es equilibrado, así que casi cualquier estilo le queda bien. Las cejas con arco natural alargan visualmente y mantienen la proporción."
    },
    {
      id: 6,
      name: "Rostro Redondo",
      image: "/images/Rostro Redondo.webp",
      description: "Características: Ancho y largo de cara similares, líneas suaves, mejillas redondeadas.",
      idealShape: "Arco marcado y cejas más angulosas.",
      reason: "Añaden definición y alargan visualmente el rostro, contrarrestando la redondez."
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
                <p className="text-gray-400 text-sm mb-4">{face.description}</p>
                <div className="space-y-3 text-left">
                    <div>
                        <p className="font-semibold text-pink-400 flex items-center">
                            <span className="text-green-400 mr-2">✅</span> Forma ideal:
                        </p>
                        <p className="text-gray-300 pl-7 text-sm">{face.idealShape}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-purple-400 flex items-center">
                            <span className="mr-2">✨</span> Por qué:
                        </p>
                        <p className="text-gray-300 pl-7 text-sm italic">{face.reason}</p>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaceShapes;