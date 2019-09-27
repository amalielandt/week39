import 'bootstrap/dist/css/bootstrap.css'
document.getElementById("container").style.textAlign = "center";

fetchAll();
document.getElementById("getuser").onclick = fetchUser;
document.getElementById("adduser").onclick = addUser;
document.getElementById("edituser").onclick = editUser;
document.getElementById("deleteuser").onclick = deleteUser;

function fetchAll()
{
    fetch('http://localhost:3333/api/users')
    .then(res => res.json())
    .then(data => {

        var columns = data.map(user => "<tr><td>" + user.id + "</td><td>" + user.name 
        + "</td><td>" + user.age + "</td><td>" + user.gender 
        + "</td><td>" + user.email + "</td></tr>");

        var columnsString = columns.join("\n");

    document.getElementById("tablebody").innerHTML = columnsString;
    });  
}

function fetchUser()
{
    var userID = document.getElementById("userID").value;
    if(userID === "") userID = 0;
    fetch('http://localhost:3333/api/users/' + userID)
    .then(handleHttpErrors)
    .then(data => {
        var user = "<tr><td>" + data.id + "</td><td>" + data.name 
        + "</td><td>" + data.age + "</td><td>" + data.gender 
        + "</td><td>" + data.email + "</td></tr>"

    document.getElementById("tablebody").innerHTML = user;

    }).catch(err => {
        if(err.status)
        err.fullError.then(e => document.getElementById("error").innerHTML = e.msg);
        else document.getElementById("error").innerHTML = "Network error";
    });
}

function addUser() 
{
    var username = document.getElementById("name").value;
    var userage = document.getElementById("age").value;
    var usergender = document.getElementById("gender").value;
    var useremail = document.getElementById("email").value;

    const data = {age: userage, name: username, gender: usergender ,email: useremail};
    const options = makeOptions("POST",data);
    fetch("http://localhost:3333/api/users",options)
    .then(handleHttpErrors)
    .then(fetchAll)
    .catch(err => {
        if(err.status)
        err.fullError.then(e => document.getElementById("error").innerHTML = e.msg);
        else document.getElementById("error").innerHTML = "Network error";
    });
}

function editUser() 
{
    var userID = document.getElementById("userid").value;
    var username = document.getElementById("name").value;
    var userage = document.getElementById("age").value;
    var usergender = document.getElementById("gender").value;
    var useremail = document.getElementById("email").value;

    const data = {age: userage, name: username, gender: usergender ,email: useremail};
    const options = makeOptions("PUT",data);
    fetch("http://localhost:3333/api/users/" + userID,options)
    .then(handleHttpErrors)
    .then(fetchAll)
    .catch(err => {
        if(err.status)
        err.fullError.then(e => document.getElementById("error").innerHTML = e.msg);
        else document.getElementById("error").innerHTML = "Network error";
    });
}

function deleteUser() 
{
    var userID = document.getElementById("userid").value;
    const options = makeOptions("DELETE");
    fetch("http://localhost:3333/api/users/" + userID,options)
    .then(handleHttpErrors)
    .then(fetchAll)
    .catch(err => {
        if(err.status)
        err.fullError.then(e => document.getElementById("error").innerHTML = e.msg);
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

       
       


