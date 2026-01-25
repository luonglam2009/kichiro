const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

class CornerBlob {
  constructor(anchorX, anchorY, range, radius, color, speed = 0.001) {
    this.ax = anchorX;
    this.ay = anchorY;
    this.range = range;
    this.radius = radius;
    this.color = color;
    this.t = Math.random() * Math.PI * 2;
    this.speed = speed;
  }

  update() {
    this.t += this.speed;
    this.x = this.ax + Math.cos(this.t) * this.range;
    this.y = this.ay + Math.sin(this.t * 0.8) * this.range;
  }

  draw() {
    const g = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius
    );

    g.addColorStop(0, this.color);
    g.addColorStop(0.6, this.color.replace("0.8", "0.25"));
    g.addColorStop(1, "transparent");

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

const blobs = [
  new CornerBlob(
    w * 0.1,
    h * 0.9,
    Math.min(w, h) * 0.1,
    Math.max(w, h) * 0.5,
    "rgba(90,200,255,0.8)",
    0.001
  ),

  new CornerBlob(
    w * 0.9,
    h * 0.1,
    Math.min(w, h) * 0.1,
    Math.max(w, h) * 0.4,
    "rgba(40,160,220,0.75)",
    0.0012
  )
];

function animate() {
  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);

  ctx.globalCompositeOperation = "screen";

  blobs.forEach(blob => {
    blob.update();
    blob.draw();
  });

  ctx.globalCompositeOperation = "source-over";
  requestAnimationFrame(animate);
}

animate();
