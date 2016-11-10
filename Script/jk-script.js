/**
 * Created by Owner on 10/29/2016.
 */

var UserNames = [];
var UserDifficulty = [];
var CurrentUserCell;

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
