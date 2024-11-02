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


document.addEventListener("DOMContentLoaded", function () {
    // Attende che il DOM sia completamente caricato prima di eseguire la funzione
    const svgEmbed = document.getElementById('svgEmbed');

    svgEmbed.addEventListener('load', function () {
        // Attende che l'elemento SVG sia stato caricato e pronto per essere manipolato
        const svgDoc = svgEmbed.getSVGDocument();

        // Seleziona tutti gli elementi <g> che hanno l'attributo opacity = 1
        let groups = Array.from(svgDoc.querySelectorAll('g[opacity="1"]'));

        // Definisce una costante per la percentuale di elementi da selezionare
        const percentage = 0.2; // 20% degli elementi da selezionare

        // Calcola il numero di elementi da selezionare in base alla percentuale
        const selectionLength = Math.ceil(groups.length * percentage);
        const selectedGroups = []; // Array per memorizzare gli elementi selezionati

        // Seleziona casualmente un numero di elementi pari alla percentuale definita
        for (let i = 0; i < selectionLength; i++) {
            const randomIndex = Math.floor(Math.random() * groups.length); // Ottiene un indice casuale
            selectedGroups.push(groups[randomIndex]); // Aggiunge l'elemento all'array
            groups.splice(randomIndex, 1); // Rimuove l'elemento dall'array groups
        }

        // Funzione per nascondere e mostrare continuamente gli elementi selezionati uno dopo l'altro
        const hideAndShowElements = () => {
            // Nasconde ogni elemento uno alla volta con un ritardo incrementale
            selectedGroups.forEach((group, index) => {
                setTimeout(() => {
                    group.style.opacity = '0'; // Nasconde l'elemento impostando l'opacità a 0
                }, index * 100); // Ritardo per ogni elemento per creare un effetto sequenziale
            });

            // Dopo che tutti gli elementi sono stati nascosti, li fa riapparire uno alla volta
            setTimeout(() => {
                selectedGroups.forEach((group, index) => {
                    setTimeout(() => {
                        group.style.opacity = '1'; // Mostra l'elemento impostando l'opacità a 1
                    }, index * 100); // Ritardo per ogni elemento per creare un effetto sequenziale
                });

                // Riavvia il ciclo dopo che tutti gli elementi sono riapparsi
                setTimeout(hideAndShowElements, selectedGroups.length * 100 + 500);
                // Attende un tempo pari al ritardo necessario per far riapparire tutti gli elementi (selectedGroups.length * 100)
                // più un tempo aggiuntivo di 1000 ms, prima di riavviare la funzione. Questo garantisce che tutti gli elementi
                // siano stati completamente mostrati prima che il ciclo ricominci da capo.
            }, selectedGroups.length * 100 + 500);
            // Attende un tempo pari al ritardo necessario per nascondere tutti gli elementi (selectedGroups.length * 100)
            // più un tempo aggiuntivo di 1000 ms, prima di iniziare a farli riapparire uno ad uno.
        }

        // Avvia il ciclo di nascondi e mostra
        hideAndShowElements();
    });
});
