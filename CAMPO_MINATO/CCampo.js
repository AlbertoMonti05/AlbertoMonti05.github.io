class CCampo
{
    constructor()
    {
        this.bombeMax = 6;
        this.colonneMax = 10;
        this.righeMax = 6;

        //imposto il numero di bombe nell'html
        //document.getElementById("numeroBombeNelCampo").innerHTML = "NUMERO BOMBE NEL CAMPO: " + this.bombeMax;

        //prendo le coordinate (casuali) in cui mettere le bombe
        this.coordinateBombe = [];
        this.prendiCoordianteBombe();
    }

    //metodo per prendere le coordinate (casuali) delle bombe
    prendiCoordianteBombe()
    {
        let riga = -1;
        let colonna = -1;
        let coordinata = "";

        //per 6 volte
        for(let i = 0; i <= this.bombeMax; i++)
        {
            //genero la colonna
            colonna = this.numeroIntRandom(0, this.colonneMax);

            //genero la riga
            riga = this.numeroIntRandom(0, this.righeMax);

            //creo la coordinata
            coordinata += riga + ";" + colonna;

            //aggiungo la coordianta della bomba al vettore
            this.coordinateBombe[i] = coordinata;

            //imposto la coordinata come vuota
            coordinata = "";
        }
    }

    //metodo per ottenere un numero random tra un min e un max
    numeroIntRandom(min, max)
    {
        return Math.floor((Math.random() * (max-min)) +min);
    }

    //metodo per ricominciare il gioco
    reset()
    {
        location.reload();
    }

    /*
        metodo per creare il campo

        viene richiamato nell'html
    */
    creaCampo()
    {
        //creo il campo nell'html
        //per 6 volte aggiungo una riga da 10 colonne
        for(let riga = 0; riga < 6; riga++)
        {
            this.aggiugniRiga(riga);
        }
    }

    aggiugniRiga(riga)
    {
        for(let colonna = 0; colonna < 10; colonna++)
        {
            /*
                aggiungo una cella al campo

                le celle possono essere di classe close-cells o di classe bomb-cells
                quelle di classe bomb-cells hanno le coordinate nell'attributo
                this.coordinateBombe quindi devo controllare le coordinate

            */

            //controllo se sono le coordinate di una bomba
            if(this.controlloCoordinateBomba(riga, colonna) == true)
            {
                $(document).ready(function(){

                    $("#divCells").append("<div class='bomb-cells' onclick='campo.checkCell(this);' oncontextmenu='campo.changeInFlagCells(this);' data-row=" + riga + " data-coloumn=" + colonna + "></div>");

                });
            }
            else
            {
                $(document).ready(function(){

                    $("#divCells").append("<div class='close-cells' onclick='campo.checkCell(this);' oncontextmenu='campo.changeInFlagCells(this);' data-row=" + riga + " data-coloumn=" + colonna + "></div>");

                });
            }
        }
    }

    //metodo per cambiare la cella da una close-cells a una falg-cells
    changeInFlagCell(cella)
    {
        //se la cella è aperta non posso metterci la bandiera
        if(cella.getAttribute("class") == "open-cells")
        {
            return false;
        }

        //la cella passa dalla classe close-cells alla classe flag-cells
        $(document).ready(function(){

            //rimuovo la classe close-cells
            $(cella).removeClass("close-cells");

            //aggiugno la classe flag-cells
            $(cella).addClass("flag-cells");

        });
    }

    /*
        metodo richiamato durante la creazione del campo 

        serve per controllare se le coordinate corrispondono alla posizione di una bomba

        true --> corrispondono a una bomba
        false --> non corrispondono a una bomba
    */
    controlloCoordinateBomba(riga, colonna)
    {
        //creo un vettore temporaneo
        let temp = [];

        //scorro il vettore delle coordinate delle bombe
        for(let i = 0; i < this.coordinateBombe.length - 1; i++)
        {
            //divido le coordinate nel vettore temp
            temp = this.coordinateBombe[i].split(';');
            //[0] riga
            //[1] colonna

            if(temp[0] == riga && temp[1] == colonna)
            {
                return true;
            }
        }

        return false;
    }

    //metodo per prendere la riga di una cella
    getRow(cella)
    {
        return cella.getAttribute("data-row");
    }

    //metodo per prendere la colonna di una cella
    getColoumn(cella)
    {
        return cella.getAttribute("data-coloumn");
    }

    //metodo per aprire una cella
    openCell(cella)
    {
        //la cella passa dalla classe close-cells alla classe open-cells
        $(document).ready(function(){

            //rimuovo la classe close-cells
            $(cella).removeClass("close-cells");

            //aggiugno la classe open-cells
            $(cella).addClass("open-cells");

        });
    }

    //metodo per controllare se in una cella c'è la bomba
    check_if_is_a_bomb(cella)
    {
        //prendo la classe della cella
        let classeCella = cella.getAttribute("class");

        if(classeCella == "bomb-cells")
        {
            alert("HAI PERSO");
            location.reload();
        }
    }

    /*
        metodo per controllare la cella

        se non ci sono bombe nelle vicinanza la apre
        se ci sono bombe nelle vicinanza visualizza il numero di bombe presenti
        se c'è la bomba si perde e si ricomincia il gioco
    */
    checkCell(cella)
    {
        //controllo che la cella non sia una bomba
        this.check_if_is_a_bomb(cella);

        //prendo il numero di bombe attorno alla cella
        let cntBombe = this.howManyBomb(cella);
        
        //se non ci sono bombe nelle vicenze (cntBombe == 0) apro la cella
        if(cntBombe == 0)
        {
            //apro la cella
            this.openCell(cella);
        }
        else
        {
            //inserisco nel div il numero di bombe presenti nelle celle affianco
            cella.innerHTML = cntBombe;
        }
    }

    //metodo per contare il numero di bombe presenti attorno alla cella
    howManyBomb(cella)
    {
        //dichiaro un contatore per le bombe attorno alla cella cliccata
        let cntBombe = 0;

        //prendo la riga e la colonna della cella
        let riga = this.getRow(cella);
        let colonna = this.getColoumn(cella);

        /*
           r-1 r-1 c+1
           r-1 *** r+1
           r-1 *** r+1
           c-1 c-1 r+1

           parto verso l'altro e poi giro verso destra
        */

        //prima di controllare la cella devo controllare che siano delle coordiante valide
        riga--;
        if(this.is_a_valid_cell(riga, colonna))
        {
            cntBombe += this.is_a_bomb(riga, colonna);
        }

        colonna++;
        if(this.is_a_valid_cell(riga, colonna))
        {
            cntBombe += this.is_a_bomb(riga, colonna);
        }

        riga++;
        if(this.is_a_valid_cell(riga, colonna))
        {
            cntBombe += this.is_a_bomb(riga, colonna);
        }

        riga++;
        if(this.is_a_valid_cell(riga, colonna))
        {
            cntBombe += this.is_a_bomb(riga, colonna);
        }

        colonna--;
        if(this.is_a_valid_cell(riga, colonna))
        {
            cntBombe += this.is_a_bomb(riga, colonna);
        }

        colonna--;
        if(this.is_a_valid_cell(riga, colonna))
        {
            cntBombe += this.is_a_bomb(riga, colonna);
        }

        riga--;
        if(this.is_a_valid_cell(riga, colonna))
        {
            cntBombe += this.is_a_bomb(riga, colonna);
        }

        riga--;
        if(this.is_a_valid_cell(riga, colonna))
        {
            cntBombe += this.is_a_bomb(riga, colonna);
        }

        //ritorno il numero di bombe
        return cntBombe;
    }

    //metodo per controllare se la riga e la colonna sono dentro al campo
    is_a_valid_cell(riga, colonna)
    {
        return (riga >= 0 && riga < this.righeMax && colonna >= 0 && colonna < this.colonneMax);
    }

    /*
        metodo per controllare se la cella è una bomba

        se lo è ritorno 1
        se non lo è ritorno 0

        in questo modo eseguirò il calcolo con il valore di ritorno del metodo
    */
    is_a_bomb(riga, colonna)
    {   
        /*
            prendo la cella in base a riga e colonna

            il calcolo ritornerà un vettore, per questo nell'if ci sarà cella[0]
            la nostra cella è l'unico elemento nel vettore e quindi sarà al primo indice
        */
        let cella = $("div[data-row='" + riga +"'][data-coloumn='" + colonna +"']");

        //controllo la classe della cella
        if(cella[0].getAttribute("class") == "bomb-cells")
        {
            return 1;
        }

        return 0;
    }
}
