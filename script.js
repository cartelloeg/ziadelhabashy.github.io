// ── MOBILE MENU ──
function openMobileMenu() {
  document.getElementById('mobileMenu').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ── CONTACT FORM ──
async function handleSubmit(event) {
  event.preventDefault();

  const name        = document.getElementById('name').value.trim();
  const emailInput  = document.getElementById('email');
  const email       = emailInput.value.trim();
  const subject     = document.getElementById('subject').value.trim();
  const message     = document.getElementById('message').value.trim();
  const status      = document.getElementById('form-status');
  const btn         = document.getElementById('submitBtn');

  // Validation
  if (!name || !email || !message) {
    showStatus('Please fill in your name, email, and message.', 'error');
    return;
  }
  if (!emailInput.checkValidity()) {
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/xvzvzepq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    });

    if (res.ok) {
      showStatus(`✓ Message sent! I'll get back to you soon, ${name}.`, 'success');
      document.getElementById('contact-form').reset();
      btn.textContent = 'Sent!';
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    showStatus('Something went wrong. Please try again or email me directly.', 'error');
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }
}

function showStatus(msg, type) {
  const status = document.getElementById('form-status');
  status.style.display = 'block';
  status.style.color = type === 'error' ? '#c0392b' : 'var(--accent)';
  status.textContent = msg;
}
