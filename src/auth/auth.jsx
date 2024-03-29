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
  },
  permis(index, key, permisKey = 'permissoes') {
    const user = this?.user;

    if (!user) return false;

    if (user.admin) return true;

    if (!Array.isArray(user[permisKey])) return false;

    if (Array.isArray(key)) {
      for (let i = 0; i < key.length; i++) {
        if (user[permisKey][index]?.[key[i]]) return true;
      }

      return false;
    }

    return user[permisKey][index]?.[key];
  },
  permisById(id, key, chave = 'permissoes', prop = 'codigo') {
    const user = this?.user;

    if (!user) return false;

    if (user.admin) return true;

    if (!Array.isArray(user[chave])) return false;

    const indexOf = user[chave].findIndex(el => el[prop] === id);

    if (indexOf < 0) {
      return false;
    }

    const permissao = user[chave][indexOf];

    if (!Array.isArray(key)) {
      return permissao[key];
    }

    for (let i = 0; i < key.length; i++) {
      if (permissao[key[i]]) return true;
    }

    return false;
  }
};

export default auth;