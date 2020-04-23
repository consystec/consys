import React, { Component } from 'react';
import {Input, message} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

function renderEditableCellInput(config) {
  let {thisComponent, listName, propertyName, renderComponent, children, valuePropName} = config;
  if (!renderComponent) {
    renderComponent = (value) => <span>{value}</span>; 
  }

  if (!valuePropName) {
    valuePropName = "defaultValue";
  }

  class EditableCellInput extends Component {
    constructor() {
      super();
      this.state = {
        editable: false,
        value: null
      }
      
      this.getItem = this.getItem.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.inputRef = this.inputRef.bind(this);
      this.checkEditable = this.checkEditable.bind(this);
    }
    getItem(index) {
      const list = thisComponent.state[listName]; 
      return list[index];
    }
    getValue(item) {
      if (typeof item == 'undefined') {
        return;
      }
      return propertyName.split('.').reduce((o,i)=>o[i], item);
    }
    checkEditable() {
      const {index} = this.props;
      const item = this.getItem(index);
      if (!item) {
        return;
      }
      const list = thisComponent.state[listName]; 
      if (!(this.state.editable !== item.editable)) {
        return false;
      }
      if (typeof item.editable === 'undefined') {
        return;
      }
      if (item.editable == false) {
        if (item.status == 'salvar') {
          const item = this.getItem(index);
          list[index][propertyName] = this.value;
          thisComponent.setState({
            [listName]: list
          });
          this.setState({ value: this.value });
        }
      }
      this.setState({editable: item.editable});
    }
    componentDidMount() {
      const {index} = this.props;
      const item = this.getItem(index);
      this.value = this.getValue(item);
      this.setState({value: this.value});
      this.checkEditable();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      this.checkEditable();
    }

    inputRef(input) {
      const {index} = this.props;
      const list = thisComponent.state[listName]; 
      if (!list[index]) {
        return;
      }
      if (list[index].focusComponent && list[index].focusComponent != propertyName) {
        return;
      }
      if (!input || list[index].focused) {
        return;
      }
      let inputs = input.getElementsByTagName('input');
      for (let i = 0; i < inputs.length; ++i) {
          inputs[i] && inputs[i].focus && inputs[i].focus();
      }
      list[index].focused = true;
      thisComponent.setState({[listName]: list});
    }

    handleChange(value, text) {
      if (value.target) {
        this.value = value.target.value;
      } else {
        this.value = value;
      }
    }
    render() {
      const { value, editable} = this.state;
      let { children } = this.props;
      if (!children) {
        children = (<Input size="large"/>);
      }
      const childrenWithProps = React.Children.map(children,
       (child) => React.cloneElement(child, {
         [valuePropName]: children.props && children.props.format ? moment(value) : value,
         onChange: this.handleChange,
       })
      );
      return (
        <div>
          {editable ?
            <div ref={this.inputRef}>
              {childrenWithProps}
            </div>
            :
            <div>
              {renderComponent(value)}
            </div>
          }
        </div>
      );
    }
  }

EditableCellInput.propTypes = {
  onClose: PropTypes.func,
  form: PropTypes.object,
  id: PropTypes.number
};

  return {
    render: function(value, record, index) {
      return <EditableCellInput index={index}>{children}</EditableCellInput>
    }
  }
}

export {renderEditableCellInput}