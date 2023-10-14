import { paratlanTag, parosTag } from "../../htmlUtils.js";
import MezoView from "./MezoView.js";

class JatekTerView
{
    #mezok;

    static x = parosTag("svg", { viewBox: "0 0 4 4", width: "100%", height: "100%" }, [
        paratlanTag("polygon", { points: "0,1 1,0 2,1 3,0 4,1 3,2 4,3 3,4 2,3 1,4 0,3 1,2" })
    ]);

    static o = parosTag("svg", { width: "100%", height: "100%" }, [
        paratlanTag("circle", { cx: "50%", cy: "50%", r: "50%" })
    ]);

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
                    return JatekTerView.x;
                case -1:
                    return JatekTerView.o;
                default:
                    return "";
            }
        })());
    }
}

export default JatekTerView;