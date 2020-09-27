// game engine
import Game from './engine/Game.js';
import Audio from './engine/Audio.js';
import Input from './engine/Input.js';
import Level from './engine/Level.js';
import UserInterface from './engine/UserInterface.js';
import Wavemachine from './engine/Wavemachine.js';
// backgrounds
import Box from './background/Box.js'
import Star from './background/Star.js'
// enemies
import Polygon from './enemy/Polygon.js'
// non player/enemy objects
import Debris from './particle/Debris.js'
import Exhaust from './particle/Exhaust.js'
// player objects
import Ship from './player/Ship.js'
// utility functions 
import Util from './util/Util.js'
// import waves in the future

// namespaces
const Engine = {
  Audio,
  Input,
  Level,
  UserInterface,
  Wavemachine
}

const Background = {
  Box,
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
  Game,
  Engine,
  Background,
  Enemy,
  Player,
  Util
}