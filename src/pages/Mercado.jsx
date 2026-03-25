import { useState, useMemo } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useCryptos from '../hooks/useCryptos'

const Mercado = () => {
  const { cryptos, loading } = useCryptos()
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('market_cap_rank')
  const [filterChange, setFilterChange] = useState('all')

  const filtered = useMemo(() => {
    let result = [...cryptos]

    // Filtro búsqueda
    if (search) {
      result = result.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.symbol.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Filtro por variación
    if (filterChange === 'gainers') result = result.filter(c => c.price_change_percentage_24h > 0)
    if (filterChange === 'losers') result = result.filter(c => c.price_change_percentage_24h < 0)

    // Ordenar
    if (sortBy === 'price') result.sort((a, b) => b.current_price - a.current_price)
    if (sortBy === 'change') result.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    if (sortBy === 'market_cap_rank') result.sort((a, b) => a.market_cap_rank - b.market_cap_rank)

    return result
  }, [cryptos, search, sortBy, filterChange])

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        {/* Header */}
        <h1 className="text-4xl font-extrabold mb-2">Mercado <span className="text-purple-500">Crypto</span></h1>
        <p className="text-gray-400 mb-8">Explora, filtra y ordena las principales criptomonedas.</p>

        {/* Controles */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Buscador */}
          <input
            type="text"
            placeholder="Buscar por nombre o símbolo..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 w-full md:w-80"
          />

          {/* Ordenar */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
          >
            <option value="market_cap_rank">Ordenar por: Ranking</option>
            <option value="price">Ordenar por: Precio</option>
            <option value="change">Ordenar por: Variación 24h</option>
          </select>

          {/* Filtro */}
          <select
            value={filterChange}
            onChange={e => setFilterChange(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
          >
            <option value="all">Todos</option>
            <option value="gainers">📈 Ganadores</option>
            <option value="losers">📉 Perdedores</option>
          </select>
        </div>

        {/* Tabla */}
        {loading ? (
          <p className="text-gray-400">Cargando...</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-gray-400 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Nombre</th>
                  <th className="px-4 py-3 text-right">Precio</th>
                  <th className="px-4 py-3 text-right">24h %</th>
                  <th className="px-4 py-3 text-right">Cap. de mercado</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((coin, i) => (
                  <tr key={coin.id} className={`border-t border-white/5 hover:bg-white/5 transition ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                    <td className="px-4 py-3 text-gray-400">{coin.market_cap_rank}</td>
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                      <span className="font-medium">{coin.name}</span>
                      <span className="text-gray-500 uppercase">{coin.symbol}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      ${coin.current_price.toLocaleString()}
                    </td>
                    <td className={`px-4 py-3 text-right font-semibold ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {coin.price_change_percentage_24h >= 0 ? '+' : ''}
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-right text-gray-300">
                      ${coin.market_cap.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Mercado
