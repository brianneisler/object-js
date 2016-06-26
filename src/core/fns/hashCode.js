//-------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------
 
import doesImplement from './doesImplement';
import { IHashCode } from '../interfaces';
import { hash } from '../../util';


//-------------------------------------------------------------------------------
// Function
//-------------------------------------------------------------------------------
 
/**
 * @param {*} value
 * @return {number}
 */
export default function hashCode(value) {
  if (doesImplement(value, IHashCode)) {
    return value.hashCode();
  }
  return hash(value);
}
