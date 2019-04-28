var subMenu = 0;
var currentMapOption = 0, mapColumnNumber = 0;

function showMainMenu(){
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,width,height);
    ctx.globalAlpha = 1.0;

    ctx.drawImage(menuImage,224,100,1600,850);

    ctx.fillStyle = "white";
    ctx.font = "100px Sniglet";
    ctx.fillText("Main Menu", 820, 260);
    
    switch(subMenu){
        case 0:
            showTopLevelMenu();
            break;
        case 1:
            showMapMenu();
            break;
        default:
            break;
    }
}

function showTopLevelMenu(){
    ctx.font = "80px Sniglet";
    for(var i = 0; i < options.length; i++){
        if(i == currentOption){
            ctx.fillStyle = "yellow";
        }else{
            ctx.fillStyle = "white";
        }

        ctx.fillText(options[i], width / 2  - 150, (height / 2) - 90 + 125 * i);        
    }
}

function showMapMenu(){
    ctx.font = "48px Sniglet";
    for(var i = 0; i < mapEntries.length; i++){
        if(i == currentMapOption){
            ctx.fillStyle = "yellow";
        }else{
            ctx.fillStyle = "white";
        }

        ctx.fillText(mapEntries[i], 350 + (mapColumnNumber*100), 350 + (i*70));        
    }
    
    ctx.fillStyle = "white";
    ctx.textAlign = "center"; 
    ctx.fillText("Press Esc to Go Back", width/2, height/2 + 350);   
    ctx.textAlign = "start"; 
}

function mainMenuHandler(){
    var keyCode = event.which || event.keyCode;
    
    switch(keyCode){
        case 13:
            if(currentOption == 0){
                mainMenuOn = false;
                document.onkeydown = null;
                document.onkeydown = levelHandler;
                for ( i = 0; i < Enemies.length; i++ ) {
                    if ( Enemies[i].death == false )
                      Enemies[i].whichAction = "alive";
                }
            }else if(currentOption == 1){
                subMenu = 1;
                document.onkeydown = null;
                console.log("here 1");
                document.onkeydown = mapMenuHandler;
                console.log("here 2");
            }else if(currentOption == 2){
                saveGame();
                alert("Game succesfully saved.");
            }else if(currentOption == (options.length-1)){
                mainMenuOn = false;
                document.onkeydown = null;
                cancelAnimationFrame(drawing);
                showStartMenu();
            }
            break;      
        case 27:
            mainMenuOn = false;
            document.onkeydown = null;
            document.onkeydown = levelHandler;
            break;
        case 38:
            if(currentOption > 0){
                currentOption--;
            }
            break;
        case 40:
            if(currentOption < options.length-1){
                currentOption++;
            }
            break;
        case 70:
            toggleFullScreen();
            break;
        default:
            break;
    }
}


function mapMenuHandler(){
    var keyCode = event.which || event.keyCode;
    switch(keyCode){
        case 13:
            if(sceneHandler.scene.name != mapEntries[currentMapOption]){
                sceneHandler.scene.getScene(mapEntries[currentMapOption]);
            }
            break;      
        case 27:            
            subMenu = 0;
            document.onkeydown = null;
            document.onkeydown = mainMenuHandler;
            break;
        case 38:
            if(currentMapOption > 0){
                currentMapOption--;
            }
            break;
        case 40:
            if(currentMapOption < mapEntries.length-1){
                currentMapOption++;
            }
            break;
        case 70:
            toggleFullScreen();
            break;
        default:
            break;
    }
}
