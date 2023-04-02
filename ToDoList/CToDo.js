class CTodo
{
    constructor(desc, scad)
    {
        this.descrizione = desc;
        this.scadenza = new Date(scad);
        this.giorniMancanti = this.giorniMancantiA_FineEvento();
        this.isUrgente = this.controlloUrgenza();
        this.isCompletato = false;
    }

    getIsCompletato()
    {
        return this.isCompletato;
    }

    setIsCompletato()
    {
        //cambio lo stato del completamento
        if(this.isCompletato == true)
        {
            //da true metto false
            this.isCompletato = false;
        }
        else
        {
            //da false metto true
            this.isCompletato = true;
        }
    }

    giorniMancantiA_FineEvento(x)
    {
        //prendo la data di oggi
        let oggi = new Date();

        //prendo la differenza dei giorni tra la scadenza e la data di oggi
        let differenzaTempo = this.scadenza.getTime() - oggi.getTime();
        let differenzaGiorni = Math.ceil(differenzaTempo / (1000 * 60 * 60 * 24));

        return differenzaGiorni;
    }

    controlloUrgenza()
    {
        if(this.giorniMancanti < 3)
        {
            //è urgente
            return true;
        }

        //non è urgente
        return false;
    }

    getGiorniMancanti()
    {
        return this.giorniMancanti;
    }

    getIsUrgente()
    {
        return this.isUrgente;
    }

    getDescrizione()
    {
        return this.descrizione;
    }

    getScadenza()
    {
        return this.scadenza;
    }

    setDescrizione(x)
    {
        this.descrizione = x;
    }

    setScadenza(x)
    {
        this.scadenza = new Date(x);
    }
}
