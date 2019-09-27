import 'bootstrap/dist/css/bootstrap.css'
document.getElementById("container").style.textAlign = "center";

fetchAll();
document.getElementById("getperson").onclick = fetchPerson;
document.getElementById("addperson").onclick = addPerson;
document.getElementById("editperson").onclick = editPerson;
document.getElementById("deleteperson").onclick = deletePerson;

function fetchAll()
{
    fetch('https://salandt.dk/WednesdayExercise/api/person/all')
    .then(handleHttpErrors)
    .then(data => {

        var columns = data.map(person => "<tr><td>" + person.id + "</td><td>" + person.firstname 
        + "</td><td>" + person.lastname + "</td><td>" + person.phone + "</td></tr>");

        var columnsString = columns.join("\n");

    document.getElementById("tablebody").innerHTML = columnsString;
    }).catch(err => {
        if(err.status)
        err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
        else document.getElementById("error").innerHTML = "Network error";
    });  
}

function fetchPerson()
{
    var ID = document.getElementById("ID").value;
    if(ID === "") ID = 0;
    fetch('https://salandt.dk/WednesdayExercise/api/person/' + ID)
    .then(handleHttpErrors)
    .then(data => {
        var person = "<tr><td>" + data.id + "</td><td>" + data.firstname 
        + "</td><td>" + data.lastname + "</td><td>" + data.phone + "</td></tr>"

    document.getElementById("tablebody").innerHTML = person;

    }).catch(err => { console.log(err)
        if(err.status)
        err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
        else document.getElementById("error").innerHTML = "Network error";
    });
}

function addPerson() 
{
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var phoneNumber = document.getElementById("phone").value;
 

    const data = {firstname: firstName, lastname: lastName, phone: phoneNumber};
    const options = makeOptions("POST",data);
    fetch("https://salandt.dk/WednesdayExercise/api/person/",options)
    .then(handleHttpErrors)
    .then(fetchAll)
    .catch(err => {
        if(err.status)
        err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
        else document.getElementById("error").innerHTML = "Network error";
    });
}

function editPerson() 
{
    var ID = document.getElementById("id").value;
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var phoneNumber = document.getElementById("phone").value;

    const data = {firstname: firstName, lastname: lastName, phone: phoneNumber};
    const options = makeOptions("PUT",data);
    fetch("https://salandt.dk/WednesdayExercise/api/person/" + ID,options)
    .then(handleHttpErrors)
    .then(fetchAll)
    .catch(err => {
        if(err.status)
        err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
        else document.getElementById("error").innerHTML = "Network error";
    });
}

function deletePerson() 
{
    var ID = document.getElementById("id").value;
    const options = makeOptions("DELETE");
    fetch("https://salandt.dk/WednesdayExercise/api/person/" + ID,options)
    .then(handleHttpErrors)
    .then(fetchAll)
    .catch(err => {
        if(err.status)
        err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
        else document.getElementById("error").innerHTML = "Network error";
    });
}

function handleHttpErrors(res)
{
    if(!res.ok)
    return Promise.reject({status: res.status, fullError: res.json() });
    return res.json();
}

function makeOptions(method, body) 
{
    var opts =  {
    method: method,
    headers: {"Content-type": "application/json"}
    }
    if(body) opts.body = JSON.stringify(body);
    return opts;
}




