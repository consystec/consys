function FakePromise() {
  return {
    __resolve: false,
    __reject: false,
    then(resolve, reject) {
      this.__resolve = resolve;
      this.__reject = reject;
    },
    cancel() {
      this.__resolve = false;
      this.__reject = false;
    }
  }
}

function Promises() {
  const __promises = [];
  function promise() {
    const prom = new FakePromise();
    __promises.push(prom);
    return prom;
  }
  function resolve(value) {
    const promises = __promises;
    for (var i = 0; i < promises.length; i++) {
      promises[i].__resolve && promises[i].__resolve(value);
    }
  }
  function reject(value) {
    const promises = __promises;
    for (var i = 0; i < promises.length; i++) {
      promises[i].__reject && promises[i].__reject(value);
    }
  }

  return {
    promise,
    resolve,
    reject
  };
}
export default Promises;