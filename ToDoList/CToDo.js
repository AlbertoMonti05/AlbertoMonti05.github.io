class CTodo
{
    constructor(desc, scad)
    {
        this.descrizione = desc;
        this.scadenza = new Date(scad);
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