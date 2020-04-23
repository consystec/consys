import React, { Component } from 'react';
import { Tabs, Col, Row } from 'antd';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from 'consys/tabs.css';
import configTab from './configTab';

const TabPane = Tabs.TabPane;

class _Tabs extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    this.state = {
      activeKey: configTab.activeKey,
      panes: configTab.tabs
    };

    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
    var that = this;

    configTab.onTabsChange((panes) => {
      if (this.refs.tabsRef) {
        that.setState({ panes, activeKey: configTab.activeKey });
      }
    }); 
  }

  onChange(activeKey) {
    const { history, callback } = this.props;
    
    configTab.addTab(activeKey);
    history.push(activeKey);
    callback && callback(activeKey);
  }

  onEdit(targetKey, action) {
    this[action](targetKey);
  }

  remove(targetKey) {
    if (configTab.removeTab(targetKey)) {
      this.props.history.push(configTab.activeKey);
    }
  }

  render() {
    return (
      <Row ref="tabsRef" 
        type="flex" 
        justify="space-around" 
        align="middle" 
        style={{backgroundColor: 'rgba(0, 0, 0, 0.21)'}}>
        <Col span={23} 
          style={{marginTop: '20px', marginBottom: '-20px'}}>
          <Tabs className={style.tabs}
            hideAdd
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit}>
            {this.state.panes.map(pane => 
              <TabPane tab={pane.title == 't' ? 'Resumo' : pane.title} 
                key={pane.key}
                closable={pane.closable}>
              </TabPane>
            )}
          </Tabs>
        </Col>
      </Row>
    );
  }
}

_Tabs.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  callback: PropTypes.func
};

let _TabsRouter = withRouter(_Tabs);
export default _TabsRouter;
