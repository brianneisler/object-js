//-------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------

import _ from 'lodash';


//-------------------------------------------------------------------------------
// Declare Class
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
        this.constructor    = constructor;

        /**
         * @private
         * @type {Array.<Interface>}
         */
        this.interfaces     = interfaces;

        /**
         * @private
         * @type {string}
         */
        this.name           = name || "";

        /**
         * @private
         * @type {Class}
         */
        this.superclass     = superclass || null;
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
     * @param {function(new:T)} constructor
     * @return {boolean}
     * @template {T}
     */
    static doesExtend(value, constructor) {
        return value instanceof constructor;
    }

    /**
     * @static
     * @param {*} value
     * @param {function(new:Implementable)} implementable
     * @return {boolean}
     */
    static doesImplement(value, implementable) {
        if (_.isObject(value)) {
            let _class = Class.get(value);
            while(_class) {
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
        }
        return false;
    }

    /**
     * @static
     * @param {*} value
     * @returns {Class.<T>}
     * @template {T}
     */
    static get(value) {
        let _class          = null;
        let constructor     = null;
        let prototype       = null;
        let superclass      = null;
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
                superclass = Class.get(_.get(superPrototype, 'constructor'))
            }
            _class = new Class(constructor, [], prototype._name || constructor.name, superclass);
            Class.constructorToClassMap.set(constructor, _class);
        }
        return _class;
    }

    /**
     * @static
     * @param {function(new:T)} constructor
     * @param {function(new:Implementable)} implementable
     * @template {T}
     */
    static implement(constructor, implementable) {
        const _class = Class.get(constructor);
        if (Class.doesImplement(constructor, implementable)) {
            throw new Error("Interface '" + implementable.getName() + "' has already been implemented by " +
                "the class '" + _class.getName() + "'");
        }
        for (let methodName in implementable.prototype) {
            if (!_.isFunction(constructor.prototype[methodName])) {
                throw new Error("Class '" + _class.getName() + "' does not implement method '" +
                    methodName + "' of interface '" + implementable.getInterface().getName() + "'");
            }
        }
        _class.getInterfaces().push(implementable.getInterface());
    }

    /**
     * @static
     * @param {function(new:T)} constructor
     * @param {...*}
     * @return {T}
     * @template {T}
     */
    static newInstance = function(constructor) {
        function F(args) {
            return Function.prototype.apply.call(constructor, this, args);
        }
        F.prototype = constructor.prototype;
        return new F(arguments);
    };

    /**
     * @static
     * @param {function(new:T)} constructor
     * @param {Array<*>} args
     * @return {T}
     * @template {T}
     */
    static newInstanceWithArray(constructor, args) {
        function F(args) {
            return Function.prototype.apply.call(constructor, this, args);
        }
        F.prototype = constructor.prototype;
        return new F(args);
    }

    /**
     * @static
     * @param {function(new:T)} constructor
     * @param {Object} declaration
     * @template {T}
     */
    static static(constructor, declaration) {
        _.assign(constructor, declaration);
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
