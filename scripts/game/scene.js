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

        
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        alert("width: " + image.width + " : " + image.complete);
        canvas.getContext('2d').drawImage(image,0,0,image.width,image.height);
        //var pixelData = canvas.getContext('2d').getImageData(1,1,2,2).data;
        //alert("R: " + pixelData[0] + " G: " + pixelData[1] + " B: " + pixelData[2]);

        document.body.append(canvas);
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
    this.draw = function(ctx){
        switch(this.name){
            case "Level 1":
                drawLevel(ctx);
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

function drawLevel(ctx){
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle = "yellow";
    ctx.fillRect(0,0,width,height);

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