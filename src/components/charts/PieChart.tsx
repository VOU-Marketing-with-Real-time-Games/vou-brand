'use client'

import { useEffect, useRef, useState } from 'react'
import { Tooltip } from './ToolTip'

interface DataPoint {
  genre: string
  value: number
  color: string
}

interface PieChartProps {
  data: DataPoint[]
}

export function PieChart({ data }: PieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState({
    content: '',
    x: 0,
    y: 0
  })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const size = 180
    canvasRef.current.width = size * dpr
    canvasRef.current.height = size * dpr
    ctx.scale(dpr, dpr)

    const total = data.reduce((sum, item) => sum + item.value, 0)
    let currentAngle = -0.5 * Math.PI

    // Store segment information for hit testing
    const segments = data.map((item, index) => {
      const startAngle = currentAngle
      const sliceAngle = (item.value / total) * 2 * Math.PI
      const endAngle = startAngle + sliceAngle
      currentAngle += sliceAngle

      return {
        startAngle,
        endAngle,
        ...item
      }
    })

    function drawChart(hoveredIdx: number | null = null) {
      if (!ctx) {
         return;
      }
        ctx.clearRect(0, 0, size, size)
    
    
      segments.forEach(({ startAngle, endAngle, color }, index) => {
        ctx.beginPath()
        
        // Calculate radius with hover effect
        const radius = index === hoveredIdx ? size * 0.28 : size * 0.25
        
        ctx.moveTo(size/2, size/2)
        ctx.arc(
          size/2, 
          size/2, 
          radius,
          startAngle,
          endAngle
        )
        ctx.closePath()

        ctx.fillStyle = color
        ctx.fill()
      })
    }

    function isPointInSegment(x: number, y: number, segment: typeof segments[0]): boolean {
      const dx = x - size/2
      const dy = y - size/2
      const angle = Math.atan2(dy, dx)
      let normalizedAngle = angle + Math.PI/2 // Adjust for our starting point
      if (normalizedAngle < 0) normalizedAngle += Math.PI * 2

      return normalizedAngle >= segment.startAngle && normalizedAngle <= segment.endAngle
    }

    function handleMouseMove(e: MouseEvent) {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) * dpr
      const y = (e.clientY - rect.top) * dpr

      const hoveredSegment = segments.findIndex(segment => 
        isPointInSegment(x, y, segment)
      )

      if (hoveredSegment !== -1) {
        const percentage = ((data[hoveredSegment].value / total) * 100).toFixed(2)
        setTooltip({
          content: `${data[hoveredSegment].genre} - ${percentage}%`,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
        setHoveredIndex(hoveredSegment)
      } else {
        setTooltip({ content: '', x: 0, y: 0 })
        setHoveredIndex(null)
      }

      drawChart(hoveredSegment)
    }

    function handleMouseLeave() {
      setTooltip({ content: '', x: 0, y: 0 })
      setHoveredIndex(null)
      drawChart(null)
    }

    // Initial draw
    drawChart()

    // Add event listeners
    const canvas = canvasRef.current
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [data])

  return (
    <div ref={containerRef} className="relative inline-block">
      <canvas
        ref={canvasRef}
        style={{
          width: '180px',
          height: '180px'
        }}
        className="cursor-pointer transition-transform duration-300 ease-in-out"
      />
      <Tooltip {...tooltip} />
    </div>
  )
}

