Z=2;O=Q=0;K={};l="length";S="�|:múúm:|=hüüh=|¾m=<=m¾|x¾l<<<l¾x|9yznìúúìnzy9|:}lìúúìl}:|À|D(DD(D".split('|');C=function(b,d){t=0;e=1==d.t?4:0;b.x<d.x+12-e&&b.x+1>d.x&&b.y<d.y+8&&b.y+2>d.y&&(t=1);return t};
P=function(b,d,f){for(z=0;z<f[l];z++){v=f.charCodeAt(z);for($=8;$;$--)1==v%2&&c.clearRect(b*Z,(d+$)*Z,Z,Z),v=v/2|0;b+=1}};I=[];for(i=0;11>i;i++)k=[],I.push(k),u=16*i,k.push({x:u,y:40,t:5},{x:u,y:30,t:5},{x:u,y:20,t:3},{x:u,y:10,t:3},{x:u+2,y:0,t:1});H={x:0,y:150,t:0};h={d:1};M=[h];
setInterval(function(){if(!O){c.fillStyle=0;c.fillRect(0,0,a.width,a.height);K[0]&&(0>h.y||h.d)&&(h.x=H.x+6,h.y=H.y-5,h.d=0);H.x+=!K[5]-!K[7];for(i=0;i<M[l];i++)if(m=M[i],!m.d){for(j=0;11>j;j++)for(k=0;k<I[j][l];k++)s=I[j][k],C(m,s)&&(s.d=m.d=1);C(m,H)&&(O=1);m.d||(m.y+=m==h?-2:2,P(m.x,m.y,S[7]))}for(i=0;11>i;i++)for(O=O||I[i][0]&&150<I[i][0].y,k=0;k<I[i][l];k++)s=I[i][k],0==Q%60&&(0==Q%540?s.y+=10:s.x+=0==(Q/540|0)%2?10:-10),0==k&&.004>Math.random()&&M.push({x:s.x+6,y:s.y+15}),P(s.x,s.y,S[s.d?8:
s.t+(Q/60|0)%2]),s.d&&(5>s.d?s.d++:I[i].splice(k,1));P(H.x,H.y,S[0]);Q++}},15);onkeydown=onkeyup=function(b){K[b.which-32]=b.type[5]};