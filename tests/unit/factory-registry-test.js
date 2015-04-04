import Factory from 'ember-cli-mirage/factory';
import FactoryRegistry from 'ember-cli-mirage/factory-registry';
import Db from 'ember-cli-mirage/db';
import Mirage from 'ember-cli-mirage';

var factoryRegistry;
var modelRegistry;
var db;

module('mirage:factory-registry', {
  beforeEach: function() {
    db = new Db();
    //modelRegistry = new ModelRegsitry();
    factoryRegistry = new FactoryRegistry(db);
  }
});

test('it can register a factory and build data from it', function() {
  factoryRegistry.register('contact', Factory.extend({name: 'Sam'}));
  var contact = factoryRegistry.create('contact');

  deepEqual(contact, {id: 1, name: 'Sam'});
});

test('it errors when attempting to build an unknown definition', function(assert) {
  throws(() => factoryRegistry.create('contact'));
});

test('it supports one to one associations', function() {
  modelRegistry.register('contact');
  modelRegistry.register('address', {belongsTo: 'contacts'});
  factoryRegistry.register('contact', Factory.extend({
    name: 'Sam',
    address: Mirage.association()
  }));

  factoryRegistry.register('address', Factory.extend({
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
