function showMainMenu(){
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,width,height);
    ctx.globalAlpha = 1.0;

    ctx.drawImage(menuImage,224,100,1600,850);

    ctx.fillStyle = "white";
    ctx.font = "100px Sniglet";
    ctx.fillText("Paused", 880, 525);
}

function mainMenuHandler(){
    switch(event.keyCode){        
        case 13:
            mainMenuOn = false;
            document.onkeydown = null;
            document.onkeydown = levelKeyDownHandler;
            break;
        case 38:
            alert("up");
            break;
        case 40:
            alert("down");
            break;
        case 70:
            toggleFullScreen();
            break;
        default:
            break;
    }
}
