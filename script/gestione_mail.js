//creo un oggetto composto dai 4 elementi chemi serviranno per inviare un'email precompilata
var MailData = {
    message: '',
    name: '',
    phone: '',
    email: ''
}
//semplicemtne  vado a crearmi il testo che invierò per email
function submitContactForm(subject) {
    try {
        const formData = document.querySelector('#contact-form'); //prendiamo l'array dei valori che pasiamo all'intero del form
        var data = formData.querySelectorAll("input, textarea");
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var pair = data[i];
            switch (pair.name) {
                case "message":
                    MailData.message = pair.value;
                    break;
                case "name":
                    MailData.name = "Cordiali Saluti, %0A" + pair.value;
                    break;
                case "phone":
                    MailData.phone = "Può contattattarmi al : " + pair.value;
                    break;
                case "email":
                    MailData.mittente = pair.value;
                    break;
            }
        }
        window.open('mailto:l.bigoni@studenti.unipi.it?cc=' + MailData.mittente + '&subject=' + subject + '&body=Salve,%0A%0A' + MailData.message.split('\r').join('%0A')+ '%0A' + MailData.phone + '%0A%0A' + MailData.name);
    } catch (e) {
        alert("gestoreLoad " + e);
    }
}

function inviaPreventivo(ProductsRow, ClientMail, ClientName, CientNote) {
    try {
        if (ProductsRow.length === 0) {
            alert("Inserire almeno un prodotto nel carrello");
            return false;
        }
        var keys = Object.keys(ProductsRow[0]);
        var mailBody = 'Salve, \n\n';
        mailBody += 'sono il Signor ' + ClientName.value + ' vorrei effettuare un ordiene per le seguenti pietanze: \n\n';
        var totale = 0.0;
        for (var i = 0; i < ProductsRow.length; i++) {
            for (var j = 0; j < keys.length; j++)
                if (j === 0) mailBody += i + ') ' + ProductsRow[i][keys[j]].toString() + "\n";
                else mailBody += "\t" + keys[j] + " : " + ProductsRow[i][keys[j]].toString() + "\n";
            totale += ProductsRow[i]["Prezzo"] * ProductsRow[i]["Quantita"];
            mailBody += "\n";
        }
        mailBody += "Prezzo finale dell'acquisto: \n";
        mailBody += "\tIVA (22%)  :" + Number(totale - (totale / 1.22)).toFixed(2) + " €\n";
        mailBody += "\tSenza IVA :" + Number(totale / 1.22).toFixed(2) + " €\n";
        mailBody += "\tTotale       :" + totale + " €\n\n";
        mailBody += "Note:\n";
        mailBody += CientNote.value.split("\n\r").join("\n");
        window.open('mailto:l.bigoni@studenti.unipi.it?cc=' + ClientMail.value + '&subject=Preventivo&body=' + encodeURI(mailBody));
    } catch (e) {
        alert("gestoreLoad " + e);
    }
}

function inviaRichiestaEvento(descrizione, titolo, datainizio, datafine) {
    try {
        var mailBody = 'Salve, \n\n';
        mailBody += 'vorrei iscrivermi all\'evento: \'' + titolo + '\' che si terrà dal ' + datainizio.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }) + " al " + datafine.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }) + "\n\n";
        mailBody += "Cordiali saluti\n\n";
        window.open('mailto:l.bigoni@studenti.unipi.it?&subject=Preventivo&body=' + encodeURI(mailBody));
    } catch (e) {
        alert("gestoreLoad " + e);
    }
}