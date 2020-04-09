import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import 'Style/components/mouseRightMenu.scss'

class MouseRightMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuLeft: 0,
      menuTop: 0,
    }
  }

  componentDidMount () {
    this.changeMenuVisibleList(false)
  }

  handleMouseDown = e => {
    e.preventDefault();
    e.stopPropagation()
    // 鼠标点击位置，相对于屏幕左上角
    const clickX = e.clientX
    const clickY = e.clientY
    // 可视区域window宽高
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    // 菜单宽高
    const rootWidth = this.root.offsetWidth
    const rootHeight = this.root.offsetHeight
    let menuLeft = clickX
    let menuTop = clickY
    if (clickX + rootWidth > windowWidth) {
      menuLeft = clickX - rootWidth
    }
    if (clickY + rootHeight > windowHeight) {
      menuTop = clickY - rootHeight
    }
    this.setState({
      menuLeft,
      menuTop,
    }, () => {
      this.changeMenuVisibleList(true)
    })
  }

  changeMenuVisibleList = e => {
    const { dispatch, menuVisibleList, menuVisibleIndex, keys } = this.props
    dispatch({
      type: 'global/setMenuVisibleList',
      payload: {
        [menuVisibleIndex + keys]: e,
      },
    })
  }

  render() {
    const { menuLeft, menuTop } = this.state
    const { menuVisibleList, rightMenuList, children, style, menuVisibleIndex, keys } = this.props
    return (
      <>
        <div
          onContextMenu={this.handleMouseDown}
          style={style}
        >
          {children}
        </div>
        <div
          ref={ref => this.root = ref}
          onContextMenu={e => e.preventDefault()}
          className="menu-box"
          style={{ 
            display: menuVisibleList[menuVisibleIndex + keys] ? 'block' : 'none',
            left: menuLeft,
            top: menuTop,
          }}
        >
          <ul className="menu-list">
            {
              rightMenuList.length ? rightMenuList.map((item, index) => {
                return (
                  <li
                    className="menu-item"
                    style={{ cursor: item.onClick ? 'pointer' : 'context-menu' }}
                    onClick={e => item.onClick ? item.onClick(e, item.key) : null}
                    key={item.key || +new Date() + index}
                  >
                    {item.label}
                  </li>
                )
              }) : <li className="menu-item" style={{ cursor: 'context-menu', color: '#ccc' }}>未配置菜单</li>
            }
          </ul>
        </div>
      </>
    )
  }
}

MouseRightMenu.propTypes = {
  rightMenuList: PropTypes.array, // 菜单列表
  style: PropTypes.object, // 样式
  menuVisibleIndex: PropTypes.number, // 菜单id
  keys: PropTypes.number, // 组件key，单文件多次调用需传递
}

MouseRightMenu.defaultProps = {
  rightMenuList: [],
  style: {},
  menuVisibleIndex: +new Date(),
  keys: 0,
}

export default connect(({ global }) => ({
  ...global,
}))(MouseRightMenu)
