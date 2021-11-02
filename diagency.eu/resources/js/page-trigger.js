
var pageIndex = 1;


function setPage(page) {
    if (page === 1) {
        page1();
    }
    if (page === 2) {
        page2();
    }
    if (page === 3) {
        page3();
    }
}



function btnAps(x) {
    if (x === 1) {
        pageIndex = 1;
        page1();
        console.log("home");
    }
    else if (x === 2) {
        pageIndex = 2;
        page2();
        console.log("about us");
    }
    else if (x === 3) {
        pageIndex = 3;
        page3();
        console.log("portofolio");
    }
    else if (x === 4) {
        pageIndex = 4;
        page4();
        console.log("platforms");
    }
    else if (x === 5) {
        pageIndex = 5;
        page5();
        console.log("contact");
    }
    else if (x === 6) {
        pageIndex = 6;
        page6();
        console.log("login");
    }
    toggleMenu();
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
    if (pageIndex < 6) {
        pageIndex++;
        setPage(pageIndex);
    }
    else {
        pageIndex = 6;
        setPage(pageIndex);
    }
}

function checkScroll(event) {
    var y = event.deltaY;
    if (y > 0) {
        scrollDown();
    }
    else {
        scrollUp();
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
    if (touchEndY < touchStartY) {
        console.log("down");
        if (pageIndex < 6) {
            pageIndex++;
            setPage(pageIndex);
        }
        else {
            pageIndex = 6;
            setPage(pageIndex);
        }
    }
    if (touchEndY > touchStartY) {
        console.log("up");
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



var page2full = document.getElementById("page-2-full");


// var page2right = document.getElementById("page-2-right");
// var page2left = document.getElementById("page-2-left");
// var page2right1 = document.getElementById("page-2-right-1");
// var page2right2 = document.getElementById("page-2-right-2");

// var page3top = document.getElementById("page-3-top");
// var page3bottom = document.getElementById("page-3-bottom");


function page1() {

    page2full.style.transform = "translateY(100%)";
    document.getElementById("page-2-anim-1").style.transform = "translateY(-20%)";
    document.getElementById("page-2-anim-1").style.opacity = "0";
    document.getElementById("page-2-anim-2").style.transform = "translateY(-20%)";
    document.getElementById("page-2-anim-2").style.opacity = "0";
    // page3top.style.transform = "translateX(100%)";
    // page3bottom.style.transform = "translateX(-100%)";


    // page2left.style.transform = "translateX(-100%)";

    // page2right1.style.transform = "translateY(-100%)";
    // page2right2.style.transform = "translateY(100%)";

    // setTimeout(() => {
    //     page2right.style.transform = "translateX(100%)";
    // }, 500);

}

function page2() {
    page2full.style.transform = "translateY(0)";

    setTimeout(() => {
        document.getElementById("page-2-anim-1").style.transform = "translateY(0)";
        document.getElementById("page-2-anim-1").style.opacity = "1";
        setTimeout(() => {
            document.getElementById("page-2-anim-2").style.transform = "translateY(0)";
            document.getElementById("page-2-anim-2").style.opacity = "1";
        }, 150);
    }, 400)


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