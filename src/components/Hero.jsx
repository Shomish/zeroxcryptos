const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-5 py-24 md:py-32">

      {/* Badge */}
      <span className="text-xs bg-purple-500/20 text-purple-400 px-4 py-1 rounded-full mb-6 tracking-widest uppercase">
        Tiempo real
      </span>

      {/* Título */}
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
        El mercado crypto
        <br />
        <span className="text-purple-500">en un vistazo</span>
      </h1>

      {/* Subtítulo */}
      <p className="text-gray-400 text-base md:text-lg max-w-xl mb-8 px-2">
        Consulta precios, cambios y capitalización de las principales criptomonedas del mundo.
      </p>

      {/* CTA */}
      <a
        href="#market"
        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition text-sm md:text-base"
      >
        Ver mercado
      </a>
    </section>
  )
}

export default Hero
