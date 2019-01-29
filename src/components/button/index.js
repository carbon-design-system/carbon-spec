/**
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Button component
 * @module button
 */
import { prefixSelectors } from '../../tools/component/selectors';
import demo from './config/demo';
import { generate } from './config/generate';
import selectors from './config/selectors';

/**
 * Button spec
 * @param {string} prefix - selector prefix
 * @type {globalTypedefs.componentConfig}
 */
const buttonConfig = prefix => {
  const config = {
    selectors: prefixSelectors(selectors, prefix),
  };

  return {
    label: 'Button',
    demo: demo.bind(config),
    generate: generate.bind(config),
    selectors: config.selectors,
  };
};

export default buttonConfig;
