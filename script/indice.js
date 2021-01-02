//* Quando la pagina è caricata, si parte a inserire i valori */
window.onload = function () {
    generateMapItaly();
};
/* genero nella home page l'iterazione tra la parte della lista delle regioni e la mappa interattiva */
function generateMapItaly() {
    var element = document.getElementById("Regioni");
    var ul = document.createElement("ul");
    for (iMap = 0; iMap < _regioniMap.length; iMap++) ul.appendChild(madeRegione(_regioniMap[iMap]))
    element.appendChild(ul);
    var elementReg = document.getElementById("mapCoord");
    for (iMap = 0; iMap < _regioniMap.length; iMap++) elementReg.appendChild(madeArea(_regioniMap[iMap]))
}
/*genero il mapping delle aree in base alle coordinate settate in memoria*/
function madeArea(area) {
    var areaMap = document.createElement("area");
    areaMap.alt = area.zona;
    areaMap.id = "mapCoord" + area.zona;
    areaMap.title = area.zona;
    areaMap.href = "";
    areaMap.addEventListener("click", function (event) {
        try {
            GenerateAddressList(event, area.tipologia);
            mouseOver(event, area.zona);
            return false;
        } catch (e) {
            alert("gestoreConverti " + e);
        }
    });
    areaMap.coords = area.coors.join(",");
    areaMap.shape = area.type;
    areaMap.addEventListener("mouseover", function (event) {
        try {
            mouseOver(event, area.zona)
        } catch (e) {
            alert("gestoreConverti " + e);
        }
    });
    areaMap.addEventListener("mouseout", function (event) {
        try {
            mouseOut(event, area.zona)
        } catch (e) {
            alert("gestoreConverti " + e);
        }
    });
    return areaMap;
}
/*genero le regioni in base a quelle settate in memoria la memoria*/
function madeRegione(area) {
    var li = document.createElement("li");
    var img = document.createElement("img");
    var a = document.createElement("a");
    img.alt = area.zona;
    img.title = area.zona;
    img.addEventListener("click", function (event) {
        try {
            return GenerateAddressList(event, area.zona);
        } catch (e) {
            alert("gestoreConverti " + e);
        }
    });
    img.addEventListener("mouseover", function (event) {
        try {
            GenerateAddressList(event, area.zona)
        } catch (e) {
            alert("gestoreConverti " + e);
        }
    });
    img.src = "./resource/icone/icona-" + area.zona.toLowerCase() + ".png";
    li.appendChild(img);
    var h3 = document.createElement("h3");
    h3.addEventListener("mouseover", function (event) {
        try {
            GenerateAddressList(event, area.zona)
        } catch (e) {
            alert("gestoreConverti " + e);
        }
    });
    h3.id = "h3_" + area.zona;
    h3.innerText = area.zona;
    a.appendChild(h3);
    li.appendChild(a);
    return li;
}
/* eventi*/
/**movimento del cursore sull'area della mappa*/
function mouseOver(event, zona) {
    try {
        var elem = document.getElementById("h3_" + zona);
        elem.style.background = '#6a9dbfc9';
        GenerateAddressList(event, zona);
    } catch (e) {
        alert("gestoreConverti " + e);
    }
}
/**movimento del cursore fuori dall'area della mappa*/
function mouseOut(event, zona) {
    try {
        document.getElementById("h3_" + zona).style.background = '';
    } catch (e) {
        alert("gestoreConverti " + e);
    }
}