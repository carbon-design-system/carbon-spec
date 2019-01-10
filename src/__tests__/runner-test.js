/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { createRunner } from '../runner';

describe('createRunner', () => {
  it('should call beforeEach and afterEach for each rule check', () => {
    const calls = [];
    const beforeEach = jest.fn(() => {
      calls.push('before');
    });
    const afterEach = jest.fn(() => {
      calls.push('after');
    });
    const runner = createRunner([
      {
        context: {},
        validate: jest.fn(() => {
          calls.push('validate');
        }),
      },
    ]);

    runner.beforeEach(beforeEach);
    runner.afterEach(afterEach);

    runner.run();
    expect(calls).toEqual(['before', 'validate', 'after']);
  });
});
