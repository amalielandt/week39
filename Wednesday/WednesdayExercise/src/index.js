import 'bootstrap/dist/css/bootstrap.css'

document.getElementById("btn").onclick = fetchQuote;

document.getElementById("North").onclick = heartDir;

document.getElementById("South").onclick = heartDir;

document.getElementById("East").onclick = heartDir;

document.getElementById("West").onclick = heartDir;

function heartDir()
{
    document.getElementById("heart").innerHTML = event.currentTarget.id;
}

setInterval(fetchQuote, 3600000);

function fetchQuote()
{
    fetch('https://studypoints.info/jokes/api/jokes/period/hour')
    .then(res => res.json())
    .then(data => {
        document.getElementById("quote").innerHTML = "Quote " + data.id
        + ": " + data.joke
        + " -  " + data.reference;;
    });
    
}









