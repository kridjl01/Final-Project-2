/**
 * Created by Owner on 10/29/2016.
 * CS 112 Final Project
 * Jeremiah Krider
 */

var UserNames = [];
var UserDifficulty = [];
var CurrentUserCell;
var UserMathOperators = []
var NumbersAvailable =[];
var NumbersTopAdd = [];
var NumbersBottomAdd = [];
var NumbersTopSub = [];
var NumbersBottomSub = [];
var NumbersTopMult = [];
var NumbersBottomMult = [];
var NumbersTopDiv = [];
var NumbersBottomDiv = [];
var CorrectAnswers = 0;
var Answer;
var Person1;
var Person2;
var Thing1;
var Thing2;
function $(elementid){
    return document.getElementById(elementid);
}

function SaveValues(){
    //Converts UserNames and UserDifficulty arrays to strings and
    //saves to local storage
   // alert("CurrentUserCell");alert(CurrentUserCell)
   // alert("UserDifficulty[CurrentUserCell]");alert(UserDifficulty[CurrentUserCell])
    localStorage.setItem("UserNames",JSON.stringify(UserNames));
    localStorage.setItem("UserDifficulty",JSON.stringify(UserDifficulty));
    localStorage.setItem("UserMathOperators",JSON.stringify(UserMathOperators));
    localStorage.setItem("CorrectAnswers",CorrectAnswers);
    localStorage.setItem("CurrentUserCell",CurrentUserCell);
}
function GetValues2(){
   // alert("GetValues2")

    CorrectAnswers = parseFloat(localStorage.getItem("CorrectAnswers"));
    CurrentUserCell = parseFloat(localStorage.getItem("CurrentUserCell"));
    UserMathOperators=JSON.parse(localStorage.getItem("UserMathOperators"));
    UserDifficulty = JSON.parse(localStorage.getItem("UserDifficulty"));
   // alert("CorrectAnswers");alert(CorrectAnswers)
  //  alert("CurrentUserCell");alert(CurrentUserCell)
}
function GetValues(){
    //Takes UserNames and UserDifficulty strings from local storage converts to an array
    // and saves as UserNames and UserDifficulty array
    var retrievedNames = localStorage.getItem("UserNames");
alert ("retrievedNames");alert (retrievedNames)

    if (retrievedNames == null) {
        // If retrievedNames is null this does nothing and leaves the UserNames and User Difficulty as
        //empty
        UserNames = [];UserDifficulty=[];CorrectAnswers=0;CurrentUserCell=0;
        alert("GetValues retrieved names is null");alert(UserNames);alert(UserNames)
    }
    else {
        //If retrievedNames is not null the conversion and assignment is carried out
        var retrievedDifficulty = localStorage.getItem(("UserDifficulty"));
        UserNames = JSON.parse(retrievedNames);
        UserDifficulty = JSON.parse(retrievedDifficulty);
        CorrectAnswers = 0;
        CurrentUserCell=0;
        alert("GetValues retrieved names is not null");alert(UserNames);alert(UserNames)
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
alert ("CheckUserName(newUserName)");alert (CheckUserName(newUserName))
    if (CheckUserName(newUserName)==true){

        var emptyCell = FindEmptyCell(UserNames)


        UserNames[emptyCell]= newUserName;
        CurrentUserCell=emptyCell;
        UserDifficulty[emptyCell]=1;
        SaveValues();
        location.assign("Game Selection.html");


    }
    else{alert ("User name has already been chosen. Please enter a new user name");}

}

function PreviousUser(){
    // Finds the previous users name
    var previousUserName = $("txtUserName").value

    if (CheckUserName(previousUserName)==true){
        alert ("User Name is incorrect Please Enter correct username or select new user.")
    }
    else {
        CorrectAnswers=0;
        CurrentUserCell=0;
        SaveValues();
        location.assign("Game Selection.html");
    }

}
function GameSelection(){
    GetValues2();
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
        SaveValues();
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
        SaveValues();
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
    GetValues2();

    $("divFeedBack").innerHTML="";
    $("txtFlashAnswer").value=""
    var top;
    var bottom;
    var operators = RandomInt(0,UserMathOperators.length-1);


    if (UserMathOperators[operators] == 0){
        if (NumbersTopAdd == ""||NumbersBottomAdd == ""){
            for (i=0;i<UserDifficulty[CurrentUserCell]*10;i++){
                NumbersTopAdd.push(i);
                NumbersBottomAdd.push(i);}
        }
        top = SelectAndReduce(NumbersTopAdd);
        bottom = SelectAndReduce(NumbersBottomAdd);
        DisplayEquationNumbers(top,bottom,"+");
        Answer = top+bottom;
    }

    if (UserMathOperators[operators] == 1){

        if (NumbersTopSub == ""||NumbersBottomSub== ""){
            for (i=0;i<UserDifficulty[CurrentUserCell]*10;i++){
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
        if (NumbersTopMult == ""||NumbersBottomMult == ""){
            for (i=0;i<UserDifficulty[CurrentUserCell]*10;i++){
                NumbersTopMult.push(i);
                NumbersBottomMult.push(i);}
        }
        top = SelectAndReduce(NumbersTopMult);
        bottom = SelectAndReduce(NumbersBottomMult);
        DisplayEquationNumbers(top,bottom,"X");
        Answer = top*bottom;
    }
    if (UserMathOperators[operators] == 3){
        if (NumbersTopDiv == ""||NumbersBottomDiv == ""){
            for (i=0;i<UserDifficulty[CurrentUserCell]*10;i++){
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

function CheckAnswer(){
    var userAnswer = parseFloat($("txtFlashAnswer").value);

    if (userAnswer ==Answer){
        CorrectAnswers =CorrectAnswers +1;
        localStorage.setItem("CorrectAnswers",CorrectAnswers)

        location.assign("Achievement.html")

    }
    else{$("divFeedBack").innerHTML="Try Again";}

}
function Achievement() {
    CorrectAnswers = localStorage.getItem("CorrectAnswers")
    if (CorrectAnswers % 2 != 0) {
        $("divAchievement").innerHTML = "Correct"
    }

    if (CorrectAnswers % 2 == 0) {

        feedBack = ["Way To GO", "Your On Top", "Good Job", "Superb", "Genius"];
        $("divAchievement").innerHTML = RandomOneOf(feedBack) + "<br> You have answered " + CorrectAnswers + " in a row";
    }
}
    function GoBackToFlash() {
        localStorage.setItem("CorrectAnswers", CorrectAnswers)
        location.assign("Flash Card.html")
    }
function GetStoryProblem(){
    Person1 = $("txtPerson1").value;
    Person2 = $("txtPerson2").value;
    Thing1 = $("txtThing1").value;
    Thing2 = $("txtThing2").value;
    localStorage.setItem("Person1", Person1);
    localStorage.setItem("Person2", Person2);
    localStorage.setItem("Thing1", Thing1);
    localStorage.setItem("Thing2", Thing2);
    location.assign("Story Problem.html");
}
function CreateStoryProblem(){
    GetValues2();
    Person1 = localStorage.getItem("Person1");
    Person2 = localStorage.getItem("Person2");
    Thing1 = localStorage.getItem("Thing1");
    Thing2 = localStorage.getItem("Thing2");

    $("divFeedBack").innerHTML="";
    $("txtFlashAnswer").value=""
    var top;
    var bottom;
    var operators = RandomInt(0,UserMathOperators.length-1);


    if (UserMathOperators[operators] == 0){
        if (NumbersTopAdd == ""||NumbersBottomAdd == ""){
            for (i=0;i<UserDifficulty[CurrentUserCell]*10;i++){
                NumbersTopAdd.push(i);
                NumbersBottomAdd.push(i);}
        }
        top = SelectAndReduce(NumbersTopAdd);
        bottom = SelectAndReduce(NumbersBottomAdd);
        $("divStoryProblem").innerHTML=Person1 +" has "+top+Thing1+" and "+Person2+" has "+bottom +Thing1+".<br>"
            +"How many "+Thing1+" are there all together?";
        Answer = top+bottom;
    }

    if (UserMathOperators[operators] == 1){

        if (NumbersTopSub == ""||NumbersBottomSub== ""){
            for (i=0;i<UserDifficulty[CurrentUserCell]*10;i++){
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
        if (NumbersTopMult == ""||NumbersBottomMult == ""){
            for (i=0;i<UserDifficulty[CurrentUserCell]*10;i++){
                NumbersTopMult.push(i);
                NumbersBottomMult.push(i);}
        }
        top = SelectAndReduce(NumbersTopMult);
        bottom = SelectAndReduce(NumbersBottomMult);
        DisplayEquationNumbers(top,bottom,"X");
        Answer = top*bottom;
    }
    if (UserMathOperators[operators] == 3){
        if (NumbersTopDiv == ""||NumbersBottomDiv == ""){
            for (i=0;i<UserDifficulty[CurrentUserCell]*10;i++){
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