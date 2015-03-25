import Factory from './factory';
import Sequence from './attributes/sequence';
import Lazy from './attributes/lazy';

export default {
  Factory: Factory,
  sequence: function(def) {
    return new Sequence(def);
  },
  lazy: function(def) {
    return new Lazy(def);
  }
};
