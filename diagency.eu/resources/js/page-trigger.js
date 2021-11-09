
var pageIndex = 1;
let scrollTimeout = 0;


function scrollArrowBlack() {
    document.getElementById("scroll-down-circle-2").style.stroke = "#000000e0";
    document.getElementById("fa-arrow-down").style.color = "#000";
    document.getElementById("fa-arrow-down-clone").style.color = "#000";
}
function scrollArrowWhite() {
    document.getElementById("scroll-down-circle-2").style.stroke = "#ffffffe0";
    document.getElementById("fa-arrow-down").style.color = "#fff";
    document.getElementById("fa-arrow-down-clone").style.color = "#fff";
}

function setPage(page) {
    console.log(pageIndex);
    if (page === 1) {
        home();
    }
    if (page === 2) {
        console.log("empty");
    }
    if (page === 3) {
        console.log("empty");
    }
    if (page === 4) {
        platformsPage();
    }
    if (page === 5) {
        contact1Page();
    }
    if (page === 6) {
        contact2Page();
    }
    if (page === 7) {
        loginPage();
    }
}



function btnAps(x) {
    if (scrollTimeout === 0) {
        scrollTimeout = 1;
        if (x === 1) {
            pageIndex = 1;
            setPage(pageIndex);
            console.log("home");
        }
        else if (x === 2) {
            pageIndex = 2;
            setPage(pageIndex);
            console.log("about us");
        }
        else if (x === 3) {
            pageIndex = 3;
            setPage(pageIndex);
            console.log("portofolio");
        }
        else if (x === 4) {
            pageIndex = 4;
            setPage(pageIndex);

        }
        else if (x === 5) {
            pageIndex = 5;
            setPage(pageIndex);
            console.log("contact");
        }
        else if (x === 6) {
            pageIndex = 7;
            setPage(pageIndex);
            console.log("login");
        }
        toggleMenu();
        setTimeout(() => {
            scrollTimeout = 0;
        }, 700);
    }

}


// SCOLL FUNCTIONS
function scrollUp() {
    if (pageIndex > 1) {
        pageIndex--;
        setPage(pageIndex);
    }
    else {
        pageIndex = 1;
        setPage(pageIndex);
    }
}
function scrollDown() {
    if (pageIndex < 10) {
        pageIndex++;
        setPage(pageIndex);
    }
    else {
        pageIndex = 10;
        setPage(pageIndex);
    }
}

function scrollDownBtn() {
    console.log("scroll down apasat");
    if (scrollTimeout === 0) {
        scrollTimeout = 1;
        scrollDown();
        setTimeout(() => {
            scrollTimeout = 0;
        }, 1000);
    }
}

function checkScroll(event) {
    var y = event.deltaY;
    if (scrollTimeout === 0) {
        if (y > 0) {
            scrollTimeout = 1;

            scrollDown();
            setTimeout(() => {

                scrollTimeout = 0;
            }, 1000);
        }
        else {
            scrollTimeout = 1;

            scrollUp();
            setTimeout(() => {

                scrollTimeout = 0;
            }, 1000);
        }
    }
}

// SCROLL FUNCTONS STOP

document.body.addEventListener("touchstart", e => {
    touchStartY = e.changedTouches[0].screenY;
    console.log("touchend", touchStartY);
}, false);
document.body.addEventListener("touchend", e => {
    touchEndY = e.changedTouches[0].screenY;
    console.log("touchend", touchEndY);

    touchGesture();
}, false);

function touchGesture() {
    if (scrollTimeout === 0) {
        if (touchEndY < touchStartY) {
            console.log("down");
            scrollTimeout = 1;
            if (pageIndex < 10) {
                pageIndex++;
                setPage(pageIndex);
            }
            else {
                pageIndex = 10;
                setPage(pageIndex);
            }
            setTimeout(() => {
                scrollTimeout = 0;
            }, 1000);
        }
        if (touchEndY > touchStartY) {
            console.log("up");
            scrollTimeout = 1;
            if (pageIndex > 1) {
                pageIndex--;
                setPage(pageIndex);
            }
            else {
                pageIndex = 1;
                setPage(pageIndex);
            }
            setTimeout(() => {
                scrollTimeout = 0;
            }, 1000);
        }
    }

}

//////////////// Page Variables ////////////////////////////////

let platforms = document.getElementById("platforms");
let platformsTop = document.getElementById("promoapp-platform");
let platformsBottom = document.getElementById("provBrand-platform");



let contact1 = document.getElementById("contact1");
let contact1Left = document.getElementById("contact1-left");
let contact1RightTop = document.getElementById("contact1-right-top");
let contact1RightBottom = document.getElementById("contact1-right-bottom");



let contact2 = document.getElementById("contact2");
let contact2FullPage = document.getElementById("contact2-full-page");

let login = document.getElementById("login");
let loginFullPage = document.getElementById("login-full-page");



// var page2right = document.getElementById("page-2-right");
// var page2left = document.getElementById("page-2-left");
// var page2right1 = document.getElementById("page-2-right-1");
// var page2right2 = document.getElementById("page-2-right-2");

// var page3top = document.getElementById("page-3-top");
// var page3bottom = document.getElementById("page-3-bottom");


function home() {


    scrollArrowWhite();
    // other pages start

    // Platforms
    platformsTop.style.transform = "translate(100%)";
    platformsBottom.style.transform = "translate(-100%)";

    // Contact 1
    contact1Left.style.transform = "translateX(-100%)";
    contact1RightTop.style.transform = "translateY(-100%)";
    contact1RightBottom.style.transform = "translateY(100%)";

    // Contact 2
    contact2FullPage.style.transform = "translateY(100%)";

    // Login
    loginFullPage.style.transform = "translateY(-100%)";

    // all pages

    setTimeout(() => {
        platforms.style.transform = "translateY(500%)";
        contact1.style.transform = "translateY(500%)";
        contact2.style.transform = "translateY(500%)";
        login.style.transform = "translate(500%)";
    }, 1000);

}



