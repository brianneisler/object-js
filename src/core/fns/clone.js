//-------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------

import _ from 'lodash';
import doesImplement from './doesImplement';
import { IClone } from '../interfaces';


//-------------------------------------------------------------------------------
// Function
//-------------------------------------------------------------------------------

/**
 * @param {A} value
 * @param {boolean=} deep
 * @return {A}
 * @template A
 */
export default function clone(value, deep) {
  const customizer = (customValue) => {
    if (doesImplement(customValue, IClone)) {
      return customValue.clone(deep);
    }
  };
  if (deep) {
    return _.cloneDeepWith(value, customizer);
  }
  return _.cloneWith(value, customizer);
}
