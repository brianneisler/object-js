//-------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------

import {
    HashUtil,
    IdGenerator
} from '../util';
import {
    IClone,
    IEquals,
    IHashCode
} from './interfaces';
import Class from './Class';
import _ from 'lodash';


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
            value : null,
            writable : true,
            enumerable : false,
            configurable : false
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
        const constructor   = this.constructor;
        const cloneObject   = new constructor();
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
            this._hashCode = HashUtil.hash(this);
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
        IdGenerator.ensureId(this);
    }


    //-------------------------------------------------------------------------------
    // Static Public Methods
    //-------------------------------------------------------------------------------

    /**
     * @static
     * @param {A} value
     * @param {boolean=} deep
     * @return {A}
     * @template A
     */
    static clone(value, deep) {
        const customizer = (customValue) => {
            if (Class.doesImplement(customValue, IClone)) {
                return customValue.clone(deep);
            }
        };
        if (deep) {
            return _.cloneDeepWith(value, customizer);
        }
        return _.cloneWith(value, customizer);
    }

    /**
     * @static
     * @param {*} value
     * @param {*} other
     * @param {boolean=} deep
     * @return {boolean}
     */
    static equals(value, other, deep) {
        const customizer = (customValue, customOther) => {
            if (Class.doesImplement(customValue, IEquals)) {
                return customValue.equals(customOther, deep);
            }
        };

        if (deep) {
            return _.isEqualWith(value, other, customizer);
        } else if (Class.doesImplement(value, IEquals)) {
            return value.equals(other, deep);
        }
        return value === other;
    }

    /**
     * @static
     * @param {*} value
     * @return {number}
     */
    static hashCode(value) {
        if (Class.doesImplement(value, IHashCode)) {
            return value.hashCode();
        }
        return HashUtil.hash(value);
    }
}


//-------------------------------------------------------------------------------
// Interfaces
//-------------------------------------------------------------------------------

Class.implement(Obj, IClone);
Class.implement(Obj, IEquals);
Class.implement(Obj, IHashCode);
