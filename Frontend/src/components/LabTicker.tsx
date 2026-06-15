const labs = [
  'ABB LAB', 'ADOBE LAB', 'AR/VR LAB', 'AUTODESK LAB',
  'AWS LAB', 'CISCO LAB', 'SMART HOME LAB', 'INDUSTRIAL AUTOMATION LAB',
  'MICROSOFT LAB', 'NVIDIA LAB', 'PLC & SCADA LAB', 'VLSI LAB',
]

const items = [...labs, ...labs]

export default function LabTicker() {
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {items.map((lab, i) => (
          <span className="ticker-item" key={i}>
            {lab} <span className="ticker-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
