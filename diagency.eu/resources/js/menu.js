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






    


    




    let contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", e=>{
    e.preventDefault();
    
    const data = new FormData();
    for(const p of new FormData(contactForm)){
        data.append(p[0],p[1]); 
    }
    fetch("/resources/includes/contact-mail.php",{method:"POST",body:data}).then(response=>response.text()).then(response=>{
        console.log(response);
        sendConfirmBtn();
        contactForm.reset();

        // setTimeout(() => {
        //     document.getElementById("after-contact-form").style.display="flex";
        //     document.getElementById("after-contact-form").style.opacity="1";
        //     document.getElementById("after-contact-form").style.height="max-content";
        //     setTimeout(() => {
            
        //     document.getElementById("after-contact-form").style.opacity="0";
        //     document.getElementById("after-contact-form").style.height="0";
        
        //     }, 5000);
        // }, 500);
    });
    });
  
    
    function sendConfirmBtn(){
        let button=document.getElementById("send-button");
        let getVar = variable => getComputedStyle(button).getPropertyValue(variable);


            if(!button.classList.contains('active')) {

            button.classList.add('active');

            gsap.to(button, {
                keyframes: [{
                    '--left-wing-first-x': 50,
                    '--left-wing-first-y': 100,
                    '--right-wing-second-x': 50,
                    '--right-wing-second-y': 100,
                    duration: .2,
                    onComplete() {
                        gsap.set(button, {
                            '--left-wing-first-y': 0,
                            '--left-wing-second-x': 40,
                            '--left-wing-second-y': 100,
                            '--left-wing-third-x': 0,
                            '--left-wing-third-y': 100,
                            '--left-body-third-x': 40,
                            '--right-wing-first-x': 50,
                            '--right-wing-first-y': 0,
                            '--right-wing-second-x': 60,
                            '--right-wing-second-y': 100,
                            '--right-wing-third-x': 100,
                            '--right-wing-third-y': 100,
                            '--right-body-third-x': 60
                        })
                    }
                }, {
                    '--left-wing-third-x': 20,
                    '--left-wing-third-y': 90,
                    '--left-wing-second-y': 90,
                    '--left-body-third-y': 90,
                    '--right-wing-third-x': 80,
                    '--right-wing-third-y': 90,
                    '--right-body-third-y': 90,
                    '--right-wing-second-y': 90,
                    duration: .2
                }, {
                    '--rotate': 50,
                    '--left-wing-third-y': 95,
                    '--left-wing-third-x': 27,
                    '--right-body-third-x': 45,
                    '--right-wing-second-x': 45,
                    '--right-wing-third-x': 60,
                    '--right-wing-third-y': 83,
                    duration: .25
                }, {
                    '--rotate': 55,
                    '--plane-x': -8,
                    '--plane-y': 24,
                    duration: .2
                }, {
                    '--rotate': 40,
                    '--plane-x': 45,
                    '--plane-y': -180,
                    '--plane-opacity': 0,
                    duration: .3,
                    onComplete() {
                        setTimeout(() => {
                            button.removeAttribute('style');
                            gsap.fromTo(button, {
                                opacity: 0,
                                y: -8
                            }, {
                                opacity: 1,
                                y: 0,
                                clearProps: true,
                                duration: .3,
                                onComplete() {
                                    button.classList.remove('active');
                                }
                            })
                        }, 2000)
                    }
                }]
            })

            gsap.to(button, {
                keyframes: [{
                    '--text-opacity': 0,
                    '--border-radius': 0,
                    '--left-wing-background': getVar('--primary-darkest'),
                    '--right-wing-background': getVar('--primary-darkest'),
                    duration: .1
                }, {
                    '--left-wing-background': getVar('--primary'),
                    '--right-wing-background': getVar('--primary'),
                    duration: .1
                }, {
                    '--left-body-background': getVar('--primary-dark'),
                    '--right-body-background': getVar('--primary-darkest'),
                    duration: .4
                }, {
                    '--success-opacity': 1,
                    '--success-scale': 1,
                    duration: .25,
                    delay: .25
                }]
            })

            }
        }




