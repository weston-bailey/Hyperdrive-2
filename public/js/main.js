import { Engine } from './lib/modules.js'

const LOAD_PAGE = document.addEventListener('DOMContentLoaded', init());

function init() {
  let side = window.innerWidth < window.innerHeight ? window.innerWidth - 10 : window.innerHeight - 10;
  let gameArgs = {
    divId: 'canvas-container', // html canvas element id
    height: side,       // cnvas height in pixels
    width: side,        // canvas width in pixels
    currentLevel: 0          // level to start at
  }
  new Engine(gameArgs);
}