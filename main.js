// This dictionary contains some stuff that'll be used (stored here in order to avoid code being unreadable)
const styles = 
{ languages:['El audio está silenciado.', 'Audo is muted.', 'Oudio is gedemp.', 'Zvuk je ztišený.', 'Lyden er slået fra.', 'Audio ist stummgeschaltet.', 'Έγινε σίγαση ήχου.', 'L’audio est mis en sourdine.', "L'audio non è attivo.", 'O áudio está silenciado.', 'Звук выключен.', '音声はミュート中です。', '오디오가 꺼져 있습니다.', '视频已静音。', '已靜音。'], private : "<span style='user-select:none;margin-left:10px;margin-right:15px;padding-top:4px;width:70px;height:20px;background-color:RGBA(255,0,46,0.83);display:inline-block;text-align:center;color:white;font-size:1rem;font-weight:600;border: 3px solid RGBA(0,0,0,0.3);border-radius:5%;margin-bottom:-2rem;margin-top:-1rem;'>PRIVATE</span>", public : "<span style='user-select:none;margin-left:10px;margin-right:15px;padding-top:4px;width:70px;height:20px;background-color:RGBA(0,250,0,0.83);display:inline-block;text-align:center;color:black;font-size:1rem;font-weight:600;border: 3px solid RGBA(0,0,0,0.3);border-radius:5%;margin-bottom:-2rem;margin-top:-1rem;'>PUBLIC</span>"
};
const languages = styles.languages;

// Getting information from background such as background color, sensitive warning skip or not etc...
chrome.runtime.sendMessage({subject: "getvars"}, (res) => 
{
    // Callback with the response
    main(res.checker, res.color, res.backcolor, res.unmute, res.checkprivate);
})

function main(sens, barColor, backColor, unmute, checkprivate){
    setInterval(function()
    {
        if ((window.location.href.includes('/stories/') || window.location.href.includes('/p/'))){
            setInterval(() => 
            {

                if (unmute)
                {
                    // Checking if Sensitive Content Warning element exists
                    if (document.querySelector('.aY6mA') == undefined)
                    {
                        languages.forEach( lang => 
                        {
                            if ( document.querySelector(`svg._8-yf5[aria-label="${lang}"]`))
                            {
                                document.getElementsByClassName('FqZhB')[0].click();
                            }
                        });
                    }
                    // If it has a Sensitive Content Warning and client has enabled the skip warning feature..
                    else if (sens && document.querySelector('.sqdOP.yWX7d.y1rQx.cB_4K'))
                    {
                        document.querySelector('.sqdOP.yWX7d.y1rQx.cB_4K').click();
                        for (var i = 0; i <= languages.length; i++)
                        {
                            if ( document.querySelector(`svg._8-yf5[aria-label="${languages[i]}"]`) != null)
                            {
                                document.getElementsByClassName('FqZhB')[0].click();
                            }
                        }
                    } 
                }

            }, 150);
            
        }
        else if (window.location.href.startsWith('https://www.instagram.com/') && (window.location.href.length > 'https://www.instagram.com/'.length) && document.querySelector(".-nal3") && checkprivate)
        {   
            // Checks if the style has already been applied.
            if (!document.querySelector(".-nal3").innerHTML.startsWith("<span style=") && document.querySelector(".glyphsSpriteFriend_Follow.u-__7")){
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

        // CSS Injection
        if(!document.querySelector('#unmuterExtentionStyle')){
            const style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            style.setAttribute('id', 'unmuterExtentionStyle');
            style.innerHTML =`
                .zGtbP.IPQK5.VideM 
                {
                    background: ${backColor};
                    border: none;
                    borderRadius: 8px;
                }
                ._lz6s{
                    background: ${barColor};
                }
                .SCxLW.o64aR{
                    background: ${backColor};
                }
                ._8UZ6e, .tHaIX.Igw0E.IwRSH.eGOV_._4EzTm.HVWg4{
                    background: none;
                }
                .Ppjfr.UE9AK.wdOqh{
                    background: ${barColor};
                    border-radius: 2px;
                }
                .S-mcP{
                    background: ${barColor};
                }
                `;
            document.getElementsByTagName("body")[0].appendChild(style);
        }
    },500);
}