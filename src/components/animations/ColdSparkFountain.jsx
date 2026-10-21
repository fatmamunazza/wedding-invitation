// ColdSparkFountain.jsx - Real Cold Spark Machine effect
import { useEffect, useRef } from 'react';

export default function ColdSparkFountain({ 
  x = '50%', 
  y = 'bottom', 
  height = 280,
  density = 4, // how heavy the sparks
  color = '#FFD700'
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let raf;

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resize();

    class Spark {
      constructor(startX, startY) {
        this.x = startX + (Math.random() - 0.5) * 12;
        this.y = startY;
        this.vx = (Math.random() - 0.5) * 3.5;
        this.vy = -(Math.random() * 6 + 5 + Math.random() * 6); // strong upward thrust
        this.life = 1;
        this.decay = Math.random() * 0.018 + 0.012;
        this.size = Math.random() * 2.5 + 1;
        this.glitter = Math.random() > 0.7;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.14; // gravity
        this.vx *= 0.99;
        this.life -= this.decay;
      }
      draw() {
        ctx.globalAlpha = this.life;
        // golden core
        ctx.fillStyle = this.life > 0.5 ? '#FFF8C6' : color;
        ctx.shadowBlur = this.glitter ? 18 : 10;
        ctx.shadowColor = '#FFD700';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // trailing ray
        ctx.globalAlpha = this.life * 0.4;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.vx * 2, this.y - this.vy * 0.5);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }

    const getOrigin = () => {
      return {
        x: canvas.width / 2,
        y: canvas.height - 10
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const origin = getOrigin();
      // emit continuously
      for (let i = 0; i < density; i++) {
        particles.push(new Spark(origin.x, origin.y));
      }

      particles = particles.filter(p => p.life > 0 && p.y < canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      raf = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [density, color]);

  return (
    <div style={{
      position: 'absolute',
      left: x,
      bottom: y === 'bottom' ? 0 : 'auto',
      top: y !== 'bottom' ? y : 'auto',
      transform: 'translateX(-50%)',
      width: '160px',
      height: `${height}px`,
      pointerEvents: 'none',
      zIndex: 5,
    }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
      {/* base glow like real machine */}
      <div style={{
        position: 'absolute',
        bottom: -10,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 60,
        height: 20,
        background: 'radial-gradient(ellipse, rgba(255,215,0,0.8) 0%, transparent 70%)',
        filter: 'blur(4px)'
      }} />
    </div>
  );
}

// HOW TO USE - place anywhere on your Nikaah page:

/*
<div style={{ position: 'relative', width: '100%', height: '100vh', backgroundImage: "url('/your-nikaah-bg.jpg')", backgroundSize: 'cover' }}>

  // Center fountain
  <ColdSparkFountain x="50%" density={5} />

  // Left & Right side fountains like real stage
  <ColdSparkFountain x="20%" density={4} height={320} />
  <ColdSparkFountain x="80%" density={4} height={320} />

  <div style={{ position: 'relative', zIndex: 10 }}>
    // Your ت م content here
  </div>
</div>
*/