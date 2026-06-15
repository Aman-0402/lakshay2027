import { Route, Switch } from 'wouter'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LabsSection from './components/LabsSection'
import PlatformInsights from './components/PlatformInsights'
import Partners from './components/Partners'
import MyTeam from './components/MyTeam'
import EthnotechTeam from './components/EthnotechTeam'
import Footer from './components/Footer'
import LabTicker from './components/LabTicker'
import Labs from './pages/Labs'
import './styles/animations.css'
import './components/Navbar.css'
import './components/Hero.css'
import './components/HeroTitle.css'
import './components/LabTicker.css'
import './components/LabsSection.css'
import './components/PlatformInsights.css'
import './components/Partners.css'
import './components/MyTeam.css'
import './components/EthnotechTeam.css'
import './components/Footer.css'
import './pages/Labs.css'

function Home() {
  return (
    <>
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

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/labs" component={Labs} />
      </Switch>
    </>
  )
}

export default App
