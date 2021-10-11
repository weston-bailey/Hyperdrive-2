import Star from './Star.js' 
import { Util } from '../modules.js' 


export default class Planet extends Star {
  constructor(starArgs) {
    super(starArgs) 
  }
  // filled in circle
  draw() {
    this.game.bgCtx.beginPath() 
    this.game.bgCtx.arc(this.x, this.y, this.radius, 0, Util.TWO_PI, false) 
    this.game.bgCtx.fillStyle = this.color 
    this.game.bgCtx.closePath() 
    this.game.bgCtx.fill() 
    this.game.bgCtx.lineWidth = 2 
    this.game.bgCtx.strokeStyle = this.color 
    this.game.bgCtx.stroke() 
  }
} 