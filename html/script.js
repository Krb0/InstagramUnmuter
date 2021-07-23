const checkBox = document.getElementById('autoAccept');
const checkBoxMute = document.getElementById('autoUnmute');
const privateBtn = document.getElementById('checkPrivate');
const colorInput = document.getElementById('colorInput');
const bgColor = document.getElementById('bgColor');
const randColor = document.getElementById('colorBtn');
// Sensible Check & Set

chrome.storage.sync.get('check', function(r) {
    checkBox.checked = r.check; 
});

checkBox.addEventListener('change', (e)=>{
    chrome.storage.sync.set({'check': e.target.checked});
});

// Auto Unmute Check & Set

chrome.storage.sync.get('unmute', function(r) {
    checkBoxMute.checked = r.unmute; 
});

checkBoxMute.addEventListener('change', (e)=>{
    chrome.storage.sync.set({'unmute': e.target.checked});
});

// Profile Type Check

chrome.storage.sync.get('private', function(r) {
    privateBtn.checked = r.private; 
});

privateBtn.addEventListener('change', (e)=>{
    chrome.storage.sync.set({'private':  e.target.checked});

});

// Main Bar Color Check & Set

chrome.storage.sync.get('color', (checkData) =>{
    colorInput.value = checkData.color;
});

colorInput.addEventListener('change', (e)=>{
    chrome.storage.sync.set({'color': colorInput.value});
});

// Background Color Check & Set

chrome.storage.sync.get('bgcolor', (checkData) =>{
    bgColor.value = checkData.bgcolor;
});

bgColor.addEventListener('change', (e)=>{
    chrome.storage.sync.set({'bgcolor': bgColor.value});
});
randColor.addEventListener('click', (e) => {
    colorInput.value = "#cccccc".replace(/c/g,function(){return (~~(Math.random()*16)).toString(16);});
    bgColor.value = "#cccccc".replace(/c/g,function(){return (~~(Math.random()*16)).toString(16);});
    colorInput.dispatchEvent(new Event('change'));
    bgColor.dispatchEvent(new Event('change'));
} );