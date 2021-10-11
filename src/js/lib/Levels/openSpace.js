import { Util, Background } from '../modules.js'
import { GameEngine } from '../modules.js'
import Circle from '../enemy/Circle.js'

//a bunch of circles to maving around randomly
const circleWave = function(game){
  const circleArgs = {
    x: () => Util.randomInRange(0, game.width),
    y: () => Util.randomInRange(game.units.spawn1X, game.units.spawn2X),
    speedX: () => Util.randomSignInRange(1, 5),
    speedY: () => Util.randomInRange(1, 5),
    radius: () => 15 + (Math.random() * 50),
    color: '#FFFFFF',
    game: game
  }
  for(let i = 0; i < 50; i++){

    game.addEnemy(new Circle(circleArgs))                                              //color white
  }  
}

export default function openSpace(game) {


  const wavemachine = new GameEngine.Wavemachine({
    game, 
    waveFucntions: [circleWave]
  })

  const levelArgs = {
    game,
    wavemachine,
    title: 'Open Space', // level title
    levelOffset: game.currentLevel, // offset for hardness calc
    subLevels: Util.randomIntInRange(2, 4), // how many sublevels before a new level
  
    // menu: Object, // menu to display at level start
    backgroundColor: `rgba(0, 0, 0, 1)`, // color to render bg
    backgroundLayers: [ 
      // distant stars
      {
        args: {
          game: game,
          speed: () => game.units.height + Math.random(),
          x: () => Util.randomIntInRange(0, game.width),
          y: () => Util.randomIntInRange(game.units.spawn1X, game.units.spawn2X),
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
          speed: () => (game.units.height * 3) - Math.random(),
          x: () => Util.randomIntInRange(0, game.width),
          y: () => Util.randomIntInRange(game.units.spawn1X, game.units.spawn2X),
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
          speed: () => game.units.height + Math.random(),
          x: () => Util.randomIntInRange(0, game.width),
          y: () => Util.randomIntInRange(game.units.spawn1X, game.units.spawn2X),
          color: () =>  Util.hexToRGBA(Util.randomColorHex(), Math.random()),
          radius: () => Math.random() * 3,
        }, 
        class: Background.Planet, // refernce to class to render  later
        amount: 3 // number of objects to render on game layer
      }
    ],
  }

  return levelArgs 
}