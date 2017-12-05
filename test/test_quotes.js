process.env.NODE_ENV = 'test';

const chai = require('chai')
const chaiHTTP = require('chai-http')

const database = require('../database/db')
const server = require('../index');

const should = chai.should()

chai.use(chaiHTTP)

describe('Quotes API', () => {
  // Before we do any test, let's clear the database
  beforeEach((done) => {
    database.remove({}, { multi: true }, (err, numRemoved) => {
      if (err) throw err
    })
    done();
  })
  // Create a valid document to send with our request
  // This will be used for all requests requiring it
  const quoteDoc = {
    quote: 'Test quote goes here',
    author: 'John Doe'
  }

  // GET /api/quotes
  describe('GET /api/quotes', () => {
    it('should get all quotes', (done) => {
      chai.request(server)
        .get('/api/quotes')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('Object')
          res.body.should.have.property('data')
          res.body.data.should.be.a('Array')
          done();
        })
    })
  })

  // POST /api/quotes
  describe('POST /api/quotes', () => {
    it('should post a quote', (done) => {
      chai.request(server)
        .post('/api/quotes')
        .send(quoteDoc)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('Object')
          res.body.should.have.property('data')
          res.body.data.should.have.property('_id')
          res.body.data.should.have.property('quote')
          res.body.data.should.have.property('author')
          done();
        })
    })
  })

  // GET /api/quotes/:id
  describe('GET /api/quotes/:id', () => {
    it('should get a post given it\'s id', (done) => {
      // We first need to create the document
      // And then retrieve it
      chai.request(server)
        .post('/api/quotes')
        .send(quoteDoc)
        .end((err, res) => {
          return chai.request(server)
            .get('/api/quotes/' + res.body.data._id)
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a('Object')
              res.body.should.have.property('data')
              res.body.data.should.have.property('_id')
              res.body.data.should.have.property('quote')
              res.body.data.should.have.property('author')
              done()
            })
        })
    })
  })

  // Implement the PUT /api/quotes/:id
  // Difficulty: 3.5/5
  // Hint:
  // 1. Create the doc first.
  // 2. Chain a request using the .put() method
  // 3. The test must just check for the PUT status which you can find in the
  //    service folder in the quotes.js file
  // 4. Here are some links to get you started
  //    - http://chaijs.com/plugins/chai-http/
  //    - https://mochajs.org/
  // I'll admit this is a little difficult for beginners.
  // Your PUT test starts here


  // Your PUT test ends here

  // DELETE /api/quotes/:id
  describe('DELETE /api/quotes/:id', () => {
    it('should delete a post given it\'s id', (done) => {
      // We first need to create the document
      // And then we delete the document
      chai.request(server)
        .post('/api/quotes')
        .send(quoteDoc)
        .end((err, res) => {
          res.should.have.status(201)
          return chai.request(server)
            .delete('/api/quotes/' + res.body._id)
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a('Object')
              res.body.should.have.property('data')
              done()
            })
        })
    })
  })

})
