import React, { useContext } from 'react'
import { Input } from 'antd'
import { CountContext } from 'Context'
import SourceCodeCard from 'Widget/source-code-card'

export default function () {
  const count = useContext(CountContext)
  return (
    <>
      <SourceCodeCard
        title='contextHooks 孙子组件'
        codeString={`
import { CountContext } from 'Context'

export default function () {

  const count = useContext(CountContext)

  return (
    <>
      <Input value={count} />
    </>
  )
}
        `}
      >
        <Input value={count} />
      </SourceCodeCard>
    </>
  )
}
