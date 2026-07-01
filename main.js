import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.getElementById('creditCard');
  const card = cardContainer.querySelector('.card');
  const applyBtn = document.getElementById('applyBtn');

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

  // Apply button animation
  applyBtn.addEventListener('click', () => {
    applyBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      applyBtn.style.transform = 'scale(1)';
      alert('Application process starting...');
    }, 150);
  });
});
