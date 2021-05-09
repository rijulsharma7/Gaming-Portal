function init() {
    console.log("inINIT");
     cs=50;
    canvas = document.getElementById('mycanvas');
 W=canvas.width = 1200;
 H=canvas.height = 550;
pen = canvas.getContext('2d');
     foodimage= new Image();
     foodimage.src= "straw.png";
     trophy= new Image();
     trophy.src= "trophie.png";
     food= getrandomfood();
     score=0;
    gameover =false;
    snake= {
        len:3,
        color:"blue",
        cells:[],
        direction:"right",
        createsnake:function(){
            for(var i=this.len;i>0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawsnake: function() {
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle=this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            }
        },
        updatesnake: function() {
          
           headX = this.cells[0].x;
           headY = this.cells[0].y;
            if(headX==food.x && headY==food.y){
                food=getrandomfood();
                score++;
            }
            else {
                this.cells.pop();
            }
            var nextX,nextY;
          if(this.direction=="right"){
              nextX= headX+1;
              nextY= headY;
          }
            else if(this.direction=="left"){
              nextX= headX-1;
              nextY= headY;
          }
            else if(this.direction=="up"){
              nextX= headX;
              nextY= headY-1;
          }
            else if(this.direction=="down"){
              nextX= headX;
              nextY= headY+1;
          }
          this.cells.unshift({x:nextX,y:nextY});
            lastx=Math.round(W/cs);
            lasty=Math.round(H/cs);
            if( nextX<0 || nextY<0 || nextX==lastx || nextY==lasty ){
                gameover=true;
            }
    },
    death: function() {
        for(var j=1;j,this.len;j++){
            var pos=this.cells[j];
            if(this.cells[0]==this.cells[j]){
                gameover=true;
            }
        }
    }
    };
     snake.createsnake();
     function keypress(e) {
         //console.log("keypressed",e.key);
         if(e.key=="ArrowUp"){
             snake.direction= "up";
         }
         else if(e.key=="ArrowDown"){
             snake.direction= "down";
         }
         else if(e.key=="ArrowRight"){
             snake.direction= "right";
         }
         else if(e.key=="ArrowLeft"){
             snake.direction= "left";
         }
     }
     document.addEventListener('keydown',keypress);
}
function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawsnake();
    pen.fillStyle=food.color;
    pen.drawImage(foodimage,food.x*cs,food.y*cs,cs,cs);
    pen.drawImage(trophy,8,8,cs*1.7,cs*1.7);
    pen.fillStyle= "blue";
    pen.font= "16px Bold";
    pen.fillText(score,42,40);
}
function update() {
    snake.updatesnake();
}
function getrandomfood() {
    var foodX= Math.round(Math.random()*(W-cs)/cs);
    var foodY= Math.round(Math.random()*(H-cs)/cs);
    var food = {
        x: foodX,
        y: foodY,
            color: "red",
    }
            return food;
}
function gameloop() {
    if(gameover==true) {
        clearInterval(f);
        alert("GameOver");
    }
    console.log("ingameloop");
    draw();
    update();
}
init();
var f = setInterval(gameloop, 100);