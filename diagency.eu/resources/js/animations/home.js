
function changeServiceBlop(){
    let randomValue = Math.floor(Math.random() * 3);
    
    document.getElementById("morphtest").classList.remove("morphtest-1");
    document.getElementById("morphtest").classList.remove("morphtest-2");
    document.getElementById("morphtest").classList.remove("morphtest-3");

    
    document.getElementById("morphtest").classList.add("morphtest-"+randomValue);
}

let serviceBlobIndex=0;

let serviceSliderBtns = document.querySelectorAll(".slider-service-btn");
serviceSliderBtns.forEach(button => {
    button.addEventListener("click",e=>{
        for(i=0;i<serviceSliderBtns.length;i++){
            serviceSliderBtns[i].classList.remove("active");
        }

        setService(e.target.dataset.service);
        e.target.classList.add("active");

        if(serviceBlobIndex+1>2){
            serviceBlobIndex=0;
        }
        else{
            serviceBlobIndex++;
        }
  
        document.getElementById("service-blob-mask").removeAttribute("class");
        document.getElementById("service-blob-mask").classList.add("service-blob-"+serviceBlobIndex);

        document.getElementById("service-blob").removeAttribute("class");

        document.getElementById("service-blob").classList.add("service-blob-"+serviceBlobIndex);


        setService(e.target.dataset.service);


    })
});

function setService(id){
    let servicesClass = document.querySelectorAll(".service-container");
    servicesClass.forEach(element => {
        element.classList.remove("service-active");
    });

    document.getElementById("service-container-"+id).classList.add("service-active");
}







let clientBlobIndex = 0;
let clientSliderButtons = document.querySelectorAll(".clients-slider-element");


clientSliderButtons.forEach(button => {
    button.addEventListener("click",e=>{
        let clientId = e.target.dataset.clientId;
        setClientPage(clientId);
        if(clientBlobIndex+1>2){
            clientBlobIndex=0;
        }
        else{
            clientBlobIndex++;
        }

        document.getElementById("client-blob").removeAttribute("class");
        document.getElementById("client-blob").classList.add("client-blob-"+clientBlobIndex);
    })
});

function setClientPage(id){
    console.log(id);
}








window.onload = function() {startAnimationsFunction()};

function startAnimationsFunction(){
    heroAnimations();
    
}

window.onscroll = function() {homeScrollAnimations();};

function heroAnimations(){
    var textWrapper = document.querySelector('#hero-text-we');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    var textWrapper = document.querySelector('#hero-text-are');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: false})
    .add({
        targets: "#hero-text-we",
        scaleX: [0,1],
        duration: 4000,
        delay: 500
    })

    setTimeout(() => {
        anime.timeline({loop: false})
        .add({
            targets: '#hero-text-we .letter',
            rotateY: [-90, 0],
            duration: 2300,
            delay: (el, i) => 200 * i
        })
        setTimeout(() => {
            anime.timeline({loop: false})
            .add({
                targets: '#hero-text-are .letter',
                rotateX: [-90, 0],
                duration: 2300,
                delay: (el, i) => 200 * i
            });
            setTimeout(() => {
                anime.timeline({loop:false})
                .add({
                    targets: '.hero-img',
                    scaleX: [0,1],
                    duration: 1000,
                    easing: 'easeInOutQuart'

                })
                .add({
                    targets: ".hero-img img",
                    opacity: [0,1],
                    duration:2000,
                })
                setTimeout(() => {
                    anime.timeline({loop:false})
                    .add({
                        targets: '#scroll-down-btn',
                        translateY: [-100, 0],
                        opacity: [0,1],
                        duration: 2000
                    })
                }, 500);
            }, 500);
        }, 600);
        
    }, 1000);
    
}


let aboutUsSectionAnim = false, servicesSectionAnim = false, portfolioSectionAnim = false, platformsSectionAnim = false, portfolioDigitalSectionAnim = false, clientsSectionAnim = false, contactSectionAnim = false, platformsSectionContainerAnim = false, mapSectionAnim = false;