function platformsPage() {

    scrollArrowBlack();


    // other pages start


    // Contact 1
    contact1Left.style.transform = "translateX(-100%)";
    contact1RightTop.style.transform = "translateY(-100%)";
    contact1RightBottom.style.transform = "translateY(100%)";

    // Contact 2
    contact2FullPage.style.transform = "translateY(100%)";

    // Login
    loginFullPage.style.transform = "translateY(-100%)";

    // all pages

    setTimeout(() => {
        contact1.style.transform = "translateY(500%)";
        contact2.style.transform = "translateY(500%)";
        login.style.transform = "translate(500%)";
    }, 1000);


    // other pages end


    platforms.style.transform = "translate(0)";
    platformsTop.style.transform = "translate(0)";
    platformsBottom.style.transform = "translate(0)";

}

function contact1Page() {

    scrollArrowWhite();

    // other pages start

    // Platfomrs
    platforms.style.transform = "translate(0)";
    platformsTop.style.transform = "translate(0)";
    platformsBottom.style.transform = "translate(0)";

    // Contact 2
    contact2FullPage.style.transform = "translateY(100%)";

    // Login
    loginFullPage.style.transform = "translateY(-100%)";


    setTimeout(() => {
        contact2.style.transform = "translateY(500%)";
        login.style.transform = "translate(500%)";
    }, 1000);

    // other pages end

    contact1.style.transform = "translate(0)";
    contact1Left.style.transform = "translate(0)";
    contact1RightTop.style.transform = "translate(0)";
    contact1RightBottom.style.transform = "translate(0)";



}

function contact2Page() {


    // other pages start

    // Platforms
    platforms.style.transform = "translate(0)";
    platformsTop.style.transform = "translate(0)";
    platformsBottom.style.transform = "translate(0)";

    // Contact1
    contact1.style.transform = "translate(0)";
    contact1Left.style.transform = "translate(0)";
    contact1RightTop.style.transform = "translate(0)";
    contact1RightBottom.style.transform = "translate(0)";

    //Login
    loginFullPage.style.transform = "translateY(-100%)";

    setTimeout(() => {
        login.style.transform = "translate(500%)";
    }, 1000);

    // other pages end

    contact2.style.transform = "translate(0)";
    contact2FullPage.style.transform = "translate(0)";

}


function loginPage() {

    //other pages start

    // Platforms
    platforms.style.transform = "translate(0)";
    platformsTop.style.transform = "translate(0)";
    platformsBottom.style.transform = "translate(0)";

    // Contact1
    contact1.style.transform = "translate(0)";
    contact1Left.style.transform = "translate(0)";
    contact1RightTop.style.transform = "translate(0)";
    contact1RightBottom.style.transform = "translate(0)";

    // Contact2
    contact2.style.transform = "translate(0)";
    contact2FullPage.style.transform = "translate(0)";

    // 

    //other pages end


    login.style.transform = "translate(0)";
    loginFullPage.style.transform = "translate(0)";


}
// function page2() {

//     page3top.style.transform = "translateX(100%)";
//     page3bottom.style.transform = "translateX(-100%)";

//     page2right.style.transform = "translateX(0)";
//     page2left.style.transform = "translateX(0)";

//     page2right1.style.transform = "translateY(0)";
//     page2right2.style.transform = "translateY(0)";

// }

// function page3() {

//     page2right.style.transform = "translateX(0)";
//     page2left.style.transform = "translateX(0)";

//     page2right1.style.transform = "translateY(0)";
//     page2right2.style.transform = "translateY(0)";


//     page3top.style.transform = "translateX(0)";
//     page3bottom.style.transform = "translateX(0)";

// }

function page4() {
    console.log("page4");
}
function page5() {
    console.log("page5");
}
function page6() {
    console.log("page6");
}




// Transition 1
// 2 rows each slide left and right
// function pageEnter() {
//     document.getElementById("box1").style.transform = "translateX(0)";
//     document.getElementById("box2").style.transform = "translateX(0)";
// }

// Transition 2
// 2 rows each slide top and bottom
// function pageEnter() {
//     document.getElementById("box1").style.transform = "translateY(0)";
//     document.getElementById("box2").style.transform = "translateY(0)";
// }

// Transition 3
// 2 cols each slide top and bottom
// function pageEnter() {
//     document.getElementById("box1").style.transform = "translateY(0)";
//     document.getElementById("box2").style.transform = "translateY(0)";
// }

// Transition 4
// 2 cols each slide left and right
// function pageEnter() {
//     document.getElementById("box1").style.transform = "translateX(0)";
//     document.getElementById("box2").style.transform = "translateX(0)";
// }

// Transition 5
// 1 row 2 cols 2 rows
function pageEnter2() {
    console.log("empty");
}

// Transition 6
// 1 row 2 cols 2 rows 
// function pageEnter() {
//     document.getElementById("box1").style.transform = "translate(0)";
//     setTimeout(() => {
//         document.getElementById("box2").style.transform = "translate(0)";
//         setTimeout(() => {
//             document.getElementById("box3").style.transform = "translate(0)";
//         }, 100);
//     }, 150);
// }

//Transition 7
//4 boxes

function pageEnter() {
    console.log("empty");
    // document.getElementById("box1").style.transform = "translate(0)";
    // document.getElementById("box2").style.transform = "translate(0)";
    // document.getElementById("box3").style.transform = "translate(0)";
    // document.getElementById("box4").style.transform = "translate(0)";
}