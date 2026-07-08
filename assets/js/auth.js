// Authentication actions & password strength meters
document.addEventListener('DOMContentLoaded', () => {
  initPasswordToggles();
  initStrengthMeter();
  initLoginForm();
  initRegisterForm();
  initForgotForm();
  initOTPForm();
});

// Password visibility
function initPasswordToggles() {
  const eyeToggles = document.querySelectorAll('.password-toggle-eye');
  eyeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = toggle.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        toggle.textContent = '👁️';
      } else {
        input.type = 'password';
        toggle.textContent = '🔒';
      }
    });
  });
}

// Strength meter check
function initStrengthMeter() {
  const passwordInput = document.getElementById('register-password');
  const bar = document.getElementById('strength-bar');
  if (!passwordInput || !bar) return;

  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    bar.className = 'strength-meter-bar';
    
    if (val.length === 0) {
      return;
    }

    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    if (score <= 1) {
      bar.classList.add('strength-weak');
    } else if (score === 2 || score === 3) {
      bar.classList.add('strength-medium');
    } else if (score >= 4) {
      bar.classList.add('strength-strong');
    }
  });
}

function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-password').value;
    const role = document.getElementById('login-role').value;

    // Email validation check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      window.showToast('Please enter a valid email address.', 'error');
      return;
    }

    // Password strength check (8+ chars, lowercase, uppercase, number, symbol)
    if (pass.length < 8) {
      window.showToast('Password must be at least 8 characters long.', 'error');
      return;
    }
    if (!/[a-z]/.test(pass)) {
      window.showToast('Password must contain at least one lowercase letter.', 'error');
      return;
    }
    if (!/[A-Z]/.test(pass)) {
      window.showToast('Password must contain at least one uppercase letter.', 'error');
      return;
    }
    if (!/[0-9]/.test(pass)) {
      window.showToast('Password must contain at least one numeric digit.', 'error');
      return;
    }
    if (!/[^A-Za-z0-9]/.test(pass)) {
      window.showToast('Password must contain at least one special character symbol.', 'error');
      return;
    }

    window.showToast('Verifying session keys...', 'info');

    setTimeout(() => {
      // Direct access triggers
      sessionStorage.setItem('auth_token', 'STK-SESSION-' + Math.random().toString(36).substr(2, 9));
      sessionStorage.setItem('auth_user', email);
      sessionStorage.setItem('auth_role', role);
      
      if (role === 'admin') {
        window.showToast('Authorized: Admin Portal Access', 'success');
        setTimeout(() => window.location.href = '../dashboard/admin.html', 1000);
      } else if (role === 'pm') {
        window.showToast('Authorized: Project Manager Access', 'success');
        setTimeout(() => window.location.href = '../dashboard/pm.html', 1000);
      } else if (role === 'employee') {
        window.showToast('Authorized: Employee Portal Access', 'success');
        setTimeout(() => window.location.href = '../dashboard/employee.html', 1000);
      }
    }, 1500);
  });
}

function initRegisterForm() {
  const form = document.getElementById('register-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value.trim();
    const pass = document.getElementById('register-password').value;
    const firstName = document.getElementById('register-firstname')?.value.trim() || '';
    const lastName = document.getElementById('register-lastname')?.value.trim() || '';
    const confirmPass = document.getElementById('register-confirm-password')?.value || '';

    // Email validation check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      window.showToast('Please enter a valid email address.', 'error');
      return;
    }

    // Name validations (letters only, no numbers allowed)
    if (/\d/.test(firstName)) {
      window.showToast('First name cannot contain numbers.', 'error');
      return;
    }
    if (/\d/.test(lastName)) {
      window.showToast('Last name cannot contain numbers.', 'error');
      return;
    }

    // Password strength check (8+ chars, lowercase, uppercase, number, symbol)
    if (pass.length < 8) {
      window.showToast('Password must be at least 8 characters long.', 'error');
      return;
    }
    if (!/[a-z]/.test(pass)) {
      window.showToast('Password must contain at least one lowercase letter.', 'error');
      return;
    }
    if (!/[A-Z]/.test(pass)) {
      window.showToast('Password must contain at least one uppercase letter.', 'error');
      return;
    }
    if (!/[0-9]/.test(pass)) {
      window.showToast('Password must contain at least one numeric digit.', 'error');
      return;
    }
    if (!/[^A-Za-z0-9]/.test(pass)) {
      window.showToast('Password must contain at least one special character symbol.', 'error');
      return;
    }

    // Password confirmation match check
    if (pass !== confirmPass) {
      window.showToast('Confirm password does not match.', 'error');
      return;
    }

    window.showToast('Registering user credentials...', 'info');

    setTimeout(() => {
      localStorage.setItem('user_db', JSON.stringify({ email, pass }));
      window.location.href = 'login.html';
    }, 1500);
  });
}

// Simulated Forgot
function initForgotForm() {
  const form = document.getElementById('forgot-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.showToast('Generating reset link...', 'info');

    setTimeout(() => {
      window.location.href = 'otp-verification.html';
    }, 1200);
  });
}

// Simulated OTP
function initOTPForm() {
  const form = document.getElementById('otp-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.showToast('Validating OTP tokens...', 'info');

    setTimeout(() => {
      window.location.href = 'reset-password.html';
    }, 1200);
  });
}
