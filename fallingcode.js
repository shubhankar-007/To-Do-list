const canvas = document.getElementById("fallingCode");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columns = Math.floor(canvas.width / 20);
const drops = Array(columns).fill(0);

const draw = () => {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0f0";
  ctx.font = "16px monospace";

  drops.forEach((y, index) => {
    const text = String.fromCharCode(Math.random() * 128);
    const x = index * 20;
    ctx.fillText(text, x, y);

    if (y > canvas.height || Math.random() > 0.975) {
      drops[index] = 0;
    } else {
      drops[index] += 20;
    }
  });
};

setInterval(draw, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
