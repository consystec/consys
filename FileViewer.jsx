import React, { Component } from 'react';
import { Modal } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import Loading from 'consys/Loading';
import fileViewerCss from 'consys/fileViewer.css';

class FileViewer extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      type: 'iframe',
      node: undefined,
      preVisible: false,
      carregando: true
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.frameRef = this.frameRef.bind(this);
  }
  showModal(e) {
    this.props.onClick && this.props.onClick(e);
    this.setState({
      visible: true,
      preVisible: true
    });
    this.fileLoadTimeout = setTimeout(() => {
      const { node } = this.state;
      if (!node) {
        this.setState({
          preVisible: false
        });
      }
      else {
        this.setState({
          carregando: false
        });
      }
    }, 2000);
  }
  handleOk(e) {
    this.setState({
      visible: false,
      preVisible: false
    });
  }
  handleCancel(e) {
    this.props.clearTimeout(this.fileLoadTimeout);
    this.setState({
      visible: false,
      preVisible: false
    });
  }
  frameRef(frame) {
    this.frame = frame;
  }
  handleLoad(frame) {
    var iFrameBody;
    if (this.frame.contentDocument) {
      // FF
      iFrameBody = this.frame.contentDocument.getElementsByTagName('body')[0];
    }
    else if (this.frame.contentWindow) {
      // IE
      iFrameBody = this.frame.contentWindow.document.getElementsByTagName('body')[0];
    }
    this.setState({
      node: { __html: iFrameBody.innerHTML },
      carregando: false
    });
  }
  render() {
    const { src, title, children } = this.props;
    const { preVisible, visible, type, carregando, node } = this.state;
    const finalTitle = (
      <a target="_blank"
        href={src}>
        <LinkOutlined />&nbsp;
        {(title || 'Ver documento')}
      </a>
    );
    return (
      <span>
        <span onMouseOver={this.preLoad} onClick={this.showModal}>{children}</span>
        {preVisible ? (<iframe src={src}
          onLoad={this.handleLoad}
          ref={this.frameRef}
          frameBorder="0"
          style={{ display: 'none' }}></iframe>) : null}
        <Modal
          width={960}
          title={finalTitle}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={false}
        >
          <Loading tip="Carregando arquivo..." spinning={carregando}>
            <div className={fileViewerCss.component} dangerouslySetInnerHTML={node}>
            </div>
          </Loading>
        </Modal>
      </span>
    );
  }
}

export default FileViewer;