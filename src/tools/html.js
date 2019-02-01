/**
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import htm from 'htm';
import { createElement, createExpected } from './createElement';

export const html = htm.bind(createElement);
export const spec = htm.bind(createExpected);
