let menuBtns = document.querySelectorAll(".burger-menu");

let bgTop = document.getElementById("main-menu-bg-top");
let bgBottom = document.getElementById("main-menu-bg-bottom");

let menuLinks = document.querySelectorAll(".main-menu-li-a");

let menuAnim = 

menuBtns.forEach(menuBtn => {
    menuBtn.addEventListener("click",e=>{
        if(menuBtn.classList.contains("menu-open")){
            
            
            menuLinks.forEach(function(element,index) {
                setTimeout(()=>{
                    element.style.transform = "translateY(150%)";
                },index*100);
            });
            setTimeout(()=>{
                bgTop.style.transform = "scaleX(0)";
                bgBottom.style.transform = "scaleX(0)";
                menuBtns.forEach(elem =>{
                    elem.classList.remove("menu-open");
                    elem.classList.add("closed-menu");
                });
                setTimeout(()=>{
                    document.getElementById("main-menu").style.display="none";
                },500);
            },menuLinks.length*100);

        }
        else{
            document.getElementById("main-menu").style.display="flex";
            menuBtns.forEach(elem =>{
                elem.classList.remove("closed-menu");
                elem.classList.add("menu-open");
            });
            setTimeout(()=>{
                bgTop.style.transform = "none";
                bgBottom.style.transform = "none";
    
                
                setTimeout(()=>{
                    menuLinks.forEach(function(element,index) {
                        setTimeout(()=>{
                            element.style.transform = "none";
                        },index*100);
                    });
                },600);
            },100);
            
        }
    })
});


menuLinks.forEach(element => {

    
    element.addEventListener("click",e=>{

        let destination = e.target.dataset.destination;
        if(document.getElementById(destination)){
            document.getElementById(destination).scrollIntoView();
        }
        else{
            window.href="/en/#"+destination;
        }

        menuLinks.forEach(function(element,index) {
            setTimeout(()=>{
                element.style.transform = "translateY(150%)";
            },index*150);
        });
        setTimeout(()=>{
            bgTop.style.transform = "scaleX(0)";
            bgBottom.style.transform = "scaleX(0)";
            menuBtns.forEach(elem =>{
                elem.classList.remove("menu-open");
                elem.classList.add("closed-menu");
            });
            setTimeout(()=>{
                document.getElementById("main-menu").style.display="none";
            },500);
        },menuLinks.length*100);
    })
});


document.getElementById("scroll-down-btn").addEventListener("click",e=>{
   
    document.getElementById("about-us").scrollIntoView({
        top: 100
    });
});

