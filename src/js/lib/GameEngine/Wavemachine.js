import Component from "./Component.js" 
import { Util } from '../modules.js' 
/*
const wavemachineArgs = {
  game: this,
  waveFunctions: // array of wave functions to spawn enemies
  waveMax: // maximum numbuer of waves for this level (optional, defaults to 8 - 12) 
}
*/
// creates waves for each level
export default class Wavemachine extends Component{
  constructor(wavemachineArgs){
    super() 
    this.game = wavemachineArgs.game 
    this.waveActive = false 
    this.waveFunctions = wavemachineArgs.enemyTypes  
    this.waveCount = 0 
    this.waveMax = wavemachineArgs.waveMax || Util.randomIntInRange(8, 12) 
  }

  update(){
    // wavemachine's services not needed if a wave is presently active
    if(this.waveActive) return

    let waveIndex = Util.randomIntInRange(0, this.waveFunctions.length)
    waveIndex = Util.clamp(waveIndex, 0, this.waveFunctions.length) // may not need
    let waveFunction = this.waveFunctions[waveIndex]
    if(typeof waveFunction != `function`){ // may nod need
      console.warn(`wavemachine needs a function and found ${this.waveFunctions[waveIndex]} at index ${waveIndex} wavemachine retuning early`) 
      return 
    }
    // generate new wave
    waveFunction() 
    this.waveActive = true
    if(this.game.gameActive){
      this.waveCount++
      this.game.score.totalWaves++
    }
  }
}