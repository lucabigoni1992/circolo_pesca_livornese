var _MemCalendar = {
    year: 0,
    month: 0,
    days: 0,
    filterBy: ""
};
/* Quando la pagina è caricata si parte a popolare il calendario */
window.onload = function () {
    var ParamsStr = getUrlParams(window.location.search.substring(1), "evento");
    if (ParamsStr !== undefined && ParamsStr === "barca") radio_Barca.checked = true;
    else if (ParamsStr !== undefined && ParamsStr === "pesca") radio_Pesca.checked = true;
    else radio_Annulla.checked = true;
    start(ParamsStr);
};

function start(filter) {
    var dt = new Date();
    _MemCalendar.filterBy = filter;
    _MemCalendar.year = dt.getFullYear();
    _MemCalendar.month = dt.getMonth();
    _MemCalendar.days = new Date(_MemCalendar.year, _MemCalendar.month + 1, 0).getDate();
    StartToPopulateCalendar();
}
/*prendo ed elaboro i parametri passati*/
function getUrlParams(ParamsStr, parName) {
    var vars = ParamsStr.split("&");
    for ( const  i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === parName) return pair[1];
    }
    return "";
}
//popolo il lalendario 
function StartToPopulateCalendar() {
    populateMonth(document.getElementById("Month"));
    populateDay(document.getElementById("Days"));
}
/*Imposto l'anno e il mese sul calendario*/
function populateMonth(month) {
    cleanNode(month);
    var span = document.createElement("span");
    var p = document.createElement("P");
    p.appendChild(document.createTextNode(_month[_MemCalendar.month]));
    span.appendChild(document.createTextNode(_MemCalendar.year));
    month.appendChild(span);
    month.appendChild(p);
}
/*Imposto i giorni nel calendario prima del mese precedente, poi del presente, ed in fine del successivo gestendo i vari passaggi tra un'anno e l'altro*/
function populateDay(dayElem) {
    cleanNode(dayElem);
    var year = 0;
    var month = 0;
    if (_MemCalendar.month - 1 === -1) {
        year = _MemCalendar.year - 1
        month = 11
    } else {
        month = _MemCalendar.month - 1;
        year = _MemCalendar.year
    }
    var prevDaysOfWeek = new Date(_MemCalendar.year, _MemCalendar.month, 0).getDay();
    var prevDays = new Date(year, _MemCalendar.month == 0 ? 12 : _MemCalendar.month, 0).getDate();
    var count = SetCurrentMonth(dayElem, year, month, prevDays, prevDays - prevDaysOfWeek + 1, false, 0);
    count += SetCurrentMonth(dayElem, _MemCalendar.year, _MemCalendar.month, _MemCalendar.days, 1, true, count);
    var remainedToAdd = (count % 7) === 0 ? 0 : 7 - (count % 7) + 1;
    if (_MemCalendar.month + 1 === 13) {
        year = _MemCalendar.year + 1
        month = 1
    } else {
        month = _MemCalendar.month + 1;
        year = _MemCalendar.year
    }
    SetCurrentMonth(dayElem, year, month, remainedToAdd - 1, 1, false, count);
}
//aggiungo i mesi del mese
function SetCurrentMonth(elem, year, month, days, startTo, current, count) {
    var added = 0;
    var particularDay = {
        sunday: {
            count: -1,
            is: false,
            day: "Sunday"
        },
        monday: {
            count: -1,
            is: false,
            day: "Monday"
        }
    }
    for ( const iday = startTo; iday <= days; iday++, added++) {
        var isMonday = (((iday + count) % 7) === 1);
        var li = document.createElement("li");
        var span = document.createElement("span");
        span.appendChild(document.createTextNode(iday.toString()));
        particularDay.sunday.is = ((iday + count) % 7) === 0;
        particularDay.monday.is = ((iday + count) % 7) === 1;
        if (particularDay.sunday.is) particularDay.sunday.count++;
        if (particularDay.monday.is) particularDay.monday.count++;
        if (current) {
            if (iday === days) li.className = "currentLast";
            else if (iday === startTo) li.className = "currentFirst";
            else li.className = "current";
            if (particularDay.sunday.is) ColorDay(li, particularDay.sunday, iday > days - 7)
            else if (particularDay.monday.is) ColorDay(li, particularDay.monday, iday > days - 7)
        }
        chekAndSetEvent(li, year, month, iday)
        li.appendChild(span);
        elem.appendChild(li);
    }
    return added;
}
/*accetta in imput
il nodo html da modificare
un oggetto che contiene 
                        quanti di quel determinato giorno abbiamo avuto già nel mesee
                        che giorno è
se è l'ultimo giorno di quel tipo nel mese


mappo il colore dell'ggetto e i bordi asseconda del giorno e della posizione degl giorno
*/
function ColorDay(elem, day, isLastDayForType) {
    if (day.count === 0) elem.classList.add("current" + day.day, "currentFirst" + day.day, "padd");
    if (day.count > 0 && isLastDayForType) elem.classList.add("current" + day.day, "currentLast" + day.day, "padd");
    if (day.count > 0) elem.classList.add("current" + day.day, "padd");
}
/*scorro i mesi andando avanti o in dietro  new Date( accetta valori da 1 a 12 ) me il get moth da 0 a 11*/
function Month(count) {
    var dt = new Date(_MemCalendar.year, _MemCalendar.month + count, 1);
    _MemCalendar.year = dt.getFullYear();
    _MemCalendar.month = dt.getMonth();
    _MemCalendar.days = new Date(_MemCalendar.year, _MemCalendar.month + 1, 0).getDate();
    StartToPopulateCalendar();
}
/**
controllo se è in corso un evento e nel caso setto il colore e gli eventi associati

non si considera il caso d'eventi sovrapposti

 */
