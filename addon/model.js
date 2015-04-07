import extend from 'ember-cli-mirage/utils/extend';

var Model = function(attrs) {
  var _this = this;

  this.attrs = attrs;

  //Object.keys(attrs).forEach(function(attr) {
    //_this[attr] = attrs[attr];
  //});
};

Model.extend = extend;

export default Model;
