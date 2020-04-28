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
              { label: '关闭所有页面', key: 'closeAll', onClick: (e, key) => this.onClosePage(e, key) },
              { label: '关闭当前页面', key: 'closeCurrent', onClick: (e, key) => this.onClosePage(e, key) },
              { label: '刷新当前页面', key: 'refresh', onClick: (e, key) => this.onRefreshPage(e, key, props) },
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

  // 右键关闭页面
  onClosePage = (e, key) => {
    const { onCloseAll, onCloseCurrent } = this.props
    console.log(e, key)
    if (key === 'closeAll') {
      onCloseAll(e)
    }
    if (key === 'closeCurrent') {
      onCloseCurrent(e)
    }
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
          animated={false}
        >
          {panes.map(pane => (
            <TabPane forceRender={false} tab={pane.title} key={pane.key} closable={pane.closable}>
              <div style={{ padding: '10px', minHeight: '90vh', position: 'relative' }} key={pane.key}>
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
