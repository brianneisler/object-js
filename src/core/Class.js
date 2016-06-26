//-------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------

import _ from 'lodash';


//-------------------------------------------------------------------------------
// Class
//-------------------------------------------------------------------------------

/**
 * @class
 * @template {T}
 */
export default class Class {

  //-------------------------------------------------------------------------------
  // Constructor
  //-------------------------------------------------------------------------------

  /**
   * @constructs T
   * @param {function(new:T)} constructor
   * @param {Array.<Interface>} interfaces
   * @param {string} name
   * @param {Class} superclass
   * @template {T}
   */
  constructor(constructor, interfaces, name, superclass) {

    /**
     * @private
     * @type {function(new:T)}
     */
    this.constructor = constructor;

    /**
     * @private
     * @type {Array.<Interface>}
     */
    this.interfaces = interfaces;

    /**
     * @private
     * @type {string}
     */
    this.name = name || '';

    /**
     * @private
     * @type {Class}
     */
    this.superclass = superclass || null;
  }


  //-------------------------------------------------------------------------------
  // Getters and Setters
  //-------------------------------------------------------------------------------

  /**
   * @return {function(new:T)}
   */
  getConstructor() {
    return this.constructor;
  }

  /**
   * @return {Array<Interface>}
   */
  getInterfaces() {
    return this.interfaces;
  }

  /**
   * @return {string}
   */
  getName() {
    return this.name;
  }

  /**
   * @return {Class}
   */
  getSuperclass() {
    return this.superclass;
  }


  //-------------------------------------------------------------------------------
  // Public Methods
  //-------------------------------------------------------------------------------

  /**
   * @param {Array<*>=} args
   * @return {T}
   */
  apply(args) {
    return this.newInstanceWithArray(args);
  }

  /**
   * @param {...*} args
   * @return {T}
   */
  call() {
    return this.newInstanceWithArray(arguments);
  }

  /**
   * @param {...*} args
   * @return {T}
   */
  newInstance() {
    const constructor = this.getConstructor();
    return constructor.newInstanceWithArray(arguments);
  }

  /**
   * @param {Array<*>=} args
   * @return {T}
   */
  newInstanceWithArray(args) {
    const constructor = this.getConstructor();
    return constructor.newInstanceWithArray(args);
  }


  //-------------------------------------------------------------------------------
  // Public Static Methods
  //-------------------------------------------------------------------------------

  /**
   * @static
   * @param {*} value
   * @returns {Class.<T>}
   * @template {T}
   */
  static get(value) {
    let _class = null;
    let constructor = null;
    let prototype = null;
    let superclass = null;
    if (_.isFunction(value)) {
      constructor = value;
      prototype = constructor.prototype;
    } else {
      prototype = Object.getPrototypeOf(value);
      constructor = prototype.constructor;
    }
    _class = Class.constructorToClassMap.get(constructor);
    if (!_class) {
      const superPrototype = Object.getPrototypeOf(prototype);
      if (superPrototype) {
        superclass = Class.get(_.get(superPrototype, 'constructor'));
      }
      _class = new Class(constructor, [], prototype._name || constructor.name, superclass);
      Class.constructorToClassMap.set(constructor, _class);
    }
    return _class;
  }



  //-------------------------------------------------------------------------------
  // Private Static Methods
  //-------------------------------------------------------------------------------

  /**
   * @private
   * @static
   * @type {WeakMap<function(new:T), Class<T>>}
   * @template {T}
   */
  static constructorToClassMap = new WeakMap();
}
