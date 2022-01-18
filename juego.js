var c = document.getElementById("juego");
var contexto = c.getContext("2d");
var WIDTH = 300;
var HEIGHT = 530;
var CANVAS_WIDTH = 300;
var CANVAS_HEIGHT = 530;
c.width = WIDTH;
c.height = HEIGHT;


var score = 0
var FPS = 60
var gravedad = 1.5
var personaje = {
    x: 50,
    y: 150,
    w: 50,
    h:50
}
var tuberias = new Array()
tuberias[0] = {
    x:contexto.canvas.width,
    y:0
}
//variables audio
var punto = new Audio()
punto.src="audios/punto.mp3"

var audioFondo = new Audio()
audioFondo.src="audios/14.mp3"

var perdedor = new Audio()
perdedor.src="audios/perdedor.mp3"

//variables de iimagen
//personaje
var bird = new Image();
bird.src = "imagenes/bird.png"
//personaje 2
var poring = new Image();
poring.src="imagenes/poring.png"
//fondo
var background = new Image();
background.src = "imagenes/background.png"
//fondo2
var payon = new Image();
payon.src="imagenes/payon.png"
//suelo
var suelo = new Image();
suelo.src = "imagenes/suelo.png"
//tuberia norte
var tuberiaNorte = new Image();
tuberiaNorte.src = "imagenes/tuberiaNorte.png"
// //tuberia sur
var tuberiaSur = new Image();
tuberiaSur.src = "imagenes/tuberiaSur.png"



//control del personaje
function presionar(){
    personaje.y -=35
}

setInterval(loop,1000/FPS)
function loop(){
    
    contexto.clearRect(0,0,300,530)
    audioFondo.play()
    //fondo
    contexto.drawImage(payon, 0 ,0)
    contexto.drawImage(suelo, 0 ,contexto.canvas.height - suelo.height)
    //personaje 
    contexto.drawImage(poring,personaje.x,personaje.y)
    
    //tuberias
    for(var i = 0; i < tuberias.length ; i++){
        var constante = tuberiaNorte.height + 120
        contexto.drawImage(tuberiaNorte,tuberias[i].x,tuberias[i].y)
        contexto.drawImage(tuberiaSur,tuberias[i].x,tuberias[i].y + constante)
        tuberias[i].x--
        //
        if(tuberias[i].y + tuberiaNorte.height < 80){
            tuberias[i].y = 0
        }
        //bucle para las tuberias utilizando un numero random
        if(tuberias[i].x == 100){
            tuberias.push({
                x:contexto.canvas.width,
                y: Math.floor(Math.random()*tuberiaNorte.height) - tuberiaNorte.height
            })
        }
        //coliciones
        if(personaje.x + bird.width >= tuberias[i].x &&
            personaje.x <= tuberias[i].x + tuberiaNorte.width &&
            (personaje.y <= tuberias[i].y + tuberiaNorte.height || 
                personaje.y + bird.height >= tuberias[i].y + constante)
                || personaje.y + bird.height >= contexto.canvas.height - suelo.height){
                perdedor.play()
          
                location.reload()
            
            
        }
        //condicin para el score y el sonido de punto consegido
        if(tuberias[i].x == personaje.x){
            score++
            punto.play()
        }

    }
    //condiciones
    personaje.y += gravedad
    contexto.fillStyle = "rgba(0,0,0,1)"
    contexto.font = "25px Arial"
    contexto.fillText("Score: "+score,10,contexto.canvas.height-40)
}


window.addEventListener("keydown",presionar)