import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // === ESTADO (PUNTOS) ===
  let currentPoints = parseInt(localStorage.getItem('nayeli_points')) || 0;
  const pointsDisplay = document.getElementById('userPoints');

  function updatePointsUI() {
    pointsDisplay.textContent = currentPoints;
    localStorage.setItem('nayeli_points', currentPoints.toString());
    updateRewardsAvailability();
  }

  // === UI ELEMENTS ===
  const rewardItems = document.querySelectorAll('.reward-item');
  const cardContainer = document.getElementById('creditCard');
  const card = cardContainer.querySelector('.card');
  const applyBtn = document.getElementById('applyBtn');
  const closeGreeting = document.getElementById('closeGreeting');
  const greetingBanner = document.getElementById('greetingBanner');
  
  // Modals
  const addPointsModal = document.getElementById('addPointsModal');
  const closeAddPoints = document.getElementById('closeAddPoints');
  const confirmAddPoints = document.getElementById('confirmAddPoints');
  const pointsInput = document.getElementById('pointsInput');

  const alertModal = document.getElementById('alertModal');
  const alertTitle = document.getElementById('alertTitle');
  const alertMessage = document.getElementById('alertMessage');
  const closeAlert = document.getElementById('closeAlert');

  // Cerrar Banner
  if (closeGreeting) {
    closeGreeting.addEventListener('click', () => {
      greetingBanner.classList.add('hidden');
    });
  }

  // Inicializar UI de puntos
  updatePointsUI();

  // Lógica de añadir puntos removida (movida a admin.html)
  
  // Sincronizar puntos desde otras pestañas (ej. si se añaden desde admin.html)
  window.addEventListener('storage', (e) => {
    if (e.key === 'nayeli_points') {
      currentPoints = parseInt(e.newValue) || 0;
      updatePointsUI();
    }
  });

  // Lógica secreta del corazón para abrir modal de añadir puntos
  const secretHeart = document.getElementById('secretHeart');
  let clickCount = 0;
  let clickTimer = null;

  if (secretHeart) {
    secretHeart.addEventListener('click', () => {
      clickCount++;
      if (clickTimer) clearTimeout(clickTimer);
      
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 1500);

      if (clickCount >= 5) {
        addPointsModal.classList.remove('hidden');
        clickCount = 0;
      }
    });
  }

  if (closeAddPoints) {
    closeAddPoints.addEventListener('click', () => {
      addPointsModal.classList.add('hidden');
      pointsInput.value = '';
    });
  }

  if (confirmAddPoints) {
    confirmAddPoints.addEventListener('click', () => {
      const pts = parseInt(pointsInput.value);
      if (!isNaN(pts) && pts > 0) {
        currentPoints += pts;
        updatePointsUI();
        addPointsModal.classList.add('hidden');
        pointsInput.value = '';
        showAlert('¡Depósito Exitoso! 💖', `Se han añadido ${pts} besitos a tu cuenta.`);
      }
    });
  }

  function updateRewardsAvailability() {
    rewardItems.forEach(item => {
      const cost = parseInt(item.getAttribute('data-cost'));
      if (currentPoints < cost) {
        item.classList.add('disabled');
      } else {
        item.classList.remove('disabled');
      }
    });
  }

  rewardItems.forEach(item => {
    const btn = item.querySelector('.btn-redeem');
    btn.addEventListener('click', () => {
      const cost = parseInt(item.getAttribute('data-cost'));
      const name = item.getAttribute('data-name');

      if (currentPoints >= cost) {
        currentPoints -= cost;
        updatePointsUI();
        showAlert('¡Canje Exitoso! 🎉', `Has canjeado ${cost} pts por: ${name}. ¡Disfrútalo bebe!`);
      } else {
        showAlert('Saldo Insuficiente 🥺', `Necesitas ${cost} pts para canjear esto, y solo tienes ${currentPoints}. ¡Dame más besitos!`);
      }
    });
  });

  // Función genérica para mostrar alertas
  function showAlert(title, message) {
    alertTitle.textContent = title;
    alertMessage.textContent = message;
    alertModal.classList.remove('hidden');
  }

  closeAlert.addEventListener('click', () => {
    alertModal.classList.add('hidden');
  });

  // === BOTTOM NAVIGATION & SCROLL ===
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      // Remover active de todos
      navItems.forEach(nav => nav.classList.remove('active'));
      // Añadir al clickeado
      this.classList.add('active');
    });
  });

  // Actualizar active según scroll
  const sections = document.querySelectorAll('main, section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(li => {
      li.classList.remove('active');
      if (li.getAttribute('href').substring(1) === current) {
        li.classList.add('active');
      }
    });
  });

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      document.getElementById('rewards').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // === ANIMACIONES ===
  // Corazones Flotantes
  const heartsContainer = document.getElementById('floatingHearts');
  const heartEmojis = ['💖', '💕', '💗', '💜', '✨', '💘', '🩷'];
  
  function createHeart() {
    if(!heartsContainer) return;
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

  for (let i = 0; i < 8; i++) {
    setTimeout(createHeart, i * 600);
  }
  setInterval(createHeart, 2500);

  // 3D Card
  if (cardContainer && card) {
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
    
    let isFlipped = false;
    cardContainer.addEventListener('click', () => {
      isFlipped = !isFlipped;
      if (isFlipped) {
        card.style.transform = `rotateY(180deg)`;
      } else {
        card.style.transform = `rotateY(0deg)`;
      }
    });
  }

  // Intersection Observer
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
