const canvas = document.createElement('canvas')
canvas.id = 'galaxy-canvas'
document.body.style.margin = 0
document.body.style.overflow = 'hidden'
canvas.style.position = 'fixed'
canvas.style.top = '0'
canvas.style.left = '0'
canvas.style.width = '100vw'
canvas.style.height = '100vh'
canvas.style.zIndex = '-1'
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')
let width = window.innerWidth
let height = window.innerHeight
canvas.width = width
canvas.height = height

// Galaxy parameters
const STAR_COUNT = 400
const SPIRAL_ARMS = 3
const ARM_OFFSET = Math.PI * 2 / SPIRAL_ARMS
const ROTATION_SPEED = 0.0005
let t = 0

// Generate stars
const stars = []
for (let i = 0; i < STAR_COUNT; i++) {
  const r = Math.sqrt(Math.random()) * Math.min(width, height) * 0.45
  const arm = Math.floor(Math.random() * SPIRAL_ARMS)
  const angle = arm * ARM_OFFSET + Math.random() * ARM_OFFSET + r * 0.018
  const color = `hsla(${200 + Math.random() * 80}, 100%, 85%, ${0.5 + Math.random() * 0.5})`
  stars.push({ r, angle, size: Math.random() * 1.2 + 0.3, color })
}

function animate() {
  ctx.clearRect(0, 0, width, height)
  ctx.save()
  ctx.translate(width / 2, height / 2)
  for (const star of stars) {
    // Spiral outwards and rotate over time
    const a = star.angle + t * ROTATION_SPEED * (0.8 + Math.random() * 0.4)
    const x = Math.cos(a) * (star.r + Math.sin(t / 200 + a * 3) * 6)
    const y = Math.sin(a) * (star.r + Math.cos(t / 200 + a * 3) * 6)
    ctx.beginPath()
    ctx.arc(x, y, star.size, 0, Math.PI * 2)
    ctx.fillStyle = star.color
    ctx.shadowColor = star.color
    ctx.shadowBlur = 8
    ctx.fill()
  }
  ctx.restore()
  t += 1
  requestAnimationFrame(animate)
}

// Responsive resize
window.addEventListener('resize', () => {
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width
  canvas.height = height
})

// Simple landing page text
const title = document.createElement('h1')
title.textContent = 'Welcome to the Galaxy'
title.style.position = 'absolute'
title.style.top = '35%'
title.style.left = '50%'
title.style.transform = 'translate(-50%, -50%)'
title.style.color = '#fff'
title.style.fontFamily = 'Arial, sans-serif'
title.style.fontSize = '3rem'
title.style.textShadow = '0 0 18px #3af, 0 0 48px #07f'
document.body.appendChild(title)

const subtitle = document.createElement('p')
subtitle.textContent = 'Explore the universe of possibilities.'
subtitle.style.position = 'absolute'
subtitle.style.top = '48%'
subtitle.style.left = '50%'
subtitle.style.transform = 'translate(-50%, -50%)'
subtitle.style.color = '#ccefff'
subtitle.style.fontFamily = 'Arial, sans-serif'
subtitle.style.fontSize = '1.3rem'
subtitle.style.textShadow = '0 0 8px #3af'
document.body.appendChild(subtitle)

animate()