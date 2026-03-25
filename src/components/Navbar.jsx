import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/',            label: 'Inicio'      },
  { to: '/mercado',     label: 'Mercado'     },
  { to: '/tendencias',  label: 'Tendencias'  },
  { to: '/comparar',    label: 'Comparar'    },
  { to: '/calculadora', label: 'Calculadora' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-white/10 z-50"
    >
      {/* Skip-to-content — solo visible al enfocar con Tab */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Saltar al contenido principal
      </a>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          aria-label="zeroxCriptos — Ir al inicio"
          className="text-xl font-bold text-white tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
        >
          zerox<span className="text-purple-500">Criptos</span>
        </Link>

        {/* Links — solo desktop */}
        <ul className="hidden md:flex gap-6 text-sm text-gray-400" role="list">
          {links.map(link => {
            const isActive = pathname === link.to
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  aria-current={isActive ? 'page' : undefined}
                  className={`transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded px-1 ${
                    isActive ? 'text-white font-semibold' : 'hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Botón hamburguesa — solo móvil */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Menú móvil desplegable */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-72' : 'max-h-0'}`}
      >
        <ul
          role="list"
          className="flex flex-col bg-black/95 border-t border-white/10 px-4 py-2"
        >
          {links.map(link => {
            const isActive = pathname === link.to
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`block py-3 text-sm border-b border-white/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded px-1 ${
                    isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar