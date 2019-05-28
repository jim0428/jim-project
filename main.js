
function startgame(){ 
    var c = document.getElementById("myCanvas");
    var cxt=c.getContext("2d");
    cxt.fillStyle= "#FF0000";
    //cxt.fillRect(0,0,150,75);
    //var person = document.getElementById("person");
    var mainblood = 1000;
    var personx = 200;
    var persony = 400;
    var fireballx = [0,0,0,0];//基本攻擊
    var firebally = [0,0,0,0];
    var personright = false;
    var personleft = false;
    var attack = false;
    var fireball = false;
    var fireballexecute = [false,false,false,false];
    var fireballexecutetimes = [0,0,0,0];
    var count = 5;
    var enemyx = [100,200,300,876,234,564,378,1245,500,22];//1-10隻敵人的x座標
    var enemyy = [390,390,390,390,390,390,390,390,390,390];//1-10隻敵人的y座標
    var enemyblood = [100,100,100,100,100,100,100,100,100,100]//敵人的血量
    var enemymove = [0,0,0,0,0,0,0,0,0,0];
    var revival = 0;
    for(var i =0;i<10;i++){
        enemyx[i] = Math.floor(Math.random()*1500);
    }
    var changeenemyimg = [0,0,0,0,0,0,0,0,0,0];
    var badmanpicture = [1,1,1,1,1,1,1,1,1,1];
    var does = 0;
    var enemynumber = 1;
    var enemyisproduce = [true,true,true,true,true,true,true,true,true,true];
    var enemydirection = [true,true,true,true,true,true,true,true,true,true];
    var personimg = document.createElement("img");
    personimg.src = "images/002.png";
    var fireballimg = document.createElement("img");
    var enemyimg = document.createElement("img");
    var enemyarr = [];
    for(var i =0;i < 4;i++){
        enemyarr[i] = document.createElement("img");
    }
    var enemyarrl = [];
    for(var i =0;i < 4;i++){
        enemyarrl[i] = document.createElement("img");
    }
    for(var i = 1;i < 4;i++){
        enemyarr[i].src = "images/badman_00"+i+".png";//先load
        enemyarrl[i].src = "images/badman_000"+i+".png";
    }
    enemyimg.src = "images/badman_001.png";
    var directionisright = true;
    var fireballdirection = [true,true,true,true];

    var pci = 2;
    document.addEventListener("keydown",keydownn,false);
    document.addEventListener("keyup",keyupp,false);
    function keydownn(e){
        if(e.keyCode == 87){
            personleft =false;
        }
        else if(e.keyCode == 65){
            directionisright = false;
            personleft = true;
        }
        else if(e.keyCode == 83){
            personleft =false;
        }
        else if(e.keyCode == 68){
            directionisright = true;
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
            fireball = false;
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
        count++;
        if(count >3){//讓腳色移動換圖片
            //personimg.src = "images/00"+pci+".png";
            pci++;
            if(pci > 3)
            pci = 1;
            count = 0;
        }
       
        if(personright)//面右
             personimg.src = "images/00"+pci+".png";
       else if(personleft)//面左
            personimg.src = "images/000"+pci+".png";
       if(attack){
           if(directionisright)
                personimg.src = "images/attack.png";  
            else  
                 personimg.src = "images/attack_rev.png";  
             pci = 2;
       }
       
       cxt.drawImage(personimg,personx,persony,100,100); 
       //pci++;
        fireballmove();
        produceenemy();
        hit();
        //console.log(personright);
           
    }
   
    function hit(){
        for(var i = 1;i < 4;i++){
            if(fireballexecute[i]){//火球在右邊的時候，但不能只有判斷方向
                for(var k = 0;k < enemynumber;k++){
                    if(enemyx[k] - 11 < fireballx[i] &&enemyx[k] +11 > fireballx[i]){
                        enemyblood[k] -= 20;
                        if( enemyblood[k] < 0 )
                        {
                            enemyisproduce[k] = false;
                        }
                        fireballexecute[i] = false;
                        fireballx[i] = -1;
                        break;
                    }
                 }
                 
            }
            // else if(!fireballdirection[i] && fireballexecute[i]){//火球在左邊的時候
            //     for(var k = 0;k < 10;k++){
            //         if(enemyx[k] > fireballx[i] -20 &&enemyx[k] > fireballx[i] +20){
            //             enemyblood[k] -= 20;
            //             fireballexecute[i] = false;
            //             fireballx[i] = 1600;
            //             break;
            //         }
            //      }
            // }
            
        }
        console.log(enemyblood[0]);
    }

    var n = 0;
    function produceenemy(){
        n++;
        if(n == 100)
        {
            n = 0;
            enemynumber++;
        }
        if(enemynumber>7)
             enemynumber = 7;

        does++;
 
        for(var i = 0;i < enemynumber;i++){
            if(enemyisproduce[i]){
                cxt.drawImage(enemyimg, enemyx[i],enemyy[i],100,100);
                if(!enemydirection[i])
                {
                     enemyimg.src = enemyarrl[badmanpicture[i]].src;
                }
                else
                {
                    enemyimg.src = enemyarr[badmanpicture[i]].src;
                }
                console.log(enemyimg);
                changeenemyimg[i]++;
                if(changeenemyimg[i] > 5){
                    badmanpicture[i]++;
                    if(badmanpicture[i] > 3){
                        badmanpicture[i] =1;
                    }
                    changeenemyimg[i] = 0;
                }
                if(does == 20 ){
                    var number = Math.floor(Math.random()*2)+1;
                    if(number == 1 && enemyx[i] <1450){
                        enemydirection[i] = false;
                        enemymove[i] = Math.floor(Math.random()*5)+1;
                    }
                    else if(number == 2 && enemyx[i] > 0){
                        enemydirection[i] = true;
                        enemymove[i] = -Math.floor(Math.random()*9)+1;
                    }
                    if(i == enemynumber - 1)
                        does = 0;
                    // console.log(enemymove[i]);
                    // console.log(number);
                }

                if(enemyx[i] > 0 &&enemyx[i] <1400){
                    enemyx[i] += enemymove[i];
                }
                else if(enemyx[i] >= 1400){
                    enemyx[i] = 1399;
                }
                else if(enemyx[i] <= 0)
                    enemyx[i] = 1;
               
        }
        else {
            revival++;
            if(revival > 10){
            enemyx[i] = Math.floor(Math.random()*1390) + 1;
            enemyisproduce[i] = true;
            enemyblood[i] = 100;
             }
        }
        }
    }


    function fireballmove(){
        for(var i = 1;i < 4;i++){
            var execute = false;//判斷可不可以被丟
            if(i == 1 && !fireballexecute[2] && !fireballexecute[3])//場上沒有球時，一定可以丟球
            {
                execute = true;
                // if(fireballexecutetimes[3] > 15 || fireballexecute[i] || fireballexecute[0]){
                //     execute = true;
                //     fireballexecute[0] = false;
                //     //fireballexecutetimes[3] = 0;
                // }
            }
            else if(i == 1 && (fireballexecutetimes[3] > 8 || fireballexecute[1]))//當第三顆球大於十五，自己已經被丟
            {
                execute = true;
            }
            else if(i != 1)
            {
                if(fireballexecutetimes[i-1] > 8 || fireballexecute[i]){//fireballexecute[i] 當 上一顆歸零，自己正在丟
                    execute = true;
                }
            }
            if(execute){
                //if(fireballexecutetimes[i-1] > 10 ){
                    if(fireball && !fireballexecute[i] ){//按下攻擊鍵 + 當前火球還沒被丟才可以丟
                        fireballexecute[i] = true;
                        if(directionisright)
                            fireballx[i] = personx +50;
                        else
                           fireballx[i] = personx - 50;
                        firebally[i] = persony;
                        fireballdirection[i] = directionisright;
                    }
                    if(fireballexecute[i]){
                        if(fireballdirection[i]){
                            fireballimg.src = "images/fireball.png"; 
                            fireballx[i] += 20;
                        }
                        else{
                            fireballimg.src = "images/fireball_rev.png";
                            fireballx[i] -= 20;
                        }
                        cxt.drawImage(fireballimg,fireballx[i],firebally[i],100,100);

                        
                        fireballexecutetimes[i]++;
                    }
                    if(fireballexecutetimes[i] == 30){
                        fireballexecutetimes[i] = 0;
                        fireballexecute[i] = false;//跑到20變回false，不飛了
                    }
            }
        }
        
    }
    setInterval(draw,30); 
draw();
}