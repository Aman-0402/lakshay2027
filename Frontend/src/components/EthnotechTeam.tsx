const campusManagers = [
  { name: 'Campus Manager', slot: 1 },
  { name: 'Campus Manager', slot: 2 },
]

const trainers = Array.from({ length: 10 }, (_, i) => ({ slot: i + 1 }))

function PlaceholderAvatar() {
  return (
    <div className="ethno-avatar-placeholder">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  )
}

export default function EthnotechTeam() {
  return (
    <section className="ethno-section">
      <div className="team-inner">
        <div className="ethno-brand">
          <p className="ethno-label">ETHNOTECH ACADEMY</p>
          <h3 className="ethno-heading">ETHNOTECH TEAM</h3>
        </div>

        <p className="team-category">CAMPUS MANAGERS</p>
        <div className="ethno-managers-grid">
          {campusManagers.map(m => (
            <div className="team-card ethno-card" key={m.slot}>
              <PlaceholderAvatar />
              <h3 className="team-name ethno-placeholder-name">Campus Manager {m.slot}</h3>
              <p className="team-role">Campus Manager — Ethnotech Academy</p>
            </div>
          ))}
        </div>

        <p className="team-category" style={{ marginTop: '40px' }}>TRAINERS</p>
        <div className="ethno-trainers-grid">
          {trainers.map(t => (
            <div className="team-card ethno-card" key={t.slot}>
              <PlaceholderAvatar />
              <h3 className="team-name ethno-placeholder-name">Trainer {t.slot}</h3>
              <p className="team-role">Trainer — Ethnotech Academy</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
