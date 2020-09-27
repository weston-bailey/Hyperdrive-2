import { Engine } from '../modules.js';

/*
gameArgs = {
  canvasId: // html canvas element id
  canvasHeight: // cnvas height in pixels
  canvasWidth: // canvas width in pixels
  currentLevel: // level to start at
}
*/

export default class Game {
  constructor(gameArgs) {
    // for the game canvas
    this.canvas = document.getElementById(gameArgs.canvasId);
    this.canvasHeight = gameArgs.canvasHeight;
    this.canvasWidth = gameArgs.canvasWidth;
    this.ctx = null;
    // game state
    this.renderPointer = null; 
    this.ship = null;
    this.levels = [];
    this.currentLevel = gameArgs.currentLevel;
    this.background = [];

    this.init();
  }

  init() {
    // setup canvas
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    // device pixel ratio for high res screens
    let dpr = window.devicePixelRatio || 1;
    this.ctx.scale(dpr, dpr);
    //  make levels
    let levelArgs = {

    }
    this.levels.push(new Engine.Level(levelArgs));
    // make background
    this.renderPointer = () => this.render();
    this.render();


  }

  loadingRender() {

  }

  render(){
    // render loop 
    console.log('render frame')
    requestAnimationFrame(this.renderPointer);
  }
}