// 定义为类
var  momObj=function()
{
    // 类里的属性
    // 位置
    this.x;
    this.y;

    // 大鱼尾巴摆动计时器
    this.momTailTimer=0;
    // 记录尾巴图片为第几张
    this.momTailCount=0;

    // 大鱼眼睛计时器
    this.momEyeTimer=0;
    // 记录眼睛图片为第几张
    this.momEyeCount=0;
    //当前图片持续时间的长短
    this.momEyeInterval=1000;

    // 记录眼睛图片为第几张
    this.momBodyCount=0;

    // 角度
    this.angle;
}

// 添加初始化函数
momObj.prototype.init=function()
{
    this.x=canWidth*0.5;
    this.y=canHeight*0.5;
    this.angle=0;

}
momObj.prototype.draw=function()
{
    // 位置取向相近值
    this.x=lerpDistance(mx,this.x,0.97);
    this.y=lerpDistance(my,this.y,0.97);

    // delta angle
    // 求鼠标和大鱼的角度差
    // Math.atan2正切函数
    var deltaY=my-this.y;
    var delatX=mx-this.x;
    var beta =Math.atan2(deltaY,delatX)+Math.PI;

    // 大鱼角度
    this.angle=lerpAngle(beta,this.angle,0.6);

    // 大鱼尾巴计时器
    // deltaTime两帧之间的时间间隔
    this.momTailTimer+=deltaTime;
    if(this.momTailTimer>80)
    {
        // 一共八张图片
        this.momTailCount=(this.momTailCount+1)%8;
        // 计时器重置
        this.momTailTimer%=80;
    }

    //小鱼眼睛
    this.momEyeTimer+=deltaTime;
    if(this.momEyeTimer>this.momEyeInterval)
    {
        // 跳到下一个状态
        this.momEyeCount=(this.momEyeCount+1) %2;
        // 重置图片持续时间
        this.momEyeTimer%=this.momEyeInterval;

        // 当前为睁开眼睛时
        if(this.momEyeCount==0)
        {
            // 设置睁开眼睛的时间
            this.momEyeInterval=Math.random()*1500+2000;
        }
        else
        {
            this.momEyeInterval=200;
        }
    }


    var momTailCount=this.momTailCount;
    var momEyeCount=this.momEyeCount;
    var momBodyCount=this.momBodyCount;

    ctx1.save();
    // 改变中心点
    ctx1.translate(this.x,this.y);
    // 旋转
    ctx1.rotate(this.angle);
    ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5);
    if(data.double==1)
    {
        ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width*0.5,-momBodyOra[momBodyCount].height*0.5);

    }
    else
    {
        ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
    }
    ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
    ctx1.restore();
}