/*
=====================================================
  Dr. Botany — Background Particle Animation
  ভাসমান পাতা ও বইয়ের প্রতিচ্ছবি
=====================================================
*/

const Particles = {
  canvas: null,
  ctx: null,
  particles: [],
  animationId: null,
  isActive: true,

  leafShapes: ['🍃', '🌿', '🌱', '☘️', '📖', '📘', '📑'],
  maxParticles: 22,

  init() {
    this.canvas = document.getElementById('particles-canvas');
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'particles-canvas';
      document.body.prepend(this.canvas);
    }
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.createParticles();
    this.animate();

    window.addEventListener('resize', () => this.resize());

    // পারফরম্যান্স: ট্যাব হাইড হলে অ্যানিমেশন বন্ধ
    document.addEventListener('visibilitychange', () => {
      this.isActive = !document.hidden;
      if (this.isActive) this.animate();
    });
  },

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  },

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle());
    }
  },

  createParticle() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 14 + 8,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: Math.random() * 0.18 + 0.04,
      opacity: Math.random() * 0.12 + 0.02,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 0.4,
      shape: this.leafShapes[Math.floor(Math.random() * this.leafShapes.length)]
    };
  },

  animate() {
    if (!this.isActive) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;

      // বাউন্ডারি চেক
      if (p.y > this.canvas.height + 30) { p.y = -30; p.x = Math.random() * this.canvas.width; }
      if (p.x < -30) p.x = this.canvas.width + 30;
      if (p.x > this.canvas.width + 30) p.x = -30;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation * Math.PI / 180);
      this.ctx.globalAlpha = p.opacity;
      this.ctx.font = `${p.size}px serif`;
      this.ctx.fillText(p.shape, -p.size / 2, p.size / 2);
      this.ctx.restore();
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  },

  destroy() {
    this.isActive = false;
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }
};
