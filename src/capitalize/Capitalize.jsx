import React, { Component } from 'react';
import PropTypes from 'prop-types';


function capitalize(content) {
  if (typeof content === 'undefined')
  {
    return '';
  }
  const contentMod = content.toLowerCase();
  return contentMod.charAt(0).toUpperCase() + contentMod.slice(1);
}

class Capitalize extends Component {
  constructor() {
    super();
  }
  render() {
    const {
      content
    } = this.props;
    return (
      <span>{capitalize(content)}</span>
    );
  }
}

Capitalize.propTypes = {
  content: PropTypes.string,
};

export default Capitalize;
export {capitalize};