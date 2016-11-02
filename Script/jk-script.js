/**
 * Created by Owner on 10/29/2016.
 */

var UserNames = [];
var UserDifficulty = [];
function $(elementid){
    return document.getElementById(elementid);
}

function CheckUserName(UserName){
    var savedUserName=0;
    var index =0;
    while (savedUserName==0){
        if (UserNames[index]==UserName){
            savedUserName =UserNames[index];

        }
        else{index++}

    }
}

function NewUserName(){
    //Takes a new user name and add new cell to username array
     var newUserName = $("txtUserName").value
    var lengthArray = UserNames.length;
    var nextCell = lengthArray +1;
    UserNames[nextCell]=newUserName;
}

function PreviousUser(){
    // finds the previous users name
    var previousUserName = $("txtUserName").value
    var index = 0;
    var length = UserNames.length;
    while (previousUserName !=UserNames[index]&&index<=length){
    index++;

    }
    if (index>length){
        alert ("User Name is incorrect Please inter correct username or select new user.")
    }
}
