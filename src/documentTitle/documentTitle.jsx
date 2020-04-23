import Config from 'consys/Config';

let documentTitle = {
  set(str) {
    const title = str.concat(' - ', Config.get('projectName'))
    var link = document.querySelector("title") || document.createElement('title');
    link.innerHtml = title;
    document.title = title;
  }
};
export default documentTitle;