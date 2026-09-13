// utils
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

//

export function initCanvas(canvas, userSettings = {}) {
  const settings = Object.assign(
    {
      xCanvas: parent ? canvas.parentElement.clientWidth : window.innerWidth,
      yCanvas: parent ? canvas.parentElement.clientHeight : window.innerHeight,

      gravity: 1,
      friction: 0.99,
      ballCount: 400,
      maxRadius: 20,
      minRadius: 8,
      initialVelocity: { min: -2, max: 2 },
    },
    userSettings,
  );
  const c = canvas.getContext("2d");

  canvas.width = settings.xCanvas;
  canvas.height = settings.yCanvas;

  const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

  // Event Listeners
  function handleResize() {
    canvas.width = settings.xCanvas;
    canvas.height = settings.yCanvas;

    init();
  }

  function handleClick() {
    init();
  }

  addEventListener("resize", handleResize);
  addEventListener("click", handleClick);

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
      // y axis
      if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy * settings.friction;
      } else {
        this.dy += settings.gravity;
      }

      // x axis
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

    //window.removeEventListener("mousemove", handleMouseMove)
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("click", handleClick);
  }

  init();
  animate();
  return { reset: init, destroy: destroy };
}
