
// html5小游戏不断刷新
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            return window.setTimeout(callback, 1000 / 60);
        };
});


// 大鱼和鼠标距离，取相近值aim目标值，cur当前值，ratio百分比
function lerpDistance(aim,cur,ratio) {
    var delta=cur-aim;
    return aim+delta*ratio;
}

// 大鱼旋转的角度
function lerpAngle(a,b,p) {
    var d=b-a;
    if(d>Math.PI)
        d=d-2*Math.PI;
    if(d<-Math.PI)
        d=d+2*Math.PI;
    return a+d*p;
}

//计算距离的平方
function calLength(x1,y1,x2,y2) {
    return　Math.pow(x1-x2,2)+Math.pow(y1-y2,2);
}