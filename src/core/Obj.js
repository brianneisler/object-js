//-------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------

import _ from 'lodash';
import { ensureId, hash } from '../util';
import { implement } from './fns';
import { IClone, IEquals, IHashCode } from './interfaces';


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

/**
 * @class
 * @implements {IClone}
 * @implements {IEquals}
 * @implements {IHashCode}
 */
export default class Obj {

  //-------------------------------------------------------------------------------
  // Constructor
  //-------------------------------------------------------------------------------

  /**
   * @constructs
   */
  constructor() {
    Object.defineProperty(this, '_hashCode', {
      value: null,
      writable: true,
      enumerable: false,
      configurable: false
    });
    this.generateInternalId();
  }


  //-------------------------------------------------------------------------------
  // Getters and Setters
  //-------------------------------------------------------------------------------

  /**
   * @return {number}
   */
  getInternalId() {
    if (!this._internalId) {
      this.generateInternalId();
    }
    return this._internalId;
  }


  //-------------------------------------------------------------------------------
  // IClone Implementation
  //-------------------------------------------------------------------------------

  /**
   * @param {boolean=} deep
   * @return {*}
   */
  clone(deep) {
    const constructor = this.constructor;
    const cloneObject = new constructor();
    _.forIn(this, (key, value) => {
      if (!_.isFunction(value)) {
        if (deep) {
          cloneObject[key] = Obj.clone(value, deep);
        } else {
          cloneObject[key] = value;
        }
      }
    });
    return cloneObject;
  }


  //-------------------------------------------------------------------------------
  // IEquals Implementation
  //-------------------------------------------------------------------------------

  /**
   * If two Objs are equal then they MUST return the same hashCode. Otherwise the world will end!
   * @param {*} value
   * @return {boolean}
   */
  equals(value) {
    return _.get(value, '_internalId') === this.getInternalId();
  }


  //-------------------------------------------------------------------------------
  // IHashCode Implementation
  //-------------------------------------------------------------------------------

  /**
   * Equal hash codes do not necessarily guarantee equality.
   * @return {number}
   */
  hashCode() {
    if (!this._hashCode) {
      this._hashCode = hash(this);
    }
    return this._hashCode;
  }


  //-------------------------------------------------------------------------------
  // Protected Methods
  //-------------------------------------------------------------------------------

  /**
   * @protected
   */
  generateInternalId() {
    ensureId(this);
  }
}


//-------------------------------------------------------------------------------
// Interfaces
//-------------------------------------------------------------------------------

implement(Obj, IClone);
implement(Obj, IEquals);
implement(Obj, IHashCode);
