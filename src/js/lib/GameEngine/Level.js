import Component from '../GameEngine/Component.js'

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
export default class Level extends Component {
  constructor(levelArgs){
    super() 
    this.game = levelArgs.game 
    this.title = levelArgs.title  
    this.levelOffset = levelArgs.levelOffset 
    this.subLevels = levelArgs.subLevels 
    this.currentSubLevel = 0 
    this.menu = levelArgs.menu 
    this.wavemachine = levelArgs.wavemachine 
    this.backgroundColor = levelArgs.backgroundColor  
    this.backgroundLayers = levelArgs.backgroundLayers 
    this.init()
  }

  init(){
    // mark everything in background array as garbage
    for(let i = 0;  i < this.game.background.length;  i++){
      for(let j = 0;  j < this.background[i].length;  j++){
        this.game.background[i][j].updatePointer = this.game.background[i][j].garbage() 
      }
    }
    // iterate to create layers
    for(let i = 0;  i < this.backgroundLayers.length;  i++){
      this.game.background.push([]) 
      // the class we are about to invoke
      let backgroundObject = this.backgroundLayers[i].class 
      for(let j = 0;  j < this.backgroundLayers[i].amount;  j++){
        // make a new object and push it to the array
        this.game.background[i].push(new backgroundObject(this.backgroundLayers[i].args))
      }
    }
  }
}