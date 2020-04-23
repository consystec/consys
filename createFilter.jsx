const createFilter = (name, value) => {
  if (!value)
  {
    return;
  }
  var filter = {};
  filter[name] = {filter: value, type: 5};
  return filter;
};
export default createFilter;