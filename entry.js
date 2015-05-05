Z = 2; //scale (Zoom)
D = 1; //invaders direction. all the invaders are moving in the same direction
X = 20;//invaders X offset. all the invaders are moving sideways at the same time
O = //game over
Y = //invaders Y offset. all the invaders are moving down at the same time
Q = //current frame counter
g = //boolean which helps remember when invaders switched direction, so that they don't move down and sideways at the same time
F = 0; //all the invaders have two skins. This is the current skin index
K = {} //keys

S = "�|:múúm:|=hüüh=|¾m=<=m¾|x¾l<<<l¾x|9yznìúúìnzy9|:}lìúúìl}:|À".split('|'); //the skins of all the items in the game

//the collision function
//first param is a missile, second is a ship
C = function (m, s) {
    t = 0;
    e = s.t == 1 ? 4 : 0;//take into account that the invaders of type 1 are narrower and shifted to the right
    if (!s.d && //don't consider destroyed ships
        m.x < s.x + X + 12 - e &&
       m.x + 1 > s.x + X &&
       m.y < s.y + Y + 8 &&
       m.y + 2 > s.y + Y) {
        // collision detected!
        t = 1;
    }
    return t;
}

//the print function
P = function (x, y, b) { //b is the bits in the skin
    for (z = 0; z < b.length; z++) {
        $ = 8; //bit index
        v = b.charCodeAt(z);
        while ($) {
            if (v % 2 == 1)
                c.clearRect(x * Z, (y + $) * Z, Z, Z);
            v = v / 2 | 0;
            $ -= 1;
        }
        x += 1;
    }
}

//the array of invaders
I = [];

//add invaders column by column
for (i = 0; i < 11; i++) {
    k = [];
    I.push(k);
    u = i * 16; //cache the x coordinate, common to all the invaders in the column
    //x,y are the coordinates
    //t is the invader type
    k.push({ x: u, y: 40, t: 5 },
        { x: u, y: 30, t: 5 },
        { x: u, y: 20, t: 3 },
        { x: u, y: 10, t: 3 },
        { x: u + 2, y: 0, t: 1 });
}

//the human
H = { x: 0, y: 150, t: 0 }

//the missiles array
M = [{ d: 1 }];

//the human missile
h = M[0];

setInterval(function () {
    if (O) return; //game over

    c.fillStyle = 0;
    c.fillRect(0, 0, a.width, a.height)

    //keyboard events

    //K[0] - space key
    //its value is either "w" or undefined.
    if (K[0] && (h.y < 0 || h.d)) { //only allow the user to fire if his missile is destroyed or out of screen
        h.x = H.x + 6;
        h.y = H.y;
        h.d = 0;
    }

    //K[5] - left arrow
    //K[7] - right arrow
    //their values are either "w" or undefined. !"w" is 0, !undefined is 1
    H.x += !K[5] - !K[7];


    //printing and collision detection for human missiles
    for (i = 0; i < M.length; i++) {

        m = M[i]; //current missile

        if (!m.d) {//don't do anything if destroyed

            //collision detection
            for (j = 0; j < 11; j++) {
                for (k = I[j].length - 1; k >= 0; k--) {
                    s = I[j][k];
                    if (C(m, s)) {
                        I[j].splice(k, 1);
                        m.d = 1; //mark as destroyed
                    }
                }
            }

            if (!m.d) { //don't print if destroyed during collision detection

                //if it's the human missile go up, if it's any other missile go down
                m.y += m == h ? -2 : 2;

                //print human missiles
                P(m.x, m.y, S[7]);
            }
        }
    }

    //Print invaders
    for (i = 0; i < 11; i++) {

        O = O || (I[i][0] && (I[i][0].y + Y) > 150); //invaders have reached the bottom, game over

        for (k = 0; k < I[i].length; k++) {
            s = I[i][k];

            //Invader missiles
            if (k == 0 && //only the bottom row of invaders throws missiles. 
                Math.random() < .004) { //at every frame there's a 0.4% chance that a given invader will throw a missile. 
                M.push({ x: s.x + X + 6, y: s.y + Y + 15 })//They throw their missiles 15 pixels below their position, to avoid hitting themselves.
            };

            //the skin index is dependent on invader type
            //invader type 1 on position 1 and 2 in the Skins array
            //invader type 3 on position 3 and 4 in the Skins array
            //invader type 5 on position 5 and 6 in the Skins array
            P(s.x + X, s.y + Y, S[s.t + F]);
        }
    }

    //every 6o frames
    if (Q % 60 == 0) {

        //invader movement
        (X == 0 || X == 80) && !g ? //if at the edges of the playing field
               (D *= -1,//make invaders switch direction
               Y += 10,//move downwards
               g = 1)//prevent them from moving sideways
               ://else
               g = 0//allow moving sideways

        if (!g) {
            X += D * 10;//move invaders sideways
            F = !F;
        }  //make invaders go to next skin
    }

    //print human
    P(H.x, H.y, S[0]);

    Q++;//increment frame counter
}, 15);

onkeydown = onkeyup = function (k) {
    //K[0] will be space
    //K[5] will be left arrow
    //K[7] will be right arrow
    //k.type is either "keydown" or "keyup" so k.type[5] is either "w" or undefined
    K[k.which - 32] = k.type[5]
};

