//-------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------

import _ from 'lodash';
import Class from '../Class';


//-------------------------------------------------------------------------------
// Function
//-------------------------------------------------------------------------------

/**
 * @param {*} value
 * @param {function(new:Implementable)} implementable
 * @return {boolean}
 */
export default function doesImplement(value, implementable) {
  if (_.isObject(value)) {
    let _class = Class.get(value);
    if (_class.name !== 'Object') {
      while (_class) {
        for (let i = 0, size = _class.getInterfaces().length; i < size; i++) {
          const interfaceImplementable = _class.getInterfaces()[i].getImplementable();
          const implementableInstance = new interfaceImplementable();

          //NOTE BRN: This both checks for top level interfaces as well as super interfaces
          if (implementableInstance instanceof implementable) {
            return true;
          }
        }
        _class = _class.getSuperclass();
      }
    } else {
      const methods = new implementable();
      let result = true;
      _.forIn(methods, (method, name) => {
        if (!_.isFunction(value[name])) {
          result = false;
          return false;
        }
      });
      return result;
    }
  }
  return false;
}
