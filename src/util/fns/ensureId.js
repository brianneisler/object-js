//-------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------

import _ from 'lodash';
import generateId from './generateId';


//-------------------------------------------------------------------------------
// Function
//-------------------------------------------------------------------------------

/**
 * @param {Object} obj
 */
export default function ensureId(obj) {
  if (!_.has(obj, '_internalId')) {
    Object.defineProperty(obj, '_internalId', {
      value: generateId(),
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
}
