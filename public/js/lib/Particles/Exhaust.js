import Component from '../GameEngine/Component.js';
import { Util } from '../modules.js';

/* 
const exhaustArgs = {
  game: this.game, // a reference to to current game
  speedY: Number,// amount added to y (float),
  speedX: Number,// amount addec to x (float),
  x: Number,// starting x position (float),
  y: Number,// starting y position (float),
}
*/

// ship exhaust
export default class Exhaust extends Component {
  constructor(exhaustArgs){
    super();
    this.game = exhaustArgs.game;
    this.speedX = exhaustArgs.speedX || Util.randomSignInRange(this.game.units.width * .1, this.game.units.width);
    this.speedY = exhaustArgs.speedY || Util.randomInRange(this.game.units.height * .5, this.game.units.height * 2);
    this.x = exhaustArgs.x;
    this.y = exhaustArgs.y; // || ship.noseY + 45;
    this.size = Util.randomInRange(this.game.units.width * .5, this.game.units.width * 4);
    this.colorR = 255;
    this.colorG =  0;
    this.alpha = 1;  
    this.init()
  }
  init() {
    super.returnFunctionProps();
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.colorG += 2;
    this.colorR -= 2 ;
    this.alpha -= .01;
    //mark for garbage collector when no longer visible
    if(this.alpha <= 0){
      this.isGarbage = true;
    }
  }

  // exhaust are little circles
  draw(){
    this.game.gameCtx.lineWidth = this.game.units.width;
    this.game.gameCtx.strokeStyle = `rgba(${this.colorR}, ${this.colorG}, 0, ${this.alpha})`;
    this.game.gameCtx.beginPath();
    this.game.gameCtx.arc(this.x, this.y, this.size, 0, Util.TWO_PI);
    this.game.gameCtx.closePath();
    this.game.gameCtx.stroke();
  }
}