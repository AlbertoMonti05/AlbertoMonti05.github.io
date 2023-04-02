class CGestioneToDo
{
    constructor()
    {
        this.gest = [];
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

    ToDoNellaTable()
    {
        //ordino il vettore di todo in base alla data
        this.ordinaEventiPerData();
        
        //visualizzo tutti i todo nella table
        this.visualizzaToDoNellaTabella();
    }

    //dal più piccolo al più grande
    //per data --> da quella che viene prima a quella che viene dopo
    ordinaEventiPerData()
    {
        for (let i = 0; i < this.gest.length; i++)
        {
            for (let j = 0; j < (this.gest.length - i - 1); j++)
            {
                let scad1 = this.gest[j].getScadenza();
                let scad2 = this.gest[j + 1].getScadenza();

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
        //creo un vettore con th e td per fare la tabella
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
    }

    creaTabella(ToDo, pos)
    {
        let str = "";

        str += "<tr>";
        str += "<td class ='" + pos + "'>" + ToDo.getDescrizione(); + "</td>";
        str += "<td class ='" + pos + "'>" + "<button type='button' onclick = gest.eliminaToDo("+pos+");>ELIMINA</button>" + "</td>";

        return str;
    }

    eliminaTodo(classe)
    {
        //prendo gli elementi della classe
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
}