const canvas = document.getElementById('mesh-canvas');
const lienzo = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const nodos = [];

//cambia solo estos valores para modificar la pagina
const maxNodos = 100;
const maxDistancia = 100;
const velocidad = 2; // no mostrado, pero cambia la velocidad de movimiento

class Nodo {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * velocidad;
        this.vy = (Math.random() - 0.5) * velocidad;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if(this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if(this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        lienzo.beginPath();
        lienzo.arc(this.x, this.y, 2, 0, Math.PI * 2);
        lienzo.fillStyle = '#14c4ff';
        lienzo.fill();
    }
}

for (let i = 0; i < maxNodos; i++) {
    nodos.push(new Nodo(Math.random() * canvas.width, Math.random() * canvas.height));
}

function conecciones() {
    for (let i = 0; i < nodos.length; i++){
        for (let j = i + 1; j <nodos.length; j++){
            const dx = nodos[i].x - nodos[j].x;
            const dy = nodos[i].y - nodos[j].y;
            const distancia = Math.sqrt(dx * dx + dy * dy);

            if (distancia < maxDistancia){
                lienzo.beginPath();
                lienzo.moveTo(nodos[i].x,nodos[i].y);
                lienzo.lineTo(nodos[j].x,nodos[j].y);
                lienzo.strokeStyle = `rgba(20, 255, 204, ${1 - distancia / maxDistancia})`;
                lienzo.stroke();
            }
        }
    }
}

function animacion() {
    lienzo.clearRect(0,0, canvas.width,canvas.height);

    for (const nodo of nodos){
        nodo.update();
        nodo.draw();
    }

    conecciones();

    requestAnimationFrame(animacion);
}

animacion();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});