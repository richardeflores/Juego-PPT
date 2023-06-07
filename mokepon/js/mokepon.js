const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById ('reiniciar')
const botonMascota = document.getElementById('boton-mascota')
const botonTierra = document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById('boton-reiniciar')
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const inputPydos = document.getElementById('pydos')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo= document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById ('resultado')
const ataquesDelJugador = document.getElementById ('ataques-del-jugador')

const ataquesDelEnemigo = document.getElementById ('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById ('contenedor-tarjetas')

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputTucapalma
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor (nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon ('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.webp',3)
let capipepo = new Mokepon ('Capipepo','./assets/mokepons_mokepon_capipepo_attack.webp', 3)
let ratigueya = new Mokepon ('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 3)

hipodoge.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
)

capipepo.ataques.push(
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
)

ratigueya.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},
)
mokepones.push(hipodoge, capipepo, ratigueya)


function iniciarJuego(){
   
    sectionSeleccionarAtaque.style.display='none'

    mokepones.forEach((mokepon)=>{
        opcionDeMokepones = `<input type="radio" name="mascota" id=${mokepon.nombre}>
        <label class="tarjeta-mokepon" for="${mokepon.nombre}">
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt="${mokepon.nombre}">
        </label>`

    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')
    inputLangostelvis = document.getElementById('Langostelvis')
    inputTucapalma = document.getElementById('Tucapalma')
    })

    sectionReiniciar.style.display='none'
    botonMascota.addEventListener('click', seleccionarMascotaJugador)
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)

   
        botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador(){
    
    sectionSeleccionarAtaque.style.display='flex'
    
    sectionSeleccionarMascota.style.display='none'

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

    
    sectionReiniciar.style.display='block'

    
    sectionMensajes.innerHTML= resultadoFinal

   
    botonFuego.disabled=true
    
    botonAgua.disabled=true
    
    botonTierra.disabled=true
}

function crearMensaje(resultado) {
    
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