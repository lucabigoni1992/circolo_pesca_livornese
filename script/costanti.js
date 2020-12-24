const _event = [
    {
        id: 0, datainizio: new Date('2020-11-25T00:00:00'), datafine: new Date('2020-12-02T00:00:00'), tipologia: "pesca"
        , titolo: "Corso di pesca a fondo "
        , descrizione: "Sessioni di un ora di pesca dalle banchine del porto.\n Vi insegleremo le basi della pesca a fondo!\n tutti i giorni dalle 15 alle 17."
    }
    , {
        id: 1, datainizio: new Date('2020-12-29T00:00:00'), datafine: new Date('2021-01-03T00:00:00'), tipologia: "barca", titolo: "Gara di pesca a traina"
        , descrizione: "La gara si svolgera a 7 miglia dal porto.\n chi lo prenderà più grosso vincerà 300 Euro"
    }
    , {
        id: 2, datainizio: new Date('2021-01-17T00:00:00'), datafine: new Date('2021-01-23T00:00:00'), tipologia: "pesca", titolo: "Corso di pesca per bambini"
        , descrizione: "Sessioni di un ora di pesca dalle banchine del porto.\n Vi insegleremo le basi della pesca a fondo!\n tutti i giorni dalle 15 alle 17."
    }
    , {
        id: 3, datainizio: new Date('2020-02-10T00:00:00'), datafine: new Date('2020-02-17T00:00:00'), tipologia: "barca", titolo: "Gara di pesca a bollentino"
        , descrizione: "La gara si svolgera a 3 miglia dal porto.\n chi lo prenderà più grosso vincerà 300 Euro"
    }
    , {
        id: 4, datainizio: new Date('2021-01-28T00:00:00'), datafine: new Date('2021-02-17T00:00:00'), tipologia: "barca", titolo: "Gara di pesca alla Meloria"
        , descrizione: "La gara si svolgera nell'area protetta della Meloria 3.5 miglia dal porto.\n chi lo prenderà più grosso vincerà 300 Euro"
    }

]

const _month = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
const _listEvent = [
    { id: 0, tipologia: "pesca", titolo: "Corsi di pesca", descrizione: "Organiziamo periodicamente corsi di pesca <b>gratuiti</b> Per grandi e bambini" }
    , { id: 1, tipologia: "barca", titolo: "Uscite in barca", descrizione: "Organiziamo spesso uscite e gare di pesca riservate ai soci del circolo" }
]

const _quote = [
    { id: 0, label: "Socio Ordinario(primo anno di iscrizione)", prezzo: 500, conRiserva: "" }
    , { id: 1, label: "Socio Ordinario(secondo anno di iscrizione)", prezzo: 750, conRiserva: "" }
    , { id: 2, label: "Socio Ordinario", prezzo: 1050, conRiserva: "" }
    , { id: 3, label: "Socio Under 26", prezzo: 300, conRiserva: true, conRiserva: "**" }
    , { id: 4, label: "Socio Under 32", prezzo: 420, conRiserva: true, conRiserva: "**" }
    , { id: 5, label: "Socio Over 75", prezzo: 800, conRiserva: true, conRiserva: "**" }
    , { id: 6, label: "Socio Over 80", prezzo: 480, conRiserva: true, conRiserva: "**" }
    , { id: 7, label: "Socio Frequentatore Estivo", prezzo: 350, conRiserva: "*" }
    , { id: 8, label: "Socio Frequentatore Estivo Under 16", prezzo: 200, conRiserva: "*" }
    , { id: 9, label: "Quota Ospite (al giorno)", prezzo: 10, conRiserva: "*" }
]

const _riserva = [
    { riserva: "*", label: "Si deve essere familiari di un socio sennò si deve aggiungere 10 Euro" }
    , { riserva: "**", label: "Si deve corrispondere la quota entro il 24/12/2020" }
]

