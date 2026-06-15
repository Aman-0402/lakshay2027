import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LabsSection from './components/LabsSection'
import PlatformInsights from './components/PlatformInsights'
import Partners from './components/Partners'
import MyTeam from './components/MyTeam'
import EthnotechTeam from './components/EthnotechTeam'
import Footer from './components/Footer'
import LabTicker from './components/LabTicker'
import './styles/animations.css'
import './components/Navbar.css'
import './components/Hero.css'
import './components/LabTicker.css'
import './components/LabsSection.css'
import './components/PlatformInsights.css'
import './components/Partners.css'
import './components/MyTeam.css'
import './components/EthnotechTeam.css'
import './components/Footer.css'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <LabTicker />
      <LabsSection />
      <PlatformInsights />
      <Partners />
      <MyTeam />
      <EthnotechTeam />
      <Footer />
    </>
  )
}

export default App
