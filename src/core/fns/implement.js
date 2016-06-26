//-------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------

import _ from 'lodash';
import Class from '../Class';
import doesImplement from './doesImplement';


//-------------------------------------------------------------------------------
// Function
//-------------------------------------------------------------------------------

/**
 * @param {function(new:T)} constructor
 * @param {function(new:Implementable)} implementable
 * @template {T}
 */
export default function implement(constructor, implementable) {
  const _class = Class.get(constructor);
  if (doesImplement(constructor, implementable)) {
    throw new Error(`Interface '${implementable.getName()}' has already been implemented by 
      the class '${_class.getName()}'`);
  }
  for (const methodName in implementable.prototype) {
    if (!_.isFunction(constructor.prototype[methodName])) {
      throw new Error(`Class '${_class.getName()}' does not implement method '
        ${methodName}' of interface '${implementable.getInterface().getName()}'`);
    }
  }
  _class.getInterfaces().push(implementable.getInterface());
}
