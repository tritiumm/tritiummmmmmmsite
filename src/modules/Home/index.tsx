import React, { useMemo, useEffect, useRef, useState } from 'react';
import Anmie from 'animejs';
import './style/index.styl';
import earthImg from './assets/abot-earth.png';
import Bot from './Bot';
import Enums from '@/com/enum';
const { EventType } = Enums;
interface actionUI {
  index: number;
  action: Function;
  iconUrl: string;
  tip: string;  
}
export default function Home(props: {}) {
  /* common const */
  const myRef = useRef(null);
  const actionUIList: Array<actionUI> = [
    {
      index: 0,
      action: ()=>{},
      iconUrl: '',
      tip: 'about me'
    },{
      index: 0,
      action: ()=>{},
      iconUrl: '',
      tip: 'talk with me'
    }
  ]
  /* state */
  const [botState, setBotState]  = useState({
    state: 'idle'
  });
  /* memo*/
  const MemoBot = useMemo(() => Bot, []);
  /* function */
 
  function receiveChildEvent(event: string) {
    console.log(event)
  }
  
  /* effect */
  useEffect(()=>{
      console.log(myRef)
      let path = Anmie.path('.atom-universe path');
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
    <div id="home">
      <div className='atom-universe'>
        <div className="electron">
        </div>
        <svg height="700" width="900" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path stroke="#000" id="svg_5" d="m331.14173,196.13269c-2.4909,-1.15161 -142.81153,-36.27576 -214.2176,-3.45484c-71.40605,32.82092 194.29038,300.57074 622.72556,325.90621c428.43519,25.33547 -111.26036,-260.26437 -408.50797,-322.45137z"  strokeWidth="3" fill="#fff"/>
          </g>
        </svg>
        <MemoBot ref={myRef} botState={botState} eventEmit={receiveChildEvent}/>
        <div className="earth">
          <img className="turn" src={earthImg}></img>
        </div>
      </div>
    </div>
  )
}
