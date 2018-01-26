/*!
 * has-own-deep <https://github.com/jonschlinkert/has-own-deep>
 *
 * Copyright (c) 2015-2018, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
const assert = require('assert');
const hasOwnDeep = require('./');

describe('hasOwnDeep', function() {
  it('should throw an error when the first argument is not an object', function() {
    assert.throws(() => hasOwnDeep(), /expected/);
    assert.throws(() => hasOwnDeep('a'), /expected/);
  });

  it('should throw an error when the second argument is not a string', function() {
    assert.throws(() => hasOwnDeep({}), /expected/);
    assert.throws(() => hasOwnDeep({}, {}), /expected/);
  });

  it('should return true when key is an own property of the given object', function() {
    assert(hasOwnDeep({ a: 'b' }, 'a'));
  });

  it('should return true a nested key is an own property of the given object', function() {
    assert(hasOwnDeep({ a: { b: { c: 'd' } } }, 'a'));
    assert(hasOwnDeep({ a: { b: { c: 'd' } } }, 'a.b'));
    assert(hasOwnDeep({ a: { b: { c: 'd' } } }, 'a.b.c'));
  });

  it('should support nested keys with dots in them', function() {
    assert(hasOwnDeep({ 'a.b.c': 'd' }, 'a.b.c'));
    assert(hasOwnDeep({ 'a.b': { c: 'd' } }, 'a.b.c'));
    assert(hasOwnDeep({ 'a': { b: { c: 'd' } } }, 'a.b.c'));
    assert(hasOwnDeep({ 'a': { 'b.c': 'd' } }, 'a.b.c'));
    assert(!hasOwnDeep({ 'a.b.c.d': 'e' }, 'a.b.c'));

    assert(hasOwnDeep({ 'a.b.c.d.e.f': 'g' }, 'a.b.c.d.e.f'));
    assert(hasOwnDeep({ 'a.b.c.d.e': { f: 'g' } }, 'a.b.c.d.e.f'));
    assert(hasOwnDeep({ 'a.b.c.d': { e: { f: 'g' } } }, 'a.b.c.d.e.f'));
    assert(hasOwnDeep({ 'a.b.c': { d: { e: { f: 'g' } } } }, 'a.b.c.d.e.f'));
    assert(hasOwnDeep({ 'a.b': { c: { d: { e: { f: 'g' } } } } }, 'a.b.c.d.e.f'));
    assert(hasOwnDeep({ 'a': { b: { c: { d: { e: { f: 'g' } } } } } }, 'a.b.c.d.e.f'));

    assert(hasOwnDeep({ 'a.b.c.d.e': { 'f': 'g' } }, 'a.b.c.d.e.f'));
    assert(hasOwnDeep({ 'a.b.c.d': { 'e.f': 'g' } }, 'a.b.c.d.e.f'));
    assert(hasOwnDeep({ 'a.b.c': { 'd.e.f': 'g' } }, 'a.b.c.d.e.f'));
    assert(hasOwnDeep({ 'a.b': { 'c.d.e.f': 'g' } }, 'a.b.c.d.e.f'));
    assert(hasOwnDeep({ 'a': { 'b.c.d.e.f': 'g' } }, 'a.b.c.d.e.f'));

    assert(hasOwnDeep({ 'a.b': { 'c.d': { 'e.f': 'g' } } }, 'a.b.c.d.e.f'));
    assert(hasOwnDeep({ 'a.b': { 'c': { 'd.e.f': 'g' } } }, 'a.b.c.d.e.f'));
    assert(hasOwnDeep({ 'a': { 'b.c.d.e': { 'f': 'g' } } }, 'a.b.c.d.e.f'));
    assert(hasOwnDeep({ 'a': { 'b.c.d': { 'e.f': 'g' } } }, 'a.b.c.d.e.f'));
    assert(hasOwnDeep({ 'a': { 'b.c': { 'd.e.f': 'g' } } }, 'a.b.c.d.e.f'));
    assert(hasOwnDeep({ 'a': { 'b': { 'c.d.e.f': 'g' } } }, 'a.b.c.d.e.f'));
  });

  it('should respect keys escaped with slashes', function() {
    assert(hasOwnDeep({ 'a.b': 'c' }, 'a\\.b'));
    assert(hasOwnDeep({ 'a.b.c': 'd' }, 'a\\.b\\.c'));
  });

  it('should work with falsey values', function() {
    assert(hasOwnDeep({ a: { b: { c: '' } } }, 'a'));
    assert(hasOwnDeep({ a: { b: { c: '' } } }, 'a.b'));
    assert(hasOwnDeep({ a: { b: { c: '' } } }, 'a.b.c'));
    assert(hasOwnDeep({ a: { b: { c: 0 } } }, 'a'));
    assert(hasOwnDeep({ a: { b: { c: 0 } } }, 'a.b'));
    assert(hasOwnDeep({ a: { b: { c: 0 } } }, 'a.b.c'));
    assert(hasOwnDeep({ a: { b: { c: false } } }, 'a'));
    assert(hasOwnDeep({ a: { b: { c: false } } }, 'a.b'));
    assert(hasOwnDeep({ a: { b: { c: false } } }, 'a.b.c'));
    assert(hasOwnDeep({ a: { b: { c: null } } }, 'a'));
    assert(hasOwnDeep({ a: { b: { c: null } } }, 'a.b'));
    assert(hasOwnDeep({ a: { b: { c: null } } }, 'a.b.c'));
    assert(hasOwnDeep({ a: { b: { c: undefined } } }, 'a'));
    assert(hasOwnDeep({ a: { b: { c: undefined } } }, 'a.b'));
    assert(hasOwnDeep({ a: { b: { c: undefined } } }, 'a.b.c'));
  });

  it('should return false when a nested key is not an own property of the given object', function() {
    assert(!hasOwnDeep({ a: { b: { c: 'd' } } }, 'a.b.d'));
    assert(!hasOwnDeep({ a: { b: { c: 'd' } } }, 'a.c'));
    assert(!hasOwnDeep({ a: { b: { c: 'd' } } }, 'a.e.c'));
    assert(!hasOwnDeep({ a: { b: { c: 'd' } } }, 'c'));
    assert(!hasOwnDeep({ a: { b: { c: 'd' } } }, 'c.c'));
    assert(!hasOwnDeep({ a: { b: { c: 'd' } } }, 'z.b.c'));
  });
});
