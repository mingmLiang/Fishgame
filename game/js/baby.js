// 定义对象
var babyObj=function () {
    // 定义属性
    this.x;
    this.y;
    this.angle;

    // 小鱼尾巴摆动计时器
    this.babyTailTimer=0;
    // 记录尾巴图片为第几张
    this.babyTailCount=0;

    // 小鱼眼睛计时器
    this.babyEyeTimer=0;
    // 记录眼睛图片为第几张
    this.babyEyeCount=0;
    //当前图片持续时间的长短
    this.babyEyeInterval=1000;

    // 小鱼身体计时器
    this.babyBodyTimer=0;
    // 记录身体图片为第几张
    this.babyBodyCount=0;
    this.deadTime=400;
}
babyObj.prototype.init=function () {
    this.x=canWidth*0.5-50;
    this.y=canHeight*0.5+50;
    this.angle=0;
}
babyObj.prototype.draw=function () {
    // 让小鱼坐标趋向于大鱼坐标(距离)
    this.x=lerpDistance(mom.x,this.x,0.98);
    this.y=lerpDistance(mom.y,this.y,0.98);

    // 小鱼角度趋向于大鱼
    var deltaY=mom.y-this.y;
    var delatX=mom.x-this.x;
    var beta =Math.atan2(deltaY,delatX)+Math.PI;
    // 小鱼角度
    this.angle=lerpAngle(beta,this.angle,0.6);

    // 小鱼尾巴计时器
    // deltaTime两帧之间的时间间隔
    this.babyTailTimer+=deltaTime;
    if(this.babyTailTimer>50)
    {
        // 一共八张图片
        this.babyTailCount=(this.babyTailCount+1)%8;
        // 计时器重置
        this.babyTailTimer%=50;
    }

    //小鱼眼睛
    this.babyEyeTimer+=deltaTime;
    if(this.babyEyeTimer>this.babyEyeInterval)
    {
        // 跳到下一个状态
            this.babyEyeCount=(this.babyEyeCount+1) %2;
             this.babyEyeTimer%=this.babyEyeInterval;

        // 当前为睁开眼睛时
        if(this.babyEyeCount==0)
        {
            // 设置睁开眼睛的时间
            this.babyEyeInterval=Math.random()*1500+2000;
        }
        else
            {
                this.babyEyeInterval=200;
            }
    }

    // 小鱼身体
    this.babyBodyTimer+=deltaTime;
    if(this.babyBodyTimer>this.deadTime)
    {
        if( this.deadTime>271)
        this.deadTime=this.deadTime-1;
        this.babyBodyCount=this.babyBodyCount+1;
        this.babyBodyTimer%=300;
        if(this.babyBodyCount>19)
        {
            this.babyBodyCount=19;
            data.gameOver=true;
        }
    }
    var babyTailCount=this.babyTailCount;
    var babyEyeCount=this.babyEyeCount;
    var babyBodyCount=this.babyBodyCount;

    ctx1.save();
    // 改变中心点
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+25,-babyTail[babyTailCount].height*0.5);
    ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
    ctx1.drawImage(babyEye[ babyEyeCount],-babyEye[ babyEyeCount].width*0.5,-babyEye[ babyEyeCount].height*0.5);
    ctx1.restore();
}