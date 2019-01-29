/**
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Configuration for the Button component
 * @module button/demo
 */
import startCase from 'lodash/startCase';
import { generate } from './generate';

/**
 * Creates a button template configuration for a variant
 * @returns {globalTypedefs.fractalDemo} fractal demo object
 */
const variantButtons = function() {
  const variants = {};

  Object.keys(this.selectors.variants).forEach(variant => {
    variants[variant] = {
      name: variant,
      label: startCase(variant),
      context: generate.apply(this, [
        {
          variant,
        },
      ]),
    };
  });

  return variants;
};

/**
 * Modifier: Anchor
 * @returns {globalTypedefs.fractalDemo} fractal demo object
 */
const anchorButton = function() {
  return {
    name: 'anchor',
    label: 'Anchor',
    context: generate.apply(this, [
      {
        element: 'a',
      },
    ]),
  };
};

/**
 * Modifier: Small
 * @returns {globalTypedefs.fractalDemo} fractal demo object
 */
const smallButton = function() {
  return {
    name: 'small',
    label: 'Small',
    context: generate.apply(this, [
      {
        size: 'small',
      },
    ]),
  };
};

/**
 * State: Disabled
 * @returns {globalTypedefs.fractalDemo} fractal demo object
 */
const disabledButton = function() {
  return {
    name: 'disabled',
    label: 'Disabled',
    context: generate.apply(this, [
      {
        disabled: true,
      },
    ]),
  };
};

export default function demo() {
  return {
    variants: variantButtons.apply(this),
    modifiers: {
      types: {
        anchor: anchorButton.apply(this),
      },
      sizes: {
        small: smallButton.apply(this),
      },
    },
    states: {
      disabled: disabledButton.apply(this),
    },
  };
}
