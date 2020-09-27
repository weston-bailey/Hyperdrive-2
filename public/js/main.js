import { Engine } from './lib/modules.js';

document.addEventListener('DOMContentLoaded', init())

function init() {
  let derp = new Engine.Game;
  derp.log()
  console.log('Hello Front End')
}