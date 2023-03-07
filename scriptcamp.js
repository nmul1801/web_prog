console.log("in")

const cells = Array.from(document.getElementsByTagName("td"));
var blurbs = document.querySelectorAll(".blurb");

console.log(cells.length)
console.log(blurbs.length)


for (let i = 0; i < cells.length; i++) {
    cells[i].onmouseover = function(){
        console.log("fading in ")
        $("#blurb" + (i + 1)).fadeIn(400);
    };
    cells[i].onmouseleave = function(){
        $("#blurb" + (i + 1)).fadeOut(400);
    };
}


