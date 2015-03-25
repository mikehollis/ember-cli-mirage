import Factory from 'ember-cli-mirage/factory';

module('mirage:factory-registry');

test('it exists', function() {
  ok(Factory);
});

test('it can register a definition and build data from it', function() {
  var factory = new Factory();

  factory.register('contact', {
    name: 'Sam'
  });

  var contact = factory.build('contact');
  deepEqual(contact, {name: 'Sam'});
});

test('it errors when attempting to building an unknown definition', function(assert) {
  var factory = new Factory();

  throws(() => factory.build('contact'));
});
