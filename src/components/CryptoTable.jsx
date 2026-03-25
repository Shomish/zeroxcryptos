import { useState, useMemo } from 'react'
import CryptoCard from './CryptoCard'
import useCryptos from '../hooks/useCryptos'


const CryptoTable = () => {
  const { cryptos, loading, error } = useCryptos(20)

  // Estados para búsqueda y ordenamiento
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('market_cap')
  const [sortDir, setSortDir] = useState('desc')

  // Función para cambiar el ordenamiento
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDir(sortDir === 'desc' ? 'asc' : 'desc')
    } else {
      setSortBy(column)
      setSortDir('desc')
    }
  }

  // Icono de orden
  const SortIcon = ({ column }) => {
    if (sortBy !== column) return <span className="text-gray-600 ml-1">↕</span>
    return <span className="text-purple-400 ml-1">{sortDir === 'desc' ? '↓' : '↑'}</span>
  }

  // Filtrar y ordenar con useMemo para optimizar
  const filteredCryptos = useMemo(() => {
    let result = [...cryptos]

    // Filtrar por búsqueda
    if (search.trim() !== '') {
      result = result.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Ordenar
    result.sort((a, b) => {
      const valA = a[sortBy] ?? 0
      const valB = b[sortBy] ?? 0
      return sortDir === 'desc' ? valB - valA : valA - valB
    })

    return result
  }, [cryptos, search, sortBy, sortDir])

  if (loading) return <p className="text-center text-gray-400 py-20">Cargando...</p>
  if (error)   return <p className="text-center text-red-400 py-20">{error}</p>

  return (
    <section id="market" className="bg-black py-20 px-6">

      {/* Título */}
      <h2 className="text-3xl font-bold text-white text-center mb-10">
        Mercado <span className="text-purple-500">en vivo</span>
      </h2>

      {/* Buscador */}
      <div className="max-w-7xl mx-auto mb-6">
        <input
          type="text"
          placeholder="🔍 Buscar criptomoneda..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 bg-gray-900 text-white border border-gray-700 
                     rounded-xl px-4 py-2 focus:outline-none focus:border-purple-500 
                     placeholder-gray-500 transition"
        />
        {search && (
          <span className="text-gray-400 text-sm ml-3">
            {filteredCryptos.length} resultado(s) encontrado(s)
          </span>
        )}
      </div>

      {/* Tabla */}
      <div className="max-w-7xl mx-auto overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-sm text-white">
          <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Moneda</th>
              <th
                className="px-4 py-3 text-right cursor-pointer hover:text-purple-400 transition"
                onClick={() => handleSort('current_price')}
              >
                Precio <SortIcon column="current_price" />
              </th>
              <th
                className="px-4 py-3 text-right cursor-pointer hover:text-purple-400 transition"
                onClick={() => handleSort('price_change_percentage_24h')}
              >
                24h <SortIcon column="price_change_percentage_24h" />
              </th>
              <th
                className="px-4 py-3 text-right cursor-pointer hover:text-purple-400 transition"
                onClick={() => handleSort('market_cap')}
              >
                Market Cap <SortIcon column="market_cap" />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCryptos.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-10">
                  No se encontraron resultados para "{search}"
                </td>
              </tr>
            ) : (
              filteredCryptos.map((coin, index) => (
                <tr
                  key={coin.id}
                  className="border-t border-gray-800 hover:bg-gray-900 transition"
                >
                  <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={coin.image} alt={coin.name} className="w-7 h-7 rounded-full" />
                      <div>
                        <p className="font-semibold">{coin.name}</p>
                        <p className="text-gray-500 uppercase text-xs">{coin.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono">
                    ${coin.current_price.toLocaleString()}
                  </td>
                  <td className={`px-4 py-3 text-right font-semibold ${
                    coin.price_change_percentage_24h >= 0 
                      ? 'text-green-400' 
                      : 'text-red-400'
                  }`}>
                    {coin.price_change_percentage_24h >= 0 ? '▲' : '▼'}{' '}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </td>
                  <td className="px-4 py-3 text-right text-gray-300">
                    ${(coin.market_cap / 1e9).toFixed(2)}B
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CryptoTable
