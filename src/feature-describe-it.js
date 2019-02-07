/* global it, describe, before, beforeEach */

/**
 * Scenario test object structure
 * @typedef {object} scenario-test-object
 * @property {string} it - Scenario name
 * @property {function} [conditional] - Given/When statement that determines if test should be ran
 * @property {function} [set] - Returns an array of DocumentFragments that the test is executed on
 * @property {function} [inherit] - Returns an array of tests from an inherited component.
 *              Feature document denotes these tests with the @inheritance tag
 * @property {function} [getContext] - Allows developers the ability to get sub-fragment/child context object
 *              such as when inheriting
 * @property {function} getResults - Returns an object of data points that were gathered by reading or interacting
 *              with elements within a DocumentFragment. Native JavaScript that can be executed on any browser
 * @property {function} comparison - Tests the object from the corresponding `getResults` function for verification.
 *              Has no relationship with the DOM.
 */

/**
 * Feature test object structure
 * @typedef {object} feature-test-object
 * @property {string} describe -
 * @property {function} [set] -
 * @property {scenario-test-object[]} tests -
 */

/**
 * Tests whether a scenario-test-object has a custom function for getting the test context or
 * returns the default DOM object
 * @param {scenario-test-object} test - Scenario being tested
 * @param {DocumentFragment} context - Javascript DOM fragment
 * @returns {DocumentFragment}
 */
const getContext = (test, context) => {
  if (test && test.getContext && typeof test.getContext === 'function')
    return test.getContext(context);
  return context;
};

/**
 * Karma implementation of a mocha `it` function that is used to test
 * an individual scenario. This function is custom per test-runner used.
 * @param {scenario-test-object} test - Scenario being tested
 * @param {DocumentFragment} context - fragment being tested
 */
const itter = (test, context) => {
  it(test.it, () => test.getResults(context).then(test.comparison));
};

/**
 * Loops through an array of feature-test-objects and creates `describe` statements per feature or set item.
 * This implementation was build for Karma/Mocha but does not have any Karma specific features.
 * @param {feature-test-object[]} tests - test runner called from a specific component/application page
 * @param {DocumentFragment} context - default context object
 * @param {integer} [index] - current index when running a `set`
 */
const testRunner = (tests, context, index) => {
  if (!Array.isArray(tests)) return;
  tests.forEach(test => {
    if (test.describe) {
      if (typeof test.set === 'function') {
        const contextArray = test.set(context);
        describe(test.describe, () => {
          if (typeof test.before === 'function') before(test.before);
          if (typeof test.beforeEach === 'function')
            beforeEach(test.beforeEach);
          for (let i = 0; i < contextArray.length; i++) {
            describe(`Set index: ${i}`, () => {
              testRunner(test.tests, contextArray[i], i);
            });
          }
        });
      } else if (Array.isArray(test.tests)) {
        describe(test.describe, () => {
          if (typeof test.before === 'function') before(test.before);
          if (typeof test.beforeEach === 'function')
            beforeEach(test.beforeEach);
          testRunner(test.tests, context);
        });
      }
    } else if (test.it) {
      if (typeof test.set === 'function') {
        const contextArray = test.set(context);
        for (let i = 0; i < contextArray.length; i++) {
          describe(`Set index: ${i}`, () => {
            if (typeof test.conditional === 'function') {
              if (test.conditional(context, index))
                itter(test, contextArray[i]);
            } else {
              itter(test, contextArray[i]);
            }
          });
        }
      } else if (Array.isArray(test.inherit)) {
        describe(test.it, () => {
          testRunner(test.inherit, getContext(test, context));
        });
      } else if (typeof test.conditional === 'function') {
        if (test.conditional(context, index))
          itter(test, getContext(test, context));
      } else {
        itter(test, getContext(test, context));
      }
    }
  });
};

export const TestRunner = testRunner;
export const Itter = itter;
export const GetContext = getContext;
