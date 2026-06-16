import { Route, Switch } from 'wouter'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Hero from './components/Hero'
import LabsSection from './components/LabsSection'
import Footer from './components/Footer'
import LabTicker from './components/LabTicker'
import Labs from './pages/Labs'
import LabDetail from './pages/LabDetail'
import Insights from './pages/Insights'
import PartnersPage from './pages/PartnersPage'
import MyTeamPage from './pages/MyTeamPage'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ManageLabs from './pages/ManageLabs'
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
import './pages/LabDetail.css'
import './pages/About.css'
import './pages/Auth.css'
import './pages/Dashboard.css'
import './components/DashboardLayout.css'

function Home() {
  return (
    <>
      <Hero />
      <LabTicker />
      <LabsSection />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/insights" component={Insights} />
        <Route path="/partners" component={PartnersPage} />
        <Route path="/my-team" component={MyTeamPage} />
        <Route path="/labs" component={Labs} />
        <Route path="/labs/:slug" component={LabDetail} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={StudentDashboard} />
        <Route path="/admin-dashboard" component={AdminDashboard} />
        <Route path="/admin-dashboard/labs" component={ManageLabs} />
      </Switch>
      <Footer />
    </AuthProvider>
  )
}

export default App
