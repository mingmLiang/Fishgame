// 定义海葵对象类
var aneObj=function () {
    // 二次贝塞尔函数，起始点，控制点，终止点
    // 起始点
    this.rootx=[];//rooty  startpoint rooty已知

    //终止点
    this.headx=[];
    this.heady=[];


    this.alpha=0;//海葵摆动角度
    this.amp=[];//海葵摆动的振幅
}

// prototype 属性使您有能力向对象添加属性和方法。
aneObj.prototype.num=50;

// 初始化
aneObj.prototype.init=function () {
    for(var i=0;i<this.num;i++)
    {
        this.rootx[i]=i*16+Math.random()*20;
        this.amp[i]=40+Math.random()*30;
        this.heady[i]=canHeight-240+Math.random()*50;
        this.headx[i]= this.rootx[i];
    }
}
// 绘制
aneObj.prototype.draw=function () {
    // 海葵摆动角度
    // 正弦函数以及二次贝塞尔函数
    // 利用正弦函数，x轴不断增加，从而y也就是l值不断来回摆动
    this.alpha+=deltaTime*0.0008;
    var l=Math.sin(this.alpha);//取值范围在[-1,1]

    // save和restore表示样式只在他两个之间起作用
    ctx2.save();
    ctx2.globalAlpha=0.3;//透明度
    ctx2.lineWidth=20;
    ctx2.lineCap="round";
    ctx2.strokeStyle="#CC34CA";
    for(var i=0;i<this.num;i++)
    {
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i],canHeight);
        this.headx[i]=this.rootx[i]+l*this.amp[i];
        ctx2.quadraticCurveTo(this.rootx[i],canHeight-50,this.headx[i],this.heady[i]);
        ctx2.stroke();
    }
    ctx2.restore();
}
