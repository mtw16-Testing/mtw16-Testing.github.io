function SceneHandler(scene){
    this.scene = scene,
    this.drawScene = function(ctx){
        scene.draw(ctx);
    }
}

function Scene(name, map){
    this.map = map,
    this.name = name,
    this.init = function(){

    },
    this.getScene = function(name){
        this.name = name;
        this.map.name = name;
        document.onkeydown = null;

        var image = new Image();
        //var image = document.getElementById("hidden");
        switch(this.name){
            case "Level 1":
                document.onkeydown = levelHandler;
                image.src = "maps/Level1.png"
                break;
            case "Options":
                initOptions();
                document.onkeydown = optionsHandler;
                break;
            case "Save Files":
                initSaveFile();
                document.onkeydown = saveFileHandler;
                break;
            default:
                break;
        }

        var tiles = [];
    

        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        //alert("width: " + image.width);
        canvas.getContext('2d').drawImage(image,0,0,image.width,image.height);
        var pixelData = canvas.getContext('2d').getImageData(0,0,image.width,image.height).data;
        for(var i = 0; i < image.height; i++){
            var row = i * image.width * 4;
            var innerTiles = [];
            for(var j = 0; j < image.width*4; j += 4){
                if(pixelData[row+j] == 255 && pixelData[row+j+1] == 0 && pixelData[row+j+2] == 0){ //red
                    innerTiles.push(1);
                }else if(pixelData[row+j] == 0 && pixelData[row+j+1] == 0 && pixelData[row+j+2] == 255){
                    innerTiles.push(2);
                }else if(pixelData[row+j] == 0 && pixelData[row+j+1] == 255 && pixelData[row+j+2] == 0){
                    innerTiles.push(3);
                }else{
                    innerTiles.push(-1);
                    //tiles[i/4] = 1;
                }
            }

            tiles.push(innerTiles);
        }

        map.tiles = tiles;
        map.rowSize = image.height;
        map.colSize = image.width;
       /* var para = document.createElement("p");
        for(var i = 0; i < image.height; i++){
            for(var j = 0; j < image.width; j++){
                //console.log(tiles[i][j] + " ");
                para.innerHTML += tiles[i][j] + " ";
            }
            para.innerHTML += "<br />";
        }
        document.body.append(para);*/

        //document.body.append(canvas);
        //do something to remove the image
        drawing = setInterval(function(){
            sceneHandler.drawScene(ctx)
        }, 1000/60);
    },
    this.draw = function(ctx){
        map.draw(ctx);
    }
}

function Map(name){
    this.name = name,
    this.tiles = [],
    this.rowSize = 0,
    this.colSize = 0,
    this.draw = function(ctx){
        switch(this.name){
            case "Level 1":
                drawLevel(ctx, this.tiles, this.rowSize, this.colSize);
                break;
            case "Options":
                drawOptionsScreen(ctx);
                break;
            case "Save Files":
                drawSaveFileScreen(ctx);
                break;
            default:
                ctx.fillStyle = "blue";
                ctx.fillRect(0,0,width,height);
                break;
        }
    },
    this.getMap = function(){
    
    },
    this.getMap()
}

function drawLevel(ctx, tiles, rowSize, colSize){
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,width,height);

    for(var i = 0; i < rowSize; i++){
        for(var j = 0; j < colSize; j++){
            switch(tiles[i][j]){
                case 1:
                    ctx.fillStyle = "white";
                    break;
                case 2:
                    ctx.fillStyle = "yellow";
                    break;
                case 3:
                    ctx.fillStyle = "brown";
                    break;
                default:
                    ctx.fillStyle = "#00cccc";
                    break;
            }
            
            ctx.fillRect(j*128,i*128,128,128);

            //ctx.drawImage(image,j*16,i*16,16,16);
        }
    }

    //have it draw the map
    //map as an image
}

function levelHandler(){
    //alert("level");
}

//sx = 0, sy = 0;
function initOptions(){
    options = ["Options Menu", "Press Backspace To Exit"];
}

function drawOptionsScreen(ctx){
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle = "red";
    ctx.fillRect(0,0,width,height);

    ctx.fillStyle = "black";
    ctx.font = "100px Sniglet";
    ctx.fillText(options[0], width / 2 - 300, 200);
    
    ctx.font = "60px Sniglet";
    ctx.fillText(options[1], width / 2 - 300, 500);
}

function optionsHandler(event){
    switch(event.keyCode){
        case 8:
            clearInterval(drawing);
            showStartMenu();
            break;
        default:
            break;
    }
}

function initSaveFile(){
    options = ["Save Files", "Press Backspace To Exit"];
}

function drawSaveFileScreen(ctx){
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle = "green";
    ctx.fillRect(0,0,width,height);

    ctx.fillStyle = "black";
    ctx.font = "100px Sniglet";
    ctx.fillText(options[0], width / 2 - 200, 200);
    
    ctx.font = "60px Sniglet";
    ctx.fillText(options[1], width / 2 - 300, 500);
}

function saveFileHandler(){
    switch(event.keyCode){
        case 8:
            clearInterval(drawing);
            showStartMenu();
            break;
        default:
            break;
    }
}
