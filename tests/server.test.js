const request = require('supertest')

describe('testing express server routes', () => {
  const { app } = require('../index.js')
  it('responds to /', () => {
    request(app)
      .get('/')
      .expect(200)
  })

  it('404s on any other route with any request', () => {
    request(app)
      .get('/foo')
      .expect(404)
  })

  it('throws 500 on internal server errors', () => {
    request(app)
      .get('/error-test')
      .expect(500)
  })
})