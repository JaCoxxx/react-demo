import React from 'react'
import Demo1 from './demo1'
import Demo2 from './demo2'
import Demo3 from './demo3'

export default function () {
  return (
    <div style={{ background: 'rgb(236, 236, 236)', padding: '10px', height: '100%' }}>
      <Demo1 />
      <Demo2 />
      <Demo3 value={10} />
    </div>
  );
}
