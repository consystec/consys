import React, { Component } from 'react';
import { AutoComplete, Input, Row, Col } from 'antd';
import { DownOutlined, LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import http from 'consys/http';
import style from 'consys/typeahead.css';
import utilsCss from 'consys/utils.css';
import Lookup from 'consys/Lookup';

const TYPEAHEAD_NO_VALUE = 'TYPEAHEAD_NO_VALUE';

const map = {};

class Typeahead extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      showArrow: true,
      blured: false,
      erasable: true
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.search = this.search.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSelectAutoComplete = this.handleSelectAutoComplete.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.typeaheadRef = this.typeaheadRef.bind(this);
    this.createSearch = this.createSearch.bind(this);
    this.goSearch = this.goSearch.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.view = this.view.bind(this);
    this.autoComplete = React.createRef();
    this.inputRef = React.createRef();
  }

  renderOption(item, index) {
    return {
      value: 'typeahead_' + index,
      label: (
        <div>
          {this.props.view(item)}
        </div>
      )
    };
  }

  handleSelectAutoComplete(value) {
    let { dataSource } = this.state;
    this.handleSelect(dataSource[value.substring(10)]);
  }

  handleSelect(record) {
    this.setState({ tempValue: record, loading: false });
    this.props.onChange && this.props.onChange(record, this.view(record));
  }

  handleFocus() {
    this.setState({
      blured: false,
      loading: true,
      dataSource: []
    });

    this.search('');
  }

  handleBlur() {
    let { validValue } = this.state;

    if (!this.props.noEmpty) {
      if (validValue != this.state.value) {
        validValue = '';
        this.handleSelect(null);
      }
    }

    this.setState({ value: validValue, blured: true });
  }

  handleSearch(value) {
    this.setState({ value });
    this.goSearch(value);
  }

  goSearch(value) {
    if (this.searchBounce) {
      clearTimeout(this.searchBounce);
    }

    this.setState({ loading: true });

    this.searchBounce = setTimeout(() => {
      this.search(value);
    }, 900);
  }

  createSearch() {
    const { method, params } = this.props;
    let searchProps = this.props.search;

    if (typeof searchProps === 'undefined') {
      searchProps = (value) => {
        let objParams = {
          method: method ? method : 'POST'
        };

        if (method !== 'GET') {
          objParams = {
            ...objParams,
            body: { ...params, descricao: value }
          };
        } else {
          objParams = {
            ...objParams,
            params: { ...params, descricao: value }
          };
        }

        return http(this.props.url, objParams);
      }
    }

    return searchProps;
  }

  search(value, firstResult) {
    const { onSearch, onResult, defaults } = this.props;
    let searchProps = this.createSearch();
    const proms = searchProps(value);

    if (this.state.blured) {
      this.setState({ blured: false })
    }

    if (proms) {
      proms
        .then(onResult || ((res) => res))
        .then((res) => {
          if (!res) {
            return;
          }

          onSearch && onSearch(res, value);
          firstResult && firstResult(res[0]);

          if (defaults && defaults.length > 0 && res && Array.isArray(res)) {
            res = defaults.concat(res);
          }

          this.setState({
            loading: false,
            dataSource: res ? res : []
          });
        }).catch(() => {
          this.setState({
            loading: false
          });
        });
    } else {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    const { onSearchReady, showArrow, erasable, firstResult } = this.props;
    let searchProps = this.createSearch();
    let tempValue = TYPEAHEAD_NO_VALUE;

    onSearchReady && onSearchReady(searchProps, this.search);

    if (firstResult) {
      this.search('', firstResult);
    }

    if (typeof this.props.defaultValue !== 'undefined') {
      tempValue = this.props.defaultValue;
    }

    if (typeof this.props.value !== 'undefined') {
      tempValue = this.props.value;
    }

    this.setState({
      tempValue,
      showArrow: typeof showArrow === 'undefined' ? true : showArrow,
      erasable: typeof erasable === 'undefined' ? true : erasable
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { showArrow, erasable } = this.props;
    let tempValue = TYPEAHEAD_NO_VALUE;

    if (tempValue !== nextProps.value) {
      tempValue = nextProps.value;
    }

    this.setState({ tempValue });

    if (nextProps.showArrow != showArrow) {
      this.setState({ showArrow: nextProps.showArrow });
    }

    if (nextProps.erasable != erasable) {
      this.setState({ erasable: nextProps.erasable });
    }
  }

  view(value) {
    if (value !== TYPEAHEAD_NO_VALUE) {
      return this.props.view(value);
    }

    return null;
  }

  typeaheadRef(ref) {
    const { tempValue } = this.state;

    if (ref) this.ref = ref;

    if (!this.ref) return;

    if (tempValue !== TYPEAHEAD_NO_VALUE) {
      this.setState({
        value: this.ref.innerText,
        validValue: this.ref.innerText,
        tempValue: TYPEAHEAD_NO_VALUE
      });
    }
  }

  focus() {
    if (this.autoComplete.current && this.autoComplete.current.focus) {
      this.autoComplete.current.focus();
    } else if (this.inputRef.current && this.inputRef.current.focus) {
      this.inputRef.current.focus();
    }
  }

  keyPress(e) {
    const { onPressTab, confirmTab } = this.props;
    const { dataSource } = this.state;

    if (this.inputRef.current) {
      if (e.key === 'Shift' || e.key === 'Tab') {
        map[e.keyCode] = e.type == 'keydown';
      }

      if (!map[16] && e.key === 'Tab' && (onPressTab || confirmTab)) {
        let input = this.inputRef.current.input;
        let aria = input.attributes[9].nodeValue;
        let indexOf = aria.charAt(aria.length - 1);
        let keys = Object.keys(input);

        if (!(keys && input[keys[1]] && input[keys[1]]['aria-expanded'])) {
          return;
        }

        if (dataSource[indexOf]) {
          this.handleSelect(dataSource[indexOf]);
          onPressTab && onPressTab(dataSource[indexOf]);
        } else {
          this.handleBlur();
        }
      }
    }
  }

  keyUp(e) {
    if (e.key === 'Shift' || e.key === 'Tab') {
      map[e.keyCode] = e.type == 'keydown';
    }
  }

  render() {
    const { rowKey, title, columns, lookup, placeholder, colTypeahead, colLookup, idInput } = this.props;
    const { loading, showArrow, erasable, blured, tempValue, value, dataSource } = this.state;
    const props = { ...this.props };
    const marginLeft = -3;
    const marginTop = -10;
    var suffix = null;
    var LookupButton = null;
    delete props.onChange;
    delete props.defaultValue;
    delete props.setRef;
    delete props.view;
    delete props.onPressTab;
    delete props.confirmTab;
    delete props.firstResult;
    delete props.defaults;
    delete props.erasable;

    if (lookup) {
      if (typeof lookup === 'string') {
        LookupButton = (
          <Lookup {...props}
            title={title}
            columns={columns}
            rowKey={rowKey}
            onSelect={this.handleSelect}
            disabled={props.disabled}
            url={lookup} />
        );
      } else {
        const lookupWithProps = React.Children.map(lookup,
          (child) => React.cloneElement(child, {
            onSelect: this.handleSelect,
            disabled: props.disabled
          })
        );
        LookupButton = lookupWithProps;
      }
    }

    suffix = (
      <div>
        {erasable && (value && value != "") ?
          <div className={[utilsCss.muted, utilsCss.absolute].join(' ')}
            style={{ marginLeft, marginTop }}>
            <CloseOutlined style={{ fontSize: 11 }}
              className={props.disabled && utilsCss.nopointer}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                this.handleSelect(null);
                this.setState({ blured: true, loading: false, dataSource: [] });
                this.autoComplete.current.blur();
              }
              } />
          </div>
          : showArrow ? <div className={[utilsCss.muted, utilsCss.absolute].join(' ')}
            style={{ marginLeft, marginTop }}>
            {loading ?
              <LoadingOutlined style={{ fontSize: 11 }} />
              :
              <DownOutlined style={{ fontSize: 11 }} />
            }
          </div> : null}
      </div>
    )

    return (
      <span>
        <span style={{ display: 'none' }}>
          {this.tempValue !== tempValue ?
            <span ref={(ref) => { this.typeaheadRef(ref); this.tempValue = tempValue }}
              id="typeaheadRef">
              {this.view(tempValue)}
            </span>
            : null
          }
        </span>
        <Row>
          {idInput &&
            <Col span={4}>
              <Input />
            </Col>
          }
          <Col span={colTypeahead ? colTypeahead : (lookup != null ? 21 : 24)}>
            <AutoComplete {...props}
              defaultActiveFirstOption
              ref={this.autoComplete}
              value={value}
              className={[style.typeahead, utilsCss.leftAlign].join(' ')}
              style={{ ...this.state.style, ...this.props.style, width: '100%' }}
              dropdownmenustyle={{ maxHeight: 163 }}
              options={!blured ? dataSource && dataSource.map(this.renderOption) : []}
              onSelect={this.handleSelectAutoComplete}
              onSearch={this.handleSearch}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              placeholder={placeholder ? placeholder : "Selecione"}
              onKeyDown={this.keyPress}
              onKeyUp={this.keyUp}>
              <Input ref={this.inputRef}
                suffix={suffix}
                spellCheck={false}
                {...props.autoFocus} />
            </AutoComplete>
          </Col>
          {lookup != null ?
            <Col span={colLookup ? colLookup : 3}
              className={[utilsCss.pl1].join(' ')}>
              {LookupButton}
            </Col>
            : null}
        </Row>
      </span>
    );
  }
}

Typeahead.propTypes = {
  view: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  noEmpty: PropTypes.bool,
  defaultValue: PropTypes.object,
  lookup: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  rowKey: PropTypes.func,
  columns: PropTypes.array,
  search: PropTypes.func,
  onResult: PropTypes.func,
  onSearch: PropTypes.func,
  onSearchReady: PropTypes.func,
  method: PropTypes.string,
  params: PropTypes.object,
  colTypeahead: PropTypes.number,
  colLookup: PropTypes.number,
  placeholder: PropTypes.string,
  onPressTab: PropTypes.func,
  confirmTab: PropTypes.bool,
  firstResult: PropTypes.func,
  idInput: PropTypes.bool,
  erasable: PropTypes.bool,
  showArrow: PropTypes.bool,
  style: PropTypes.object,
  defaults: PropTypes.array,
  title: PropTypes.string,
  url: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default Typeahead;