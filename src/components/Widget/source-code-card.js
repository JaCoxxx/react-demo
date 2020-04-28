import React from 'react'
import { Card, Tag, message } from 'antd'
import PropTypes from 'prop-types'
import Highlight from 'react-highlight'
import 'Style/components/highlight.scss'

const { CheckableTag } = Tag

export default class SourceCodeCard extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      changeFlag: false,
    }
  }

  handleChangeTag = () => {
    const { changeFlag } = this.state
    const { codeString } = this.props
    if (!codeString) {
      message.error('暂无源码')
      return
    }
    this.setState({
      changeFlag: !changeFlag,
    })
  }

  render() {
    const { changeFlag } = this.state
    const { children, title, codeString } = this.props
    return (
      <Card 
        title={(
          <span>
            {title}
            <CheckableTag 
              color="magenta" 
              checked={changeFlag}
              onChange={this.handleChangeTag}
              style={{ marginLeft: '10px' }}
            >
              源码
            </CheckableTag>
          </span>
        )}
        style={{
          margin: '15px 0',
        }}
      >
        {
          changeFlag ? (
            <div>
              <h6>(仅展示部分代码)</h6>
              <code style={{ whiteSpace: 'pre' }}>{codeString}</code>
              {/* <Highlight language="javascript">
                {codeString}
              </Highlight> */}
            </div>
          ) : children
        }
      </Card>
    )
  }
}

SourceCodeCard.propTypes = {
  title: PropTypes.string, // 卡片标题
  codeString: PropTypes.string, // 源码
}

SourceCodeCard.defaultProps = {
  title: 'Card',
  codeString: null,
}