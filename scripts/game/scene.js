function SceneHandler(scene){
    this.scene = scene,
    this.drawScene = function(){
        scene.draw();
        drawing = requestAnimationFrame(sceneHandler.drawScene);        
    }
}

function Scene(name, map){
    this.map = map,
    this.name = name,
    this.getScene = function(name){
        this.name = name;
        this.map.name = name;
        document.onkeydown = null;

        var isLevel = true;
        var image = new Image();
        //var image = document.getElementById("hidden");
        switch(this.name){
            case "Level 1":
                document.onkeydown = levelKeyDownHandler;
                //document.onkeyup = levelKeyUpHandler;
                image.src = "maps/Level1.png"
                map.getMap("images/spritesheets/spritesheet1.png");
                break;
            case "Options":
                initOptions();
                document.onkeydown = optionsHandler;
                isLevel = false;
                break;
            case "Save Files":
                initSaveFile();
                document.onkeydown = saveFileHandler;
                isLevel = false;
                break;
            default:
                break;
        }

        if(isLevel){
            var tiles = [];    

            var canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            canvas.getContext('2d').drawImage(image,0,0,image.width,image.height);
            var pixelData = canvas.getContext('2d').getImageData(0,0,image.width,image.height).data;
            for(var i = 0; i < image.height; i++){
                var row = i * image.width * 4;
                var innerTiles = [];
                for(var j = 0; j < image.width*4; j += 4){
                    if(pixelData[row+j] == 0 && pixelData[row+j+1] == 255 && pixelData[row+j+2] == 0){ //green
                        innerTiles.push(1);
                    }else if(pixelData[row+j] == 165 && pixelData[row+j+1] == 98 && pixelData[row+j+2] == 98){ //left path
                        innerTiles.push(2);
                    }else if(pixelData[row+j] == 165 && pixelData[row+j+1] == 42 && pixelData[row+j+2] == 42){ //middle path
                        innerTiles.push(3);
                    }else if(pixelData[row+j] == 165 && pixelData[row+j+1] == 0 && pixelData[row+j+2] == 0){ //right path
                        innerTiles.push(4);
                    }else if(pixelData[row+j] == 170 && pixelData[row+j+1] == 170 && pixelData[row+j+2] == 170){ //gray
                        innerTiles.push(5);
                    }else{
                        innerTiles.push(-1);
                    }
                }

                tiles.push(innerTiles);
            }

            map.tiles = tiles;
            map.rowSize = image.height;
            map.colSize = image.width;
            

        }
        
        drawing = requestAnimationFrame(sceneHandler.drawScene);
        //drawing = setInterval(function(){
        //    sceneHandler.drawScene(ctx)
        //}, 1000/60);
    },
    this.draw = function(){
        map.draw();
    }
}

function Map(name){
    this.name = name,
    this.tiles = [],
    this.rowSize = 0,
    this.colSize = 0,
    this.image = new Image(),
    this.draw = function(){
        switch(this.name){
            case "Level 1":
                drawLevel(this, this.tiles, this.rowSize, this.colSize);
                break;
            case "Options":
                drawOptionsScreen();
                break;
            case "Save Files":
                drawSaveFileScreen();
                break;
            default:
                ctx.fillStyle = "blue";
                ctx.fillRect(0,0,width,height);
                break;
        }
    },
    this.getMap = function(sheetName){
        this.image.src = sheetName;
    }
}

