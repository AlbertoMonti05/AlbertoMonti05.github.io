class Calcolatrice 
{
    /**
     * costruttore non parametrico
     * 
     * dichiara e inizializza:
     * - parziale a zero
     * - numeroCorrente come ""
     * - operazione come ""
     */
    constructor() 
    {
        this.parziale = 0;
        this.numeroCorrente = "";
        this.operazione = "";
        //this.primaVolta = true;
    }

    //metodo richiamato al click di uno dei bottoni numerici
    setNumeroCorrente(numero)
    {
        this.numeroCorrente += numero;

        return this.numeroCorrente;
    }

    //metodo richiamato al click del bottone '+-'
    cambiaSegno() 
    {
        //prendo il numero corrente in intero
        let x = parseInt(this.numeroCorrente);

        //cambio segno al numero
        x *= -1;

        //trasformo il numero in stringa
        this.numeroCorrente = "" + x;

        return this.numeroCorrente;
    }

    //metodo richiamato al click del bottone 'C'
    cancella() 
    {
        this.parziale = 0;
        this.numeroCorrente = "";

        return this.parziale;
    }

    somma(x)
    {
        //prendo il numero corrente in intero
        this.parziale = parseInt(this.numeroCorrente);

        //svuoto il numero corrente
        this.numeroCorrente = "";

        this.operazione = "somma";

        return this.numeroCorrente;
    }

    sottrazione(x)
    {
        //prendo il numero corrente in intero
        this.parziale = parseInt(this.numeroCorrente);

        //svuoto il numero corrente
        this.numeroCorrente = "";

        this.operazione = "sottrazione";

        return this.numeroCorrente;
    }

    divisione(x) 
    {
        //prendo il numero corrente in intero
        this.parziale = parseInt(this.numeroCorrente);

        //svuoto il numero corrente
        this.numeroCorrente = "";

        this.operazione = "divisione";
        
        return this.numeroCorrente;
    }

    moltiplicazione(x) 
    {
        //prendo il numero corrente in intero
        this.parziale = parseInt(this.numeroCorrente);

        //svuoto il numero corrente
        this.numeroCorrente = "";

        this.operazione = "moltiplicazione";

        return this.numeroCorrente;
    }

    /**
     * metodo richiamato al click del bottone '='
     * 
     * metodo per ottenere il risultato
     * 
     * @returns risultato delle operazioni effettuate
    */
    getRis() 
    {
        this.eseguiCalcolo();

        return this.parziale;
    }

    eseguiCalcolo()
    {
        //prendo il numero corrente in intero
        let x = parseInt(this.numeroCorrente);

        if(this.operazione == "somma")
        {
            this.parziale += x;
        }
        else if(this.operazione == "sottrazione")
        {
            this.parziale -= x;
        }
        else if(this.operazione == "divisione")
        {
            this.parziale /= x;
        }
        else if(this.operazione == "moltiplicazione")
        {
            this.parziale *= x;
        }

        this.numeroCorrente = this.parziale;

        return this.numeroCorrente;
    }
}
