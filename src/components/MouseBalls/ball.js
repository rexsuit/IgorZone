export default class Ball {
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
