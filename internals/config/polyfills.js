

if (typeof Promise === 'undefined') {
  // Enable rejection tracking
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() polyfill, since its commenly used
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');
