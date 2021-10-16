var header = document.getElementById("header");
var sticky = header.offsetTop;
var heroSection = document.getElementById("heroSection");
var mainNavListLink = document.querySelectorAll(".mainNavListLink");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {

    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    }
    else {
        header.classList.remove("sticky");
    }

    if (document.body.scrollTop > heroSection.offsetHeight - 300 || document.documentElement.scrollTop > heroSection.offsetHeight - 300) {
        header.style.backgroundColor = "#fff";
        header.classList.add("transformHeader");
        for (i = 0; i < mainNavListLink.length; i++) {
            mainNavListLink[i].style.color = "#232323";
        }
    }
    else {
        header.style.backgroundColor = "transparent";
        header.classList.remove("transformHeader");
        for (i = 0; i < mainNavListLink.length; i++) {
            mainNavListLink[i].style.color = "#fff";
        }
    }

}