// import Component from '../GameEngine/Component.js'
import { GameEngine, Background, Util } from '../modules.js';

/*
engineArgs = {
  canvasId: // html canvas element id
  canvasHeight: // cnvas height in pixels
  canvasWidth: // canvas width in pixels
  currentLevel: // level to start at
}
*/
export default class Engine {
  constructor(gameArgs) {
    // for the game canvas
    this.canvas = document.getElementById(gameArgs.canvasId);
    this.canvasHeight = gameArgs.canvasHeight;
    this.canvasWidth = gameArgs.canvasWidth;
    this.units = {};
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
    // make game measurement units
    this.units.unit = this.canvasHeight / 800;
    this.units.spawn1X = 0 - this.canvasHeight;
    this.units.spawn2X = 0 - this.canvasHeight * 2;
    this.units.spawn3X = 0 - this.canvasHeight * 3;
    // device pixel ratio for high res screens
    let dpr = window.devicePixelRatio || 1;
    this.ctx.scale(dpr, dpr);
    //  make levels
    function openSpace(game){
      const levelArgs = {
        game: game,
        title: 'Open Space', // level title
        levelOffset: game.currentLevel, // offset for hardness calc
        subLevels: Util.randomIntInRange(2, 4), // how many sublevels before a new level
      
        // menu: Object, // menu to display at level start
        wavemachine: null, // a wavemachine object
        backgroundColor: `rgba(0, 0, 0, 1)`, // color to render bg
        backgroundLayers: [ 
          // distant stars
          {
            args: {
              game: game,
              speed: () => { return game.units.unit + Math.random() },
              x: () => { return Util.randomIntInRange(0, game.canvasWidth) },
              y: () => { return Util.randomIntInRange(game.units.spawn1X, game.units.spawn2X) },
              color: `rgba(255, 255, 255, .15)`,
              radius: 1,
            }, 
            class: Background.Star, // refernce to class to render on later
            amount: 75 // number of objects to render on game layer
          },
          // closer stars
          {
            args: {
              game: game,
              speed: () => { return (game.units.unit * 3) - Math.random() },
              x: () => { return Util.randomIntInRange(0, game.canvasWidth) },
              y: () => { return Util.randomIntInRange(game.units.spawn1X, game.units.spawn2X) },
              color: `rgba(255, 255, 255, .3)`,
              radius: 1,
            }, 
            class: Background.Star, // refernce to class to render on  later
            amount: 75 // number of objects to render on game layer
          },
          // planets
          {
            args: {
              game: game,
              speed: () => { return game.units.unit + Math.random() },
              x: () => { return Util.randomIntInRange(0, game.canvasWidth) },
              y: () => { return Util.randomIntInRange(game.units.spawn1X, game.units.spawn2X) },
              color: () => { return  Util.hexToRGBA(Util.randomColorHex(), Math.random()) },
              radius: () => { return Math.random() * 3 },
            }, 
            class: Background.Planet, // refernce to class to render on game later
            amount: 3 // number of objects to render on game layer
          }
        ],
      }
      return levelArgs;
    }

    this.levels.push(new GameEngine.Level(openSpace(this)));
    // make background
    this.renderPointer = () => this.render();
    this.render();
  }

  loadingRender() {

  }

  // render loop 
  render(){
    // update and draw background
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillStyle = this.levels[0].backgroundColor // not working
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    for(let i = 0; i < this.background.length; i++){
      for(let j = 0; j < this.background[i].length; j++){
        this.background[i][j].update();
        this.background[i][j].draw();
      }
    }

    // collect garbage
    for(let i = 0; i < this.background.length; i++){
      // get rid of empty arrays
      if(this.background[i].length === 0) this.background.splice(i, 1);
      for(let j = 0; j < this.background[i].length; j++){
        // remove flagged garbage
        if(this.background[i][j].isGarbage) this.background[i][j].splice(j, 1);
      }
    }

    requestAnimationFrame(this.renderPointer);
  }

  pauseRender() {
    // draw background
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillStyle = 'black';
    // this.ctx.fillStyle = this.levels[0].backgroundColor.length // not working
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    for(let i = 0; i < this.background.length; i++){
      for(let j = 0; j < this.background[i].length; j++){
        this.background[i][j].draw();
      }
    }

    requestAnimationFrame(this.renderPointer);
  }
}