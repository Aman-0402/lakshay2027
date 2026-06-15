export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="footer-logo">LAKSHYA 2047<sup>®</sup></p>
          <p className="footer-tagline">CENTRE OF FUTURE SKILLS</p>
          <p className="footer-desc">Shaping tomorrow's workforce through hands-on innovation.</p>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">EXPLORE</p>
          <ul>
            <li><a href="#">Labs Directory</a></li>
            <li><a href="#">Book a Lab</a></li>
            <li><a href="#">Find a Team</a></li>
            <li><a href="#">How It Works</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">LABS</p>
          <ul>
            <li><a href="#">ABB LAB</a></li>
            <li><a href="#">ADOBE LAB</a></li>
            <li><a href="#">APPLE LAB</a></li>
            <li><a href="#">AR/VR LAB</a></li>
            <li><a href="#">AUTODESK LAB</a></li>
            <li><a href="#">AWS LAB</a></li>
          </ul>
          <a href="#" className="footer-view-all">View All →</a>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">CENTRE</p>
          <ul>
            <li><a href="#">Centre of Future Skills</a></li>
            <li><a href="#">Parul University Campus</a></li>
            <li><a href="#">Vadodara, Gujarat</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2047 Lakshay — Centre of Future Skills. All rights reserved.</p>
        <p>Powered by <a href="#">Parul University</a></p>
      </div>
    </footer>
  )
}
