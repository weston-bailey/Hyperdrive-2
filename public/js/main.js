import { Game } from './lib/modules.js';

document.addEventListener('DOMContentLoaded', init());

function init() {
  let gameArgs = {
    canvasId: 'game-canvas', // html canvas element id
    canvasHeight: 800,       // cnvas height in pixels
    canvasWidth: 800,        // canvas width in pixels
    currentLevel: 0          //level to start at
  }
  new Game(gameArgs);
}