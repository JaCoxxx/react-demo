import React from 'react'
import { connect } from 'dva'
import MouseRightMenu from 'Components/Widget/mouse-right-menu'

class TreeDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }



  render() {
    return (
      <div style={{ background: 'rgb(236, 236, 236)', padding: '10px', height: '100%' }}>
        <MouseRightMenu
          rightMenuList={[
            {label: '菜单1', key: 'menu1'},
            {label: '菜单2', key: 'menu2', onClick: (e, key) => console.log(e, key)},
          ]}
          style={{ margin: '10px 20px' }}
          keys={1}
        >
          <div>点击查看菜单</div>
        </MouseRightMenu>
        <MouseRightMenu
          rightMenuList={[
            {label: '菜单3', key: 'menu3'},
            {label: '菜单4', key: 'menu4', onClick: e => console.log(e)},
          ]}
          keys={2}
        >
          <div>点击查看菜单</div>
        </MouseRightMenu>
      </div>
    )
  }
}

export default connect(({ global }) => ({
  ...global,
}))(TreeDemo)
