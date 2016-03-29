//-------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------

import Interface from '../Interface';


//-------------------------------------------------------------------------------
// Declare Interface
//-------------------------------------------------------------------------------

/**
 * @interface
 */
const IClone = Interface.declare({

    //-------------------------------------------------------------------------------
    // Interface Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {boolean=} deep
     * @return {*}
     */
    clone: function(deep) {} // eslint-disable-line no-unused-vars
});


//-------------------------------------------------------------------------------
// Exports
//-------------------------------------------------------------------------------

export default IClone;
