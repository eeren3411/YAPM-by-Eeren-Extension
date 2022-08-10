function getHostName(sendResponse){
    function injectScript(){return window.location.hostname;}
    chrome.tabs.query({active: true, currentWindow: true}).then(tabs => {
        const tabId = tabs[0].id
        chrome.scripting.executeScript({target: {tabId: tabId},function: injectScript}).then(response => sendResponse(response[0].result));
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.request == "getHostName"){
        getHostName(sendResponse);
    }
})