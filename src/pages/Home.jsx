import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import CryptoTable from '../components/CryptoTable.jsx'
import Footer from '../components/Footer.jsx'

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <CryptoTable />
      <Footer />
    </div>
  )
}

export default Home
