import React, { Component } from 'react';
import { AutoComplete, Input, Row, Col } from 'antd';
import { DownOutlined, LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import http from 'consys/http';
import style from 'consys/typeahead.css';
import utilsCss from 'consys/utils.css';
import Lookup from 'consys/Lookup';

const Option = AutoComplete.Option;
const TYPEAHEAD_NO_VALUE = 'TYPEAHEAD_NO_VALUE';

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
    const { method } = this.props;
    let searchProps = this.props.search;

    if (typeof searchProps === 'undefined') {
      searchProps = (value) => {
        let objParams = {
          method: method ? method : 'POST'
        };

        if (method !== 'GET') {
          objParams = {
            ...objParams,
            body: { descricao: value }
          };
        } else {
          objParams = {
            ...objParams,
            params: { descricao: value }
          };
        }

        return http(this.props.url, objParams);
      }
    }
    return searchProps;
  }

  search(value) {
    const { onSearch, onResult } = this.props;
    let searchProps = this.createSearch();
    const proms = searchProps(value);

    if (proms) {
      proms
        .then(onResult || ((res) => res))
        .then((res) => {
          if (!res) {
            return;
          }

          onSearch && onSearch(res, value);

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
    const { onSearchReady, showArrow, erasable } = this.props;
    let searchProps = this.createSearch();
    let tempValue = TYPEAHEAD_NO_VALUE;

    onSearchReady && onSearchReady(searchProps, this.search);

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
    if (this.autoComplete.current && this.autoComplete.current.focus) {
      this.autoComplete.current.focus();
    } else if (this.inputRef.current && this.inputRef.current.focus) {
      this.inputRef.current.focus();
    }
  }

  render() {
    const { rowKey, title, columns, lookup, placeholder, colTypeahead, colLookup } = this.props;
    const { loading, showArrow, erasable, blured, tempValue, value, dataSource } = this.state;
    const props = { ...this.props };
    const marginLeft = -8;
    const marginTop = -10;
    var suffix = null;
    var LookupButton = null;
    delete props.onChange;
    delete props.defaultValue;
    delete props.setRef;
    delete props.view;

    if (lookup) {
      if (typeof lookup === 'string') {
        LookupButton = (
          <Lookup {...props}
            title={title}
            columns={columns}
            rowKey={rowKey}
            onSelect={this.handleSelect}
            url={lookup} />
        );
      } else {
        const lookupWithProps = React.Children.map(lookup,
          (child) => React.cloneElement(child, {
            onSelect: this.handleSelect
          })
        );
        LookupButton = lookupWithProps;
      }
    }

    suffix = (
      <div>
        {erasable && (value && value != "") ? <div className={[utilsCss.muted, utilsCss.absolute].join(' ')}
          style={{ marginLeft: marginLeft - 16, marginTop }}>
          <CloseOutlined style={{ fontSize: 11 }}
            onClick={() => { this.handleSelect(null); this.setState({ blured: true }) }} />
        </div>
          : null}
        {showArrow ? <div className={[utilsCss.muted, utilsCss.absolute].join(' ')}
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
          <Col md={colTypeahead ? colTypeahead : (lookup != null ? 20 : 24)}
            xs={colTypeahead ? colTypeahead : (lookup != null ? 19 : 24)}>
            <AutoComplete {...props}
              ref={this.autoComplete}
              value={value}
              ref={this.props.setRef}
              className={[style.typeahead, utilsCss.leftAlign].join(' ')}
              style={{ ...this.state.style, width: '100%' }}
              dropdownmenustyle={{ maxHeight: 163 }}
              options={!blured ? dataSource && dataSource.map(this.renderOption) : []}
              onSelect={this.handleSelectAutoComplete}
              onSearch={this.handleSearch}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              placeholder={placeholder ? placeholder : "Selecione"}>
              <Input ref={this.inputRef} suffix={suffix} {...props.autoFocus} />
            </AutoComplete>
          </Col>
          {lookup != null ?
            <Col md={colLookup ? colLookup : 4}
              xs={colLookup ? colLookup : 5}
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
  colTypeahead: PropTypes.number,
  colLookup: PropTypes.number,
  placeholder: PropTypes.string,
};

export default Typeahead;