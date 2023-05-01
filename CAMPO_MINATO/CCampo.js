class CCampo
{
    constructor()
    {
        this.bombeMax = 6;
        this.colonneMax = 10;
        this.righeMax = 6;
        this.bandierePosizionate = 0;

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

    //metodo per cambiare la cella in una falg-cells
    //se è una flag-cells ritorna come in partenza
    changeInFlagCells(cella)
    {
        //posso mettere le bandiere fino a raggiungere il numero di bombe presenti nel campo
        if(this.bandierePosizionate == this.bombeMax)
        {
            return;
        }

        //dichiaro una variabile per contenere la classe della cella
        let classe = cella.getAttribute("class");

        //prendo la scritta nella cella
        //se nella cella c'è un numero non posso farla diventare una flag-cells
        //let x = cella.innerHTML;

        //se la cella è aperta non posso metterci la bandiera
        if(classe == "open-cells") //if(classe == "open-cells" || x == "")
        {
            return;
        }

        //se è una flag-cells
        if(classe == "flag-cells")
        {
            //la cella torna a essere come in partenza

            //prendo le coordinate della cella per controllare se inizialmente era una bomba
            let riga = this.getRow(cella);
            let colonna = this.getColoumn(cella);
            let is_a_bomb = this.controlloCoordinateBomba(riga, colonna);

            //se era una bomba
            if(is_a_bomb == true)
            {
                //rimuovo la classe flag-cells
                $(cella).removeClass("flag-cells");

                //aggiugno la classe bomb-cells
                $(cella).addClass("bomb-cells");

                this.bandierePosizionate--;

                return;
            }

            //se sono qui allora inizialmente non era bomba

            //rimuovo la classe flag-cells
            $(cella).removeClass("flag-cells");

            //aggiugno la classe close-cells
            $(cella).addClass("close-cells");


            //decremento il numero di bandiere posizionate
            this.bandierePosizionate--;

            return;
        }

        //se è una close-cells
        if(classe == "close-cells")
        {
            //la cella passa dalla classe close-cells alla classe flag-cells

            //rimuovo la classe close-cells
            $(cella).removeClass("close-cells");

            //aggiugno la classe flag-cells
            $(cella).addClass("flag-cells");


            //incremento il numero di bandiere posizionate
            this.bandierePosizionate++;

            return;
        }

        //se è una bomb-cells
        if(classe == "bomb-cells")
        {
            //la cella passa dalla classe bomb-cells alla classe flag-cells

            //rimuovo la classe bomb-cells
            $(cella).removeClass("bomb-cells");

            //aggiugno la classe flag-cells
            $(cella).addClass("flag-cells");


            //incremento il numero di bandiere posizionate
            this.bandierePosizionate++;

            return;
        }
    }

    /*
        metodo per controllare se le coordiante appartengono a una bomb-cells

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
        //$(document).ready(function(){

            //rimuovo la classe close-cells
            $(cella).removeClass("close-cells");

            //aggiugno la classe open-cells
            $(cella).addClass("open-cells");

        //});
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
        //se viene cliccata una flag-cells non faccio nulla
        if(cella.getAttribute("class") == "flag-cells")
        {
            return;
        }

        //controllo che la cella non sia una bomba
        this.check_if_is_a_bomb(cella);

        //prendo il numero di bombe attorno alla cella
        let cntBombe = this.howManyBomb(cella);
        
        //se non ci sono bombe nelle vicenze (cntBombe == 0) apro la cella
        if(cntBombe == 0)
        {
            //apro la cella
            this.openCell(cella);

            //controllo le celle accanto
            this.checkNearCells(cella);
        }
        else
        {
            //inserisco nel div il numero di bombe presenti nelle celle affianco
            cella.innerHTML = cntBombe;
        }
    }

    //metodo per controllare la cella accanto a un cella aperta
    checkCellNoBomb(cella)
    {
        /*
            questo metodo è uguale al metodo checkCell ma senza richiamare
            il metodo check_if_is_a_bomb perchè nella cella non c'è di sicuro
            una bomba
        */

        //controllo prima di tutto se la cella è già diversa da close-cells
        let classeCella = cella.getAttribute("class");
        if(classeCella != "close-cells")
        {
            //interrompo il metodo
            return;
        }

        //prendo il numero di bombe attorno alla cella
        let cntBombe = this.howManyBomb(cella);
        
        //se non ci sono bombe nelle vicenze (cntBombe == 0) apro la cella
        if(cntBombe == 0)
        {
            //apro la cella
            this.openCell(cella);

            //controllo le celle accanto
            this.checkNearCells(cella);
        }
        else
        {
            //inserisco nel div il numero di bombe presenti nelle celle affianco
            cella.innerHTML = cntBombe;
        }
    }

    //metodo per aprire le celle accanto alla cella passata come parametro
    checkNearCells(cella)
    {
        /*
            'cella' è la cella appena aperta

            visto che la cella è stata aperta, attorno ad essa non ci sono
            delle bombe

            quindi non controllo se le celle attorno sono delle bombe, controllo
            solo se attorno ad esse ci sono delle bombe; se anche queste si apriranno,
            anche per loro si eseguirà questo procedimento

            se la cella accanto ha attorno delle bombe, questa visualizzarà il numero
            di bombe presenti attorno ad essa

            per fare tutto questo basta solamente prendere la cella accanto
            e richiamare il metodo checkCell (metodo richiamato al click su una cella)
        */

        //prendo la riga e la colonna della cella appena aperta
        let riga = this.getRow(cella);
        let colonna = this.getColoumn(cella);

        /*
           r-1 r-1 c+1
           r-1 *** r+1
           r-1 *** r+1
           c-1 c-1 r+1

           parto verso l'altro e poi giro verso destra
           per ogni cella richiamo il metodo
        */

        //dichiaro una variabile per contenere tutte le celle da controllare
        let cellaX = cella;
        /*
            le celle verranno prese con il metodo giveMeCell che ritorna un vettore

            la nostra cella sarà l'unico elemento del vettore e quindi sarà sempre in indice[0]
        */

        //prima di controllare la cella devo controllare che siano delle coordiante valide
        riga--;
        if(this.is_a_valid_cell(riga, colonna))
        {
            //prendo la cella
            cellaX = this.giveMeCell(riga,colonna);

            //controllo la cella
            this.checkCellNoBomb(cellaX[0]);
        }

        colonna++;
        if(this.is_a_valid_cell(riga, colonna))
        {
            //prendo la cella
            cellaX = this.giveMeCell(riga,colonna);

            //controllo la cella
            this.checkCellNoBomb(cellaX[0]);
        }

        riga++;
        if(this.is_a_valid_cell(riga, colonna))
        {
            //prendo la cella
            cellaX = this.giveMeCell(riga,colonna);

            //controllo la cella
            this.checkCellNoBomb(cellaX[0]);
        }

        riga++;
        if(this.is_a_valid_cell(riga, colonna))
        {
            //prendo la cella
            cellaX = this.giveMeCell(riga,colonna);

            //controllo la cella
            this.checkCellNoBomb(cellaX[0]);
        }

        colonna--;
        if(this.is_a_valid_cell(riga, colonna))
        {
            //prendo la cella
            cellaX = this.giveMeCell(riga,colonna);

            //controllo la cella
            this.checkCellNoBomb(cellaX[0]);
        }

        colonna--;
        if(this.is_a_valid_cell(riga, colonna))
        {
            //prendo la cella
            cellaX = this.giveMeCell(riga,colonna);

            //controllo la cella
            this.checkCellNoBomb(cellaX[0]);
        }

        riga--;
        if(this.is_a_valid_cell(riga, colonna))
        {
            //prendo la cella
            cellaX = this.giveMeCell(riga,colonna);

            //controllo la cella
            this.checkCellNoBomb(cellaX[0]);
        }

        riga--;
        if(this.is_a_valid_cell(riga, colonna))
        {
            //prendo la cella
            cellaX = this.giveMeCell(riga,colonna);

            //controllo la cella
            this.checkCellNoBomb(cellaX[0]);
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

            il metodo ritornerà un vettore, per questo nell'if ci sarà cella[0]
            la nostra cella è l'unico elemento nel vettore e quindi sarà al primo indice
        */
        let cella = this.giveMeCell(riga, colonna);

        //controllo la classe della cella
        if(cella[0].getAttribute("class") == "bomb-cells")
        {
            return 1;
        }

        return 0;
    }

    //metodo per prendere la cella tramite riga e colonna
    giveMeCell(riga, colonna)
    {
        /*
            il calcolo ritornerà un vettore

            la nostra cella è l'unico elemento nel vettore e quindi sarà al primo indice [0]
        */
        return $("div[data-row='" + riga +"'][data-coloumn='" + colonna +"']");
    }
}
