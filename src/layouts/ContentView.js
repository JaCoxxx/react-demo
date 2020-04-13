import React from 'react';
import { Tabs } from 'antd'
import { StickyContainer, Sticky } from 'react-sticky'
import MouseRightMenu from 'Components/Widget/mouse-right-menu'

const { TabPane } = Tabs

class ContentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    }
  }

  // 关闭tab页
  remove = targetKey => {
    const { removeTabs } = this.props;
    removeTabs && removeTabs(targetKey);
  };

  // 渲染tab栏
  renderTabBar = (props, DefaultTabBar) => {
    return (
      <Sticky bottomOffset={80}>
        {({ style }) => (
          <MouseRightMenu
            rightMenuList={[
              {label: '关闭所有页面', key: 'closeAll'},
              {label: '刷新当前页面', key: 'refresh', onClick: (e, key) => this.onRefreshPage(e, key, props)},
            ]}
          >
            <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
          </MouseRightMenu>
        )}
      </Sticky>
    )
  }

  // 刷新当前页面
  onRefreshPage = (e, key, props) => {
    console.log(e, key, props)
    this.setState({
      visible: false,
    }, () => {
      this.setState({
        visible: true,
      })
    })
  }

  render() {
    const { activeKey, panes, children, onChangeTabs, onEditTabs } = this.props
    const { visible } = this.state
    return (
      <StickyContainer>
        <Tabs
          hideAdd
          onChange={onChangeTabs}
          activeKey={activeKey}
          type="editable-card"
          onEdit={onEditTabs}
          size="small"
          renderTabBar={this.renderTabBar}
        >
          {panes.map(pane => (
            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
              <div style={{ padding: '10px', minHeight: '90vh', position: 'relative' }}>
                {visible && children}
              </div>
            </TabPane>
          ))}
        </Tabs>
      </StickyContainer>
    );
  }
}

export default ContentView
