export default class Util {
  static TWO_PI = 2 * Math.PI 

  // create an html element, append it to a parent element and assign it an id
  static createDOMElement(element, parentElementId, elementId, elementClass){
    let newElement = document.createElement(element) 
    if(elementId) newElement.id = elementId 
    if(elementClass) newElement.classList.add(elementClass)
    document.body.appendChild(newElement) 
    document.getElementById(parentElementId).appendChild(newElement) 
    // console.log(`new element created: ${document.getElementById(elementId)}`) 
    return newElement 
  }

  static randomColorHex(){
    return `#${Math.floor(Math.random()*16777215).toString(16)}` 
  }

  // convert color hex to rgb with a predefined alpha(optional)
  static hexToRGBA(hex, alpha) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16),
        a = alpha || 1. 
        return `rgba(${r}, ${g}, ${b}, ${a})` 
  }

  // convert color hex to rgb values rturned as an array
  // used mainly to convert enemy colors from hexes to a format
  // that debris can use to modify the alpha of
  static hexToRGBArray(hex) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16) 
        return [r, g, b] 
  }

  // convert degres to radians with supplied angle
  static degreesToRadians(angle){
    return (angle / Math.PI) * 180 
  }

  // round a number to decimal places
  static round(num, places){
    places = Math.pow(10, places)
    return Math.round(num * places) / places 
  }

  // returns a random float in a range
  static randomInRange(minimum, maximum){
    return Math.random() * (maximum - minimum) + minimum 
  }

  // returns random integer in given range
  static randomIntInRange(minimum, maximum) {
    minimum = Math.ceil(minimum) 
    maximum = Math.floor(maximum) 
    return Math.floor(Math.random() * (maximum - minimum) + minimum)  
  }

  // makes a randoom number between a range that is either positive or negetive with probability (float 0 - 1) influencing the sign chance (optional)
  static randomSignInRange(minimum, maximum, probability){
    let prob = probability || .5 
    let randomNum = Math.random() * (maximum - minimum) + minimum 
    return Math.random() > prob ? randomNum : randomNum * -1 
  }

  // good old clamp 
  static clamp(x, min, max){
    return (x > max ? max :
            x < min ? min :
            x)
  }
}
