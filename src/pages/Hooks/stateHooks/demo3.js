import React, { useState } from 'react'
import { Button, message, Input } from 'antd'
import SourceCodeCard from 'Widget/source-code-card'

export default function (props) {
  const [count, setCount] = useState(() => props.value + 1)

  function getCount(flag) {
    if (flag) {
      if (count >= 10) {
        message.error(`count 不得大于10`)
        return
      }
      setCount(count + 1)
    } else {
      if (count <= 0) {
        message.error(`count 不得小于0`)
        return
      }
      setCount(count - 1)
    }
  }

  return (
    <>
      <SourceCodeCard
        title='复杂初始值'
        codeString={`
function index() {
  return (
    <Demo3 value={10} />
  )
}
export default function (props) {
  const [count, setCount] = useState(() => props.value)

  function getCount(flag) {
    if (flag) {
      if (count >= 10) {
        message.error(\`count 不得大于10\`)
        return
      }
      setCount(count + 1)
    } else {
      if (count <= 0) {
        message.error(\`count 不得小于0\`)
        return
      }
      setCount(count - 1)
    }
  }

  return (
    <>
      <Button onClick={() => getCount(false)}>-1</Button>
      <span style={{ margin: '0 10px' }}>{count}</span>
      <Button onClick={() => getCount(true)}>+1</Button>
    </>
  );
}
        `}
      >
        <Button onClick={() => getCount(false)}>-1</Button>
        <span style={{ margin: '0 10px' }}>{count}</span>
        <Button onClick={() => getCount(true)}>+1</Button>
      </SourceCodeCard>
    </>
  );
}
