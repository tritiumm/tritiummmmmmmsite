import React, { useState, useEffect, useContext } from 'react';
import Anmie from 'animejs';
import './style/index.less';
export default function Home(props: {}) {

  
  useEffect(()=>{
      var path = Anmie.path('.atom-universe path');
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
  },[])
  return(
    <div id="home">Home
      <div className='atom-universe'>
        <div className="electron" style={{width: 10, height:10, backgroundColor: '#000', borderRadius:'50%'}}></div>
        <svg width="1180" height="701" xmlns="http://www.w3.org/2000/svg">
        <g>
          <title>Layer 1</title>
          <path stroke="#000" id="svg_5" d="m363.40316,262.36457c-2.96364,-1.33016 -169.9153,-41.89994 -254.87331,-3.99048c-84.95799,37.90947 231.16416,347.17113 740.91077,376.4346c509.74661,29.26347 -132.37613,-300.61567 -486.03746,-372.44412z"  strokeWidth="3" fill="#fff"/>
        </g>
        </svg>
      </div>
    </div>
  )
}
