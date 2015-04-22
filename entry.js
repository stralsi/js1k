s = 2;//scale
monsterDirection = 1; //all the monsters are moving in the same direction
monsterXOffset = 1; //all the monsters are moving at the same time
monsterFrame = 0; // all the monsters have two frames
	
mframes1 = ["¾m=<=m¾","x¾l<<<l¾x"];
mframes2 = [":múúm:","=hüüh="];
mframes3 = ["9yznìúúìnzy9",":}lìúúìl}:"];
	

update = function(){
	c.clearRect(0,0,a.width,a.height)
	for(var i = 0;i<monsters.length;i++){
		monsters[i].update();
	}
	monsterFrame = monsterFrame==0?1:0;
	if(monsterXOffset == 0 || monsterXOffset == 100){
		monsterDirection *= -1; y+=10;
	}
	monsterXOffset+=monsterDirection
}

monster = function(x,y,frames){
	this.x = x;
	this.y = y;
	this.frames = frames;	
	return{
		update:function(){

			x += monsterDirection;;
			
			p(x,y,frames[monsterFrame]);
		}
		//collide:function(){
		
		//}
	}
}

p = function(x,y,b){
	x=x||0; y=y||0;
	for (i = 0;i<b.length;i++){
		bitIndex = 8;
		v = b.charCodeAt(i);
		while(bitIndex>0){
			if(v>=0){
				if(v%2 == 1)
					c.fillRect(x*s,(y+bitIndex)*s,s,s);
				v = Math.floor(v/2);
			}
			bitIndex -= 1;
		}
		x += 1;
	}
}

monsters = [];
for (var i = 0; i < 11; i++) {
    monsters.push(monster(i * 16 + 2, 0, mframes2));
    monsters.push(monster(i * 16, 10, mframes1));
    monsters.push(monster(i * 16, 20, mframes1));
    monsters.push(monster(i * 16, 30, mframes3));
    monsters.push(monster(i * 16, 40, mframes3));
}


//debugger;
setInterval(update,300);
