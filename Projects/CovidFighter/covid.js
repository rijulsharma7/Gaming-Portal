function loadImages() {
    enemy_image = new Image;
    enemy_image.src = "assets/covid.png";
    
    player_image = new Image;
    player_image.src = "assets/player.png";
    
    gem_image = new Image;
    gem_image.src = "assets/handsanitizer.png";
    
}

function inIt() {
    
    canvas = document.getElementById("mycanvas");
    
    W = 700;
    H = 500;
    
    canvas.width = W;
    canvas.height = H;
    
    pen = canvas.getContext('2d');
    
    gameover = false;
    
    e1 = {
        x : 130,
        y : 50,
        h : 80,
        w : 80,
        speed : 30,
    };
    
    e2 = {
        x : 305,
        y : 50,
        h : 80,
        w : 80,
        speed : 40,
    };
    
    e3 = {
        x : 470,
        y : 50,
        h : 80,
        w :80,
        speed : 50,
    };
    
    enemy = [e1,e2,e3]
    
    player = {
        x : 0,
        y : 3*H/5 - 25 ,
        h : 120,
        w : 60,
        speed : 20,
        moveing : false,
        health : 100,
    };
    
    gem = {
        x : W - 60,
        y : 300,
        h : 90,
        w : 60,
    };
    
    document.addEventListener('keydown',function(e){
        if(e.keyCode==32){
            player.moving=true;
        }
    })
    document.addEventListener('keyup',function(e){
        if(e.keyCode==32){
            player.moving=false;
        }
    })
    
    canvas.addEventListener("mousedown",function(){player.moving = true;});
    canvas.addEventListener("mouseup",function(){player.moving = false;});
    
}

function draw() {
    
    pen.clearRect(0,0,W,H);
    

    pen.drawImage(player_image,player.x,player.y,player.w,player.h);
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    
    for (let i=0; i<enemy.length; i++){
        pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
    
    pen.fillStyle = "indigo";
    pen.fillText("Score : " + player.health, 10, 10)
    
}

function update() {
    
    if ( player.moving ) {
        player.x += player.speed;
        player.health += 20;
    }
    
    for ( let i=0; i<enemy.length; i++ ) {
        if ( isOverLapped(player,enemy[i]) ) {
            //gameover = true;
            //return;
            player.health -= 50;
            if (player.health < 0) {
                gameover = true;
                alert("gameover :  " + player.health);
            }
        }
    }
    
    if( isOverLapped(player,gem) ) {
        gameover = true;
        alert("You Won!!");
        return;
    }
    
    for (let i=0; i<enemy.length; i++){
        enemy[i].y += enemy[i].speed;
    
        if ( enemy[i].y >= H-enemy[i].h || enemy[i].y < 0 ) {
            enemy[i].speed *= -1;
        }
    }
    
}

function isOverLapped( rect1, rect2 ) {
    if (rect1.x < rect2.x + rect2.w &&
       rect1.x + rect1.w - 20 > rect2.x &&
       rect1.y < rect2.y + rect2.h &&
       rect1.y + rect1.h > rect2.y) 
    {
        return true;
    }
    
    return false;
}

function gameloop() {
    
    if(gameover==true) {
        clearInterval(f);
    }
    
    draw();
    update();
    console.log("ingame");
    
    
}

loadImages();
inIt();
var f = setInterval(gameloop,100);