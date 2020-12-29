


function allowDrop(ev) {
    try {
        ev.preventDefault();
    } catch (e) {
        window.alert(e.message);
        console.log(e.message, e.name);
    }
}
/**mi salvo in memoria l'id dell'oggetto che intendo andare a spostare */
function drag(ev) {
    try {
        if (ev.target.id === undefined) return false;
        ev.dataTransfer.setData("dataDrag", ev.target.id.split("_")[1]);
    } catch (e) {
        window.alert(e.message);
        console.log(e.message, e.name);
    }
}


/**vado ad impostare il testo nelle note in base alla riga selezionata */
function drop(ev) {
    try {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("dataDrag");
        if (!data || data === "") return;
        var elem = getLabelAndPrice(data);
        if (elem.tipo == "Abbonamento")
            ev.target.textContent = "Vi inoltro la mia richiesta d'iscrizione per il Seguente Abbonamento:\n" + (elem.label + "  " + elem.prezzo + "€");
        else
            window.alert("Tipologia d'iscrizione non accatta non è un'abbonamento");

    } catch (e) {
        window.alert(e.message);
        console.log(e.message, e.name);
    }
}
/**Prendo la corretta Label da visualizzare */

function getLabelAndPrice(id) {

    for (i = 0; i < _quote.length; i++)
        if (_quote[i].id === parseInt(id))
            return _quote[i];
}

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
    label.appendChild(document.createTextNode("Modello " + (elem.disponibile ? "disponibile" : "NON disponibile")));
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
    newRow.className = "noMargin";
    var newColLab = document.createElement("td");
    newColLab.classList.add("colw6");
    newColLab.classList.add("noMargin");
    newColLab.classList.add("alignLefth");
    var newColType = document.createElement("td");
    newColType.classList.add("colw2");
    newColType.classList.add("noMargin");
 //   newColType.classList.add("alignLefth");
    newColType.appendChild(document.createTextNode(elem.tipo));
    var newColPrice = document.createElement("td");
    newColPrice.classList.add("colw2");
    newColPrice.classList.add("noMargin");
  //  newColPrice.classList.add("alignRight");
    newColLab.appendChild(document.createTextNode(elem.label));
    if (elem.tipo == "Abbonamento") {
        newColPrice.draggable = true;
        newColPrice.classList.add("grab");
    }
    else {
        newColPrice.draggable = false;
        newColPrice.classList.add("no-drop");
    }
    newColPrice.id = "price_" + elem.id;
    newColPrice.addEventListener('dragstart', function (event) {
        drag(event)
    });
    var span = document.createElement("span");
    span.className = "required";
    span.appendChild(document.createTextNode(elem.conRiserva));
    span.title = getMessage(elem.conRiserva);
    newColPrice.appendChild(document.createTextNode(elem.prezzo + ".00"));
    newColPrice.appendChild(span);
    newRow.appendChild(newColLab);
    newRow.appendChild(newColType);
    newRow.appendChild(newColPrice);
    return newRow;
}

/* prendo il messaggio corretto per il titolo*/
function getMessage(title) {
    for (ititle = 0; ititle < _riserva.length; ititle++) {
        if (_riserva[ititle].riserva === title)
            return _riserva[ititle].label;
    }
}

/*cambio prendo il numero della pagina cliccata dll'utente (classe =active)*/
function getCurrPage() {
    try {
        var childLinks = document.getElementById("links").children;
        for (iCurrPage = 0; iCurrPage < childLinks.length; iCurrPage++) {
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
        while (grid.firstChild)
            grid.removeChild(grid.firstChild);//levo tutti i figli per degli elementi passati
    } catch (e) {
        window.alert(e.message);
        console.log(e.message, e.name);
    }
}
//qua genero il corpo della tabella per ogni prodotto presente nella variabile in alto
function populateGrid(body) {
    try {
        cleanNode(body);
        for (i = 0; i < _quote.length; i++) {//per ogni elemento nella struttura genero nuovi div
            var elem = addElement(_quote[i], i)
            body.appendChild(elem); //li appendo al babbo
        }
    } catch (e) {
        window.alert(e.message);
        console.log(e.message, e.name);
    }
}


/* Quando la pagina è caricata si parte a popolare la griglia */
window.onload = function () {
    populateGrid(document.getElementById("tabBody"));
};