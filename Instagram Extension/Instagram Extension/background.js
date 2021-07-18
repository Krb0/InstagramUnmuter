// Creating storage when the extension is created in order to avoid null values
chrome.runtime.onInstalled.addListener(function (object) {
    chrome.storage.sync.get('color', function(r) {
        if(!r.color){
            chrome.storage.sync.set({'color': "#fcfcfc"});
        }
    });
    chrome.storage.sync.get('bgcolor', function(r) {
        if(!r.bgcolor){
            chrome.storage.sync.set({'bgcolor': "#f2f2f2"});
        }
    });
    chrome.storage.sync.get('check', function(r) {
        if(!r.check){
            chrome.storage.sync.set({'check': true});
        }
    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.subject === 'getvars'){
            chrome.storage.sync.get('color', function(r) {
                newColor = r.color;
            });
            chrome.storage.sync.get('bgcolor', function(r) {
                bgcolor = r.bgcolor;
            });
            chrome.storage.sync.get('check', function(r) {
                sendResponse({checker: r.check, color: newColor, backcolor: bgcolor});
            });
        }
        return true;
    }
  );