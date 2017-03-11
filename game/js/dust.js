var dustObj=function () {
    this.x=[];
    this.y=[];
    // 摇摆振幅
    this.amp=[];

    // 表示第几张尘埃图片
    this.NO=[];

    this.alpha;
}
dustObj.prototype.num=30;
dustObj.prototype.init=function () {
    for(var i=0;i<this.num;i++)
    {
        this.x[i]=Math.random()*canWidth;
        this.y[i]=Math.random()*canHeight;
        this.amp[i]=20+Math.random()*25;
        this.NO[i]=Math.floor(Math.random()*7);//Math.floor取整，[0,7）
    }
    this.alpha=0;
}
dustObj.prototype.draw=function () {
    this.alpha+=deltaTime*0.0008;
    var l=Math.sin(this.alpha);//取值范围在[-1,1]
        for(var i=0;i<this.num;i++)
        {
            var no=this.NO[i];
            ctx1.drawImage(dustPic[no],this.x[i]+this.amp[i]*l,this.y[i]);
        }
}