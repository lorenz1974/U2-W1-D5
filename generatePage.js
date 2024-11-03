
// ***********************************************************************
//
// FUNCTIONS DEFINITIONS
//
// ***********************************************************************
//

// Creo questa funzione perché scrivere tutte le volte 'console.log()' è una palla!
// uso la lettera 'w', che sta anche per 'write', perché è poco usata negli esercizi
const w = (param, param1) => {
    param1 ? console.log(`${param}`, param1) : console.log(param)
}


// Funzione per mostrare i valori di un array
// Spacchetto l'array così non mi frega più il consol.log dell'altra volta che non mi mostrava i valori
// in tempo reale ma solo al momento della valutazione dell'array alla pressione del |> per espanderlo
const showObjectValues = (objName, obj, keyLength = 20, valueLength = 60) => {
    const truncate = (str, len) => (str.length > len ? str.substring(0, len - 3) + '...' : str)

    console.log(`+${'-'.repeat(keyLength + valueLength + 5)}+`)
    console.log(`| ${objName.padEnd(keyLength + valueLength + 3)} |`)
    console.log(`+${'-'.repeat(keyLength + valueLength + 5)}+`)
    console.log(`| ${'Key'.padEnd(keyLength)} | ${'Value'.padEnd(valueLength)} |`)
    console.log(`+${'-'.repeat(keyLength + valueLength + 5)}+`)

    for (let key in obj) {
        console.log(`| ${truncate(key, keyLength).padEnd(keyLength)} | ${truncate(String(obj[key]), valueLength).padEnd(valueLength)} |`)
    }
    console.log(`+${'-'.repeat(keyLength + valueLength + 5)}+`)
    console.log('')
}


