import Component from "./Component.js";
/*
const keyboatdInputArgs = {
  game: this,

}
*/


// Handles HUD and Menus
export default class KeyboardInput extends Component{
  constructor(keyboardInputArgs){
    super();
    this.game = keyboardInputArgs.game;
    this.keys = [];
    this.keyDown = document.body.addEventListener(`keydown`, e => { this.keyDownHandler(e) });
    this.keyUp  = document.body.addEventListener(`keyup`, e => { this.keyUpHandler(e) });
    this.playerNumber = keyboardInputArgs.player;
    this.init()
  }

  init() {
    for(let i = 0; i < 88; i++){
      this.keys[i] = false;
    }
  }

  poll() {
    // controls 87 = w S = 83 
    if(this.keys[87] || this.keys[38]){
      this.game.player[this.playerNumber].directionY = -1;
    } else if(this.keys[83] || this.keys[40]){ 
      this.game.player[this.playerNumber].directionY = 1;
    } 

    //68 = D 65 = A 
    if(this.keys[65] || this.keys[37]){
      this.game.player[this.playerNumber].directionX = -1;
    } else if(this.keys[68] || this.keys[39]){
      this.game.player[this.playerNumber].directionX = 1;
    } 

    if (this.keys[32]){ //16 for space on mac?
      if(this.game.player[this.playerNumber].shieldLevel > 0 && !this.game.player[this.playerNumber].shieldCoolDown){
        this.game.player[this.playerNumber].shield = true;
      }
    } else if(!this.game.player[this.playerNumber].shieldCoolDown) {
      this.game.player[this.playerNumber].shield = false;
    }
  }

  keyDownHandler(e) {
    this.keys[e.keyCode] = true;
  }

  keyUpHandler(e) {
    this.keys[e.keyCode] = false;
  }

}