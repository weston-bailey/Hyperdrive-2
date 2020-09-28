// import { Background } from '../modules.js';

/*
let levelArgs = {
  game: this, // refrence to the game object
  title: String, // level title
  levelOffset: Number, // offset for hardness calc
  subLevels: Number, // how many sublevels before a new level

  menu: Object, // menu to display at level start
  wavemachine: Object, // a wavemachine object
  backgroundColor: String, // color to render bg
  backgroundLayers: [ 
      {
        args: Object, // args to supply the object's export default class refernce for this layer
        object: Object, // refernce to export default class to render on this later
        amount: Number // number of objects to render on this layer
      }
    ],
  }
*/
export default class Level{
  constructor(levelArgs){
    this.game = levelArgs.game;
    this.title = levelArgs.title; 
    this.levelOffset = levelArgs.levelOffset;
    this.subLevels = levelArgs.subLevels;
    this.currentSubLevel = 0;
    this.menu = levelArgs.menu;
    this.wavemachine = levelArgs.wavemachine;
    this.backgroundColor = levelArgs.backgroundLayers;
    this.backgroundLayers = levelArgs.backgroundLayers;
    this.init()
  }

  init(){
    // console.log(typeof this.backgroundLayers[0].args.speed)
    // clear the background array
    this.game.background = [];
    // iterate to create layers
    for(let i = 0; i < this.backgroundLayers.length; i++){
      this.game.background.push([]);
      // the class we are about to invoke
      let backgroundObject = this.backgroundLayers[i].class;
      for(let j = 0; j < this.backgroundLayers[i].amount; j++){
        // let classArgs = {}
        // for (let arg in this.backgroundLayers[i].args) {
        //   // console.log(typeof arg === 'function' ? this.backgroundLayers.args[arg]() : this.backgroundLayers.args[arg])
        //   console.log(typeof arg === 'function')
        // }
        // console.log(classArgs);
        // make a new object and push it to the array
        this.game.background[i].push(new backgroundObject(this.backgroundLayers[i].args))
      }
    }
    console.log(this.game.background)
  }
}