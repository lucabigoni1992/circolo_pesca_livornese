var _MemPrev = [];
/* funzione principale che gestisce l'aggiornamento della pagina si accetta in input un' oggetto di questo tipo selectedData->{ type: , quantity: }*/
function AggiornaPreventivo(selectedData, id) {
    try {
        if (selectedData === undefined) {
            if (_MemPrev.length === 0)
                DisableQuotePart(true);
            return;
        }
        if (selectedData.quantity <= 0)
            removeProduct(id);
        else
            if (_MemPrev.length === 0 || !isInMemPrev(id))
                addNewProduct(id, selectedData);
            else
                updateProduct(id, selectedData);
        if (_MemPrev.length === 0) //ho eliminato ogni elemento dal carrello, disabilito
            DisableQuotePart(true);//true disabilita
        else
            DisableQuotePart(false);

        refreshTableQuote();
    } catch (e) {
        window.alert(e.message);
    }
}
/* se l'elemento è in memoria restituisco true sennò false */
function isInMemPrev(id) {
    for (idx = 0; idx < _MemPrev.length; idx++)
        if (_MemPrev[idx].prodotto.id === id)
            return true;
    return false;
}
/* aggiungo un nuovo prodotto */
function addNewProduct(id, selectedData) {
    try {
        _MemPrev.push({
            prodotto: GetProduct(id),
            ProdottoScelto: selectedData.type,
            quantiaScelta: selectedData.quantity
        });
        var lastelem = _MemPrev[_MemPrev.length - 1];
        if (lastelem.ProdottoScelto == '') {
            lastelem.ProdottoScelto = lastelem.prodotto.varianti[0].Prodotto;
        }
    } catch (e) {
        window.alert(e.message);
    }
}

/* aggiorno un nuovo già esistente */
function updateProduct(id, selectedData) {
    try {
        for (idx = 0; idx < _MemPrev.length; idx++)
            if (_MemPrev[idx].prodotto.id === id) {
                _MemPrev[idx].ProdottoScelto = selectedData.type;
                _MemPrev[idx].quantiaScelta = selectedData.quantity;
                return;// inutile continuare ho trovato il prodotto
            }
    } catch (e) {
        window.alert(e.message);
    }
}
/* aggiorno un nuovo già esistente */
function removeProduct(id) {
    try {
        for (idx = 0; idx < _MemPrev.length; idx++)
            if (_MemPrev[idx].prodotto.id === id) {
                _MemPrev.splice(idx, 1);
                return;
            }
    } catch (e) {
        window.alert(e.message);
    }
}

/*prendo un prodotto in base al sui id */
function GetProduct(id) {
    var prod = _prodotti.prodotti;
    for (idx = 0; idx < prod.length; idx++)
        if (prod[idx].id === id)
            return prod[idx];
    throw 'Prodotto non trovato, contattare l\'assistenza';
}

