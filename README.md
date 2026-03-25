# 🪙 zeroxCriptos

> Plataforma web de seguimiento y análisis de criptomonedas en tiempo real, construida con React + Vite y desplegada en Vercel.

🔗 **Demo en vivo:** [zeroxcryptos.vercel.app](https://zeroxcryptos.vercel.app)

---

## 📋 Descripción

**zeroxCriptos** es una aplicación web moderna que permite a los usuarios consultar, comparar y analizar criptomonedas en tiempo real utilizando la API pública de CoinGecko. Diseñada con una interfaz oscura, minimalista y completamente responsiva.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18+ | Framework UI |
| Vite | 8.x | Bundler y dev server |
| React Router DOM | 6+ | Navegación SPA |
| Tailwind CSS | 3+ | Estilos utilitarios |
| Recharts | Latest | Gráficas de precios |
| CoinGecko API | v3 | Datos de criptomonedas (gratuita) |

---

## 📁 Estructura del proyecto

```
zeroxcryptos/
├── public/
├── src/
│   ├── components/
│   │   ├── CryptoCard.jsx       # Tarjeta individual de cripto
│   │   ├── CryptoTable.jsx      # Tabla principal con búsqueda y ordenamiento
│   │   ├── Footer.jsx           # Pie de página
│   │   ├── Hero.jsx             # Sección hero de la landing
│   │   └── Navbar.jsx           # Barra de navegación (responsive + accesible)
│   ├── hooks/
│   │   └── useCryptos.js        # Hook personalizado para obtener criptomonedas
│   ├── pages/
│   │   ├── Home.jsx             # Página principal
│   │   ├── Mercado.jsx          # Mercado con filtros avanzados
│   │   ├── Tendencias.jsx       # Gráfica histórica de precios
│   │   ├── Comparar.jsx         # Comparador de dos criptos
│   │   └── Calculadora.jsx      # Convertidor + calculadora de inversión
│   ├── services/
│   │   └── api.js               # Llamadas a la API de CoinGecko
│   ├── App.jsx                  # Rutas principales
│   ├── main.jsx                 # Punto de entrada
│   └── index.css                # Estilos globales
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🚀 Instalación y uso local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Shomish/zeroxcryptos.git
cd zeroxcryptos
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Correr en modo desarrollo

```bash
npm run dev
```

### 4. Build para producción

```bash
npm run build
```

---

## 📄 Páginas y funcionalidades

### 🏠 Home (`/`)
Página de bienvenida con:
- **Hero:** Presentación del proyecto con call-to-action.
- **CryptoTable:** Tabla en vivo con las top 20 criptos, búsqueda por nombre/símbolo y ordenamiento por precio, variación 24h y market cap.

---

### 📊 Mercado (`/mercado`)
Vista avanzada del mercado con:
- 🔍 **Buscador** por nombre o símbolo.
- 🔃 **Ordenamiento** por ranking, precio o variación 24h.
- 📈 **Filtro** por ganadores / perdedores del día.
- Tabla con: ranking, nombre, precio, cambio 24h y capitalización de mercado.

---

### 📈 Tendencias (`/tendencias`)
Gráfica histórica de precios con:
- Selector de criptomoneda: **Bitcoin, Ethereum, Solana**.
- Selector de período: **7, 14, 30 y 90 días**.
- Estadísticas del período: **Máximo, Mínimo y Promedio**.
- Gráfica de línea interactiva con **Recharts**.
- Totalmente accesible (ARIA labels, roles, live regions).

---

### ⚖️ Comparar (`/comparar`)
Comparador lado a lado de dos criptomonedas:
- Selección de **Cripto A** y **Cripto B** entre 10 opciones.
- Comparación de: precio actual, capitalización, volumen 24h, cambio 24h/7d, máximo histórico y ranking.
- El **valor ganador** se resalta en verde automáticamente.

---

### 🧮 Calculadora (`/calculadora`)
Herramienta de cálculo en dos secciones:

**💱 Convertidor:**
- Convierte entre **USD → Cripto** o **Cripto → USD**.
- Precio en tiempo real desde CoinGecko.
- Soporta: BTC, ETH, SOL, ADA, XRP, DOGE, DOT, LTC.

**📈 Calculadora de Inversión:**
- Ingresa: inversión inicial, precio de compra y precio de venta.
- Calcula: cantidad de monedas obtenidas, valor final, ganancia/pérdida y rentabilidad (%).

---

## 🔌 API

Se utiliza la **API pública de CoinGecko v3** — sin API key requerida.

| Endpoint | Uso |
|---|---|
| `/coins/markets` | Top criptos por market cap |
| `/simple/price` | Precio actual de una cripto |
| `/coins/{id}` | Datos detallados de una cripto |
| `/coins/{id}/market_chart` | Historial de precios |

---

## 🧩 Componentes

### `CryptoCard`
Tarjeta visual de una criptomoneda.
- **Props:** `coin` (objeto con `name`, `symbol`, `image`, `current_price`, `price_change_percentage_24h`)

### `CryptoTable`
Tabla interactiva con búsqueda y ordenamiento.
- Usa el hook `useCryptos(20)` internamente.
- Estados: `search`, `sortBy`, `sortDir`.

### `Navbar`
Barra de navegación fija con:
- Menú responsive (hamburguesa en móvil).
- Link activo resaltado con `useLocation`.
- Accesibilidad completa: skip-to-content, aria-current, aria-expanded.

---

## 🪝 Hooks personalizados

### `useCryptos(limit)`
Obtiene las top N criptomonedas desde CoinGecko.
- **Retorna:** `{ cryptos, loading, error }`
- **Parámetro:** `limit` (default: 20)

---

## ♿ Accesibilidad

El proyecto implementa buenas prácticas de accesibilidad:
- ✅ Skip-to-content link en Navbar.
- ✅ `aria-label`, `aria-current`, `aria-expanded`, `aria-pressed` en elementos interactivos.
- ✅ `role="status"` y `aria-live="polite"` en estados de carga.
- ✅ `role="alert"` en mensajes de error.
- ✅ Focus visible con `focus-visible:ring` en todos los botones y links.

---

## 🌐 Despliegue

El proyecto está desplegado en **Vercel** con integración continua desde GitHub.

Cada `git push` a la rama `master` dispara un nuevo build automáticamente.

```bash
# Subir cambios
git add .
git commit -m "descripción del cambio"
git push
```

---

## 👤 Autor

Desarrollado por **Steven Junior Huillca Cusi**  
🔗 [github.com/Shomish](https://github.com/Shomish)

---

## 📝 Licencia

Este proyecto es de uso libre para fines educativos y personales.
