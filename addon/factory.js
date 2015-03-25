/* global jQuery */
import Ember from 'ember';
import Sequence from './attributes/sequence';
import Lazy from './attributes/lazy';

var Factory = function() {

  this._sequence = 1;

  this.build = function() {
    var _this = this;
    var object = {};
    var attrs = this.attrs || {};

    Ember.keys(attrs).forEach(function(key) {
      var attr = attrs[key];
      var type = typeof attr;

      switch (attr.constructor) {
        case Sequence:
          attr.factory = _this;
          object[key] = attr.evaluate();
          break;

        case Lazy:
          attr.factory = _this;
          object[key] = attr.evaluate();
          break;

        case Function:
          object[key] = attr.call(attrs);
          break;

        default:
          object[key] = attr;
          break;
      }
    });

    this._sequence++;

    return object;
  };

};

Factory.extend = function(attrs) {
  // Merge the new attributes with existing ones. If conflict, new ones win.
  var newAttrs = jQuery.extend(true, {}, this.attrs, attrs);

  var Subclass = function() {
    this.attrs = newAttrs;
    Factory.call(this);
  };

  // Copy extend
  Subclass.extend = Factory.extend;

  // Store a reference on the class for future subclasses
  Subclass.attrs = newAttrs;

  return Subclass;
};

export default Factory;
