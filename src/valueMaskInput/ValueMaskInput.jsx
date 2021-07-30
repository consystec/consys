import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import StringMask from 'string-mask';

class ValueMaskInput extends Component {
  constructor() {
    super();
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.setValue = this.setValue.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  setValue(valor, activeChange, nextPrefixMask) {
    const { onChange, onBlurPure, max, min, prefixMask, suffixMask } = this.props;
    let { decimals } = this.props;

    if (typeof valor === 'undefined' || valor == null) {
      valor = 0;
    }

    if (max && valor > max) {
      valor = max;
    }

    if (min && valor < min) {
      valor = min;
    }

    if (typeof valor === 'string' && valor.includes(prefixMask)) {
      valor = this.handleString(valor);
    }

    valor = valor.toString();

    if (typeof decimals == 'undefined') {
      decimals = '00';
      if (valor.indexOf('.') < 0 && valor.indexOf(',') < 0) {
        valor += '00';
      } else {
        let index = valor.indexOf('.');

        if (index < 0)
          index = valor.indexOf(',');

        const splitedValor = valor.substr(index + 1, valor.length);
        decimals = '';

        for (let i = 0; i < splitedValor.length; i++) {
          decimals += '0';
        }
      }
    } else if (typeof decimals == 'number') {
      const cp = decimals + 0;
      decimals = '';

      for (var i = 0; i < cp; i++) {
        decimals += '0';
      }
    }

    valor = valor
      .replace('.', '')
      .replace(',', '');
    const formatter = new StringMask((nextPrefixMask || prefixMask || '') + '#.##0,' + decimals + (suffixMask || ''), { reverse: true });
    const maskedValue = formatter.apply(valor);

    this.setState({ valor: maskedValue });

    let onChangeValue = maskedValue.replace(/[^0-9,]/g, '');
    onChangeValue = onChangeValue.replace(',', '.');
    onChangeValue = parseFloat(onChangeValue);

    if (this.lastValue !== onChangeValue) {
      activeChange && onChange && onChange(onChangeValue);
    }

    if (activeChange && onBlurPure) {
      onBlurPure(onChangeValue);
    }

    this.lastValue = onChangeValue;
  }

  handleBlur() {
    let { valor } = this.state;

    this.setValue(valor, true);
  }

  handleFocus() {
    const { defaultValue } = this.props;
    const { valor } = this.state;

    let val = defaultValue || valor;

    val = this.handleString(val);

    this.setState({ valor: val });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { value, prefixMask } = this.props;

    if (value !== nextProps.value) {
      this.setValue(nextProps.value);
    }

    if (prefixMask !== nextProps.prefixMask) {
      this.setValue(value, false, nextProps.prefixMask);
    }
  }

  componentDidMount() {
    const { defaultValue, value } = this.props;
    this.setState({ valor: defaultValue || value })
    this.setValue(defaultValue || value);
  }

  handleChange(ev) {
    const { onChangePure } = this.props;

    if (ev) {
      let valor = ev.target.value;
      valor = valor.replace(',', '.');

      this.setState({ valor });

      const valorNum = parseFloat(valor);
      onChangePure && onChangePure(valorNum);
    }
  }

  handleEnter() {
    const { onPressEnter } = this.props;
    this.currency.blur();
    onPressEnter && onPressEnter();
  }

  handleString(val) {
    if (val) {
      if (parseFloat(val) == 0) {
        val = "";
      } else if (typeof val == 'string') {
        val = val.replace(/[^0-9,]/g, '');
        val = val.replace(',', '.');
        val = parseFloat(val);

        if (!val) {
          val = '';
        }
      }

      return val;
    } else {
      return val;
    }
  }

  render() {
    const { valor } = this.state;
    const {
      onChange,
      onChangePure,
      onBlurPure,
      onPressEnter,
      value,
      defaultValue,
      prefixMask,
      suffixMask,
      ...rest
    } = this.props;

    return (
      <Input {...rest}
        ref={node => this.currency = node}
        value={valor}
        onPressEnter={this.handleEnter}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onChange={this.handleChange} />
    );
  }
}

ValueMaskInput.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  onChangePure: PropTypes.func,
  onBlurPure: PropTypes.func,
  prefixMask: PropTypes.string,
  suffixMask: PropTypes.string,
}

export default ValueMaskInput;