//Timer: https://dev.to/stackfindover/how-to-create-a-stopwatch-in-javascript-57a8
const watch = document.querySelector("#stopwatch");
      let millisecound = 0;
      let timer;

      function timeStart(){
        watch.style.color = "white";
        clearInterval(timer);
        timer = setInterval(() => {
          millisecound += 10 * deltaTime / 20;

          let dateTimer = new Date(millisecound);

          watch.innerHTML = 
          "Time: " +
          ('0'+dateTimer.getUTCHours()).slice(-2) + ':' +
          ('0'+dateTimer.getUTCMinutes()).slice(-2) + ':' +
          ('0'+dateTimer.getUTCSeconds()).slice(-2) + ':' +
          ('0'+dateTimer.getUTCMilliseconds()).slice(-3,-1);
        }, 10);
      }


      function timePaused() {
        watch.style.color = "white";
        clearInterval(timer);
      }

      function timeReset(){
        setInterval(timer)
        millisecound = 0;
        watch.innerHTML = "00:00:00:00";
      }

var scene;
var particles;
function newGame(){
  scene = new Scene();
  scene.col = '#15754d';
  scene.suiteDeposits = [];
  scene.createSet(80);
  timeReset();
  timeStart();
}

function setup() {
  createCanvas(windowWidth, windowHeight - 50);
  particles = new particle(5, createVector(0, 0), 'red');
}

function draw() {  
  clear();
  
  if(scene != undefined && scene != null){
    if(scene.col != undefined && scene.col != null){
      background(scene.col);
    }
  }else{
    background('#15754d');
  }
  
  if(scene != null){
    scene.drawAll();
    scene.shareState();
  }
  /*
  if(scene != null && scene != undefined){
    if(scene.mouseState == 'pressed'){
      if(scene.particles != undefined){
        if(scene.particles.length < 60){
          scene.particles.push(new particle(20, createVector(mouseX, mouseY))); //size, vel, col, pos
        }      
      }
    }
    for(let i = 0; i < scene.particles.length; i++){
      scene.particles[i].draw();
      if(scene.particles[i].pos.y > mouseY + 100){
        scene.particles.splice(i, 1);
      }
    }
  }*/
}

function array_move(arr, old_index, new_index) { //old and new-index are Vectors
    let oldNom = arr[old_index.x][old_index.y];
    let newNom = arr[new_index.x][new_index.y];
    arr[old_index.x][old_index.y] = newNom;
    arr[new_index.x][new_index.y] = oldNom;
    return arr;
}

function mousePressed(){
  if(scene != undefined && scene != null){
    scene.mouseState = "pressed";
  }
}

function mouseReleased(){
  if(scene != undefined && scene != null){
    scene.mouseState = "released";
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight - 50);
  if(scene != null && scene != undefined){
    scene.resizeCards(windowWidth / 10);
  }
}