import React from 'react'
import style from './index.css'

export default function() {
  const str = '**********';let res = "";
  for (let y = 15; y > -15; y--) {
    let line = '';
    for (let x = -30; x < 30; x++) {
      let item = ''; if (((Math.pow((x * 0.05), 2) + Math.pow((y * 0.1), 2) - 1) ** 3 - Math.pow((x * 0.05), 2) * Math.pow((y * 0.1), 3)) <= 0) {
        let index = (x - y) % str.length;
        if (index < 0) {
          index += str.length;
        }
        item = str[index];
      } else {
        item = ' ';
      }
      line += item;
    }
    res = `${res + line  }\n`;
  }
  console.log(`%c ${res}`, 'color:red')
  return (
    <div className={style.container}>
      <h3>
        一个用以配合学习博客的demo系统。
      </h3>
      <p>用到的技术有：</p>
      <ul>
        <li>React</li>
        <li>Ant Design</li>
        <li>UmiJS</li>
        <li>Dva</li>
      </ul>
    </div>
  );
}
