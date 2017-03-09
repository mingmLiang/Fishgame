var winw =document.documentElement.clientWidth;
var winh=document.documentElement.clientHeight;//可视屏幕的高度
var Menu=document.getElementById("menu");
var t=1;//图片的缩放系数
function change() {

     winw =document.documentElement.clientWidth;
     winh=document.documentElement.clientHeight;//可视屏幕的高度
    can1.style.cssText='width:'+winw*0.6+'px;left:'+winw*0.3+'px;display:block;';
    can2.style.cssText=can1.style.cssText;
    Menu.style.cssText='height:'+winw*0.45+'px;line-height:'+winw*0.275+'px;left:'+(winw*0.14)+'px;width:'+0.1125*winw+'px;display:block;';
    t=0.1125*winw/153.675;
    if(t<0.42)
        Menu.style.cssText='display:none;';
    music.style.cssText='transform:scale('+t+','+t+')';
    playAgin.style.cssText='transform:scale('+t+','+t+')';

}