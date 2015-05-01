s = 2;//scale
invaderDirection = 1; //all the invaders are moving in the same direction
invaderXOffset = 1; //all the invaders are moving at the same time
invaderFrame = 0; // all the invaders have two frames

skins = ["�", ":múúm:", "=hüüh=", "¾m=<=m¾", "x¾l<<<l¾x", "9yznìúúìnzy9", ":}lìúúìl}:", "À"]

update = function () {
    c.fillStyle = 0;
    c.fillRect(0, 0, a.width, a.height)
    //print invaders
    for (i = 0; i < invaders.length; i++) {
        ship = invaders[i];

        skin = 0;

        if (ship.t == 1) {
            skin = 1 + invaderFrame;
        } else if (ship.t == 2) {
            skin = 3 + invaderFrame;
        } else if (ship.t == 3) {
            skin = 5 + invaderFrame;
        }

        print(ship.x, ship.y, skins[skin]);

        invaders[i].x += invaderDirection;
    }

    //make invaders go to next frame
    invaderFrame = invaderFrame == 0 ? 1 : 0;

    //make invaders switch direction and return
    if (invaderXOffset == 0 || invaderXOffset == 100) {
        invaderDirection *= -1;
        invaders.map(function (i) { i.y += 10 });
    }
    invaderXOffset += invaderDirection

    //human
    print(human.x, human.y, skins[0]);

    //human missles
    for (i = 0; i < humanMissles.length; i++) {
        missle = humanMissles[i];
        missle.y -= 10;
        print(missle.x, missle.y, skins[7]);
    }
}

print = function (x, y, b) {
    x = x || 0; y = y || 0;
    for (j = 0; j < b.length; j++) {
        bitIndex = 8;
        v = b.charCodeAt(j);
        while (bitIndex > 0) {
            if (v >= 0) {
                if (v % 2 == 1)
                    c.clearRect(x * s, (y + bitIndex) * s, s, s);
                v = Math.floor(v / 2);
            }
            bitIndex -= 1;
        }
        x += 1;
    }
}

invaders = [];
for (i = 0; i < 11; i++) {
    invaders.push({ x: i * 16 + 2, y: 0, t: 1 });
    invaders.push({ x: i * 16, y: 10, t: 2 });
    invaders.push({ x: i * 16, y: 20, t: 2 });
    invaders.push({ x: i * 16, y: 30, t: 3 });
    invaders.push({ x: i * 16, y: 40, t: 3 });
}
human = { x: 0, y: 150, t: 0 }
humanMissles = [];

//debugger;
setInterval(update, 300);

onkeydown = function (k) {
    w = k.which;
    (w == 37) ? human.x-- :
    (w == 39) ? human.x++ :
    (w == 32) ? humanMissles.push({ x: human.x, y: human.y, t: 3 }) : "";
};

