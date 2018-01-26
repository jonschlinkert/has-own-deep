/*!
 * has-own-deep <https://github.com/jonschlinkert/has-own-deep>
 *
 * Copyright (c) 2015-2018, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const hasOwn = Object.prototype.hasOwnProperty;
const split = require('split-string');
const isObject = require('isobject');

module.exports = function(target, path, options) {
  if (!isObject(target)) {
    throw new TypeError('expected an object');
  }

  if (typeof path !== 'string') {
    throw new TypeError('expected object path to be a string');
  }

  if (hasOwn.call(target, path)) {
    return true;
  }

  let segs = split(path, options);
  let obj = target;

  while (isObject(obj) && segs.length) {
    const key = segs.join('.');
    const seg = segs[0];

    if (hasOwn.call(obj, seg)) {
      obj = obj[segs.shift()];
      continue;
    }

    if (hasOwn.call(obj, key)) {
      obj = obj[key];
      continue;
    }

    let rest = segs.slice();
    let has = false;

    while (rest.length) {
      const prop = rest.join('.');

      if ((has = hasOwn.call(obj, prop))) {
        segs = segs.slice(rest.length);
        obj = obj[prop];
        break;
      }

      rest.pop();
    }

    if (!has) {
      return false;
    }
  }

  return true;
};
