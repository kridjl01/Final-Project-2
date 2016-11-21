/**
 * Created by Owner on 10/29/2016.
 * CS 112 Final Project
 * Jeremiah Krider
 */

var UserNames = [];
var UserDifficulty = [];
var CurrentUserCell;
const MathOperators = ["+","-","x","/"];
var UserMathOperators = []
var NumbersAvailable =[];
var NumbersOne = [];
var NumbersTwo = [];
function $(elementid){
    return document.getElementById(elementid);
}

function SaveValues(){
    //Converts UserNames and UserDifficulty arrays to strings and
    //saves to local storage
    localStorage.setItem("UserNames",JSON.stringify(UserNames));
    localStorage.setItem("UserDifficulty",JSON.stringify(UserDifficulty));
}
function GetValues(){
    //Takes UserNames and UserDifficulty strings from local storage converts to an array
    // and saves as UserNames and UserDifficulty array
    var retrievedNames = localStorage.getItem("UserNames");


    if (retrievedNames == null) {
        // If retrievedNames is null this does nothing and leaves the UserNames and User Difficulty as
        //empty
        UserNames = [];UserDifficulty=[];
    }
    else {
        //If retrievedNames is not null the conversion and assignment is carried out
        var retrievedDifficulty = localStorage.getItem(("UserDifficulty"));
        UserNames = JSON.parse(retrievedNames);
        UserDifficulty = JSON.parse(retrievedDifficulty);
    }
}
function CheckUserName(UserName){
    //Takes in the UserName and checks UserNames array for user name
    //Changes global variable CurrentUserCell for current users and returns false
    //returns true if user name is not in array
    var index =0;
    if (UserNames !=null) {
        var length = UserNames.length;
        while (index <= length) {
            if (UserNames[index] == UserName) {
                CurrentUserCell=index;
                return false;

            }
            index++;
        }
    }
    return true;


}
function FindEmptyCell(Array){
    // Finds the next empty cell in the Array
    var i=0
    if (Array ==null){
        //If array has not been filled returns 0 for first cell
        return 0;
    }

    while (Array [i] !=null){i++
        //Finds the next empty cell
    }
    return i;
}
function NewUserName(){
    //Takes a new user name and add new cell to username array

    var newUserName = $("txtUserName").value;

    if (CheckUserName(newUserName)==true){

        var emptyCell = FindEmptyCell(UserNames)


        UserNames[emptyCell]= newUserName;
        CurrentUserCell=emptyCell;
        UserDifficulty[emptyCell]=0;
        location.assign("Game Selection.html");
        SaveValues();

    }
    else{alert ("User name has already been chosen. Please enter a new user name");}

}

function PreviousUser(){
    // Finds the previous users name
    var previousUserName = $("txtUserName").value

    if (CheckUserName(previousUserName)==true){
        alert ("User Name is incorrect Please Enter correct username or select new user.")
    }
    else {SaveValues();
        location.assign("Game Selection.html");
    }

}
function GameSelection(){
var numberSelected;
    UserMathOperators=[];
    if($("chkAddition").checked == false&&$("chkSubtraction").checked == false&&$("chkMultiplication").checked == false&&$("chkDivision").checked == false){
        alert("Please select at least one math operation.")
        return;
    }
    if ($("radFlashCard").checked==true){

        if ($("chkAddition").checked == true) {
            UserMathOperators[FindEmptyCell(UserMathOperators)]= MathOperators[0];

        }
        if ($("chkSubtraction").checked == true) {
            UserMathOperators[FindEmptyCell(UserMathOperators)]= MathOperators[1];
        }
        if ($("chkMultiplication").checked == true) {
            UserMathOperators[FindEmptyCell(UserMathOperators)]= MathOperators[2];
        }
        if ($("chkDivision").checked == true) {
            UserMathOperators[FindEmptyCell(UserMathOperators)]= MathOperators[3];
        }

        location.assign("Flash Card.html");
    }
else if ($("radStoryProblem").checked ==true){
        if ($("chkAddition").checked == true) {
            numberSelected=1;
            UserMathOperators[0]= UserMathOperators[0];
        }
        if ($("chkSubtraction").checked == true) {
            numberSelected=numberSelected+1;
            UserMathOperators[0]= UserMathOperators[1];
        }
        if ($("chkMultiplication").checked == true) {
            numberSelected=numberSelected+1;
            UserMathOperators[0]= UserMathOperators[2];
        }
        if ($("chkDivision").checked == true) {
            numberSelected=numberSelected+1;
            UserMathOperators[0]= UserMathOperators[3];
        }
        if (numberSelected>1){
            alert("Please select only one math operation.")
            return;
        }
        location.assign("Story Problem Input.html");
    }
    else {alert ("Please select either .")
    return;}
}
function RandomInt (low,high) {
    //given :low<=high
    //returns : a random integer in the range [low,high]
    return Math.floor(Math.random() * (high - low + 1)) + low;}

function RandomOneOf(list){
// Given : list is a nonempty list (array)
// Returns: a random item from the list

    return list[RandomInt(0, list.length-1)];
}
function CreateNumberArray(difficulty,Array){
    Array= [];
    for (i=0;i<difficulty*10;i++){
        Array.push(i);
    }
}
function SelectAndReduce(Array){
    var index =RandomInt(0,Array.length-1);
    var returnValue = Array[index];

    Array.splice(index,1);
    
    return returnValue;
}
function DisplayEquationNumbers(){
    var difficulty =1

    for (i=0;i<difficulty*10;i++){
        NumbersOne.push(i);
        NumbersTwo.push(i)}

    var a = SelectAndReduce(NumbersOne)//SelectAndReduce(NumbersOne);
    var b = SelectAndReduce(NumbersTwo)//SelectAndReduce(NumbersTwo);

$("divNumb1").innerHTML=a;
    //Select Bottom Number
$("divNumb2").innerHTML= b;
    //Select Operator
$("divOperator").innerHTML=RandomOneOf(MathOperators);//Change to UserMathOperators when finished
}