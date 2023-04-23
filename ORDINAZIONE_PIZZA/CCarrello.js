class CCarrello
{
    constructor()
    {
        this.margherita = 0;
        this.prosciutto = 0;
        this.funghi = 0;
        this.diavola = 0;
        this.wurstel = 0;
        this.patatine = 0;
    }

    reset()
    {
        location.reload();
    }

    aggiungi(pizza)
    {
        //controllo quale pizza è stata ordinata
        if(pizza == "margherita")
        {
            //se è la prima ad essere ordinata
            if(this.margherita == 0)
            {
                //incremento il numero di pizze
                this.margherita++;

                //aggiungo la riga alla tabella
                $("#pizzas").append("<tr><th id='numMargherita'>" + this.margherita + "</th><th>margherita</th></tr>");
            }
            
            else
            {
                //incremento il numero di pizze
                this.margherita++;

                //aggiorno il numero di pizze
                $("#numMargherita").text(this.margherita);
            }
        }
        else if(pizza == "prosciutto")
        {
            //se è la prima ad essere ordinata
            if(this.prosciutto == 0)
            {
                //incremento il numero di pizze
                this.prosciutto++;

                //aggiungo la riga alla tabella
                $("#pizzas").append("<tr><th id='numProsciutto'>" + this.prosciutto + "</th><th>prosciutto</th></tr>");
            }

            else
            {
                //incremento il numero di pizze
                this.prosciutto++;

                //aggiorno il numero di pizze
                $("#numProsciutto").text(this.prosciutto);
            }        
        }
        else if(pizza == "funghi")
        {
            //se è la prima ad essere ordinata
            if(this.funghi == 0)
            {
                //incremento il numero di pizze
                this.funghi++;

                //aggiungo la riga alla tabella
                $("#pizzas").append("<tr><th id='numFunghi'>" + this.funghi + "</th><th>funghi</th></tr>");
            }
            
            else
            {
                //incremento il numero di pizze
                this.funghi++;

                //aggiorno il numero di pizze
                $("#numFunghi").text(this.funghi);
            }
        }
        else if(pizza == "diavola")
        {
            //se è la prima ad essere ordinata
            if(this.diavola == 0)
            {
                //incremento il numero di pizze
                this.diavola++;

                //aggiungo la riga alla tabella
                $("#pizzas").append("<tr><th id='numDiavola'>" + this.diavola + "</th><th>diavola</th></tr>");
            }
            
            else
            {
                //incremento il numero di pizze
                this.diavola++;

                //aggiorno il numero di pizze
                $("#numDiavola").text(this.diavola);
            }
        }
        else if(pizza == "wurstel")
        {
            //se è la prima ad essere ordinata
            if(this.wurstel == 0)
            {
                //incremento il numero di pizze
                this.wurstel++;

                //aggiungo la riga alla tabella
                $("#pizzas").append("<tr><th id='numWurstel'>" + this.wurstel + "</th><th>wurstel</th></tr>");
            }
            
            else
            {
                //incremento il numero di pizze
                this.wurstel++;

                //aggiorno il numero di pizze
                $("#numWurstel").text(this.wurstel);
            }
        }
        else if(pizza == "patatine")
        {
            //se è la prima ad essere ordinata
            if(this.patatine == 0)
            {
                //incremento il numero di pizze
                this.patatine++;

                //aggiungo la riga alla tabella
                $("#pizzas").append("<tr><th id='numPatatine'>" + this.patatine + "</th><th>patatine</th></tr>");
            }
            
            else
            {
                //incremento il numero di pizze
                this.patatine++;

                //aggiorno il numero di pizze
                $("#numPatatine").text(this.patatine);
            }
        }
    }
}