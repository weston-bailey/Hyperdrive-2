// game engine
import Engine from './GameEngine/Engine.js';
import Audio from './GameEngine/Audio.js';
import Input from './GameEngine/Controllers.js';
import Level from './GameEngine/Level.js';
import KeyboardInput from './GameEngine/KeyboardInput.js';
import Wavemachine from './GameEngine/Wavemachine.js';
// backgrounds
import Box from './background/Box.js';
import Planet from './background/Planet.js';
import Star from './background/Star.js';
// enemies
import Polygon from './enemy/Polygon.js'
// non player/enemy objects
import Debris from './Particles/Debris.js'
import Exhaust from './Particles/Exhaust.js'
// player objects
import Ship from './player/Ship.js'
// utility functions 
import Util from './util/Util.js'
// import waves in the future

// namespaces
const GameEngine = {
  Audio,
  Input,
  Level,
  KeyboardInput,
  Wavemachine
}

const Background = {
  Box,
  Planet,
  Star,
}

const Enemy = {
  Polygon,
}

const Particle = {
  Debris,
  Exhaust
}

const Player = {
  Ship
}

export {
  Engine,
  Particle,
  GameEngine,
  Background,
  Enemy,
  Player,
  Util
}