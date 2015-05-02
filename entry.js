Z = 2; //scale (Zoom)
D =  //invaders direction. all the invaders are moving in the same direction
X = 1; //invaders X offset. all the invaders are moving at the same time
F = 0; //all the invaders have two frames

S = ["�", ":múúm:", "=hüüh=", "¾m=<=m¾", "x¾l<<<l¾x", "9yznìúúìnzy9", ":}lìúúìl}:", "À"] //the skins of all the items in the game

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
//I.push({ x: 0, y: 10, t: 1 });
H = { x: 0, y: 150, t: 0 }
M = [];

setInterval(function () {
    c.fillStyle = 0;
    c.fillRect(0, 0, a.width, a.height)

    //printing and collition detection for human missles
    for (i = 0; i < M.length; i++) {

        m = M[i]; //current missle

        if (!m.d) {//don't do anything if destroyed

            //collision detection
            for (j = 0; j < I.length; j++) {
                s = I[j];
                if (!s.d && //don't consider destroyed ships
                    m.x < s.x + 12 &&
                   m.x + 1 > s.x &&
                   m.y < s.y + 8 &&
                   m.y + 10 > s.y) {
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

            k = 0; //skin index

            if (s.t == 1) {
                k = 1 + F;
            } else if (s.t == 2) {
                k = 3 + F;
            } else if (s.t == 3) {
                k = 5 + F;
            }

            P(s.x, s.y, S[k]);

            I[i].x += D;
        }
    }

    //make invaders go to next frame
    F = F == 0 ? 1 : 0;

    //make invaders switch direction and return
    if (X == 0 || X == 100) {
        D *= -1;
        I.map(function (i) { i.y += 10 });
    }
    X += D

    //print human
    P(H.x, H.y, S[0]);

}, 300);

onkeydown = function (k) {
    w = k.which;
    (w == 37) ? H.x-- :
    (w == 39) ? H.x++ :
    (w == 32) ? M.push({ x: H.x, y: H.y, t: 3 }) : ""; //add new human missle
};

