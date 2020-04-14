import React, { useState, useEffect, useContext } from 'react';
import './index.styl';
interface AboutMeProps {
  closeCb: () => void;
}
export default function About(props: AboutMeProps) {
  return(
    <div className="about-me-container">
      <div className="close" onClick={()=>{props.closeCb()}}>[close]</div>
      <div className="about-me">
        {/* <div className="title">关于tritium</div> */}
        <div className="content">
          <p>你好，我是H13。</p>
          <p>我现在就职于北京的一家互联网公司，是一名练习时长快两年的前端练习生。</p>
          <p>19年年底的时候到20年年初，也干了一点数据分析师<i style={{textDecoration: 'line-through'}}>（或者算法？）</i>的活，感谢这次经历，让我发现了写代码的美好！</p>
          <p>所以我又回来写前端了，然后我捣鼓了这个个人网站<i style={{textDecoration: 'line-through'}}>（才不是因为腾讯云做活动服务器太便宜呢）</i>，用来纪念下这次思想上的醒悟！当然也准备丢一些我平时做的各种小玩意。不过如你所见，还在施工中。</p>
          <p>除了编程，我还喜欢画画和打游戏，感觉自己设计和画画能力在码农里还算不错吧哈哈。</p>
        </div>
      </div>
      <div className="bot-bounce">
        <div className="bot-eyes">
          <div className="eye" />
          <div className="eye" />
        </div>
      </div>
    </div>
  )
}
