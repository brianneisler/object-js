//-------------------------------------------------------------------------------
// Function
//-------------------------------------------------------------------------------

/**
 * @param {*} value
 * @param {function(new:T)} constructor
 * @return {boolean}
 * @template {T}
 */
export default function doesExtend(value, constructor) {
  return value instanceof constructor;
}
