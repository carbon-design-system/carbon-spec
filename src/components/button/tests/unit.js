/**
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import buttonConfig from '../';

describe('Button', () => {
  it('Generates a button', () => {
    const button = buttonConfig('bx');
    const myButton = button.generate({
      disabled: true,
      size: 'small',
      variant: 'danger',
    });

    console.log(JSON.stringify(button.label, null, 2));

    console.log(JSON.stringify(button.demo(), null, 2));

    console.log(JSON.stringify(myButton, null, 2));

    console.log(JSON.stringify(button.selectors, null, 2));

    expect(true).toEqual(true);
  });
});
