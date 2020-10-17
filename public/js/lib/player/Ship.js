import Component from '../GameEngine/Component.js';
import { Particle, Util } from '../modules.js';

/*
shipArgs = {
  game: this.game // a reference to to current game
  noseX: Number, // starting nose x pos
  noseY: Number, // starting nose y pos
  color:  `#faebd7`, // `antiquewhite` the champagne of whites
}
*/

// the player controlled ship
export default class Ship extends Component{
  constructor(shipArgs){
    super();
    this.game  = shipArgs.game;
    // start in middle (ship is drawn from nose)
    this.noseX = shipArgs.noseX; 
    this.noseY = shipArgs.noseY;
    this.color = shipArgs.color;
    this.speedX = this.game.units.height * 5;
    this.speedY = this.game.units.height * 5;
    // check for movement from keypresses
    this.directionX = 0; 
    this.directionY = 0;
    this.shield = false;
    // velocity on this axis
    this.velocityX = 0; 
    this.velocityY = 0;
    this.shieldColor =  `173, 216, 230`; // `lightblue`
    this.shieldColorAlpha = 0;  
    // draw width for line and level of how much shield is left
    this.shieldLevel = 4; 
    // period of invincibility after shield has been hit
    this.shieldCoolDown = false;
    this.init();
  }

  init() {
    super.returnFunctionProps();
  }

  // called before inputs are polled
  resetMovement() {
    this.directionY = 0;
    this.directionX = 0;
    this.shield = false;
    this.speedX = this.game.units.height * 5;
    this.speedY = this.game.units.height * 5;
  }

  update(){ 
    if(this.directionY){
      // mult by direction so vel is going the right way
      this.velocityY = this.directionY * (this.game.units.height * 3);
      //direction is either pos or neg 1
      this.noseY += this.speedY * this.directionY;
      const exhaustArgs = {
        game: this.game, // a reference to to current game
        x: this.noseX,// starting x position (float),
        y: this.noseY + (this.game.units.height * 45),// starting y position (float),
      }
      for(let i = 0; i < 3; i++){
        this.game.particles.push(new Particle.Exhaust(exhaustArgs));
      }
    }
    if(this.directionX){
      this.velocityX = this.directionX * (this.game.units.width * 3);
      this.noseX += this.speedX * this.directionX;
      const exhaustArgs = {
        game: this.game, // a reference to to current game
        x: this.noseX,// starting x position (float),
        y: this.noseY + (this.game.units.height * 45),// starting y position (float),
      }
      this.game.particles.push(new Particle.Exhaust(exhaustArgs));
    }

    //move ship to other side of screen when it reaches the side
    if(this.noseX > this.game.width){                     
      this.noseX = 0;
    }       
    if(this.noseX < 0){                     
      this.noseX = this.game.width;
    }  

    //restrict movement to height boundaries of screen     
    if(this.noseY > (this.game.height - 45)){                    
      this.noseY = (this.game.height - 45);
    }       
    if(this.noseY < 0){                     
      this.noseY = 0;
    } 

    // for shield fade effect
    if(this.shield && this.shieldColorAlpha < 1){
      this.shieldColorAlpha += .1;
    } else if (!this.shield && this.shieldColorAlpha > 0){ //reset on shield off
      this.shieldColorAlpha = 0;
    }

    // rate that velocity wears off
    this.velocityX *= 0.999;                             
    this.velocityY *= 0.999;   
    // influence position with velocity
    this.noseX += this.velocityX;
    this.noseY += this.velocityY;
  }

  draw(){
    // draw a traingle starting at ship nose
    this.game.gameCtx.strokeStyle = this.color;
    this.game.gameCtx.lineWidth = this.game.units.width * 3;
    this.game.gameCtx.beginPath();

    // just kinda messed with values until I found an isosceles triangle of the right shape and size
    this.game.gameCtx.moveTo(this.noseX, this.noseY);
    this.game.gameCtx.lineTo(this.noseX - (this.game.units.width * 15), this.noseY + (this.game.units.height * 45));
    this.game.gameCtx.lineTo(this.noseX + (this.game.units.width * 15), this.noseY + (this.game.units.height *45));
    this.game.gameCtx.closePath();
    this.game.gameCtx.stroke();
    // draw shield if shield is active has power left
    if(this.shield && this.shieldLevel > 0){
      this.game.gameCtx.lineWidth = this.shieldLevel + this.game.units.height; //shield gets smaller when hit
      this.game.gameCtx.strokeStyle = `rgba(${this.shieldColor}, ${this.shieldColorAlpha})`; //could do a shield active check in update and += shield alpha
      this.game.gameCtx.beginPath();
      this.game.gameCtx.arc(this.noseX, this.noseY + (this.game.units.height * 25), this.game.units.height * 45, 0, Util.TWO_PI);
      this.game.gameCtx.closePath();
      this.game.gameCtx.stroke();
    }
  }

  //for debug
  drawCollisionRadius(){
    this.game.gameCtx.lineWidth = this.game.units.height * 1;
    this.game.gameCtx.strokeStyle = `white`;
    this.game.gameCtx.beginPath();
    this.game.gameCtx.arc(this.noseX, this.noseY + (this.game.units.height * 30), this.game.units.height * 15, 0, Util.TWO_PI);
    this.game.gameCtx.closePath();
    this.game.gameCtx.stroke();
  }

  makeDebris(){
    // make alot of debris for ship explosion
    let amount = randomInRange(80, 100);
    for (let i = 0; i < amount; i++){
      this.game.particles.push(new Particle.Debris(this.noseX, this.noseY, .001, Util.hexToRGBArray(this.color)));
    }

    // reactor blowout XD
    amount = randomInRange(64, 90);
    for(let i = 0; i < amount; i++){
      this.game.particles.push(new Particle.Exhaust(this.noseX, this.noseY + 30, Util.randomSignInRange(.1, 5), Util.randomSignInRange(.1, 5)));
    }

    for(let i = 0; i < 5; i++){
      // make a little rainbow explosion
      amount = Util.randomInRange(32, 64);
      for (let j = 0; j < amount; j++){
        this.game.particles.push(new Particle.Debris(this.noseX, this.noseY, .01));
      }
    }

  }
}
