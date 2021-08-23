import React from 'react';
import utilsCss from 'consys/utils.css';
import PropTypes from 'prop-types';

function DetailLabel({ children, title }) {
  return (
    <span className={utilsCss.mr3}>
      <b>
        {title}:&nbsp;
      </b>
      <span>{children}</span>
    </span>
  );

}

DetailLabel.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node
}

export default DetailLabel;