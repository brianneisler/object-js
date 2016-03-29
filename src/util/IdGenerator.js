//-------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------

import _ from 'lodash';


//-------------------------------------------------------------------------------
// Class
//-------------------------------------------------------------------------------

/**
 * @class
 */
export default class IdGenerator {

    //-------------------------------------------------------------------------------
    // Static Properties
    //-------------------------------------------------------------------------------

    static lastId = 0;


    //-------------------------------------------------------------------------------
    // Static Methods
    //-------------------------------------------------------------------------------

    /**
     * @static
     * @param {Object} obj
     */
    static ensureId(obj) {
        if (!_.has(obj, '_internalId')) {
            IdGenerator.injectId(obj);
        }
    }

    /**
     * @static
     * @return {number}
     */
    static generateId() {
        return ++IdGenerator.lastId;
    }


    //-------------------------------------------------------------------------------
    // Private Static Methods
    //-------------------------------------------------------------------------------

    /**
     * @private
     * @static
     * @param {Object} obj
     */
    static injectId(obj) {
        if (!_.has(obj, '_internalId')) {
            Object.defineProperty(obj, '_internalId', {
                value : IdGenerator.generateId(),
                writable : false,
                enumerable : false,
                configurable : false
            });
        } else {
            throw new Error('Trying to inject an id in to a object that already has one.');
        }
    }
}
