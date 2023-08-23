import PropTypes from 'prop-types';
import configTab from 'consys/configTab';

let wrapTab = (Component, config = {}) => {
  let componentName = Component.displayName || Component.name || Component.constructor.displayName || Component.constructor.name;

  if (typeof config == 'string') {
    let title = config || componentName;
    config = { title };
  }
  config.name = componentName;
  if (!config.title) {
    config.title = config.name;
  }

  class WrapTabComponent extends Component {
    componentDidMount() {
      const { url, params } = this.props.match;
      super.componentDidMount && super.componentDidMount();
      this.wrapTab = true;
      let finalTitle = config.title;
      if (params) {
        for (var name in params) {
          finalTitle = finalTitle.replace(':' + name, params[name]);
        }
      }
      const configCopy = { ...config };
      configCopy.title = finalTitle;
      configTab.addTab(url, configCopy);
    }
  }
  WrapTabComponent.wrapTab = true;
  WrapTabComponent.propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string,
    })
  };

  WrapTabComponent.displayName = componentName;
  return WrapTabComponent;
};


export default wrapTab;