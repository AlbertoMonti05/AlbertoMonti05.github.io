import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

class DipendentiUfficio
{
    public static void main(String[] args) throws IOException
    {
        /*
         * Il programma deve:
         * - caricare i dati presenti nell'archivio (se l'archivio non esiste va reato)
         * - visualizzare i dati eventualmente caricati
         * - aggiungere alcuni dati
         * - salvare i dati aggiornati all'interno dell'archivio
        */

        //creo un gestore dei file
        GestioneFile gestFile = new GestioneFile();

        //creo un gestore dei dipendenti e degli uffici
        GestioneDipendentiUffici gestDipendentiUffici = new GestioneDipendentiUffici();

        //leggo i dipendenti e gli uffici dal file e li carico nel gestore dei dipendenti e degli uffici
        gestFile.leggiCSV(gestDipendentiUffici);
        
        //visualizzo i dati caricati
        gestDipendentiUffici.visualizzaDati();

        //aggiungo alcuni dati 
        Dipendente d = new Dipendente("giordano", "bruno", "02/02/1985", "30/11/2018", "38", "Distribuzione");
        Ufficio u = new Ufficio("Distribuzione", "-1", "DIS", "19", "Carlo");
        gestDipendentiUffici.addDipendente(d);
        gestDipendentiUffici.addUfficio(u);

    }
}

class Dipendente
{
    //attributi
    public String nome;
    public String cognome;
    public String dataNascita;
    public String dataAssunzione;
    public String numeroOreSettimanale;
    public String ufficioReparto;

    /**
     * costruttore parametrico
     * @param n nome dipendente
     * @param c cognome dipendente
     * @param dn data di nascita dipendente
     * @param da data di asssunzione dipendente
     * @param nos numero ore settimanali dipendente
     * @param ur ufficio dipendente
     */
    public Dipendente(String n, String c, String dn, String da, String nos, String ur)
    {
        nome = n;
        cognome = c;
        dataNascita = dn;
        dataAssunzione = da;
        numeroOreSettimanale = nos;
        ufficioReparto = ur;
    }

    /**
     * metodo per ritorno i dati del dipendente
     * @return String contenente i dati del dipendente
     */
    public String getDipendente()
    {
        return "Nome dipendente: " + nome + "; Cognome dipendente: " + cognome + "; Data di nascita: " + dataNascita + "; Data di assunzione: " + dataAssunzione + "; Numero ore settimanali di lavoro: " + numeroOreSettimanale + "; Ufficio/reparto: " + ufficioReparto;
    }
}

class Ufficio
{
    //attributi
    public String nome;
    public String piano;
    public String siglaLocale;
    public String numeroPostazioni;
    public String nomeResponsabile;
    public List<Dipendente> listaDipendenti;

    /**
     * costruttore parametrico
     * @param n nome ufficio
     * @param p piano ufficio
     * @param sl sigla ufficio
     * @param np numero postazioni ufficio
     * @param nr nome responsabile ufficio
     */
    public Ufficio(String n, String p, String sl, String np, String nr)
    {
        nome = n;
        piano = p;
        siglaLocale = sl;
        numeroPostazioni = np;
        nomeResponsabile = nr;
        listaDipendenti = new ArrayList<>();
    }

    /**
     * metodo per inserire i dipendenti nella lista dei dipendenti di questo ufficio
     * @param dipendenti lista dei dipendenti dell'azienda
     */
    public void setDipendenti(List<Dipendente> dipendenti)
    {
        //per ogni dipendente
        for (Dipendente dipendente : dipendenti)
        {
            //se il nome dell'ufficio del dipendente è uguale a quello di questo ufficio
            if(dipendente.ufficioReparto.equals(this.nome))
            {
                //aggiungo il dipendente alla lista dei dipendenti di questo ufficio
                listaDipendenti.add(dipendente);
            }   
        }
    }

    /**
     * metodo per ottenre i dati dell'ufficio
     * @return String contenente i dati dell'ufficio
     */
    public String getUfficio()
    {
        return "Nome ufficio: " + nome + "; Piano: " + piano + "; Sigla: " + siglaLocale + "; Numero di postazioni: " + numeroPostazioni + "; Nome responsabile: " + nomeResponsabile;
    }
}

class GestioneDipendentiUffici
{
    //attributi
    List<Dipendente> listaDipendenti;
    List<Ufficio> listaUffici;

    /*
     * queste due liste sono usate nel caricamento dei dati nell'archivio
     * 
     * in questo modo apro il file in append e so già quali uffici andare ad inserire
     */
    List<Dipendente> listaDipendentiAggiunti;
    List<Ufficio> listaUfficiAggiunti;

    /**
     * costruttore non parametrico
     */
    public GestioneDipendentiUffici()
    {
        listaDipendenti = new ArrayList<>();
        listaUffici = new ArrayList<>();
    }

