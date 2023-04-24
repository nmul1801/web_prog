const nameDiv = document.getElementById("txtNameId");
const emailDiv = document.getElementById("txtEmailId");
const phoneDiv = document.getElementById("txtPhoneId");
const dateDiv = document.getElementById("txtMessageId");
const submitBtn = document.getElementById("formSubmit");

function validName() {
    const name = nameDiv.value;
    if (name) {
        return true;
    }
    return false;
}

function validEmail() {
    const email = emailDiv.value;
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.match(regex)) {
        return true; 
    }
    return false; 
}

function validMessage() {
    const message = document.getElementById("txtMessageId").value;
    if (message === "") {
        return false;
    }
    return true;
}

function validPhone() {
    const phone = Array.from(phoneDiv.value);
    phone_length = 0;
    if (phone) {
        phone.forEach(c => {
            if (!isNaN(c)) {
                phone_length += 1;
            }
        });
    }

    if (phone_length != 10 && phone_length != 7) {
        return false;
    }
    return true;
}

function handleFormSubmit() {
    if (!validName()) {
        alert("ERROR: Please enter your name")
    } else if (!validEmail()) {
        alert("ERROR: Email address isn't valid")
    } else if (!validPhone()) {
        alert("ERROR: Your phone number must include 7 or 10 digits")
    } else if (!validMessage()) {
        alert("ERROR: Please enter a message")
    } else {
        alert("Thank you, we will get back to you soon!")
    }

}

submitBtn.onclick = handleFormSubmit;
console.log("hi");