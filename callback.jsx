import uuid from 'consys/uuid';

function callbackRemove(that, name, id) {
  let removeId = -1;
  for (var i = 0; i < that[name + 'Callback'].length; i++) {
    if (that[name + 'Callback'][i].id == id) {
      removeId = i;
    }
  }
  if (removeId > -1) {
    that[name + 'Callback'].splice(removeId, 1);
  }
}
function callbackCreate(that, name, callback) {
  if (!that[name + 'Callback']) {
    that[name + 'Callback'] = [];
  }
  const id = uuid();
  that[name + 'Callback'].push({
    id,
    callback
  });
  return id;
}
function callbackCall(that, name, item) {
  if (!that[name + 'Callback']) {
    return;
  }
  for (var i = 0; i < that[name + 'Callback'].length; i++) {
    that[name + 'Callback'][i].callback(item);
  }
}
export { callbackCall, callbackCreate, callbackRemove };