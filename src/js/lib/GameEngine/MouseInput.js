import Component from "./Component.js" 
import { Util } from "../modules.js"
/*
const keyboatdInputArgs = {
  game: this,

}
*/

// handles gamepad controllers
// TODO: make this better
export default class MouseInput extends Component {
  constructor({ game, canvas }) {
    super() 
    this.game = game
    this.canvas = canvas
    this.clickEvent = this.canvas.addEventListener('click', e => this.click(e))
    this.mouseEvent = this.canvas.addEventListener('mousemove', e => this.mouseMove(e))
    this.lastClick = false
    this.lastMove = false
  }
  // setting the vector of events so we can check them later during the poll phase
  findXY = e => [e.offsetX, e.offsetY]
  click = e => this.lastClick = this.findXY(e)
  mouseMove = e => this.lastMove = this.findXY(e)
  

  init() {
    
  }

  poll() {
    if(this.lastClick) {
      // check last click against array of menu items
  
      // set last click to e false
      this.lastClick = false
    }

    if(this.lastMove) {
      console.log(this.lastMove)
      this.lastMove = false
    } 




  }
}