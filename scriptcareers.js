const cells = Array.from(document.querySelectorAll(".table-cell"));
console.log(cells.length)
var blurbs = document.querySelectorAll(".blurb");

const prim_img_paths = ["url('./imgs/nick.jpg')", "url('./imgs/jacob_reg.jpg')", "url('./imgs/toki_reg.jpg')", "url('./imgs/nick.jpg')"]
const hover_img_paths = ["url('./imgs/nicksick.jpg')", "url('./imgs/jacob_lit.jpg')", "url('./imgs/toki_lit.jpg')", "url('nicksick.jpg')"]

$( document ).ready(function() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundImage =  prim_img_paths[i];
        cells[i].onmouseover = function(){
            console.log("fading in ")
            $("#blurb" + (i + 1)).fadeIn(300);
            cells[i].style.backgroundImage = hover_img_paths[i];
        };
        cells[i].onmouseleave = function(){
            $("#blurb" + (i + 1)).fadeOut(200);
            cells[i].style.backgroundImage = prim_img_paths[i];
        };
    }
})
