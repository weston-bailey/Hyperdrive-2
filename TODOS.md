# Hyperdrive v2

deployment at heroku: [HYPERDRIVE](https://hyperdrivegame.herokuapp.com)

    [] Game Engine
      [] export default class Engine.Game 
        [] init method
          [x] setup canvases
          [x] render loading screen
          [x] render background
          [] make game objects
          [] instantiate controls
          [] instantiate sound
          [] check if fonts a loaded
          [] render click-thru to start game
        [] render method
          [] poll inputs
          [x] clear bg canvas
          [x] draw background
          [x] clear game canvas
          [] draw ship
          [] draw enemies
          [] draw exhaust
          [] draw debris
          [] draw HUD
          [] check for collisions
          [] check for object self destruction
          [x] collect objects marked as garbage
          [] update wave machine
          [] update HUD
          [] request animation frame
      [] export default class Engine.Wavemachine
      [] export default class Engine.Level
      [] export default class Engine.UserInterface (for HUD)
      [] export default class Engine.Audio
      [] export default class Engine.Input
      
    [] export default class Player.Ship
    [] export default class Background.Star
    [] export default class Background.Box
    [] export default class Enemy.Polygon
    [] functions waves
    [] function utilities
