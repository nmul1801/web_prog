const cells = Array.from(document.querySelectorAll(".table-cell"));
var blurbs = document.querySelectorAll(".blurb");

for (let i = 0; i < cells.length; i++) {
    cells[i].onmouseover = function(){
        console.log("fading in ")
        $("#blurb" + (i + 1)).fadeIn(400);
    };
    cells[i].onmouseleave = function(){
        $("#blurb" + (i + 1)).fadeOut(400);
    };
}