// import Component from '../GameEngine/Component.js'
import openSpace from '../Levels/openSpace.js' 
import { GameEngine, Util } from '../modules.js' 
import Ship from '../player/Ship.js' 
import GamepadInput from './GamepadInput.js' 
import KeyboardInput from './KeyboardInput.js' 
import CircleCircleCollision from '../pyhsics/CircleCircleCollision.js'

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
    // for the game canvases
    this.bgCanvas = Util.createDOMElement('canvas', gameArgs.divId, 'bg-canvas', 'engine-canvas') 
    this.gameCanvas = Util.createDOMElement('canvas', gameArgs.divId, 'game-canvas', 'engine-canvas') 
    this.uiCanvas = Util.createDOMElement('canvas', gameArgs.divId, 'ui-canvas', 'engine-canvas') 
    this.bgCtx = null 
    this.gameCtx = null 
    this.uiCtx = null 

    // w/h in pixels of render area
    this.height = gameArgs.height 
    this.width = gameArgs.width 

    // relative measurement units
    this.units = {
      width: null,
      height: null,
      spawn1X: null,
      spawn2X: null,
      spawn3X: null,
    } 

    // game state
    this.renderPointer = null  
    this.gameActive = false 
    this.inputDevices = [] 
    this.gamepadConnected = null 
    this.gamepadDisconnected = null 
    this.background = [] 
    this.player = [] 
    this.enemies =  [] 
    this.particles = [] 
    this.ui = {} 
    this.currentLevel = gameArgs.currentLevel 
    this.levels = [] 
    this.garbage = [] 

    // for menus and score tracking
    this.score = {
      totalWaves: 0,
      distance: 0,
      collisionsAvoided: 0,
      enemiesDestroyed: 0,
    }
    this.init() 
  }

  init() {
    // setup canvases
    this.bgCtx = this.bgCanvas.getContext('2d') 
    this.bgCanvas.width = this.width 
    this.bgCanvas.height = this.height 
    this.gameCtx = this.gameCanvas.getContext('2d') 
    this.gameCanvas.width = this.width 
    this.gameCanvas.height = this.height 
    this.uiCtx = this.uiCanvas.getContext('2d') 
    this.uiCanvas.width = this.width 
    this.uiCanvas.height = this.height 

    // make game measurement units
    this.units.height = this.height / 800
    this.units.width = this.width / 800
    this.units.spawn1X = 0 - this.height 
    this.units.spawn2X = 0 - this.height * 2 
    this.units.spawn3X = 0 - this.height * 3 

    // device pixel ratio for high res screens TODO
    // let dpr = window.devicePixelRatio || 1 
    // this.gameCtx.scale(dpr, dpr) 

    //  make levels
    this.levels.push(new GameEngine.Level(openSpace(this))) 

    // fire 'er up
    this.renderPointer = () => this.playRender() 
    this.renderPointer() 

    // check if fonts are loaded

    // make game objects
    const shipArgs = {
      game: this, // a reference to to current game
      noseX: () => { return this.width * .5 }, // starting nose x pos
      noseY: () => { return this.height * .5 }, // starting nose y pos
      color:  `#faebd7` // `antiquewhite` the champagne of whites
    }
    this.player.push(new Ship(shipArgs)) 
    // instantiate controls
    const keyboardInputArgs = {
      game: this,
      player: 0,
    }

    // init user input
    this.inputDevices.push(new KeyboardInput(keyboardInputArgs)) 
    this.gamepadConnected = window.addEventListener("gamepadconnected", (e) => {
      const gamepadInputArgs = {
        game: this,
        playerNumber: 0,
        // gamepadObject: 
      }
      this.inputDevices.push(new GamepadInput(gamepadInputArgs)) 
      // console.log(
      //     "Gamepad connected at index %d: %s. %d buttons, %d axes.",
      //     e.gamepad.index, e.gamepad.id,
      //     e.gamepad.buttons.length, 
      //     e.gamepad.axes.length
      //   ) 
    }) 

    this.gamepadDisconnected = window.addEventListener("gamepaddisconnected", (e) => {
      this.inputDevices.splice(e.gamepad.index + 1, 1) 
      console.log(
          "Gamepad disconnected at index %d: %s. %d buttons, %d axes.",
          e.gamepad.index, e.gamepad.id,
          e.gamepad.buttons.length, 
          e.gamepad.axes.length
        ) 
    }) 

    // display loading complete menu

  }

  loadingRender() {

  }

  // search for objects self flagged as garbage
  collectGarbage(garbage) {
    for(let i = 0;  i < garbage.length;  i++) {
      for(let j = 0;  j < garbage[i].length;  j ++) {
        if (garbage[i][j].isGarbage) garbage[i].splice(j, 1) 
      }
    }
  }

  // main render loop 
  playRender() {
    // reset player movement 
    for(let i = 0;  i < this.player.length;  i++) {
      this.player[i].resetMovement() 
    }
    // poll inputs to upodate state
    for(let i = 0;  i < this.inputDevices.length;  i++) {
      this.inputDevices[i].poll()
    }

    // update and draw background
    this.bgCtx.clearRect(0, 0, this.width, this.height) 
    this.bgCtx.fillStyle = this.levels[0].backgroundColor  
    this.bgCtx.fillRect(0, 0, this.width, this.height) 
    for(let i = 0;  i < this.background.length;  i++) {
      // console.log(i, this.background[i][0]) 
      for(let j = 0;  j < this.background[i].length;  j++) {
        this.background[i][j].update() 
        this.background[i][j].draw() 
      }
    }

    // update and draw game canvas  
    this.gameCtx.clearRect(0, 0, this.width, this.height) 
    // draw player objects
    for(let i = 0;  i < this.player.length;  i++) {
      this.player[i].update() 
      this.player[i].draw() 
    }

    // draw enemy objects
    for(let i = 0; i < this.enemies.length;  i++) {
      this.enemies[i].update() 
      this.enemies[i].draw() 
    }
    // console.log(this.enemies.length)

    // draw particle objects
    for(let i = 0; i < this.particles.length;  i++) {
      this.particles[i].update() 
      this.particles[i].draw() 
    }

    // check if ui/HUD needs to update

    // check for collisions
    for(let i = 0; i < this.enemies.length; i++) {

      const collisionArgs = {
        radius1: 15, 
        x1: this.player[0].noseX,
        y1: this.player[0].noseY,
        radius2: this.enemies[i].radius,
        x2: this.enemies[i].x,
        y2: this.enemies[i].y,
      }

      if(CircleCircleCollision.detect(collisionArgs)) {
        this.enemies[i].collide()
      } else {
        this.enemies[i].resetCollide()
      }
    }

    // find objects marked as garbage
    this.collectGarbage([...this.background]) 
    // get rid of empty arrays
    for(let i = 0;  i < this.background.length;  i++) {
      if(this.background[i].length === 0) this.background.splice(i, 1) 
    }
    this.collectGarbage([this.player, this.enemies, this.particles]) 

    // update wavemachine
    const wavemachine = this.levels[this.currentLevel].wavemachine
    if(wavemachine.getWaveActive()) {
      if(this.enemies.length === 0) wavemachine.setWaveActive(false)
      wavemachine.update()
    }

    // update HUD
    
    requestAnimationFrame(this.renderPointer) 
  }

  pauseRender() {
    // draw background
    this.gameCtx.clearRect(0, 0, this.width, this.height) 
    this.gameCtx.fillStyle = this.levels[0].backgroundColor 
    this.gameCtx.fillRect(0, 0, this.width, this.height) 
    for(let i = 0;  i < this.background.length;  i++) {
      for(let j = 0;  j < this.background[i].length;  j++) {
        this.background[i][j].draw() 
      }
    }

  requestAnimationFrame(this.renderPointer) 
  }

  // setter and getter methods
  addEnemy = enemy => this.enemies.push(enemy)
}