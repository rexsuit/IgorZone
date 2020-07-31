import React, { useEffect } from 'react'
import Mouse from './Mouse'
import Ball from './Ball'

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
    <div>
      <div>
        <canvas id="canvas" />
      </div>
    </div>
  )
}
