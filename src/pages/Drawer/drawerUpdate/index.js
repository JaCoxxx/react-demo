import React from 'react'
import { Drawer, Button } from 'antd'
import { connect } from 'dva'
import SlideFrame from 'Components/Widget/slide-frame'
import Reopen from './reopen'
import DidMount from './didMount'

class TreeDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerVisible: false,
      drawerVisible2: false,
      drawerId: '',
    }
  }

  onClickBtn = () => {
    this.setState({
      drawerVisible: true,
      drawerId: `${+new Date()}`,
    })
  }

  onClickBtn2 = () => {
    this.setState({
      drawerVisible2: true,
    })
  }

  reopen = () => {
    this.setState({
      drawerVisible: false,
    }, () => {
      console.log('object')
      this.setState({
        drawerVisible: true,
        drawerId: `${+new Date()}`,
      })
    })
  }

  onClose = () => {
    this.setState({
      drawerVisible: false,
    })
  }

  onClose2 = () => {
    this.setState({
      drawerVisible2: false,
    })
  }

  render() {
    const { drawerVisible, drawerId, drawerVisible2 } = this.state
    return (
      <div style={{ padding: '10px', height: '100%' }}>
        <Button onClick={this.onClickBtn}>打开</Button>
        <Button onClick={this.onClickBtn2}>打开2</Button>
        <Drawer
          title="测试刷新"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={drawerVisible}
        >
          <Reopen id={drawerId} reopen={this.reopen} />
        </Drawer>
        <Drawer
          title="测试刷新"
          placement="right"
          closable={false}
          onClose={this.onClose2}
          visible={drawerVisible2}
        >
          <DidMount />
        </Drawer>
      </div>
    )
  }
}

export default connect(({ global }) => ({
  ...global,
}))(TreeDemo)