function chekAndSetEvent(elem, year, month, day) {
    var currDay = new Date(year, month, day)
    for ( const eventi = 0; eventi < _event.length; eventi++) {
        var event = _event[eventi];
        if (((_MemCalendar.filterBy !== "" && _MemCalendar.filterBy == event.tipologia) && (currDay >= event.datainizio && currDay <= event.datafine)) || (_MemCalendar.filterBy === "" && (currDay >= event.datainizio && currDay <= event.datafine))) {
            elem.classList.add("evento");
            elem.id = "event_" + event.id.toString() + "_" + currDay.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            elem.title = event.titolo;
            elem.addEventListener("mouseover", function (event) {
                try {
                    mouseOver(event, event.id)
                } catch (e) {
                    alert("gestoreConverti " + e);
                }
            });
            elem.addEventListener("mouseout", function (event) {
                try {
                    mouseOut(event, event.id)
                } catch (e) {
                    alert("gestoreConverti " + e);
                }
            });
            elem.addEventListener("click", function (event) {
                try {
                    if (new Date() > event.datafine && new Date() > event.datainizio) { alert("Evento già FINITO, non è possibile isctversi"); return }
                    if (new Date() > event.datainizio) { alert("Evento già INIZIATO, non è possibile isctversi"); return }
                    inviaRichiestaEvento(event.descrizione, event.titolo, event.datainizio, event.datafine)
                } catch (e) {
                    alert("gestoreConverti " + e);
                }
            });
            return;
        }
    }
}
/* aggiorno un nuovo già esistente */
function cleanNode(node) {
    try {
        while (node.firstChild) node.removeChild(node.firstChild);
    } catch (e) {
        window.alert(e.message);
        console.log(e.message, e.name);
    }
}
/**movimento del cursore sull'area dell'evento gestico i vari eventi che vi voglio associare*/
function mouseOver(event, eventId) {
    try {
        addOrRemoveClss(eventId, true)
        document.getElementById("expand").classList.toggle("expand");
        setDescription(eventId)
    } catch (e) {
        alert("gestoreConverti " + e);
    }
}
/**movimento del cursore fuori dall'area dell'evento*/
function mouseOut(event, eventId) {
    try {
        addOrRemoveClss(eventId, false)
    } catch (e) {
        alert("gestoreConverti " + e);
    }
}
//aggiungo o rimuovo la classe per evidenziare l'evento 
function addOrRemoveClss(eventId, addOrRemove) {
    var curEv = getEventById(eventId);
    document.querySelector('.section.collapsible').classList.remove('collapsed');
    var expand = document.getElementById("expand");
    var dt = new Date(curEv.datainizio.getFullYear(), curEv.datainizio.getMonth(), curEv.datainizio.getDate())
    while (dt <= curEv.datafine) {
        var currDay = document.getElementById("event_" + eventId.toString() + "_" + dt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }));
        dt.setDate(dt.getDate() + 1);
        if (!currDay) continue;
        if (addOrRemove) currDay.classList.add("fakehover");
        else currDay.classList.remove("fakehover");
    }
}
//prendo l'evento che mi serve
function getEventById(eventId) {
    for ( const i = 0; i < _event.length; i++)
        if (eventId === _event[i].id) return _event[i];
}
//imposto il menu laterale di destra con la descrizione e l'immagine che vogliamo
function setDescription(eventId) {
    var curEv = getEventById(eventId);
    var didascalia = document.getElementById("didascalia");
    didascalia.firstChild.data = curEv.titolo;
    var eventDescription = document.getElementById("eventDescription");
    if (eventDescription.firstChild) eventDescription.firstChild.data = curEv.descrizione;
    else eventDescription.appendChild(document.createTextNode(curEv.descrizione));
    var image = document.getElementById("imageEventImmagine");
    if (image) {
        if (image.alt === curEv.tipologia) return;
        image.src = "./resource/img/eventi/" + curEv.tipologia + ".jpg";
        image.alt = curEv.tipologia;
        image.title = curEv.tipologia;
        image.title = curEv.tipologia === "barca" ? "Gara di pesca in barca" : "Corso di pesca";
    } else {
        var divImmagine = document.getElementById("divImmagine");
        var img = document.createElement("img");
        img.id = "imageEventImmagine";
        img.src = "./resource/img/eventi/" + curEv.tipologia + ".jpg";
        img.alt = curEv.tipologia;
        img.title = curEv.tipologia === "barca" ? "Gara di pesca in barca" : "Corso di pesca";
        divImmagine.appendChild(img);
    }
}