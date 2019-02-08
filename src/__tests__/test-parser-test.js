/**
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */
import { JSDOM } from 'jsdom';
import { TestParser, Itter, GetDomFragment } from '../test-parser';
import { divTests } from './fixtures/div-requirements';

/**
 * Variable representing a demo of a component
 *
 * @todo the HTML should be pulled in from a static HTML file (path.join(__dirname, 'fixtures/div--variant-one.html'))
 * @type {string}
 */
const divHTML = `<div class="bx--meow bx--meow--variant-one"><span>Meow unique text</span></div>`;

// this _should_ be done on a per-variant-demo-file basis via a common `setupDom` function,
//    but don't want to spend time on JSDom setup for this PR
const { document } = new JSDOM(divHTML).window;

describe('TestParser', () => {
  describe('All functions exist', () => {
    it('must have functions', () => {
      expect(TestParser).to.exist;
      expect(TestParser).to.be.a('function');
      expect(Itter).to.exist;
      expect(Itter).to.be.a('function');
      expect(GetDomFragment).to.exist;
      expect(GetDomFragment).to.be.a('function');
    });
  });

  describe('Runs fixture requirement tests', () => {
    TestParser(divTests(), document);
  });
});
