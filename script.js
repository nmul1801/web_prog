
// TODO: CREATE BUTTON TO RESET GAME
// WHEN GAME WON, DISPLAY PLAY AGAIN BUTTON

x_turn = true
won = false
window.onload = function() {
    head_message = document.getElementById("headmessage")
    write_head_mess(false)
    arr = []
    for (i = 1; i <= 9; i++) 
    {
        arr.push(document.getElementById(i))
        let space_obj = document.getElementById(i)
        space_obj.onclick = function() {
            console.log(space_obj.innerText)
            // exit conditions - 
            if (won) return // game is already won
            if (space_obj.innerText != " ") {
                console.log("space is taken")
                return // space is taken
            }

            // mark the space
            if (x_turn) 
            {
                space_obj.innerText = "X"
            } else
            {
                space_obj.innerText = "O"
            }

            // check for win
            if (check_arr_for_win(arr)){
                won = true
                write_head_mess("win")
                return
            }

            // check for tie game
            if (check_for_cats_game(arr)){
                write_head_mess("cats")
                return
            }
            // toggle the turn
            x_turn = !x_turn
            write_head_mess("")
        }
    }
}; // end of onload

function write_head_mess(code) 
{
    // write the head message depending on game
    switch(code) {
        case "win":
            head_message.innerText = (x_turn ? "X" : "O") + " wins!"
            break
        case "cats":
            head_message.innerText = "Tie Game! Press the button to play again"
            break
        default:
            head_message.innerText = "It's player " + (x_turn ? "X" : "O") + "'s turn!"
      }
}

function check_for_cats_game(arr) 
{
    // if all spaces are not played and game is not won - tie game
    for (let i = 0; i < 9; i++){
        if (arr[i].innerText == " ") return false
    }
    return true
}

function check_arr_for_win(arr)
{
    // check all possible combinations
    return check_rows(arr) || check_cols(arr) || check_diag(arr)
}

function check_rows(arr)
{
    // check all rows for same character
    for (let i = 0; i < 3; i++) 
    {   
        if (three_spaces_same(arr[3 * i], arr[3 * i + 1], arr[3 * i + 2])) return true
    }

    return false
}

function check_cols(arr)
{
    // check all rows for same character
    for (let i = 0; i < 3; i++) 
    {
        if (three_spaces_same(arr[i], arr[i + 3], arr[i + 6])) return true
    }

    return false
}

function check_diag(arr)
{
    // check diagonals for the same character
    return three_spaces_same(arr[0], arr[4], arr[8]) || three_spaces_same(arr[6], arr[4], arr[2])
}

function three_spaces_same(ob_1, ob_2, ob_3)
{
    // if the spaces are blank can't be winning combo
    if (ob_1.innerText != ' ' && ob_2.innerText != ' ' && ob_3.innerText != ' ')
    {
        // check for the same char
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

function reset_board() {
    for (i = 1; i <= 9; i++) 
    {
        let space_obj = document.getElementById(i)    
        space_obj.innerText = " "
        space_obj.classList.remove("winningspace")
    }

    won = false;
    x_turn = true;
    write_head_mess("")
}