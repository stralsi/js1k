onload=function(){
	s = 5;//scale
	c = document.createElement("canvas");
	document.body.appendChild(c);
	ctx = c.getContext("2d");	
	monsterDirection = 1; //all the monsters are moving in the same direction
	monsterXOffset = 1; //all the monsters are moving at the same time
	monsterFrame = 0; // all the monsters have two frames
	
	mframes1 = ["¾m=<=m¾","x¾l<<<l¾x"];
	mframes2 = [":múúm:","=hüüh="];
	mframes3 = ["9yznìúúìnzy9",":}lìúúìl}:"];
	
	monsters = [monster(0,0,mframes1),monster(0,10,mframes2),monster(0,20,mframes3)];

	//debugger;
	setInterval(update,300);
};
update = function(){
	ctx.clearRect(0,0,c.width,c.height)
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
					ctx.fillRect(x*s,(y+bitIndex)*s,s,s);
				v = Math.floor(v/2);
			}
			bitIndex -= 1;
		}
		x += 1;
	}
}



