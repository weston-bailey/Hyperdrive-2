import Component from "./Component.js" 
import { Util } from '../modules.js' 
/*
const wavemachineArgs = {
  game: this,
  waveFunctions: // array of wave functions to spawn enemies
  waveActive: // boolean if wave is active (optional, defaults to true)
  waveMax: // maximum numbuer of waves for this level (optional, defaults to 8 - 12) 
}
*/

// creates waves for each level
export default class Wavemachine extends Component {
  constructor({ game, waveFucntions, waveMax, waveActive}) {
    super() 
    this.game = game 
    this.waveActive = waveActive || true
    this.waveFunctions = waveFucntions  
    this.waveCount = 0 
    this.waveMax = waveMax || Util.randomIntInRange(8, 12) 
  }

  update() {
    // wavemachine's services not needed if a wave is presently active
    if(this.waveActive) return

    let waveIndex = Util.randomIntInRange(0, this.waveFunctions.length)
    waveIndex = Util.clamp(waveIndex, 0, this.waveFunctions.length) // may not need
    let waveFunction = this.waveFunctions[waveIndex]
    if(typeof waveFunction != `function`) { // may not need
      console.warn(`wavemachine needs a function and found ${this.waveFunctions[waveIndex]} at index ${waveIndex} wavemachine retuning early`) 
      return 
    }

    // generate new wave
    waveFunction(this.game) 
    this.waveActive = true
    if(this.game.gameActive) {
      this.waveCount++
      this.game.score.totalWaves++
    }
  }

  // getter and setters
  getWaveActive = () => this.waveActive
  setWaveActive = bool => {
    this.waveActive = bool
    return this.getWaveActive()
  }
}