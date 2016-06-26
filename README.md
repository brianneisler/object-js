object-js
=============

Low level Object design for ES6


## Benefits
- easy hashCode and equals hooks for determining equality between two instances


## Build Status

[![npm version](https://badge.fury.io/js/object-js.svg)](https://badge.fury.io/js/object-js)<br />
[![Build Status](https://travis-ci.org/brianneisler/object-js.svg)](https://travis-ci.org/brianneisler/object-js)<br />
[![NPM](https://nodei.co/npm/object-js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/object-js/)


## Install

```js
npm install --save object-js
```

## Usage

```js
import js, { Obj } from 'object-js';

class Thing extends Obj {

  constructor(prop) {
    this.prop = prop;
  }
  
  equals(value) {
    return js.doesExtend(value, Thing) && value.prop === this.prop; 
  }

  hashCode() {
    if (!this._hashCode) {
      this._hashCode = js.hash(this.prop);
    }
    return this._hashCode;
  }
}


const thing1 = new Thing('abc');
const thing2 = new Thing('abc');
const thing3 = new Thing('bcd');

js.equals(thing1, thing2)   // true
js.equals(thing2, thing3)   // false

```
