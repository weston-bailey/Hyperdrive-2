import { Engine } from './lib/modules.js'

const LOAD_PAGE = document.addEventListener('DOMContentLoaded', init());

function init() {
  let side = window.innerWidth < window.innerHeight ? window.innerWidth - 10 : window.innerHeight - 10;
  let gameArgs = {
    canvasId: 'game-canvas', // html canvas element id
    canvasHeight: side,       // cnvas height in pixels
    canvasWidth: side,        // canvas width in pixels
    currentLevel: 0          // level to start at
  }
  new Engine(gameArgs);
}