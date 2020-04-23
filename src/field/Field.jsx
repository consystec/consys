import React, { Component } from 'react';

class Field extends Component {
  render() {
    return (
      <input {...this.props} 
        className="field" />
    );
  }
}

export default Field;