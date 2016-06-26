//-------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------

import _ from 'lodash';
import ensureId from './ensureId';


//-------------------------------------------------------------------------------
// Function
//-------------------------------------------------------------------------------

/**
 * @param {*} value
 * @return {number}
 */
export default function hash(value) {
  let key = '';
  if (_.isArguments(value)) {
    ensureId(value);
    key += 'ar_' + value._internalId;
  } else if (_.isArray(value)) {
    ensureId(value);
    key += 'a_' + value._internalId;
  } else if (_.isBoolean(value)) {
    key += 'b_' + value;
  } else if (_.isDate(value)) {

    // TODO BRN: Dates are not immutable. Therefore we can run in to issues here if a Date is stored as
    // a key and then is changed later. We should rethink this and perhaps implement our own immutable
    // Date class.

    key += 'd_' + value;
  } else if (_.isError(value)) {
    ensureId(value);
    key += 'e_' + value._internalId;
  } else if (_.isFunction(value)) {
    ensureId(value);
    key += 'f_' + value._internalId;
  } else if (_.isNumber(value)) {
    key += 'n_' + value;
  } else if (_.isNaN(value)) {
    key += 'nan';
  } else if (_.isNull(value)) {
    key += 'null';
  } else if (_.isRegExp(value)) {
    ensureId(value);
    key += 'r_' + value._internalId;
  } else if (_.isSymbol(value)) {
    key += 'sy_' + value.toString();
  } else if (_.isString(value)) {
    key += 's_' + value;
  } else if (_.isUndefined(value)) {
    key += 'undefined';
  } else if (_.isObject(value)) {
    ensureId(value);
    key += 'o_' + value._internalId;
  } else {
    throw new Error('Unrecognized type to hash: ' + value);
  }

  let result = 0;
  if (key.length === 0) {
    return result;
  }
  for (let i = 0, size = key.length; i < size; i++) {
    const charCode = key.charCodeAt(i);
    result = ((result << 5) - result) + charCode;
    result = result & result; // Convert to 32bit integer
  }
  return result;
}
