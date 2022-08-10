function createRow(key, name){
    const {Elements} = require('./elements.js');
    const rowDiv = document.createElement('div');
    const textDiv = document.createElement('div');
    const butDiv = document.createElement('div');
    const delDiv = document.createElement('div');
    const text = document.createElement('h3');
    const button = document.createElement('button');
    const delButton = document.createElement('button');
    //Elements.getPasswordButtons.push(button);

    rowDiv.className = "row";
    rowDiv.style.paddingTop = "12px";

    textDiv.className = "col-5";
    butDiv.className = "col-5";
    delDiv.className = "col-1";

    text.className = "align-middle"
    text.style.margin = "0px";
    text.innerText = name;

    button.className = "btn btn-info";
    button.id = "getPasswordButton";
    button.value = key;
    button.innerText = "Get Password"

    delButton.className = "btn btn-danger";
    delButton.id = "delPasswordButton";
    delButton.value = key;
    delButton.innerText = "X";

    butDiv.appendChild(button);
    delDiv.appendChild(delButton);
    textDiv.appendChild(text);
    rowDiv.appendChild(textDiv);
    rowDiv.appendChild(butDiv);
    rowDiv.appendChild(delDiv);
    
    Elements.passwordContainer.appendChild(rowDiv);
}

function JsonToPasswords(){
    const {Globals} = require('./globals.js');
    
    for(const key in Globals.passwordJson){
        createRow(key, Globals.passwordJson[key].name);
    }
}

function generatePassword(length, mustUpper, mustLower, mustNumbers, mustSymbols){
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
      }
    
    function getRandomElement(list){
        return list[Math.floor(Math.random()*list.length)];
    }
    const upperCases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    const lowerCases = "abcdefghijklmnopqrstuvwxyz".split('');
    const numbers = "0123456789".split('');
    const symbols = ".,/*!-_?".split('');

    if(length < mustUpper+mustLower+mustNumbers+mustSymbols){return "Error";}
    let password = [];
    for(let i=0; i<mustUpper; i++){
        password.push(getRandomElement(upperCases));
    }
    for(let i=0; i<mustLower; i++){
        password.push(getRandomElement(lowerCases));
    }
    for(let i=0; i<mustNumbers; i++){
        password.push(getRandomElement(numbers));
    }
    for(let i=0; i<mustSymbols; i++){
        password.push(getRandomElement(symbols));
    }
    for(let i=0; i<length-(mustUpper+mustLower+mustNumbers+mustSymbols); i++){
        password.push(getRandomElement(lowerCases.concat(upperCases, numbers, symbols)));
    }
    return shuffle(password).join("");
}

async function writeToFields(pwd){
    function injectScript(writeData){
        const nodes = document.querySelectorAll(`input[type='password']`);
        nodes.forEach(node => node.value = writeData);
    }
    
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    await chrome.scripting.executeScript({target: {tabId: tab.id},function: injectScript, args: [pwd]});
}

async function useNewModal(){
    const {Globals} = require('./globals.js');
    const {Elements} = require('./elements.js');
    Globals.newPasswordModal.show();

    return new Promise((resolve, reject) => {
        Elements.newPasswordModalDiv.addEventListener("hide.bs.modal", () => {reject();})
        Elements.newPasswordCancel.onclick = () => {Globals.newPasswordModal.hide();}
        Elements.newPasswordCross.onclick = () => {Globals.newPasswordModal.hide();}
        Elements.newPasswordCreate.onclick = () => {resolve({
            name: Elements.newPasswordName.value !== ""? Elements.newPasswordName.value : Elements.newPasswordName.getAttribute("placeholder"),
            length: parseInt(Elements.newPasswordLength.value),
            mustUpper: parseInt(Elements.newPasswordMustUpper.value),
            mustLower: parseInt(Elements.newPasswordMustLower.value),
            mustNumber: parseInt(Elements.newPasswordMustNumber.value),
            mustSymbol: parseInt(Elements.newPasswordMustSymbol.value)
        }); Globals.newPasswordModal.hide();}
    })
}

