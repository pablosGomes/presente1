const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const heartImage = new Image();
heartImage.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Emoji_u2764.svg/1024px-Emoji_u2764.svg.png";

const bandagedHeart = new Image();
bandagedHeart.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Emoji_u1fa79.svg/1024px-Emoji_u1fa79.svg.png";

const hearts = [];

for (let i = 0; i < 40; i++) {
  const isBandaged = Math.random() < 0.4;
  hearts.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * -window.innerHeight,
    speed: Math.random() * 1 + 0.3,
    size: Math.random() * 20 + 28,
    image: isBandaged ? bandagedHeart : heartImage,
    alpha: Math.random() * 0.4 + 0.3,
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const heart of hearts) {
    if (!heart.image.complete) continue;

    ctx.globalAlpha = heart.alpha;
    ctx.drawImage(heart.image, heart.x, heart.y, heart.size, heart.size);
    heart.y += heart.speed;

    if (heart.y > canvas.height + heart.size) {
      heart.y = -heart.size;
      heart.x = Math.random() * canvas.width;
    }
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}

function startAnimationWhenImagesReady() {
  if (!heartImage.complete || !bandagedHeart.complete) {
    setTimeout(startAnimationWhenImagesReady, 100);
    return;
  }

  draw();
}

startAnimationWhenImagesReady();
