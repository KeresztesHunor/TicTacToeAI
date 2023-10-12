import JatekTerModell from "../Model/JatekterModell.js";
import GyoztesKiiras from "../View/GyoztesKiiras.js";
import JatekTerView from "../View/JatekTerView.js";
import UjJatekView from "../View/UjJatekView.js";

class Controller
{
    #jatekTerModell;
    #jatekTerView;
    #gyoztesKiirasView;
    #ujJatekView;

    constructor()
    {
        this.#jatekTerModell = new JatekTerModell();
        this.#jatekTerView = new JatekTerView($("#jatek-ter"));
        this.#gyoztesKiirasView = new GyoztesKiiras($("#gyoztes-kiiras"));
        this.#ujJatekView = new UjJatekView($("#uj-jatek"));
        $(window).on("mezoreKattintottEvent", event => {
            this.#jatekTerModell.mezonekErteketAd(event.detail.index);
            this.#jatekTerView.mezobeIr(event.detail.index, this.#jatekTerModell.getMezoErtek(event.detail.index));
        });
        $(window).on("gepLepettEvent", event => {
            this.#jatekTerView.mezobeIr(event.detail.mezoIndex, this.#jatekTerModell.getMezoErtek(event.detail.mezoIndex));
        });
        $(window).on("ujJatekEvent", () => {
            if (this.#jatekTerModell.jatekosVanSoron)
            {
                this.#ujJatek();
            }
        });
        $(window).on("jatekVegeEvent", event => {
            this.#gyoztesKiirasView.gyoztestKiir(event.detail.gyoztesID);
        });
        this.#ujJatek();
    }

    #ujJatek()
    {
        this.#jatekTerModell.ujJatek();
        this.#jatekTerView.ujJatek();
        this.#gyoztesKiirasView.ujJatek();
    }
}

export default Controller;