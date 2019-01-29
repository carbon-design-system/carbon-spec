/**
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cloneDeep from 'lodash/cloneDeep';

/**
 * Applies a prefix to every class name in an object.
 * @param {object} selectors - object with class name values
 * @param {string} prefix - prepended with `--` to every class name
 * @returns {object} - modified selectors object
 */
export function prefixSelectors(selectors, prefix) {
  selectors = cloneDeep(selectors || {});

  if (prefix) {
    selectors = JSON.parse(
      JSON.stringify(selectors).replace(/:"/g, `:"${prefix}--`)
    );
  }

  return selectors;
}
