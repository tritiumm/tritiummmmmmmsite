import React, { useState, useEffect, useRef } from 'react';
import botImg from './assets/abot-body.png';
import DialogGame from '@/modules/DialogGame';
import './style/bot.styl';
// import { on } from 'cluster';
import Enums from '@/com/enum';
// import { number } from 'prop-types';
// import { template } from '@babel/core';

const { BotSimpleMessages } = Enums;
let bubbleTimer: number = 0; 
const BUBBLE_TIME = 2000;
const [DEFAULT_LEFT, DEFAULT_RIGHT]  = [20, 70];
interface uiItem {
  index: number;
  title: string;
  message: string;
  style: object;
  type?: 'mail';
  clickHandler?: () => void;
  img: string;
}
const Bot = React.forwardRef((props:{
  eventEmit: Function,
  botState: {}
}, ref: any) => {
  /*variable*/
  /* state */
  const [isMessageVisle, setMessageVisibility] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  // const [typingMessage, setTypingMessage] = useState<string>('-1');
  // const [nowPosition, setNowPosition] = useState<number>(1);
  const messageRef = useRef(null);
  const botRef = useRef(null);
  // visibilities
  const [isAboutMeVisible, setIsAboutMeVisible] = useState<boolean>(false);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  /* function */
  const [uiList, setUIList] = useState<uiItem[]>([{
    index: 0,
    title: 'about me',
    message: '你想干嘛？',
    style: {
      left: DEFAULT_LEFT,
      bottom: DEFAULT_RIGHT
    },
    img: require('./assets/aboutme.png'),
    clickHandler: () => {
      setIsAboutMeVisible(true);
    }
  },{
    index: 1,
    title: 'talk with me',
    message: '你要跟我聊天吗？',
    img: require('./assets/talkwithme.png'),
    style: {
      left: DEFAULT_LEFT,
      bottom: DEFAULT_RIGHT
    },
    clickHandler: () => {
      setIsDialogVisible(true);
    }
  // },{
  //   index: 2,
  //   title: 'gallery',
  //   message: '都是黑历史…啊啊啊',
  //   style: {
  //     left: DEFAULT_LEFT,
  //     bottom: DEFAULT_RIGHT
  //   }
  },{
    index: 3,
    title: 'zcool',
    message: '都是黑历史…啊啊啊',
    style: {
      left: DEFAULT_LEFT,
      bottom: DEFAULT_RIGHT
    },
    img: require('./assets/zcool.png'),
    clickHandler: () => {
      window.open('https://www.zcool.com.cn/u/642528');
    }
  },{
    index: 4,
    title: 'github',
    message: '其实没啥东西',
    img: require('./assets/github.png'),
    style: {
      left: DEFAULT_LEFT,
      bottom: DEFAULT_RIGHT
    },
    clickHandler: () => {
      window.open('https://www.zcool.com.cn/u/642528');
    }
  },{
    index: 5,
    title: 'email',
    message: '哦？欢迎给我写信',
    img: require('./assets/email.png'),
    style: {
      left: DEFAULT_LEFT,
      bottom: DEFAULT_RIGHT
    },
    type: 'mail'
  }]);
  function say(word: string) {
    setMessage(word)
  }
  function controlBubble(isOpen: boolean) {
    setMessageVisibility(isOpen);
    if(!isOpen) {
      setMessage('...');
    }
  }
  function dialogCloseCb() {
    setIsDialogVisible(false);
  }
  // 获取几个交互ui的位置
  function getPosition(count: number, r:number, ref: any): Array<number[]> {
    const arr = new Array(count);
    if (ref){
      const botHeight = ref.clientHeight;
      const botWidth = ref.clientWidth;
      if (count % 2 === 0 && count >= 2) { // 偶数
        let[midNum_l, midNum_r] = [Math.floor(count/2) - 1, Math.floor(count/2)];
        let startOffset = [ 1/2 * botWidth-r, 1/2 * botHeight];
        arr[midNum_l] = [startOffset[0] + r * (1-Math.cos(1/12 * Math.PI )), startOffset[1] - r *  Math.sin(Math.PI  * 1/12)]
        arr[midNum_r] = [startOffset[0] + r * (1-Math.cos(1/12 * Math.PI )), startOffset[1] + r *  Math.sin(Math.PI  * 1/12)]
        for (let i = 1; i < count/2; i++) {
          let angle = Math.PI * 1/6 * i + Math.PI * 1/12;
          arr[midNum_l - i] = [startOffset[0] + r * (1-Math.cos(angle)), startOffset[1] - r * Math.sin(angle)]
          arr[midNum_r + i] = [startOffset[0] + r * (1-Math.cos(angle)), startOffset[1] + r * Math.sin(angle)]
        }
      } else {
        let midNum = Math.floor(count/2);
        arr[midNum] = [-(r - 1/2 * botWidth), 1/2 * botHeight ]
        for (let i = midNum; i >0; i--) {
          // let leftOffset = -(r * Math.cos(Math.PI*(midNum -i + 1) * 1/12) - 1/2 * botWidth - BUBBLE_RADIUS);
          let bottomOffset = r * Math.sin(Math.PI * (midNum -i + 1) * 1/6);
          let leftOffset = arr[midNum][0] + r * (1 - Math.cos(1/6 * Math.PI * (midNum -i + 1)));
          arr[midNum - (midNum - i + 1)]  = [leftOffset, arr[midNum][1] - bottomOffset]
          arr[midNum + (midNum - i + 1)]  = [leftOffset, arr[midNum][1] + bottomOffset]
        }
      }
    }
    return arr;
  }
  function controlActionUI(isVisible: boolean, botDom: HTMLElement) {
    let temp: uiItem[] = [];
    if (botDom) {
      if (isVisible) {
        let pos = getPosition(uiList.length, 180, ref.current);
        temp = pos.map((e: number[], i: number): uiItem =>
        ({
            ...uiList[i],
            style: {
              left: e[0],
              bottom: e[1]
            }
        }));
      } else {
        temp = uiList.map((e: uiItem, i: number) => ({
          ...uiList[i],
            style: {
              left: DEFAULT_LEFT,
              bottom:DEFAULT_RIGHT
        }}))
      }
      setUIList(temp);
    }
   
  }
  /* effect */
  useEffect(()=>{
    let eyes = document.querySelectorAll('.eye') as NodeListOf<HTMLElement>;
    let container = document.querySelector('body');

    // function calculation(event: any) {
    //   eye.forEach((item: any, index) => {
    //     let x = item.offsetLeft + item.clientWidth / 2; // 眼睛的x坐标
    //     let y = item.offsetTop + item.clientHeight / 2; // 眼睛的y坐标
    //     let rad = Math.atan2(event.pageX - x, event.pageY - y); // 鼠标和眼睛的坐标距离，然后用atan2函数计算出该点与(0, 0)点之间的弧度
    //     let rot = (rad * (180 / Math.PI) * -1) + 180; // 转换成角度
    //     item.style.cssText = 'transform: rotate(' + rot + 'deg)';
    //   })
    // }

    const calculation = (e: any) => {
      if (e.target.className && e.target.className.includes && e.target.className.indexOf('eye') > -1) {
        return;
      }
      eyes.forEach(eye => {
          const x = eye.getBoundingClientRect().left + (eye.clientWidth / 2);
          const y = eye.getBoundingClientRect().top + (eye.clientHeight / 2);
          const radian = Math.atan2(e.pageX - x, e.pageY - y);
          const rot = (radian * (180 / Math.PI) * -1) + 90;
          eye.style.transform = `rotate(${rot}deg)`;
      });
    }
    container && container.addEventListener('mousemove', calculation);
    return () => {
      // 清除订阅
      container && container.removeEventListener('mousemove', calculation);
    };
  }, []);
  useEffect(()=>{
    if (ref.current && messageRef.current) {
      const botHeight = ref.current.clientHeight;
      const messageHeight = (messageRef.current as any).clientHeight;
      let bottom = 0;
      bottom = botHeight * 1/2 - messageHeight * 1/2;
      (messageRef.current as any).style.bottom = bottom  + 'px';
    }
    if (!isMessageVisle && message && message !== '...') {
      controlBubble(true);
    }
  }, [message])
  return (
    <>
      <div 
        className='a-bot'
        ref={botRef}
       >
        <div 
          className={`bot-body`} 
          ref={ref}
          onClick={()=>{
            say(BotSimpleMessages.CLICK_BOT);
          }}
          onMouseEnter={(e: React.MouseEvent)=>{
            e.stopPropagation();
            clearTimeout(bubbleTimer);
            bubbleTimer = 0;
            controlActionUI(true, ref);
            say(BotSimpleMessages.ENTER_BOT);
          }} 
          onMouseLeave={(e: React.MouseEvent) => {
            e.stopPropagation();
            controlBubble(false);
            bubbleTimer = window.setTimeout(() => {
              controlActionUI(false, ref);
              clearTimeout(bubbleTimer);
              bubbleTimer = 0;
            }, BUBBLE_TIME)
          }}  
        >
          <img src={botImg}></img>
          <div className="eyes">
            <div className="eye left-eye"></div>
            <div className="eye right-eye"></div>
         
          </div>
        </div>
        <div className={`message-pop ${isMessageVisle ? 'active' : 'inactive'}`} ref={messageRef}>
          <div className={`bot-message`}>
            { message }     
          </div>
        </div>
        <ul className="bot-action-ui">
          {
            uiList.map((item: uiItem) => {
              return(
                <li key={item.index} style={item.style}
                  onMouseEnter={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    clearTimeout(bubbleTimer);
                    bubbleTimer = 0;
                    say(item.message);
                  }}  
                  onMouseLeave={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    controlBubble(false);
                    bubbleTimer = window.setTimeout(() => {
                      controlActionUI(false, ref);
                      clearTimeout(bubbleTimer);
                      bubbleTimer = 0;
                    }, BUBBLE_TIME)
                  }}  
                  onClick={item.clickHandler}
                >
                  <div className="info-text opacity-control">{item.title}</div>
                  {item.type === 'mail' && <a href="mailto:juebanmonage@163.com"> <img src={item.img} /></a>}
                  {item.type !== 'mail'&& <img src={item.img} />}
                </li>
              )
            })
          }
        </ul>
      </div>
      { isDialogVisible && <DialogGame closeCb={dialogCloseCb} />}
    </>
  )
})
export default Bot;