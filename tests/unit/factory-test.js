import Mirage from 'ember-cli-mirage';

import {module, test} from 'qunit';

module('mirage:factory');

test('it exists', function() {
  ok(Mirage.Factory);
});

test('the base class builds empty objects', function() {
  var f = new Mirage.Factory();
  var data = f.build();

  assert.deepEqual(data, {});
});

test('a noop extension builds empty objects', function() {
  var EmptyFactory = Mirage.Factory.extend();
  var f = new EmptyFactory();
  var data = f.build();

  deepEqual(data, {});
});

test('it works with strings, numbers and booleans', function() {
  var AFactory = Mirage.Factory.extend({
    name: 'Sam',
    age: 28,
    alive: true
  });

  var f = new AFactory();
  var data = f.build();

  deepEqual(data, {name: 'Sam', age: 28, alive: true});
});

test('it can use sequences', function() {
  var PostFactory = Mirage.Factory.extend({
    likes: Mirage.sequence(i => 5*i)
  });

  var p = new PostFactory();
  var post1 = p.build();
  var post2 = p.build();

  deepEqual(post1, {likes: 5});
  deepEqual(post2, {likes: 10});
});


test('it can lazily calculate expressions ', function() {
  var Factory = Mirage.Factory.extend({
    value: Mirage.lazy(() => {
      return 1 + 1;
    })
  });
  var factory = new Factory();

  var obj = factory.build();

  deepEqual(obj, {value: 2});
});

test('it can lazily calculate expressions that depend on other attrs', function() {
  var Factory = Mirage.Factory.extend({
    index: Mirage.sequence(i => 2*i),
    value: Mirage.lazy('index', (index) => {
      return index + 1;
    })
  });
  var factory = new Factory();

  var obj1 = factory.build();
  var obj2 = factory.build();

  deepEqual(obj1, {index: 2, value: 3});
  deepEqual(obj2, {index: 4, value: 5});
});

//test('it supports inheritance', function() {
  //var PersonFactory = Factory.extend({
    //species: 'human'
  //});
  //var ManFactory = PersonFactory.extend({
    //gender: 'male'
  //});
  //var SamFactory = ManFactory.extend({
    //name: 'Sam'
  //});

  //var p = new PersonFactory();
  //var m = new ManFactory();
  //var s = new SamFactory();

  //deepEqual(p.build(), {species: 'human'});
  //deepEqual(m.build(), {species: 'human', gender: 'male'});
  //deepEqual(s.build(), {species: 'human', gender: 'male', name: 'Sam'});
//});

////test('it supports associations', function() {
  ////var UserFactory = Factory.extend({
    ////name: function(i) {
      ////return "Person " + i;
    ////},
    ////addresses: hasMany(AddressFactory)
    ////hasMany: 'addresses'
  ////});

  ////var AddressFactory = Factory.extend({
    ////street: function(i) {
      ////return i + ' st.';
    ////}
  ////});
////});

