import {json2xml} from 'consys/xml';
import http from 'consys/http';
import Config from 'consys/Config';
import geoIP from 'consys/geoIP';

const Types = {
  PAGSEGURO: {
    test: {
      lib: 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.lightbox.js'
    },
    prod: {
      lib: 'https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.lightbox.js'
    }
  }
}

class Payment {
  constructor({type, env}, callback) {
    const that = this;
    if (!env)
    {
      env = process.env.NODE_ENV == 'prod' ? 'prod' : 'test';
    }
    this.typeName = type;
    this.type = Types[type];
    this.info = this.type[env];
    if (!this.type)
    {
      throw 'Not a valid type '+type;
    }
    this._payment = {
      itens: [],
      shipping: {}
    }
    var paymentLibScript = document.createElement('script');
    paymentLibScript.setAttribute('src',this.info.lib);
    document.head.appendChild(paymentLibScript);

    setTimeout(() => {
      callback && callback();
    }, 500);
  }
  send(code, success, abort) {
    if (!code)
    {
      return;
    }
    var isOpenLightbox = PagSeguroLightbox({
      code: code
    }, {
      success,
      abort
    });
    if (!isOpenLightbox){
        location.href="https://pagseguro.uol.com.br/v2/checkout/payment.html?code="+code;
    }
  }

  setStore({email}) {
    this._payment.store = {
      email
    }
  }

  setShipping(shipping) {
    this._payment.shipping = shipping;
  }

  removeItem({id}) {
    let index = -1;
    for (var i = 0; i < this._payment.itens.length; i++) {
      if (id == this._payment.itens[i].id) {
        index = id;
      }
    }
    if (index > -1) {
      this._payment.itens.splice(index, 1);
    }
  }

  addItem({id, description, amount, quantity}) {
    this._payment.itens.push({
      id,
      description,
      amount,
      quantity
    });
  }
}


export default Payment;