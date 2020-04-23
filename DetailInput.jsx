import React from 'react';
import utilsCss from 'consys/utils.css';
import PropTypes from 'prop-types';

function DetailInput({ title, children, extra }) {
  return (
    <span>
      <div className={utilsCss.mb1}
        style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
        {title}
      </div>
      <div className={utilsCss.mb2}>
        {children}
      </div>
      {extra && 
        <div className={utilsCss.mtn1}>
          {extra}
        </div>
      }
    </span>
  );
}

DetailInput.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  extra: PropTypes.node
};

export default DetailInput;