Z = 2; //scale (Zoom)
D = 1; //invaders direction. all the invaders are moving in the same direction
X = 20;//invaders X offset. all the invaders are moving sideways at the same time
Y = //invaders Y offset. all the invaders are moving down at the same time
Q = //current frame counter
g = //boolean which helps remember when invaders switched direction, so that they don't move down and sideways at the same time
F = 0; //all the invaders have two skins. This is the current skin index
K = {} //keys

S = "�|:múúm:|=hüüh=|¾m=<=m¾|x¾l<<<l¾x|9yznìúúìnzy9|:}lìúúìl}:|À".split('|'); //the skins of all the items in the game

//the print function
P = function (x, y, b) { //b is the bits in the skin
    for (z = 0; z < b.length; z++) {
        $ = 8; //bit index
        v = b.charCodeAt(z);
        while ($ > 0) {
            if (v >= 0) {
                if (v % 2 == 1)
                    c.clearRect(x * Z, (y + $) * Z, Z, Z);
                v = Math.floor(v / 2);
            }
            $ -= 1;
        }
        x += 1;
    }
}

//the array of invaders
I = [];

//add invaders column by column
for (i = 0; i < 11; i++) {
    r = i * 16; //column x
    I.push({ x: r + 2, y: 0, t: 1 },
        { x: r, y: 10, t: 2 },
        { x: r, y: 20, t: 2 },
        { x: r, y: 30, t: 3 },
        { x: r, y: 40, t: 3 });
}

//the human
H = { x: 0, y: 150, t: 0 }

//the human missles
M = [];

setInterval(function () {
    c.fillStyle = 0;
    c.fillRect(0, 0, a.width, a.height)

    //keyboard events

    //K[0] will be space
    K[0] ? M.push({ x: H.x + 6, y: H.y, t: 3 }) : "";

    //K[5] - left arrow
    //K[7] - right arrow
    //their values are either "w" or undefined. !"w" is 0, !undefined is 1
    H.x += !K[5] - !K[7];


    //printing and collition detection for human missles
    for (i = 0; i < M.length; i++) {

        m = M[i]; //current missle

        if (!m.d) {//don't do anything if destroyed

            //collision detection
            for (j = 0; j < I.length; j++) {
                s = I[j];
                if (!s.d && //don't consider destroyed ships
                    m.x < s.x + X + 12 &&
                   m.x + 1 > s.x + X &&
                   m.y < s.y + Y + 8 &&
                   m.y + 10 > s.y + Y) {
                    // collision detected!
                    s.d = 1; //mark as destroyed
                    m.d = 1; //mark as destroyed
                }
            }

            if (!m.d) { //don't print if destroyed during collision detection

                m.y -= 10;

                //print human missles
                P(m.x, m.y, S[7]);
            }
        }
    }

    //Print invaders
    for (i = 0; i < I.length; i++) {

        s = I[i];

        if (!s.d) {

            k =  //skin index
            (s.t == 1) ? //invader type 1
                k = 1 + F //on position 1 and 2 in the Skins array
            : (s.t == 2) ? //invader type 2
                k = 3 + F //on position 3 and 4 in the Skins array
            : (s.t == 3) ?//invader type 3
                k = 5 + F //on position 5 and 6 in the Skins array
            : 0;

            P(s.x + X, s.y + Y, S[k]);
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

