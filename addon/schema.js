import { pluralize } from './utils/inflector';

// repo.users.create({});
// cache.users.create({});

// schema.create('user', {name: 'Link'})
// schema.all('user')
// schema.find('user', 1)
// schema.find('user', [1, 2, 3])
// schema.where('user', {admin: true})

// schema.user.create({});
// schema.user.all();
// schema.user.find(1);
// schema.user.where({admin: true});
// schema.user.update(1, {admin: true});

export default function(db) {

  this.db = db;
  this._registry = {};

  this.register = function(type, typeClass) {
    var _this = this;

    this._registry[type] = typeClass;

    this[type] = {
      create: this._create.bind(this, type),
      all: this._all.bind(this, type),
      find: this._find.bind(this, type)
    };

    return this;
  };

  this._create = function(type, attrs) {
    var collection = pluralize(type);

    if (!this.db[collection]) {
      db.createCollection(collection);
    }

    var augmentedAttrs = this.db[collection].insert(attrs);

    var instance = new this._registry[type](augmentedAttrs);

    return instance;
  },

  this._all = function(type) {
    var collection = pluralize(type);
    var data = db[collection];
    var ModelClass = this._registry[type];
    var models = [];

    data.forEach(function(attrs) {
      models.push(new ModelClass(attrs));
    });

    return models;
  },

  this._find = function(type, ids) {
    var collection = pluralize(type);
    if (!db[collection]) {
      return null;
    }
    var attrs = db[collection].find(ids);
    var ModelClass = this._registry[type];

    return new ModelClass(attrs);
  }


};
