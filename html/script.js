const checkBox = document.getElementById('autoAccept');
const checkBoxMute = document.getElementById('autoUnmute');
const privateBtn = document.getElementById('checkPrivate');
const colorInput = document.getElementById('colorInput');
const bgColor = document.getElementById('bgColor');
const randColor = document.getElementById('colorBtn');
const colorSaver = document.getElementById('colorInputText');
const selectorEl = document.getElementById('selector');
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

chrome.storage.sync.get('saved', res =>{
    if (res.saved.length >= 1){
        const data = res.saved;
        data.forEach(option =>{
            const newOption = document.createElement('option');
            newOption.value = option.name;
            newOption.innerText = option.name;
            selector.appendChild(newOption);
        })
    }
});

document.querySelector('#saverForm').addEventListener("submit",function(event){
    event.preventDefault();

    chrome.storage.sync.get("saved", res =>{
        const newArray = res.saved;
        newArray.push({'name': colorSaver.value, 'bgcolor': bgColor.value, 'barcolor': colorInput.value});
        chrome.storage.sync.set({'saved': newArray});
    });

})
document.querySelector('#savedColorSet').addEventListener('click', e =>{
    chrome.storage.sync.get('saved', res =>{
        let colorName = selector.value;
        res.saved.forEach( colorSaved =>{
            if (colorSaved.name == colorName){
                bgColor.value = colorSaved.bgcolor;
                colorInput.value = colorSaved.barcolor;
                [bgColor, colorInput].forEach(item =>{
                    item.dispatchEvent(new Event('change'));
                });
            }
        });
    })
     
});