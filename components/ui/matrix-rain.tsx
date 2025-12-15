"use client"

import { useEffect, useRef } from "react"

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Matrix characters (Japanese katakana + numbers + symbols)
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()_+-=[]{}|;:,.<>?"
    const charArray = chars.split("")

    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize)

    // Array to track y position of each column
    const drops: number[] = Array(columns).fill(1)

    const draw = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        if (Math.random() > 0.98) {
          ctx.fillStyle = "#60a5fa" // أزرق فاتح ساطع للحرف الأمامي
        } else {
          ctx.fillStyle = `rgb(${100 + Math.random() * 50}, ${180 + Math.random() * 50}, ${220 + Math.random() * 35})`
        }

        ctx.fillText(char, x, y)

        // Reset drop to top randomly after reaching bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33) // ~30fps

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className=" absolute inset-0 h-full -z-10" style={{ background: "#fff" }} />
}
