var contrastCurrent = true
function contrast() {
    document.body.classList.toggle("contrast")
    var src = (contrastCurrent) ? "imgs/light.svg" : "imgs/dark.svg"
    contrastCurrent = !contrastCurrent
    document.getElementsByClassName("contrast__img")[0].src = src
}