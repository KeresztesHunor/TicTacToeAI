import { parosTag } from "../../htmlUtils.js";

class MezoView
{
    #mezoElem;

    constructor(szuloElem, index)
    {
        szuloElem.append(parosTag("div"));
        this.#mezoElem = szuloElem.children("div:last-child");
        this.#mezoElem.on("click", () => {
            window.dispatchEvent(new CustomEvent("mezoreKattintottEvent", {
                detail: {
                    index: index
                }
            }));
        });
    }

    mezoTartalmatTorol()
    {
        this.#mezoElem.html("");
    }

    elembeIr(tartalom)
    {
        this.#mezoElem.html(tartalom);
    }
}

export default MezoView;