import Ember from 'ember';
/* global jQuery */

var Factory = function() {

  this._sequence = 1;

  this.build = function() {
    var _this = this;
    var object = {};
    var attrs = this.attrs || {};

    Ember.keys(attrs).forEach(function(key) {
      var attr = attrs[key];
      var type = typeof attr;

      if (type === 'object') {
        //object[key] = attrs[key].call(attrs, _this._sequence++);
        //object[key] = attrs[key].evaluate(_this._sequence++);

        //debugger;
        attr.factory = _this;
        //var attr = new attrs[key](this);
        object[key] = attr.evaluate();
      } else {
        object[key] = attrs[key];
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
