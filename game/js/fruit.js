var fruitObj =function () {
    this.alive=[];//boot值

    // 新建图片框
    this.orange=new Image();
    this.blue=new Image();

    // 果实的位置
    this.x=[];
    this.y=[];

    // 果实成熟后的，上浮速度
    this.spd=[];
    // 控制果实成长速度
    this.l=[];

    this.aneNum=[];

    // 果实类型
    this.fruiteType=[];
}
fruitObj.prototype.num=30;
fruitObj.prototype.init=function () {
    for(var i=0;i<this.num;i++)
    {
        this.alive[i]=false;//果实是否激活
        this.x[i]=0;
        this.y[i]=0;
        // 0.003到0.002
        this.spd[i]=Math.random()*0.017+0.003;
        this.fruiteType[i]="";
    }
    this.orange.src="./src/fruit.png";
    this.blue.src="./src/blue.png";
}

// 果实被吃掉或者浮出屏幕
fruitObj.prototype.dead=function (i) {
        this.alive[i]=false;
}
fruitObj.prototype.draw=function () {
    for(var i=0;i<this.num;i++)
    {
        // 控制果实成长
        // deltaTime使画面更平滑
        if(this.alive[i]) {
            if(this.fruiteType[i]=="blue")
            {
                var pic=this.blue;
            }
            else
                {
                    var pic=this.orange;
                }
                if (this.l[i] < 14) {
                    this.l[i] += this.spd[i] * deltaTime;
                    this.x[i]=ane.headx[this.aneNum[i]];
                    this.y[i]=ane.heady[this.aneNum[i]];
                }
                else {
                    this.y[i] -= this.spd[i] * 7 * deltaTime;
                }
            // 图片，位置，大小
            ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i])
            if(this.y[i]<10)
                this.alive[i]=false;
        }

         }
}
fruitObj.prototype.born=function(i)
{
    // 告诉海藻长在哪个海葵上
   this.aneNum[i]=Math.floor(Math.random()*ane.num);
    this.x[i]=ane.headx[this.aneNum[i]];
    this.y[i]=ane.heady[this.aneNum[i]];
    this.l[i]=0;
    this.alive[i]=true;
    var ran=Math.random();
    if(ran<0.15)
    {
        this.fruiteType[i]="blue";
    }
    else
        {
            this.fruiteType[i]="orange";
        }

}
// 保持屏幕上始终有一定数量的果实
function fruitMonitor() {
var num=0;
    for(var i=0;i<fruit.num;i++)
    {
        if(fruit.alive[i])
            num++;
    }
    if(num<11)
    {
        // 激活果实
        sendFruit();
        return;
    }
}

// 激活果实
function sendFruit() {
    for(var i=0;i<fruit.num;i++)
    {
        if(!fruit.alive[i])
        {
            fruit.born(i);
            return;
        }
    }
}