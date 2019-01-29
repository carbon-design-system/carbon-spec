/**
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Template configuration generate functions for Button component
 * @module button/generate
 */
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';

// TODO JSDoc
export function generate(options) {
  let opts = merge(
    {
      element: 'button',
      content: 'Button',
      attributes: {},
      disabled: false,
      type: 'button',
      tabIndex: 0,
      variant: 'primary',
    },
    options
  );

  const selectors = cloneDeep(this.selectors);

  let config = {
    root: {},
  };

  Object.keys(selectors.default).forEach(element => {
    config = merge(config, {
      [element]: {
        attributes: {},
        classNames: selectors.default[element],
      },
    });
  });

  // Element

  config.root.element = opts.element;

  // Content

  config.root.content = opts.content;

  // Classes

  config.root.classNames += ` ${selectors.variants[opts.variant].root}`;

  if (opts.size) {
    config.root.classNames += ` ${selectors.modifiers.sizes[opts.size].root}`;
  }

  // Attributes

  if (opts.variant === 'danger') {
    config.root.attributes['aria-label'] = 'danger';
  }

  if (opts.element === 'button') {
    config.root.attributes.type = opts.type;

    if (opts.disabled) {
      config.root.attributes.disabled = '';
    }
  } else if (opts.element === 'a') {
    config.root.attributes.href = opts.href || '#';
    config.root.attributes.role = 'button';
  }

  if (config.icon) {
    config.icon.attributes['aria-hidden'] = true;
  }

  return config;
}