/*Ricarico aggiorno il preventivo */
function refreshTableQuote() {
    var curTab = document.getElementById("TabPreventivo");
    var curTabHead = document.getElementById("TabPreventivoHead");
    cleanAllRow([curTab, curTabHead]);
    for (ProdIx = 0; ProdIx < _MemPrev.length; ProdIx++) {
        if (ProdIx === 0) {
            var newHeadRow = document.createElement("tr");
            recursiveAddHeaderPrevenction(newHeadRow, ["Prodotto scelto", " N°", "Prezzo", "Totale"], 0);
            curTab.appendChild(newHeadRow);
        }
        var elemName = add
        tRow(_MemPrev[ProdIx].prodotto.Titolo);
        var elemPrices = addSecondRow(_MemPrev[ProdIx], ProdIx);
        curTab.appendChild(elemName);
        curTab.appendChild(elemPrices);
    }
    if (_MemPrev.length > 0) {
        var newCol3 = document.createElement("tr");
        var fakenode
        newCol3.appendChild(fakeNode());
        newCol3.appendChild(fakeNode());
        newCol3.appendChild(fakeNode());
        newCol3.appendChild(fakeNode());
        curTab.appendChild(newCol3);
        var firstLast = addTitleSummaryOfQuote();
        curTab.appendChild(firstLast);
        var secondLast = addSummaryOfQuote();
        curTab.appendChild(secondLast);
    }
}
//creo una cella fake per la spaziatura
function fakeNode() {
    var fake = document.createElement("td")
    fake.className = "fakeTd"
    return fake;
}
/* Pulisco il Preventivo Rimuovendo i dati precedenti */
function cleanAllRow(tabs) {
    for (TabIx = 0; TabIx < tabs.length; TabIx++)
        while (tabs[TabIx].firstChild)
            tabs[TabIx].removeChild(tabs[TabIx].firstChild); i
}
//costruisco l'eader partendo del nodo padre e una lista di valori che ci voglio inseire dentro
function recursiveAddHeaderPrevenction(node, values, recursiveIdx) {
    if (recursiveIdx === values.length) return;
    var newCell = document.createElement("td");
    newCell.appendChild(document.createTextNode(values[recursiveIdx]));
    newCell.className = (recursiveIdx === 0) ? "colw4" : "colw2";
    newCell.colspan = (recursiveIdx === 0) ? "2" : "1";
    node.appendChild(newCell);
    recursiveAddHeaderPrevenction(node, values, recursiveIdx + 1);
}
//aggiungo la prima riga alla tabella
function addFirstRow(prodNameTxt) {
    var row = document.createElement("tr");
    var prodName = document.createElement("th");
    prodName.appendChild(document.createTextNode(prodNameTxt));
    row.appendChild(prodName);
    return row;
}
//aggiungo la seconda  riga alla tabella  dove troverò i dati del prodotto quantità, Prodotto quantità e totale
function addSecondRow(Prod, idProd) {
    try {
        var product = Prod.prodotto;
        var prices = product.prezzi;
        var CorrectPrice = GetPrice(Prod.quantiaScelta, prices);
        var newCol3 = document.createElement("tr");

        var indx = document.createElement("td");
        indx.className = "colw4";
        indx.colspan = "2";
        indx.appendChild(document.createTextNode(idProd + ") Variante: " + Prod.ProdottoScelto));

        var quantity = document.createElement("td");
        indx.className = "colw4";
        indx.colspan = "1";
        quantity.appendChild(document.createTextNode((Prod.quantiaScelta).toFixed(2)));
        var price = document.createElement("td");
        indx.className = "colw2";
        indx.colspan = "1";
        price.appendChild(document.createTextNode((CorrectPrice).toFixed(2)));
        var total = document.createElement("td");
        indx.className = "colw2";
        indx.colspan = "1";
        total.appendChild(document.createTextNode((CorrectPrice * Prod.quantiaScelta).toFixed(2) + " €"));
        newCol3.appendChild(indx);
        newCol3.appendChild(quantity);
        newCol3.appendChild(price);
        newCol3.appendChild(total);
        return newCol3;
    } catch (e) {
        window.alert(e.message);
    }

}//aggiungo la seconda  riga alla tabella  dove troverò i dati del prodotto quantità, Prodotto quantità e totale
//calcolo la quantità totale e l'iva
function addSummaryOfQuote() {
    try {

        var rowTitlefinal = document.createElement("tr");
        var indx = document.createElement("td");
        var totale = 0;
        indx.className = "colw4";
        indx.colspan = "2";
        indx.appendChild(document.createTextNode("N° Prodott" + (_MemPrev.length === 0 ? "o" : "i") + " (" + _MemPrev.length + ") Totale: "));
        for (ProdIx = 0; ProdIx < _MemPrev.length; ProdIx++) {
            var prodotto = _MemPrev[ProdIx];
            var product = prodotto.prodotto;
            var prices = product.prezzi;
            var CorrectPrice = GetPrice(prodotto.quantiaScelta, prices);
            totale = totale + (CorrectPrice * prodotto.quantiaScelta)
        }
        var quantity = document.createElement("td");
        indx.className = "colw4";
        indx.colspan = "1";
        quantity.appendChild(document.createTextNode(Number(totale - (totale / 1.22)).toFixed(2)));

        var price = document.createElement("td");
        price.className = "colw2";
        price.colspan = "1";
        price.appendChild(document.createTextNode(Number(totale / 1.22).toFixed(2) + " €"));

        var total = document.createElement("td");
        indx.className = "colw2";
        indx.colspan = "1";
        total.appendChild(document.createTextNode(Number(totale).toFixed(2) + " €"));
        rowTitlefinal.appendChild(indx);

        rowTitlefinal.appendChild(quantity);
        rowTitlefinal.appendChild(price);
        rowTitlefinal.appendChild(total);
        return rowTitlefinal;
    } catch (e) {
        window.alert(e.message);
    }

}
//descrizione del totale
function addTitleSummaryOfQuote() {
    try {

        var newCol3 = document.createElement("tr");
        var indx = document.createElement("th");
        indx.className = "colw4";
        indx.colspan = "2";
        indx.appendChild(document.createTextNode("N° Prodott" + (_MemPrev.length === 0 ? "o" : "i")));

        var quantity = document.createElement("th");
        indx.className = "colw4";
        indx.colspan = "1";
        quantity.appendChild(document.createTextNode("IVA (22%) "));

        var price = document.createElement("th");
        price.className = "colw2";
        price.colspan = "1";
        price.appendChild(document.createTextNode("Senza IVA"));

        var total = document.createElement("th");
        indx.className = "colw2";
        indx.colspan = "1";
        total.appendChild(document.createTextNode("Totale"));

        newCol3.appendChild(indx);
        newCol3.appendChild(quantity);
        newCol3.appendChild(price);
        newCol3.appendChild(total);
        return newCol3;
    } catch (e) {
        window.alert(e.message);
    }

}
//nel caso il prodotto non fosse disponibile a catalogo lo disabilito
function DisableQuotePart(disabled) {
    var curTab = document.getElementById("PreventivoDataInput");
    var child = curTab.querySelectorAll("input, textarea, button");
    for (i = 0; i < child.length; i++) {
        if (!disabled && (child[i].id === "inp_mail")) 
            controllaEmail(child[i]);        
        if (disabled && (child[i].id !== "inp_mail")) 
            child[i].title = "Per abilitare inserire un prodotto nel carrello e validare gli altri campi";
        
        else
            child[i].title = "";
    }
}
/*Funzioni Generiche*/

