function showMainMenu(){
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,width,height);
    ctx.globalAlpha = 1.0;
    
    ctx.drawImage(menuImage,100,100,1500,1000);
}