var myMusic=document.getElementById("musicId");//找到视频
var playAgin=document.getElementById("playAgin");
var music=document.getElementById("music");
//    喇叭静音
music.onclick=function () {
    if ( myMusic.muted==false)
    {
        document.getElementById("music").src="./src/trumpet1.png";
        myMusic.muted=true;
    }
    else
    {
        document.getElementById("music").src="./src/trumpet0.png";
        myMusic.muted=false;
    }
}
playAgin.onclick=function ()
{
    init();
}