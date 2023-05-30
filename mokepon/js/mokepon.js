let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego(){
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display='none'

    let sectionReiniciar = document.getElementById ('reiniciar')
    sectionReiniciar.style.display='none'

    let botonMascota = document.getElementById('boton-mascota')
    botonMascota.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego)
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.addEventListener('click', ataqueAgua)
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.addEventListener('click', ataqueTierra)

    let botonReiniciar = document.getElementById('boton-reiniciar')
        botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador(){
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display='flex'

    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    sectionSeleccionarMascota.style.display='none'

    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let inputLangostelvis = document.getElementById('langostelvis')
    let inputTucapalma = document.getElementById('tucapalma')
    let inputPydos = document.getElementById('pydos')
    let spanMascotaJugador = document.getElementById('mascota-jugador')


    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML = 'Hipodoge'
    }
    else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = 'Capipepo'
    }
    else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = 'Ratigueya'
    }
    else if (inputLangostelvis.checked){
        spanMascotaJugador.innerHTML = 'Langostelvis'
    }
    else if (inputTucapalma.checked){
        spanMascotaJugador.innerHTML = 'Tucapalma'
    }
    else if (inputPydos.checked){
        spanMascotaJugador.innerHTML = 'Pydos'
    }
    else {
        alert('Debes elegir una mascota')
    }
    
    seleccionarMascotaEnemigo ()
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatorio = aleatorio(1,6)
    let spanMascotaEnemigo= document.getElementById('mascota-enemigo')

    if (mascotaAleatorio==1){
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    }
    else if (mascotaAleatorio==2){
        spanMascotaEnemigo.innerHTML = 'Capipepo'
    }
    else if (mascotaAleatorio==3){
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    }
    else if (mascotaAleatorio==4){
        spanMascotaEnemigo.innerHTML = 'Langostelvis'
    }
    else if (mascotaAleatorio==5){
        spanMascotaEnemigo.innerHTML = 'Tucapalma'
    }
    else {
        spanMascotaEnemigo.innerHTML = 'Pydos'
    }
}

function ataqueFuego() {
    ataqueJugador = 'Fuego'
    ataqueAleatorioEnemigo ()
    
} 

function ataqueAgua() {
    ataqueJugador = 'Agua'
    ataqueAleatorioEnemigo ()
    
} 

function ataqueTierra() {
    ataqueJugador = 'Tierra'
    ataqueAleatorioEnemigo ()
    
} 

function ataqueAleatorioEnemigo (){
    let ataqueAleatorio = aleatorio(1,3)

    if (ataqueAleatorio==1) {
        ataqueEnemigo = 'Fuego'
    }else if (ataqueAleatorio==2){
        ataqueEnemigo = 'Agua'
    }else {
        ataqueEnemigo = 'Tierra'
    }

    combate()
}

function combate () {
    
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')

    if (ataqueEnemigo == ataqueJugador) {
        crearMensaje("Empate")
     } 
     else if (ataqueJugador == 'Fuego' && ataqueEnemigo == 'Tierra') {
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
     } 
     else if (ataqueJugador == 'Agua' && ataqueEnemigo == 'Fuego'){
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
     }
     else if (ataqueJugador == 'Tierra' && ataqueEnemigo == 'Agua'){
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
     }
      else {
        crearMensaje("Perdiste")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
      }

      revisarVidas()

}

function revisarVidas() {
    if (vidasEnemigo==0){
        crearMensajeFinal ('Felicitaciones, Ganaste la partida')
    } else if (vidasJugador==0){
        crearMensajeFinal ('Mejor suerte para la próxima, perdiste la partida')
    } 
}

function crearMensajeFinal(resultadoFinal) {

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display='block'

    let sectionMensajes = document.getElementById ('resultado')
    sectionMensajes.innerHTML= resultadoFinal

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.disabled=true
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.disabled=true
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.disabled=true
}

function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById ('resultado')
    let ataquesDelJugador = document.getElementById ('ataques-del-jugador')
    let ataquesDelEnemigo = document.getElementById ('ataques-del-enemigo')

    let nuevoAtaqueDelJugador=document.createElement('p')
    let nuevoAtaqueDelEnemigo=document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio (min, max) {
    return Math.floor(Math.random()*(max -min +1)+min)
}

window.addEventListener('load', iniciarJuego)