//-------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------

import IdGenerator from './IdGenerator';
import _ from 'lodash';


//-------------------------------------------------------------------------------
// Class
//-------------------------------------------------------------------------------

// NOTE BRN: We don't use the base level Class system here because our low level Object class depends on this class
// and Class depends on Object. Thus, if this class depends on Class it creates a circular dependency.

/**
 * @class
 */
export default class HashUtil {
    
    //-------------------------------------------------------------------------------
    // Static Methods
    //-------------------------------------------------------------------------------

    /**
     * @static
     * @param {*} value
     * @return {number}
     */
    static hash(value) {
        let key = '';
        if (_.isArguments(value)) {
            IdGenerator.ensureId(value);
            key += 'ar_' + value._internalId;
        } else if (_.isArray(value)) {
            IdGenerator.ensureId(value);
            key += 'a_' + value._internalId;
        } else if (_.isBoolean(value)) {
            key += 'b_' + value;
        } else if (_.isDate(value)) {

            // TODO BRN: Dates are not immutable. Therefore we can run in to issues here if a Date is stored as
            // a key and then is changed later. We should rethink this and perhaps implement our own immutable
            // Date class.

            key += 'd_' + value;
        } else if (_.isError(value)) {
            IdGenerator.ensureId(value);
            key += 'e_' + value._internalId;
        } else if (_.isFunction(value)) {
            IdGenerator.ensureId(value);
            key += 'f_' + value._internalId;
        } else if (_.isNumber(value)) {
            key += 'n_' + value;
        } else if (_.isNaN(value)) {
            key += 'nan';
        } else if (_.isNull(value)) {
            key += 'null';
        } else if (_.isRegExp(value)) {
            IdGenerator.ensureId(value);
            key += 'r_' + value._internalId;
        } else if (_.isSymbol(value)) {
            key += 'sy_' + value.toString();
        } else if (_.isString(value)) {
            key += 's_' + value;
        } else if (_.isUndefined(value)) {
            key += 'undefined';
        } else if (_.isObject(value)) {
            IdGenerator.ensureId(value);
            key += 'o_' + value._internalId;
        } else {
            throw new Error('Unrecognized type to hash: ' + value);
        }

        let hash = 0;
        if (key.length === 0) {
            return hash;
        }
        for (let i = 0, size = key.length; i < size; i++) {
            const charCode = key.charCodeAt(i);
            hash = ((hash << 5) - hash) + charCode;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };
}
