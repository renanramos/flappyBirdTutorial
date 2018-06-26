var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//carrega imagens
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeNorth.src = "img/pipeNorth.png";
pipeSouth.src = "img/pipeSouth.png";

var gap = 350;
var constant = pipeNorth.height+gap;

var bX = 5;
var bY = 150;

var gravity = 1.0;

var score = 0;

//on key down
document.addEventListener("keydown", moveUp);

function moveUp(){
    bY -= 50;
}

var pipe = [];

pipe[0] = {
    x : cvs.width+100,
    y : 0
}

// desenha as imagens
function draw(){    
    
    ctx.drawImage(bg,0,0);

    for(var i = 0; i < pipe.length; i++){

        ctx.drawImage(pipeNorth,pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);   

        pipe[i].x--;

        if(pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width+50,
                y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }
        
        if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width
            && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >=
             pipe[i].y + constant) || bY + bird.height >= cvs.height - fg.height){
                location.reload(true);//force to reload the page from the server.
        }
        
        if(pipe[i].x == 5){
            score++;
        }

    }

    ctx.drawImage(fg,0,(cvs.height - fg.height)+20);

    ctx.drawImage(bird,bX,bY);

    bY += gravity;
    
    ctx.fillStyle = "x000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
}

draw();