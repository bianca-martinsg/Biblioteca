const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
function manejaErros(erro) {
    throw new Error(erro.message);
}

async function checaStatus (arraysURLs) {
    try {
        const arrayStatus = await Promise
            .all(arraysURLs
                .map(async url => {
                    const res = await fetch(url);
                    return res.status; //`${res.status} - ${res.statusText}`;
        }))                                                 
        return arrayStatus;
    }   catch(err) {
        manejaErros(erro);
    }
}

function geraArrayDeURLs(arrayLinks) {
    return arrayLinks
        .map(objetoLink => Object
            .values(objetoLink).join());
}

async function validaURLs(arrayLinks) {
    const links = geraArrayDeURLs(arrayLinks);
    const statusLinks = await checaStatus(links);

    const resultados = arrayLinks.map((objeto, indice) => ({
        ...objeto,
        status: statusLinks[indice]
    }))
    return resultados;
}

module.exports = validaURLs;
