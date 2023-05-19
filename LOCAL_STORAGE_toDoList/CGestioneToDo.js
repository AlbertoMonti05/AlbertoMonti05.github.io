class CGestioneToDo
{
    constructor()
    {
        this.gest = [];
    }

    saveToDo()
    {
        localStorage.clear();
        
        let descrizione = "descrizione:";
        let scadenza = "scadenza:";

        for(let i = 0; i < this.gest.length; i++)
        {
            localStorage.setItem("elemento" + i, "" + descrizione + this.gest[i].descrizione + " " + scadenza +  this.gest[i].scadenza);
        }
    }

    uploadToDo()
    {
        let el = "";
        let cnt = 0;

        let descrizione = "";
        let scadenza = "";

        while(true)
        {
            el = localStorage.getItem("elemento" + cnt++);

            if(el == null)
            {
                break;
            }

            descrizione = el.substring(el.indexOf(":") + 1, el.lastIndexOf("scadenza") - 1);
            scadenza = el.substring(el.lastIndexOf(":") + 1, el.length);

            let todo = new CTodo(descrizione, scadenza);

            this.gest.push(todo);
        }

        this.caricaToDo();
    }

    caricaToDo()
    {
        //prendo descrizione e scadenza del toDo
        let desc = "";
        let scad = "";

        for(let i = 0; i <this.gest.length; i++)
        {
            desc = this.gest[i].descrizione;
            scad = this.gest[i].scadenza;

        if(this.gest.length != 50)
        {
            //sistemo i to do nella table
            this.ToDoNellaTable();
        }
        else
        {
            alert("non puoi inserire più di 50 to do nella lista");
        }
        }
    }

    aggiungiToDo()
    {
        //prendo descrizione e scadenza del toDo
        let desc = document.getElementById("txtToDo").value;
        let scad = document.getElementById("dateToDo").value;

        //creo il nuovo toDo
        let toDo = new CTodo(desc, scad);

        //to do massimi nel vettore = 50

        if(this.gest.length != 50)
        {
            //aggiugno il to do al vettore
            this.gest.push(toDo);

            //sistemo i to do nella table
            this.ToDoNellaTable();
        }
        else
        {
            alert("non puoi inserire più di 50 to do nella lista");
        }
    }

    visualizzaPerData()
    {
        //ordino il vettore di todo in base alla data
        this.ordinaEventiPerData();
        
        //visualizzo tutti i todo nella table
        this.visualizzaToDoNellaTabella();
    }

    ToDoNellaTable()
    {
        //visualizzo tutti i todo nella table
        this.visualizzaToDoNellaTabella();
    }

    visualizzaCompletate()
    {
        //creo un vettore in cui metterò th e td per fare la tabella
        let vett = new Array();

        //per tutti i toDo
        for(let i = 0; i < this.gest.length; i++)
        {
            //se è completato
            if(this.gest[i].getIsCompletato() == true)
            {
                vett[i] = this.creaTabella(this.gest[i], i);
            }
        }

        let table = document.getElementById("tblToDo");
        //svuoto la tabella
        table.innerHTML = "";

        for(let i = 0;i < vett.length; i++)
        {
            table.innerHTML += vett[i];
        }

        //imposto il colore delle urgenze
        this.impostaColore();
    }

    visualizzaNonCompletate()
    {
        //creo un vettore in cui metterò th e td per fare la tabella
        let vett = new Array();

        //per tutti i toDo
        for(let i = 0; i < this.gest.length; i++)
        {
            //se è completato
            if(this.gest[i].getIsCompletato() == false)
            {
                vett[i] = this.creaTabella(this.gest[i], i);
            }
        }

        let table = document.getElementById("tblToDo");
        //svuoto la tabella
        table.innerHTML = "";

        for(let i = 0;i < vett.length; i++)
        {
            table.innerHTML += vett[i];
        }

        //imposto il colore delle urgenze
        this.impostaColore();
    }

    visualizzaTutte()
    {
        this.visualizzaToDoNellaTabella();
    }

    impostaColore()
    {
        let vett = [];

        //per tutti i toDo
        for(let i = 0; i< this.gest.length;i++)
        {
            //pos i del toDo == classe descrizione e bottone elimina del toDo
            //prendo tutti gli elementi della classe
            vett = document.getElementsByClassName(i);

            //il colore lo assegno solo ai toDo non completati
            //se il toDo non è stato completato
            if(!this.gest[i].getIsCompletato())
            {
                //prendo i giorni mancanti
                let gg = this.gest[i].getGiorniMancanti();

                //se mancano meno di 3 giorni
                if(gg < 3)
                {
                    //scritta rossa
                    vett[0].style = "color: red;";
                }
                else if (gg > 3 && gg < 7)
                {
                    //dai 4 ai 6 giorni

                    //scritta gialla
                    vett[0].style = "color: yellow;";
                }
                else if(gg >= 7)
                {
                    //dai 7 giorni in poi

                    //scritta verde
                    vett[0].style = "color: green;";
                }
            }
        }
    }

    //dal più piccolo al più grande
    //per data --> da quella che viene prima a quella che viene dopo
    ordinaEventiPerData()
    {
        for (let i = 0; i < this.gest.length; i++)
        {
            for (let j = 0; j < (this.gest.length - i - 1); j++)
            {
                let scad1 = this.gest[j].descrizione;
                let scad2 = this.gest[j + 1].scadenza;

                if (scad1 > scad2)
                {
                    let temp = this.gest[j];
                    this.gest[j] = this.gest[j + 1];
                    this.gest[j + 1] = temp;
                }
            }
        }
    }

    visualizzaToDoNellaTabella()
    {
        //creo un vettore in cui metterò th e td per fare la tabella
        let vett = new Array();

        //per tutti i toDo
        for(let i = 0; i < this.gest.length; i++)
        {
            vett[i] = this.creaTabella(this.gest[i], i);
        }


        let table = document.getElementById("tblToDo");
        //svuoto la tabella
        table.innerHTML = "";

        for(let i = 0;i < vett.length; i++)
        {
            table.innerHTML += vett[i];
        }

        //imposto il colore delle urgenze
        this.impostaColore();
    }

    creaTabella(ToDo, pos)
    {
        let str = "";

        str += "<tr>";
        str += "<input type='checkbox' onclick=gest.toDoCompletato("+pos+");>"
        str += "<td class ='" + pos + "'>" + ToDo.descrizione; + "</td>";
        str += "<td class ='" + pos + "'>" + "<button type='button' onclick = gest.eliminaToDo("+pos+");>ELIMINA</button>" + "</td>";

        return str;
    }

    toDoCompletato(indice)
    {
        //indice della checkbox == indice del todo

        //prendo dal vettore dei toDo, il toDo in posizione = indice
        let toDo = this.gest[indice];

        //cambio lo stato del completamento
        toDo.setIsCompletato();

        //indice toDo == classe descrizione e bottone elimina del toDo
        //prendo tutti gli elementi della classe
        let vett = document.getElementsByClassName(indice);

        //cambio lo stile in base al completamento
        if(toDo.getIsCompletato() == true)
        {
            //completato
            //descrizione barrata
            vett[0].style = "text-decoration: line-through;";
        }
        else
        {
            //non completato
            //descrizione normale
            vett[0].style = "";
        }
    }

    eliminaTodo(classe)
    {
        //prendo tutti gli elementi della classe
        let vett = document.getElementsByClassName(classe);

        //prendo la descrizione (pos 0) del todo da eliminare
        let desc = vett[0];

        //li confronto con tutti i to do 
        for(let i = 0; i < this.gest.length; i++)
        {
            if(this.gest[i].getDescrizione() == desc)
            {
                //elimino il to do trovato
                this.gest.splice(pos, 1); //riuove da pos per un elemento
            }
        }

        //ricarico la table
        this.visualizzaToDoNellaTabella();
    }

    eliminaTuttaToDoList()
    {
        //svuoto il vettore di toDo
        this.gest = [];

        //prendo la tabella
        let table = document.getElementById("tblToDo");
        //svuoto la tabella
        table.innerHTML = "";
    }

    visualizzaUrgentiNellaTabella()
    {
        //creo un vettore temporaneo
        let vettTemp = [];

        //per tutti i toDo
        for(let i = 0; i < this.gest.length; i++)
        {
            //se è urgente
            if(this.gest[i].getIsUrgente() == true)
            {
                //inserisco il toDo nel vettore
                vettTemp.push(this.gest[i]);
            }
        }

        //creo un vettore in cui metterò th e td per fare la tabella
        let vett = new Array();

        //per tutti i toDo urgenti
        for(let i = 0; i < vettTemp.length; i++)
        {
            vett[i] = this.creaTabella(vettTemp[i], i);
        }


        let table = document.getElementById("tblToDo");
        //svuoto la tabella
        table.innerHTML = "";

        for(let i = 0;i < vett.length; i++)
        {
            table.innerHTML += vett[i];
        }
    }    
}