    /**
     * costruttore parametrico
     * @param lDipendenti lista dei dipendenti
     * @param lUffici lista degli uffici
     */
    public GestioneDipendentiUffici(List<Dipendente> lDipendenti, List<Ufficio> lUffici)
    {
        listaDipendenti = lDipendenti;
        listaUffici = lUffici;
    }

    /**
     * metodo per settare le liste dei dipendenti e degli uffici
     * @param lDipendenti lista dei dipendenti
     * @param lUffici lista degli uffici
     */
    public void setListe(List<Dipendente> lDipendenti, List<Ufficio> lUffici)
    {
        listaDipendenti = lDipendenti;
        listaUffici = lUffici;
    }

    /**
     * metodo per settare la lista dei dipendenti di ogni ufficio
     */
    public void setDipendentiUfficio()
    {
        //pre ogni ufficio
        for (Ufficio ufficio : listaUffici)
        {
            //inserisco i dipendenti nella lista dell'ufficio
            ufficio.setDipendenti(listaDipendenti);    
        }
    }

    /**
     * metodo per visualizzare i dati dei dipendenti e degli uffici
     */
    public void visualizzaDati()
    {
        System.out.println("DIPENDENTI PRESENTI NELL'AZIENDA:\n");

        //scorro i dipendenti
        for (Dipendente dipendente : listaDipendenti)
        {
            System.out.println(dipendente.getDipendente() + "\n");
        }

        System.out.println("\n-----------------------------------------------------------------------------------------------\n");

        System.out.println("UFFICI PRESENTI NELL'AZIENDA:\n");

        //scorro gli uffici
        for (Ufficio ufficio : listaUffici)
        {
            System.out.println(ufficio.getUfficio() + "\n");
        }
    }

    /**
     * metodo per aggiungere un dipendente
     * @param d dipendente da aggiungere
     */
    public void addDipendente(Dipendente d)
    {
        listaDipendenti.add(d);
        listaDipendentiAggiunti.add(d);
    }

    /**
     * metodo per aggiungere un ufficio
     * @param u ufficio da aggiungere
     */
    public void addUfficio(Ufficio u)
    {
        listaUffici.add(u);
        listaUfficiAggiunti.add(u);
    }
}

class GestioneFile
{
    public static final String FILE_CSV = "file.csv";
    public static final String FILE_TXT = "file.txt";
    private static final String CAMPO_NOME_DIPENDENTE = "nomeDipendente";
    private static final String CAMPO_COGNOME_DIPENDENTE = "cognomeDipendente";
    private static final String CAMPO_DATA_NASCITA_DIPENDENTE = "dataNascitaDipendente";
    private static final String CAMPO_DATA_ASSUNZIONE_DIPENDENTE = "dataAssunzioneDipendente";
    private static final String CAMPO_NUMERO_ORE_SETTIMANALI_DIPENDENTE = "numeroOreLavoroSettimaleDipendente";
    private static final String CAMPO_UFFICIO_REPARTO_DIPENDENTE = "ufficioRepartoDipendente";
    private static final String CAMPO_NOME_REPARTO = "nomeUfficioReparto";
    private static final String CAMPO_PIANO_REPARTO = "pianoUfficioReparto";
    private static final String CAMPO_SIGLA_REPARTO = "siglaLocaleUfficioReparto";
    private static final String CAMPO_NUMERO_POSTAZIONI_REPARTO = "numeroPostazioniUfficioReparto";
    private static final String CAMPO_RESPONSABILE_REPARTO = "nomeResponsabileUfficioReparto";

    /*
     * attributi
     * 
     * D = diependente
     * UR = ufficio reparto
     */
    public int posN_D;
    public int posC_D;
    public int posDN_D;
    public int posDA_D;
    public int posNOS_D;
    public int posUR_D;
    public int posN_UR;
    public int posP_UR;
    public int posS_UR;
    public int posNP_UR;
    public int posNR_UR;

