class CSlotMachine
{
    constructor()
    {
        this.crediti = 10;
        this.gestImg = new CGestioneImmagini();
    }

    getCrediti()
    {
        return "crediti: " + this.crediti;
    }

    sleep(ms)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    //metodo per far partire il gioco
    start()
    {
        if(this.crediti == 0)
        {
            alert("ATTENZIONE! Hai esaurito i crediti");

            //ricarico la pagina
            location.reload();
        }

        //tolgo un credito
        this.crediti--;
        //visualizzo i crediti a schermo
        document.getElementById("crediti").innerHTML = this.crediti;

        let secondi = 0;

        //richiamo la funzione per vedere lo spin delle immagini
        //this.gestImg.visualizzaImmagini();
        setInterval(() => 
        {
            //alert("visualizzaImmagini");

            //prendo 3 numeri random da 0 a 9
            let numImg1 = this.gestImg.numeroRandom();
            let numImg2 = this.gestImg.numeroRandom();
            let numImg3 = this.gestImg.numeroRandom();

            //alert("numeri random presi:\nnum1 " + numImg1 + "\nnum2 " + numImg2 + "\nnum3 " + numImg3);

            //visualizzo le 3 immagini in base al numero uscito
            this.gestImg.inserisciImmagineInTagImg("img1", numImg1);
            this.gestImg.inserisciImmagineInTagImg("img2", numImg2);
            this.gestImg.inserisciImmagineInTagImg("img3", numImg3);


            //dopo 3 secondi finisco lo spin
            secondi += 0.5;

            if(secondi == 3)
            {
                return;
            }
        }, 500);

        //prendo i crediti vinti o false se non c'è stata vincita
        let vincita = this.controlloVincita();

        //se c'è stata una vincita
        if(vincita != false)
        {
            //aggiungo i crediti vinti ai crediti attuali
            this.crediti += parseInt(vincita);
        }

        //visualizzo i crediti a schermo
        document.getElementById("crediti").innerHTML = this.crediti;
    }

    //metodo per controllare se l'utente ha vinto
    controlloVincita()
    {
        //prendo i 3 elementi img che contengono le immagini
        let img = document.getElementsByTagName("img");

        //prendo la src di ogni immagine
        let srcImg1 = img[0].src;
        let srcImg2 = img[1].src;
        let srcImg3 = img[2].src;

        //prendo la posizione del numero delle 3 immagini
        //nomi foto = 0.jpg; 1.jpg; 2.jpg; .... 9.jpg
        let posNumImg1 = srcImg1.indexOf(".jpg") - 1;
        let posNumImg2 = srcImg2.indexOf(".jpg") - 1;
        let posNumImg3 = srcImg3.indexOf(".jpg") - 1;

        //prendo il numero delle tre immagini
        let numImg1 = srcImg1.charAt(posNumImg1);
        let numImg2 = srcImg2.charAt(posNumImg2);
        let numImg3 = srcImg3.charAt(posNumImg3);

        //prendo il risultato (numero della foto) della tripletta
        let tripletta = this.tripletta(numImg1, numImg2, numImg3);

        //se è uguale a -1 non erano 3 immagini uguali
        if(tripletta != -1)
        {
            return 50 * (tripletta + 1);
        }



        //prendo il risultato (numero della foto) della doppietta consecutiva
        let doppiettaConsecutiva = this.doppiettaConsecutiva(numImg1, numImg2, numImg3);

        //se è uguale a -1 non c'era una doppietta consecutiva
        if(doppiettaConsecutiva != -1)
        {
            return 20 * (doppiettaConsecutiva + 1);
        }



        //prendo il risultato (numero della foto) della doppietta
        let doppietta = this.doppietta(numImg1, numImg2, numImg3);

        //se è uguale a -1 non c'era una doppietta
        if(doppietta != -1)
        {
            return 5 * (doppietta + 1);
        }

        //ritorno false per capire che non c'è stata vittoria
        return false;
    }

    //metodo per controllare se ha fatto 3 img uguali
    tripletta(x1, x2, x3)
    {
        //se sono uguali
        if(x1 == x2 && x2 == x3)
        {
            return x1;
        }

        //valore di default per capire che non è stato trovata nessuna tripletta
        return -1;
    }

    //metodo per controllare se ha fatto 2 img uguali consecutive
    doppiettaConsecutiva(x1, x2, x3)
    {
        //primo numero == secondo numero
        if(x1 == x2)
        {
            return x1;
        }
        
        //secondo numero == terzo numero
        if(x2 == x3)
        {
            return x2;
        }

        //valore di default per capire che non è stato trovata nessuna coppia consecutiva
        return -1;
    }

    //metodo per controllare se ha fatto 2 img uguali
    doppietta(x1, x2, x3)
    {
        //controllo se ce ne sono due uguali
        if(x1 == x2)
        {
            return x1;
        }

        if(x2 == x3)
        {
            return x2;
        }

        if(x3 == x1)
        {
            return x3;
        }

        //valore di default per capire che non è stato trovata nessuna coppia
        return -1;
    }

    //metodo per dire all'utente quanto ha incasso (ogni credito è 20 centesimi)
    incassa()
    {
        alert("hai concluso la sessione di gioco con " + (this.crediti * 0.20) + " euro");

        //sopo l'incasso dei soldi, ricarico la pagina iniziale
        location.reload();
    }
}