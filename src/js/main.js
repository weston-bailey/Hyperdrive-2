import css from '../css/styles.css'
import { Engine } from './lib/modules.js'

document.addEventListener('DOMContentLoaded', () => {
    // find the smaller side and use that
    const side = window.innerWidth < window.innerHeight ? window.innerWidth - 10 : window.innerHeight - 10 
    const gameArgs = {
      // html canvas element id
      divId: 'canvas-container',
      // cnvas height in pixels
      height: side,       
      width: side,
      // level to start at
      currentLevel: 0         
    }
  
    new Engine(gameArgs) 
})