const chai = require('chai');
const server = require('../../app/app.js');
const expect = chai.expect;

const specialty = {
                    name: "Uber driver.",
                    createdBy: 48795,
                    createdAt: "Wed Mar 08 2019 03:45:08 GMT-0500 (GMT-05:00)",
                    updatedBy: 78956,
                    updatedAt: "Mon Sep 11 2019 22:49:29 GMT-0500 (GMT-05:00)"
                }

describe('Providers', () => {
  describe('/specialtiesInsert POST', () => {
    it('Should succed posts data of Uber driver specialty of provider in collection.', done => {
      chai
        .request(server)
        .post('/specialtiesInsert')
        .send(specialty)
        .then(response => {
          expect(response.status).to.be.equal(200);
          expect(response.body).to.have.property('message').and.to.be.a('string').and.to.equal('Specialty created.');
          done();
        });
    });
    it('Should fail posts data of Uber driver specialty of providers in collection because of missing arguments.', done => {
      delete specialty["name"];
      chai
        .request(server)
        .post('/specialtiesInsert')
        .send(specialty)
        .then(response => {
          expect(response.status).to.be.equal(400);
          expect(response.body).to.have.property('message').and.to.be.a('string').and.to.equal('Err: Missing input parameters.');
          expect(response.body).to.have.property('internal_code').and.to.be.a('string').and.to.equal('BAD_REQUEST');
          done();
        });
    });
  });
  describe('/specialties GET', () => {
    it('Should succed returns all data in collection.', done => {
      chai
        .request(server)
        .get('/specialties')
        .then(response => {
            expect(response.status).to.be.equal(200);
            expect(response.body[0]).to.have.property('name').and.to.be.a('string');
            expect(response.body[0]).to.have.property('createdBy').and.to.be.a('number');
            expect(response.body[0]).to.have.property('createdAt').and.to.be.a('string');
            expect(response.body[0]).to.have.property('updatedBy').and.to.be.a('number');
            expect(response.body[0]).to.have.property('updatedAt').and.to.be.a('string');
            done();
        });
    });
    it('Should succed returns all data of Uber driver specialy of providers.', done => {
      chai
        .request(server)
        .get('/specialties?name=Uber driver.&createdBy=48795&updatedBy=78956')
        .then(response => {
          expect(response.status).to.be.equal(200);
          expect(response.body[0]).to.have.property('name').and.to.be.a('string').and.to.equal('Uber driver.');
          expect(response.body[0]).to.have.property('createdBy').and.to.be.a('number').and.to.equal(48795);
          expect(response.body[0]).to.have.property('createdAt').and.to.be.a('string').and.to.equal('48795');
          expect(response.body[0]).to.have.property('updatedBy').and.to.be.a('number').and.to.equal(78956);
          expect(response.body[0]).to.have.property('updatedAt').and.to.be.a('string').and.to.equal('Mon Sep 11 2019 22:49:29 GMT-0500 (GMT-05:00)');
          done();
        });
    });
    it('Should fail does not find specialty.', done => {
      chai
        .request(server)
        .get('/specialties?name=asdfa&createdBy=654632&updatedBy=23189')
        .then(response => {
          expect(response.status).to.be.equal(404);
          expect(response.body).to.have.property('message').and.to.be.a('string').and.to.equal('Err: Specialty of provider not found.');
          expect(response.body).to.have.property('internal_code').and.to.be.a('string').and.to.equal('NOT_FOUND');
          done();
        });
    });
  });
  describe('/specialtiesUpdate PATCH', () => {
    it('Should succed updating data of Uber driver specialty of provider in collection.', done => {
      specialty.name = 'Uber driver.';
      specialty['updatedAt'] = 6666;
      specialty['createdAt'] = 'Wed Mar 08 2020 03:45:08 GMT-0500 (GMT-05:00)';
      specialty['updatedBy'] = 6666;
      specialty['updatedAt'] = 'Mon Sep 11 2020 22:49:29 GMT-0500 (GMT-05:00)';
      chai
        .request(server)
        .patch('/specialtiesUpdate')
        .send(specialty)
        .then(response => {
          expect(response.status).to.be.equal(200);
          expect(response.body).to.have.property('message').and.to.be.a('string').and.to.equal('Specialty updated.');
          done();
        });
    });
    it('Should fail because name does not exist within collection.', done => {
      specialty['name'] = '@@@@@@@@@@@'
      chai
        .request(server)
        .patch('/specialtiesUpdate')
        .send(specialty)
        .then(response => {
          expect(response.status).to.be.equal(404);
          expect(response.body).to.have.property('message').and.to.be.a('string').and.to.equal('Err: Specialty not found.');
          expect(response.body).to.have.property('internal_code').and.to.be.a('string').and.to.equal('NOT_FOUND');
          done();
        });
    });
    it('Should fail because user did not input name.', done => {
      delete specialty["name"];
      chai
        .request(server)
        .patch('/specialtiesUpdate')
        .send(specialty)
        .then(response => {
          expect(response.status).to.be.equal(400);
          expect(response.body).to.have.property('message').and.to.be.a('string').and.to.equal('Err: Specialty not updated in MongoDB check that name exists within data.');
          expect(response.body).to.have.property('internal_code').and.to.be.a('string').and.to.equal('BAD_REQUEST');
          done();
        });
    });
  });
  describe('/specialtiesToDelete DELETE', () => {
    it('Should succed deletes data of Uber Driver specialty of provider in collection.', done => {
      chai
        .request(server)
        .delete('/specialtiesToDelete/Uber driver.')
        .then(response => {
          expect(response.status).to.be.equal(200);
          expect(response.body).to.have.property('message').and.to.be.a('string').and.to.equal('Specialty deleted.');
          done();
        });
    });
    it('Should succed does not find data of Uber Driver specialty of provider in collection to delete.', done => {
      chai
        .request(server)
        .delete('/specialtiesToDelete/Uber driver.')
        .then(response => {
          expect(response.status).to.be.equal(404);
          expect(response.body).to.have.property('message').and.to.be.a('string').and.to.equal('Err: Specialty not found within database for deletion.');
          expect(response.body).to.have.property('internal_code').and.to.be.a('string').and.to.equal('NOT_FOUND');
          done();
        });
    });
  });

});