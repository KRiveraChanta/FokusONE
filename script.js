const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.getElementById('alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const musicaPlay = new Audio('./sonidos/play.wav');
const musicaPause = new Audio('./sonidos/pause.mp3');
const musicaFin = new Audio('./sonidos/beep.mp3')
const textoIniciarPausar = document.querySelector('#start-pause span');
const iconoBoton = document.querySelector('.app__card-primary-butto-icon');
const tiempoEnPantalla = document.querySelector('#timer');

let tiempoTranscurridoEnSegundos = 1500;
let idTemporizador = null;

const botonIniciarPausar = document.querySelector('#start-pause');
musica.loop = true;

inputEnfoqueMusica.addEventListener('change',()=>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
});

botonCorto.addEventListener('click',()=>{
    tiempoTranscurridoEnSegundos = 300;
    
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
    reiniciar();
});

botonEnfoque.addEventListener('click',()=>{
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
    reiniciar();
});

botonLargo.addEventListener('click',()=>{
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
    reiniciar();
});

function cambiarContexto(contexto){
    mostrarTimer();
    botones.forEach(function(contexto){
        contexto.classList.remove('active');
    });

    html.setAttribute('data-contexto',contexto);
    banner.classList.add('hidden'); 
    setTimeout(() => {
        banner.setAttribute('src',`/imagenes/${contexto}.png`); 
        banner.classList.remove('hidden'); 
    }, 100); 

    switch(contexto){
        case "enfoque":
            titulo.innerHTML =  `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;

        case "descanso-corto":
            titulo.innerHTML =  `¿Qué tal tomar un respiro? <br>
            <strong class="app__title-strong">Has una pausa corta</strong>`
            break;

        case "descanso-largo":
            titulo.innerHTML =  `Hora de volver a la superficie,<br>
            <strong class="app__title-strong">Has una pausa larga.</strong>`
            break;

        default:
            titulo.innerHTML =  "Opción no reconocida";
    }
}

function cuentaRegresiva(){
    if(tiempoTranscurridoEnSegundos <= 0){
        musicaFin.play();
        reiniciar();
        //alert('Tiempo final');
        return;
    }
    textoIniciarPausar.textContent = "Pausar";
    iconoBoton.setAttribute('src','./imagenes/pause.png');
    tiempoTranscurridoEnSegundos -= 1;
    mostrarTimer();
    console.log('temporizador: '+tiempoTranscurridoEnSegundos);
}

function iniciarPausar(){
    
    if(idTemporizador){ //si tiene algun valor true diferente a false, null, 0, etc...
        musicaPause.play();
        reiniciar();
        return;
    }
    musicaPlay.play();
    idTemporizador = setInterval(cuentaRegresiva,1000);
}

function reiniciar(){
    clearInterval(idTemporizador);
    idTemporizador = null;
    textoIniciarPausar.textContent = "Comenzar";
    iconoBoton.setAttribute('src','./imagenes/play_arrow.png');

}

botonIniciarPausar.addEventListener('click',iniciarPausar);

function mostrarTimer(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX',{minute:'2-digit',second:'2-digit'});
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}

mostrarTimer();