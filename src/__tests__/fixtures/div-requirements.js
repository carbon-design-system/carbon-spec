/**
 * @fileOverview Exporable tests that match the Feature/Scenario pairs in div.feature
 */

/**
 * Div user test configurations
 * @typedef {object} divTestConfig
 * @property {object} content - contains content for component
 * @property {string} content.text - text content for component
 * @property {divElements} selectors - Selectors to grab each element for a div component
 */
const defaults = {
  content: {
    text: 'Div Text',
  },
  selectors: {
    root: 'div',
    content: 'span',
  },
};

/**
 * Grabs Div component elements from a DOM
 * @param {DocumentFragment} docFragment - JavaScript document or JSDOM fragment
 * @param {divElements} selectors
 * @returns {object} elements gathered from the selectors object
 */
const getDiv = (docFragment, selectors) => {
  const div = docFragment.querySelector(selectors.root);
  const content = div.querySelector(selectors.content);

  return {
    div,
    content,
  };
};

/**
 * Very basic test for a standard div. These ensure that the Scenario "Standard div"
 *   has tests for each scenario and it's `then`s
 * @type {scenario-test-object}
 */
const standardDiv = {
  scenario: 'Standard div',
  getActual: (docFragment = document) =>
    new Promise(resolve => {
      const component = getDiv(docFragment, defaults.selectors);

      resolve({
        html: component.div.innerHTML,
        content: component.content.textContent.trim(),
        classes: component.div.classList.value,
      });
    }),
  comparison: actual => {
    // see ./div.feature file for Scenario "Standard div"
    //  these tests conform to the `Then...` section
    expect(actual.html, "I find said div's content").to.not.be.empty;
    expect(actual.content, 'said content includes text').to.not.be.empty;
    expect(actual.content, "said div's content is meaningful").to.not.equal(
      defaults.content.text
    );
  },
};

/**
 * Returns a set of test objects
 * @return {scenario-test-object[]} test objects for use in `testRunner`
 */
export const divTests = () => {
  return [
    {
      feature: 'Div is understandable and unique', // matches the `Feature` name in div.feature
      tests: [standardDiv],
    },
  ];
};
