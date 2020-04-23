class Config {
  constructor() {
    this.params = {};
    this.set({
      loginUrl: '/login'
    });
  }
  set(params) {
    this.params = {...this.params, ...params};
  }
  get(param) {
    return this.params[param];
  }
}

export default (new Config);