function search(){
    const {Elements} = require('./elements.js')
    let expression;
    if(Elements.searchBar.value == ""){expression = str => true}
    else{expression = str => (new RegExp(`${Elements.searchBar.value.toLowerCase()}`)).test(str)}

    Elements.passwordContainer.childNodes.forEach((node) => {
        if(node.nodeName != "DIV"){return;}
        if(expression(node.firstChild.firstChild.innerText.toLowerCase())){
            node.style.display = "";
        }else{
            node.style.display = "none";
        }
    })
}

function allClicks(e){
    if(e.srcElement.tagName == "BUTTON"){
        const Functions = require('./functions.js');
        if(e.srcElement.id == "createPasswordButton"){
            Functions.newPassword();
        }
        else if(e.srcElement.id == "getPasswordButton"){
            Functions.getPassword(e.srcElement.value);
        }else if(e.srcElement.id == "delPasswordButton"){
            Functions.delPassword(e.srcElement);
        }
    }
}

export function setEvents(){
    const {Elements} = require('./elements.js');
    const Functions = require('./functions.js');

    Elements.searchBar.oninput = search;
    window.onclick = allClicks;
    Elements.getPasswordModalDiv.addEventListener("show.bs.modal", () => {
        Elements.getPasswordKey.value = "";
    })
    Elements.newPasswordModalDiv.addEventListener("show.bs.modal", () => {
        Elements.newPasswordName.value = "";
        Functions.getHostName().then((hostname) => {
            Elements.newPasswordName.setAttribute("placeholder", hostname);
        })
    })
}