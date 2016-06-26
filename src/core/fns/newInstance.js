//-------------------------------------------------------------------------------
// Function
//-------------------------------------------------------------------------------
  
/**
 * @param {function(new:T)} constructor
 * @param {...*}
 * @return {T}
 * @template {T}
 */
export default function newInstance(constructor) {
  function Farce(args) {
    return Function.prototype.apply.call(constructor, this, args);
  }

  Farce.prototype = constructor.prototype;
  return new Farce(arguments);
}
