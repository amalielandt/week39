import 'bootstrap/dist/css/bootstrap.css'
document.getElementById("container").style.textAlign = "center";

fetchAll();

document.getElementById("getperson").onclick = fetchPerson;
document.getElementById("addperson").onclick = addPerson;
document.getElementById("editperson").onclick = editPerson;
document.getElementById("deleteperson").onclick = deletePerson;

function fetchAll()
{
    fetch('http://localhost:8080/ThursdayExercise/api/person/all')
    .then(res => res.json())
    .then(data => {

        var columns = data.map(person => "<tr><td>" + person.name + "</td></tr>");

        var columnsString = columns.join("\n");

    document.getElementById("tablebody").innerHTML = columnsString;
    });  
}

function fetchPerson()
{
    var name = document.getElementById("name").value;
    fetch('http://localhost:8080/ThursdayExercise/api/person/' + name)
    .then(res => res.json())
    .then(data => {
        var person = "<tr><td>" + data.name + "</td></tr>";

    document.getElementById("tablebody").innerHTML = person;

    });
}

function addPerson() 
{
    var username = document.getElementById("name").value;

    const data = {name: username};
    const options = makeOptions("POST",data);
    fetch("http://localhost:8080/ThursdayExercise/api/person",options)
    .then(res => res.json())
    .then(fetchAll);
}

function editPerson() 
{
    var username = document.getElementById("name").value;
    var newname = document.getElementById("newname").value;

    const data = {name: newname};
    const options = makeOptions("PUT",data);
    fetch("http://localhost:8080/ThursdayExercise/api/person/" + username,options)
    .then(res => res.json())
    .then(fetchAll);
}

function deletePerson() 
{
    var username = document.getElementById("name").value;
    const options = makeOptions("DELETE");
    fetch("http://localhost:8080/ThursdayExercise/api/person/" + username,options)
    .then(res => res.json())
    .then(fetchAll);
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