const _regioniMap = [
    { type: "poly", zona: "Nord", coors: [46, 93, 34, 111, 18, 114, 23, 100, 9, 94, 17, 80, 8, 62, 18, 55, 17, 40, 36, 40, 51, 27, 65, 46, 71, 26, 83, 39, 91, 23, 99, 15, 104, 22, 113, 16, 134, 14, 143, 34, 167, 41, 159, 46, 163, 62, 127, 75, 127, 109, 134, 120, 122, 129, 110, 111, 100, 115, 69, 98, 75, 112] }
    , { type: "poly", zona: "Centro", coors: [76, 112, 74, 96, 100, 111, 109, 109, 118, 130, 133, 122, 152, 141, 161, 178, 184, 203, 181, 217, 160, 219, 147, 224, 137, 224, 113, 192, 100, 179, 87, 154] }
    , { type: "poly", zona: "Sud", coors: [150, 223, 161, 239, 169, 244, 178, 252, 181, 261, 191, 269, 198, 266, 206, 292, 207, 311, 202, 318, 194, 333, 198, 345, 206, 341, 216, 327, 218, 316, 227, 307, 233, 311, 233, 297, 217, 278, 230, 252, 233, 256, 238, 259, 247, 259, 259, 276, 266, 262, 253, 249, 206, 221, 209, 205, 184, 199, 179, 215] }
    , { type: "poly", zona: "Sicilia", coors: [189, 332, 178, 359, 181, 375, 176, 382, 168, 383, 161, 373, 152, 364, 147, 366, 129, 352, 116, 346, 119, 332, 133, 331, 149, 338, 166, 339, 179, 339] }
    , { type: "poly", zona: "Sardegna", coors: [35, 280, 30, 290, 20, 281, 22, 259, 27, 238, 20, 225, 28, 222, 36, 222, 46, 212, 55, 222, 57, 238, 49, 252, 52, 260, 48, 280] }

]


const _regioniLocazione = [
    { regione: "Abruzzo", Locazione: "Centro" }
    , { regione: "Basilicata", Locazione: "Sud" }
    , { regione: "Calabria", Locazione: "Sud" }
    , { regione: "Campania", Locazione: "Sud" }
    , { regione: "Emilia Romagna", Locazione: "Nord" }
    , { regione: "Friuli Venezia Giulia", Locazione: "Nord" }
    , { regione: "Lazio", Locazione: "Centro" }
    , { regione: "Liguria", Locazione: "Nord" }
    , { regione: "Lombardia", Locazione: "Nord" }
    , { regione: "Marche", Locazione: "Centro" }
    , { regione: "Molise", Locazione: "Nord" }
    , { regione: "Piemonte", Locazione: "Nord" }
    , { regione: "Provincia Autonoma di Bolzano", Locazione: "Nord" }
    , { regione: "Provincia Autonoma di Trento", Locazione: "Nord" }
    , { regione: "Puglia", Locazione: "Sud" }
    , { regione: "Sardegna", Locazione: "Sardegna" }
    , { regione: "Sicilia", Locazione: "Sicilia" }
    , { regione: "Toscana", Locazione: "Centro" }
    , { regione: "Umbria", Locazione: "Centro" }
    , { regione: "Valle d'Aosta", Locazione: "Nord" }
    , { regione: "Veneto", Locazione: "Nord" }
]

const _elencoPartner = [
    { via: "Milano", civico: "58", cap: "22365", citta: "Palermo", provincia: "Palermo", regione: "Sicilia", },
    { via: "Dei mille", civico: "88", cap: "22365", citta: "Palermo", provincia: "Palermo", regione: "Sicilia", },
    { via: "Dei caduti", civico: "59", cap: "22266", citta: "Catania", provincia: "Catania", regione: "Sicilia", },
    { via: "di Spagna", civico: "58", cap: "22312", citta: "Santa Maria di Licodia", provincia: "Catania", regione: "Sicilia", },
    { via: "dei Mille", civico: "54", cap: "99864", citta: "Scordia", provincia: "Catania", regione: "Sicilia", },
    { via: "via Crispi", civico: "12", cap: "98755", citta: "Catania", provincia: "Catania", regione: "Sardegna", },
    { via: "Vico Vetriera Vecchia", civico: "3", cap: "80142", citta: "Napoli", provincia: "Napoli", regione: "Campania", },
    { via: "S.Giovanni", civico: "30", cap: "80142", citta: "Napoli", provincia: "Napoli", regione: "Campania", },
    { via: "livornese", civico: "99", cap: "56037", citta: "Pisa", provincia: "Pisa", regione: "Toscana", },
    { via: "Mascagni", civico: "58", cap: "63827", citta: "Fermo", provincia: "Fermo", regione: "Marche", },
    { via: "Francia", civico: "58", cap: "20100", citta: "Milano", provincia: "Milano", regione: "Piombino", },
    { via: "San Quirico", civico: "34", cap: "24342", citta: "Torino", provincia: "Torino", regione: "Lombardia", }
]

