function showLogo(){
    let j = 0.1;
    console.log("WTF2");
    for (i = 1; i <= 8; i++) {
        document.getElementById("logo-Svg-2" + i).style.transitionDuration = "0.3s";
        document.getElementById("logo-Svg-1" + i).style.transitionDuration = "0.3s";
        coords = document.getElementById("logo-Svg-2" + i).getBBox();
        document.getElementById("logo-Svg-2" + i).style.transitionDelay = j + "s";
        document.getElementById("logo-Svg-1" + i).style.transitionDelay = j + "s";
        j = j + 0.1;


        console.log("WTF"+j);
        console.log(document.getElementById("logo-Svg-2" + i));
        document.getElementById("logo-Svg-2" + i).style.opacity = "1";
        document.getElementById("logo-Svg-1" + i).style.opacity = "1";
        document.getElementById("logo-Svg-1" + i).style.transform = "rotate(0)";
        document.getElementById("logo-Svg-2" + i).style.transform = "rotate(0)";
    }}

window.onload = () => {
    console.log("WTF");

    
        showLogo();
    
}

function scrollFunction() {
    console.log("scroll");
    if (document.getElementById("promoapp-asset-svg-1")) {
        if (document.body.scrollTop > document.getElementById("promoapp-asset-svg-1").offsetTop - (document.getElementById("promoapp-asset-svg-1").offsetHeight - 200) || document.documentElement.scrollTop > document.getElementById("promoapp-asset-svg-1").offsetTop - (document.getElementById("promoapp-asset-svg-1").offsetHeight - 200)) {
            console.log("in view");
            document.getElementById("text-1").style.transitionDuration = "0.2s";
            document.getElementById("text-1").style.opacity = "1";
            j = 0.1;
            for (i = 1; i <= 16; i++) {
                document.getElementById("text-" + i).style.transitionDelay = j + "s";
                document.getElementById("text-" + i).style.transitionDuration = "0.2s";
                document.getElementById("text-" + i).style.opacity = "1";
                j = j + 0.1;
            }
        }
    }
}