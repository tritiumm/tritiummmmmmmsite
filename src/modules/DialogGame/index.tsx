import React, { useState, useEffect } from 'react';
import './index.styl';
const json = require('@/com/json/story.json');
const Story = require('inkjs').Story;
// const storyContent = {"inkVersion":19,"root":[[{"->":"start"},["done",{"#f":5,"#n":"g-0"}],null],"done",{"start":[["^莫西莫西，我是BOT33，很高兴见到你！ ",{"#":"bot"},"\n",["ev",{"^->":"start.0.3.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":2},{"s":["^你好！",{"->":"$r","var":true},null]}],["ev",{"^->":"start.0.4.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-1","flg":2},{"s":["^你是谁？",{"->":"$r","var":true},null]}],["ev",{"^->":"start.0.5.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-2","flg":2},{"s":["^这是哪里？！",{"->":"$r","var":true},null]}],["ev",{"^->":"start.0.6.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-3","flg":2},{"s":["^手抖，并不想跟你聊天！",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"start.0.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.3.s"},[{"#n":"$r2"}],"\n",{"->":"about"},{"#f":5}],"c-1":["ev",{"^->":"start.0.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.4.s"},[{"#n":"$r2"}],"\n",{"->":"aboutBOT"},{"#f":5}],"c-2":["ev",{"^->":"start.0.c-2.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.5.s"},[{"#n":"$r2"}],"\n",{"->":"joke"},{"#f":5}],"c-3":["ev",{"^->":"start.0.c-3.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.6.s"},[{"#n":"$r2"}],"\n","done",{"#f":5}]}],{"#f":1}],"joke":[["^这里是某3的精神荒芜之地。","\n",["ev",{"^->":"joke.0.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":2},{"s":["^说人话",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"joke.0.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n",{"->":"place"},{"#f":5}]}],{"#f":1}],"about":[["^H13，互联网前端码农一名，同时也是个creator初心，喜欢画画以及做点设计","\n",["ev",{"^->":"about.0.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":2},{"s":["^哦，原来你是个程序员！",{"->":"$r","var":true},null]}],["ev",{"^->":"about.0.3.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-1","flg":2},{"s":["^那给我康康你的画？",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"about.0.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n","done",{"#f":5}],"c-1":["ev",{"^->":"about.0.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.3.s"},[{"#n":"$r2"}],"\n",{"->":"draw"},{"#f":5}]}],{"#f":1}],"draw":["^这里是我的站酷地址","\n","done",{"#f":1}],"aboutBOT":[["^我只是个没有感情的人工智障。","\n",["ev",{"^->":"aboutBOT.0.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":2},{"s":["^那谁是你的创造者惹？",{"->":"$r","var":true},null]}],["ev",{"^->":"aboutBOT.0.3.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-1","flg":2},{"s":["^哦，I dont care",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"aboutBOT.0.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n",{"->":"about"},{"#f":5}],"c-1":["ev",{"^->":"aboutBOT.0.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.3.s"},[{"#n":"$r2"}],"\n",{"->":"start"},"end",{"#f":5}]}],{"#f":1}],"place":[["^哈哈好吧，开个玩笑，这里是H13的个人网站，还在搭建中的那种。主要放一些个人作品。","\n",["ev",{"^->":"place.0.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":2},{"s":["^好吧，问题来了，H13是谁？",{"->":"$r","var":true},null]}],["ev",{"^->":"place.0.3.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-1","flg":2},{"s":["^我想试试更智能的对话",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"place.0.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n",{"->":"about"},{"#f":5}],"c-1":["ev",{"^->":"place.0.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.3.s"},[{"#n":"$r2"}],"\n","done",{"#f":5}]}],{"#f":1}],"nod":["^It seemed unbelievable.","/","done",{"#f":1}],"#f":1}],"listDefs":{}}
const inkStory = new Story(json);

// console.log(inkStory.Continue())
// inkStory.ChooseChoiceIndex(0)
// console.log(inkStory.ContinueMaximally());
// console.log(inkStory.currentChoices)
console.log(1)

interface DialogGameProps {
  closeCb: () => void;
}
export default function DialogGame(props: DialogGameProps) {
  // const story = useState<any>(new Story(json));
  const [contextText, setContextText] = useState<string>('');
  const [questions, setQuestions] = useState<string[]>([]);
  useEffect(() => {
    storyGo();
  }, []);
  function storyGo() {
    const currentContext = inkStory.ContinueMaximally();
    let currentChoices = inkStory.currentChoices;
    console.log(currentContext, inkStory.canContinue)
    if (true) {
      currentChoices = currentChoices.map((val: any) => val.text);
      setContextText(currentContext);
      setQuestions(currentChoices);
      console.log(inkStory, currentChoices)
    }
  }
  function selectQuesChoice(index: number) {
    inkStory.ChooseChoiceIndex(index);
    storyGo();
  }
  return(
    <div className="dialog-container">
      <div className="dialog-mask"></div>
      <div className="bot-dialog">
        <div className="context-text">
          <div className="name">BOT3</div>
          <div className="content">{ contextText }</div>
          <div className="close-text" onClick={() => props.closeCb()}>[close]</div>
        </div>
        <ul className="ques-list">
          {questions.map((val: string, index: number): React.ReactElement => {
            return <li key={index} onClick={() => {selectQuesChoice(index)}}>{ val }</li>
          })} 
        </ul>
      </div>
    </div>
  );
}