export default function(f) {

  this.evaluate = function(i) {
    var result = f.call(this, this.factory._sequence);

    return result;
  };

  return this;
}
