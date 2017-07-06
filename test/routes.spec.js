process.env.NODE_ENV = 'test';
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server/server.js')
const knex = require('../server/db/knex.js')

chai.use(chaiHttp)

describe('Client Routes', () => {

  it('should return 200 when it hits homepage', (done) => {
    chai.request(server)
    .get('/')
    .end((err, res) => {
      res.should.have.status(200)
      res.should.be.html
      done()
    })
  })

  it('should return 404 for route that doesnt exist', (done) => {
    chai.request(server)
      .get('/sad')
      .end((err, res) => {
        res.should.have.status(404)
        done()
      })
    })
  })

describe('API Routes', () => {

  before((done) => {
    knex.migrate.latest()
    knex.seed.run()
    .then(() => {
      done()
    })
  });

  it('should return all of the categories', (done) => {
    chai.request(server)
      .get('/api/v1/categories')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(3);
        res.body[0].should.have.property('folder');
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(1);
        done()
      })
    })

  it('should return a single category', (done) => {
    chai.request(server)
      .get('/api/v1/single-folder?folder=sports')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(1);
        res.body[0].should.have.property('folder');
        res.body[0].folder.should.equal('sports');
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(1);
        done()
      })
    })

    it('should return 404 if the folder does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/single-folder?folder=sad')
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
      })

    it('should return a list of urls specific to the folder', (done) => {
      chai.request(server)
        .get('/api/v1/folder-urls?id=1')
        .end((err, res) => {

          const sorted = res.body.sort((a,b) => {
            return a.id - b.id
          })

          res.should.have.status(200)
          res.should.be.json;
          sorted.should.be.a('array');
          sorted.length.should.equal(2);
          sorted[0].should.have.property('id');
          sorted[0].id.should.equal(1);
          sorted[0].should.have.property('title');
          sorted[0].title.should.equal('google');
          sorted[0].should.have.property('url');
          sorted[0].url.should.equal('https://google.com');
          sorted[0].should.have.property('visits');
          sorted[0].visits.should.equal(3);
          sorted[0].should.have.property('url_shortened');
          sorted[0].url_shortened.should.equal('googs');
          sorted[0].should.have.property('categories_id');
          sorted[0].categories_id.should.equal(1);
          sorted[0].should.have.property('created_at');
          sorted[0].should.have.property('updated_at');
          done()
        })
      })
    })

describe('POST Routes', () => {

  it('should make a new folder' , (done) => {
    chai.request(server)
      .post('/api/v1/categories')
      .send({
        folder: 'newGuy',
        id: 10
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.deep.equal(['newGuy']);
        done()
      })
    })

  it('should make a new url' , (done) => {

    chai.request(server)
      .post('/api/v1/url')
      .send({
        id: 500,
        title: 'blah',
        url:'bleep.com',
        visits:0,
        url_shortened:'ble',
        categories_id:'2',
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(1)
        res.body[0].should.equal(2)
        done()
      })
    })

  it('should update visits', (done) => {
    chai.request(server)
      .put('/api/v1/url/visit')
      .send({
          shortenedUrl:'googs'
        })
      .end((err,res) => {
        res.should.have.status(200)
        res.body.should.equal(1)
        done()
      })
    chai.request(server)
      .put('/api/v1/url/visit')
      .send({
          shortenedUrl:'googs'
        })
      .end((err,res) => {
        res.should.have.status(200)
        res.body.should.equal(3)
        done()
      })
    })
  })
