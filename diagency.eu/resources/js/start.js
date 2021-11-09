
function pageStart() {
    document.getElementById("page-loader").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("page-loader").style.display = "none";
        document.getElementById("page-loader-icon").style.animation = "none";
    }, 500)

    if (document.getElementById("scroll-down-circle-2")) {
        setTimeout(() => {
            document.getElementById("scroll-down-circle-2").style.strokeDashoffset = "800";
            document.getElementById("scroll-down-cirlce").style.transform = "scale(1)";

        }, 300)
    }

}