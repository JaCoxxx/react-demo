import React from 'react'
import { Layout } from 'antd'
import router from 'umi/router'
import { connect, routerRedux } from 'dva'

import MenuList from '../../config/menu.config'

import SiderMenu from './SiderMenu'
import ContentView from './ContentView'

import './index.scss';

const { Sider, Content } = Layout;

class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: 'Tab 1', content: undefined, key: 'index', closable: false },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes: [],
      collapsed: false,
      menuList: MenuList,
      openKeys: ['index'],
    };
  }

  componentWillMount() {
    const { menuList, panes } = this.state
    const { location: { pathname } } = this.props
    const pathMenu = this.getMenuListArray(menuList, [], []).find(item => item.path === pathname)
    panes.push({
      ...menuList[0],
      closable: false,
      content: menuList[0].component,
    });
    this.setState({
      panes,
    }, () => {
      if (pathMenu && pathMenu.key !== menuList[0].key) {
        this.onClickMenu(pathMenu);
        this.onChangeTabs(pathMenu.key)
      }
    })
  }

  // 菜单缩放
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  // 点击菜单栏
  onClickMenu = item => {
    const { panes } = this.state;
    const itemIndex = panes.findIndex(ele => ele.key === item.key);
    const menuData = this.getMenuData(item.key)
    if (itemIndex !== -1) {
      this.setState({
        activeKey: panes[itemIndex].key,
      });
    } else {
      this.setState({
        panes: panes.concat({
          ...menuData,
          content: menuData.component,
        }),
        activeKey: menuData.key,
      });
    }
  };

  // 菜单项收缩改变
  onOpenChange = openKey => {
    const { menuList, openKeys } = this.state;
    const menuArr = this.getMenuListArray(menuList, [], [])
    const catalogueList = menuArr.map(item => item.key); // 目录key列表
    const latestOpenKey = openKey.find(key => openKeys.indexOf(key) === -1);
    if (latestOpenKey && catalogueList.indexOf(latestOpenKey) === -1) {
      // 功能菜单展开
      // 筛选出目录key
      const catalogueKey = openKey.find(item => catalogueList.includes(item));
      if (menuArr.findIndex(item => item.key === latestOpenKey) === -1) {
        this.setState({ openKeys: [catalogueKey, latestOpenKey] });
      } else {
        this.setState({
          openKeys: latestOpenKey ? menuArr.find(item => item.key === latestOpenKey).keyPath : [],
        });
      }
    } else {
      // 目录菜单展开
      // eslint-disable-next-line no-lonely-if
      if (menuArr.findIndex(item => item.key === latestOpenKey) === -1) {
        this.setState({ openKeys: openKey });
      } else {
        this.setState({
          openKeys: latestOpenKey ? menuArr.find(item => item.key === latestOpenKey).keyPath : [],
        });
      }
    }
  };

  // 切换tab页
  onChangeTabs = activeKey => {
    const { dispatch } = this.props
    const menuData = this.getMenuData(activeKey)
    dispatch(
      routerRedux.replace({
        pathname: menuData.path,
      })
    )
    // router.replace(menuData.path);
    this.onOpenChange([activeKey]);
    this.setState({ activeKey, openKeys: menuData.keyPath.slice(0, menuData.keyPath.length - 1) });
  };

  // tab页状态发生改变
  onEditTabs = (targetKey, action) => {
    this[`${action}Tabs`](targetKey);
  };

  // 关闭tab页
  removeTabs = targetKey => {
    const { panes } = this.state
    const { dispatch } = this.props
    let { activeKey } = this.state
    let lastIndex = -1
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const myPanes = panes.filter(pane => pane.key !== targetKey);
    if (myPanes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = myPanes[lastIndex].key;
      } else {
        activeKey = myPanes[0].key;
      }
    }
    this.onOpenChange([activeKey]);
    this.setState({ panes: myPanes, activeKey }, () => {
      dispatch(
        routerRedux.replace({
          pathname: myPanes.find(item => item.key === activeKey).path,
        })
      )
      // router.replace(myPanes.find(item => item.key === activeKey).path);
    });
  };

  // 获取点击菜单的内容配置
  getMenuData = (key) => {
    const { menuList } = this.state
    const list = this.getMenuListArray(menuList, [], [])
    return list.find(item => item.key === key)
  }

  // 将menuList转换成纯array
  getMenuListArray = (list, lastArr, keyArr) => {
    list.forEach(item => {
      const keyPath = [].concat(keyArr)
      keyPath.push(item.key)
      if (item.child && item.child.length) {
        const { child, ...obj } = item
        lastArr.push({
          ...obj,
          keyPath,
        })
        lastArr.concat(this.getMenuListArray(item.child, lastArr, keyPath));
      } else {
        lastArr.push({
          ...item,
          keyPath,
        });
      }
    })
    return lastArr
  }

  // 主界面点击事件
  handleClickContent = e => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch({
      type: 'global/setMenuVisibleList',
      payload: {},
    })
  }

  render() {
    const { children } = this.props;
    const { collapsed, activeKey, panes, menuList, openKeys } = this.state;
    return (
      <Layout className="components-layout-demo-custom-trigger">
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          <SiderMenu
            onClickMenu={this.onClickMenu}
            onOpenChange={this.onOpenChange}
            openKeys={openKeys}
            menuList={menuList}
            selectedKeys={activeKey}
          />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? '80px' : '200px' }}>
          <Content
            style={{
              background: '#fff',
              minHeight: 280,
              overflow: 'inherit',
            }}
            onClick={this.handleClickContent}
            onScroll={this.handleClickContent}
          >
            <ContentView
              onChangeTabs={this.onChangeTabs}
              onEditTabs={this.onEditTabs}
              removeTabs={this.removeTabs}
              panes={panes}
              activeKey={activeKey}
            >
              {children}
            </ContentView>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default connect(({ global }) => ({
  ...global,
}))(BasicLayout);
