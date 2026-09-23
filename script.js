document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const togglePassword = document.getElementById('togglePassword');
  const loginButton = document.querySelector('.login-button');
  const signupLink = document.querySelector('.signup-link');

  // Toggle password visibility
  togglePassword.addEventListener('click', function() {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePassword.textContent = 'Hide';
    } else {
      passwordInput.type = 'password';
      togglePassword.textContent = 'Show';
    }
  });

  // Input animations
  [usernameInput, passwordInput].forEach(input => {
    input.addEventListener('input', function() {
      validateForm();
    });
  });

  // Validate form
  function validateForm() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username !== '' && password !== '' && password.length >= 6) {
      loginButton.style.opacity = '1';
      loginButton.style.cursor = 'pointer';
    } else {
      loginButton.style.opacity = '0.7';
      loginButton.style.cursor = 'not-allowed';
    }
  }

  // Form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === '' || password === '') {
      showNotification('Лутфан, ҳамаи майдонҳоро пур кунед!', 'error');
      return;
    }

    if (password.length < 6) {
      showNotification('Парол бояд ҳадди ақал 6 аломат бошад!', 'error');
      return;
    }

    // Loading animation
    loginButton.classList.add('loading');
    loginButton.disabled = true;

    setTimeout(() => {
      loginButton.classList.remove('loading');
      loginButton.disabled = false;
      showNotification(`Хуш омадед, ${username}! 🎉`, 'success');
      loginForm.reset();
      validateForm();
    }, 2000);
  });

  // Signup link
  signupLink.addEventListener('click', function(e) {
    e.preventDefault();
    showNotification('Саҳифаи бақайдгирӣ дар оянда илова мешавад! 😊', 'info');
  });

  // Notification function
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 25px;
      background: ${type === 'success' ? 'linear-gradient(135deg, #00b894, #00cec9)' : type === 'error' ? 'linear-gradient(135deg, #d63031, #e17055)' : 'linear-gradient(135deg, #667eea, #764ba2)'};
      color: white;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      font-size: 14px;
      font-weight: 500;
      z-index: 1000;
      animation: slideInRight 0.5s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.5s ease-out';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }

  // Add notification animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});