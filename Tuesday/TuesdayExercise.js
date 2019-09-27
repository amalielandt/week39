//The magic of callbacks:
//1) Using existing functions that takes a callback as an argument

var names = ["Lars", "Peter", "Jan", "Bo"];

//Using the filter method:
const namesWithA = names.filter(name => name.includes("a"));
console.log("1 - filter: " + namesWithA);

//Using the map method:
const reversedNames = names.map(name => name.split("").reverse().join(""));
console.log("1 - map: " + reversedNames);

//2) Implement user defined functions that take callbacks as an argument

//a) Implement a function: myFilter(array, callback)
function myFilter(array, callback)
{
    var newArray = [];
    array.forEach(element => {
        if(callback(element))
            newArray.push(element);
    });
    return newArray;  
}

function includesA(element)
{
    return element.includes("a");
}

console.log("2.a: " + myFilter(names, includesA));

//b) Implement a function: myMap(array, callback)
function myMap(array, callback)
{
    var newArray = [];
    array.forEach(element => {
         newArray.push(callback(element));
    });
    return newArray;
    
}
function reverse(element)
{
    return element.split("").reverse().join("");
}

console.log("2.b: " + myMap(names, reverse));

//3) Using the Prototype property to add new functionality to existing objects

Array.prototype.myFilter = function(callback)
{
    var newArray = [];
    this.forEach(element => {
        if(callback(element))
            newArray.push(element);
    });
    return newArray;  
}

Array.prototype.myMap = function(callback)
{
    var newArray = [];
    this.forEach(element => {
         newArray.push(callback(element));
    });
    return newArray;   
}

console.log("3 - myFilter: " + names.myFilter(includesA));
console.log("3 - myMap: " + names.myMap(reverse));

//4) Getting really comfortable with filter and map

//a) Use map + a sufficient callback to map numbers into this array: [4,8,15,21,11]
var numbers = [1, 3, 5, 10, 11];

const newNumbers = numbers.map((value, index) => addNextValue(numbers.length, value, index));

function addNextValue(arraylength, value, index)
{
    if( index < arraylength- 1) return value + numbers[index+1];
    else return value;
}
console.log("4.a: " + newNumbers);

//b)  Use map() to create to create the <a>’s for a navigation set 
//    and eventually a string 
var aNames = names.map(name => "<a href=””> " + name + "</a>");
aNames.push("</nav>");
aNames.unshift("<nav>");
var nav = aNames.join("\n");

console.log("4.b: " + nav);

//c) Use map()+(join + ..) to create to create a string, 
//   representing a two column table
var names = [{name:"Lars",phone:"1234567"}, {name: "Peter",phone: "675843"}, {name: "Jan", phone: "98547"},{name: "Bo", phone: "79345"}];
var columns = names.map(name => "<tr> <td>"+ name.name + "</td><td>" + name.phone + "</td></tr>");
var columnsString = columns.join("\n");

console.log("4.c: " + columnsString);

//5 Reduce
var all= ["Lars", "Peter", "Jan", "Bo"];

//a)  Use join to create a single string from all, 
//    with names: comma-, space. and  # - separated.
console.log("5.a : " + all.join(","));
console.log("5.a : " + all.join(" "));
console.log("5.a : " + all.join("#"));

//b) Create a reducer callback that, with reduce(..),  
//   will return the sum (105) of all values in numbers
var numbers = [2, 3, 67, 33]; 
var sum  = function(total, number)
{
    return total + number;
}
console.log("5.b : " + numbers.reduce(sum, 0));

//c) Create a reducer callback that, using the Array’s  reduce() method,  
//   will return the average age of all members (25 for the provided array).
var members = [
    {name : "Peter", age: 18},
    {name : "Jan", age: 35},
    {name : "Janne", age: 25},
    {name : "Martin", age: 22}]
    
var reducer = function(total, member, index, array )
{
 total += member.age;
 if(index === array.length-1) return total/array.length;
 else return total;
}

var average = members.reduce(reducer, 0);
console.log("5.c : " + average); 

//d) Create a reduce function that will return a single 
//   object like {Clinton: 3, Trump: 4, None: 1 }
var votes = [ "Clinton","Trump","Clinton","Clinton","Trump","Trump","Trump","None"];

var voteCounter = function(voteCounts, vote) {
  if (!voteCounts[vote]) {
    voteCounts[vote] = 1;
  } else {
    voteCounts[vote] += 1;
  }
  return voteCounts;
}

var result = votes.reduce(voteCounter, {});
console.log("5.d : " + JSON.stringify(result));

//6  Hoisting

//Function declarations are completely hoisted
function test(){return "Hoist";}
console.log("Hoisting ex: " + test());
console.log("Hoisting ex: " + test2());
function test2(){return "Also hoist";}

//var declarations are also hoisted, but not assignments made with them
a = 1;  
var b; 
console.log("Hoisting ex: " + a + " " + b);
var a;  //hoist
b = 5; //not hoist
 
//To avoid bugs, always declare all variables 
//at the beginning of every scope.

//Variables declared with the let keyword can have Block Scope.
//and variables with var keyword can not.
//Variables defined with let are not hoisted to the top.

//7 this in JavaScript

//Example 1 - call and apply
var person = "Amanda";
var newTHis = {person: "Amalie"};
var anotherThis = {person: "Laura"};

function whoIsThis() {
  return this.person;  
}
console.log("this ex.1: " + whoIsThis());
console.log("this ex.1: " + whoIsThis.call(newTHis));
console.log("this ex.1: " + whoIsThis.apply(anotherThis));

//Example 2 - bind
var something = whoIsThis.bind({person: "Amanda"});
console.log("this ex.2: " + something());
  
var somethingElse = something.bind({person: "Laura"});
console.log("this ex.2: " + somethingElse()); // Still logs Amanda, since bind can olny be used once

//8 Reusable Modules with Closures

//1) Implement and test the Closure Counter Example from w3schools
var add = (function () {
    var counter = 0;
    return function () {counter += 1; return counter;}
  })();

  console.log(add());
  console.log(add());
  console.log(add());

  //2) Implement a reusable function using the Module pattern that should 
  //   encapsulate information about a person (name, and age)

  var Person = (function(name, age) {
    var name = name;
    var age = age;

    return {
        setName:function(newName) {
            name = newName;
        },
        setAge:function(newAge) {
            age = newAge;
        },
        getInfo:function() {
            return name + ", " + age;    
        }  
    }   
}());

Person("Amanda", 24);

console.log(Person.getInfo);
Amanda.setName("Amalie");