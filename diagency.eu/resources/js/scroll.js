window.onscroll = function() {scrollFunction();};


function scrollFunction(){

    // console.log(document.getElementById("hero-section").offsetHeight-(50*document.getElementById("hero-section").offsetHeight/100));

    console.log(document.documentElement.scrollTop);
    if(document.body.scrollTop > document.getElementById("hero-section").offsetHeight-(50*document.getElementById("hero-section").offsetHeight/100) || document.documentElement.scrollTop > document.getElementById("hero-section").offsetHeight-(50*document.getElementById("hero-section").offsetHeight/100)){
        
        document.getElementById("page-header").classList.add("page-header-scrolled");
    }
    else{
        document.getElementById("page-header").classList.remove("page-header-scrolled");
    }


}