
function pageStart() {
    document.getElementById("page-loader").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("page-loader").style.display = "none";
        document.getElementById("page-loader-icon").style.animation = "none";
    }, 500)
    document.getElementById("scroll-down-btn").style.bottom = "50px";
    setTimeout(() => {
        document.getElementById("scroll-down-cirlce").style.transform = "scale(1)";

    }, 300)
}