import Component from '../GameEngine/Component.js' 
import { Util } from '../modules.js' 

/*
const debrisArgs = {
  x: Number, // starting x pos 
  y: Number, // starting y pos
  color: String, // debris color (optional)
  alphaDecrement: Number // speed that the debris fades away, lower = slower (optional)
}
*/

// debris from collisions
export default class Debris extends Component {
  //staring x, starting y, speed that debris dissapears (values closer to 0 is longer), color of debris
  //constructor is randomized is not passed values when created 
  constructor(debirsArgs) {
    super() 
    this.game = debrisArgs.game 
    this.x = debirsArgs.x 
    this.y = debirsArgs.y 
    this.color = debirsArgs.color || Util.hexToRGBArray(Util.randomColorHex()) 
    this.alphaDecrement = debirsArgs.alphaDecrement || .1 
    this.speedX = Util.randomSignInRange(this.game.units.width * .1, this.game.units.width * 5) 
    this.speedY = Util.randomSignInRange(this.game.units.height * .1, this.game.units.height * 5) 
    this.alpha = 1   
    this.size = Util.randomInRange(this.game.units. width * .5, this.game.units.width * 10) 
    this.radians = Util.degreesToRadians(Util.randomInRange(0, 360)) 
    this.spinSpeed = Util.randomSignInRange(0, 1)  
    this.sides = Util.randomIntInRange(2, 12) 
    this.vertAngle = Util.TWO_PI / this.sides 
    this.init()  
  }

  init() {
    super.returnFunctionProps() 
  }

  update() {
    this.y += this.speedY 
    this.x += this.speedX 
    this.alpha -= this.alphaDecrement 
    this.radians += this.spinSpeed 
    //if is no longer visible it is marked as garbage
    if(this.alpha <= 0) {
      this.isGarbage = true 
    }
  }
  draw() {
    this.game.gameCtx.lineWidth = 1 
    this.game.gameCtx.strokeStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.alpha})` 
    this.game.gameCtx.beginPath() 
    //same maths as polygon classes (see them for formula)
    this.game.gameCtx.moveTo(this.x - this.size * Math.cos(this.radians), this.y - this.size * Math.sin(this.radians)) 
    for(let i = 0;  i < this.sides;  i++) {
      this.game.gameCtx.lineTo(this.x - this.size * Math.cos(this.vertAngle * i + this.radians), this.y - this.size * Math.sin(this.vertAngle * i + this.radians)) 
    }
    this.game.gameCtx.closePath() 
    this.game.gameCtx.stroke() 
  }
}