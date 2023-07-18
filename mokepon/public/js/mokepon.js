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

let jugadorId=null
let enemigoId=null
let mokepones=[]
let mokeponesEnemigos=[]
let ataqueJugador=[]
let ataqueEnemigo=[]
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
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
let mapaBackground=new Image()
mapaBackground.src='./assets/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa>anchoMaximoDelMapa) {anchoDelMapa = anchoMaximoDelMapa -20 
}
alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos
class Mokepon {constructor (nombre, foto, vida,fotoMapa, id=null) {this.id=id;
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.ancho=40;
        this.alto=40;
        this.x= aleatorio(0, mapa.width-this.ancho);
        this.y= aleatorio(0,mapa.height-this.alto );
        this.mapaFoto=new Image();
        this.mapaFoto.src=fotoMapa
        this.velocidadX=0;
        this.velocidadY=0;
    }

    pintarMokepon(){
        lienzo.drawImage(
        this.mapaFoto,
         this.x,
        this.y,
        this.ancho,
        this.alto)
    }
}

let hipodoge = new Mokepon ('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.webp',5,'./assets/hipodoge.png')
let capipepo = new Mokepon ('Capipepo','./assets/mokepons_mokepon_capipepo_attack.webp', 5,'./assets/capipepo.png')
let ratigueya = new Mokepon ('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5,'./assets/ratigueya.png')

const HIPODOGE_ATAQUES = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
]
capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATUTIGUEYA_ATAQUES = [
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},
]
ratigueya.ataques.push(...RATUTIGUEYA_ATAQUES)

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

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.1.38:8080/unirse")
        .then(function(res) {
            console.log(res)
            if (res.ok){
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId=respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador(){

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
        return
    }

    sectionSeleccionarMascota.style.display='none'

    function seleccionarMokepon(mascotaJugador){
        fetch(`http://192.168.1.38:8080/mokepon/${jugadorId}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                mokepon:mascotaJugador
            })
        })
    }
    seleccionarMokepon(mascotaJugador)

    extraerAtaques (mascotaJugador)
    sectionVerMapa.style.display='flex'
    iniciarMapa()
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
            if(ataqueJugador.length==5){
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques (){
    fetch(`http://192.168.1.38:8080/mokepon/${jugadorId}/ataques`, {
        method:"post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo=setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.1.38:8080/mokepon/${enemigoId}/ataques`)
    .then((res)=>{
        if(res.ok){
            res.json()
                .then(({ataques})=>{
                    if (ataques.length==5) {
                        ataqueEnemigo = ataques
                        combate()
                    }
                })
        }
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
    clearInterval(intervalo)
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

function pintarCanvas() {
    mascotaJugadorObjeto.x= mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y= mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(mapaBackground,0,0,mapa.width,mapa.height)
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon)
    {
        if(mokepon != undefined){
            mokepon.pintarMokepon()
            revisarColision(mokepon)
        }
    })
}

function enviarPosicion(x,y) {
    fetch(`http://192.168.1.38:8080/mokepon/${jugadorId}/posicion`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res){
        if (res.ok) { 
            res.json()
                .then(function({enemigos}){
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo)
                    {
                        let mokeponEnmigo = null
                        if(enemigo.mokepon != undefined)
                        {
                            const mokeponNombre = enemigo.mokepon.nombre 
                            switch (mokeponNombre)
                            {
                            case "Hipodoge":
                                mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', enemigo.id)
                                    break
                                case "Capipepo":
                                    mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', enemigo.id)
                                    break
                                case "Ratigueya":
                                    mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', enemigo.id)
                                    break
                                default:
                                    break
                            }
    
                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y
                        }
                            return mokeponEnemigo
                    })
                })  
        }
    }) 
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX=5
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX=-5
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY=-5
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY=5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadY=0
    mascotaJugadorObjeto.velocidadX=0
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
    mascotaJugadorObjeto=obtenerObjetoMascota(mascotaJugador)
    intervalo=setInterval(pintarCanvas,50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota (){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo=enemigo.y
    const abajoEnemigo=enemigo.y+enemigo.alto
    const derechaEnemigo=enemigo.x+enemigo.ancho
    const izquierdaEnemigo=enemigo.x

    const arribaMascota = 
        mascotaJugadorObjeto.y
    const abajoMascota = 
        mascotaJugadorObjeto.y+mascotaJugadorObjeto.alto
    const derechaMascota = 
        mascotaJugadorObjeto.x+mascotaJugadorObjeto.ancho
    const izquierdaMascota = 
        mascotaJugadorObjeto.x

        if(enemigo.x == undefined || enemigo.y == undefined){
            return
        }

    if (
        abajoMascota < arribaEnemigo || 
        arribaMascota > abajoEnemigo || 
        derechaMascota < izquierdaEnemigo||
        izquierdaMascota > derechaEnemigo
    ){
        return; 
    }
    
    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detectó una colisión');

    enemigoId=enemigo.id
    sectionSeleccionarAtaque.style.display='flex'
    sectionVerMapa.style.display='none'
    seleccionarMascotaEnemigo (enemigo)
}

window.addEventListener('load', iniciarJuego)