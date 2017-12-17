const cnv = document.getElementById('cnv');
const c = cnv.getContext('2d');

var width, height;

function onresize() {
  width = cnv.width = window.innerWidth;
  height = cnv.height = window.innerHeight;
  c.lineWidth = (width+height)/175;
  c.strokeStyle = '#28f';
}
onresize();
window.addEventListener('resize', onresize);

const ripples = [];

(function draw() {
  c.clearRect(0, 0, width, height);

  if (Math.random() < 0.03) {
    ripples.push({x: Math.random(), y: Math.random(), size: 0, fade: 100, speed: 1 + Math.random() * 2});
  }

  for (let i = ripples.length - 1; i >= 0; i--) {
    let r = ripples[i];
    if (r.size > 1 || r.fade <= 0) {
      ripples.splice(i,1);
      continue;
    }

    c.globalAlpha = r.fade/100;
    c.beginPath();
    c.arc(r.x*width, r.y*height, r.size * (width+height), 0, Math.PI*2);
    c.stroke();

    r.size += 0.003;
    r.fade -= r.speed;
  }

  requestAnimationFrame(draw);
})();
