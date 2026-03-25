// Base URL de CoinGecko API (gratuita, sin API key)
const BASE_URL = 'https://api.coingecko.com/api/v3'

// Obtiene las top N criptomonedas por capitalización de mercado
export const getTopCryptos = async (limit = 20) => {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&sparkline=false`
  )
  if (!res.ok) throw new Error('Error al obtener criptomonedas')
  return res.json()
}