const _prodotti = {
    quantita: 6,
    prodotti: [
        {
            id: 0,
            prezzi: [
                { quantita: 5, prezzo: 10.25 },
                { quantita: 3, prezzo: 11.20 },
                { quantita: 1, prezzo: 12.5 }
            ],
            disponibile: true,
            alPeso: "Porzione",
            varianti: [
                { Prodotto: "Orata" },
                { Prodotto: "Mormora" },
                { Prodotto: "Umbrina" }
            ],
            descrizione: [
                "Pesce pescato in giornata dai nostri pescatori locali",
                "Eco Friendly! le barche che pescano questi pesci usano carburanti eco compatibili",
                "Orate da 300 a 400 gr"
            ],
            Titolo: "filetto di pesce al limone"
        },
        {
            id: 1,
            prezzi: [
                { quantita: 5, prezzo: 11.25 },
                { quantita: 3, prezzo: 11.75 },
                { quantita: 1, prezzo: 13.5 }
            ],
            disponibile: true,
            alPeso: "Porzione",
            varianti: [
                { Prodotto: "Orata" },
                { Prodotto: "Mormora" },
                { Prodotto: "Umbrina" }
            ],
            descrizione: [
                "Pesce pescato in giornata dai nostri pescatori locali",
                "Piatto servito con patate al forno e limone",
                "Eco Friendly! le barche che pescano questi pesci usano carburanti eco compatibili",
                "pesci da 300 a 400 gr"
            ],
            Titolo: "pesce al forno"
        },
        {
            id: 2,
            prezzi: [
                { quantita: 5, prezzo: 11.25 },
                { quantita: 3, prezzo: 11.75 },
                { quantita: 1, prezzo: 13.5 }
            ],
            disponibile: true,
            alPeso: "Porzione",
            varianti: [
                { Prodotto: "Linguine" },
                { Prodotto: "Spaghetti" },
                { Prodotto: "Penne" }
            ],
            descrizione: [
                "Pesce pescato in giornata dai nostri pescatori locali",
                "Il primo sarà servito con un filo d'olio polpad'orata e pomodorini freschi",
                "Eco Friendly! le barche che pescano questi pesci usano carburanti eco compatibili"
            ],
            Titolo: "pasta all'orata"
        },
        {
            id: 3,
            prezzi: [
                { quantita: 5, prezzo: 11.75 },
                { quantita: 3, prezzo: 12.75 },
                { quantita: 1, prezzo: 13.5 }
            ],
            disponibile: false,
            alPeso: "Porzione",
            varianti: [
                { Prodotto: "Orata" },
                { Prodotto: "Mormora" },
                { Prodotto: "Umbrina" }
            ],
            descrizione: [
                "Pesce pescato in giornata dai nostri pescatori locali",
                "Il piatto sarà servito con un filo d'olio polpa d'del pesce sceto contornato da piselli e pomodoti freschi",
                "Eco Friendly! le barche che pescano questi pesci usano carburanti eco compatibili"
            ],
            Titolo: "pesce piselli e pomodorini"
        },
        {
            id: 4,
            prezzi: [

                { quantita: 1, prezzo: 8 },
                { quantita: 3, prezzo: 7.25 },
                { quantita: 5, prezzo: 7 }
            ],
            disponibile: true,
            alPeso: "Porzione",
            varianti: [
                { Prodotto: "Peperoni" }
                , { Prodotto: "Melanzane" }
                , { Prodotto: "Bietola" }
            ],
            descrizione: [
                "Il pollo sarà servito ripieno d'una vertura a scelta tra quelle diponibili al momento",
                "Il piatto sarà servito con una porzione abbondante di fagioli",
                "Eco Friendly! le coltivazioni da cui provengono le verdure sono prive di pesticidi"
            ]
            ,
            Titolo: "pollo e fagioli"
        },
        {
            id: 5,
            prezzi: [

                { quantita: 1, prezzo: 8 },
                { quantita: 2, prezzo: 7.75 },
                { quantita: 6, prezzo: 5.5 }
            ],
            disponibile: true,
            alPeso: "Porzione",
            varianti: [
                { Prodotto: "Insalata belga" }
                , { Prodotto: "Insalata romana" }
                , { Prodotto: "Insalata radicchio" }
            ],
            descrizione: [
                "Prodotto semplice della tradizione Livornese",
                "Le vuova vengono portate freesche ogni mattina così come i pomodori",
                "Il prodotto sarò contornato da una porzione di pane abbrustolito e abbondanti verdure",
                "Ottimo dopo una dura giornata in mare"
            ]
            ,
            Titolo: "uova al pomodoro"
        }
    ]
}