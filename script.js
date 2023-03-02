function compute_total(arr) {
    let sum = 0
    arr.forEach(cell => {
        sum += parseFloat(cell.val())
    });
    return sum
}

function create_message(delivery, old_date) {
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
        return "your order will be delivered at " + (new_date_obj.getHours() - 12) + ":" + min_to_print + "PM"
    } else {
        return "your order will be ready at " + new_date_obj.getHours() + ":" + min_to_print + "AM"
    }
}

function valid(delivering, selectors) {
    // check first name
    if (!$('input[name="lname"]').val()) {
        alert("Please enter your last name to continue")
        return false
    }

    // check last name
    if (delivering) {
        console.log("delivering")
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

    console.log(num_count)
    if (num_count != 7 && num_count != 10){
        alert("Please enter a vlaid phone number")
        return false
    }

    // check for ordering at least one item
    for (let i = 0; i < selectors.length; i++){
        if (selectors[i].val() != 0) return true
    }

    alert("Please enter at least one item to order")
    return false
}

function validate_and_sub(selectors) {
    delivering = $('input[name="p_or_d"]:checked').val() == 'delivery'
    if (valid(delivering, selectors)) {
        console.log(create_message(delivering, new Date))
        window.open("file:./confirm.html", "_blank");
        var myWindow = window.open('...')
// myWindow.document.getElementById('foo').style.backgroundColor = 'red'
    }
}

$(document).ready(function() {
    // arrays for computing costs
    selectors = []
    costs_arr = []
    cost_each_arr = [5.5, 7.25, 6.8, 9.5, 3.25]

    // check for submission
    const submit_btn = document.querySelector('input[type="button"]')
    const user_form = document.forms['form-name']
    $('input:button').click(function() {
        validate_and_sub(selectors)
    })

    // get selectors and inputs for cost
    for (i = 0; i < menuItems.length; i++) {
        selectors.push($("form[name='form-name'] select[name='quan" + i + "']"))
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
            let subtot = compute_total(costs_arr)
            let tax = parseFloat((subtot * 0.0625).toFixed(2))
            let total = subtot + tax
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
})