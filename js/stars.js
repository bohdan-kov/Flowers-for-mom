// Анімація падаючих зірок
const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');

// Встановлюємо розмір canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Частинка зірки
class StarParticle {
  constructor() {
    this.reset();
    // Початкова позиція - випадкова по всій висоті для першого рендеру
    this.y = Math.random() * canvas.height;
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -10;
    this.size = Math.random() * 1 + 0.3; // Розмір від 0.3 до 1.3
    this.speed = Math.random() * 0.1 + 0.05; // Швидкість падіння від 0.05 до 0.15
    this.opacity = Math.random() * 0.1 + 0.05; // Прозорість від 0.05 до 0.15
    this.shimmer = Math.random() * 0.0025 + 0.001; // Швидкість мерехтіння
    this.shimmerDirection = 1;

    // Колір - відтінки білого та блакитного
    const colorChoice = Math.random();
    if (colorChoice > 0.7) {
      this.color = `rgba(145, 233, 255, ${this.opacity})`; // Блакитний
    } else {
      this.color = `rgba(255, 255, 255, ${this.opacity})`; // Білий
    }
  }

  update() {
    this.y += this.speed;

    // Мерехтіння
    this.opacity += this.shimmer * this.shimmerDirection;
    if (this.opacity >= 0.2 || this.opacity <= 0.03) {
      this.shimmerDirection *= -1;
    }

    // Якщо частинка вийшла за межі екрану - перезапускаємо
    if (this.y > canvas.height + 10) {
      this.reset();
    }
  }

  draw() {
    ctx.save();

    // Малюємо зірку
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    if (this.color.includes('145, 233, 255')) {
      ctx.fillStyle = `rgba(145, 233, 255, ${this.opacity})`;
    } else {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    }

    ctx.fill();

    ctx.restore();
  }
}

// Створюємо масив частинок
const particles = [];
const particleCount = 200; // Кількість зірок

for (let i = 0; i < particleCount; i++) {
  particles.push(new StarParticle());
}

// Анімаційний цикл
function animate() {
  // Прозорий фон для ефекту слідів
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Оновлюємо та малюємо всі частинки
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animate);
}

// Запускаємо анімацію
animate();
