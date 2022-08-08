let menuBtns = document.querySelectorAll(".burger-menu");

let menuAnim = 

menuBtns.forEach(menuBtn => {
    menuBtn.addEventListener("click",e=>{
        if(menuBtn.classList.contains("menu-open")){

            menuBtns.forEach(elem =>{
                elem.classList.remove("menu-open");
                elem.classList.add("closed-menu");
            });


        }
        else{

            menuBtns.forEach(elem =>{
                elem.classList.remove("closed-menu");
                elem.classList.add("menu-open");
            })
        }
    })
});