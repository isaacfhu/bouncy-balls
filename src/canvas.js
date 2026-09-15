// utils
function randomIntFromRange(min, max) {
  min = Number(min);
  max = Number(max);
  return min !== max ? Math.floor(Math.random() * (max - min + 1) + min) : max;
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

//

export function initCanvas(canvas, userSettings = {}) {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  const settings = Object.assign(
    {
      gravity: 1,
      friction: 0.99,
      ballCount: 400,
      maxRadius: 16,
      minRadius: 8,
      initialVelocity: { min: -2, max: 2 },
    },
    userSettings,
  );
  const c = canvas.getContext("2d");

  const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

  // Event Listeners
  function handleClick() {
    init();
  }
  const resizeObserver = new ResizeObserver(() => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    init();
  });

  canvas.addEventListener("click", handleClick);
  resizeObserver.observe(canvas);

  // Objects
  class Ball {
    constructor(x, y, dx, dy, radius, color) {
      this.x = x;
      this.y = y;
      this.dy = dy;
      this.dx = dx;
      this.radius = radius;
      this.color = color;
    }

    draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.stroke();
      c.closePath();
    }

    update() {
      // Y-AXIS (Floor & Ceiling)
      if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy * settings.friction;
      } else {
        this.dy += +settings.gravity;
      }

      // Y-AXIS (Floor & Ceiling)
      if (
        // >= and <= not necessary(very minor improvement)
        // can replace both with > and < instead
        this.x + this.radius + this.dx >= canvas.width ||
        this.x - this.radius + this.dx <= 0
      ) {
        this.dx = -this.dx * settings.friction;
      }

      this.x += this.dx;
      this.y += this.dy;

      this.draw();
    }
  }

  // Implementation
  let ballArray = [];
  function init() {
    ballArray = [];

    for (let i = 0; i < settings.ballCount; i++) {
      const dx = randomIntFromRange(
        settings.initialVelocity.min,
        settings.initialVelocity.max,
      );
      const dy = randomIntFromRange(
        settings.initialVelocity.min,
        settings.initialVelocity.max,
      );
      const radius = randomIntFromRange(settings.minRadius, settings.maxRadius);
      const color = randomColor(colors);

      const x = randomIntFromRange(radius, canvas.width - radius);
      // = randomIntFromRange(0 + radius, canvas.width - radius);
      const y = randomIntFromRange(radius, canvas.height - radius);
      ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
  }

  // Animation Loop
  let animationId;
  function animate() {
    animationId = requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    ballArray.forEach((ball) => {
      ball.update();
    });
    /* // OR:
    for (let i = 0; i < ballArray.length; i++) {
      ballArray[i].update()
    }
  */
  }

  function destroy() {
    cancelAnimationFrame(animationId);

    window.removeEventListener("click", handleClick);
    resizeObserver.disconnect();
  }

  function updateSettings(newSettings) {
    Object.assign(settings, newSettings);
  }

  init();
  animate();
  return { reset: init, destroy: destroy, updateSettings };
}
