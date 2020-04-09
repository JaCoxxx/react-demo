import React, { useState } from 'react'
import { Button, message, Input } from 'antd'
import SourceCodeCard from 'Widget/source-code-card'

export default function () {
  const [count, setCount] = useState(0)
  const [sizeLimit, setSizeLimit] = useState([0, 10])

  function getCount(flag) {
    if (flag) {
      if (sizeLimit.every(item => item <= count)) {
        message.error(`count 不得大于${Math.max(...sizeLimit)}`)
        return
      }
      setCount(count + 1)
    } else {
      if (sizeLimit.every(item => item >= count)) {
        message.error(`count 不得小于${Math.min(...sizeLimit)}`)
        return
      }
      setCount(count - 1)
    }
  }

  return (
    <>
      <SourceCodeCard
        title='引用型state'
        codeString={`
export default function () {
  const [count, setCount] = useState(0)
  const [sizeLimit, setSizeLimit] = useState([0, 10])

  function getCount(flag) {
    if (flag) {
      if (sizeLimit.every(item => item <= count)) {
        message.error(\`count 不得大于\${Math.max(...sizeLimit)}\`)
        return
      }
      setCount(count + 1)
    } else {
      if (sizeLimit.every(item => item >= count)) {
        message.error(\`count 不得小于\${Math.min(...sizeLimit)}\`)
        return
      }
      setCount(count - 1)
    }
  }

  return (
    <div>
      <Button onClick={() => getCount(false)}>-1</Button>
      <span style={{ margin: '0 10px' }}>{count}</span>
      <Button onClick={() => getCount(true)}>+1</Button>
      <div style={{ margin: '10px 0' }}>
        <span style={{ marginRight: '10px' }}>设置范围（左右不分大小）：</span>
        <Input
          style={{ width: 200, marginRight: 10 }}
          defaultValue={sizeLimit[0]}
          onChange={e => sizeLimit[0] = e.target.value }
        />
        <Input
          style={{ width: 200 }}
          defaultValue={sizeLimit[1]}
          onChange={e => sizeLimit[1] = e.target.value }
        />
      </div>
    </div>
  );
}
        `}
      >
        <Button onClick={() => getCount(false)}>-1</Button>
        <span style={{ margin: '0 10px' }}>{count}</span>
        <Button onClick={() => getCount(true)}>+1</Button>
        <div style={{ margin: '10px 0' }}>
          <span style={{ marginRight: '10px' }}>设置范围（左右不分大小）：</span>
          <Input style={{ width: 200, marginRight: 10 }} defaultValue={sizeLimit[0]} onChange={e => sizeLimit[0] = e.target.value } />
          <Input style={{ width: 200 }} defaultValue={sizeLimit[1]} onChange={e => sizeLimit[1] = e.target.value } />
        </div>
      </SourceCodeCard>
    </>
  );
}
