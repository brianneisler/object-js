//-------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------

import _ from 'lodash';
import Implementable from './Implementable';


//-------------------------------------------------------------------------------
// Class
//-------------------------------------------------------------------------------

/**
 * @class
 * @template {T extends Implementable}
 */
export default class Interface {

  //-------------------------------------------------------------------------------
  // Constructor
  //-------------------------------------------------------------------------------

  /**
   * @constructs
   * @param {function(new:Implementable)} implementable
   * @param {string} name
   * @param {Interface=} superinterface
   */
  constructor(implementable, name, superinterface) {

    /**
     * @private
     * @type {function(new:Implementable)}
     */
    this.implementable = implementable;

    /**
     * @private
     * @type {string}
     */
    this.name = name;

    /**
     * @private
     * @type {Interface}
     */
    this.superinterface = superinterface;
  }


  //-------------------------------------------------------------------------------
  // Getters and Setters
  //-------------------------------------------------------------------------------

  /**
   * @return {function(new:Implementable)}
   */
  getImplementable() {
    return this.implementable;
  }

  /**
   * @return {string}
   */
  getName() {
    return this.name;
  }

  /**
   * @return {Interface}
   */
  getSuperinterface() {
    return this.superinterface;
  }


  //-------------------------------------------------------------------------------
  // Public Static Methods
  //-------------------------------------------------------------------------------

  /**
   * @static
   * @param {Object.<string, function(..):*>} declaration
   * @return {function(new:Implementable)}
   */
  static declare(declaration) {
    return Interface.extend(Implementable, declaration);
  }

  /**
   * @static
   * @param {function(new:Implementable)} implementable
   * @param {Object.<string, function(..):*>} declaration
   * @return {function(new:Implementable)}
   */
  static extend(implementable, declaration) {
    if (!_.isFunction(implementable)) {
      throw new Error('implementable must be a function');
    }
    const prototype = new implementable();
    const interfaceName = declaration['_name'] || implementable.name;
    delete declaration['_name'];
    for (const name in declaration) {
      if (Object.prototype.hasOwnProperty.call(declaration, name)) {
        if (_.isFunction(declaration[name])) {
          prototype[name] = declaration[name];
        } else {
          throw new Error('Interface can only declare functions');
        }
      }
    }
    const newImplementable = function() {
    };
    newImplementable.prototype = prototype;
    newImplementable.constructor = newImplementable;
    _.assign(newImplementable, {
      getInterface: function() {
        return newImplementable._interface;
      }
    });
    const newInterface = new Interface(newImplementable, interfaceName, implementable.getInterface());
    Object.defineProperty(newImplementable, '_interface', {
      value: newInterface,
      writable: false,
      enumerable: false,
      configurable: false
    });
    Interface.implementableToInterfaceMap.set(newImplementable, newInterface);
    return newImplementable;
  }

  /**
   * @static
   * @param {function(new:T)} implementable
   * @return {Interface<T>}
   * @template {T}
   */
  static get(implementable) {
    return Interface.implementableToInterfaceMap.get(implementable);
  }


  //-------------------------------------------------------------------------------
  // Private Static Methods
  //-------------------------------------------------------------------------------

  /**
   * @private
   * @static
   * @type {WeakMap<function(new:T), Interface<T>>}
   * @template {T}
   */
  static implementableToInterfaceMap = new WeakMap();
}
