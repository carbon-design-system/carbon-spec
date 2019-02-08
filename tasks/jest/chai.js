/**
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';
import chai from 'chai';

// adds `chai` assertions to Jest's `expect` assertions,
//    found here: https://gist.github.com/pahund/3abcc5212431cef3dae455d5285b7bd7
// Make sure chai and jasmine ".not" play nice together
const originalNot = Object.getOwnPropertyDescriptor(
  chai.Assertion.prototype,
  'not'
).get;
Object.defineProperty(chai.Assertion.prototype, 'not', {
  get() {
    Object.assign(this, this.assignedNot);
    return originalNot.apply(this);
  },
  set(newNot) {
    this.assignedNot = newNot;
    return newNot;
  },
});

// Combine both jest and chai matchers on expect
const jestExpect = global.expect;

/**
 * _Should_ combine Jest expect with Chai expect, but Jest's aren't working
 * @todo get this working -or- choose one or the other assertion lib
 */
global.expect = actual => {
  const originalMatchers = jestExpect(actual);
  const chaiMatchers = chai.expect(actual);
  const combinedMatchers = Object.assign(chaiMatchers, originalMatchers);
  return combinedMatchers;
};

// global.expect is _not_ picking up the Jest expect assertions
Object.keys(jestExpect).forEach(key => {
  global.expect[key] = jestExpect[key];
});
