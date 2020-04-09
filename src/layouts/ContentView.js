import React from 'react';
import { Tabs } from 'antd'

const { TabPane } = Tabs

class ContentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  // tab页切换
  onChange = activeKey => {
    const { onChangeTabs } = this.props
    onChangeTabs && onChangeTabs(activeKey);
  };

  // tab页状态更改
  onEdit = (targetKey, action) => {
    const { onEditTabs } = this.props
    onEditTabs && onEditTabs(targetKey, action);
  };

  // 关闭tab页
  remove = targetKey => {
    const { removeTabs } = this.props;
    removeTabs && removeTabs(targetKey);
  };

  render() {
    const { activeKey, panes, children } = this.props
    return (
      <div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={activeKey}
          type="editable-card"
          onEdit={this.onEdit}
          animated
          size="small"
        >
          {panes.map(pane => (
            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
              <div style={{ padding: '10px', minHeight: '90vh', position: 'relative' }}>
                {children}
              </div>
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default ContentView
