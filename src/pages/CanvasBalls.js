import React, { useEffect } from 'react'
import LayoutEmpty from '../components/LayoutEmpty'

class Mouse {
  constructor(canvas) {
    this.x = 0
    this.y = 0

    let rect = canvas.getBoundingClientRect()

    canvas.onmousemove = (e) => {
      this.x = e.clientX - rect.left
      this.y = e.clientY - rect.top
    }
  }
}

class Ball {
  constructor(x, y, radius, color, canvasDimensions) {
    this.x = x || 0
    this.y = y || 0

    this.originalX = x || 0
    this.originalY = y || 0
    this.vx = 0
    this.vy = 0
    this.radius = radius || 2
    this.color = color || '#ffcc00'
    this.canvasDimensions = canvasDimensions
    this.deceleration = 0.01
  }

  setPos(x, y) {
    this.x = x
    this.y = y
  }

  think(mousePos, mouseRadius) {
    let dx = this.x - mousePos.x
    let dy = this.y - mousePos.y

    let dist = Math.sqrt(dx * dx + dy * dy)
    // console.log("dist!", dist);

    if (dist <= mouseRadius + this.radius) {
      let angle = Math.atan2(dy, dx)
      let tx = mousePos.x + Math.cos(angle) * mouseRadius
      let ty = mousePos.y + Math.sin(angle) * mouseRadius

      this.vx += (tx - this.x) / 100
      this.vy += (ty - this.y) / 100
    }

    if (this.canvasDimensions) {
      if (
        this.x + this.radius >= this.canvasDimensions.x ||
        this.x - this.radius <= 0
      ) {
        this.vx *= -1
      }

      if (
        this.y + this.radius >= this.canvasDimensions.y ||
        this.y - this.radius <= 0
      ) {
        this.vy *= -1
      }
    }

    this.x += this.vx
    this.y += this.vy

    // if ()
    this.vx -= this.vx * this.deceleration
    this.vy -= this.vy * this.deceleration
  }

  draw(ctx) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }
}

export default function Main() {
  useEffect(() => {
    let canvas
    let ctx
    let mouseCursor
    let mousePos
    let canvasWidth
    let canvasHeight
    let numberOfBalls = 1000
    let balls = []
    let mouseCursorRadius = 64
    let canvasBG = '#18FBFF'
    let ballsColor = '#16E8B0'

    let renderFunc = () => {
      window.requestAnimationFrame(renderFunc)
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      mouseCursor.setPos(mousePos.x, mousePos.y)
      mouseCursor.draw(ctx)

      balls.forEach((ball) => {
        ball.think(mousePos, mouseCursorRadius)
        ball.draw(ctx)
      })
    }

    canvasWidth = window.innerWidth
    canvasHeight = window.innerHeight

    canvas = document.querySelector('#canvas')
    canvas.style.backgroundColor = canvasBG
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    ctx = canvas.getContext('2d')
    mousePos = new Mouse(canvas)
    mouseCursor = new Ball(0, 0, mouseCursorRadius)

    for (let i = 0; i < numberOfBalls; i++) {
      balls.push(
        new Ball(
          Math.random() * canvasWidth,
          Math.random() * canvasHeight,
          Math.random() * 12,
          ballsColor,
          { x: canvasWidth, y: canvasHeight },
        ),
      )
    }

    renderFunc()
  }, [])

  return (
    <LayoutEmpty>
      <canvas id="canvas" />
    </LayoutEmpty>
  )
}
