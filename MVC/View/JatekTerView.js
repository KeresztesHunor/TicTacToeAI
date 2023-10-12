import MezoView from "./MezoView.js";

class JatekTerView
{
    #mezok;

    constructor(szuloElem)
    {
        this.#mezok = [];
        for (let i = 0; i < 9; i++)
        {
            this.#mezok[i] = new MezoView(szuloElem, i);
        }
    }

    ujJatek()
    {
        this.#mezok.forEach(mezo => {
            mezo.mezoTartalmatTorol();
        });
    }

    mezobeIr(mezoIndex, mezoErtek)
    {
        this.#mezok[mezoIndex].elembeIr((() => {
            switch (mezoErtek)
            {
                case 1:
                    return "X";
                case -1:
                    return "O"
                default:
                    return "";
            }
        })());
    }
}

export default JatekTerView;