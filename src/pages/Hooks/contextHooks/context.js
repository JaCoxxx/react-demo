import React from 'react'
import { Input } from 'antd'
import { CountContext } from 'Context'
import SourceCodeCard from 'Widget/source-code-card'

export default class Demo1 extends React.Component {

  static contextType = CountContext

  render() {
    return (
      <>
        <SourceCodeCard
          title='context 孙子组件'
          codeString={`
import { CountContext } from 'Context'

export default class Demo1 extends React.Component {

  static contextType = CountContext

  render() {
    return (
      <>
        <Input value={this.context} />
        <CountContext.Consumer>
          {
            count => <Input value={count} />
          }
        </CountContext.Consumer>
      </>
    )
  }
}
          `}
        >
          <Input value={this.context} />
          <CountContext.Consumer>
            {
              count => <Input value={count} />
            }
          </CountContext.Consumer>
        </SourceCodeCard>
      </>
    )
  }
}
