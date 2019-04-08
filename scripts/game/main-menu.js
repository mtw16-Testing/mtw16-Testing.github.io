function showMainMenu(){
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,width,height);
    ctx.globalAlpha = 1.0;

    ctx.drawImage(menuImage,224,100,1600,850);

    ctx.fillStyle = "white";
    ctx.font = "100px Sniglet";
    ctx.fillText("Paused", 900, 550);
}
