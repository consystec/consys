import { hasLocalStorage } from 'consys/localStorage';
import configTab from './configTab';

const USER_KEY = 'userKeyLocalStorage';
var user = false;

if (hasLocalStorage) {
  var userLocalStorage = hasLocalStorage.getItem(USER_KEY);

  if (userLocalStorage != 'undefined' && userLocalStorage !== null) {
    user = JSON.parse(userLocalStorage);
  }
}

const auth = {
  user: user,
  init(login, logout) {
    this.login = login;
    this._logout = logout;
  },
  logout() {
    this._logout(() => {
      configTab.removeAll();
    });
  },
  index: -1,
  callbacks: {},
  onUserChange(userChange) {
    this.callbacks[++this.index] = userChange;
    return this.index;
  },
  removeUserChange(index) {
    delete this.callbacks[index];
  },
  userChange(user) {
    if (hasLocalStorage) {
      hasLocalStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    this.user = user;
    var p = this.callbacks;
    for (var key in p) {
      if (p.hasOwnProperty(key)) {
        p[key](user);
      }
    }
  }
};

export default auth;