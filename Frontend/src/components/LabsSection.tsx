import { useState } from 'react'
import { useInView } from '../hooks/useInView'

import abbImg from '../assets/Labs/ABB labb.png'
import adobeImg from '../assets/Labs/ADOBE labb.png'
import arvrImg from '../assets/Labs/AR VR.png'
import autodesImg from '../assets/Labs/Autodesk lab.png'
import awsImg from '../assets/Labs/AWS lab.png'
import ciscoImg from '../assets/Labs/Cisco lab.png'
import smartHomeImg from '../assets/Labs/Smart home automation training lab.png'
import industrialImg from '../assets/Labs/Drive innovation in industrial automation lab.png'
import microsoftImg from '../assets/Labs/Microsoft lab.png'
import nvidiaImg from '../assets/Labs/NVIDIA lab.png'
import plcImg from '../assets/Labs/PLC & SCADA training lab.png'
import vlsiImg from '../assets/Labs/VLSI lab.png'

const labs = [
  { name: 'ABB LAB', category: 'ROBOTICS', icon: '⚙️', desc: 'Specialized facility dedicated to industrial robotics, automation, and advanced manufacturing systems.', resources: ['🖥 2 ROBOT'], img: abbImg },
  { name: 'ADOBE LAB', category: 'DESIGN', icon: '✏️', desc: 'Dedicated creative workspace for digital media production, graphic design, and multimedia content.', resources: ['🖥 30 MONITOR', '⚡ 30 CPU'], img: adobeImg },
  { name: 'AR/VR LAB', category: 'EXTENDED REALITY', icon: '🥽', desc: 'Immersive environment for developing and testing augmented and virtual reality applications.', resources: ['🥽 6 HEADSETS', '⚡ 8 WORKSTATION'], img: arvrImg },
  { name: 'AUTODESK LAB', category: 'DESIGN', icon: '✏️', desc: 'Equipped for CAD, 3D modeling, and engineering design with industry-standard Autodesk tools.', resources: ['🖥 30 MONITOR', '⚡ 30 CPU'], img: autodesImg },
  { name: 'AWS LAB', category: 'CLOUD', icon: '☁️', desc: 'Hands-on cloud computing training with Amazon Web Services infrastructure and services.', resources: ['🖥 30 WORKSTATION', '⚡ 30 CPU'], img: awsImg },
  { name: 'CISCO LAB', category: 'NETWORKING', icon: '🌐', desc: 'Real-world network configuration and troubleshooting training with Cisco hardware.', resources: ['🌐 20 ROUTER', '⚡ 20 SWITCH'], img: ciscoImg },
  { name: 'SMART HOME LAB', category: 'IoT', icon: '🏠', desc: 'IoT integration, smart devices, and home automation training with live setups.', resources: ['🏠 15 KIT', '⚡ 15 DEVICE'], img: smartHomeImg },
  { name: 'INDUSTRIAL AUTOMATION LAB', category: 'AUTOMATION', icon: '⚙️', desc: 'Hands-on industrial automation covering robotics, PLCs, and process control systems.', resources: ['⚙️ 10 STATION', '⚡ 5 ROBOT'], img: industrialImg },
  { name: 'MICROSOFT LAB', category: 'SOFTWARE', icon: '💻', desc: 'Full Microsoft software suite for development, cloud, and productivity training.', resources: ['🖥 30 MONITOR', '⚡ 30 CPU'], img: microsoftImg },
  { name: 'NVIDIA LAB', category: 'AI / GPU', icon: '🤖', desc: 'High-performance GPUs for AI, deep learning, and simulation workloads.', resources: ['🖥 20 GPU', '⚡ 20 WORKSTATION'], img: nvidiaImg },
  { name: 'PLC & SCADA LAB', category: 'AUTOMATION', icon: '⚙️', desc: 'Training on programmable logic controllers and supervisory control systems.', resources: ['⚙️ 15 PLC', '⚡ 10 SCADA'], img: plcImg },
  { name: 'VLSI LAB', category: 'ELECTRONICS', icon: '🔬', desc: 'Chip design, simulation, and testing of very large scale integrated circuits.', resources: ['🔬 20 WORKSTATION', '⚡ 10 BOARD'], img: vlsiImg },
]

export default function LabsSection() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? labs : labs.slice(0, 3)
  const { ref: headerRef, visible: headerVisible } = useInView()
  const { ref: gridRef, visible: gridVisible } = useInView()

  return (
    <section className="labs-section">
      <div
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className={`labs-header reveal${headerVisible ? ' visible' : ''}`}
      >
        <div className="labs-header-left">
          <p className="labs-eyebrow">OUR FACILITIES</p>
          <h2 className="labs-title">EXPLORE OUR LABS</h2>
          <p className="labs-subtitle">
            World-class facilities designed to push the boundaries of technology,{' '}
            <span className="labs-subtitle-highlight">creativity</span>, and{' '}
            <span className="labs-subtitle-highlight">research</span>.
          </p>
        </div>
        <button type="button" className="labs-view-more" onClick={() => setShowAll(s => !s)}>
          {showAll ? 'SHOW LESS ←' : 'VIEW MORE LABS →'}
        </button>
      </div>

      <div
        ref={gridRef as React.RefObject<HTMLDivElement>}
        className={`labs-grid stagger${gridVisible ? ' visible' : ''}`}
      >
        {visible.map(lab => (
          <div className="lab-card" key={lab.name}>
            <div className="lab-card-img-wrap">
              <img src={lab.img} alt={lab.name} className="lab-card-img" />
              <span className="lab-badge">◎ AVAILABLE</span>
            </div>
            <div className="lab-card-body">
              <div className="lab-card-meta">
                <span className="lab-category">{lab.category}</span>
                <span className="lab-icon">{lab.icon}</span>
              </div>
              <h3 className="lab-name">{lab.name}</h3>
              <p className="lab-desc">{lab.desc}</p>
              <div className="lab-resources">
                {lab.resources.map(r => <span className="lab-resource" key={r}>{r}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
