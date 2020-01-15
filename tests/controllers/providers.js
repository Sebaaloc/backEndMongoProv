const chai = require('chai');
const server = require('../../app/app.js');
const expect = chai.expect;

const provider = {
                  specialty: {
                      createdBy: 2000,
                      updatedBy: 2000,
                      updatedAt: '2020-20-20T20:48:32.863Z',
                      name: 'test',
                      createdAt: 'Fri Feb 22 2020 15:56:13 GMT-0500 (GMT-05:00)'
                  },
                  middleName: 'Andrew',
                  employerId: '000',
                  assignedTo: 1111,
                  createdBy: 1111,
                  updatedBy: 1111,
                  updatedAt: '2020-02-22T20:48:32.863Z',
                  firstName: 'Christopher',
                  lastName: 'Smith',
                  email: 'christsmith@outlook.com',
                  providerType: 'DO',
                  staffStatus: 'ACTIVE',
                  status: 'DENIED',
                  projectedStartDate: '2020-02-22T20:56:13.463Z',
                  createdAt: 'Fri Feb 22 2020 15:56:13 GMT-0500 (GMT-05:00)'
                }

describe('Providers', () => {
  describe('/providersInsert POST', () => {
    it('Should succed posts data of Christopher provider in collection.', done => {
      chai
        .request(server)
        .post('/providersInsert')
        .send(provider)
        .then(response => {
          expect(response.status).to.be.equal(200);
          expect(response.body).to.have.property('message').and.to.be.a('string').and.to.equal('Provider created.');
          done();
        });
    });
    it('Should fail posts data of Christopher provider in collection because of missing arguments.', done => {
      delete provider["middleName"];
      chai
        .request(server)
        .post('/providersInsert')
        .send(provider)
        .then(response => {
          expect(response.status).to.be.equal(400);
          expect(response.body).to.have.property('message').and.to.be.a('string').and.to.equal('Err: Missing input parameters.');
          expect(response.body).to.have.property('internal_code').and.to.be.a('string').and.to.equal('BAD_REQUEST');
          done();
        });
    });
  });
  describe('/providers GET', () => {
    it('Should succed returns all data in collection.', done => {
      chai
        .request(server)
        .get('/providers')
        .then(response => {
          expect(response.status).to.be.equal(200);
          expect(response.body[0]).to.have.property('middleName').and.to.be.a('string');
          expect(response.body[0]).to.have.property('employerId').and.to.be.a('string');
          expect(response.body[0]).to.have.property('assignedTo').and.to.be.a('number');
          expect(response.body[0]).to.have.property('createdBy').and.to.be.a('number');
          expect(response.body[0]).to.have.property('updatedBy').and.to.be.a('number');
          expect(response.body[0]).to.have.property('updatedAt').and.to.be.a('string');
          expect(response.body[0]).to.have.property('firstName').and.to.be.a('string');
          expect(response.body[0]).to.have.property('lastName').and.to.be.a('string');
          expect(response.body[0]).to.have.property('email').and.to.be.a('string');
          expect(response.body[0]).to.have.property('providerType').and.to.be.a('string');
          expect(response.body[0]).to.have.property('staffStatus').and.to.be.a('string');
          expect(response.body[0]).to.have.property('status').and.to.be.a('string');
          expect(response.body[0]).to.have.property('projectedStartDate').and.to.be.a('string');
          expect(response.body[0]).to.have.property('createdAt').and.to.be.a('string');
          expect(response.body[0]).to.have.property('specialty').and.to.be.a('object');
          expect(response.body[0].specialty).to.have.property('createdBy').and.to.be.a('number');
          expect(response.body[0].specialty).to.have.property('updatedBy').and.to.be.a('number');
          expect(response.body[0].specialty).to.have.property('updatedAt').and.to.be.a('string');
          expect(response.body[0].specialty).to.have.property('name').and.to.be.a('string');
          expect(response.body[0].specialty).to.have.property('createdAt').and.to.be.a('string');
          done();
        });
    });
    it('Should succed returns all data of the Christopher health provider.', done => {
      chai
        .request(server)
        .get('/providers?name=Christopher&mname=Andrew&mail=christsmith@outlook.com')
        .then(response => {
          expect(response.status).to.be.equal(200);
          expect(response.body[0]).to.have.property('middleName').and.to.be.a('string').and.to.equal('Andrew');
          expect(response.body[0]).to.have.property('employerId').and.to.be.a('string').and.to.equal('000');
          expect(response.body[0]).to.have.property('assignedTo').and.to.be.a('number').and.to.equal(1111);
          expect(response.body[0]).to.have.property('createdBy').and.to.be.a('number').and.to.equal(1111);
          expect(response.body[0]).to.have.property('updatedBy').and.to.be.a('number').and.to.equal(1111);
          expect(response.body[0]).to.have.property('updatedAt').and.to.be.a('string').and.to.equal('2020-02-22T20:48:32.863Z');
          expect(response.body[0]).to.have.property('firstName').and.to.be.a('string').and.to.equal('Christopher');
          expect(response.body[0]).to.have.property('lastName').and.to.be.a('string').and.to.equal('Smith');
          expect(response.body[0]).to.have.property('email').and.to.be.a('string').and.to.equal('christsmith@outlook.com');
          expect(response.body[0]).to.have.property('providerType').and.to.be.a('string').and.to.equal('DO');
          expect(response.body[0]).to.have.property('staffStatus').and.to.be.a('string').and.to.equal('ACTIVE');
          expect(response.body[0]).to.have.property('status').and.to.be.a('string').and.to.equal('DENIED');
          expect(response.body[0]).to.have.property('projectedStartDate').and.to.be.a('string').and.to.equal('2020-02-22T20:56:13.463Z');
          expect(response.body[0]).to.have.property('createdAt').and.to.be.a('string').and.to.equal('Fri Feb 22 2020 15:56:13 GMT-0500 (GMT-05:00)');
          expect(response.body[0]).to.have.property('specialty').and.to.be.a('object');
          expect(response.body[0].specialty).to.have.property('createdBy').and.to.be.a('number').and.to.equal(2000);
          expect(response.body[0].specialty).to.have.property('updatedBy').and.to.be.a('number').and.to.equal(2000);
          expect(response.body[0].specialty).to.have.property('updatedAt').and.to.be.a('string').and.to.equal('2020-20-20T20:48:32.863Z');
          expect(response.body[0].specialty).to.have.property('name').and.to.be.a('string').and.to.equal('test');
          expect(response.body[0].specialty).to.have.property('createdAt').and.to.be.a('string').and.to.equal('Fri Feb 22 2020 15:56:13 GMT-0500 (GMT-05:00)');
          done();
        });
    });
    it('Should fail does not find health provider.', done => {
      chai
        .request(server)
        .get('/providers?name=asd&mname=asd&mail=asd')
        .then(response => {
          expect(response.status).to.be.equal(404);
          expect(response.body).to.have.property('message').and.to.be.a('string').and.to.equal('Err: Provider not found.');
          expect(response.body).to.have.property('internal_code').and.to.be.a('string').and.to.equal('NOT_FOUND');
          done();
        });
    });
  });
  describe('/providersUpdate PATCH', () => {
    it('Should succed updating data of Christopher health provider in collection.', done => {
      provider.middleName = 'Andrew';
      provider['updatedAt'] = '2021-02-22T20:48:32.863Z';
      chai
        .request(server)
        .patch('/providersUpdate')
        .send(provider)
        .then(response => {
          expect(response.status).to.be.equal(200);
          expect(response.body).to.have.property('message').and.to.be.a('string').and.to.equal('Provider updated.');
          done();
        });
    });
    it('Should fail because email does not exist within collection.', done => {
      provider['email'] = 'asd@gmail.com'
      chai
        .request(server)
        .patch('/providersUpdate')
        .send(provider)
        .then(response => {
          expect(response.status).to.be.equal(404);
          expect(response.body).to.have.property('message').and.to.be.a('string').and.to.equal('Err: Provider not found.');
          expect(response.body).to.have.property('internal_code').and.to.be.a('string').and.to.equal('NOT_FOUND');
          done();
        });
    });
    it('Should fail because user did not input email.', done => {
      delete provider["email"];
      chai
        .request(server)
        .patch('/providersUpdate')
        .send(provider)
        .then(response => {
          expect(response.status).to.be.equal(400);
          expect(response.body).to.have.property('message').and.to.be.a('string').and.to.equal('Err: Provider not updated in MongoDB check that email exists within data.');
          expect(response.body).to.have.property('internal_code').and.to.be.a('string').and.to.equal('BAD_REQUEST');
          done();
        });
    });
  });
  describe('/providerToDelete DELETE', () => {
    it('Should succed deletes data of Christopher health provider in collection.', done => {
      chai
        .request(server)
        .delete('/providerToDelete/christsmith@outlook.com')
        .then(response => {
          expect(response.status).to.be.equal(200);
          expect(response.body).to.have.property('message').and.to.be.a('string').and.to.equal('Provider deleted.');
          done();
        });
    });
    it('Should succed does not find data of Christopher health provider in collection to delete.', done => {
      chai
        .request(server)
        .delete('/providerToDelete/christsmith@outlook.com')
        .then(response => {
          expect(response.status).to.be.equal(404);
          expect(response.body).to.have.property('message').and.to.be.a('string').and.to.equal('Err: Provider not found within database for deletion.');
          expect(response.body).to.have.property('internal_code').and.to.be.a('string').and.to.equal('NOT_FOUND');
          done();
        });
    });
  });

});