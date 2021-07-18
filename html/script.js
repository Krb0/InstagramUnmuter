const checkBox = document.getElementById('autoAccept');
const checkBoxMute = document.getElementById('autoUnmute');
const colorInput = document.getElementById('colorInput');
const bgColor = document.getElementById('bgColor');
const randColor = document.getElementById('colorBtn');

// Sensible Check & Set

chrome.storage.sync.get('check', function(r) {
    if (r.check == false){
        checkBox.checked = false; 
    }
    else{
        checkBox.checked = true; 
    }
});

checkBox.addEventListener('change', (e)=>{
    if (e.target.checked == false){
        chrome.storage.sync.set({'check': false});
    }
    else{
        chrome.storage.sync.set({'check': true});
    }
});

// Auto Unmute Check & Set

chrome.storage.sync.get('unmute', function(r) {
    if (r.unmute == false){
        checkBoxMute.checked = false; 
    }
    else{
        checkBoxMute.checked = true; 
    }
});

checkBoxMute.addEventListener('change', (e)=>{
    if (e.target.checked == false){
        chrome.storage.sync.set({'unmute': false});
    }
    else{
        chrome.storage.sync.set({'unmute': true});
    }
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