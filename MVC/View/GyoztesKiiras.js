class GyoztesKiiras
{
    #szuloElem;

    constructor(szuloElem)
    {
        this.#szuloElem = szuloElem;
    }

    ujJatek()
    {
        this.#szuloElem.html("");
    }

    gyoztestKiir(gyoztesID)
    {
        this.#szuloElem.html((() => {
            switch (gyoztesID)
            {
                case 1:
                    return "Te nyertél!"
                case -1:
                    return "A gép nyert"
                default:
                    return "Döntetlen"
            }
        })());
    }
}

export default GyoztesKiiras;