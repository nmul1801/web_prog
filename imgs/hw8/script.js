selectors = []

function confirm_date() {
    const cur_date = new Date()
    console.log(cur_date.getMinutes())
    console.log(cur_date.getHours())

    // can't serve before 8PM, or after 2:30AM
    if (cur_date.getHours() < 20) return false
    if (cur_date.getHours() > 2 && cur_date.getMinutes() > 30) return false

    return true
}

function validate_order() {
    // check for name
    if (!$('input[name="fname"]').val() || !$('input[name="lname"]').val()) {
        alert("Please provide your first and last name to complete the order")
        return false
    }

    // if (!confirm_date()) {
    //     alert("Orders must be placed between open hours, and prior to 30 minutes before closed. Sorry!")
    //     return false
    // }
    
    // check for ordering at least one item
    for (let i = 0; i < selectors.length; i++){
        if (selectors[i].val() != 0) {
            return true
        }
    }

    alert("Please order at least one item to complete the order")
    return false
}

function sub_form() {
    
    if (validate_order()) {
        console.log("form is submitted")
    }
}

$(document).ready(function() {

    // get selectors and inputs for cost
    for (i = 1; i <= 8; i++) {
        selectors.push($("form[name='order-form'] select[name='quan" + i + "']"))
        // cost_each_arr.push(menuItems[i].cost)
    }
    console.log(selectors)
})