/*  vogliamo ottenere il prezzo corretto per la quantità che si passa */
function GetPrice(quanita, prices) {
    if (!prices || prices.length === 0)
        throw 'Prodotto SENZA PREZZI contattare l\'assistenza';

    prices.sort(function (a, b) {
        var keyA = a.quantita,
            keyB = b.quantita;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    var correctPrice = prices[0];
    for (i = 0; i < prices.length; i++) {
        if (quanita > prices[i].quantita)
            correctPrice = prices[i];
        else
            return correctPrice.prezzo;
    }
    return correctPrice.prezzo;

}
//restituisce un semplice array da'oggetti con i soli valori che invieremo per email
function normalizeData() {
    var norm = new Array();//e quivale a usare []
    for (idx = 0; idx < _MemPrev.length; idx++) {
        var prezzoU = GetPrice(_MemPrev[idx].quantiaScelta, _MemPrev[idx].prodotto.prezzi);
        norm.push({
            Modello: _MemPrev[idx].prodotto.Titolo,
            Prodotto: _MemPrev[idx].ProdottoScelto,
            Quantita: _MemPrev[idx].quantiaScelta,
            Prezzo: prezzoU,
            Totale: prezzoU + ' * ' + _MemPrev[idx].quantiaScelta + ' = ' + prezzoU * _MemPrev[idx].quantiaScelta
        });
    }
    return norm;
}

/*Gestione Parte Input del preventivo per mail*/
/**
 * si controlla che il campo mail sia corretto usando una regex https://regexr.com/ emulatore per la scrittura rella regex
 */
function controllaEmail(emailField) {

    try {
        var inp_richiedente = document.getElementById("inp_richiedente");
        var ris = !(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/).test(emailField.value)
        inp_richiedente.disabled = ris;
        inp_richiedente.title = ris ? "Per abilitare inserire un prodotto nel carrello e validare gli altri campi" : "";
        controllaRichiedente(inp_richiedente);
        controllaMessage(document.getElementById("inp_message"));
    } catch (e) {
        alert("gestoreLoad " + e);
    }
}
/*si controlla che il campo sia correttamente popolato altrimenti si disabilita gli altri campi*/
function controllaRichiedente(customerField) {
    try {
        var inp_message = document.getElementById("inp_message");
        var ris = !(customerField && customerField.value !== "");
        inp_message.disabled = ris;
        inp_message.title = ris ? "Per abilitare inserire un prodotto nel carrello e validare gli altri campi" : "";
        controllaMessage(inp_message);
    } catch (e) {
        alert("gestoreLoad " + e);
    }
}
/*si controlla che il campo sia correttamente popolato altrimenti si disabilita gli altri campi*/
function controllaMessage(noteField) {
    try {
        var btn_sendQuote = document.getElementById("btn_sendQuote");
        btn_sendQuote.disabled = !(noteField && noteField.value !== "");
        if (btn_sendQuote.disabled)
            btn_sendQuote.title = "Per abilitare inserire un prodotto nel carrello e validare gli altri campi"
        else
            btn_sendQuote.title = "";
    } catch (e) {
        alert("gestoreLoad " + e);
    }
}

/* restituisco la quantità in base all'id */
function getStoredQuantityValue(idProd) {
    try {
        for (idx = 0; idx < _MemPrev.length; idx++)
            if (_MemPrev[idx].prodotto.id === idProd)
                return _MemPrev[idx].quantiaScelta
        return 0
    } catch (e) {
        alert("gestoreLoad " + e);
    }
}

/* restituisco la quantità in base all'id */
function getStoredColorValue(idProd) {
    try {
        for (idx = 0; idx < _MemPrev.length; idx++)
            if (_MemPrev[idx].prodotto.id === idProd)
                return _MemPrev[idx].ProdottoScelto;
        return ""
    } catch (e) {
        alert("gestoreLoad " + e);
    }
}