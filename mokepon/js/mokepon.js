function iniciarJuego(){
    let botonMascota = document.getElementById('boton-mascota')
    botonMascota.addEventListener('click', seleccionarMascota)
}

function seleccionarMascota(){
    alert ('SELECCIONASTE TU MASCOTA')
}

window.addEventListener('load', iniciarJuego)