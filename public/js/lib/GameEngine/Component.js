export default class Component {
  constructor(){
    this.returnFunctionProps()
  }

  toString() {
    return `[object EngineComponent]`
  }
  // check if any arguments are functions, and call them
  returnFunctionProps(){
    for(let prop in this){
      if(typeof this[prop] === 'function') this[prop] = this[prop]();
    }
  }
}