function compute_total(arr) {
    let sum = 0
    arr.forEach(cell => {
        sum += parseFloat(cell.val())
    });
    return sum
}

function create_message(delivery, old_date, selectors, subtot, tax, total, costs_arr) {
    s = "<h1 style='text-align: center; margin-top: 40px;'> Thank you for ordering </h1> <br />"
    s += "<h2 style='text-align: center;'>Order Summary</h2>"

    for (let i = 0; i < selectors.length; i++) {
        if (selectors[i].val() != 0) {
            s += "<p style='text-align: center;'>" + selectors[i].val() + " " + menuItems[i].name + ": $" + costs_arr[i].val() +  "</p>"
        }
    }

    s += "<br /> <h2 style='text-align: center;'>Order Price</h2>"
    s += "<p style='text-align: center;'> Subtotal: $" + subtot + "</p>"
    s += "<p style='text-align: center;'> Tax: $" + tax + "</p>"
    s += "<p style='text-align: center;'> <strong> Total: $" + total.toFixed(2) + "</strong> </p>"

    if (delivery) {
        var new_date_obj = new Date(old_date.getTime() + 45*60000);
    } else {
        var new_date_obj = new Date(old_date.getTime() + 15*60000);
    }

    var min_to_print = ""
    if (new_date_obj.getMinutes() < 10) {
        min_to_print = "0" + new_date_obj.getMinutes()
    } else {
        min_to_print = new_date_obj.getMinutes()
    }
    
    if (new_date_obj.getHours() > 12) {
        s += "<p style='text-align: center;'> Your order will be delivered at: " + (new_date_obj.getHours() - 12) + ":" + min_to_print + "PM </p>"
    } else if (new_date_obj.getHours() == 0){
        s += "<p style='text-align: center;'> Your order will be ready at: 12" + ":" + min_to_print + "AM </p>"
    } else {
        s += "<p style='text-align: center;'> Your order will be ready at: " + new_date_obj.getHours() + ":" + min_to_print + "AM </p>"
    }
    return s
}

function valid(delivering, selectors) {
    // check first name
    if (!$('input[name="lname"]').val()) {
        alert("Please enter your last name to continue")
        return false
    }

    // check last name
    if (delivering) {
        if (!$('input[name="street"]').val() || !$('input[name="city"]').val()) {
            alert("Please fill out the address if you'd like delivery")
            return false
        }
    }

    let phone_num = $('input[name="phone"]').val()
    let num_count = 0

    //check phone num
    for (let i = 0; i < phone_num.length; i++) {
        if (phone_num[i] >= '0' && phone_num[i] <= '9') {
            num_count += 1
        }
    }

    if (num_count != 7 && num_count != 10){
        alert("Please enter a valid phone number")
        return false
    }

    // check for ordering at least one item
    for (let i = 0; i < selectors.length; i++){
        if (selectors[i].val() != 0) return true
    }

    alert("Please enter at least one item to order")
    return false
}

function validate_and_sub(selectors, subtot, tax, total, costs_arr) {
    delivering = $('input[name="p_or_d"]:checked').val() == 'delivery'
    if (valid(delivering, selectors)) {
        confirm_window = window.open("", "_blank");
        confirm_window.document.write(create_message(delivering, new Date, selectors, subtot, tax, total, costs_arr))
    }
}

$(document).ready(function() {
    // arrays for computing costs
    selectors = []
    costs_arr = []
    cost_each_arr = []

    // get selectors and inputs for cost
    for (i = 0; i < menuItems.length; i++) {
        selectors.push($("form[name='form-name'] select[name='quan" + i + "']"))
        cost_each_arr.push(menuItems[i].cost)
    }

    $("input[name=cost]").each(function() {
        $(this).val(0)
        costs_arr.push($(this))
    });

    // add change event listener
    for (let j = 0; j < selectors.length; j++){
        let sel = selectors[j]
        sel.change(function() {
            // update appropriate fields
            costs_arr[j].val((sel.val() * cost_each_arr[j]).toFixed(2))
            subtot = compute_total(costs_arr)
            tax = parseFloat((subtot * 0.0625).toFixed(2))
            total = subtot + tax
            $("input[name=subtotal]").val(subtot)
            $("input[name=tax]").val(tax)
            $("input[name=total]").val(total.toFixed(2))
            })
        }		

    const address_info = document.querySelectorAll('.address')
    
    address_info.forEach(elem => {
        elem.classList.add('hide')
    });
    
    $('input[type=radio][name=p_or_d]').change(function() {        
        address_info.forEach(elem => {
            elem.classList.toggle('hide')
        });
    });

    // check for submission
    const submit_btn = document.querySelector('input[type="button"]')
    const user_form = document.forms['form-name']
    $('input:button').click(function() {
        validate_and_sub(selectors, subtot, tax, total, costs_arr)
    })
})