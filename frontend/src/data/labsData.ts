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
import placeholderImg from '../assets/Labs/Hero.png'

export function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// Bundled photos for the 12 permanent labs — used when backend has no uploaded image yet.
export const IMAGE_FALLBACK: Record<string, string> = {
  'abb-lab': abbImg,
  'adobe-lab': adobeImg,
  'arvr-lab': arvrImg,
  'autodesk-lab': autodesImg,
  'aws-lab': awsImg,
  'cisco-lab': ciscoImg,
  'smart-home-lab': smartHomeImg,
  'industrial-automation-lab': industrialImg,
  'microsoft-lab': microsoftImg,
  'nvidia-lab': nvidiaImg,
  'plc-scada-lab': plcImg,
  'vlsi-lab': vlsiImg,
}

export const PLACEHOLDER_IMAGE = placeholderImg
