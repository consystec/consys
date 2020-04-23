let favicon = {
  set(cfg) {
    var {url, type, rel} = cfg;
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = type || 'image/x-icon';
    link.rel = rel || 'shortcut icon';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
  }
};
export default favicon;