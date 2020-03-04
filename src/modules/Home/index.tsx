import React, { useState, useEffect, useContext } from 'react';
import Anmie from 'animejs';
import './style/index.styl';
import botImg from './assets/abot.png';
import { utils } from '../../com/index';
export default function Home(props: {}) {

  
  useEffect(()=>{
      let path = Anmie.path('.atom-universe path');
      console.log(path)
      Anmie({
        targets: '.atom-universe .electron',
        translateX: path('x'),
        translateY: path('y'),
        rotate: path('angle'),
        easing: 'linear',
        duration: 10000,
        loop: true
      });
      let eye = document.querySelectorAll('.eye');
      let container = document.querySelector('body');
      container && container.addEventListener('mousemove', calculation);
      
      function calculation(event: any) {
        eye.forEach((item: any, index) => {
          let x = item.offsetLeft + item.clientWidth / 2; // 眼睛的x坐标
          let y = item.offsetTop + item.clientHeight / 2; // 眼睛的y坐标
          let rad = Math.atan2(event.pageX - x, event.pageY - y); // 鼠标和眼睛的坐标距离，然后用atan2函数计算出该点与(0, 0)点之间的弧度
          let rot = (rad * (180 / Math.PI) * -1) + 180; // 转换成角度
          item.style.cssText = 'transform: rotate(' + rot + 'deg)';
        })
      }
      return () => {
        // 清除订阅
        container && container.removeEventListener('mousemove', calculation);
      };
  },[])

  return(
    <div id="home">
      <div className='atom-universe'>
        <div className="electron">
        </div>
        <svg height="700" width="900" xmlns="http://www.w3.org/2000/svg">
          <g>
            <title>Layer 1</title>
            <path stroke="#000" id="svg_5" d="m331.14173,196.13269c-2.4909,-1.15161 -142.81153,-36.27576 -214.2176,-3.45484c-71.40605,32.82092 194.29038,300.57074 622.72556,325.90621c428.43519,25.33547 -111.26036,-260.26437 -408.50797,-322.45137z"  strokeWidth="3" fill="#fff"/>
          </g>
        </svg>
        <div className="a-bot">
          <img  src={botImg}></img>
          <div className="eyes">
            <div className="eye left-eye"></div>
            <div className="eye right-eye"></div>
          </div>
        </div>
       
      </div>
    </div>
  )
}
