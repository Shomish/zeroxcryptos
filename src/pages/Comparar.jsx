import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const COINS = [
  'bitcoin', 'ethereum', 'solana', 'cardano', 'ripple',
  'dogecoin', 'polkadot', 'avalanche-2', 'chainlink', 'litecoin'
]

const fetchCoinData = async (coinId) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`
  )
  return await res.json()
}

const StatRow = ({ label, valueA, valueB, format = v => v, higherIsBetter = true }) => {
  const a = parseFloat(valueA) || 0
  const b = parseFloat(valueB) || 0
  const aWins = higherIsBetter ? a >= b : a <= b
  const bWins = higherIsBetter ? b >= a : b <= a

  return (
    <tr className="border-t border-white/5">
      <td className={`px-4 py-3 text-right font-mono text-sm ${aWins ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
        {format(valueA)}
      </td>
      <td className="px-4 py-3 text-center text-gray-500 text-xs uppercase">{label}</td>
      <td className={`px-4 py-3 text-left font-mono text-sm ${bWins ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
        {format(valueB)}
      </td>
    </tr>
  )
}

const Comparar = () => {
  const [coinA, setCoinA] = useState('bitcoin')
  const [coinB, setCoinB] = useState('ethereum')
  const [dataA, setDataA] = useState(null)
  const [dataB, setDataB] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setDataA(null)
      setDataB(null)
      try {
        const [a, b] = await Promise.all([fetchCoinData(coinA), fetchCoinData(coinB)])
        setDataA(a)
        setDataB(b)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [coinA, coinB])

  const fmt$ = v => v ? `$${parseFloat(v).toLocaleString()}` : '—'
  const fmtB = v => v ? `$${(parseFloat(v) / 1e9).toFixed(2)}B` : '—'
  const fmtP = v => v ? `${parseFloat(v).toFixed(2)}%` : '—'
  const fmtN = v => v ? `#${v}` : '—'

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-32 pb-16">
        {/* Header */}
        <h1 className="text-4xl font-extrabold mb-2">
          Comparar <span className="text-purple-500">Cryptos</span>
        </h1>
        <p className="text-gray-400 mb-10">Selecciona dos criptomonedas y compara sus estadísticas.</p>

        {/* Selectores */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          {[{ val: coinA, set: setCoinA, label: 'Cripto A' }, { val: coinB, set: setCoinB, label: 'Cripto B' }].map(({ val, set, label }) => (
            <div key={label}>
              <label className="text-sm text-gray-400 mb-2 block">{label}</label>
              <select
                value={val}
                onChange={e => set(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500 capitalize"
              >
                {COINS.map(c => (
                  <option key={c} value={c} className="bg-black capitalize">{c}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Comparación */}
        {loading && <p className="text-gray-400 text-center py-20">Cargando datos...</p>}

        {!loading && dataA && dataB && (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

            {/* Cabecera con logos */}
            <div className="grid grid-cols-3 bg-white/5 px-4 py-5">
              <div className="flex flex-col items-center gap-2">
                <img src={dataA.image?.large} alt={dataA.name} className="w-12 h-12" />
                <span className="font-bold text-lg">{dataA.name}</span>
                <span className="text-gray-400 uppercase text-xs">{dataA.symbol}</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-purple-500 font-extrabold text-2xl">VS</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img src={dataB.image?.large} alt={dataB.name} className="w-12 h-12" />
                <span className="font-bold text-lg">{dataB.name}</span>
                <span className="text-gray-400 uppercase text-xs">{dataB.symbol}</span>
              </div>
            </div>

            {/* Tabla de stats */}
            <table className="w-full">
              <tbody>
                <StatRow
                  label="Precio actual"
                  valueA={dataA.market_data?.current_price?.usd}
                  valueB={dataB.market_data?.current_price?.usd}
                  format={fmt$}
                />
                <StatRow
                  label="Cap. de mercado"
                  valueA={dataA.market_data?.market_cap?.usd}
                  valueB={dataB.market_data?.market_cap?.usd}
                  format={fmtB}
                />
                <StatRow
                  label="Volumen 24h"
                  valueA={dataA.market_data?.total_volume?.usd}
                  valueB={dataB.market_data?.total_volume?.usd}
                  format={fmtB}
                />
                <StatRow
                  label="Cambio 24h"
                  valueA={dataA.market_data?.price_change_percentage_24h}
                  valueB={dataB.market_data?.price_change_percentage_24h}
                  format={fmtP}
                />
                <StatRow
                  label="Cambio 7d"
                  valueA={dataA.market_data?.price_change_percentage_7d}
                  valueB={dataB.market_data?.price_change_percentage_7d}
                  format={fmtP}
                />
                <StatRow
                  label="Máximo histórico"
                  valueA={dataA.market_data?.ath?.usd}
                  valueB={dataB.market_data?.ath?.usd}
                  format={fmt$}
                />
                <StatRow
                  label="Ranking"
                  valueA={dataA.market_cap_rank}
                  valueB={dataB.market_cap_rank}
                  format={fmtN}
                  higherIsBetter={false}
                />
              </tbody>
            </table>

            {/* Footer winner */}
            <div className="px-4 py-4 bg-white/5 text-center text-sm text-gray-400">
              🟢 <span className="text-white font-semibold">Verde</span> = mejor valor en esa categoría
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Comparar
