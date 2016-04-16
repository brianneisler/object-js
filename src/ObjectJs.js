//-------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------

import {
    Class,
    Obj
} from './core';


//-------------------------------------------------------------------------------
// Class
//-------------------------------------------------------------------------------

/**
 * @class
 */
export default class ObjectJs {

    //-------------------------------------------------------------------------------
    // Static Methods
    //-------------------------------------------------------------------------------

     /**
     * @static
     * @param {A} value
     * @param {boolean=} deep
     * @return {A}
     * @template A
     */
    static clone(value, deep) {
        return Obj.clone(value, deep);
    }

    /**
     * @static
     * @param {*} value
     * @param {function(new:T)} constructor
     * @return {boolean}
     * @template {T}
     */
    static doesExtend(value, constructor) {
        return Class.doesExtend(value, constructor);
    }
    
    /**
     * @static
     * @param {*} value
     * @param {function(new:Implementable)} implementable
     * @return {boolean}
     */
    static doesImplement(value, implementable) {
        return Class.doesImplement(value, implementable);
    }
    
    /**
     * @static
     * @param {*} value
     * @param {*} other
     * @param {boolean=} deep
     * @return {boolean}
     */
    static equals(value, other, deep) {
        return Obj.equals(value, other, deep);
    }

    /**
     * @static
     * @param {*} value
     * @return {number}
     */
    static hashCode(value) {
        return Obj.hashCode(value);
    }
    
    /**
     * @static
     * @param {function(new:T)} constructor
     * @param {function(new:Implementable)} implementable
     * @template {T}
     */
    static implement(constructor, implementable) {
        return Class.implement(constructor, implementable); 
    }
}
