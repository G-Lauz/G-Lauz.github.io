/**********************************************************************
 * Get elements
 *********************************************************************/
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

/**********************************************************************
 * Handle canvas size
 *********************************************************************/
let width;
let height;

const setCanvasExtents = () => {
  width = document.body.clientWidth;
  height = document.body.clientHeight;
  canvas.width = width;
  canvas.height = height;
};

setCanvasExtents();
    
window.onresize = () => {
  setCanvasExtents();
};

/**********************************************************************
 * Setup
 *********************************************************************/
let stars = makeStars(10000);

let prevTime;

requestAnimationFrame(init);

/**********************************************************************
 * Functions definitions
 *********************************************************************/
function makeStars(count) 
{
    const stars = [];
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * 1600 - 800,
            y: Math.random() * 900 - 450,
            z: Math.random() * 1000 // distance
        });
    }
    return stars;
}

function clear()
{
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function putPixel(x, y, brightness)
{
    const intensity = brightness * 255;
    const rgb = "rgb(" + intensity + "," + intensity + "," + intensity + ")";
    ctx.fillStyle = rgb;
    ctx.fillRect(x, y, 1, 1);
}

function putStar(x, y, size, brightness)
{
    const intensity = brightness * 255;
    const rgb = "rgb(" + intensity + "," + intensity + "," + intensity + ")";
    ctx.fillStyle = rgb;

    const radius = 1 * (1+size);
    //ctx.arc(x, y, radius, 0, 2*Math.PI, true);
    ctx.fillRect(x, y, radius, radius);
}

function moveStars(distance)
{
    const count = stars.length;
    for (var i = 0; i < count; i++) {
        const star = stars[i];
        star.z -= distance;
        while (star.z <= 1)
            star.z += 1000;
    }
}

function init(time)
{
    prevTime = time;
    requestAnimationFrame(tick);
}

function tick(time) {
    let elapsed = time - prevTime;
    prevTime = time;

    moveStars(elapsed * 0.01);

    clear();

    const cx = width / 2;
    const cy = height / 2;

    const count = stars.length;
    for (var i = 0; i < count; i++){
        const star = stars[i];

        const x = cx + star.x / (star.z * 0.001);
        const y = cy + star.y / (star.z * 0.001);

        if (x < 0 || x >= width || y < 0 || y >= height)
            continue;
        
        const distance = star.z / 1000.0;
        const brightness = 1 - distance * distance;
        const size = 1 - 1*(distance * distance);

        //putPixel(x, y, brightness);
        putStar(x, y, size, brightness);
    }

    requestAnimationFrame(tick);
}