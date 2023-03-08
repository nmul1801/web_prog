const boxes = document.querySelectorAll(".test-container");
console.log(boxes.length)

update();

document.addEventListener("scroll", update);
console.log("syncd")

function update() {
    console.log("updating")
    const windowHeight = window.innerHeight;

    let trigger = windowHeight * 0.85;

    boxes.forEach(box => {
        const pos = box.getBoundingClientRect().top;

        if (pos < trigger) {
            box.classList.add("show");
        } else {
            box.classList.remove("show");
        }
    })
}