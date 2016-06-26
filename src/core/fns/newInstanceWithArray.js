//-------------------------------------------------------------------------------
// Function
//-------------------------------------------------------------------------------
 
/**
 * @param {function(new:T)} constructor
 * @param {Array<*>} args
 * @return {T}
 * @template {T}
 */
export default function newInstanceWithArray(constructor, args) {
  function Farce(moreArgs) {
    return Function.prototype.apply.call(constructor, this, moreArgs);
  }

  Farce.prototype = constructor.prototype;
  return new Farce(args);
}
