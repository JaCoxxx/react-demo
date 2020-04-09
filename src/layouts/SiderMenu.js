import React from 'react';
import Link from 'umi/link';
import { Menu, Icon } from 'antd'

const { SubMenu } = Menu

export default class SiderMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }

  onClickMenu = (item) => {
    const { onClickMenu } = this.props
    onClickMenu && onClickMenu(item)
  };

  onOpenChange = openKey => {
    const { onOpenChange } = this.props
    onOpenChange && onOpenChange(openKey)
  };

  render() {
    const { menuList, openKeys, selectedKeys } = this.props;
    return (
      <div>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[menuList[0].key]}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onClick={this.onClickMenu}
          onOpenChange={this.onOpenChange}
        >
          {menuList.map(item => {
            return item.child ? (
              <SubMenu
                key={item.key}
                title={
                  <span>
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                  </span>
                }
              >
                {item.child.map(ele => {
                  return ele.child ? (
                    <SubMenu
                      key={ele.key}
                      title={
                        <span>
                          <Icon type={ele.icon} />
                          <span>{ele.title}</span>
                        </span>
                      }
                    >
                      {ele.child.map(element => {
                        return (
                          <Menu.Item key={element.key}>
                            <Link to={element.path}><span>{element.title}</span></Link>
                          </Menu.Item>
                        );
                      })}
                    </SubMenu>
                  ) : (
                    <Menu.Item key={ele.key}>
                      <Link to={ele.path}>
                        <Icon type={ele.icon} />
                        <span>{ele.title}</span>
                      </Link>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            ) : (
              <Menu.Item key={item.key}>
                <Link to={item.path}>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    );
  }
};
