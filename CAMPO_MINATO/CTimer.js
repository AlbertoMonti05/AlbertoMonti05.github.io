class CTimer
{
    constructor()
    {
        this.time = 0;
    }

    setTime(x)
    {
        this.time = x;
    }

    getTime()
    {
        return this.time;
    }

    /*
    checkTime(i)
    {
        //0 - 1 - 2 - 3 - 4 - 5 - 6 - 7 - 8 - 9
        if(i < 10)
        {
            //00 - 01 - 02 - 03 - 04 - 05 - 06 - 07 - 08 - 09
            i = "0" + i;
        }

        return i;
    }
    */

    whatTimeIsIt()
    {
        this.time--;

        return this.time;
    }
}
