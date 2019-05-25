
function startgame(){ 
    var c = document.getElementById("myCanvas");
    var cxt=c.getContext("2d");
    cxt.fillStyle= "#FF0000";
    //cxt.fillRect(0,0,150,75);
    //var person = document.getElementById("person");
    var personx = 200;
    var persony = 400;
    var personright = false;
    var personleft = false;
    var attack = false;
    var fireball = false;
    var count = 5;
    var enemyx = [0,0,0,0,0,0,0,0,0,0];//1-10隻敵人的x座標
    var enemyy = [0,0,0,0,0,0,0,0,0,0];//1-10隻敵人的y座標
    var personimg = document.createElement("img");
    var attackimg = document.createElement("img");
    
    
    var pci = 2;
    document.addEventListener("keydown",keydownn,false);
    document.addEventListener("keyup",keyupp,false);
    function keydownn(e){
        if(e.keyCode == 87){
            personleft =false;
        }
        else if(e.keyCode == 65){
            personleft = true;
        }
        else if(e.keyCode == 83){
            personleft =false;
        }
        else if(e.keyCode == 68){
            count++;
            if(count >3){//讓腳色移動換圖片
                //personimg.src = "images/00"+pci+".png";
                pci++;
                if(pci > 3)
                pci = 1;
                count = 0;
            }
            //console.log(22);
            personright = true;
        }
        else if(e.keyCode == 90){
            fireball = true;
            attack = true;
        }
    }
    function keyupp(e){
        //console.log(99);
        if(e.keyCode == 87){
            personleft = false;
        }
        else if(e.keyCode == 65){
            personleft = false;
        }
        else if(e.keyCode == 83){
            personleft = false;
        }
        else if(e.keyCode == 68){
            personright = false;
        }
        else if(e.keyCode == 90){
            //fire
            attack = false;
        }
    }
    function draw(){
        
        cxt.clearRect(0,0,c.width,c.height);
        
        if(personright){ 
            if(personx < 1400)
                personx += 10;
        }
        else if(personleft){
            if(personx > 0)
                personx -= 10;
        } 
        personimg.src = "images/00"+pci+".png";
       
       if(attack){
             personimg.src = "images/attack.png";    
             pci =2;
       }
       
       cxt.drawImage(personimg,personx,persony,100,100);
       if(fireball){
            for(var i = 0;i < 5;i++){
                cxt.drawImage(personimg,personx + 3,persony,100,100);
            }

        }
       //pci++;
        

        //console.log(personright);
           
    }
    setInterval(draw,30); 
draw();
}