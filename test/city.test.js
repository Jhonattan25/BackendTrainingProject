const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app/app');

describe('Unit testing the /consultCities route', function() {

    it('should return OK auth', function() {
      return request(app)
        .get('/consultCities')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    it('should return message on rendering', function() {
        return request(app)
            .get('/consultCities')
            .then(function(response){
                expect(response.body.status).to.contain('Ok');
            })
    });
});