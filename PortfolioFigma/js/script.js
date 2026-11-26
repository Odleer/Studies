document.addEventListener('DOMContentLoaded', () => {
  // Функция показа всплывающих уведомлений
  function showToast(text) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = text;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Мобильное меню (бургер)
  const burgerBtn = document.getElementById('burgerBtn');
  const navList = document.getElementById('navList');

  if (burgerBtn && navList) {
    burgerBtn.addEventListener('click', () => {
      navList.classList.toggle('active');
    });

    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
      });
    });
  }

  // Копирование текста (Discord) в буфер обмена
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        showToast(`Скопировано в буфер: ${text}`);
      }).catch(() => {
        showToast('Не удалось скопировать текст');
      });
    });
  });

  // Анимация заполнения прогресс-баров при прокрутке
  const skillsGrid = document.getElementById('skillsGrid');
  if (skillsGrid) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.skill-card').forEach(card => {
            const percent = card.getAttribute('data-percent');
            const fill = card.querySelector('.progress-fill');
            if (fill && percent) {
              fill.style.width = `${percent}%`;
            }
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(skillsGrid);
  }

  // Обработка отправки контактной формы
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      
      btn.textContent = 'Отправка...';
      btn.disabled = true;

      setTimeout(() => {
        showToast('Спасибо! Ваше сообщение успешно отправлено.');
        contactForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;
      }, 800);
    });
  }
});