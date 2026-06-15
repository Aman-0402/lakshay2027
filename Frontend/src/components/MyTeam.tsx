import swapnilImg from '../assets/team/Dr. Swapnil M Parikh.jpg'
import divyeshImg from '../assets/team/Divyesh Hariyani.jpg'
import belaImg from '../assets/team/Prof. Bela Shah.jpg'

const members = [
  {
    name: 'Dr. Swapnil M Parikh',
    role: 'Dean of Faculty of Engineering & Technology',
    img: swapnilImg,
  },
  {
    name: 'Divyesh Hariyani',
    role: 'Manager - Centre of Future Skills',
    img: divyeshImg,
  },
  {
    name: 'Prof. Bela Shah',
    role: 'Project Manager & Assistant Professor',
    img: belaImg,
  },
]

export default function MyTeam() {
  return (
    <section className="team-section">
      <div className="team-header">
        <p className="team-eyebrow">THE PEOPLE BEHIND LAKSHYA</p>
        <h2 className="team-title">MY TEAM</h2>
        <p className="team-subtitle">
          Meet the mentors, managers, and developers powering the future of skills at Parul University.
        </p>
      </div>

      <div className="team-inner">
        <p className="team-category">LEADERSHIP &amp; MENTORSHIP</p>
        <div className="team-grid">
          {members.map(m => (
            <div className="team-card" key={m.name}>
              <img src={m.img} alt={m.name} className="team-avatar" />
              <h3 className="team-name">{m.name}</h3>
              <p className="team-role">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
