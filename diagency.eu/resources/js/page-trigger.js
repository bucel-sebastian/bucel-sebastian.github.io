let pageIndex = 1;
let scrollTimeout = 0;

let homeBtn = document.getElementById("home-btn");
let aboutBtn = document.getElementById("about-us-btn");
let portofolioBtn = document.getElementById("portofolio-btn");
let platformsBtn = document.getElementById("platforms-btn");
let contactBtn = document.getElementById("contact-btn");
let loginBtn = document.getElementById("login-menu-btn");

let scrollDownBtn = document.getElementById("scroll-down-btn");




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

// Set page

function setPage(page) {
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


// menu buttons events

homeBtn.addEventListener("click", () => {
    console.log("merge");
    if (scrollTimeout != 1) {
        scrollTimeout = 1;
        pageIndex = 1;
        setPage(pageIndex);
        toggleMenu();
        setTimeout(() => {
            scrollTimeout = 0;
        }, 1000);
    }
}, false);

aboutBtn.addEventListener("click", () => {
    if (scrollTimeout != 1) {
        scrollTimeout = 1;
        pageIndex = 2;
        setPage(pageIndex);
        toggleMenu();
        setTimeout(() => {
            scrollTimeout = 0;
        }, 1000);
    }
}, false);

portofolioBtn.addEventListener("click", () => {
    if (scrollTimeout != 1) {
        scrollTimeout = 1;
        pageIndex = 3;
        setPage(pageIndex);
        toggleMenu();
        setTimeout(() => {
            scrollTimeout = 0;
        }, 1000);
    }
}, false);

platformsBtn.addEventListener("click", () => {
    if (scrollTimeout != 1) {
        scrollTimeout = 1;
        pageIndex = 4;
        setPage(pageIndex);
        toggleMenu();
        setTimeout(() => {
            scrollTimeout = 0;
        }, 1000);
    }
}, false);

contactBtn.addEventListener("click", () => {
    if (scrollTimeout != 1) {
        scrollTimeout = 1;
        pageIndex = 5;
        setPage(pageIndex);
        toggleMenu();
        setTimeout(() => {
            scrollTimeout = 0;
        }, 1000);
    }
}, false);

loginBtn.addEventListener("click touchstart", () => {
    if (scrollTimeout != 1) {
        scrollTimeout = 1;
        pageIndex = 7;
        setPage(pageIndex);
        toggleMenu();
        setTimeout(() => {
            scrollTimeout = 0;
        }, 1000);
    }
}, false);

// Scroll Down Button

scrollDownBtn.addEventListener("click", () => {
    if (scrollTimeout != 1) {
        scrollTimeout = 1;
        if (pageIndex < 7) {
            pageIndex++;
            setPage(pageIndex);
        }
        else {
            pageIndex = 7;
            setPage(pageIndex);
        }
        setTimeout(() => {
            scrollTimeout = 0;
        }, 1000);
    }
})


// Check Scroll

function checkScroll(event) {
    var y = event.deltaY;
    if (scrollTimeout != 1) {
        scrollTimeout = 1;
        if (y > 0) {
            scrollDown();
            setTimeout(() => {
                scrollTimeout = 0;
            }, 1000);
        }
        else {
            scrollUp();
            setTimeout(() => {
                scrollTimeout = 0;
            }, 1000);
        }
    }
}

// Scroll up / down

function scrollDown() {
    if (pageIndex < 7) {
        pageIndex++;
        setPage(pageIndex);
    }
    else {
        pageIndex = 7;
        setPage(pageIndex);
    }
}

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


// Touch Events

document.body.addEventListener("touchstart", e => {
    touchStartY = e.changedTouches[0].screenY;
}, false);

document.body.addEventListener("touchend", e => {
    touchEndY = e.changedTouches[0].screenY;

    if (scrollTimeout != 1) {
        scrollTimeout = 1;
        touchGesture(touchStartY, touchEndY);
        setTimeout(() => {
            scrollTimeout = 0;
        }, 1000);
    }

}, false);

function touchGesture(yStart, yEnd) {
    if (yStart > yEnd) {
        if (pageIndex < 7) {
            pageIndex++;
            setPage(pageIndex);
        }
        else {
            pageIndex = 7;
            setPage(pageIndex);
        }
    }
    if (yStart < yEnd) {
        if (pageIndex > 1) {
            pageIndex--;
            setPage(pageIndex);
        }
        else {
            pageIndex = 1;
            setPage(pageIndex);
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