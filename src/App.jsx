import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Mercado from './pages/Mercado'
import Tendencias from './pages/Tendencias'
import Comparar from './pages/Comparar'
import Calculadora from './pages/Calculadora'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mercado" element={<Mercado />} />
        <Route path="/tendencias" element={<Tendencias />} />
        <Route path="/comparar" element={<Comparar />} />
        <Route path="/calculadora" element={<Calculadora />} />
      </Routes>
    </Router>
  )
}

export default App