    /**
     * metodo per leggere i dati da un file csv
     * @param g gestore di tutti i dipendenti e di tutti gli uffici
     * @return true se è andato tutto bene --- false se ci sono stati degli errori
     * @throws IOException
     */
    public boolean leggiCSV(GestioneDipendentiUffici g) throws IOException
    {
        //creo un oggetto file
        File file = new File(FILE_CSV);

        //se il file non esiste
        if(!file.exists())
        {
            //ritorno false per far capire che c'è stato un errore nella lettura del file
            return false;
        }

        /*
         * se sono qua il file esiste
         * 
         * apro il file in lettura
         */
        FileReader fr = new FileReader(file);
        BufferedReader br = new BufferedReader(fr);

        //creo una variabile String per contenere le linee del file
        String linea = "";

        //creo una lista di dipendenti
        List<Dipendente> listaDipendenti = new ArrayList<>();
        List<Ufficio> listaUffici = new ArrayList<>();

        /*
         * controllo la prima linea per prendere le posizioni dei vari campi
         * 
         * la linea viene letta nel meotdo
        */
        prendiPosizioneCampiCSV(br);

        //leggo la prima linea dal file
        linea = br.readLine();

        //finchè non ho finito di leggere il file
        while(linea != null)
        {
            /*
             * ogni linea del file corrisponde a un dipendente e al suo ufficio di appartenenza
            */
            //splitto la linea
            String[] campi = linea.split("\t");

            /*
             * per ogni linea creo un dipendente e un ufficio
             *
             * i dipendenti sono sempre diversi e quindi li aggiugno tranquillamente
             * 
             * l'ufficio può essere lo stesso per più dipendenti e quindi devo controllare se l'ho già inserito nella lista
            */
            //creo e aggiungo il dipendente
            listaDipendenti.add(creaDipendente(campi));

            //creo l'ufficio
            Ufficio u = creaUfficio(campi);

            //se l'ufficio non è gia presente nella lista
            if(!listaUffici.contains(u))
            {
                //aggiungo l'ufficio alla lista
                listaUffici.add(u);
            }            

            //leggo la riga successiva
            linea = br.readLine();
        }

        //imposto le liste nel GestoreDipendendiUffici
        g.setListe(listaDipendenti, listaUffici);

        //chiudo il file aperto in lettura
        br.close();

        return true;
    }

    /**
     * metodo per creare un dipendente prendendo i parametri dalla linea del file 
     * @param linea linea del file da cui creare il dipendente
     * @return Dipendente creato con i parametri nella linea del file
     */
    private Dipendente creaDipendente(String[] campi)
    {
        //ritorno il dipendente creato con i parametri presi dalla linea
        return new Dipendente(campi[posN_D], campi[posC_D], campi[posDN_D], campi[posDA_D], campi[posNOS_D], campi[posUR_D]);
    }

    /**
     * metodo per creare un ufficio prendendo i parametro dalla linea del file
     * @param linea linea del file da cui creare l'ufficio
     * @return Ufficio creato con i parametri nella linea del file
     */
    private Ufficio creaUfficio(String[] campi)
    {
        //ritorno l'ufficio creato con i parametri presi dalla linea
        return new Ufficio(campi[posN_UR], campi[posP_UR], campi[posS_UR], campi[posNP_UR], campi[posNR_UR]);
    }

    /**
     * metodo per leggere la prima linea del file CSV e prendere la posizione dei campi dei dipendenti e degli uffici
     * @param br file aperto in lettura da cui leggere la prima linea
     * @throws IOException
     */
    private void prendiPosizioneCampiCSV(BufferedReader br) throws IOException
    {
        //leggo la prima linea
        String linea = br.readLine();

        //divido la linea per il ;
        String[] campi = linea.split("\t");

        /*
         * trovo le posizioni di tutti i campi
         * 
         * scorro il vettore dei campi
        */
        for(int i = 0; i < campi.length; i++)
        {
            if(campi[i].equals(CAMPO_NOME_DIPENDENTE))
            {
                this.posN_D = i;
            }
            else if(campi[i].equals(CAMPO_COGNOME_DIPENDENTE))
            {
                this.posC_D = i;
            }
            else if(campi[i].equals(CAMPO_DATA_NASCITA_DIPENDENTE))
            {
                this.posDN_D = i;
            }
            else if(campi[i].equals(CAMPO_DATA_ASSUNZIONE_DIPENDENTE))
            {
                this.posDA_D = i;
            }
            else if(campi[i].equals(CAMPO_NUMERO_ORE_SETTIMANALI_DIPENDENTE))
            {
                this.posNOS_D = i;
            }
            else if(campi[i].equals(CAMPO_UFFICIO_REPARTO_DIPENDENTE))
            {
                this.posUR_D = i;
            }
            else if(campi[i].equals(CAMPO_NOME_REPARTO))
            {
                this.posN_UR = i;
            }
            else if(campi[i].equals(CAMPO_PIANO_REPARTO))
            {
                this.posP_UR = i;
            }
            else if(campi[i].equals(CAMPO_SIGLA_REPARTO))
            {
                this.posS_UR = i;
            }
            else if(campi[i].equals(CAMPO_NUMERO_POSTAZIONI_REPARTO))
            {
                this.posNP_UR = i;
            }
            else if(campi[i].equals(CAMPO_RESPONSABILE_REPARTO))
            {
                this.posNR_UR = i;
            }
        }
    }

    public void scriviCSV(GestioneDipendentiUffici g) throws IOException
    {
        //apro il file in scrittura
        FileWriter fw = new FileWriter(FILE_CSV);
        BufferedWriter bw = new BufferedWriter(fw);

        //scrivo gli uffici sul file
        //scrivo i dipendenti sul file
    }

    public void scriviTXT(GestioneDipendentiUffici g) throws IOException
    {
        //apro il file in scrittura
        FileWriter fw = new FileWriter(FILE_TXT);
        BufferedWriter bw = new BufferedWriter(fw);

        //scrivo gli uffici sul file
        //scrivo i dipendenti sul file
    }
}