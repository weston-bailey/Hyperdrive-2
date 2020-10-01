import { Util, Background } from '../modules.js'

export default function openSpace(game){
  const levelArgs = {
    game: game,
    title: 'Open Space', // level title
    levelOffset: game.currentLevel, // offset for hardness calc
    subLevels: Util.randomIntInRange(2, 4), // how many sublevels before a new level
  
    // menu: Object, // menu to display at level start
    wavemachine: null, // a wavemachine object
    backgroundColor: `rgba(0, 0, 0, 1)`, // color to render bg
    backgroundLayers: [ 
      // distant stars
      {
        args: {
          game: game,
          speed: () => { return game.units.height + Math.random() },
          x: () => { return Util.randomIntInRange(0, game.width) },
          y: () => { return Util.randomIntInRange(game.units.spawn1X, game.units.spawn2X) },
          color: `rgba(255, 255, 255, .15)`,
          radius: 1,
        }, 
        class: Background.Star, // refernce to class to render later
        amount: 75 // number of objects to render on game layer
      },
      // closer stars
      {
        args: {
          game: game,
          speed: () => { return (game.units.height * 3) - Math.random() },
          x: () => { return Util.randomIntInRange(0, game.width) },
          y: () => { return Util.randomIntInRange(game.units.spawn1X, game.units.spawn2X) },
          color: `rgba(255, 255, 255, .3)`,
          radius: 1,
        }, 
        class: Background.Star, // refernce to class to render later
        amount: 75 // number of objects to render on game layer
      },
      // planets
      {
        args: {
          game: game,
          speed: () => { return game.units.height + Math.random() },
          x: () => { return Util.randomIntInRange(0, game.width) },
          y: () => { return Util.randomIntInRange(game.units.spawn1X, game.units.spawn2X) },
          color: () => { return  Util.hexToRGBA(Util.randomColorHex(), Math.random()) },
          radius: () => { return Math.random() * 3 },
        }, 
        class: Background.Planet, // refernce to class to render  later
        amount: 3 // number of objects to render on game layer
      }
    ],
  }
  return levelArgs;
}