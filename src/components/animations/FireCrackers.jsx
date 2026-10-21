// Firecracker.jsx - FIXED: stays inside Nikaah container
import { useEffect, useRef } from 'react';

export default function Firecracker({ autoPlay = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resize();
    
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8 - 2;
        this.life = 1;
        this.decay = 0.018;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.08;
        this.life -= this.decay;
      }
      draw() {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // const colors = ['#D2A188', '#FFD700', '#FF8FA3', '#C2185B', '#FFF5E1'];
    const colors = [ '#FFD700', '#E8C765', '#B78D3E', '#F5DE9A','#dab673','#D4A94E'];

    const explode = (x, y) => {
      for (let i = 0; i < 60; i++) {
        particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => { p.update(); p.draw(); });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      explode(e.clientX - rect.left, e.clientY - rect.top);
    };

    if (autoPlay) {
      const t = setTimeout(() => {
        explode(canvas.width / 2, canvas.height / 2.5);
      }, 500);
      const interval = setInterval(() => {
        explode(Math.random() * canvas.width, Math.random() * canvas.height * 0.5);
      }, 1500);
      setTimeout(() => clearInterval(interval), 5000);
      return () => { clearTimeout(t); clearInterval(interval); cancelAnimationFrame(animationId); observer.disconnect(); container.removeEventListener('click', onClick); };
    }

    container.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      container.removeEventListener('click', onClick);
    };
  }, [autoPlay]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // IMPORTANT: lets clicks pass to your Nikaah content
        zIndex: 2,
      }}
    />
  );
}

// HOW TO USE IT (this fixes your page issue):
// Wrap your Nikaah section with position: relative

/*
<div style={{ 
  position: 'relative', 
  width: '100%', 
  minHeight: '100vh',
  backgroundImage: "url('/desktop-nikaah-bg.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  overflow: 'hidden' 
}}>
  <Firecracker autoPlay />
  
  <div style={{ position: 'relative', zIndex: 3 }}>
    // Your Nikaah content here - ت م logo, text, etc.
    // This will now be clickable!
  </div>
</div>
*/