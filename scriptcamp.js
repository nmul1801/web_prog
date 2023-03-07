const cells = Array.from(document.querySelectorAll(".table-cell"));
var blurbs = document.querySelectorAll(".blurb");

const healthy_img_paths = ["url('nick.jpg')", "url('nick.jpg')", "url('nick.jpg')", "url('nick.jpg')"]
const sick_img_paths = ["url('nicksick.jpg')", "url('nicksick.jpg')", "url('nicksick.jpg')", "url('nicksick.jpg')"]

$( document ).ready(function() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundImage =  "url('nick.jpg')";
        cells[i].onmouseover = function(){
            console.log("fading in ")
            $("#blurb" + (i + 1)).fadeIn(300);
            cells[i].style.backgroundImage = sick_img_paths[i];
        };
        cells[i].onmouseleave = function(){
            $("#blurb" + (i + 1)).fadeOut(300);
            cells[i].style.backgroundImage = healthy_img_paths[i];
        };
    }
})
