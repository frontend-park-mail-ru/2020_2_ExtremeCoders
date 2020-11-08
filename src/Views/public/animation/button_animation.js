const buttons = document.getElementsByClassName('butt');
const { forEach } = Array.prototype;

forEach.call(buttons, (b) => {
  b.addEventListener('click', addElement);
});

function addElement(e) {
  const addDiv = document.createElement('div');
  const mValue = Math.max(this.clientWidth, this.clientHeight);
  const rect = this.getBoundingClientRect();
  sDiv = addDiv.style,
  px = 'px';

  sDiv.width = sDiv.height = mValue + px;
  sDiv.left = e.clientX - rect.left - (mValue / 2) + px;
  sDiv.top = e.clientY - rect.top - (mValue / 2) + px;

  addDiv.classList.add('pulse');
  this.appendChild(addDiv);
}
