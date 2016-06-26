import { expect } from 'chai';
import doesImplement from '../doesImplement';
import Interface from '../../Interface';


describe('doesImplement', function() {
  describe('Plain Object', function() {
    it('returns true for plain object that implements interface methods', function() {
      const testObject = {
        a: function() {}
      };
      const TestInterface = Interface.declare({
        a: function() {}
      });
      expect(doesImplement(testObject, TestInterface)).to.be.true;
    });
    it('returns false for a plain object the does NOT implement interface methods', function() {
      const testObject = {};
      const TestInterface = Interface.declare({
        a: function() {}
      });
      expect(doesImplement(testObject, TestInterface)).to.be.false;
    });
    it('returns true for a plain object the does implements child and parent interface methods', function() {
      const testObject = {
        a: function() {},
        b: function() {}
      };
      const TestAInterface = Interface.declare({
        a: function() {}
      });
      const TestBInterface = Interface.extend(TestAInterface, {
        b: function() {}
      });
      expect(doesImplement(testObject, TestBInterface)).to.be.true;
    });
    it('returns false for a plain object the does not implement child interface methods but does implement parent methods', function() {
      const testObject = {
        a: function() {}
      };
      const TestAInterface = Interface.declare({
        a: function() {}
      });
      const TestBInterface = Interface.extend(TestAInterface, {
        b: function() {}
      });
      expect(doesImplement(testObject, TestBInterface)).to.be.false;
    });
    it('returns false for a plain object the does implement child interface methods but does NOT implement parent methods', function() {
      const testObject = {
        b: function() {}
      };
      const TestAInterface = Interface.declare({
        a: function() {}
      });
      const TestBInterface = Interface.extend(TestAInterface, {
        b: function() {}
      });
      expect(doesImplement(testObject, TestBInterface)).to.be.false;
    });
  });
});
