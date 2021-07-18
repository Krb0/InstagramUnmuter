const windowLocation = window.location.href;
// This dictionary contains some stuff that'll be used (stored here in order to avoid code being unreadable)
const styles = 
{ languages:['El audio está silenciado.', 'Audo is muted.', 'Oudio is gedemp.', 'Zvuk je ztišený.', 'Lyden er slået fra.', 'Audio ist stummgeschaltet.', 'Έγινε σίγαση ήχου.', 'L’audio est mis en sourdine.', "L'audio non è attivo.", 'O áudio está silenciado.', 'Звук выключен.', '音声はミュート中です。', '오디오가 꺼져 있습니다.', '视频已静音。', '已靜音。'], private : "<span style='user-select:none;margin-left:10px;margin-right:15px;padding-top:4px;width:70px;height:20px;background-color:RGBA(255,0,46,0.83);display:inline-block;text-align:center;color:white;font-size:1rem;font-weight:600;border: 3px solid RGBA(0,0,0,0.3);border-radius:5%;margin-bottom:-2rem;margin-top:-1rem;'>PRIVATE</span>", public : "<span style='user-select:none;margin-left:10px;margin-right:15px;padding-top:4px;width:70px;height:20px;background-color:RGBA(0,250,0,0.83);display:inline-block;text-align:center;color:black;font-size:1rem;font-weight:600;border: 3px solid RGBA(0,0,0,0.3);border-radius:5%;margin-bottom:-2rem;margin-top:-1rem;'>PUBLIC</span>"
};
const languages = styles.languages;


// Getting information from background such as background color, sensitive warning skip or not etc...
chrome.runtime.sendMessage({subject: "getvars"}, (res) => 
{
    // Callback with the response
    main(res.checker, res.color, res.backcolor);
})

function main(sens,barColor, backColor){
    setInterval(function()
    {
    // Checks if client has opened a story or a post and if it hasn't a sensitive content warning 
    // for loop made to check if sound is muted (depends on the language of the client's IG and the string has to be declared on styles.languages' array)
    if ((windowLocation.indexOf('/stories/') || windowLocation.indexOf('/p/' ) )){
        setInterval(() => {
            // If it doesn't have a Sensitive Content Warning..
            if (document.querySelector('.aY6mA') == undefined){
                for (var i = 0; i <= languages.length; i++)
                {
                    if ( document.querySelector(`svg._8-yf5[aria-label="${languages[i]}"]`) != null)
                    {
                        document.getElementsByClassName('FqZhB')[0].click();
                    }
                }
            }
            // If it has a Sensitive Content Warning and client has enabled the skip warning feature..
            else if (sens && document.querySelector('.sqdOP.yWX7d.y1rQx.cB_4K')){
                document.querySelector('.sqdOP.yWX7d.y1rQx.cB_4K').click();
                for (var i = 0; i <= languages.length; i++)
                {
                    if ( document.querySelector(`svg._8-yf5[aria-label="${languages[i]}"]`) != null)
                    {
                        document.getElementsByClassName('FqZhB')[0].click();
                    }
                }
            } 

        }, 150);
        
    }
    else if (windowLocation.startsWith('https://www.instagram.com/') && (windowLocation.length > 'https://www.instagram.com/'.length) && document.querySelector(".-nal3") != null)
    {
        if (!document.querySelector(".-nal3").innerHTML.startsWith("<span style=")){
            const profileEl = document.querySelector(".-nal3");
            document.querySelector(".glyphsSpriteFriend_Follow.u-__7").click();
            if(document.querySelector("._7UhW9.xLCgt.MMzan.KV-D4.uL8Hv").innerText.endsWith(`@${document.querySelector("._7UhW9.fKFbl.yUEEX.KV-D4.fDxYl").innerText}.`))
            {
                profileEl.innerHTML = styles.private + profileEl.innerHTML;
            }
            else
            {
                profileEl.innerHTML = styles.public + profileEl.innerHTML;
            }
            document.querySelector(".aOOlW.HoLwm").click();
        }
    }
    // main page instagram
    if(document.querySelector('.zGtbP.IPQK5.VideM'))
    {
        document.querySelector('._lz6s.Hz2lF').style.background = barColor;
        document.querySelector('.zGtbP.IPQK5.VideM').style.background = backColor;
        document.querySelector('.zGtbP.IPQK5.VideM').style.border = "0";
        document.querySelector('.zGtbP.IPQK5.VideM').style.borderRadius = "8px";
        document.querySelector('.SCxLW.o64aR').style.background = backColor;
        document.querySelector('._8UZ6e').style.background = "0"; 
        document.querySelector('.tHaIX.Igw0E.IwRSH.eGOV_._4EzTm.HVWg4').style.background = "0";
        document.querySelectorAll('.Ppjfr.UE9AK.wdOqh').forEach(elem => {
            elem.style.background = barColor;
            elem.style.borderRadius = "2px";
        });
    }
    else if (document.querySelector('._2NzhO.EQ1Mr')){
        document.querySelector('.S-mcP').style.background = barColor;
        document.querySelector('._lz6s.Hz2lF').style.background = barColor;
        document.querySelector('.Igw0E.IwRSH.eGOV_._4EzTm').style.background = backColor;
    }
    else if (document.querySelector('._lz6s.Hz2lF') && document.querySelector('.SCxLW.o64aR ')){
        document.querySelector('.SCxLW.o64aR ').style.background = backColor;
        document.querySelector('._lz6s.Hz2lF').style.background = barColor;
    }
},500);
}