function homeScrollAnimations(){
    console.log("no scroll animations yet");

    

    let aboutUsSection = document.getElementById("about-us");
    let servicesSection = document.getElementById("services-header-text");
    let portfolioSection = document.getElementById("portfolio");
    let platformsSection = document.getElementById("platforms-heading");
    let portfolioDigitalSection = document.getElementById("marketing-portfolio-heading");
    let clientsSection = document.getElementById("clients-heading");
    let contactSection = document.getElementById("contact-heading");
    let platformsSectionContainer = document.getElementById("platforms-container");
    let mapSection = document.getElementById("map-heading");

    if(isInViewPort(aboutUsSection) && aboutUsSectionAnim != true){

        
        
        anime.timeline({loop:false})
        .add({
            targets: "#about-us-heading",
            scaleX: [0,1],
            duration:0
        })
        .add({
            targets: "#about-us-heading-text .letter",
            translateY: [-100,0],
            easing: "easeOutExpo",
            duration: 1400,
            delay: (el, i) => 30 * i
        })
            

        anime.timeline({loop:false}).add({
            targets: '#about-us-html .black-pixel',
            translateX: [50,0],
            easing: 'cubicBezier(.5, .05, .1, .3)',
            opacity: 1,
            delay: anime.stagger(200, {grid: [15, 100], from: 599})
        })


        setTimeout(() => {
            anime.timeline({loop:false})
            .add({
                targets: '#about-us .texting p',
                translateY: [100, 0],
                duration: 1000,
                opacity: [0,1],
                easing: "easeOutExpo",
                delay: (el, i) => 200 * i
            })
        }, 500);

        

        


        aboutUsSectionAnim=true;   


    }

    if(isInViewPort(servicesSection) && servicesSectionAnim != true){

        console.log("services");
        
        anime.timeline({loop:false})
        .add({
                targets: "#services-header-text .letter",
                translateY: [-100,0],
                easing: "easeOutExpo",
                duration: 1400,
                delay: (el, i) => 30 * i
            })

            anime.timeline({loop:false}).add({
                targets: '#expertise-html .black-pixel',
                translateX: [-50,0],
                easing: 'cubicBezier(.5, .05, .1, .3)',
                opacity: 1,
                delay: anime.stagger(100, {grid: [15, 100], from: 600})
            })
            servicesSectionAnim=true;   
    }

    if(isInViewPort(mapSection) && mapSectionAnim != true){
        
            anime.timeline({loop:false})
            .add({
                targets: "#map-heading-text-2 .letter",
                translateY: [-100,0],
                easing: "easeOutExpo",
                duration: 1400,
                delay: (el, i) => 30 * i
            })
            setTimeout(() => {
                anime.timeline({loop:false})
                .add({
                    targets: "#map-heading-text-1 .letter",
                    translateY: [-100,0],
                    easing: "easeOutExpo",
                    duration: 1400,
                    delay: (el, i) => 30 * i
                })
            }, 500);

            setTimeout(() => {
                anime.timeline({loop:false})
            .add({
                targets: "#romania",
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 300
            })
            .add({
                targets: "#france",
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 300,
                delay:150
            })
            .add({
                targets: "#spain",
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 300,
                delay:150
            })
            .add({
                targets: "#germany",
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 300,
                delay:150
            })
            .add({
                targets: "#denmark",
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 300,
                delay:150
            })
            .add({
                targets: "#finland",
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 300,
                delay:150
            })
            .add({
                targets: "#sweden",
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 300,
                delay:150
            })
            .add({
                targets: "#hungary",
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 300,
                delay:150
            })
            .add({
                targets: "#slovakia",
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 300,
                delay:150
            })
            .add({
                targets: "#czech",
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 300,
                delay:150
            })
            .add({
                targets: "#poland",
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 300,
                delay:150
            })
            .add({
                targets: "#netherlands",
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 300,
                delay:150
            })
            }, 1000);
            


        
        mapSectionAnim=true;   
    }


    if(isInViewPort(portfolioSection) && portfolioSectionAnim != true){
        
        anime.timeline({loop:false})
        .add({
            targets: "#portfolio-heading",
            scaleX: [0,1],
            duration:00
        })
        .add({
            targets: "#portfolio-heading-text .letter",
            translateY: [-100,0],
            easing: "easeOutExpo",
            duration: 1400,
            delay: (el, i) => 30 * i
        })

    
            
        
        portfolioSectionAnim=true;   
    }
    if(isInViewPort(platformsSection) && platformsSectionAnim != true){
        
        anime.timeline({loop:false})
        .add({
            targets: "#platforms-heading",
            scaleX: [0,1],
            duration:1500
        })

        setTimeout(() => {
            anime.timeline({loop:false})
            .add({
                targets: "#platforms-heading-text .letter",
                translateY: [-100,0],
                easing: "easeOutExpo",
                duration: 1400,
                delay: (el, i) => 30 * i
            })
        }, 500);
        platformsSectionAnim=true;   
    }

    if(isInViewPort(portfolioDigitalSection) && portfolioDigitalSectionAnim != true){
        
        anime.timeline({loop:false})
        .add({
            targets: "#marketing-portfolio-heading",
            scaleX: [0,1],
            duration:1500
        })

        setTimeout(() => {
            anime.timeline({loop:false})
            .add({
                targets: "#marketing-portfolio-heading-text-2 .letter",
                translateY: [-100,0],
                easing: "easeOutExpo",
                duration: 1400,
                delay: (el, i) => 30 * i
            })
            setTimeout(() => {
                anime.timeline({loop:false})
                .add({
                    targets: "#marketing-portfolio-heading-text-1 .letter",
                    translateY: [-100,0],
                    easing: "easeOutExpo",
                    duration: 1400,
                    delay: (el, i) => 30 * i
                })
            }, 500);
        }, 500);
        portfolioDigitalSectionAnim=true;   
    }
    
    if(isInViewPort(clientsSection) && clientsSectionAnim != true){
        
        
        
            anime.timeline({loop:false})
            .add({
                targets: "#clients-heading-text-2 .letter",
                translateY: [-100,0],
                easing: "easeOutExpo",
                duration: 1400,
                delay: (el, i) => 30 * i
            })
            setTimeout(() => {
                anime.timeline({loop:false})
                .add({
                    targets: "#clients-heading-text-1 .letter",
                    translateY: [-100,0],
                    easing: "easeOutExpo",
                    duration: 1400,
                    delay: (el, i) => 30 * i
                })
            }, 500);
       
        clientsSectionAnim=true;   
    }

    if(isInViewPort(contactSection) && contactSectionAnim != true){
        
        anime.timeline({loop:false})
        .add({
            targets: "#contact-heading-text .letter",
            translateY: [-100,0],
            easing: "easeOutExpo",
            duration: 1400,
            delay: (el, i) => 30 * i
        })
    
        contactSectionAnim=true;   
    }

    if(isInViewPort(platformsSectionContainer) && platformsSectionContainerAnim != true){
        anime.timeline({loop:false})
        .add({
            targets:".platform-box img",
            translateY: [500,0],
            easing: "easeOutExpo",
            duration: 1400,
            delay: (el, i) => 100 * i
        })
        platformsSectionContainerAnim=true;
    }

}




