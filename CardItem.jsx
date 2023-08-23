import React from 'react';
import { Row } from 'antd';
import PropTypes from 'prop-types';
import utilsCss from 'consys/utils.css';

function CardItem({ children, data }) {
  if (data && typeof data === 'object' && data.length > 0) {
    return (
      <span>
        {children}
      </span>
    );
  } else {
    return (
      <Row justify='center'
        className={[utilsCss.h4, utilsCss.p4].join(' ')}>
        Nenhum resultado encontrado
      </Row>
    )
  }
}

CardItem.propTypes = {
  children: PropTypes.node,
  data: PropTypes.any
};

export default CardItem;