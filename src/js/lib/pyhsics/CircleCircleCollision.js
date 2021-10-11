import Component from "../GameEngine/Component";

export default class CircleCircleCollision extends Component {
  constructor({ }) { }

  init() { }

  // find the differences between the x and y values, square them, sum them
  // and if the square root of the sum is less than the sum of the two radii
  // then the circles overlap √((x1 + x2)^2 + (y1 + y2)^2)
  static detect({ radius1, x1, y1, radius2, x2, y2 }) {
    const radiiSum = radius1 + radius2
    let xDifference = x1 - x2
    let yDifference = y1 - y2
    xDifference *= xDifference
    yDifference *= yDifference
    if(radiiSum > Math.sqrt(xDifference + yDifference)) return true
    return false
  }

  static respond() {
    // https://ericleong.me/research/circle-circle/#static-circle-circle-collision-detection
  }


}