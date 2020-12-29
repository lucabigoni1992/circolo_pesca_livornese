


//* Quando la pagina è caricata, si parte a inserire i valori */
window.onload = function () {
    generateListOfEvent();
};

/* genero la lista degli eventi disponibili (si fa solo una volta al caricamento*/
function generateListOfEvent() {
    var ul = document.getElementById("listaEventi");
    for (iMap = 0; iMap < _listEvent.length; iMap++)
        ul.appendChild(madeEvent(_listEvent[iMap]))
}

/*genero la lista d'eventi in maniera dinamica in base a quelle settate in memoria la memoria*/
function madeEvent(area) {
    var li = document.createElement("li");
    var img = document.createElement("img");
    var a = document.createElement("a");
    var p = document.createElement("p");
    img.alt = area.tipologia;
    img.title = area.tipologia;
    img.src = "./resource/icone/icona-" + area.tipologia + ".svg";
    li.appendChild(img);
    a.href = "calendario_eventi.html?evento=" + area.tipologia;
    var h3 = document.createElement("h3");
    h3.id = "h3_" + area.tipologia;
    h3.innerText = area.titolo;
    a.appendChild(h3);
    p.innerHTML = area.descrizione;
    li.appendChild(a);
    li.appendChild(p);
    return li;
}


