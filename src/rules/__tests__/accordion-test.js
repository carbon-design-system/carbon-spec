/**
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment jsdom
 */

import { rules } from '../accordion';
import { createRunner } from '../../runner';
import { html } from '../../tools/html';

describe('accordion', () => {
  describe('accordion.html', () => {
    let runner;

    beforeEach(() => {
      runner = createRunner(rules, {
        only: ['accordion.html'],
      });
      runner.beforeEach(context => {
        const children = context.children.map(
          (child, i) => html`
            <li class="bx--accordion__item">
              <button
                class="bx--accordion__heading"
                aria-expanded="false"
                aria-controls="${`item-${i}`}"
              >
                <svg class="bx--accordion__arrow"></svg>
                <div class="bx--accordion__title">${child.header}</div>
              </button>
              <div id="${`item-${i}`}" class="bx--accordion__content">
                ${child.panel}
              </div>
            </li>
          `
        );
        const node = html`
          <ul class="bx--accordion">
            ${children}
          </ul>
        `;
        document.body.appendChild(node);
        return node;
      });
      runner.afterEach(node => {
        node.parentNode.removeChild(node);
      });
    });

    it('should warn about an HTML mismatch', async () => {
      runner.beforeEach(() => {
        const node = html`
          <ul class="bx--accordion"></ul>
        `;
        document.body.appendChild(node);
        return node;
      });

      const violations = await runner.run();
      expect(violations.length > 0).toBe(true);
    });

    it('should validate ids correctly', async () => {
      runner.beforeEach(context => {
        const children = context.children.map(
          (child, i) => html`
            <li class="bx--accordion__item">
              <button
                class="bx--accordion__heading"
                aria-expanded="false"
                aria-controls="${`item-${i}`}"
              >
                <svg class="bx--accordion__arrow"></svg>
                <div class="bx--accordion__title">${child.header}</div>
              </button>
              <div class="bx--accordion__content">${child.panel}</div>
            </li>
          `
        );
        const node = html`
          <ul class="bx--accordion">
            ${children}
          </ul>
        `;
        document.body.appendChild(node);
        return node;
      });
      const violations = await runner.run();
      expect(violations.length > 0).toBe(true);
      expect(violations).toMatchInlineSnapshot(`
Array [
  [Error: Expected the value for \`aria-controls\` to match the id of the panel. Expected \`"item-0"\`],
]
`);
    });
  });

  describe('accordion.header.mouse', () => {
    let runner;

    beforeEach(() => {
      runner = createRunner(rules, {
        only: ['accordion.header.mouse'],
      });
      runner.beforeEach(context => {
        const children = context.children.map(
          (child, i) => html`
            <li class="bx--accordion__item">
              <button
                class="bx--accordion__heading"
                aria-expanded="false"
                aria-controls="${`item-${i}`}"
              >
                <svg class="bx--accordion__arrow"></svg>
                <div class="bx--accordion__title">${child.header}</div>
              </button>
              <div id="${`item-${i}`}" class="bx--accordion__content">
                ${child.panel}
              </div>
            </li>
          `
        );
        const node = html`
          <ul class="bx--accordion">
            ${children}
          </ul>
        `;
        document.body.appendChild(node);
        return node;
      });
      runner.afterEach(node => {
        node.parentNode.removeChild(node);
      });
    });

    it('should verify aria attributes', async () => {
      const violations = await runner.run();
      expect(violations.length > 0).toBe(true);
      expect(violations).toMatchInlineSnapshot(`
Array [
  [Error: Expected aria-expanded to be true after the heading is clicked],
]
`);
    });
  });
});
