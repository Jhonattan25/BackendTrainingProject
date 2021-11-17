const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app/app');

describe('Unit testing the /consultDocument route', function() {

    it('should return OK auth (lost)', function() {
      return request(app)
        .get('/consultDocument/?category=1&documentNumber=12345678')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    it('should return message on rendering (lost)', function() {
        return request(app)
            .get('/consultDocument/?category=1&documentNumber=12345678')
            .then(function(response){
                expect(response.body.status).to.contain('Ok');
            })
    });

    it('should return OK auth (found)', function() {
        return request(app)
          .get('/consultDocument/?category=0&documentNumber=12345678')
          .then(function(response){
              assert.equal(response.status, 200)
          })
      });
  
      it('should return message on rendering (found)', function() {
          return request(app)
              .get('/consultDocument/?category=0&documentNumber=12345678')
              .then(function(response){
                  expect(response.body.status).to.contain('Ok');
              })
      });
});