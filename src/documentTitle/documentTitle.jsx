import Config from 'consys/Config';
import PropTypes from 'prop-types';

let documentTitle = {
  set(str, after) {
    let title = Config.get('projectName');

    if (after) {
      title = title.concat(' - ', str);
    } else {
      title = str.concat(' - ', title)
    }

    var link = document.querySelector("title") || document.createElement('title');

    link.innerHtml = title;
    document.title = title;
  }
};

documentTitle.propTypes = {
  str: PropTypes.string,
  after: PropTypes.any
};

export default documentTitle;