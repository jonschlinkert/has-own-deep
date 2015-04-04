/*!
 * has-own-deep <https://github.com/jonschlinkert/has-own-deep>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var hasOwnDeep = require('./');

describe('hasOwnDeep', function () {
  it('should return false when no key is passed:', function () {
    hasOwnDeep({}).should.be.false;
  });

  it('should return true when key is an own property of the given object:', function () {
    hasOwnDeep({a: 'b'}, 'a').should.be.true;
  });

  it('should return true a nested key is an own property of the given object:', function () {
    hasOwnDeep({a: {b: {c: 'd'}}}, 'a').should.be.true;
    hasOwnDeep({a: {b: {c: 'd'}}}, 'a.b').should.be.true;
    hasOwnDeep({a: {b: {c: 'd'}}}, 'a.b.c').should.be.true;
  });

  it('should respect keys escaped with slashes when `true` is passed:', function () {
    hasOwnDeep({'a.b': 'c'}, 'a\\.b', true).should.be.true;
    hasOwnDeep({'a.b.c': 'd'}, 'a\\.b\\.c', true).should.be.true;
  });

  it('should not respect keys escaped with slashes when `true` is not passed:', function () {
    hasOwnDeep({'a.b': 'c'}, 'a\\.b').should.be.false;
    hasOwnDeep({'a.b.c': 'd'}, 'a\\.b\\.c').should.be.false;
  });

  it('should work with falsey values:', function () {
    hasOwnDeep({a: {b: {c: null}}}, 'a').should.be.true;
    hasOwnDeep({a: {b: {c: null}}}, 'a.b').should.be.true;
    hasOwnDeep({a: {b: {c: null}}}, 'a.b.c').should.be.true;
    hasOwnDeep({a: {b: {c: undefined}}}, 'a').should.be.true;
    hasOwnDeep({a: {b: {c: undefined}}}, 'a.b').should.be.true;
    hasOwnDeep({a: {b: {c: undefined}}}, 'a.b.c').should.be.true;
    hasOwnDeep({a: {b: {c: false}}}, 'a').should.be.true;
    hasOwnDeep({a: {b: {c: false}}}, 'a.b').should.be.true;
    hasOwnDeep({a: {b: {c: false}}}, 'a.b.c').should.be.true;
    hasOwnDeep({a: {b: {c: 0}}}, 'a').should.be.true;
    hasOwnDeep({a: {b: {c: 0}}}, 'a.b').should.be.true;
    hasOwnDeep({a: {b: {c: 0}}}, 'a.b.c').should.be.true;
    hasOwnDeep({a: {b: {c: ''}}}, 'a').should.be.true;
    hasOwnDeep({a: {b: {c: ''}}}, 'a.b').should.be.true;
    hasOwnDeep({a: {b: {c: ''}}}, 'a.b.c').should.be.true;
  });

  it('should return false when a nested key is not an own property of the given object:', function () {
    hasOwnDeep({a: {b: {c: 'd'}}}, 'c').should.be.false;
    hasOwnDeep({a: {b: {c: 'd'}}}, 'c.c').should.be.false;
    hasOwnDeep({a: {b: {c: 'd'}}}, 'a.c').should.be.false;
    hasOwnDeep({a: {b: {c: 'd'}}}, 'a.b.d').should.be.false;
    hasOwnDeep({a: {b: {c: 'd'}}}, 'a.e.c').should.be.false;
    hasOwnDeep({a: {b: {c: 'd'}}}, 'z.b.c').should.be.false;
  });

  it('should throw an error on bad args:', function () {
    (function () {
      hasOwnDeep();
    }).should.throw('has-own-deep expects an object');

    (function () {
      hasOwnDeep('a');
    }).should.throw('has-own-deep expects an object');
  });
});
