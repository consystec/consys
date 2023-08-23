const addressBar = {
  addHead(config) {
    var { name, color } = config;
    var meta = document.querySelector("meta[name*='" + name + "']") || document.createElement('meta');
    meta.content = color;
    meta.name = name;
    document.getElementsByTagName('head')[0].appendChild(meta);
  },
  setColor(config) {
    var { color } = config;
    this.addHead({ name: 'theme-color', color })
    this.addHead({ name: 'msapplication-navbutton-color', color })
    this.addHead({ name: 'apple-mobile-web-app-status-bar-style', color })
  }
};
export default addressBar;