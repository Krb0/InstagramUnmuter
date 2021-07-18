// Creating storage when the extension is created in order to avoid null values
chrome.runtime.onInstalled.addListener((e)=> {

    chrome.storage.sync.set({'color': "#fcfcfc", 'bgcolor': "#f2f2f2", 'check': true, 'unmute' : true});

});

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) =>{
        if (request.subject === 'getvars'){
            chrome.storage.sync.get(null, (r) => {
                sendResponse({checker: r.check, color: r.color, backcolor: r.bgcolor, unmute: r.unmute});
            })
        }
        return true;
    }
);