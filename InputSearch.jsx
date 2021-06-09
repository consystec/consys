import React, { Component } from 'react';
import { AutoComplete, Input, Row, Col, message } from 'antd';
import { DownOutlined, LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import ReactDOM from 'react-dom';
import cryptoJS from 'crypto-js';
import PropTypes from 'prop-types';
import { hasLocalStorage } from 'consys/localStorage';
import http from 'consys/http';
import style from 'consys/typeahead.css';
import utilsCss from 'consys/utils.css';
import Lookup from 'consys/Lookup';

const TYPEAHEAD_NO_VALUE = 'TYPEAHEAD_NO_VALUE';

class InputSearch extends Component {
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
    this.handleId = this.handleId.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.typeaheadRef = this.typeaheadRef.bind(this);
    this.createSearch = this.createSearch.bind(this);
    this.goSearch = this.goSearch.bind(this);
    this.view = this.view.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.autoComplete = React.createRef();
    this.inputRef = React.createRef();
    this.idRef = React.createRef();
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
    this.setState({ id: record ? record.codigo : null, tempValue: record, loading: false });

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

  handleId(event) {
    const { confirmTab } = this.props;
    const { id } = this.state;

    if (confirmTab) {
      event.preventDefault();
    }

    const firstResult = (val) => {
      if (!val) {
        this.handleSelect(val);
        message.info(`Nenhuma valor encontrado.`);
      } else if (val && id && (val.codigo == id || val.id == id)) {
        this.handleSelect(val);
      } else if (id) {
        this.handleSelect(null);
        message.info(`Nenhuma valor encontrado.`);
      } else {
        this.handleSelect(null);
      }
    }

    this.search(id, firstResult, true);
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

  createSearch(value, searchId) {
    const { method, params, offline, campos } = this.props;
    let searchProps = this.props.search;

    if (offline && navigator.onLine == false && hasLocalStorage) {
      return () => {
        var dadosLocalStorage = hasLocalStorage.getItem("GENERETE_INFO_VALUE");

        if (dadosLocalStorage != 'undefined' && dadosLocalStorage !== null) {
          var decryptedBytes = cryptoJS.AES.decrypt(dadosLocalStorage, "CONSYSTEC10");
          var dados = JSON.parse(decryptedBytes.toString(cryptoJS.enc.Utf8));

          return new Promise((resolve, reject) => {
            if (dados && campos) {
              var info;

              for (let i = 0; i < campos.length; i++) {
                const el = campos[i];

                if (info && info[el]) {
                  info = info[el];
                  break;
                }

                if (!info && dados.data[el]) {
                  info = dados.data[el];
                }
              }

              if (value && !searchId) {
                info = info.filter(el => el.descricao.toLowerCase().includes(value.toLowerCase()));
              } else if (value && searchId) {
                info = info.filter(el => el.codigo.toString() == value);
              }

              resolve(info);
            } else {
              reject({ message: 'erro' })
            }
          });
        }
      };
    }

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

  search(value, firstResult, searchId) {
    const { onSearch, onResult, defaults } = this.props;
    let searchProps = this.createSearch(value, searchId);
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
        }).catch((e) => {
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
      id: tempValue ? (tempValue.codigo || tempValue.id) : null,
      showArrow: typeof showArrow === 'undefined' ? true : showArrow,
      erasable: typeof erasable === 'undefined' ? true : erasable
    });

    var node = ReactDOM.findDOMNode(this.autoComplete.current);

    if (!node || node.offsetWidth == 0) {
      this.setState({
        style: {
          width: '100%',
          minWidth: '200px'
        }
      })
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { showArrow, erasable } = this.props;
    let tempValue = TYPEAHEAD_NO_VALUE;

    if (tempValue !== nextProps.value) {
      tempValue = nextProps.value;

      if (tempValue && (tempValue.codigo || tempValue.id)) {
        this.setState({ id: tempValue.codigo || tempValue.id });
      }
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

    if (!ref) {
      ref = this.ref;
    }

    this.ref = ref;
    var node = ReactDOM.findDOMNode(ref);

    if (!node) {
      return;
    }

    if (tempValue !== TYPEAHEAD_NO_VALUE) {
      this.setState({
        value: node.innerText,
        validValue: node.innerText,
        tempValue: TYPEAHEAD_NO_VALUE
      });
    }
  }

  focus() {
    if (this.idRef.current && this.idRef.current.focus) {
      this.idRef.current.focus();
    }
  }

  keyPress(event) {
    if (event.which == 9) {
      if (this.state.id) {
        this.handleId(event);
      }
    }
  }

  render() {
    const { rowKey, title, columns, lookup, placeholder, colTypeahead, colLookup, autoFocus, inputCol } = this.props;
    const { loading, showArrow, erasable, blured, tempValue, value, dataSource } = this.state;
    const props = { ...this.props };
    const marginLeft = -3;
    const marginTop = -10;
    var suffix = null;
    var LookupButton = null;
    var span = lookup != null ? 21 : 24;
    span = span - (inputCol || 4);
    delete props.onChange;
    delete props.defaultValue;
    delete props.setRef;
    delete props.view;
    delete props.onPressTab;
    delete props.confirmTab;
    delete props.firstResult;
    delete props.defaults;
    delete props.inputCol;
    delete props.onSearch;
    delete props.search;
    delete props.colTypeahead;
    delete props.colLookup;
    delete props.autoFocus;
    delete props.offline;
    delete props.campos;

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
              onClick={() => {
                this.handleSelect(null);
                this.setState({ blured: true, loading: true, dataSource: [] }); this.search('')
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
        <Row gutter={2}>
          <Col span={inputCol || 4}>
            <Input {...props}
              value={this.state.id || value && value.codigo || null}
              ref={this.idRef}
              autoFocus={autoFocus}
              onChange={({ target: { value } }) => this.setState({ id: value })}
              onPressEnter={(event) => this.handleId(event)}
              onKeyDown={(event) => this.keyPress(event)} />
          </Col>
          <Col span={colTypeahead ? colTypeahead : span}>
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
              placeholder={placeholder ? placeholder : "Selecione"}>
              <Input ref={this.inputRef}
                suffix={suffix} />
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

InputSearch.propTypes = {
  view: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  noEmpty: PropTypes.bool,
  defaultValue: PropTypes.object,
  lookup: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  rowKey: PropTypes.func,
  offline: PropTypes.bool,
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
  campos: PropTypes.array
};

export default InputSearch;