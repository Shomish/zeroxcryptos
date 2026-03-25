const Footer = () => {
  return (
    <footer
      aria-label="Pie de página"
      className="bg-black border-t border-white/10 py-8 text-center"
    >
      {/* Logo */}
      <p className="text-white font-bold text-lg mb-1" aria-label="CryptoZerox">
        Crypto<span className="text-purple-500" aria-hidden="true">Zerox</span>
      </p>

      {/* Descripción */}
      <p className="text-gray-500 text-sm mb-4">
        Datos en tiempo real powered by Steven
      </p>

      {/* Copyright */}
      <p className="text-gray-600 text-xs">
        <small>© {new Date().getFullYear()} zeroxCryptos. Todos los derechos reservados.</small>
      </p>
    </footer>
  )
}

export default Footer