import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.getElementById('creditCard');
  const card = cardContainer.querySelector('.card');
  const applyBtn = document.getElementById('applyBtn');
  const closeGreeting = document.getElementById('closeGreeting');
  const greetingBanner = document.getElementById('greetingBanner');
  const redeemBtn = document.getElementById('redeemBtn');

  // Close greeting banner
  closeGreeting.addEventListener('click', () => {
    greetingBanner.classList.add('hidden');
  });

  // Hamburger Menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', toggleMenu);

  // Close menu when clicking nav links
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // Floating Hearts Background
  const heartsContainer = document.getElementById('floatingHearts');
  const heartEmojis = ['💖', '💕', '💗', '💜', '✨', '💘', '🩷'];
  
  function createHeart() {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    heart.style.animationDuration = (6 + Math.random() * 6) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 14000);
  }

  // Create initial hearts
  for (let i = 0; i < 8; i++) {
    setTimeout(createHeart, i * 600);
  }
  // Keep creating hearts
  setInterval(createHeart, 2500);

  // 3D Card Hover Effect
  cardContainer.addEventListener('mousemove', (e) => {
    const rect = cardContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  cardContainer.addEventListener('mouseleave', () => {
    card.style.transform = `rotateX(0) rotateY(0)`;
  });
  
  // Flip card on click
  let isFlipped = false;
  cardContainer.addEventListener('click', () => {
    isFlipped = !isFlipped;
    if (isFlipped) {
      card.style.transform = `rotateY(180deg)`;
    } else {
      card.style.transform = `rotateY(0deg)`;
    }
  });

  // Apply button — romantic message
  applyBtn.addEventListener('click', () => {
    applyBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      applyBtn.style.transform = 'scale(1)';
      alert('💖 ¡Nayeli Bebe, tienes recompensas ilimitadas esperándote! Te amo mucho 💖');
    }, 150);
  });

  // Redeem button
  if (redeemBtn) {
    redeemBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('💝 ¡Muéstrale esta tarjeta a Carlos para canjear tu recompensa! 🎁');
    });
  }

  // Intersection Observer for scroll animations
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .promise-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
