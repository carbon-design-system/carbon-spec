/* global it, describe, before, beforeEach */

/**
 * Scenario test object structure
 * @typedef {object} scenario-test-object
 * @property {string} scenario - Scenario name
 * @property {function} [given] - Given statement that determines under what conditions a test should run
 * @property {function} [set] - Returns an array of DocumentFragments that the test is executed on
 * @property {function} [inherit] - Returns an array of tests from an inherited component.
 *              Feature document denotes these tests with the @inheritance tag
 * @property {function} [getDomFragment] - Allows developers the ability to get sub-fragment/child docFragment object
 *              such as when inheriting
 * @property {function} getActual - Returns an object of data points that were gathered by reading or interacting
 *              with elements within a DocumentFragment. Native JavaScript that can be executed on any browser
 * @property {function} comparison - Tests the object from the corresponding `getActual` function for verification.
 *              Has no relationship with the DOM.
 */

/**
 * Feature test object structure
 * @typedef {object} feature-test-object
 * @property {string} feature -
 * @property {function} [set] -
 * @property {scenario-test-object[]} tests -
 */

/**
 * Tests whether a scenario-test-object has a custom function for getting the test fragment or
 * returns the default DOM object
 * @param {scenario-test-object} test - Scenario being tested
 * @param {DocumentFragment} docFragment - Javascript DOM fragment
 * @returns {DocumentFragment}
 */
const getDomFragment = (test, docFragment) => {
  if (test && test.getDomFragment && typeof test.getDomFragment === 'function')
    return test.getDomFragment(docFragment);
  return docFragment;
};

/**
 * Karma implementation of a mocha `it` function that is used to test
 * an individual scenario. This function is custom per test-runner used.
 * @param {scenario-test-object} test - Scenario being tested
 * @param {DocumentFragment} docFragment - fragment being tested
 */
const itter = (test, docFragment) => {
  it(test.scenario, () => test.getActual(docFragment).then(test.comparison));
};

/**
 * Loops through an array of feature-test-objects and creates `describe` statements per feature or set item.
 * This implementation was build for Karma/Mocha but does not have any Karma specific features.
 *
 * @param {feature-test-object[]} tests - test runner called from a specific component/application page
 * @param {DocumentFragment} docFragment - default docFragment object
 * @param {integer} [index] - current index when running a `set`
 */
const testParser = (tests, docFragment, index) => {
  if (!Array.isArray(tests)) return;
  tests.forEach(test => {
    if (test.feature) {
      if (typeof test.set === 'function') {
        const docFragmentArray = test.set(docFragment);
        describe(test.feature, () => {
          if (typeof test.before === 'function') before(test.before);
          if (typeof test.beforeEach === 'function')
            beforeEach(test.beforeEach);
          for (let i = 0; i < docFragmentArray.length; i++) {
            describe(`Set index: ${i}`, () => {
              testParser(test.tests, docFragmentArray[i], i);
            });
          }
        });
      } else if (Array.isArray(test.tests)) {
        describe(test.feature, () => {
          if (typeof test.before === 'function') before(test.before);
          if (typeof test.beforeEach === 'function')
            beforeEach(test.beforeEach);
          testParser(test.tests, docFragment);
        });
      }
    } else if (test.scenario) {
      if (typeof test.set === 'function') {
        const docFragmentArray = test.set(docFragment);
        for (let i = 0; i < docFragmentArray.length; i++) {
          describe(`Set index: ${i}`, () => {
            if (typeof test.given === 'function') {
              if (test.given(docFragment, index))
                itter(test, docFragmentArray[i]);
            } else {
              itter(test, docFragmentArray[i]);
            }
          });
        }
      } else if (Array.isArray(test.inherit)) {
        describe(test.scenario, () => {
          testParser(test.inherit, getDomFragment(test, docFragment));
        });
      } else if (typeof test.given === 'function') {
        if (test.given(docFragment, index))
          itter(test, getDomFragment(test, docFragment));
      } else {
        itter(test, getDomFragment(test, docFragment));
      }
    }
  });
};

export const TestParser = testParser;
export const Itter = itter;
export const GetDomFragment = getDomFragment;
