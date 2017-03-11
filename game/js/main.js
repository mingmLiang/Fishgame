// 画布
var can1;
var can2;

// 2d环境
var ctx1;
var ctx2;

// 为使物体运动平滑，使用时间差，调整运动
var lastTime;//上一帧的事件
var deltaTime;//下一帧时间

// 背景
var bgPic=new Image();

// canvas的宽高
var canWidth;
var canHeight;

// 海葵
var ane;

// 果实
var fruit;

// 鱼妈妈
var mom;
var momTail=[];// 鱼尾巴数组
var momEye=[];//鱼眼睛数组
var momBodyOra=[];//身体
var momBodyBlue=[];

// 小鱼
var baby;
var babyTail=[];// 小鱼尾巴数组
var babyEye=[];//小鱼眼睛数组
var babyBody=[];//小鱼身体数组
// 鼠标位置
var mx;
var my;

// 计算分值
var data;

// 特效，海波
var wave;//大鱼圈圈
var halo;//小鱼圈圈

// 漂浮物
var dust;
var dustPic=[];


// 当文档加载完之后，执行函数
// 把game作为所有js脚本的入口
document.body.onload=game;
function game() {
    // 控制台打印
    // console.log("onload");

    init();//初始化函数
    lastTime=Date.now();
    deltaTime=0;
    gameloop();//游戏循环
}
function init() {


    //获取画布
    can1=document.getElementById("canvas1");
    can2=document.getElementById("canvas2");
    change();

    //获取允许进行绘制的2d环境
    ctx1=can1.getContext("2d");//     （ z-index=1）前面一层，fishes,dust,UI,circle
    ctx2=can2.getContext("2d");// （ z-index=0）后面一层，background,ane(海葵),fruits

    can1.addEventListener('mousemove',onMouseMove,false);

    bgPic.src="./src/background.jpg";
    canWidth=can1.width;
    canHeight=can1.height;

    // 分值计算，后台信息
    data=new dataObj();
    // 海葵
    ane=new aneObj();
    ane.init();

    // 果实
    fruit=new fruitObj();
    fruit.init();

    // 鱼妈妈
     mom=new  momObj();
    mom.init();

    // 小鱼
    baby=new babyObj();
    baby.init();


    // 小鱼尾巴
    for(var i=0;i<8;i++)
    {
        babyTail[i]=new Image();
        babyTail[i].src="./src/babyTail"+i+".png";
    }
    // 小鱼眼睛
    for(var i=0;i<2;i++)
    {
        babyEye[i]=new Image();
        babyEye[i].src="./src/babyEye"+i+".png";
    }
    // 小鱼身体
    for(var i=0;i<20;i++)
    {
        babyBody[i]=new  Image();
        babyBody[i].src="./src/babyFade"+i+".png";
    }


    // 大鱼
    // 大鱼尾巴
    for(var i=0;i<8;i++)
    {
        momTail[i]=new Image();
        momTail[i].src="./src/bigTail"+i+".png";
    }
    // 大鱼眼睛
    for(var i=0;i<2;i++)
    {
        momEye[i]=new Image();
        momEye[i].src="./src/bigEye"+i+".png";
    }

    // 大鱼身体
    for(var i=0;i<8;i++)
    {
        momBodyOra[i]=new Image();
        momBodyBlue[i]=new Image();
        momBodyOra[i].src="./src/bigSwim"+i+".png";
        momBodyBlue[i].src="./src/bigSwimBlue"+i+".png";
    }

    // 鼠标位置
    mx=canWidth*0.5;
    my=canHeight*0.5;

    // 分值字体设置
    ctx1.textAlign="center";

    // 特效
    wave=new waveObj();
    wave.init();

    halo=new haloObj();
    halo.init();

    // 漂浮物
    for(var i=0;i<7;i++)
    {
        dustPic[i]=new Image();
        dustPic[i].src="./src/dust"+i+".png";
    }
    dust=new dustObj();
    dust.init();
}
// 游戏循环，让游戏动起来
function gameloop() {
    requestAnimationFrame(gameloop);//setInterval,setTimeout,frame per second
    var now=Date.now();
    if(winw !=document.documentElement.clientWidth)
        change();

    // 两个刷新帧之间的间隔
    deltaTime=now-lastTime;
    // 解决网页被闲置时，果实变得无限大的问题
    if(deltaTime>50)
        deltaTime=50;
    lastTime=now;


    drawBackground();
    ane.draw();
    fruitMonitor();
    momFruitesCollision();
    fruit.draw();

    // 清空画布
    ctx1.clearRect(0,0,canWidth,canHeight);
    mom.draw();
    momBabyCollision();
    baby.draw();

    // 绘制积分
    data.draw();

    wave.draw();
    halo.draw();

    dust.draw();
}
function onMouseMove(event) {
    if(!data.gameOver)
    if(event.offsetX||event.layerX)
    {
        // 表示事件源相对于父元素的X坐标。
        // FF没有offsetX属性，有个layerX属性，
        // 只要将事件源的位置设置成相对定位(position:relative)或绝对定位(position:absolute)，
        // 两者结果就相等
        mx=event.offsetX ? event.layerX : event.offsetX;
        my=event.offsetY ? event.layerY : event.offsetY;
    }
}