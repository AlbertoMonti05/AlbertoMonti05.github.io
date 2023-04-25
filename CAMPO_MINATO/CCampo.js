class CCampo
{
    constructor()
    {
        //this.creaCampo();
    }

    reset()
    {
        location.reload();
    }

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
            //aggiungo una cella al campo
            $("#divCells").append("<div class='close-cells' data-row=" + riga + " data-coloumn=" + colonna + "></div>");

            $("<div class='close-cells' data-row=" + riga + " data-coloumn=" + colonna + "></div>").appendTo('#divCells');

            $("#divCells").after("<div class='close-cells' data-row=" + riga + " data-coloumn=" + colonna + "></div>");

            $("#divCells").appendChild("<div class='close-cells' data-row=" + riga + " data-coloumn=" + colonna + "></div>");

            //NESSUNO DEI QUATTRO METODI FUNZIONA
        }
    }
}