import React from 'react';
import { Modal } from 'antd';

function NewModal({visible, children, ...rest}) {
  return(
    visible ?
      <Modal visible
        {...rest}>
        {children}
      </Modal>
    : null
  );
}

export default NewModal;