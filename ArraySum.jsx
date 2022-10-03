Array.prototype.sum = function (prop) {
  var total = 0
  for (var i = 0, len = this.length; i < len; i++) {
    if (typeof this[i] !== 'undefined' && typeof this[i][prop] !== 'undefined')
      total += this[i][prop]
  }
  return total;
}