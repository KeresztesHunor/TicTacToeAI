class JatekTerModell
{
    #jatekosVanSoron;
    #lepesSzam;
    #vege;
    #mezok;

    static gyoztesMezoIndexKombinaciok = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    constructor()
    {
        this.ujJatek();
    }

    get jatekosVanSoron()
    {
        return this.#jatekosVanSoron;
    }

    getMezoErtek(mezoIndex)
    {
        return this.#mezok[mezoIndex];
    }

    ujJatek()
    {
        this.#jatekosVanSoron = true;
        this.#lepesSzam = 0;
        this.#vege = false;
        this.#mezok = [];
        for (let i = 0; i < 9; i++)
        {
            this.#mezok[i] = 0;
        }
    }

    mezonekErteketAd(mezoIndex)
    {
        if (!this.#vege && this.#jatekosVanSoron && this.#mezok[mezoIndex] === 0)
        {
            this.#mezok[mezoIndex] = 1;
            this.#jatekosVanSoron = false;
            this.#gyoztestKeres(1);
            if (++this.#lepesSzam >= 9)
            {
                this.#jatekVege(0);
            }
            if (!this.#vege)
            {
                setTimeout(() => {
                    const GEP_LEPES_MEZO_INDEX = this.#gepLepes();
                    this.#mezok[GEP_LEPES_MEZO_INDEX] = -1;
                    this.#lepesSzam++;
                    window.dispatchEvent(new CustomEvent("gepLepettEvent", {
                        detail: {
                            mezoIndex: GEP_LEPES_MEZO_INDEX
                        }
                    }));
                    this.#jatekosVanSoron = true;
                    this.#gyoztestKeres(-1);
                }, 1000);
            }
            else
            {
                this.#jatekosVanSoron = true;
            }
        }
    }

    #gepLepes()
    {
        let gepLepesMezoIndex = this.#gepLepesMezoIndex(-1);
        if (gepLepesMezoIndex === -1)
        {
            gepLepesMezoIndex = this.#gepLepesMezoIndex(1);
            if (gepLepesMezoIndex === -1)
            {
                const URES_MEZO_INDEXEK = [];
                this.#mezok.forEach((mezo, index) => {
                    if (mezo === 0)
                    {
                        URES_MEZO_INDEXEK.push(index);
                    }
                });
                gepLepesMezoIndex = URES_MEZO_INDEXEK[Math.floor(Math.random() * URES_MEZO_INDEXEK.length)];
            }
        }
        return gepLepesMezoIndex;
    }

    #gepLepesMezoIndex(jatekosID)
    {
        let gepLepesMezoIndex = -1;
        let i = 0;
        while (i < JatekTerModell.gyoztesMezoIndexKombinaciok.length && gepLepesMezoIndex === -1)
        {
            gepLepesMezoIndex = this.#uresMezotKeres(jatekosID, JatekTerModell.gyoztesMezoIndexKombinaciok[i++]);
        }
        return gepLepesMezoIndex
    }

    #uresMezotKeres(jatekosID, mezoIndexek)
    {
        let gepLepesMezoIndex = -1;
        let uresMezokSzama = 0;
        let foglaltMezokSzama = 0;
        let i = 0;
        while (i < 3 && uresMezokSzama <= 1 && foglaltMezokSzama <= 2)
        {
            const MEZO_INDEX = mezoIndexek[i++];
            const MEZO_ERTEK = this.#mezok[MEZO_INDEX];
            if (MEZO_ERTEK === jatekosID)
            {
                foglaltMezokSzama++;
            }
            else if (MEZO_ERTEK === 0)
            {
                uresMezokSzama++;
                gepLepesMezoIndex = MEZO_INDEX;
            }
        }
        return uresMezokSzama === 1 && foglaltMezokSzama === 2 ? gepLepesMezoIndex : -1;
    }

    #gyoztestKeres(keresettID)
    {
        if (this.#nyertE(keresettID))
        {
            this.#jatekVege(keresettID);
        }
    }

    #nyertE(keresettID)
    {
        let i = 0;
        while (i < JatekTerModell.gyoztesMezoIndexKombinaciok.length && !this.#gyoztesSortKeres(JatekTerModell.gyoztesMezoIndexKombinaciok[i], keresettID))
        {
            i++;
        }
        return i < JatekTerModell.gyoztesMezoIndexKombinaciok.length;
    }

    #gyoztesSortKeres(gyoztesSorIndexek, keresettID)
    {
        let i = 0;
        while (i < 3 && this.#mezok[gyoztesSorIndexek[i]] === keresettID)
        {
            i++;
        }
        return i >= gyoztesSorIndexek.length;
    }

    #jatekVege(gyoztesID)
    {
        this.#vege = true;
        window.dispatchEvent(new CustomEvent("jatekVegeEvent", {
            detail: {
                gyoztesID: gyoztesID
            }
        }));
    }
}

export default JatekTerModell;