import moment from 'moment';

let hasLocalStorage = localStorage;
if (hasLocalStorage) {
  let testKey = 'react-localstorage.hoc.test-key';
  try {
    localStorage.setItem(testKey,'foo');
    localStorage.removeItem(testKey);
  } catch (e) {
    hasLocalStorage = false;
  }
}

function checkRecursive(value) {
  for(let key in value) {
    if (typeof value[key] === 'string') {
      //tranforma tudo que se pareça com uma "Date" em um objeto do "moment.js"
      if (value[key][4] == '-' && value[key][value[key].length-1] == 'Z') {
        value[key] = moment(value[key]);
      }
    }
    if (!(value[key] instanceof moment) && 
    ( typeof value[key] === 'object' || typeof value[key] === 'array')) {
      checkRecursive(value[key]);
    }
  }
}

let storage = {
  getItem(name) {
    const item = localStorage.getItem(name);

    if (typeof item !== 'undefined' && item !== null) {
      const parsedItem = JSON.parse(item);
      checkRecursive(parsedItem);
      return parsedItem;
    }
    
    return null;
  },
  setItem(name, item) {
    if (typeof item !== 'string') {
      item = JSON.stringify(item);
    }
    localStorage.setItem(name, item);
  },
  removeItem(name) {
    localStorage.removeItem(name);
  }
};

export default storage;
export {hasLocalStorage};