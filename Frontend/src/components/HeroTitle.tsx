import { useEffect, useRef } from 'react'

const TEXT = 'Where Future Skills Are Built.'
const RANDOM_COLORS = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff6bff','#ff9a3c','#00e5ff','#ff4d4d','#b388ff']

const CONFIG = {
  repelRadius:  110,
  pushStrength: 58,
  friction:     0.80,
  returnForce:  0.10,
  glitchThresh: 0.26,
}

export default function HeroTitle() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const charsRef = useRef<Array<{
    el: HTMLSpanElement
    vx: number; vy: number; dx: number; dy: number; gc: number
  }>>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const chars: typeof charsRef.current = []

    ;[...TEXT].forEach(ch => {
      const span = document.createElement('span')
      span.className = ch === ' ' ? 'ht-ch ht-sp' : 'ht-ch'
      if (ch !== ' ') span.textContent = ch
      container.appendChild(span)
      if (ch !== ' ') {
        chars.push({ el: span, vx: 0, vy: 0, dx: 0, dy: 0, gc: 0 })
      }
    })
    charsRef.current = chars

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }

    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)

    function spawnParticles(x: number, y: number) {
      for (let i = 0; i < 6; i++) {
        const p = document.createElement('div')
        p.className = 'ht-particle'
        const sz = 2 + Math.random() * 3
        const ang = Math.random() * Math.PI * 2
        const d = 20 + Math.random() * 45
        const color = RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)]
        p.style.cssText = `width:${sz}px;height:${sz}px;left:${x}px;top:${y}px;background:${color};--px:${(Math.cos(ang)*d).toFixed(1)}px;--py:${(Math.sin(ang)*d).toFixed(1)}px;`
        container.appendChild(p)
        setTimeout(() => p.remove(), 800)
      }
    }

    function triggerGlitch(c: typeof chars[0]) {
      c.el.classList.remove('ht-glitch')
      void c.el.offsetWidth
      c.el.classList.add('ht-glitch')
      c.gc = 20
      const color = RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)]
      c.el.style.color = color
      const r = c.el.getBoundingClientRect()
      const sr = container.getBoundingClientRect()
      spawnParticles(r.left - sr.left + r.width / 2, r.top - sr.top + r.height / 2)
      setTimeout(() => c.el.classList.remove('ht-glitch'), 300)
    }

    function loop() {
      const sr = container.getBoundingClientRect()
      const { x: mx, y: my } = mouseRef.current

      charsRef.current.forEach(c => {
        const r = c.el.getBoundingClientRect()
        const cx = (r.left + r.right) / 2 - sr.left + c.dx
        const cy = (r.top + r.bottom) / 2 - sr.top + c.dy
        const ddx = cx - mx, ddy = cy - my
        const dist = Math.sqrt(ddx * ddx + ddy * ddy)

        if (dist < CONFIG.repelRadius && dist > 0) {
          const force = (CONFIG.repelRadius - dist) / CONFIG.repelRadius
          const angle = Math.atan2(ddy, ddx)
          const push = force * force * CONFIG.pushStrength
          c.vx += Math.cos(angle) * push
          c.vy += Math.sin(angle) * push
          if (c.gc <= 0 && force > CONFIG.glitchThresh) triggerGlitch(c)
        }

        c.vx += -c.dx * CONFIG.returnForce
        c.vy += -c.dy * CONFIG.returnForce
        c.vx *= CONFIG.friction
        c.vy *= CONFIG.friction
        c.dx += c.vx
        c.dy += c.vy

        const spd = Math.sqrt(c.vx * c.vx + c.vy * c.vy)
        if (spd < 0.05 && dist >= CONFIG.repelRadius) {
          c.el.style.color = '#ffffff'
          c.el.style.textShadow = '0 2px 12px rgba(255,255,255,0.25)'
        }
        c.el.style.transform = `translate(${c.dx.toFixed(2)}px,${c.dy.toFixed(2)}px) skewX(${(-c.vx * 0.45).toFixed(2)}deg)`
        if (c.gc > 0) c.gc--
      })

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
      container.innerHTML = ''
    }
  }, [])

  return <div ref={containerRef} className="ht-container" />
}
