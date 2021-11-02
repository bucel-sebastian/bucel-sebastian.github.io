

function toggleMenu() {
    document.getElementById("menu").classList.toggle("inactive-animation");
    document.getElementById("menu").classList.toggle("active-animation");
    document.getElementById("menu").classList.toggle("change");
    document.getElementById("main-menu").classList.toggle("change-main-menu");
    document.getElementById("main-menu-border-1").classList.toggle("activeBorder");
    setTimeout(() => {
        document.getElementById("main-menu-border-2").classList.toggle("activeBorder");
        document.getElementById("main-menu-li-a-1").classList.toggle("activeLink");
        setTimeout(() => {
            document.getElementById("main-menu-border-3").classList.toggle("activeBorder");
            document.getElementById("main-menu-li-a-2").classList.toggle("activeLink");
            setTimeout(() => {
                document.getElementById("main-menu-border-4").classList.toggle("activeBorder");
                document.getElementById("main-menu-li-a-3").classList.toggle("activeLink");
                setTimeout(() => {
                    document.getElementById("main-menu-border-5").classList.toggle("activeBorder");
                    document.getElementById("main-menu-li-a-4").classList.toggle("activeLink");
                    setTimeout(() => {
                        document.getElementById("main-menu-li-a-5").classList.toggle("activeLink");
                        setTimeout(() => {
                            document.getElementById("main-menu-li-a-6").classList.toggle("activeLink");

                        }, 100);
                    }, 100);
                }, 100);
            }, 100);
        }, 100);
    }, 100);
}