// Funzione che ripulisce l'innerHTML da eventuali caratteri speciali che possono far casino
function escapeHTML(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

// Funzione che minimizza l'HTML rimuovendo spazi e righe vuote
// A che serve?! Non lo so ma mi piaceva la cosa e l'ho messa! :D
const minifyHTML = (html) => {
    return html
        .replace(/\r\n/g, '') // Rimuove le righe vuote1
        .replace(/\n/g, '') // Rimuove le righe vuote2
        .replace(/\t/g, '') // Rimuove i tab
        .replace(/\s\s+/g, ' ') // Spazi multipli diventano uno solo
        .replace(/>\s+</g, '><') // Leva gli spacchi tra i tag
        .replace(/<!--.*?-->/g, '') // Rimuove i commenti
}

// La funzione restituisce una stringa formata da un numero preceduto da zeri
// in modo che la lunghezza totale della stringa sia pari a size
const pad = (num, size) => {
    var s = "000000000" + num
    return s.slice(- size)
}

// Funzione che restituisce l'HTML in base al template e ai dati passati
// Questa funzione è stata creata per generare l'HTML degli articoli ed eventualmente
// di altri elementi che potrebbero essere aggiunti in futuro
const getHTMLFromTemplate = (template, data, minify = true,) => {

    // Genera componenti dell'HTML non direttamente presenti nell'array dei dati.
    // li inserisce direttamente nll'array per poter essere utilizzati nel template
    // HTML finale

    // Il link sotto il noem dell'autore
    data.authorLinkHTML =
        data.authorLink !== ''
            ? '<a href="' + data.authorLink + '">' + escapeHTML(data.author) + '</a>'
            : '<a href="https://lucky.surf/' + escapeHTML(data.author) + ' +site:medium.com">' + escapeHTML(data.author) + '</a>'

    // Il link sotto la categoria dedegli articoli in evidenza
    data.inPublicationHTML =
        data.inPublication !== ''
            ? '<p>in</p> <p><a href="https://medium.com/tag/' + escapeHTML(data.inPublication).replace(/ /g, '-').toLowerCase() + '">' + escapeHTML(data.inPublication) + '</a></p>'
            : ''

    // Il link sotto al titolo dell'articolo
    data.titleLinkHTML =
        data.titleLink !== ''
            ? '<a href="' + data.titleLink + '">' + data.title + '</a>'
            : '<a href="https://lucky.surf/' + escapeHTML(data.author) + ' ' + escapeHTML(data.title) + ' +site:medium.com">' + escapeHTML(data.title) + '</a>'


    // Il link sotto la categoria dell'articolo
    data.categoryLinkHTML =
        '<a href="https://medium.com/tag/' + escapeHTML(data.category).replace(/ /g, '-').toLowerCase() + '">' +
        escapeHTML(data.category) + '</a>'


    // Vedo che cosa c'è dentro l'oggetto strano...
    debug ? showObjectValues('getHTMLFromTemplate', data) : {}

    let html = ''
    switch (template) {
        case 'trendingNewsCards': {

            //
            // Inserita anche la funzione "Mi sento fortunato" de' noantri usando il "Feeling LUcky"
            // di Google. Se l'utente clicca sul titolo dell'articolo, verrà reindirizzato alla
            // pagina più probabile in base all'autore e al titolo su Medium.com
            //
            // RISULTATO: NON NE PRENDE UNAAAAA!!! :D :D :D
            // Mah! Forse un paio! :D
            //
            // Sostituito google con https://lucky.surf/
            // Quando quelli che non conosce nessuno dunzionano assai meglio di quelli che conoscono tutti!!!!
            // HAPPINESSSSSSS!!!! :D :D :D
            //

            html = `
            <!-------------------------------------------------------------------->
            <!-- START CARD ${pad(data.order, 2)} -->
            <!-------------------------------------------------------------------->
            <article class="trendingCard">
                <div class="trendingCardNumber">${pad(data.order, 2)}</div>
                <div class="trendingCardText">
                    <div class="trendingCardAuthor">
                        <img class="${data.authorImgShape}Icon"
                            src="${data.authorImgSrc}"
                            alt="Image for author ${escapeHTML(data.author)}">
                        <p>${data.authorLinkHTML}</p>
                            ${data.inPublicationHTML}
                        </div>
                    <div class="trendingCardTitle">
                        <h3>${data.titleLinkHTML}</h3>
                    </div>
                    <div class="trendingCardMeta">
                        <div>${escapeHTML(data.date)}</div>
                        <div>${escapeHTML(data.readTime)}</div>
                        ${data.star ? '<img src="/assets/imgs/svg/star.svg" alt="Star">' : ''}
                    </div>
                </div>
            </article>
            <!-------------------------------------------------------------------->
            <!-- END CARD ${pad(data.order, 2)} -->
            <!-------------------------------------------------------------------->
            `
            break
        }

        case 'firstColumn': {

            html = `
            <!-------------------------------------------------------------------->
            <!-- START ARTICLE ${pad(data.order, 2)} -->
            <!-------------------------------------------------------------------->
            <article class="firstColumnArticle">
                <div class="firstColumnArticleText">
                    <div class="trendingCardAuthor">
                        <img class="${data.authorImgShape}Icon"
                            src="${data.authorImgSrc}"
                            alt="Image for author ${escapeHTML(data.author)}">
                        <p>${data.authorLinkHTML}</p>
                    </div>
                    <div class="firstColumnArticleTitle">
                        <h3>${data.titleLinkHTML}</h3>
                    </div>
                    <div class="firstColumnArticleExcerpt">
                        <p>${escapeHTML(data.excerpt)}</p>
                    </div>
                    <div class="firstColumnArticleMetaAndBookmark">
                        <div class="firstColumnArticleMeta">
                            <div>${escapeHTML(data.date)}</div>
                            <div>${escapeHTML(data.readTime)}</div>
                            <div>
                                ${data.categoryLinkHTML}
                            </div>
                            ${data.star ? '<img src="/assets/imgs/svg/star.svg" alt="Star">' : ''}
                        </div>
                        <div class="firstColumnArticleBookmark">
                            <img src="/assets/imgs/svg/bookmark.svg" alt="Bookmark">
                        </div>
                    </div>
                </div>
                <div class="firstColumnArticleImage">
                    <img src="${data.imgSrc}" alt="Image for: ${escapeHTML(data.title)}">
                </div>
            </article>
            <!-------------------------------------------------------------------->
            <!-- END ARTICLE ${pad(data.order, 2)} -->
            <!-------------------------------------------------------------------->
            `
            break
        }

        default:
            console.warn(`getHTMLFromTemplate - Template "${template}" non riconosciuto`)
            break
    }

    // Vedo l'html prima della minificazione
    debug ? console.log('getHTMLFromTemplate html:\r\n ', html) : {}

    html = minify ? minifyHTML(html) : html // Minifica l'HTML se minify è true
    return html // Restituisce l'HTML generato alla fine della funzione
}


// Questo è il contenuto che verrà utilizzato per creare le navbar e gli articoli
const createPageElements = (contents) => {
    // Inizializza l'array per raggruppare i contenuti per navbar
    const groupedByParent = {}

    contents.forEach((item) => {
        if (!groupedByParent[item.parentId]) {
            groupedByParent[item.parentId] = []
        }
        // Aggiunge l'elemento all'array raggruppato, in questo modo i contenuti sono raggruppati
        // sotto la stessa chiave che ha lo stesso nome dell'ID del parente di riferimento
        groupedByParent[item.parentId].push(item)
    })

    // Creo la navBar vera e proprio concatenando una serie di metodi
    // Comincio eseguendo un loop sulle chiavi dell'oggetto raggruppato
    Object.entries(groupedByParent)
        .forEach(([parentId, childItems]) => {

            // Vedo chi è il padre
            debug ? console.log('createPageElements - parentId: ', parentId) : {}

            // Filtra gli elementi specificamente con type === 'nav'
            // e costruisce le navbar solo con questi elementi
            debug ? console.log('createPageElements - pgenerate navBars') : {}

            const navItems = childItems.filter((item) => item.type === 'nav')

            // Vedo che cosa c'è dentro l'oggetto strano...
            debug ? showObjectValues('navItems', navItems) : {}

            if (navItems.length !== 0) {
                // Verifico se esiste un elemento con l'ID della navbar
                const navParent = document.getElementById(parentId)
                if (navParent) {
                    // Se esiste, chiamo la funzione per creare la navbar
                    // partendo dallelemento 'ul'
                    const ulElement = document.createElement("ul")
                    // Ordino gli elementi in base alla chiave 'order'
                    // Poi eseguo il loop per tutti gli elementi oramai ordinati
                    navItems
                        .sort((a, b) => a.order - b.order)
                        .forEach((item, index) => {

                            // Vedo che cosa c'è dentro l'oggetto strano...
                            debug ? console.log('createPageElements - navItems index: ', index) : {}
                            debug ? showObjectValues('item', item) : {}

                            // Sostanzialmente verifico che ci siano le proprietà altrimenti non le aggiungo
                            const liElement = document.createElement("li")
                            const aElement = document.createElement("a")
                            aElement.href = item.itemLink || '#'
                            aElement.textContent = item.itemTitle

                            if (item.itemLinkClass) aElement.classList.add(item.itemLinkClass)
                            if (item.itemLinkId) aElement.id = item.itemLinkId
                            if (item.itemClass) liElement.classList.add(item.itemClass)
                            if (item.itemId) liElement.id = item.itemId

                            liElement.appendChild(aElement)
                            ulElement.appendChild(liElement)
                        })

                    // Attacca la navbar al padre
                    navParent.appendChild(ulElement)
                }

            }


            // Filtra gli elementi per 'article' e costruisce gli articoli
            debug ? console.log('createPageElements - generate articles') : {}

            const articleItems = childItems.filter((item) => item.type === 'article')

            // Vedo che cosa c'è dentro l'oggetto strano...
            debug ? showObjectValues('articleItems', articleItems) : {}

            if (articleItems.length !== 0) {
                // Verifico se esiste un elemento con l'ID della navbar
                const articlesParent = document.getElementById(parentId)
                if (articlesParent) {
                    // Ordino gli elementi in base alla chiave 'order'
                    // Poi eseguo il loop per tutti gli elementi oramai ordinati
                    let articlesHTML = ''
                    articleItems
                        .sort((a, b) => a.order - b.order)
                        .forEach((item, index) => {

                            // Vedo che cosa c'è dentro l'oggetto strano...
                            debug ? console.log('createPageElements - articleItems index: ', index) : {}
                            debug ? showObjectValues('item', item) : {}

                            // Crea l'HTML del singolo articolo e lo aggiunge a quello esistente
                            articlesHTML += getHTMLFromTemplate(parentId, item)
                        })

                    // Finito il ciclo lo attacca al parente
                    articlesParent.innerHTML = articlesHTML
                }
            }
        })
}

//
// ***********************************************************************
//
// VARIABLE DEFINITIONS
//
// ***********************************************************************
//

// A true abilita la visualizzazione dei log di debug
// (Andrebbe anche inserito un livello di debig perché altrimenti diventa
// decisamente troppo verboso...)
const debug = false

// ***********************************************************************


//
// ***********************************************************************
//
// MAIN ROUTINE
//
// ***********************************************************************
//

document.addEventListener("DOMContentLoaded", () => {
    // Genera i contenuti dinamici della pagina basandosi su CONTENTS
    // che è un array di dati e impostazioni per i contenuti della pagina

    createPageElements(CONTENTS);


    // EventListener per lo scroll della pagina
    // Uso una percenttuale del 70% dell'altezza della sezione 'Stay Curious'
    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        const header = document.getElementsByTagName('header')[0]
        const liGetStarted = document.querySelector('#getStarted')

        const stayCuriousHeight = parseInt(getComputedStyle(document.getElementById('sectionStayCurious')).height)
        const percentOfStayCurious = .70

        if (scrollPosition > stayCuriousHeight * percentOfStayCurious) {
            header.classList.add('bgWhite')

            liGetStarted.style.background = 'green'
        } else {
            header.classList.remove('bgWhite')
            liGetStarted.style.background = '#191919'
        }
    })

});
