let contactForm = document.querySelector("#contact-form");

contactForm.addEventListener("submit", e => {
    e.preventDefault();
    if (document.querySelector("#GDPR").checked) {
        console.log("checked");

        const data = new URLSearchParams();

        for (const p of new FormData(contactForm)) {
            data.append(p[0], p[1]);
        }

        fetch('contact-form.php', {
            method: "POST",
            body: data
        }).then(response => response.text()).then(response => {
            contactForm.reset();
            gdprCheckBox();
            console.log(response);
            contactFormSucces();
        }).catch(error => {
            console.log(error);
            contactFormFail();
        });
    }
    else {
        gdprNotChecked()
    }

})


function gdprCheckBox() {
    document.getElementById("gdpr-inner-checkbox").classList.toggle("gdpr-checked");
    document.getElementById("GDPR").toggleAttribute("checked");
}

function gdprNotChecked() {
    document.getElementById("")

}

function contactFormSucces() {
    document.getElementById("contact-form-success").style.transform = "translate(0)";
}

function contactFormFail() {
    document.getElementById("contact-form-fail").style.transform = "translate(0)";
}