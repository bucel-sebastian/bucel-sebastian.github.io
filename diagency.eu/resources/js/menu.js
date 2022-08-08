let menuBtns = document.querySelectorAll(".burger-menu");

menuBtns.forEach(menuBtn => {
    menuBtn.addEventListener("click",e=>{
        if(menuBtn.classList.contains("menu-open")){

            menuBtns.forEach(elem =>{
                elem.classList.remove("menu-open");
            })
        }
        else{

            menuBtns.forEach(elem =>{
                elem.classList.add("menu-open");
            })
        }
    })
});