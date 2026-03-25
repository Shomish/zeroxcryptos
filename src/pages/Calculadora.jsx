import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const COINS = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'solana', name: 'Solana', symbol: 'SOL' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
  { id: 'ripple', name: 'XRP', symbol: 'XRP' },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
  { id: 'litecoin', name: 'Litecoin', symbol: 'LTC' },
]

const Calculadora = () => {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin')
  const [price, setPrice] = useState(null)
  const [loading, setLoading] = useState(true)

  // Modo: 'usd_to_crypto' o 'crypto_to_usd'
  const [mode, setMode] = useState('usd_to_crypto')
  const [inputValue, setInputValue] = useState('')

  // Inversión
  const [investAmount, setInvestAmount] = useState('')
  const [buyPrice, setBuyPrice] = useState('')
  const [sellPrice, setSellPrice] = useState('')

  useEffect(() => {
    const fetchPrice = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCoin}&vs_currencies=usd`
        )
        const data = await res.json()
        setPrice(data[selectedCoin]?.usd || null)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPrice()
    setInputValue('')
  }, [selectedCoin])

  // Conversión
  const converted = (() => {
    if (!price || !inputValue || isNaN(inputValue)) return null
    const val = parseFloat(inputValue)
    if (mode === 'usd_to_crypto') return (val / price).toFixed(8)
    return (val * price).toFixed(2)
  })()

  // Cálculo de inversión
  const investResult = (() => {
    if (!investAmount || !buyPrice || !sellPrice) return null
    const amount = parseFloat(investAmount)
    const buy = parseFloat(buyPrice)
    const sell = parseFloat(sellPrice)
    if (!amount || !buy || !sell) return null
    const coins = amount / buy
    const finalValue = coins * sell
    const profit = finalValue - amount
    const percentage = ((profit / amount) * 100).toFixed(2)
    return { coins: coins.toFixed(6), finalValue: finalValue.toFixed(2), profit: profit.toFixed(2), percentage }
  })()

  const coin = COINS.find(c => c.id === selectedCoin)

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-16">
        {/* Header */}
        <h1 className="text-4xl font-extrabold mb-2">
          Calculadora <span className="text-purple-500">Crypto</span>
        </h1>
        <p className="text-gray-400 mb-10">Convierte y calcula tu inversión en criptomonedas.</p>

        {/* Selector de moneda */}
        <div className="mb-8">
          <label className="text-sm text-gray-400 mb-2 block">Selecciona la criptomoneda</label>
          <select
            value={selectedCoin}
            onChange={e => setSelectedCoin(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500 w-full md:w-64"
          >
            {COINS.map(c => (
              <option key={c.id} value={c.id} className="bg-black">
                {c.name} ({c.symbol})
              </option>
            ))}
          </select>

          {/* Precio actual */}
          <p className="text-sm text-gray-400 mt-3">
            Precio actual:{' '}
            {loading
              ? <span className="text-gray-500">Cargando...</span>
              : <span className="text-purple-400 font-bold">${price?.toLocaleString()}</span>
            }
          </p>
        </div>

        {/* ── SECCIÓN 1: Convertidor ── */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">💱 Convertidor</h2>

          {/* Toggle modo */}
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => { setMode('usd_to_crypto'); setInputValue('') }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${
                mode === 'usd_to_crypto'
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              USD → {coin?.symbol}
            </button>
            <button
              onClick={() => { setMode('crypto_to_usd'); setInputValue('') }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${
                mode === 'crypto_to_usd'
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {coin?.symbol} → USD
            </button>
          </div>

          {/* Input */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full">
              <label className="text-xs text-gray-500 mb-1 block">
                {mode === 'usd_to_crypto' ? 'Cantidad en USD' : `Cantidad en ${coin?.symbol}`}
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-purple-500"
              />
            </div>

            <span className="text-2xl text-purple-500 font-bold mt-4 md:mt-5">→</span>

            {/* Output */}
            <div className="w-full">
              <label className="text-xs text-gray-500 mb-1 block">
                {mode === 'usd_to_crypto' ? `Recibes en ${coin?.symbol}` : 'Recibes en USD'}
              </label>
              <div className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-3 text-purple-400 text-lg font-bold">
                {converted !== null ? converted : '—'}
              </div>
            </div>
          </div>
        </div>

        {/* ── SECCIÓN 2: Calculadora de inversión ── */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4">📈 Calculadora de Inversión</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Inversión inicial (USD)', val: investAmount, set: setInvestAmount, placeholder: 'ej: 1000' },
              { label: 'Precio de compra (USD)', val: buyPrice, set: setBuyPrice, placeholder: `ej: ${price || '..'}` },
              { label: 'Precio de venta (USD)', val: sellPrice, set: setSellPrice, placeholder: 'ej: 100000' },
            ].map(({ label, val, set, placeholder }) => (
              <div key={label}>
                <label className="text-xs text-gray-500 mb-1 block">{label}</label>
                <input
                  type="number"
                  placeholder={placeholder}
                  value={val}
                  onChange={e => set(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            ))}
          </div>

          {/* Resultado */}
          {investResult ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: `${coin?.symbol} obtenidos`, value: investResult.coins },
                { label: 'Valor final', value: `$${parseFloat(investResult.finalValue).toLocaleString()}` },
                {
                  label: 'Ganancia / Pérdida',
                  value: `${parseFloat(investResult.profit) >= 0 ? '+' : ''}$${parseFloat(investResult.profit).toLocaleString()}`,
                  color: parseFloat(investResult.profit) >= 0 ? 'text-green-400' : 'text-red-400'
                },
                {
                  label: 'Rentabilidad',
                  value: `${investResult.percentage}%`,
                  color: parseFloat(investResult.percentage) >= 0 ? 'text-green-400' : 'text-red-400'
                },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-black border border-white/10 rounded-xl p-4 text-center">
                  <p className="text-gray-400 text-xs mb-1">{label}</p>
                  <p className={`font-bold text-lg ${color || 'text-white'}`}>{value}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center py-4">
              Completa los campos para ver el resultado 👆
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Calculadora
