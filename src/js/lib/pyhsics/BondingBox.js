import Component from "../GameEngine/Component";

export default class BoundingBox {
  constructor() {
    super()
  }

  init() {

  }

  static detect(bodyOne, bodyTwo) {
    if (
      bodyOne.x < bodyTwo.x + bodyTwo.width && 
      bodyOne.x + bodyOne.width > bodyTwo.x && 
      bodyOne.y < bodyTwo.y + bodyTwo.height && 
      bodyOne.y + bodyOne.height > bodyTwo.y
    ) {
      return true
    }

    return false

  }

  static respond() {

  }
}