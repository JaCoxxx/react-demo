import React, { useState, useEffect } from 'react'
import { Table, Button } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import SourceCodeCard from 'Widget/source-code-card'

export default function () {
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      render: value => value || '-',
    },{
      title: 'age',
      dataIndex: 'age',
      render: value => value || '-',
    },
  ]
  const [ dataSource, setDataSource ] = useState([])
  const [ journal, setJournal ] = useState('')

  useEffect(() => {
    setJournal(`${journal}渲染后执行，当前dataSource长度${dataSource.length}\n`)
    return () => {
      console.log(`${journal}卸载前执行，当前dataSource长度${dataSource.length}`)
      setJournal(`${journal}卸载前执行，当前dataSource长度${dataSource.length}\n`)
    }
  }, [dataSource])

  useEffect(() => {
    setJournal(`${journal}渲染后执行，当前dataSource长度${dataSource.length}s\n`)
    return () => {
      console.log(`${journal}卸载前执行，当前dataSource长度${dataSource.length}s`)
      setJournal(`${journal}卸载前执行，当前dataSource长度${dataSource.length}s\n`)
    }
  }, [])

  const handleClickNew = () => {
    setDataSource((dataSource || []).concat({
      id: +new Date(),
      name: `Tom${dataSource.length + 1}`,
      age: ((+new Date()) / 100).toString().split('.')[1],
    }))
  }

  const handleClickDelete = () => {
    setDataSource(dataSource.slice(0, dataSource.length - 1))
  }

  const handleClickEmpty = () => {
    setDataSource([])
  }

  return (
    <>
      <SourceCodeCard
        title="useEffect的使用"
        codeString={`
export default function () {
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      render: value => value || '-',
    },{
      title: 'age',
      dataIndex: 'age',
      render: value => value || '-',
    },
  ]
  const [ dataSource, setDataSource ] = useState([])
  const [ journal, setJournal ] = useState('')

  useEffect(() => {
    setJournal(\`\${journal}渲染后执行，当前dataSource长度\${dataSource.length}\\n\`)
    return () => {
      console.log(\`\${journal}卸载前执行，当前dataSource长度\${dataSource.length}\`)
      setJournal(\`\${journal}卸载前执行，当前dataSource长度\${dataSource.length}\\n\`)
    }
  }, [dataSource])

  const handleClickNew = () => {
    setDataSource((dataSource || []).concat({
      id: +new Date(),
      name: \`Tom\${dataSource.length + 1}\`,
      age: ((+new Date()) / 100).toString().split('.')[1],
    }))
  }

  const handleClickDelete = () => {
    setDataSource(dataSource.slice(0, dataSource.length - 1))
  }

  const handleClickEmpty = () => {
    setDataSource([])
  }

  return (
    <>
      <Button onClick={handleClickNew}>新增</Button>
      <Button onClick={handleClickDelete}>删除</Button>
      <Button onClick={handleClickEmpty}>清空</Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        pagination={{
          defaultPageSize: 5,
        }}
      />
      <TextArea value={journal} autoSize={{minRows: 3, maxRows: 10}} />
    </>
  )
}
        `}
      >
        <Button onClick={handleClickNew}>新增</Button>
        <Button onClick={handleClickDelete}>删除</Button>
        <Button onClick={handleClickEmpty}>清空</Button>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          pagination={{
            defaultPageSize: 5,
          }}
        />
        <TextArea value={journal} autoSize={{minRows: 3, maxRows: 10}} />
      </SourceCodeCard>
    </>
  )
}