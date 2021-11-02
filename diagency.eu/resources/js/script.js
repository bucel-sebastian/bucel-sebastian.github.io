var langswitch = 0;

function langSwitcher() {
    if (langswitch === 0) {
        langswitch = 1;
        console.log(langswitch);
        document.getElementById("language-dropdown").classList.toggle("language-dropdown-active");
        document.getElementById("language-dropdown").style.display = "block";
        setTimeout(() => {
            document.getElementById("language-dropdown-li-1").classList.toggle("language-dropdown-li-active");
            setTimeout(() => {
                document.getElementById("language-dropdown-li-2").classList.toggle("language-dropdown-li-active");
                setTimeout(() => {
                    document.getElementById("language-dropdown-li-3").classList.toggle("language-dropdown-li-active");
                }, 100);
            }, 100);
        }, 50);
    }
    else {
        langswitch = 0;
        console.log(langswitch);
        document.getElementById("language-dropdown").classList.toggle("language-dropdown-active");
        document.getElementById("language-dropdown").style.display = "none";
        setTimeout(() => {
            document.getElementById("language-dropdown-li-1").classList.toggle("language-dropdown-li-active");
            setTimeout(() => {
                document.getElementById("language-dropdown-li-2").classList.toggle("language-dropdown-li-active");
                setTimeout(() => {
                    document.getElementById("language-dropdown-li-3").classList.toggle("language-dropdown-li-active");
                }, 100);
            }, 100);
        }, 50);

    }
}

function changeLanguage(x) {
    if (x === 1) {
        window.location.href = "";
    }
    if (x === 2) {
        window.location.href = "ro/";
    }
    if (x === 3) {
        window.location.href = "fr/";
    }
}

function toggleMenu() {

    if (document.getElementById("language-dropdown").classList.contains("language-dropdown-active")) {
        langSwitcher();
    }

    document.getElementById("menu").classList.toggle("change");
    document.getElementById("main-menu").classList.toggle("change-main-menu");
    document.getElementById("main-menu-nav").classList.toggle("change-main-menu-nav")
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

