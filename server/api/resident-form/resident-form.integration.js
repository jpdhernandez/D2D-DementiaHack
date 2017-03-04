'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newResidentForm;

describe('ResidentForm API:', function() {
  describe('GET /api/resident-forms', function() {
    var residentForms;

    beforeEach(function(done) {
      request(app)
        .get('/api/resident-forms')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          residentForms = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(residentForms).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/resident-forms', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/resident-forms')
        .send({
          name: 'New ResidentForm',
          info: 'This is the brand new residentForm!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newResidentForm = res.body;
          done();
        });
    });

    it('should respond with the newly created residentForm', function() {
      expect(newResidentForm.name).to.equal('New ResidentForm');
      expect(newResidentForm.info).to.equal('This is the brand new residentForm!!!');
    });
  });

  describe('GET /api/resident-forms/:id', function() {
    var residentForm;

    beforeEach(function(done) {
      request(app)
        .get(`/api/resident-forms/${newResidentForm._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          residentForm = res.body;
          done();
        });
    });

    afterEach(function() {
      residentForm = {};
    });

    it('should respond with the requested residentForm', function() {
      expect(residentForm.name).to.equal('New ResidentForm');
      expect(residentForm.info).to.equal('This is the brand new residentForm!!!');
    });
  });

  describe('PUT /api/resident-forms/:id', function() {
    var updatedResidentForm;

    beforeEach(function(done) {
      request(app)
        .put(`/api/resident-forms/${newResidentForm._id}`)
        .send({
          name: 'Updated ResidentForm',
          info: 'This is the updated residentForm!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedResidentForm = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedResidentForm = {};
    });

    it('should respond with the updated residentForm', function() {
      expect(updatedResidentForm.name).to.equal('Updated ResidentForm');
      expect(updatedResidentForm.info).to.equal('This is the updated residentForm!!!');
    });

    it('should respond with the updated residentForm on a subsequent GET', function(done) {
      request(app)
        .get(`/api/resident-forms/${newResidentForm._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let residentForm = res.body;

          expect(residentForm.name).to.equal('Updated ResidentForm');
          expect(residentForm.info).to.equal('This is the updated residentForm!!!');

          done();
        });
    });
  });

  describe('PATCH /api/resident-forms/:id', function() {
    var patchedResidentForm;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/resident-forms/${newResidentForm._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched ResidentForm' },
          { op: 'replace', path: '/info', value: 'This is the patched residentForm!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedResidentForm = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedResidentForm = {};
    });

    it('should respond with the patched residentForm', function() {
      expect(patchedResidentForm.name).to.equal('Patched ResidentForm');
      expect(patchedResidentForm.info).to.equal('This is the patched residentForm!!!');
    });
  });

  describe('DELETE /api/resident-forms/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/resident-forms/${newResidentForm._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when residentForm does not exist', function(done) {
      request(app)
        .delete(`/api/resident-forms/${newResidentForm._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
