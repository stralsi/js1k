Z = 2; //scale (Zoom)
O = //game over
Q = 0//current frame counter
K = {} //keys

S = "�|:múúm:|=hüüh=|¾m=<=m¾|x¾l<<<l¾x|9yznìúúìnzy9|:}lìúúìl}:|À".split('|'); //the skins of all the items in the game

//the collision function
//first param is a missile, second is a ship
C = function (m, s) {
    t = 0;
    e = s.t == 1 ? 4 : 0;//take into account that the invaders of type 1 are narrower and shifted to the right
    if (m.x < s.x + 12 - e &&
       m.x + 1 > s.x &&
       m.y < s.y + 8 &&
       m.y + 2 > s.y) {
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
        h.y = H.y - 5; //place the missile a bit above the human ship, so that it doesn't trigger the collision detection
        h.d = 0;
    }

    //K[5] - left arrow
    //K[7] - right arrow
    //their values are either "w" or undefined. !"w" is 0, !undefined is 1
    H.x += !K[5] - !K[7];


    //printing and collision detection for missiles
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

            //if human ship gets hit, game over
            if (C(m, H)) O = 1;

            if (!m.d) { //don't print if destroyed during collision detection

                //if it's the human missile go up, if it's any other missile go down
                m.y += m == h ? -2 : 2;

                //print missiles
                P(m.x, m.y, S[7]);
            }
        }
    }

    //Print invaders
    for (i = 0; i < 11; i++) {

        O = O || (I[i][0] && (I[i][0].y) > 150); //invaders have reached the bottom, game over

        for (k = 0; k < I[i].length; k++) {
            s = I[i][k];

            //every 6o frames move the invaders
            (Q % 60 == 0) && (
                Q % 540 == 0 ? /*540 is the number of frames it takes them to go from one side of the screen to the other*/
            //if the frame number is a multiple of 540, it means they have traversed the screen and they are at one of the edges. So its time to go down one row.
                    s.y += 10 :
            //if the frame number is not a multiple of 540, the invaders are somewhere in the middle of a row, so act normal and move sideways.
                    s.x += (Q / 540 | 0) % 2 == 0 ? //row is even?
                            10 ://move right
                            -10//else move left
            )

            //Invader missiles
            if (k == 0 && //only the bottom row of invaders throws missiles. 
                Math.random() < .004) { //at every frame there's a 0.4% chance that a given invader will throw a missile. 
                M.push({ x: s.x + 6, y: s.y + 15 })//They throw their missiles 15 pixels below their position, to avoid hitting themselves.
            };

            //the skin index is dependent on invader type
            //invader type 1 on position 1 and 2 in the Skins array
            //invader type 3 on position 3 and 4 in the Skins array
            //invader type 5 on position 5 and 6 in the Skins array
            P(s.x, s.y, S[s.t + (Q / 60 | 0) % 2]);
        }
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

