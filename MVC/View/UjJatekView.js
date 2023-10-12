import { parosTag } from "../../htmlUtils.js";

class UjJatekView
{
    constructor(szuloElem)
    {
        szuloElem.html(parosTag("button", {}, ["Új játék"]));
        szuloElem.children("button").on("click", () => {
            window.dispatchEvent(new CustomEvent("ujJatekEvent"));
        });
    }
}

export default UjJatekView;