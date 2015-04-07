import { pluralize } from './utils/inflector';

export default function(db) {

  this.db = db;
  this._registry = {};

  this.register = function(type, typeClass) {
    this._registry[type] = typeClass;
  };

  this.create = function(type, attrs) {
    var collection = pluralize(type);

    if (!this.db[collection]) {
      db.createCollection(collection);
    }

    var augmentedAttrs = this.db[collection].insert(attrs);

    var instance = new this._registry[type](augmentedAttrs);

    return instance;
  }

};
