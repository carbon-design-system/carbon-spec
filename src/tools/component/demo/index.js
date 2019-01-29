/**
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Turns a nested object of component examples in to a flattened array to be used by Fractal
 * @param {object} types - object that contains component examples grouped by type
 * @returns {globalTypedefs.fractalDemo[]} - flattened array of Fractal variants
 */
export function flattenDemosObject(types) {
  const variants = [];

  if (!types) {
    return variants;
  }

  Object.keys(types).forEach(type => {
    if (typeof types[type] === 'object') {
      Object.keys(types[type]).forEach(variant => {
        if (
          typeof types[type][variant] === 'object' &&
          !types[type][variant].name
        ) {
          Object.keys(types[type][variant]).forEach(modifier => {
            if (
              typeof types[type][variant][modifier] === 'object' &&
              types[type][variant][modifier].name
            ) {
              variants.push(types[type][variant][modifier]);
            }
          });
        } else if (
          typeof types[type][variant] === 'object' &&
          types[type][variant].name
        ) {
          variants.push(types[type][variant]);
        }
      });
    }
  });

  return variants;
}
