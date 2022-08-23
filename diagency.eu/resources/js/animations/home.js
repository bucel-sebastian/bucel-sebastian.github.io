
points = [	
    { value: 'M69.24,585.24c11,47,40.84,167.75,144,268.23,40.35,39.31,107.17,90.36,291.31,141,123.73,34,339.41,90.94,633.39,56.68,153.87-17.94,335.89-41.28,518.12-166.59,77.78-53.49,171.91-120.19,216-247.06,8.79-25.3,51.72-157.66-9.88-302.12-47.49-111.35-133.8-172.2-170.83-194.82C1487.74,16.12,1344.63,173.86,988.29,149,665.75,126.5,585.08-16.56,355.82,55.82c-49.52,15.64-194,63.65-267.6,204C22.19,385.71,53.07,516.09,69.24,585.24Z' },
        { value: 'M138.41,568.29c47.49,158,3.12,208.63,53.65,296.47,71.43,124.19,235.83,154.59,300.7,166.59,256.06,47.36,314-96.87,626.83-117.17,303.35-19.7,407.92,105.64,566.12,5.64,131-82.77,175.11-241.87,186.35-282.35,16.89-60.87,52.5-189.14-9.88-302.12-38.26-69.29-102.94-113.91-255.53-169.41C1331.81,66,1097,49.05,1017.94,44.53,658.06,23.94,435.87,83.78,367.12,103.82,226.18,144.9,55.49,196.75,33.94,305.71,19.15,380.49,89.66,406.11,138.41,568.29Z' },
        { value: 'M45.24,606.41C64.48,797,80,950.42,182.18,1004.53c104.3,55.22,187.62-51.86,420.7-84.71,155-21.84,180.66,16.71,536.47,66.36,367.74,51.31,588.13,80,640.94-12.71,50-87.73-105.22-187.35-62.11-360,35.16-140.83,160.59-163.36,160.94-275.29.41-136.11-184.64-236.07-194.83-241.42-204.56-107.41-319.64,38.41-662.11,11.3C761,87.38,729.6-5.23,475.84,9.8c-124.3,7.36-269.27,15.94-364.25,120.85C8.67,244.31,24.83,404.36,45.24,606.41Z' },
];
let lastPoints='M69.24,585.24c11,47,40.84,167.75,144,268.23,40.35,39.31,107.17,90.36,291.31,141,123.73,34,339.41,90.94,633.39,56.68,153.87-17.94,335.89-41.28,518.12-166.59,77.78-53.49,171.91-120.19,216-247.06,8.79-25.3,51.72-157.66-9.88-302.12-47.49-111.35-133.8-172.2-170.83-194.82C1487.74,16.12,1344.63,173.86,988.29,149,665.75,126.5,585.08-16.56,355.82,55.82c-49.52,15.64-194,63.65-267.6,204C22.19,385.71,53.07,516.09,69.24,585.24Z';

// var morph1 = anime({
//     targets: '.morphtest',
//     d:[{value: points[0].value}],
//     duration:5000,
//     autoplay:true,
//     delay:1000,
//     // elasticity:100,
//     // loop:true
// })


function changeServiceBlop(){
    let randomValue = Math.floor(Math.random() * 3);
    
    console.log(randomValue);
    // var morph1 = anime({
    //     targets: '.morphtest',
    //     d:[{value:points[randomValue].value}],
    //     duration:1000,
    //     // autoplay:true,
    //     // delay:1000,
    //     // elasticity:100,
    //     // loop:true
    // })
    // lastPoints=points[randomValue].value;

    var tween = KUTE.to('#morphtest', { path: randomValue }).start();

    // gsap.to("#morphtest",{morphSVG:randomValue,duration:1});
}



let serviceSliderBtns = document.querySelectorAll(".slider-service-btn");
serviceSliderBtns.forEach(button => {
    button.addEventListener("click",e=>{
        for(i=0;i<serviceSliderBtns.length;i++){
            serviceSliderBtns[i].classList.remove("active");
        }
        e.target.classList.add("active");
        changeServiceBlop();
    })
});















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


let aboutUsSectionAnim = false, servicesSectionAnim = false, portfolioSectionAnim = false, platformsSectionAnim = false, portfolioDigitalSectionAnim = false, clientsSectionAnim = false, contactSectionAnim = false;


function homeScrollAnimations(){
    console.log("no scroll animations yet");

    

    let aboutUsSection = document.getElementById("about-us");
    let servicesSection = document.getElementById("services-header-text");
    let portfolioSection = document.getElementById("portfolio");
    let platformsSection = document.getElementById("platforms-heading");
    let portfolioDigitalSection = document.getElementById("marketing-portfolio-heading");
    let clientsSection = document.getElementById("clients-heading");
    let contactSection = document.getElementById("contact-heading");

    if(isInViewPort(aboutUsSection) && aboutUsSectionAnim != true){
        
        anime.timeline({loop:false})
        .add({
            targets: "#about-us-heading",
            scaleX: [0,1],
            duration:1500
        })

        setTimeout(() => {
            anime.timeline({loop:false})
            .add({
                targets: "#about-us-heading-text .letter",
                translateY: [-100,0],
                easing: "easeOutExpo",
                duration: 1400,
                delay: (el, i) => 30 * i
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
            servicesSectionAnim=true;   
    }


    if(isInViewPort(portfolioSection) && portfolioSectionAnim != true){
        
        anime.timeline({loop:false})
        .add({
            targets: "#portfolio-heading",
            scaleX: [0,1],
            duration:1500
        })

        setTimeout(() => {
            anime.timeline({loop:false})
            .add({
                targets: "#portfolio-heading-text .letter",
                translateY: [-100,0],
                easing: "easeOutExpo",
                duration: 1400,
                delay: (el, i) => 30 * i
            })
        }, 500);
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

textWrapper = document.querySelector('#contact-heading-text');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");