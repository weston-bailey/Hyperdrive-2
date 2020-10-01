// import Component from '../GameEngine/Component.js'
import openSpace from '../Levels/openSpace.js';
import { GameEngine, Background, Util } from '../modules.js';

/*
engineArgs = {
  divId: // div element id to put canvases in
  height: // height of gameplay area in pixels
  width: //  width in pixels
  currentLevel: // level to start at
}
*/
export default class Engine {
  constructor(gameArgs) {
    // for the game canvas
    this.bgCanvas = Util.createDOMElement('canvas', gameArgs.divId, 'bg-canvas', 'engine-canvas');
    this.gameCanvas = Util.createDOMElement('canvas', gameArgs.divId, 'game-canvas', 'engine-canvas');
    this.uiCanvas = Util.createDOMElement('canvas', gameArgs.divId, 'ui-canvas', 'engine-canvas');
    this.bgCtx = null;
    this.gameCtx = null;
    this.uiCtx = null;
    // relative measurement unts
    this.height = gameArgs.height;
    this.width = gameArgs.width;
    this.units = {};
    // game state
    this.renderPointer = null; 
    this.ship = null;
    this.levels = [];
    this.currentLevel = gameArgs.currentLevel;
    this.background = [];
    this.init();
  }

  init() {
    // setup canvases
    this.bgCtx = this.bgCanvas.getContext('2d');
    this.bgCanvas.width = this.width;
    this.bgCanvas.height = this.height;
    this.gameCtx = this.gameCanvas.getContext('2d');
    this.gameCanvas.width = this.width;
    this.gameCanvas.height = this.height;
    this.uiCtx = this.uiCanvas.getContext('2d');
    this.uiCanvas.width = this.width;
    this.uiCanvas.height = this.height;
    // make game measurement units
    this.units.height = this.height / 800;
    this.units.width = this.width / 800;
    this.units.spawn1X = 0 - this.height;
    this.units.spawn2X = 0 - this.height * 2;
    this.units.spawn3X = 0 - this.height * 3;
    // device pixel ratio for high res screens
    let dpr = window.devicePixelRatio || 1;
    this.gameCtx.scale(dpr, dpr);
    //  make levels
    this.levels.push(new GameEngine.Level(openSpace(this)));
    // make background
    this.renderPointer = () => this.playRender();
    this.renderPointer();
    // make game objects
    // instantiate controls
    // check if fonts are loaded
    // 

  }

  loadingRender() {

  }

  // render loop 
  playRender(){
    // update and draw background
    this.bgCtx.clearRect(0, 0, this.width, this.height);
    this.bgCtx.fillStyle = this.levels[0].backgroundColor; 
    this.bgCtx.fillRect(0, 0, this.width, this.height);
    for(let i = 0; i < this.background.length; i++){
      // console.log(i, this.background[i][0]);
      for(let j = 0; j < this.background[i].length; j++){
        this.background[i][j].update();
        this.background[i][j].draw();
      }
    }
    // update and draw game canvas  
    this.gameCtx.clearRect(0, 0, this.width, this.height);
    // draw player objects

    // draw enemy objects

    // draw particle objects

    // check if ui/HUD needs to update

    // collect garbage
    for(let i = 0; i < this.background.length; i++){
      // get rid of empty arrays
      if(this.background[i].length === 0) this.background.splice(i, 1);
      for(let j = 0; j < this.background[i].length; j++){
        // remove flagged garbage
        if(this.background[i][j].isGarbage) this.background[i][j].splice(j, 1);
      }
    }
    // update wave machine

    // update HUD
    
    requestAnimationFrame(this.renderPointer);
  }

  pauseRender() {
    // draw background
    this.gameCtx.clearRect(0, 0, this.width, this.height);
    this.gameCtx.fillStyle = this.levels[0].backgroundColor;
    this.gameCtx.fillRect(0, 0, this.width, this.height);
    for(let i = 0; i < this.background.length; i++){
      for(let j = 0; j < this.background[i].length; j++){
        this.background[i][j].draw();
      }
    }

    requestAnimationFrame(this.renderPointer);
  }
}