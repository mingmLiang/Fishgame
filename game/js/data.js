var dataObj=function () {
    // 果实数量
    this.fruiteNum=0;
    // 是否吃到蓝色的翻倍果实
    this.double=1;
    // 分值
    this.score=0;
    // GAMEOVER字体透明度
    this.alpha=0;
    // 游戏是否已结束
    this.gameOver=false;
}

dataObj.prototype.draw=function()
{
    var w=can1.width;
    var h=can1.height;
    if (data.gameOver)
    {
        if(this.alpha>1)
            this.alpha=1;
        this.alpha+=deltaTime*0.0003;
        ctx1.save();
        ctx1.shadowBlur=10;//阴影的距离
        ctx1.shadowOffsetY=-10;
        ctx1.shadowColor="white";
        ctx1.font="45px Gameoverfont";
        ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")";
        ctx1.fillText("GAME OVER",w*0.5,h*0.42);
        ctx1.restore();

    }
        ctx1.save();
        ctx1.font="45px Gameoverfont";
        ctx1.fillStyle="rgba(230,91,0,1)";
        if(this.score==0&&this.fruiteNum==0&&data.gameOver==false)
        {
            ctx1.fillText("play  go  ...",w*0.5,h*0.5-90);
        }
        ctx1.restore();
        ctx1.save();
        ctx1.font="24px Verdana";
        ctx1.fillStyle="white";

        ctx1.fillText("SCORE :  "+this.score,w*0.5,h-50);
        ctx1.font="12px Verdana";
        ctx1.shadowOffsetY=0;
        ctx1.shadowBlur=20;//阴影的距离
        ctx1.shadowColor="white";
        ctx1.fillText("爱心鱼 - mingming",w-60,h-15);
        ctx1.restore();

}

dataObj.prototype.addScore=function () {
    this.score+=this.fruiteNum*100*this.double;
    this.fruiteNum=0;
    this.double=1;
}