sources = ["./imgs/bottles_cropped.jpg", "./imgs/GOT_cropped.jpg", "./imgs/aisle.jpg"]
time_ms = 2000
i = 0

function start_slideshow() {
    slideshow_interval = setInterval(function () {
        console.log("hello")
        $(img).fadeOut(time_ms);
        i += 1
        if (i >= sources.length) i = 0
        setTimeout(() => {
            $(img).fadeIn(time_ms);
            img.src = sources[i]    
        }, time_ms);
    }, time_ms * 2);
}

$(document).ready(function() {
    img = document.getElementById("slideshow_image")
    start_slideshow()
})