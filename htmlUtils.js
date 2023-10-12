export function parosTag(tag, parameterek = {}, tartalom = [])
{
    let txt = "";
    tartalom.forEach(elem => txt += elem);
    return `${paratlanTag(tag, parameterek)}${txt}</${tag}>`;
}

export function dictionaryKiir(dict, callbackMetodus)
{
    let txt = "";
    for (const kulcs in dict)
    {
        txt += callbackMetodus(kulcs, dict[kulcs]);
    }
    return txt;
}

export function paratlanTag(tag, parameterek = {})
{
    return `<${tag}${dictionaryKiir(parameterek, (kulcs, ertek) => ` ${kulcs}="${ertek}"`)}>`;
}