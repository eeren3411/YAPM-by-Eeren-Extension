export class Elements{
    //Main Screen Objects
    static searchBar = document.getElementById("searchBar");
    static passwordContainer = document.getElementById("passwordContainer");
    static getPasswordButtons = [];

    //Modals
    static getPasswordModalDiv = document.getElementById('getPasswordModalDiv');
    static newPasswordModalDiv = document.getElementById('newPasswordModalDiv');
    static askModalDiv = document.getElementById('askModalDiv');

    //Get Password Modal Elements
    static getPasswordCancel = document.getElementById("getPasswordCancel");
    static getPasswordEnter = document.getElementById("getPasswordEnter");
    static getPasswordCross = document.getElementById("getPasswordCross");
    static getPasswordKey = document.getElementById("getPasswordKey"); 

    //New Password Modal Elements
    static newPasswordCancel = document.getElementById("newPasswordCancel");
    static newPasswordCreate = document.getElementById("newPasswordCreate");
    static newPasswordCross = document.getElementById("newPasswordCross");
    static newPasswordName = document.getElementById("newPasswordName");
    static newPasswordLength = document.getElementById("newPasswordLength");
    static newPasswordMustUpper = document.getElementById("newPasswordMustUpper");
    static newPasswordMustLower = document.getElementById("newPasswordMustLower");
    static newPasswordMustNumber = document.getElementById("newPasswordMustNumber");
    static newPasswordMustSymbol = document.getElementById("newPasswordMustSymbol");

    //Ask Modal Elements
    static askCancel = document.getElementById('askCancel');
    static askOkay = document.getElementById('askOkay');
    static askCross = document.getElementById('askCross');
    static askMessage = document.getElementById('askMessage');
}