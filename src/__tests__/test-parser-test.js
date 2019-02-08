/**
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */
import * as fs from 'fs';
import * as path from 'path';
import { JSDOM } from 'jsdom';
import { TestParser, Itter, GetDomFragment } from '../test-parser';
import { divTests } from './fixtures/div-requirements';

const DIV_HTML_TO_TEST = path.join(
  __dirname,
  './fixtures/div--variant-one.html'
);

/**
 * Variable representing a HTML of a component. Includes _entire_ HTML document.
 * @type {string}
 */
const divHTML = fs.readFileSync(DIV_HTML_TO_TEST, 'utf8');

/**
 * Options when creating the window/document from the HTML that's being tested
 * @type {object}
 */
const JSDOMoptions = { resources: 'usable' };

/**
 * Adjusts global window and document to be from the HTML we're gonna test
 */
const { window } = new JSDOM(divHTML, JSDOMoptions);
global.document = window.document;

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
