const cnv = document.getElementById('cnv');
const c = cnv.getContext('2d');

var width, height;

function onresize() {
  width = cnv.width = window.innerWidth;
  height = cnv.height = window.innerHeight;
  c.lineWidth = (width+height)/200;
  c.strokeStyle = '#28f';
}
onresize();
window.addEventListener('resize', onresize);

const ripples = [];

(function draw() {
  c.clearRect(0, 0, width, height);

  if (Math.random() < 0.015) {
    ripples.push({x: Math.random(), y: Math.random(), r: 0, fade:30 + Math.random()*30});
  }

  for (let i = ripples.length - 1; i >= 0; i--) {
    let r = ripples[i];
    if (r.r > width + height || r.fade <= 0) {
      ripples.splice(i,1);
      continue;
    }

    c.globalAlpha = r.fade/60;
    c.beginPath();
    c.arc(r.x*width, r.y*height, r.r, 0, Math.PI*2);
    c.stroke();

    r.r += 10;
    r.r *= 1.01;
    r.fade--;
  }

  requestAnimationFrame(draw);
})();
