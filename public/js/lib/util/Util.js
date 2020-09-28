// various useful constants and functions
const Util = {
  // constants
  TWO_PI: 2 * Math.PI,
  //make random color hex
  randomColorHex:() => {
    let hex = `#${Math.floor(Math.random()*16777215).toString(16)}`
    //console.log(hex);
    return hex;
  },
  //convert color hex to rgb with a predefined alpha(optional)
  hexToRGBA: (hex, alpha) => {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16),
        a = alpha || 1.;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
  },
  //convert color hex to rgb values returned as an array
  //used mainly to convert enemy colors from hexes to a format
  //that debris can use to modify the alpha of
  hexToRGBArray: (hex) => {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
  },

}

export default Util;