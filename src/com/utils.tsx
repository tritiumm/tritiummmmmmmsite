export default class Utils {
  public static throttle(func: Function, delay:number = 1000) {
    let now = +new Date();
    let previous: any = null;
    let timer: any = null;
    if(!previous) previous = now;
    //当上一次执行的时间与当前的时间差大于设置的执行间隔时长的话，就主动执行一次
    if(now - previous > delay){
        clearTimeout(timer);
        func();
        previous = now;// 执行函数后，马上记录当前时间
    }else{
        clearTimeout(timer);
        timer = setTimeout(function(){
          func();
        }, delay);
    }
  }
  
}