const nameDiv = document.getElementById("txtNameId");
const emailDiv = document.getElementById("txtEmailId");
const phoneDiv = document.getElementById("txtPhoneId");
const dateDiv = document.getElementById("eventDate");
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

function validDate() {
    const mealDate = new Date(document.getElementById("eventDate").value);
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    if (mealDate < nextWeek) {
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
    } else if (!validDate()) {
        alert("ERROR: Your meal must be scheduled at least one week in advance")
    } else {
        alert("Thank you, your tasting has been booked!")
    }

}

submitBtn.onclick = handleFormSubmit;
console.log("hi")