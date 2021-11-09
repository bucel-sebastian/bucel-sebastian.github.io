
function pageStart() {
    document.getElementById("page-loader").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("page-loader").style.display = "none";
        document.getElementById("page-loader-icon").style.animation = "none";
    }, 500)

}