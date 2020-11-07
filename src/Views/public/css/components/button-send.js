let button=document.getElementsByClassName("dekipoldag-kutensa")[0]

button.addEventListener("click", function (event) {
    this.classList.add("fly");
    let that = this
    setTimeout(function() {
        that.classList.remove("fly");
    }, 5400)
});

var buttons = document.getElementsByClassName('Button-state-accept'),
    forEach = Array.prototype.forEach;

forEach.call(buttons, function (b) {
    b.addEventListener('click', addElement());
});

function addElement(e) {
    let addDiv = document.createElement('div'),
        mValue = Math.max(this.clientWidth, this.clientHeight),
        rect = this.getBoundingClientRect();
    let sDiv = addDiv.style,
        px = 'px';

    sDiv.width  = sDiv.height = mValue + px;
    sDiv.left  = e.clientX - rect.left - (mValue / 2) + px;
    sDiv.top   = e.clientY - rect.top - (mValue / 2) + px;

    addDiv.classList.add('pulse');
    this.appendChild(addDiv);
}