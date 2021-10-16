var pageLoader = document.getElementById("pageLoader");

function pageLoaded() {
    pageLoader.style.opacity = "0";
    setTimeout(() => {
        pageLoader.style.display = "none";
    }, 500);
}