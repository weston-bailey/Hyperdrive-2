# Hyperdrive v2

deployment at heroku: [HYPERDRIVE](https://hyperdrivegame.herokuapp.com)

    [] Game Engine
      [] class Engine.Game 
        [] init method
          [] setup canvas
          [] render loading screen
          [] render background
          [] make game objects
          [] instantiate controls
          [] instantiate sound
          [] check if fonts a loaded
          [] render click-thru to start game
        [] render method
          [] poll inputs
          [] clear canvas
          [] draw background
          [] draw ship
          [] draw enemies
          [] draw exhaust
          [] draw debris
          [] draw HUD
          [] check for collisions
          [] check for object self destruction
          [] collect objects marked as garbage
          [] update wave machine
          [] update HUD
          [] request animation frame
      [] class Engine.Wavemachine
      [] class Engine.Level
      [] class Engine.UserInterface (for HUD)
      [] class Engine.Audio
      [] class Engine.Input
      
    [] class Player.Ship
    [] class Background.Star
    [] class Background.Box
    [] class Enemy.Polygon
    [] functions waves
    [] function utilities

