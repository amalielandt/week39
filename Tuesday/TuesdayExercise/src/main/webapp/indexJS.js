
var div = document.getElementById("div");
div.style.margin = "auto";
div.style.textAlign = "center";


var names = ["Lars", "Peter", "Jan", "Bo"];
var persons = [{name: "Lars", phone: "1234567"}, {name: "Peter", phone: "675843"}, {name: "Jan", phone: "98547"}, {name: "Bo", phone: "79345"}];

aRef(names);
table(persons);

//b)
function aRef(array)
{
    var names = array.map(name => "<a href=””> " + name + "</a>");
    names.push("</nav>");
    names.unshift("<nav>");
    var nav = names.join("\n");

    document.getElementById("names").innerHTML = nav;
}

//c)
function table(array)
{
    var columns = array.map(person => "<tr> <td>" + person.name + "</td><td>" + person.phone + "</td></tr>");
    var columnsString = columns.join("\n");

    document.getElementById("tablebody").innerHTML = columnsString;
}

//d)
document.getElementById("filter").onclick = Filter;

function Filter()
{
    var filterN = names.filter(name => name.includes("a"));
    aRef(filterN);

    var filterP = persons.filter(person => person.name.includes("a"));
    table(filterP);
}