async function usePwModal(){
    const {Globals} = require('./globals.js');
    const {Elements} = require('./elements.js');
    Globals.getPasswordModal.show();

    return new Promise((resolve, reject) => {
        Elements.getPasswordModalDiv.addEventListener("hide.bs.modal", () => {reject()})
        Elements.getPasswordCancel.onclick = () => {Globals.getPasswordModal.hide()}
        Elements.getPasswordCross.onclick = () => {Globals.getPasswordModal.hide()}
        Elements.getPasswordEnter.onclick = () => {resolve(Elements.getPasswordKey.value); Globals.getPasswordModal.hide();}
    })
}

async function useAskModal(name){
    const {Globals} = require('./globals.js');
    const {Elements} = require('./elements.js');
    Elements.askMessage.innerText = `${name}`;
    Globals.askModal.show();

    return new Promise((resolve, reject) => {
        Elements.askModalDiv.addEventListener("hide.bs.modal", () => {reject()})
        Elements.askCancel.onclick = () => {Globals.askModal.hide()}
        Elements.askCross.onclick = () => {Globals.askModal.hide()}
        Elements.askOkay.onclick = () => {resolve(); Globals.askModal.hide()}
    })
}

async function newPassword(){
    const AES = require("crypto-js/aes");
    const {Globals} = require('./globals.js');
    const Uid = require('uid');

    try {
        const key = await usePwModal();
        const uid = Uid.uid(16);
        const query = await useNewModal();
        const pass = generatePassword(query.length, query.mustUpper, query.mustLower, query.mustNumber, query.mustSymbol)
        const crypted = AES.encrypt(pass, key, {
            iv: Globals.settingsJson.pin
        })
        createRow(uid, query.name);
        Globals.passwordJson[uid] = {"name": query.name, "pwd": crypted.toString()};
        chrome.storage.local.set({"passwords": JSON.stringify(Globals.passwordJson)});

        Globals.syncDataJson.added.push(uid);
        chrome.storage.local.set({"syncData": JSON.stringify(Globals.syncDataJson)});

        navigator.clipboard.writeText(pass);
        writeToFields(pass);
    } 
    catch (error) {
        console.log(error);
    }
}

async function getPassword(uid){
    const AES = require("crypto-js/aes");
    const Enc = require("crypto-js/enc-utf8");
    const {Globals} = require('./globals.js');
    try {
        const key = await usePwModal();
        const crypted = Globals.passwordJson[uid].pwd;
        const bytes = AES.decrypt(crypted, key, {
            iv: Globals.settingsJson.pin
        });
        const pass = bytes.toString(Enc)
        navigator.clipboard.writeText(pass);
        writeToFields(pass);
    } 
    catch (error) {
        if(error === undefined){return;}
        navigator.clipboard.writeText("");
        console.log(error);
    }
}

async function delPassword(element){
    console.log(element);
    try {
        await useAskModal(element.parentElement.parentElement.firstChild.firstChild.innerText);
        const {Globals} = require('./globals.js');
        delete Globals.passwordJson[element.value];
        chrome.storage.local.set({"passwords": JSON.stringify(Globals.passwordJson)});

        const index = Globals.syncDataJson.added.indexOf(element.value);
        if(index !== -1){
            Globals.syncDataJson.added.splice(index, 1);
        }else{
            Globals.syncDataJson.deleted.push(element.value);
        }
        chrome.storage.local.set({"syncData": JSON.stringify(Globals.syncDataJson)});

        const row = element.parentNode.parentNode;
        row.remove();
    } catch (error) {
        
    }
}

async function getHostName(){
    function injectScript(){return window.location.hostname.split('.')[1];}
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    let response = await chrome.scripting.executeScript({target: {tabId: tab.id},function: injectScript})
    return response[0].result;
}

module.exports = {
    JsonToPasswords: JsonToPasswords,
    newPassword: newPassword,
    getPassword: getPassword,
    getHostName: getHostName,
    delPassword: delPassword,
}