var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var gS = 25;
var maze = [];
var wall = [];

window.addEventListener("load", () => {
    kruskal();
})

async function kruskal(){
    //GENERATION OF MAZE AND WALLS
    for(let x = 0; x < (canvas.width/gS); x++) {
        for(let y = 0; y < (canvas.height/gS); y++){
            if (x % 2 == 0 && y % 2 == 0) {
                maze.push([[x,y]])
            }
            if (x % 2 != 0 && y % 2 == 0 || x % 2 == 0 && y % 2 != 0) {
                wall.push([x,y])
            }
        }
    }
    //GENERATION ENDS

    //Get random wall from list
    while (wall.length > 0) { //here
    const r = Math.floor(Math.random() * wall.length);
    const rWall = wall[r];

    //Get neighbor cells to wall
    var n1,n2;
    if (rWall[1] % 2 == 0) {
        n1 = [rWall[0]-1, rWall[1]]
        n2 = [rWall[0]+1, rWall[1]]
    }
    if (rWall[0] % 2 == 0) {
        n1 = [rWall[0], rWall[1]-1]
        n2 = [rWall[0], rWall[1]+1]
    }
    
    //See which sets neighbors are in
    var in1, in2;
    maze.forEach(function callback(set, index) {
        set = JSON.stringify(set)
        if (set.includes(JSON.stringify(n1))) {in1 = index}
        if (set.includes(JSON.stringify(n2))) {in2 = index}
    });
    
    //Combine sets //TODO start
    if (in1 != in2) {
        maze[in2].forEach(current => {
            maze[in1].push([ current[0] , current[1]])
        });
        maze[in1].push([rWall[0], rWall[1]])
        maze.splice(in2,1)
    }

    wall.splice(r, 1)

    //Draws maze
    maze.forEach(set => {
        set.forEach(cell => {
            if (set.length > 1) {
                block(cell[0], cell[1])
            }
        });
    });
    await sleep(50)
    } //here
    //TODO end
}

function block(x, y) {
    ctx.beginPath()
    ctx.rect(x*gS, y*gS, gS, gS)
    ctx.fillStyle = "white";
    ctx.fill()
    ctx.closePath();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}