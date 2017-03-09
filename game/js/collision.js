// 大鱼和果实碰撞,实质是判断大鱼和果实距离
function momFruitesCollision() {
    if(!data.gameOver)
    {
        for(var i=0;i<fruit.num;i++)
        {
            if(fruit.alive[i])
            {
                // 计算果实和大鱼的距离
                var l=calLength(fruit.x[i],fruit.y[i],mom.x,mom.y);
                if(l<900&&fruit.l[i]>=14)
                {
                    // 成熟的果实被吃掉
                    fruit.dead(i);

                    // 吃到果实时，大鱼身体颜色的变化
                    mom.momBodyCount++;
                    if ( mom.momBodyCount>7)
                    {
                        mom.momBodyCount=7;
                    }

                    // 记录果实数量
                    data.fruiteNum++;
                    if (fruit.fruiteType[i]=="blue")
                    {
                        // 吃到蓝色的翻倍果实
                        data.double=2;
                    }
                    wave.born(fruit.x[i],fruit.y[i]);
                }
            }
        }
    }

}

// 大鱼喂小鱼
function momBabyCollision() {

    var l=calLength(mom.x,mom.y,baby.x,baby.y);
    if(l<900&&data.fruiteNum>0&&!data.gameOver)
    {
        // 小鱼吃到果实,满血复活
        baby.babyBodyCount=0;
        mom.momBodyCount=0;
        data.addScore();
        halo.born(baby.x,baby.y);
    }

}