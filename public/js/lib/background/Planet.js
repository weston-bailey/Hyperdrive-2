import Star from './Star.js';
import { Util } from '../modules.js';


export default class Planet extends Star{
  constructor(starArgs){
    super(starArgs);
  }
  // filled in circle
  draw(){
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.x, this.y, this.radius, 0, Util.TWO_PI, false);
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.closePath();
    this.game.ctx.fill();
    this.game.ctx.lineWidth = 2;
    this.game.ctx.strokeStyle = this.color;
    this.game.ctx.stroke();
  }
} 