x_turn = true

window.onload = function() {
    head_message = document.getElementById("headmessage")
    write_head_mess(false)
    arr = []
    for (i = 1; i <= 9; i++) 
    {
        arr.push(document.getElementById(i))
        let space_obj = document.getElementById(i)
        space_obj.onclick = function() {
            if (space_obj.innerText != "_") return
            if (x_turn) 
            {
                space_obj.innerText = "X"
            } else
            {
                space_obj.innerText = "O"
            }
            if (check_arr_for_win(arr)){
                write_head_mess("win")
                return
            }
            if (check_for_cats_game(arr)){
                write_head_mess("cats")
                return
            }
            x_turn = !x_turn
            write_head_mess("")
        }
    }
}; // end of onload

function write_head_mess(code) 
{
    switch(code) {
        case "win":
            head_message.innerText = (x_turn ? "X" : "O") + " wins!"
            break
        case "cats":
            head_message.innerText = "Tie Game! Refresh the page to replay"
            break
        default:
            head_message.innerText = "It's " + (x_turn ? "X" : "O") + "'s turn!"
      }
}

function check_for_cats_game(arr) 
{
    for (let i = 0; i < 9; i++){
        if (arr[i].innerText == "_") return false
    }
    return true
}

function check_arr_for_win(arr)
{
    return check_rows(arr) || check_cols(arr) || check_diag(arr)
}

function check_rows(arr)
{
    for (let i = 0; i < 3; i++) 
    {   
        start_ind = 3 * i
        if (three_spaces_same(arr[start_ind], arr[start_ind + 1], arr[start_ind + 2])) return true
    }

    return false
}

function check_cols(arr)
{
    for (let i = 0; i < 3; i++) 
    {
        if (three_spaces_same(arr[i], arr[i + 3], arr[i + 6])) return true
    }

    return false
}

function check_diag(arr)
{
    return three_spaces_same(arr[0], arr[4], arr[8]) || three_spaces_same(arr[6], arr[4], arr[2])
}

function three_spaces_same(ob_1, ob_2, ob_3)
{
    if (ob_1.innerText != '_' && ob_2.innerText != '_' && ob_3.innerText != '_')
    {
        if (ob_1.innerText == ob_2.innerText && ob_2.innerText == ob_3.innerText)
        {
            ob_1.classList.add("winningspace")
            ob_2.classList.add("winningspace")
            ob_3.classList.add("winningspace")
            return true
        }
    }
    return false
}