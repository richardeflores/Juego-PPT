const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById ('reiniciar')
const botonMascota = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
sectionReiniciar.style.display = 'none'

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo= document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById ('resultado')
const ataquesDelJugador = document.getElementById ('ataques-del-jugador')

const ataquesDelEnemigo = document.getElementById ('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById ('contenedor-tarjetas')
const botonesAtaque = document.getElementById('contenedor-ataque')

const sectionVerMapa= document.getElementById('ver-mapa')
const mapa = document.getElementById ('mapa')

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let ataquesMokepon
let botonTierra
let botonFuego
let botonAgua
let botones= []
let indexAtaqueJugador
let indexAtaqueEnemigo
let ataquesMokeponEnemigo
let inputLangostelvis
let inputTucapalma
let inputPydos
let victoriasJugador = 0
let victoriasEnemigo= 0
let vidasJugador = 3
let vidasEnemigo = 3

let lienzo = mapa.getContext("2d")
let intervalo

class Mokepon {
    constructor (nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x=20
        this.y=30
        this.ancho=80
        this.alto=80
        this.mapaFoto=new Image()
        this.mapaFoto.src=foto
        this.velocidadX=0
        this.velocidadY=0
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
    sectionVerMapa.style.display='none'

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

    botonMascota.addEventListener('click', seleccionarMascotaJugador)

   
        botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador(){
    
    sectionSeleccionarAtaque.style.display='flex'
    
    sectionSeleccionarMascota.style.display='none'
    sectionVerMapa.style.display='flex'
    iniciarMapa()


    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    }
    else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }
    else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }
    else if (inputLangostelvis.checked){
        spanMascotaJugador.innerHTML = inputLangostelvis.id
        mascotaJugador = inputLangostelvis.id
    }
    else if (inputTucapalma.checked){
        spanMascotaJugador.innerHTML = inputTucapalma.id
        mascotaJugador = inputTucapalma.id
    }
    else if (inputPydos.checked){
        spanMascotaJugador.innerHTML = inputPydos.id
        mascotaJugador = inputPydos.id
    }
    else {
        alert('Debes elegir una mascota')
    }
    extraerAtaques (mascotaJugador)
    seleccionarMascotaEnemigo ()
}

function extraerAtaques (mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    
    }
    mostrarAtaques(ataques) 
    
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque)=>{
        ataquesMokepon= `
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>
        `
        botonesAtaque.innerHTML += ataquesMokepon
    })
    botonTierra = document.getElementById('boton-tierra')
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) =>{
        boton.addEventListener('click', (e)=> {
            if(e.target.textContent === '🔥'){
                ataqueJugador.push('Fuego')
                console.log(ataqueJugador)
                boton.style.background = '#0A1A69'
                boton.disabled=true
            }else if (e.target.textContent === '💧'){
                ataqueJugador.push('Agua')
                console.log(ataqueJugador)
                boton.style.background = '#0A1A69'
                boton.disabled=true
            } else {
                ataqueJugador.push('Tierra')
                console.log(ataqueJugador)
                boton.style.background = '#0A1A69'
                boton.disabled=true
            }
            ataqueAleatorioEnemigo ()
        })
    })
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatorio = aleatorio(0,mokepones.length -1)

    spanMascotaEnemigo.innerHTML = mokepones [mascotaAleatorio].nombre
    ataquesMokeponEnemigo = mokepones [mascotaAleatorio].ataques
    secuenciaAtaque()
}


function ataqueAleatorioEnemigo (){
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length-1)

    if (ataqueAleatorio== 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push ('Fuego')
    }else if (ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push ('Agua')
    }else {
        ataqueEnemigo.push ('Tierra')
    }
    iniciarPelea()
}

function iniciarPelea (){
    if (ataqueJugador.length===5) {
        combate()
    }
}
function indexAmbosOponente(jugador,enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo= ataqueEnemigo[enemigo]
}

function combate () {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index,index)
            crearMensaje("Empate")
        }else if (ataqueJugador[index] === 'Fuego' && ataqueEnemigo[index] ==='Tierra') {
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if (ataqueJugador[index] === 'Agua' && ataqueEnemigo[index] ==='Fuego') {
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else{
            indexAmbosOponente(index,index)
            crearMensaje("Perdiste")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

      revisarVidas()

}

function revisarVidas() {
    if (victoriasJugador==victoriasEnemigo){
        crearMensajeFinal ('Es un empate')
    } else if (victoriasJugador> victoriasEnemigo){
        crearMensajeFinal ('Ganaste, eres el mejor')
    } else {
        crearMensajeFinal('Perdiste, mejor suerte para la próxima')
    }
}

function crearMensajeFinal(resultadoFinal) {
     sectionReiniciar.style.display='block'
    
     sectionMensajes.innerHTML= resultadoFinal

    sectionReiniciar.style.display = 'block'
}

function crearMensaje(resultado) {
    
    let nuevoAtaqueDelJugador=document.createElement('p')
    let nuevoAtaqueDelEnemigo=document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio (min, max) {
    return Math.floor(Math.random()*(max -min +1)+min)
}

function pintarPersonaje() {
    capipepo.x= capipepo.x + capipepo.velocidadX
    capipepo.y= capipepo.y + capipepo.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(capipepo.mapaFoto,
        capipepo.x,
        capipepo.y,
        capipepo.ancho,
        capipepo.alto)
}

function moverDerecha(){
        capipepo.velocidadX=5
}

function moverIzquierda(){
    capipepo.velocidadX=-5
}

function moverArriba(){
    capipepo.velocidadY=-5
}

function moverAbajo(){
    capipepo.velocidadY=5
}

function detenerMovimiento(){
    capipepo.velocidadX=0
    capipepo.velocidadY=0
}

function sePresionoUnaTecla(event){
        switch (event.key) {
            case 'ArrowUp':
                moverArriba()
                break;
            case 'ArrowDown':
                moverAbajo()
                break;

            case 'ArrowRight':
                moverDerecha()
                break;

            case 'ArrowLeft':
                moverIzquierda()
                break;
            default:
                break;
        }
}

function iniciarMapa(){
    intervalo=setInterval(pintarPersonaje,50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

window.addEventListener('load', iniciarJuego)