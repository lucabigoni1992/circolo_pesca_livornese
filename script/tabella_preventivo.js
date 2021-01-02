/*PopolaSelect In questa Funzione vado ad inserire l'elenco dei vari colori nella Select */
function popolaSelect(select, valori) {
    for ( const iSelect = 0; iSelect < valori.length; iSelect++) {
        var option = document.createElement("option");
        if (iSelect === 0) option.setAttribute("selected", "true");
        option.setAttribute("value", valori[iSelect].Prodotto);
        option.appendChild(document.createTextNode(valori[iSelect].Prodotto));
        select.appendChild(option);
    }
}
/*Una funzione ricorsiva (si poteva usare anche un classico ciclo while o For)
 semplice metodo ricorsivo che finisce appena si arriva alla fine dell'array ogni volta che si richiama la funzione si incrementa l'indice.
PopolaSelect In questa Funzione vado ad inserire l'elenco delle descrizioni dell'Ul creando i vari nodi li */
function recursiveCreateDesc(ul, elem, idxCur) {
    if (idxCur == elem.descrizione.length) return;
    var li = document.createElement("li");
    var label = document.createElement("label");
    label.appendChild(document.createTextNode(elem.descrizione[idxCur]));
    li.appendChild(label);
    recursiveCreateDesc(ul, elem, idxCur + 1);
    ul.appendChild(li);
}
/*funzioni per colonna3*/
function impostaQuantita(ul, elem, indx) {
    var li = document.createElement("li");
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.appendChild(document.createTextNode("Quantità:"));
    input.type = "number";
    input.min = 0;
    input.value = getStoredQuantityValue(indx)
    var id = "id_" + elem.id + "_inputQuantita";
    input.id = id;
    if (!elem.disponibile) input.disabled = true;
    else input.addEventListener("change", function (event) {
        try {
            var productList = document.getElementById("id_" + elem.id + "_inputProdotto");
            enabeOrDisabeProductList(productList, input.value);
            var selectedData = {
                type: productList.value,
                quantity: parseInt(input.value)
            }
            AggiornaPreventivo(selectedData, elem.id);
        } catch (e) {
            window.alert(e.message);
        }
    });
    li.appendChild(label);
    li.appendChild(input);
    ul.appendChild(li);
}
/* abilito o disabilito la selezione della tipologia del prodotto*/
function enabeOrDisabeProductList(productList, quantity) {
    if (quantity > 0) {
        productList.disabled = false;
        productList.title = "";
    } else {
        productList.disabled = true;
        productList.title = "Per abilitare, aumenta la quantità";
    }
}
/*Preparazione per settare i colori nella select */
function impostaSceltaProdotto(ul, elem, indx) {
    var li = document.createElement("li");
    var label = document.createElement("label");
    label.appendChild(document.createTextNode("Variante:"));
    var select = document.createElement("select");
    var id = "id_" + elem.id + "_inputProdotto";
    select.id = id;
    select.title = "Per abilitare, aumenta la quantità";
    select.disabled = true;
    popolaSelect(select, elem.varianti)
    if (!elem.disponibile) select.disabled = true;
    else select.addEventListener("change", function (event) {
        try {
            var productQuantity = document.getElementById("id_" + elem.id + "_inputQuantita");
            var inputProdotto = document.getElementById("id_" + elem.id + "_inputProdotto");
            var selectedData = {
                type: inputProdotto.value,
                quantity: parseInt(productQuantity.value)
            }
            AggiornaPreventivo(selectedData, elem.id)
        } catch (e) {
            window.alert(e.message);
        }
    });
    var cacheColor = getStoredColorValue(indx);
    if (cacheColor !== "") select.value = cacheColor;
    li.appendChild(label);
    li.appendChild(select);
    ul.appendChild(li);
}
//setto la prima colonna con l'immaine e il titolo
function impostaColonna1(tdCol, elem, indx) {
    tdCol.setAttribute("class", "colw2");
    var h4 = document.createElement("h4");
    h4.appendChild(document.createTextNode(elem.Titolo.length > 0 ? (elem.Titolo[0].toUpperCase() + elem.Titolo.slice(1)) : ""));
    var img = document.createElement("img");
    img.id = "img" + indx.toString();
    img.title = elem.Titolo.toString().toLowerCase();
    img.alt = img.title;
    img.src = "./resource/img/pietanze/" + img.title.replaceAll(" ", "_") + "Min.jpg";
    img.setAttribute("alt", elem.Titolo);
    img.classList.add("imageGallery");
    if (!elem.disponibile) img.className = "imgOffuscataNonDisponibile";
    var div = document.createElement("div");
    div.classList.add("gallery");
    div.appendChild(img)
    tdCol.appendChild(h4);
    tdCol.appendChild(div);
    return tdCol;
}
/*setto colonna2 con delle descrizioni uso una funzione ricorsiva
a differenza delle precedenti qua non uso una reurn perchè nella chiamata vado a usare l'oggetto che qua si modifica,
 effettivamente nella funzione chiamate si utilizza il riferimento all'oggetto tdCol quindi troveremo tutte le modifiche nella funzione che ha chiamato Imposta colonna2
 */
