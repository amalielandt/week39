import 'bootstrap/dist/css/bootstrap.css'
import jokes from "./jokes";

//const allJokes = jokes.getJokes().map(joke => "<li>"+joke+"</li>");
//document.getElementById("jokes").innerHTML = allJokes.join("");

document.getElementById("getJoke").onclick = getJoke;
document.getElementById("addJoke").onclick = addJoke;

function getJoke()
{
    var jokeId = document.getElementById("jokeId").value;
    var joke = jokes.getJokeById(jokeId);
    if(joke === undefined) joke = "No jokes for you";
    document.getElementById("jokes").innerHTML = joke;
}

function addJoke()
{
    var joke = document.getElementById("newJoke").value;
    if(joke === "") joke = document.getElementById("jokes").innerHTML = "Cant come up with any good jokes?";

    else jokes.addJoke(joke) 
    document.getElementById("newJoke").value = "";
    document.getElementById("jokes").innerHTML = joke;
}