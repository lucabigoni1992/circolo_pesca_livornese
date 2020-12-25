

/* Quando la pagina è caricata, si parte a inserire i valori */
window.onload = function () {
    var ParamsStr = window.location.search.substring(1);
    var regione = getUrlParams(ParamsStr, "Regioni_lista");
    GenerateAddressList(undefined, regione);
};

/*la chiamo dalla on load e dall'html sulla pagina all'evento click*/
function GenerateAddressList(e, regione) {
    if (e) e.preventDefault();
    var address = getAddressByParam(regione);
    GenerateSalesFromAddress(regione, address);
    return false;
}
/*prendo ed elaboro i parametri passati*/
function getUrlParams(ParamsStr, parName) {
    var vars = ParamsStr.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === parName)
            return pair[1];
    }
    return undefined;
}


/*prendo le vie da visualizzare*/
/**restituisce unoggetto che contiene gli elementi grafici da visualizzare
 * indirizzo ,provincia,citta
 */
function getAddressByParam(locazione) {
    var ris = [];
    for (var iAdd = 0; iAdd < _regioniLocazione.length; iAdd++)
        if (_regioniLocazione[iAdd].Locazione === locazione)
            for (var iShop = 0; iShop < _elencoPartner.length; iShop++)
                if (_elencoPartner[iShop].regione === _regioniLocazione[iAdd].regione)
                    ris.push({
                        indirizzo: "Via " + _elencoPartner[iShop].via +
                            ", " + _elencoPartner[iShop].civico +
                            " - " + _elencoPartner[iShop].cap,
                        provincia: _elencoPartner[iShop].provincia,
                        citta: _elencoPartner[iShop].citta
                    });
    return ris;
}


/*In questa sezione andiamo a generare graficamente la lista dei Partner*/

function GenerateSalesFromAddress(regione, address) {
    var region = document.getElementById("Regioni_lista");
    cleanAllRow(region);
    GenerateRegionNode(regione);
    if (!regione) return;
    var provincheSorth = OrderArrayForProvince(address);
    createShopTree(provincheSorth, region);
}
/* Pulisco il Preventivo Rimuovendo i dati precedenti */
function cleanAllRow(region) {
    while (region.firstChild)
        region.removeChild(region.firstChild);//levo tutti i figli per degli elementi passati
}
//logiche



/*restituisco l'array ordinato raggruppando le città sotto le corrette province
 voglio avere una struttura di questo tipo (una specie di dizionario che ha per chiave una stringa e come valore un'array di stringhe)
 Voglio ottenere una struttura similare a quella che andrò a visualizzare
 {
 chiave=nome provincia
 valore=[città1 città2,....]
 }
 */
function OrderArrayForProvince(address) {
    var ris = [];
    for (i = 0; i < address.length; i++) {
        var ind = alreadyTaken(ris, address[i].provincia);
        if (ind > -1)
            ris[ind].citta.push(address[i]);
        else
            ris.push({ provincia: address[i].provincia, citta: [address[i]] });
    }
    return ris;

}
/*si controlla se ne dizionario esiste la suddetta chiave
restituisce l'indirizzo del dizionario o -1 se non esiste
 * */
function alreadyTaken(dictionary, key) {

    for (Dicix = 0; Dicix < dictionary.length; Dicix++)
        if (dictionary[Dicix].provincia === key)
            return Dicix;
    return -1;
}

//Parte interamente di gestione grafica


/* Genero graficamente la lista dei Partner */
function createShopTree(dictionary, regionNode) {

    for (keyIx = 0; keyIx < dictionary.length; keyIx++) {
        var key = dictionary[keyIx].provincia;
        var value = dictionary[keyIx].citta;
        var nodeProvince = GeneratePorvinceNode(key);
        for (valIx = 0; valIx < value.length; valIx++) {
            var citta = value[valIx];
            nodeProvince.appendChild(GenerateCityNode(citta));
        }
        regionNode.appendChild(nodeProvince);
    }
    if (dictionary[Dicix].provincia === key)
        return Dicix;
    return -1;
}


/*genero il nodo regione*/
function GenerateRegionNode(region) {

    var didascalia = document.getElementById("didascalia");
    didascalia.firstChild.data = region;
}
/*genero il nodo provincia*/
function GeneratePorvinceNode(provincia) {
    var provinceList = document.createElement("div");
    provinceList.addEventListener('click', function (event) {
        slide(event.toElement.value);
    });
    provinceList.className = "listaProvince,slideup";
    var province = document.createElement("div");
    province.className = "Provincia";
    province.appendChild(document.createTextNode(provincia));
    provinceList.appendChild(province)
    return provinceList;
}
/*genero il nodo Partner*/
function GenerateCityNode(citta) {
    var cittaList = document.createElement("div");
    cittaList.className = "listaPartner";
    var PartnerCitta = document.createElement("div");
    PartnerCitta.className = "Partner";
    PartnerCitta.appendChild(document.createTextNode("Citta: " + citta.citta));
    var PartnerIndirizzo = document.createElement("div");
    PartnerIndirizzo.className = "Partner";
    PartnerIndirizzo.appendChild(document.createTextNode("Indirizzo: " + citta.indirizzo));
    cittaList.appendChild(PartnerCitta)
    cittaList.appendChild(PartnerIndirizzo)
    return cittaList;
}




/*movimento div a comparsa*/

function slide(elemId) {
    var e = document.getElementById(elemId);
    e.className == "slideup" ? e.className = "slidedown" : e.className = "slideup";
}