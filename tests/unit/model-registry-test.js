import ModelRegistry from 'ember-cli-mirage/model-registry';
import Model from 'ember-cli-mirage/model';
import Db from 'ember-cli-mirage/db';

module('mirage:model-registry');

test('it can be instantiated', function(assert) {
  var modelRegistry = new ModelRegistry(new Db());
  assert.ok(modelRegistry);
});

test('it can create registered models', function(assert) {
  var User = Model.extend();
  var modelRegistry = new ModelRegistry(new Db());

  modelRegistry.register('user', User);
  var user = modelRegistry.create('user', {name: 'Link'});

  assert.ok(user instanceof Model);
  assert.ok(user instanceof User);
  assert.deepEqual(user.attrs, {id: 1, name: 'Link'});
});

//test('it respects passed in attrs', function(assert) {
  //var modelRegistry = new ModelRegistry(new Db());

  //var User = Model.extend();
  //modelRegistry.register('user', User);
  //var user = modelRegistry.create('user', {name: 'Link'});

  //assert.deepEqual(user, {id: 1, name: 'Link'});
  //assert.equal(user.constructor, User);
//});

//test('it respects passed in attrs', function(assert) {
  //var modelRegistry = new ModelRegistry(new Db());

  //modelRegistry.register('user', Model.extend());
  //reg.find('user', 1);
  //reg.users
  //var user = modelRegistry.create('user', {name: 'Link'});

  //assert.deepEqual(user, {id: 1, name: 'Link'});
//});

