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

export function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export const ALL_LABS = [
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
].map(lab => ({ ...lab, slug: slugify(lab.name) }))

export const CATEGORIES = ['ALL', ...Array.from(new Set(ALL_LABS.map(l => l.category)))]
