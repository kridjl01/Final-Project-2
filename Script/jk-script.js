/**
 * Created by Owner on 10/29/2016.
 */

var UserNames = [];
var UserDifficulty = [];
function $(elementid){
    return document.getElementById(elementid);
}
function SaveValues(){
    localStorage.setItem("Difficulty",UserDifficulty);
    localStorage.setItem("Names",UserNames);
}
function GetValues(){
    UserDifficulty = localStorage.getItem("Difficulty");
    UserNames = localStorage.getItem("Name");
}
function CheckUserName(UserName){
    //Takes in user name and returns array cell number
    // either for the username or next available cell
    var savedUserName="";
    var length = UserNames.length;
    var index =0;
    while (savedUserName==""||index<=length){
        if (UserNames[index]==UserName){
            savedUserName =UserNames[index];

        }
        else{index++}

    }
    return index;
}

function NewUserName(){
    //Takes a new user name and add new cell to username array
    GetValues();
     var newUserName = $("txtUserName").value
    var userCellNumber = CheckUserName(newUserName);
    if (UserNames[userCellNumber]==newUserName){
        alert ("User name has already been chosen. Please enter a new user name");
    }
     else {UserNames[userCellNumber]=newUserName}

}

function PreviousUser(){
    // finds the previous users name
    GetValues();
    var previousUserName = $("txtUserName").value
   var userCellNumber = CheckUserName(previousUserName);
    var length = UserNames.length;
    if( previousUserName==UserNames[userCellNumber]){
// will pull the difficulty level from saved memory

    }
    else {alert ("User Name is incorrect Please inter correct username or select new user.")
    }

}
