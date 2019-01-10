/**
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ValidationError } from './error';
import { rules } from './rules';

/**
 * @typedef Runner
 * @property {Function} beforeEach
 * @property {Function} afterEach
 * @property {Function} run
 */

/**
 * Create a runner for the given collection of rules
 * @param {Array<Rule>} rules
 * @return Runner
 */
export function createRunner(rules) {
  let _beforeEach;
  let _afterEach;
  return {
    beforeEach(fn) {
      _beforeEach = fn;
    },
    afterEach(fn) {
      _afterEach = fn;
    },
    run() {
      const violations = [];

      for (const rule of rules) {
        const node = _beforeEach(rule.context);
        const result = rule.validate(node, rule.context);

        if (result instanceof ValidationError) {
          violations.push(result);
        }

        _afterEach(node);
      }

      return violations;
    },
  };
}

export const Runner = createRunner(rules);
