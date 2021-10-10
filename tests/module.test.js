const chai = require('chai')
const assert = chai.assert
const expect = chai.expect
const { hello } = require('../src/scripts/module')

describe('hello world module', () => {
  const helloWorld = hello()

  it('should return a string', () => {  
    assert.typeOf(helloWorld, 'string')
  })

  it('should equal "hello from a module"', () => {
    assert.equal(helloWorld, 'hello from a module')
  })
})