/**
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */
import { JSDOM } from 'jsdom';
import { TestRunner, Itter, GetContext } from '../feature-describe-it';
import { FixtureTests } from './fixtures/button-requirements';

/**
 * Variable representing a demo of a component
 *
 * @todo the HTML should be pulled in from a static HTML file (path.join(__dirname, 'fixtures/button.html'))
 * @type {string}
 */
const fixtureHTML = `<button class="bx--btn bx--btn--secondary" type="button"><span>Button non-default text</span></button>`;
// this _should_ be done via a common `setupDom` function, but don't want to spend time on JSDom setup for this PR
const { document } = new JSDOM(fixtureHTML).window;

describe('TestRunner', () => {
  describe('All functions exist', () => {
    it('must have functions', () => {
      expect(TestRunner).to.exist;
      expect(TestRunner).to.be.a('function');
      expect(Itter).to.exist;
      expect(Itter).to.be.a('function');
      expect(GetContext).to.exist;
      expect(GetContext).to.be.a('function');
    });
  });

  describe('Runs a requirement test', () => {
    TestRunner(FixtureTests(), document);
  });
});
