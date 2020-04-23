import storage, { hasLocalStorage } from 'consys/localStorage';

let persist = (Component, config) => {
  if (!hasLocalStorage) return Component;
  if (!config) config = {};
  let name = config.index || Component.displayName || Component.name || Component.constructor.displayName || Component.constructor.name;

  class PersistComponent extends Component {
    UNSAFE_componentWillMount() {
      super.UNSAFE_componentWillMount && super.UNSAFE_componentWillMount();
      const state = storage.getItem(name);
      if (typeof state !== 'undefined' && state !== null) {
        this.setState(state);
      }
    }
    UNSAFE_componentWillUpdate(nextProps, nextState) {
      super.UNSAFE_componentWillUpdate && super.UNSAFE_componentWillUpdate(nextProps, nextState);
      storage.setItem(name, nextState);
    }
  }
  PersistComponent.displayName = name;
  return PersistComponent;
};
export default persist;