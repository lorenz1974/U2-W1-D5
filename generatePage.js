
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

// Funzione che ripulisce l'innerHTML da eventuali caratteri speciali che possono far casino
function escapeHTML(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

// La funzione restituisce una stringa formata da un numero preceduto da zeri
// in modo che la lunghezza totale della stringa sia pari a size
const pad = (num, size) => {
    var s = "000000000" + num;
    return s.slice(- size);
}

// Funzione che restituisce l'HTML in base al template e ai dati passati
// Questa funzione è stata creata per generare l'HTML degli articoli ed eventualmente
// di altri elementi che potrebbero essere aggiunti in futuro
const getHTMLFromTemplate = (template, data) => {
    let html = '';
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
                        <p>

                        ${data.authorLink !== ''
                    ? '<a href="' + data.authorLink + '">' + escapeHTML(data.author) + '</a>'
                    : '<a href="//www.google.com/search?q=' + escapeHTML(data.author) + ' +site:medium.com&btnI=1">' + escapeHTML(data.author) + '</a>'
                }

                        </p>
                        ${data.inPublication ? `<p>in</p> <p><a href="https://medium.com/${escapeHTML(data.inPublication).replace(' ', '-').toLowerCase()}">${escapeHTML(data.inPublication)}</a></p>` : ''}
                    </div>
                    <div class="trendingCardTitle">
                        <h3>

                        ${data.titleLink !== ''
                    ? '<a href="' + data.titleLink + '">' + data.title + '</a>'
                    : '<a href="//www.google.com/search?q=' + escapeHTML(data.author) + ' ' + escapeHTML(data.title) + ' +site:medium.com&btnI=1">' + escapeHTML(data.title) + '</a>'
                }

                        </h3>
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
            `;
            break;
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
                        <p>

                        ${data.authorLink !== ''
                    ? '<a href="' + data.authorLink + '">' + escapeHTML(data.author) + '</a>'
                    : '<a href="//www.google.com/search?q=' + escapeHTML(data.author) + ' +site:medium.com&btnI=1">' + escapeHTML(data.author) + '</a>'
                }
                        </p>
                    </div>
                    <div class="firstColumnArticleTitle">
                        <h3>

                    ${data.titleLink !== ''
                    ? '<a href="' + data.titleLink + '">' + data.title + '</a>'
                    : '<a href="//www.google.com/search?q=' + escapeHTML(data.author) + ' ' + escapeHTML(data.title) + ' +site:medium.com&btnI=1">' + escapeHTML(data.title) + '</a>'
                }

                        </h3>
                    </div>
                    <div class="firstColumnArticleExcerpt">
                        <p>${escapeHTML(data.excerpt)}</p>
                    </div>
                    <div class="firstColumnArticleMetaAndBookmark">
                        <div class="firstColumnArticleMeta">
                            <div>${escapeHTML(data.date)}</div>
                            <div>${escapeHTML(data.readTime)}</div>
                            <div>
                                <a href="https://medium.com/${escapeHTML(data.category).replace(' ', '-').toLowerCase()}">
                                    ${escapeHTML(data.category)}
                                </a>
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
            `;
            break;
        }

        default:
            console.warn(`Template "${template}" non riconosciuto`);
            break;
    }

    console.log(html);
    return html; // Restituisce l'HTML generato alla fine della funzione
};


// Questo è il contenuto che verrà utilizzato per creare le navbar e gli articoli
const createPageElements = (contents) => {
    // Inizializza l'array per raggruppare i contenuti per navbar
    const groupedByParent = {};

    contents.forEach((item) => {
        if (!groupedByParent[item.parentId]) {
            groupedByParent[item.parentId] = [];
        }
        // Aggiunge l'elemento all'array raggruppato, in questo modo i contenuti sono raggruppati
        // sotto la stessa chiave che ha lo stesso nome dell'ID del parente di riferimento
        groupedByParent[item.parentId].push(item);
    });

    // Creo la navBar vera e proprio concatenando una serie di metodi
    // Comincio eseguendo un loop sulle chiavi dell'oggetto raggruppato
    Object.entries(groupedByParent)
        .forEach(([parentId, childItems]) => {

            console.log('parentId: ', parentId);

            // Filtra gli elementi specificamente con type === 'nav'
            // e costruisce le navbar solo con questi elementi
            console.log('generate navBars')

            const navItems = childItems.filter((item) => item.type === 'nav');

            if (navItems.length !== 0) {
                // Verifico se esiste un elemento con l'ID della navbar
                const navParent = document.getElementById(parentId);
                if (navParent) {
                    // Se esiste, chiamo la funzione per creare la navbar
                    // partendo dallelemento 'ul'
                    const ulElement = document.createElement("ul");
                    // Ordino gli elementi in base alla chiave 'order'
                    // Poi eseguo il loop per tutti gli elementi oramai ordinati
                    navItems
                        .sort((a, b) => a.order - b.order)
                        .forEach((item) => {
                            // Sostanzialmente verifico che ci siano le proprietà altrimenti non le aggiungo
                            const liElement = document.createElement("li");
                            const aElement = document.createElement("a");
                            aElement.href = item.itemLink || '#';
                            aElement.textContent = item.itemTitle;

                            if (item.itemLinkClass) aElement.classList.add(item.itemLinkClass);
                            if (item.itemLinkId) aElement.id = item.itemLinkId;
                            if (item.itemClass) liElement.classList.add(item.itemClass);
                            if (item.itemId) liElement.id = item.itemId;

                            liElement.appendChild(aElement);
                            ulElement.appendChild(liElement);
                        });

                    // Attacca la navbar al padre
                    navParent.appendChild(ulElement);
                }

            }
            // Qua dovrò attaccare la parte di codice per costruire gli articoli
            // in base al parentId e al template ad esso assosciato

            // Filtra gli elementi per 'article' e costruisce gli articoli
            console.log('generate articles')
            const articleItems = childItems.filter((item) => item.type === 'article');

            if (articleItems.length !== 0) {
                // Verifico se esiste un elemento con l'ID della navbar
                const articlesParent = document.getElementById(parentId);
                if (articlesParent) {
                    // Ordino gli elementi in base alla chiave 'order'
                    // Poi eseguo il loop per tutti gli elementi oramai ordinati
                    let articlesHTML = '';
                    articleItems
                        .sort((a, b) => a.order - b.order)
                        .forEach((item) => {
                            // Crea l'HTML del singolo articolo e lo aggiunge a quello esistente
                            articlesHTML += getHTMLFromTemplate(parentId, item);
                        });

                    // Finito il ciclo lo attacca al parente
                    articlesParent.innerHTML = articlesHTML;
                }
            }
        });
};

//
// ***********************************************************************
//
// VARIABLE DEFINITIONS
//
// ***********************************************************************
//

// Al momento non ce ne sono, ma se ce ne saranno le metterò qui

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
