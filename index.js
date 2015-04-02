/*!
 * has-own-deep <https://github.com/jonschlinkert/has-own-deep>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function hasOwnDeep(obj, key) {
  if (typeof obj !== 'object') {
    throw new Error('has-own-deep expects an object');
  }

  if (typeof key !== 'string') {
    return false;
  }

  var segs = key.split('.');
  var len = segs.length, i = 0;

  while (len--) {
    var seg = segs[i++];
    if (!obj.hasOwnProperty(seg)) {
      return false;
    }
    obj = obj[seg];
  }
  return !!obj;
};
