const CryptoCard = ({ coin }) => {
  // Determina si el cambio en 24h es positivo o negativo
  const isPositive = coin.price_change_percentage_24h >= 0

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-purple-500/50 transition">
      {/* Header: imagen y nombre */}
      <div className="flex items-center gap-3 mb-4">
        <img src={coin.image} alt={coin.name} className="w-10 h-10" />
        <div>
          <p className="text-white font-semibold">{coin.name}</p>
          <p className="text-gray-500 text-xs uppercase">{coin.symbol}</p>
        </div>
      </div>

      {/* Precio actual */}
      <p className="text-2xl font-bold text-white mb-1">
        ${coin.current_price.toLocaleString()}
      </p>

      {/* Cambio 24h */}
      <p className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
      </p>
    </div>
  )
}

export default CryptoCard