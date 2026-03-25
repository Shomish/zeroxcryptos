import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const COINS = [
  { id: 'bitcoin',  name: 'Bitcoin',  color: '#f7931a' },
  { id: 'ethereum', name: 'Ethereum', color: '#627eea' },
  { id: 'solana',   name: 'Solana',   color: '#9945ff' },
]

const DAYS = [7, 14, 30, 90]

const Tendencias = () => {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin')
  const [days, setDays]                 = useState(7)
  const [chartData, setChartData]       = useState([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(false)
  const [stats, setStats]               = useState({ max: 0, min: 0, avg: 0 })

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true)
      setError(false)
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=usd&days=${days}`
        )
        if (!res.ok) throw new Error('Error al obtener datos')
        const data = await res.json()

        const formatted = data.prices.map(([timestamp, price]) => ({
          date:   new Date(timestamp).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
          precio: parseFloat(price.toFixed(2)),
        }))

        const prices = formatted.map(d => d.precio)
        setStats({
          max: Math.max(...prices),
          min: Math.min(...prices),
          avg: parseFloat((prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)),
        })
        setChartData(formatted)
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [selectedCoin, days])

  const coinColor = COINS.find(c => c.id === selectedCoin)?.color || '#9945ff'
  const coinName  = COINS.find(c => c.id === selectedCoin)?.name  || 'Cripto'

  // ── Botón reutilizable accesible ──────────────────────────────────────────
  const FilterBtn = ({ active, onClick, label, children }) => (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`px-3 py-2 sm:px-4 rounded-lg text-sm font-semibold transition border focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
        active
          ? 'bg-purple-600 border-purple-500 text-white'
          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {/* ── Main ── */}
      <main
        id="main-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16"
        aria-label="Tendencias de precios de criptomonedas"
      >
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
            Tendencias <span className="text-purple-500">de Precios</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Historial de precios en tiempo real por criptomoneda.
          </p>
        </header>

        {/* Controles */}
        <section aria-label="Filtros de moneda y período" className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

            {/* Selector moneda */}
            <div
              role="group"
              aria-label="Seleccionar criptomoneda"
              className="flex gap-2 flex-wrap"
            >
              {COINS.map(coin => (
                <FilterBtn
                  key={coin.id}
                  active={selectedCoin === coin.id}
                  onClick={() => setSelectedCoin(coin.id)}
                  label={`Ver tendencia de ${coin.name}`}
                >
                  {coin.name}
                </FilterBtn>
              ))}
            </div>

            {/* Selector días */}
            <div
              role="group"
              aria-label="Seleccionar período de tiempo"
              className="flex gap-2"
            >
              {DAYS.map(d => (
                <FilterBtn
                  key={d}
                  active={days === d}
                  onClick={() => setDays(d)}
                  label={`Ver últimos ${d} días`}
                >
                  {d}d
                </FilterBtn>
              ))}
            </div>

          </div>
        </section>

        {/* Stats */}
        <section
          aria-label={`Estadísticas de ${coinName} en los últimos ${days} días`}
          className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8"
        >
          {[
            { label: '🔺 Máximo', value: stats.max, ariaLabel: `Precio máximo: $${stats.max.toLocaleString()}` },
            { label: '🔻 Mínimo', value: stats.min, ariaLabel: `Precio mínimo: $${stats.min.toLocaleString()}` },
            { label: '📊 Promedio', value: stats.avg, ariaLabel: `Precio promedio: $${stats.avg.toLocaleString()}` },
          ].map(stat => (
            <div
              key={stat.label}
              aria-label={stat.ariaLabel}
              className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 text-center"
            >
              <p className="text-gray-400 text-xs sm:text-sm mb-1">{stat.label}</p>
              <p className="text-white font-bold text-sm sm:text-lg">
                ${stat.value.toLocaleString()}
              </p>
            </div>
          ))}
        </section>

        {/* Gráfica */}
        <section
          aria-label={`Gráfica de precio de ${coinName} en los últimos ${days} días`}
          className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-6"
        >
          {loading && (
            <div role="status" aria-live="polite" className="text-gray-400 text-center py-20">
              <span className="sr-only">Cargando gráfica de precios...</span>
              <p aria-hidden="true">Cargando gráfica...</p>
            </div>
          )}

          {error && !loading && (
            <div role="alert" className="text-red-400 text-center py-20">
              No se pudo cargar la gráfica. Intenta de nuevo más tarde.
            </div>
          )}

          {!loading && !error && (
            <ResponsiveContainer width="100%" height={300} aria-hidden="true">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis
                  dataKey="date"
                  stroke="#9ca3af"
                  tick={{ fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  stroke="#9ca3af"
                  tick={{ fontSize: 10 }}
                  tickFormatter={v => `$${v.toLocaleString()}`}
                  width={75}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff20', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                  formatter={v => [`$${v.toLocaleString()}`, 'Precio']}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="precio"
                  stroke={coinColor}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Tendencias