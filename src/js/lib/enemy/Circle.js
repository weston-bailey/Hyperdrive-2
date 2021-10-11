import Component from "../GameEngine/Component"
import { Particle } from "../modules"
import { Util } from "../modules"

// first enemy made, initally a test but still useful maybe
export default class Circle extends Component {
  constructor({ game, x, y, speedX, speedY, radius, color }) {
    super()
    this.game = game
    this.x = x
    this.y = y
    this.speedX = speedX
    this.speedY = speedY
    this.radius = radius
    this.hitRadius = this.radius // radius = hit radius bc its a circle
    this.color = color           // should be a hex for debris
    this.onScreen = false
    this.isGarbage = false
    this.init()
  }

  init() {
    super.returnFunctionProps()
  }

  update() {
    // wraps around screen like playership
    this.x += this.speedX
    this.y += this.speedY
    if(this.x > this.game.width + this.radius){                     
      this.x = 0 - this.radius
    }       
    if(this.x < 0 - this.radius){                     
      this.x = this.game.width + this.radius
    }           
    if(this.y > this.radius + this.game.height){
      this.onScreen = false
      this.isGarbage = true
    } else if(this.y < 0 - this.radius){
      this.onScreen = false
    } else {
      this.onScreen = true
    }
    // if(this.y > this.game.height) {
    //   this.isGarbage = true
    // }
    // if(this.y > 0) console.log(this)
  }
  draw() {
    this.game.gameCtx.lineWidth = 2
    this.game.gameCtx.strokeStyle = this.color
    this.game.gameCtx.beginPath()
    this.game.gameCtx.arc(this.x, this.y, this.radius, 0, Util.TWO_PI)
    this.game.gameCtx.closePath()
    this.game.gameCtx.stroke()
  }

  //for debug (no radius needed)
  drawCollisionRadius() {
    return
  }

  makeDebris() {
     //make alot of space junk
     let amount = randomInRange(24, 64)
     for (let i = 0; i < amount; i++) {
       this.game.particles.push(new Particle.Debris({ x: this.x, y: this.y, alphaDecrement: .001, color: Util.hexToRGBArray(this.color) }))
     }
     amount = randomInRange(24, 64)
     //make a little rainbow explosion
     for (let i = 0; i < amount; i++) {
       this.game.particles.push(new Particle.Debris({ x: this.x, y: this.y, alphaDecrement: .5, color: Util.hexToRGBArray(this.color) }))
    }
  }
}