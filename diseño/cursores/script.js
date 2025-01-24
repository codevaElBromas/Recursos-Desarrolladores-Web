//alert("Codeva sexy!")
//test

// selecciona todos los elementos que contengan la palabra "clase" en su clase
const elementos = document.querySelectorAll('[class^="clase"]');
let cursor = 'default'; // Estado del cursor

// configuracion para cada elemento
elementos.forEach(el => {
    el.addEventListener('mouseover', () => {
        if (cursor === 'default') document.body.style.cursor = `url(${el.textContent.trim()}.png), auto`;
    });
    el.addEventListener('click', () => {
        cursor = `url(${el.textContent.trim()}.png), auto`;
        document.body.style.cursor = cursor;
    });
});

// mantener el cursor seteado en toda la pagina
document.body.addEventListener('mousemove', () => {
    if (cursor !== 'default') document.body.style.cursor = cursor;
});

// resetea el cursor con doble click
document.body.addEventListener('dblclick', () => {
    cursor = 'default';
    document.body.style.cursor = 'default';
});