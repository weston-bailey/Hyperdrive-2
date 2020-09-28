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
      game: this,
      title: 'Loading Screen', // level title
      // levelOffset: Number, // offset for hardness calc
      // subLevels: Number, // how many sublevels before a new level
    
      // menu: Object, // menu to display at level start
      // wavemachine: Object, // a wavemachine object
      backgroundColor: `rgba(0, 0, 0, 1)`, // color to render bg
      backgroundLayers: [ 
        // // distant stars
        {
          args: {
            game: this,
            speed: () => { return 1 + Math.random() },
            x: () => { return Math.random() * this.canvasWidth },
            y: () => { return Math.random() * this.canvasHeight },
            color: `rgba(255, 255, 255, .15)`,
            radius: 1,
          }, 
          class: Background.Star, // refernce to class to render on this later
          amount: 75 // number of objects to render on this layer
        },
        // closer stars
        {
          args: {
            game: this,
            speed: () => { return 3 - Math.random() },
            x: () => { return Math.random() * this.canvasWidth },
            y: () => { return Math.random() * this.canvasHeight },
            color: `rgba(255, 255, 255, .3)`,
            radius: 1,
          }, 
          class: Background.Star, // refernce to class to render on this later
          amount: 75 // number of objects to render on this layer
        },
        // planets
        {
          args: {
            game: this,
            speed: () => { return 1 + Math.random() },
            x: () => { return Math.random() * this.canvasWidth },
            y: () => { return Math.random() * this.canvasHeight },
            color: () => { return  Util.hexToRGBA(Util.randomColorHex(), Math.random()) },
            radius: () => { return Math.random() * 3 },
          }, 
          class: Background.Planet, // refernce to class to render on this later
          amount: 3 // number of objects to render on this layer
        }
      ],
    }
    // console.log(typeof levelArgs.backgroundLayers[0].args.y)
    this.levels.push(new GameEngine.Level(levelArgs));
    // make background
    this.renderPointer = () => this.render();
    this.render();
  }

  loadingRender() {

  }

  // render loop 
  render(){
    // draw background
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillStyle = 'black';
    // this.ctx.fillStyle = this.levels[0].backgroundColor.length // not working
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    for(let i = 0; i < this.background.length; i++){
      for(let j = 0; j < this.background[i].length; j++){
        this.background[i][j].update();
        this.background[i][j].draw();
      }
    }

    console.log('render frame')
    requestAnimationFrame(this.renderPointer);
  }
}