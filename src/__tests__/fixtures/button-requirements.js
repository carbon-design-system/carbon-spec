/**
 * @fileOverview Exporable tests for the fixture `button.html`
 */

/**
 * Button user test configurations
 * @typedef {object} buttonTestConfig
 * @property {buttonElements} selectors - CSS selectors to grab each element for a button component
 */
const defaults = {
  content: {
    text: 'Button Text',
  },
  selectors: {
    root: 'button',
    content: 'span',
  },
};

/**
 * Grabs Button component elements from a DOM
 * @param {DocumentFragment} context - JavaScript document or JSDOM fragment
 * @param {buttonElements} selectors
 * @returns {object} elements gathered from the selectors object
 */
const getButton = (context, selectors) => {
  const button = context.querySelector(selectors.root);
  const content = button.querySelector(selectors.content);

  return {
    button,
    content,
  };
};

/**
 * Very basic test for a standard button. These ensure that the Scenario "Standard button"
 *   has all of it's conditions met
 * @type {scenario-test-object}
 */
const standardButton = {
  it: 'Standard button',
  getResults: (context = document) =>
    new Promise(resolve => {
      const component = getButton(context, defaults.selectors);

      resolve({
        html: component.button.innerHTML,
        content: component.content.textContent.trim(),
        classes: component.button.classList.value,
      });
    }),
  comparison: results => {
    // see ./button.feature file for Scenario "Standard button"
    expect(results.html, "I find said button's content").to.not.be.empty;
    expect(results.content, 'said content includes text').to.not.be.empty;
    expect(results.content, "said button's content is meaningful").to.not.equal(
      defaults.content.text
    );
  },
};

/**
 * Returns a set of test objects
 * @return {scenario-test-object[]} test objects for use in `testRunner`
 */
export const FixtureTests = () => {
  return [standardButton];
};