var mainMenuOn = false;
var dx = 0, dy = 0;
var left = false, up = false, right = false, down = false;
function drawLevel(map, tiles, rowSize, colSize){
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,width,height);

    var xPos = 0, yPos = 0; 
    for(var i = 0; i < rowSize; i++){
        for(var j = 0; j < colSize; j++){
            switch(tiles[i][j]){
                case 1:
                    xPos = 0;
                    yPos = 0;
                    break;
                case 2:
                    xPos = 1;
                    yPos = 0;
                    break;
                case 3:                 
                    xPos = 2;
                    yPos = 0;
                    break;
                case 4:                 
                    xPos = 3;
                    yPos = 0;
                    break;
                case 5:
                    xPos = 0;
                    yPos = 1;
                    break;
                default:
                    xPos = 0;
                    yPos = 0;
                    break;
            }

            if(j == 0 && ((j+(dx/8))+0.25)*64 > 0){
                left = false;
            }else if(j == 0){
                left = true;
            }

            if(j == colSize-1 && ((j+(dx/8))+0.75)*64 < width){
                right = false;
            }else if(j == colSize - 1){
                right = true;
            }

            if(i == 0 && ((i+(dy/8))+0.25)*64 > 0){
                up = false;
            }else if(i == 0){
                up = true;
            }

            if(i == rowSize-1 && ((i+(dy/8))+0.75)*64 < height){
                down = false;
            }else if(i == rowSize - 1){
                down = true;
            }
            ctx.drawImage(map.image,xPos*64,yPos*64,64,64,(j+(dx/8))*64,(i+(dy/8))*64,64,64);
        }
    }

    if(mainMenuOn){
        showMainMenu();
    }
}

function levelKeyDownHandler(){
    switch(event.keyCode){        
        case 13:
            if(!mainMenuOn){
                mainMenuOn = true;
            }else{ 
                mainMenuOn = false;
            }
            break;
        case 37:
            //left = true;
            if(left){
                dx++;
            }
            break;
        case 38:
            //up = true;
            if(up){
                dy++;
            }
            break;
        case 39:
            //right = true;
            if(right){
                dx--;
            }
            break;
        case 40:
            //down = true;
            if(down){
                dy--;
            }
            break;
        case 70:
            toggleFullScreen();
            break;
        default:
            break;
    }
}

function levelKeyUpHandler(){
    switch(event.keyCode){
        case 37:
            left = false;
            break;
        case 38:
            up = false;
            break;
        case 39:
            right = false;
            break;
        case 40:
            down = false;
            break;
        default:
            break;
    }
}

function initOptions(){
    options = ["Options Menu", "Press Backspace To Exit"];
    currentOption = 0;
    
    background.src= "images/backgrounds/OptionsMenuBackground.png";
}

function drawOptionsScreen(){
    ctx.clearRect(0,0,width,height);
    //ctx.fillStyle = "red";
    //ctx.fillRect(0,0,width,height);
    
    ctx.drawImage(background, 0, 0, width, height);

    ctx.fillStyle = "black";
    ctx.font = "100px Sniglet";
    ctx.fillText(options[0], width / 2 - 300, 200);
    
    ctx.font = "60px Sniglet";
    ctx.fillText(options[1], width / 2 - 300, 500);
}

function optionsHandler(event){
    switch(event.keyCode){
        case 8:
            cancelAnimationFrame(drawing);
            //clearInterval(drawing);
            showStartMenu();
            break;
        case 70:
            toggleFullScreen();
            break;
        default:
            break;
    }
}

function initSaveFile(){
    options = ["Save Files", "Save File 1", "Save File 2", "Save File 3", "Press Backspace To Exit"];
    currentOption = 1;
    
    background.src= "images/backgrounds/SaveMenuBackground.png";
}

function drawSaveFileScreen(){
    ctx.clearRect(0,0,width,height);
    //ctx.fillStyle = "green";
    //ctx.fillRect(0,0,width,height);

    ctx.drawImage(background, 0, 0, width, height);

    ctx.fillStyle = "white";
    ctx.font = "100px Sniglet";
    ctx.fillText(options[0], width / 2 - 200, 200);
    
    ctx.font = "60px Sniglet";
    for(var i = 1; i < options.length-1; i++){
        if(i == currentOption){
            ctx.fillStyle = "yellow";
        }else{
            ctx.fillStyle = "white";
        }

        ctx.fillText(options[i], width / 2 - 130, 350+i*100);
    }
    
    ctx.fillStyle = "white";
    ctx.fillText(options[options.length-1], width / 2 - 300, 800);
    
}

function saveFileHandler(){
    switch(event.keyCode){
        case 8:
            cancelAnimationFrame(drawing);    
            //clearInterval(drawing);
            showStartMenu();
            break;
        case 38:
            if(currentOption > 1){
                currentOption--;
            }
            break;
        case 40:
            if(currentOption < options.length-2){
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
