/**
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Available CSS selectors for Button component
 * @module button/selectors
 */

/**
 * Button component classes
 * @typedef {object} buttonClasses
 * @property {string} root - button element
 * @property {string} content - wrapper element around button content
 * @property {string} icon - button SVG
 */

/**
 * Button component selectors
 * @typedef {object} buttonSelectors
 * @property {buttonClasses} default - default button classes
 * @property {object} variants - button variants
 * @property {buttonClasses} variants.primary - `primary` variant
 * @property {buttonClasses} variants.secondary - `secondary` variant
 * @property {buttonClasses} variants.tertiary - `tertiary` variant
 * @property {buttonClasses} variants.ghost - `ghost` variant
 * @property {buttonClasses} variants.danger - `danger` variant
 * @property {object} modifiers - style modifiers
 * @property {object} modifiers.sizes - size modifiers
 * @property {buttonClasses} modifiers.sizes.small - `small` modifier
 */
const selectors = {
  default: {
    root: 'btn',
    content: 'btn__content',
    icon: 'btn__icon',
  },
  variants: {
    primary: {
      root: 'btn--primary',
    },
    secondary: {
      root: 'btn--secondary',
    },
    tertiary: {
      root: 'btn--tertiary',
    },
    ghost: {
      root: 'btn--ghost',
    },
    danger: {
      root: 'btn--danger',
    },
  },
  modifiers: {
    sizes: {
      small: {
        root: 'btn--sm',
      },
    },
  },
};

export default selectors;
