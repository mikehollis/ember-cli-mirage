import Factory from 'ember-cli-mirage/factory';
import FactoryRegistry from 'ember-cli-mirage/factory-registry';
import Db from 'ember-cli-mirage/db';

var registry;
var db;
module('mirage:factory-registry', {
  beforeEach: function() {
    db = new Db();
    registry = new FactoryRegistry(db);
  }
});

test('it can register a factory and build data from it', function() {
  registry.register('contact', Factory.extend({name: 'Sam'}));
  var contact = registry.create('contact');

  deepEqual(contact, {id: 1, name: 'Sam'});
});

test('it errors when attempting to building an unknown definition', function(assert) {
  throws(() => registry.create('contact'));
});

test('it supports one to one associations', function() {
  registry.register('contact', Mirage.Factory.extend({
    name: 'Sam',
    address: Mirage.hasOne('address')
  }));

  registry.register('address', Mirage.Factory.extend({
    street: '123 Way',
    city: 'Hyrule'
  }));

  var contact = registry.create('contact');

  deepEqual(contact, {
    id: 1,
    name: 'Sam',
    address: {
      id: 1,
      contact_id: 1,
      street: '123 Way',
      city: 'Hyrule'
    }
  });
  deepEqual(db.contacts, [{id: 1, name: 'Sam'}]);
  deepEqual(db.addresses, [{id: 1, contact_id: 1, street: '123 Way', city: 'Hyrule'}]);
});
