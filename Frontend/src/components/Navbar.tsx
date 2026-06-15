export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a href="/" className="navbar-logo">
          LAKSHYA 2047<sup>®</sup>
        </a>

        <ul className="navbar-links">
          <li><a href="#">Labs</a></li>
          <li><a href="#">Insights</a></li>
          <li><a href="#">Partners</a></li>
          <li><a href="#">My Team</a></li>
        </ul>

        <div className="navbar-actions">
          <a href="#" className="navbar-login">Login</a>
          <a href="#" className="navbar-cta">Try Now</a>
        </div>
      </div>
    </nav>
  )
}
