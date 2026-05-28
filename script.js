// ── MOBILE MENU ──
function openMobileMenu() {
  document.getElementById('mobileMenu').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

// ── NAV SCROLL SHADOW ──
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
reveals.forEach(el => observer.observe(el));

// ── ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--ink)' : '';
      });
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });
sections.forEach(s => sectionObserver.observe(s));

// ── CONTACT FORM ──
async function handleSubmit(event) {
  event.preventDefault();

  const name        = document.getElementById('name').value.trim();
  const emailInput  = document.getElementById('email');
  const email       = emailInput.value.trim();
  const subject     = document.getElementById('subject').value.trim();
  const message     = document.getElementById('message').value.trim();
  const btn         = document.getElementById('submitBtn');

  if (!name || !email || !message) {
    showStatus('Please fill in your name, email, and message.', 'error');
    return;
  }
  if (!emailInput.checkValidity()) {
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/xvzvzepq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    });

    if (res.ok) {
      showStatus(`✓ Sent! I'll get back to you soon, ${name}.`, 'success');
      document.getElementById('contact-form').reset();
      btn.textContent = 'Sent ✓';
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    showStatus('Something went wrong. Please email me directly.', 'error');
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }
}

function showStatus(msg, type) {
  const status = document.getElementById('form-status');
  status.style.display = 'block';
  status.style.color = type === 'error' ? '#b94a48' : 'var(--accent)';
  status.textContent = msg;
}