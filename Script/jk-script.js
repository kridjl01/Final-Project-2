/**
 * Created by Owner on 10/29/2016.
 * CS 112 Final Project
 * Jeremiah Krider
 */

var UserNames = [];
var UserDifficulty = 1;
var CurrentUserCell;
var UserMathOperators = [0,1,2,3]
var NumbersAvailable =[];
var NumbersTopAdd = [];
var NumbersBottomAdd = [];
var NumbersTopSub = [];
var NumbersBottomSub = [];
var NumbersTopMult = [];
var NumbersBottomMult = [];
var NumbersTopDiv = [];
var NumbersBottomDiv = [];

var Answer;
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
            UserMathOperators.push(0);

        }
        if ($("chkSubtraction").checked == true) {
            UserMathOperators.push(1);
        }
        if ($("chkMultiplication").checked == true) {
            UserMathOperators.push(2);
        }
        if ($("chkDivision").checked == true) {
            UserMathOperators.push(3);
        }

        location.assign("Flash Card.html");
    }
else if ($("radStoryProblem").checked ==true){
        if ($("chkAddition").checked == true) {
            numberSelected=1;
            UserMathOperators[0]= 0;
        }
        if ($("chkSubtraction").checked == true) {
            numberSelected=numberSelected+1;
            UserMathOperators[0]= 1;
        }
        if ($("chkMultiplication").checked == true) {
            numberSelected=numberSelected+1;
            UserMathOperators[0]= 2;
        }
        if ($("chkDivision").checked == true) {
            numberSelected=numberSelected+1;
            UserMathOperators[0]= 3;
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

function DisplayEquationNumbers(top,bottom,operator){
    $("divOperator").innerHTML=operator;
    $("divTop").innerHTML=top;
    $("divBottom").innerHTML= bottom;
}

function CreateEquationNumbers(){
    var top;
    var bottom;
    var operators = RandomInt(0,UserMathOperators.length-1);

    alert("operators");alert(operators)
    if (UserMathOperators[operators] == 0){
     alert("addition")
        if (NumbersTopAdd == ""||NumbersBottomAdd == ""){
            for (i=0;i<UserDifficulty*10;i++){
                NumbersTopAdd.push(i);
                NumbersBottomAdd.push(i);}
        }
       top = SelectAndReduce(NumbersTopAdd);
        bottom = SelectAndReduce(NumbersBottomAdd);
        DisplayEquationNumbers(top,bottom,"+");
        Answer = top+bottom;
    }

    if (UserMathOperators[operators] == 1){
        alert("subtraction")
        if (NumbersTopSub == ""||NumbersBottomSub== ""){
            for (i=0;i<UserDifficulty*10;i++){
                NumbersTopSub.push(i);
                NumbersBottomSub.push(i);}
        }
        top = SelectAndReduce(NumbersTopSub);
        bottom = SelectAndReduce(NumbersBottomSub);
        if(bottom>top) {
            while (bottom>top){
                NumbersBottomSub.push(bottom);
                var index = 0
                bottom = NumbersBottomSub[index];
                NumbersBottomSub.splice(index,1);
                index++;

            }
        }
        DisplayEquationNumbers(top,bottom,"-");
        Answer = top-bottom;
    }
    if (UserMathOperators[operators] == 2){
        alert("multiplication")
        if (NumbersTopMult == ""||NumbersBottomMult == ""){
            for (i=0;i<UserDifficulty*10;i++){
                NumbersTopMult.push(i);
                NumbersBottomMult.push(i);}
        }
        top = SelectAndReduce(NumbersTopMult);
        bottom = SelectAndReduce(NumbersBottomMult);
        DisplayEquationNumbers(top,bottom,"X");
        Answer = top*bottom;
    }
    if (UserMathOperators[operators] == 3){
        alert("division")
        if (NumbersTopDiv == ""||NumbersBottomDiv == ""){
            for (i=0;i<UserDifficulty*10;i++){
                NumbersTopMult.push(i);
                NumbersBottomMult.push(i);
                }
        }

        bottom = SelectAndReduce(NumbersBottomMult);
        top = bottom*SelectAndReduce(NumbersTopMult);
        DisplayEquationNumbers(top,bottom,"/");
        Answer = top/bottom;

    }


}
