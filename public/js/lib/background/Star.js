import Component from '../GameEngine/Component.js'
import { Util } from '../modules.js';
/*
starArgs {
  game: this, // refrence to the game object
  speed: Number, //amount added to y (float),
  x: Number, //starting x position (int),
  y: Number, //starting y positon (int),
  color: String, //color (string),
  radius: Number, // draw radius (float),
}
*/
export default class Star extends Component {
  constructor(starArgs){
    super();
    this.game = starArgs.game,
    this.speed = starArgs.speed;
    this.x = starArgs.x;
    this.y = starArgs.y;
    this.color =  starArgs.color;
    this.radius = starArgs.radius;
    this.updatePointer = null;
    this.init()
  }

  init(){
    super.returnFunctionProps();
    this.updatePointer = this.recycle;
  }

  // recycle star to top of canvas
  recycle(){
    this.y = 0;
    this.x = Math.random() * this.game.canvasWidth; 
  }

  // mark for garbage collection
  garbage(){
    this.isGarbage = true;
  }

  //move star
  update(){
    this.y += this.speed;
    //if star moves off screen, reset y and randomize x to repurpose it as a new star
    if(this.y > this.game.canvasHeight){
      this.updatePointer();
    }
  }

  //stars are just little circles
  draw(){
    this.game.ctx.lineWidth = 2;
    this.game.ctx.strokeStyle = this.color;
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.x, this.y, this.radius, 0, Util.TWO_PI);
    this.game.ctx.closePath();
    this.game.ctx.stroke();
  }
}