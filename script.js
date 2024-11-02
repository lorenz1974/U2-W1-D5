window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;
    const header = document.getElementsByTagName('header')[0]
    const liGetStarted = document.querySelector('#getStarted')
    const aGetStarted = document.querySelector('#getStarted a')

    console.log(liGetStarted)
    console.log(aGetStarted)

    const stayCuriousHeight = parseInt(getComputedStyle(document.getElementById('stayCurious')).height)
    const percentOfStayCurious = .70


    if (scrollPosition > stayCuriousHeight * percentOfStayCurious) {
        header.classList.add('bgWhite')

        liGetStarted.style.background = 'green'
    } else {
        header.classList.remove('bgWhite')
        liGetStarted.style.background = '#191919'
    }

})