document.addEventListener('mousemove', function(e) {
    const errorText = document.querySelector('.error-404');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    const shadowX = (x - 0.5) * 20;
    const shadowY = (y - 0.5) * 20;
    errorText.style.textShadow = `${shadowX}px ${shadowY}px 4px rgba(0, 0, 0, 0.5)`;
  });