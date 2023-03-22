class Calcolatrice {
    /**
     * costruttore non parametrico
     * 
     * dichiara e inizializza:
     * - parziale a zero
     * - numeroCorrente come ''
     * - primaVolta a true
     */
    constructor() 
    {
        this.parziale = 0;
        this.numeroCorrente = '';
        this.primaVolta = true;
    }

    //metodo richiamato al click di uno dei bottoni numerici
    setNumeroCorrente(numero) {
        this.numeroCorrente += numero;

        return this.numeroCorrente;
    }

    //metodo richiamato al click del bottone '+-'
    cambiaSegno() 
    {
        this.numeroCorrente *= -1;

        return this.numeroCorrente;
    }

    ////metodo richiamato al click del bottone 'C'
    cancella() {
        this.parziale = 0;

        return this.parziale;
    }

    //metodo richiamato al click del bottone '+'
    somma()
    {
        //sommo il numero corrente al parziale
        this.parziale += ParseInt(this.numeroCorrente);

        Window.alert("parziale = " + this.parziale)

        //imposto il numero corrente a zero
        this.numeroCorrente = '';

        alert("numeroCorrente = " + this.numeroCorrente)

        return '';
    }

    //metodo richiamato al click del bottone '-'
    sottrazione() {
        //se è la prima volta che si fa un calcolo
        if (this.primaVolta == true) {
            //il numero corrente diventa il parziale
            this.parziale = parseInt(this.numeroCorrente);

            //non sarà più la prima volta
            this.primaVolta = false;
        }
        else {
            //sottraggo al parziale il numero corrente
            this.parziale -= parseInt(this.numeroCorrente);
        }

        return true;
    }

    //metodo richiamato al click del bottone '/'
    divisione() {
        //se è la prima volta che si fa un calcolo
        if (this.primaVolta == true) {
            //il numero corrente diventa il parziale
            this.parziale = parseInt(this.numeroCorrente);

            //non sarà più la prima volta
            this.primaVolta = false;
        }
        else {
            //divido il parziale per il numero corrente
            this.parziale /= parseInt(this.numeroCorrente);
        }

        return true;
    }

    //metodo richiamato al click del bottone '*'
    moltiplicazione() {
        //se è la prima volta che si fa un calcolo
        if (this.primaVolta == true) {
            //il numero corrente diventa il parziale
            this.parziale = parseInt(this.numeroCorrente);

            //non sarà più la prima volta
            this.primaVolta = false;
        }
        else {
            //moltiplico il parziale per il numero corrente
            this.parziale *= parseInt(this.numeroCorrente);
        }

        return true;
    }

    /**
     * metodo richiamato al click del bottone '='
     * 
     * metodo per ottenere il risultato
     * 
     * @returns risultato delle operazioni effettuate
    */
    getRis() {
        return this.parziale;
    }
}
