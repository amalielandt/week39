import 'bootstrap/dist/css/bootstrap.css'
document.getElementById("container").style.textAlign = "center";

document.getElementById("svg2").onclick = fetchCountry;


function fetchProxy()
{

    var ID = event.target.id;
    console.log(ID);
    document.getElementById(ID).style.fill = "red";

    if(ID === "svg2")
    {
        document.getElementById("info").innerHTML = "This is the ocean";
    }
    else{
    if(ID.startsWith("ru")) ID = "ru";
    if(ID.startsWith("gb")) ID = "gb";

    fetch('http://localhost:8080/FridayExerciseProxy/api/proxy/' + ID)
    .then(handleHttpErrors)
    .then(data => {
   
        var country = data.map(country => "Country: " + country.name + "<br>" 
        + "Population: " + country.population + "<br>" +
        "Area: " + country.area + "<br>" + "Borders: " + country.borders.join(", "));
        
        document.getElementById("info").innerHTML = country.join("");
        

    }).catch(err => { console.log(err)
        if(err.status)
        err.fullError.then(e => console.log(e.message));
        else console.log("Network error");
    });

}
}
function fetchCountry()
{
    var ID = event.target.id;
    console.log(ID);
    document.getElementById(ID).style.fill = "red";

    if(ID === "svg2")
    {
        document.getElementById("info").innerHTML = "This is the ocean";
    }
    else{
    if(ID.startsWith("ru")) ID = "ru";
    if(ID.startsWith("gb")) ID = "gb";
    fetch('http://restcountries.eu/rest/v1/alpha?codes=' + ID)
    .then(handleHttpErrors)
    .then(data => {
   
        var country = data.map(country => "Country: " + country.name + "<br>" 
        + "Population: " + country.population + "<br>" +
        "Area: " + country.area + "<br>" + "Borders: " + country.borders.join(", "));
        
        document.getElementById("info").innerHTML = country.join("");
        

    }).catch(err => { console.log(err)
        if(err.status)
        err.fullError.then(e => console.log(e.message));
        else console.log("Network error");
    });
}
}

function handleHttpErrors(res)
{
    if(!res.ok)
    return Promise.reject({status: res.status, fullError: res.json() });
    return res.json();
}


