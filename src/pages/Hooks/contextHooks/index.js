import React from 'react'
import { Button } from 'antd'
import { CountContext } from 'Context'
import SourceCodeCard from 'Widget/source-code-card'

import Sun from './sunUnit'

export default class ContextDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 10,
    }
  }

  render() {
    const { count } = this.state
    return (
      <div style={{ background: 'rgb(236, 236, 236)', padding: '10px', height: '100%' }}>
        <SourceCodeCard
          title='父组件'
          codeString={`

  context.js

  import React from 'react'

  export const CountContext = React.createContext()

  --------------------------------

  sunUnit.js

  import React from 'react'
  import Demo1 from './context'
  import Demo2 from './contextHooks'

  export default function () {
    return (
      <>
        <Demo1 />
        <Demo2 />
      </>
    )
  }

  --------------------------------

  index.js

  import { CountContext } from 'Context'
  import Sun from './sunUnit'

  export default class ContextDemo extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        count: 10,
      }
    }

    render() {
      const { count } = this.state
      return (
        <CountContext.Provider value={count}>
          <div>
            <Button onClick={() => this.setState({ count: count + 1 })}>更改count-{count}</Button>
            <Sun />
          </div>
        </CountContext.Provider>
      )
    }
  }
          `}
        >
          <CountContext.Provider value={count}>
            <div>
              <Button onClick={() => this.setState({ count: count + 1 })}>更改count-{count}</Button>
              <Sun />
            </div>
          </CountContext.Provider>
        </SourceCodeCard>
      </div>
    )
  }
}
