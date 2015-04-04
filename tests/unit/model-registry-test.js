import ModelRegistry from 'ember-cli-mirage/model-registry';

module('mirage:model-registry');

test('it can be instantiated', function(assert) {
  var modelRegistry = new ModelRegistry();
  assert.ok(modelRegistry);
});

test('it can be instantiated', function(assert) {
  var modelRegistry = new ModelRegistry();

  modelRegistry.create('user');
});
