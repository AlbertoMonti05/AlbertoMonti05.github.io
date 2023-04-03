class CGestioneImmagini
{
    constructor()
    {
        //creo un vettore con tutte le foto
        this.immagini = ["immagini/0.jpg", "immagini/1.jpg", "immagini/2.jpg", "immagini/3.jpg", "immagini/4.jpg", "immagini/5.jpg", "immagini/6.jpg", "immagini/7.jpg", "immagini/8.jpg", "immagini/9.jpg"]
        this.secondi = 0;
    }

    //metodo per visualizzare tre immagini casuali
    visualizzaImmagini()
    {
        //alert("visualizzaImmagini");

        //prendo 3 numeri random da 0 a 9
        let numImg1 = this.numeroRandom();
        let numImg2 = this.numeroRandom();
        let numImg3 = this.numeroRandom();

        //alert("numeri random presi:\nnum1 " + numImg1 + "\nnum2 " + numImg2 + "\nnum3 " + numImg3);

        //visualizzo le 3 immagini in base al numero uscito
        this.inserisciImmagineInTagImg("img1", numImg1);
        this.inserisciImmagineInTagImg("img2", numImg2);
        this.inserisciImmagineInTagImg("img3", numImg3);


        //dopo 3 secondi finisco lo spin
        this.secondi += 0.5;

        if(this.secondi == 3)
        {
            return;
        }

        //richiamo questa funzione ogni 0.5 secondi
        setTimeout(this.visualizzaImmagini(), 500);
    }

    //metodo per inserire nell'elemento img con id = id l'immagine passata
    inserisciImmagineInTagImg(id, numImg)
    {
        //alert("id " + id + "\nnum " + numImg);

        //prendo l'elemento in cui inserire l'immagine
        let elementoImg = document.getElementById(id);

        //inserisco l'immagine contenuta nel vettore nel tag img
        elementoImg.src = this.immagini[numImg];
    }

    //metodo per ottenere un numero casuale tra min e max
    numeroRandom() 
    {
        //calcolo e ritorno il numero casuale
        return Math.floor(Math.random() * 10);;
    }
}