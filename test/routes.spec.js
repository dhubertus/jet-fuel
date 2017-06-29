const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server/server.js')
const knex = require('../server/db/knex.js')

process.env.NODE_ENV = 'test';

if(process.env.NODE_ENV != 'test') {
   knex.migrate.latest([config])
}

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
  // before((done) => {
  //   // Run migrations and seeds for test database
  //   done()
  // });

  beforeEach((done) => {
    // Would normally run run your seed(s), which includes clearing all records
    // from each of the tables
    // server.locals.students = students;
    knex.migrate.rollback()
      .then(() => {
        knex.migrate.latest()
          .then(() => {
            return knex.seed.run()
              .then(() => {
                done();
              })
          })
      })
    done()
  });

  afterEach((done) => {
    knex.migrate.rollback()
      .then(() => {
        done();
      });
    done()
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
        res.body[0].folder.should.equal('sports');
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
          res.should.have.status(200)
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(2);
          res.body[0].should.have.property('id');
          res.body[0].id.should.equal(1);
          res.body[0].should.have.property('title');
          res.body[0].title.should.equal('google');
          res.body[0].should.have.property('url');
          res.body[0].url.should.equal('https://google.com');
          res.body[0].should.have.property('visits');
          res.body[0].visits.should.equal(3);
          res.body[0].should.have.property('url_shortened');
          res.body[0].url_shortened.should.equal('googs');
          res.body[0].should.have.property('categories_id');
          res.body[0].categories_id.should.equal(1);
          res.body[0].should.have.property('created_at');
          res.body[0].created_at.should.equal('2017-06-29T19:46:10.236Z');
          res.body[0].should.have.property('updated_at');
          res.body[0].updated_at.should.equal('2017-06-29T19:46:10.236Z');
          done()
        })
    })
})

describe('POST Routes', () => {
  it('should make a new folder' , (done) => {
    chai.request(server)
      .post('/api/v1/categories')
      .send({
        folder: 'newGuy'
      })
      .end((err, res) => {
        console.log(res.body, 'asda');
        done()
      })

  })
})