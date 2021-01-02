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
        const formData = new FormData(document.querySelector('#contact-form')); //prendiamo l'array dei valori che pasiamo all'intero del form
        if (formData.entries() === undefined) return;
        var data = formData.entries();
        var len = data.length;
        for ( const i = 0; i < len; i++) {
            var pair = data[i];
            console.log(pair[0] + ': ' + pair[1]);
            switch (pair[0]) {
                case "message":
                    MailData.message = pair[1];
                    break;
                case "name":
                    MailData.name = "Cordiali Saluti, %0A" + pair[1];
                    break;
                case "phone":
                    MailData.phone = "Può contattattarmi al : " + pair[1];
                    break;
                case "email":
                    MailData.mittente = pair[1];
                    break;
            }
        }
        window.open('mailto:l.bigoni@studenti.unipi.it?cc=' + MailData.mittente + '&subject=' + subject + '&body=Salve,%0A%0A' + MailData.message.replace('\r', '%0A') + '%0A' + MailData.phone + '%0A%0A' + MailData.name);
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
        mailBody += 'sono il Signor ' + ClientName.value + ' vorrei richiedervi i seguenti prodotti a catalogo: \n\n';
        var totale = 0.0;
        for ( const  i = 0; i < ProductsRow.length; i++) {
            for ( const  j = 0; j < keys.length; j++)
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
        mailBody += CientNote.value.replace("\n\r", "\n");
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