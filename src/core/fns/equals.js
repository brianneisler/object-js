//-------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------

import _ from 'lodash';
import { IEquals } from '../interfaces';
import doesImplement from './doesImplement';


//-------------------------------------------------------------------------------
// Function
//-------------------------------------------------------------------------------

/**
 * @param {*} value
 * @param {*} other
 * @param {boolean=} deep
 * @return {boolean}
 */
export default function equals(value, other, deep) {
  const customizer = (customValue, customOther) => {
    if (doesImplement(customValue, IEquals)) {
      return customValue.equals(customOther, deep);
    }
  };

  if (deep) {
    return _.isEqualWith(value, other, customizer);
  } else if (doesImplement(value, IEquals)) {
    return value.equals(other, deep);
  }
  return value === other;
}
