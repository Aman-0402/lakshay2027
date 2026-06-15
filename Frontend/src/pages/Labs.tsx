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

const ALL_LABS = [
  { name: 'ABB LAB', category: 'ROBOTICS', desc: 'Specialized facility dedicated to industrial robotics, automation, and advanced manufacturing systems using ABB robotic arms.', resources: ['2 ROBOT'], img: abbImg },
  { name: 'ADOBE LAB', category: 'DESIGN', desc: 'Dedicated creative workspace for digital media production, graphic design, video editing and multimedia content creation.', resources: ['30 MONITOR', '30 CPU'], img: adobeImg },
  { name: 'AR/VR LAB', category: 'EXTENDED REALITY', desc: 'Immersive environment for developing and testing augmented and virtual reality applications with cutting-edge headsets.', resources: ['6 HEADSETS', '8 WORKSTATION'], img: arvrImg },
  { name: 'AUTODESK LAB', category: 'DESIGN', desc: 'Equipped for CAD, 3D modeling, and engineering design with industry-standard Autodesk software suite.', resources: ['30 MONITOR', '30 CPU'], img: autodesImg },
  { name: 'AWS LAB', category: 'CLOUD', desc: 'Hands-on cloud computing training with Amazon Web Services infrastructure, tools, and certification preparation.', resources: ['30 WORKSTATION', '30 CPU'], img: awsImg },
  { name: 'CISCO LAB', category: 'NETWORKING', desc: 'Real-world network configuration, routing, switching, and troubleshooting training with enterprise Cisco hardware.', resources: ['20 ROUTER', '20 SWITCH'], img: ciscoImg },
  { name: 'SMART HOME LAB', category: 'IoT', desc: 'IoT integration, smart devices, home automation protocols, and connected systems training with live setups.', resources: ['15 KIT', '15 DEVICE'], img: smartHomeImg },
  { name: 'INDUSTRIAL AUTOMATION LAB', category: 'AUTOMATION', desc: 'Hands-on industrial automation covering robotics, PLCs, process control systems, and Industry 4.0 concepts.', resources: ['10 STATION', '5 ROBOT'], img: industrialImg },
  { name: 'MICROSOFT LAB', category: 'SOFTWARE', desc: 'Full Microsoft software suite for development, Azure cloud, productivity tools, and certification training.', resources: ['30 MONITOR', '30 CPU'], img: microsoftImg },
  { name: 'NVIDIA LAB', category: 'AI / GPU', desc: 'High-performance GPU workstations for AI research, deep learning model training, and GPU computing.', resources: ['20 GPU', '20 WORKSTATION'], img: nvidiaImg },
  { name: 'PLC & SCADA LAB', category: 'AUTOMATION', desc: 'Training on programmable logic controllers, supervisory control, data acquisition, and industrial monitoring systems.', resources: ['15 PLC', '10 SCADA'], img: plcImg },
  { name: 'VLSI LAB', category: 'ELECTRONICS', desc: 'Chip design, FPGA programming, simulation, and testing of very large scale integrated circuits.', resources: ['20 WORKSTATION', '10 BOARD'], img: vlsiImg },
]

const CATEGORIES = ['ALL', ...Array.from(new Set(ALL_LABS.map(l => l.category)))]

export default function Labs() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [search, setSearch] = useState('')
  const { ref: heroRef, visible: heroVisible } = useInView()
  const { ref: gridRef, visible: gridVisible } = useInView()

  const filtered = ALL_LABS.filter(lab => {
    const matchCat = activeCategory === 'ALL' || lab.category === activeCategory
    const matchSearch = lab.name.toLowerCase().includes(search.toLowerCase()) ||
      lab.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="labs-page">

      {/* ── Hero Banner ── */}
      <section className="lp-hero">
        <div
          ref={heroRef as React.RefObject<HTMLDivElement>}
          className={`lp-hero-content reveal${heroVisible ? ' visible' : ''}`}
        >
          <p className="lp-eyebrow">OUR FACILITIES</p>
          <h1 className="lp-title">World-Class Labs</h1>
          <p className="lp-subtitle">
            14 state-of-the-art laboratories built to push the boundaries of technology,
            creativity, and hands-on learning.
          </p>
          <div className="lp-stats">
            <div className="lp-stat"><span className="lp-stat-num">12+</span><span className="lp-stat-label">Active Labs</span></div>
            <div className="lp-stat-divider" />
            <div className="lp-stat"><span className="lp-stat-num">500+</span><span className="lp-stat-label">Workstations</span></div>
            <div className="lp-stat-divider" />
            <div className="lp-stat"><span className="lp-stat-num">24/7</span><span className="lp-stat-label">Access</span></div>
          </div>
        </div>
      </section>

      {/* ── Filter + Search ── */}
      <div className="lp-controls">
        <div className="lp-search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="lp-search"
            type="text"
            placeholder="Search labs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="lp-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              className={`lp-filter-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Labs Grid ── */}
      <div className="lp-grid-wrap">
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className={`lp-grid stagger${gridVisible ? ' visible' : ''}`}
        >
          {filtered.length > 0 ? filtered.map(lab => (
            <div className="lp-card" key={lab.name}>
              <div className="lp-card-img-wrap">
                <img src={lab.img} alt={lab.name} className="lp-card-img" />
                <span className="lp-badge">◎ AVAILABLE</span>
                <span className="lp-cat-tag">{lab.category}</span>
              </div>
              <div className="lp-card-body">
                <h3 className="lp-card-name">{lab.name}</h3>
                <p className="lp-card-desc">{lab.desc}</p>
                <div className="lp-card-resources">
                  {lab.resources.map(r => (
                    <span className="lp-resource" key={r}>⚡ {r}</span>
                  ))}
                </div>
                <button type="button" className="lp-book-btn">Book Lab →</button>
              </div>
            </div>
          )) : (
            <p className="lp-no-results">No labs match your search.</p>
          )}
        </div>
      </div>
    </div>
  )
}