function impostaColonna2(tdCol, elem) {
    tdCol.className = "colw6";
    var ul = document.createElement("ul");
    recursiveCreateDesc(ul, elem, 0);
    tdCol.appendChild(ul);
}
//setto colonna3 imposto il contenuto di una drop down list e imposto i dati per ilc alcolo
function impostaColonna3(tdCol, elem, indx) {
    tdCol.className = "colw2";
    var label = document.createElement("p");
    var testo = !elem.disponibile ? "NON disponibile" : "Disponibile";
    label.appendChild(document.createTextNode(testo));
    var ul = document.createElement("ul");
    impostaQuantita(ul, elem, indx);
    impostaSceltaProdotto(ul, elem, indx);
    tdCol.appendChild(label);
    tdCol.appendChild(ul);
    return tdCol;
}
//costruisco la riga con le 3 colonne
function addElement(elem, indx) {
    var newRow = document.createElement("tr");
    var newCol1 = document.createElement("td");
    var newCol2 = document.createElement("td");
    var newCol3 = document.createElement("td");
    newRow.appendChild(impostaColonna1(newCol1, elem, indx));
    impostaColonna2(newCol2, elem)
    newRow.appendChild(newCol2); //uso un modo differente da prima per settare la colonna il contenuto di newCol2 è stato modificato all'interno della funzione impostaColonna2
    newRow.appendChild(impostaColonna3(newCol3, elem, indx));
    return newRow;
}
//gestisco i bottoni che vanno a gestire la paginazione della griglia <<  0  1  2  3 ...>>
function generatePageManu(showN) {
    try {
        var childLinks = document.getElementById("links");
        cleanNode(childLinks);
        var btnFirst = document.createElement("input");
        var btnlast = document.createElement("input");
        btnFirst.type = "button";
        btnlast.type = "button";
        btnFirst.value = "<<";
        btnFirst.addEventListener("click", function (event) { addProductElement(document.getElementById('ProdNumber').value, 0) });
        childLinks.appendChild(btnFirst);
        var numpage = _prodotti.quantita / showN;
        var elem = document.createElement("input");
        elem.className = "active";
        for ( const iLink = 0; iLink < numpage; iLink++) {
            elem.type = "button";
            elem.value = iLink;
            elem.addEventListener('click', function (event) {
                try {
                    addProductElement(document.getElementById('ProdNumber').value, event.toElement.value);
                } catch (e) {
                    alert("gestoreConverti " + e);
                }
            });
            childLinks.appendChild(elem);
            elem = document.createElement("input");
        }
        btnlast.value = ">>";
        btnlast.addEventListener("click", function (event) {
            try {
                addProductElement(document.getElementById('ProdNumber').value, (iLink - 1))
            } catch (e) {
                alert("gestoreConverti " + e);
            }
        });
        childLinks.appendChild(btnlast);
        return 0;
    } catch (e) {
        window.alert(e.message);
        console.log(e.message, e.name);
    }
}
/*cambio prendo il numero della pagina cliccata dll'utente (classe =active)*/
function getCurrPage() {
    try {
        var childLinks = document.getElementById("links").children;
        for ( const iCurrPage = 0; iCurrPage < childLinks.length; iCurrPage++) {
            if (childLinks[iCurrPage].className === 'active') {
                return childLinks[iCurrPage].value;
            }
        }
        return 0;
    } catch (e) {
        window.alert(e.message);
        console.log(e.message, e.name);
    }
}
/* aggiorno un nuovo già esistente */
function cleanNode(grid) {
    try {
        while (grid.firstChild) grid.removeChild(grid.firstChild); //levo tutti i figli per degli elementi passati
    } catch (e) {
        window.alert(e.message);
        console.log(e.message, e.name);
    }
}
//qua genero il corpo della tabella per ogni prodotto presente nella variabile in alto
function addProductElement(showN, currpage) {
    try {
        showN = parseInt(showN);
        var curUl = document.getElementById("tabBody");
        cleanNode(curUl);
        var StartFrom = (currpage * showN);
        var untilTo = StartFrom + showN;
        for ( const i = StartFrom; i < untilTo && i < _prodotti.quantita; i++) { //per ogni elemento nella struttura genero nuovi div
            var elem = addElement(_prodotti.prodotti[i], i)
            curUl.appendChild(elem); //li appendo al babbo
        }
        AggiornaPreventivo(); //dopo aver caricato tutto provvedo a resettare il preventivo
        gallery();
    } catch (e) {
        window.alert(e.message);
        console.log(e.message, e.name);
    }
}
/*cambio il numero di prodotti che visualizzo a griglia*/
function changeShowProduct(ProdNumber) {
    try {
        var showN = parseInt(ProdNumber.value);
        var currpage = getCurrPage();
        generatePageManu(showN);
        addProductElement(showN, currpage);
    } catch (e) {
        window.alert(e.message);
        console.log(e.message, e.name);
    }
    //  gallery();
}
/* Quando la pagina è caricata si parte a popolare la griglia */
window.onload = function () {
    changeShowProduct(document.getElementById("ProdNumber"));
};
var numberImage = 3;
/*viene gestita la gallery*/
function gallery() {
    try {
        var buttons = document.querySelectorAll('.gallery');
        var overlay = document.querySelector('.overlay');
        var btnlen = button.length;
        for ( const btnix = 0; btnlen; btnix++) 
            button[btnix].addEventListener('click', openGallery)
        
        overlay.addEventListener('click', close);
        var scorriL = document.getElementById('scorriL');
        var scorriR = document.getElementById('scorriR');

        if (scorriL.getAttribute('listener') !== 'true') {
            scorriL.addEventListener('click', function (event) {
                try {
                    const elementClicked = event.target;
                    elementClicked.setAttribute('listener', 'true');
                    scorri(-1)
                } catch (e) {
                    alert("gestoreConverti " + e);
                }
            }, false);
        }
        if (scorriR.getAttribute('listener') !== 'true') {
            scorriR.addEventListener('click', function (event) {
                try {
                    const elementClicked = event.target;
                    elementClicked.setAttribute('listener', 'true');
                    scorri(1)
                } catch (e) {
                    alert("gestoreConverti " + e);
                }
            }, false)
        }
    } catch (e) {
        window.alert(e.message);
        console.log(e.message, e.name);
    }
}
/*apro l'immagine*/
function scorri(currPage) {
    var overlayImage = document.getElementById('gallery');
    if (overlayImage.src === "") return;
    var src = overlayImage.src;
    src = src.substring(0, overlayImage.src.length - 5);
    var number = parseInt(overlayImage.src.substring(src.length, src.length + 1)) + currPage;
    if (number <= 0) number = numberImage;
    else if (number > numberImage) number = 1;
    var src = src + (number).toString() + ".jpg";
    overlayImage.src = src;
}
/*apro l'immagine*/
function openGallery(e) {
    try {
        var src = e.currentTarget.querySelector('img').src;
        if (src.endsWith("Min.jpg")) src = src.substring(0, src.length - 7);
        else return;
        var overlay = document.querySelector('.overlay');
        var overlayImage = document.getElementById('gallery');
        overlay.classList.add('open');
        var split = src.split('/');
        var name = split[split.length - 1].replaceAll('_', ' ');
        overlayImage.title = name;
        overlayImage.alt = name;
        src = src + "1.jpg";
        overlayImage.src = src;
    } catch (e) {
        window.alert(e.message);
        console.log(e.message, e.name);
    }
}
/*chiudo l'immagine*/
function close(e) {
    try {
        var overlay = document.querySelector('.overlay');
        if (e.target.id !== "scorriL" && e.target.id !== "scorriR" && e.target.id !== "gallery") overlay.classList.remove('open');
    } catch (e) {
        window.alert(e.message);
        console.log(e.message, e.name);
    }
}