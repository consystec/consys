import auth from 'consys/auth';
import { message } from 'antd';

function queryParams(params) {
  const keys = Object.keys(params);
  var query = '';

  keys.forEach(el => {
    const valor = params[el];

    if (valor != undefined && valor != null && typeof valor != 'undefined' && valor != 'null') {
      if (query !== '') {
        query += '&';
      }

      query += encodeURIComponent(el) + '=' + encodeURIComponent(valor);
    }
  });

  return query;
}

function isDate(date) {
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date)) && date.getTime && typeof date.getTime === 'function';
}

function isFile(value) {
  return value && value.toString().toLowerCase().indexOf('file') > -1;
}

function formDataAppend(form, data, lastChild) {
  for (var name in data) {
    let value = data[name];

    if (typeof value === 'undefined' || value == null) {
      continue;
    }

    if (typeof value === 'function') {
      continue;
    }

    let newName = name;

    if (Array.isArray(data)) {
      newName = lastChild;

      if (!isFile(value)) {
        newName += '[' + name + ']';
      }
    } else if (lastChild) {
      newName = lastChild + '.' + newName;
    }

    if (typeof value === 'object') {
      if (Array.isArray(value) || (value && !isFile(value) && !isDate(value))) {
        formDataAppend(form, value, newName);
        continue;
      }
    }

    if (isDate(value)) {
      value = value.toISOString();
    }

    form.append(newName, value);
  }

  return form;
}

function formData(data) {
  var form = new FormData();

  formDataAppend(form, data);

  return form;
}

function http(url, options = {}) {
  let defaultOptions = {
    headers: {}
  }

  if (options.multipart) {
    defaultOptions = {
      ...defaultOptions,
      method: 'POST'
    };
  } else if (options.json !== false) {
    defaultOptions = {
      ...defaultOptions,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
  }

  options = {
    ...defaultOptions,
    ...options
  };

  if (typeof options.api === 'undefined' || options.api === true) {
    if (auth.user && auth.user.token) {
      if (!options.headers) {
        options.headers = {};
      }
      options.headers.Authentication = auth.user.token;
    }

    url = '/api' + url;
  }

  if (options.params) {
    url += "?" + queryParams(options.params);
  }

  if (typeof options.body !== 'string') {
    if (options.multipart) {
      options.body = formData(options.body);
    } else {
      options.body = JSON.stringify(options.body);
    }
  }

  try {
    return fetch(url, options)
      .then((res) => {
        if (options.json !== false) {
          if (options.void) {
            return;
          }

          var promise = res.json();

          return promise.then((result) => {
            if (result == null && options.method != 'POST') {
              throw { message: 'Erro ao carregar a página, tente novamente' };
            }

            if (res.ok == false) {
              if (res.status == 401 || res.status == 408) {
                message.error(result.message);
                auth.userChange(null);
              }
              throw result;
            }

            return promise;
          });
        } else {
          return res;
        }
      });
  } catch (e) {
    console.error('Catched error by consys/http', e);
  }
}

export default http;
export { formData, formDataAppend, queryParams };