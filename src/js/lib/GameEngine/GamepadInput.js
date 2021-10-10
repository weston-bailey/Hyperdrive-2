import Component from "./Component.js";
/*
const keyboatdInputArgs = {
  game: this,

}
*/

// handles gamepad controllers
// TODO: make this better
export default class GamepadInput extends Component{
  constructor(gamepadInputArgs){
    super();
    this.game = gamepadInputArgs.game;
    this.gamepadObject = gamepadInputArgs.gamepadObject;
    this.playerNumber = gamepadInputArgs.playerNumber;
  }
  
  init() {
    
  }
  
  // creates a deadzone in the middle of the analoge joystick axis
  deadZone (number, threshold){
    let percentage = (Math.abs(number) - threshold) / (1 - threshold);
    if(percentage < 0) percentage = 0;
    return percentage * (number > 0 ? 1 : -1);
  } 

  poll() {
    const gamepad = navigator.getGamepads()[0];
    const gamepadY = this.deadZone(gamepad.axes[1], .05)
    const gamepadX = this.deadZone(gamepad.axes[0], .05);
      
    if(gamepadY){
      this.game.player[this.playerNumber].speedY = Math.abs(gamepadY) * (this.game.units.height * 5);
      this.game.player[this.playerNumber].directionY = gamepadY > 0 ? 1 : -1;
    } 

    if(gamepadX){
      this.game.player[this.playerNumber].speedX = Math.abs(gamepadX) * (this.game.units.height * 5);
      this.game.player[this.playerNumber].directionX = gamepadX > 0 ? 1 : -1;
    } 

    // todo fix all the Math.abs 
    // if(gamepadX && gamepadY) {
    //   this.game.player[this.playerNumber].speed = Math.abs(gamepadX) > Math.abs(gamepadY) ? Math.abs(gamepadX) * 5 : Math.abs(gamepadY) * 5
    //   // console.log('x ' + Math.abs(gamepadX), 'y ' + Math.abs(gamepadY),'speed ' + this.game.player[this.playerNumber].speed)
    // }

    if (gamepad.buttons[0].pressed){
      if(this.game.player[this.playerNumber].shieldLevel > 0 && !this.game.player[this.playerNumber].shieldCoolDown){
        this.game.player[this.playerNumber].shield = true;
      }
    } else if(!this.game.player[this.playerNumber].shieldCoolDown) {
      this.game.player[this.playerNumber].shield = false;
    }
    // console.log(this.game.player[this.playerNumber].speedY)
    // console.log(this.game.player[this.playerNumber].speedX)
  }
}