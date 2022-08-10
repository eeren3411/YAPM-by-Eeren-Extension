import '../styles/main.scss';
const Events = require('./events.js')
const Functions = require('./functions.js');
const {Globals} = require('./globals.js');
const {Elements} = require('./elements.js');
const bootstrap = require('bootstrap');

async function init(){
    Globals.getPasswordModal = new bootstrap.Modal(Elements.getPasswordModalDiv);
    Globals.newPasswordModal = new bootstrap.Modal(Elements.newPasswordModalDiv);
    Globals.askModal = new bootstrap.Modal(Elements.askModalDiv);
    
    //Read storage
    let response = await chrome.storage.local.get(['passwords']);
    if(Object.keys(response).length == 0){
        chrome.storage.local.set({'passwords': '{}'});
        Globals.passwordJson = JSON.parse('{}');
    }else{
        Globals.passwordJson = JSON.parse(response.passwords);
    }

    response = await chrome.storage.local.get(['settings'])
    if(Object.keys(response).length == 0){
        chrome.storage.local.set({'settings': '{"pin": "3411"}'});
        Globals.settingsJson = JSON.parse('{"pin": "3411"}');
    }else{
        Globals.settingsJson = JSON.parse(response.settings);
    }

    response = await chrome.storage.local.get(['syncData'])
    if(Object.keys(response).length == 0){
        chrome.storage.local.set({'syncData': '{"deleted":[],"added":[]}'});
        Globals.syncDataJson = JSON.parse('{"deleted":[],"added":[]}');
    }else{
        Globals.syncDataJson = JSON.parse(response.syncData);
    }
}

function main(){
    Events.setEvents();
    init().then(Functions.JsonToPasswords);
}
main();