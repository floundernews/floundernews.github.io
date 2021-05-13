const seed = Math.floor(new Date().getTime()/86400000);

function generateText(phraseLocation, elemID, category, format) {
    let rng = new Math.seedrandom(seed);

    fetch(phraseLocation).then(resp => resp.json()).then(phrases => {
        function resolve(category) {
            let phrase = phrases[category][Math.floor(rng()*phrases[category].length)];
            return phrase.replace(/<(.*?)>/g, (match, capture) => resolve(capture));
        }

        let result = resolve(category);
        if (format) result = result.charAt(0).toUpperCase() + result.slice(1) + '.';

        document.getElementById(elemID).innerHTML = result;
    });
}

function generateNumber(lowerBound, upperBound, idx) {
    let rng = new Math.seedrandom(seed);
    for (i=0; i<idx; i++) rng();
    return Math.floor(rng()*(upperBound-lowerBound))+lowerBound
}
