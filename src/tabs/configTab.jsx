import storage, {hasLocalStorage} from 'consys/localStorage';
const TABS_KEY = 'tabsKeyLocalStorage';

let tabs = [];
if (hasLocalStorage)
{
  tabs = storage.getItem(TABS_KEY) || [];
}

const configTab = {
  callbacks: {},
  index: -1,
  tabs: tabs,
  activeKey: 'false',
  onTabsChange(tabsChange) {
    this.callbacks[++this.index] = tabsChange;
    return this.index;
  },
  removeCallback(index) {
    delete this.callbacks[index];
  },
  _callbacks() {
    var p = this.callbacks;
    for (var key in p) {
      if (p.hasOwnProperty(key)) {
        p[key](this.tabs);
      }
    }
    if (hasLocalStorage)
    {
      storage.setItem(TABS_KEY, this.tabs);
    }
  },
  removeAll() {
    this.tabs.forEach((tab, i) => {
      storage.removeItem(tab.name);
    });
    this.tabs = [];
    storage.removeItem(TABS_KEY);
    this._callbacks();
  },
  removeTab(url) {
    let lastIndex;
    let tab = {};
    this.tabs.forEach((pane, i) => {
      if (pane.key === url) {
        tab = pane;
        lastIndex = i - 1;
      }
      if (lastIndex < 0)
      {
        lastIndex = 0;
      }
    });
    let changeActiveKey = false;
    if (tab)
    {
      storage.removeItem(tab.name);
      this.tabs = this.tabs.filter(tab => tab.key !== url);
      if (this.tabs[lastIndex] && this.activeKey === url) {
        this.activeKey = this.tabs[lastIndex].key;
        changeActiveKey = true;
      }

      this._callbacks();
    }
    return changeActiveKey;
  },
  addTab(url, {title, name, closable} = {}) {
    let addTab = true;
    const tabObj = { key: url, title, name, closable };
    for (var i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].key == url)
      {
        addTab = false;
        this.activeKey = url;
        if (tabObj.title && tabObj.title.length > 0)
        {
          this.tabs[i] = tabObj;
        }
      }
    }
    if (addTab)
    {
      this.activeKey = url;
      this.tabs.push(tabObj);
    }
    
    this._callbacks();
  }
};
export default configTab;