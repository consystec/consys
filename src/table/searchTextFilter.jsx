import React from 'react';
import { Input} from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import utilsCss from 'consys/utils.css';

let searchInput = false;
const searchTextFilter = (that, paramName, query) => {
  const key = 'searchTextFilter' + paramName;
  const getState = () => {
    if (!that.state[key]) {
      that.state[key] = {};
    }
    return that.state[key];
  };
  const pesquisar = () => {
    let state = getState();
    state.filtered = !!state.searchText;
    state.filterDropdownVisible = false;
    var params = { filters: {} };
    params.filters[paramName] = { filter: state.searchText, type: 5 };
    query(params);
    that.setState(state);
  };
  const limpar = () => {
    let state = getState();
    state.searchText = '';
    pesquisar();
  };
  const changeVisible = (visible) => {
    let state = getState();
    state.filterDropdownVisible = visible;
    that.setState(state, () => searchInput.focus());
  };
  const onChange = (ev) => {
    let state = getState();
    state.searchText = ev.target.value;
    that.setState(state);
  };

  return {
    filterDropdown: (
      <div className={["ant-table-filter-dropdown"].join(' ')}>
        <div className={[utilsCss.p1].join(' ')}>
          <Input
            ref={ele => searchInput = ele}
            placeholder="Filtrar"
            defaultValue={getState().searchText}
            onChange={onChange}
            onPressEnter={pesquisar.bind(that)}
          />
        </div>
        <div className="ant-table-filter-dropdown-btns">
          <a onClick={pesquisar.bind(that)}
            className="ant-table-filter-dropdown-link confirm">Pesquisar</a>
          <a onClick={limpar.bind(that)}
            className="ant-table-filter-dropdown-link clear">Limpar</a>
        </div>
      </div>
    ),
    filterIcon: <FilterOutlined style={{ color: getState().filtered ? '#108ee9' : '#aaa' }} />,
    filterDropdownVisible: getState().filterDropdownVisible,
    onFilterDropdownVisibleChange: changeVisible,
  };
};
export default searchTextFilter;