// // Get the an HTML element
// var element = document.querySelector('<a selector>');

// // Get its bounding client rectangle
// var bounding = element.getBoundingClientRect();

function isInViewPort(element) {
    // Get the bounding client rectangle position in the viewport
    var bounding = element.getBoundingClientRect();

    // Checking part. Here the code checks if it's *fully* visible
    // Edit this part if you just want a partial visibility
    if (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
        // console.log('In the viewport! :)');
        return true;
    } else {
        // console.log('Not in the viewport. :(');
        return false;
    }
}

// window.addEventListener('scroll', function (event) {
//     if (isInViewport(theElementToWatch)) {
//       // update the element display
//     }
// }, false);

var textWrapper = document.querySelector('#about-us-heading-text');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
textWrapper = document.querySelector('#services-header-text');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
textWrapper = document.querySelector('#portfolio-heading-text');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
textWrapper = document.querySelector('#platforms-heading-text');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

textWrapper = document.querySelector('#marketing-portfolio-heading-text-1');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
textWrapper = document.querySelector('#marketing-portfolio-heading-text-2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

textWrapper = document.querySelector('#clients-heading-text-1');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
textWrapper = document.querySelector('#clients-heading-text-2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

textWrapper = document.querySelector('#map-heading-text-1');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
textWrapper = document.querySelector('#map-heading-text-2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");


textWrapper = document.querySelector('#contact-heading-text');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");