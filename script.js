// TETO Shop — shared behavior
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav.primary');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Cart count from localStorage-free in-memory demo (persists per session via sessionStorage)
  const CART_KEY = 'teto_cart_count';
  const badge = document.querySelector('[data-cart-count]');
  function getCount(){ return parseInt(sessionStorage.getItem(CART_KEY) || '0', 10); }
  function setCount(n){ sessionStorage.setItem(CART_KEY, n); if (badge) badge.textContent = n; }
  setCount(getCount());

  document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
    btn.addEventListener('click', () => {
      setCount(getCount() + 1);
      const original = btn.textContent;
      btn.textContent = 'Added';
      setTimeout(() => (btn.textContent = original), 1200);
    });
  });

  // Product detail: size selector
  document.querySelectorAll('.size-option').forEach(opt => {
    opt.addEventListener('click', () => {
      opt.parentElement.querySelectorAll('.size-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });

  // Product detail: quantity stepper
  const qtyMinus = document.querySelector('[data-qty-minus]');
  const qtyPlus = document.querySelector('[data-qty-plus]');
  const qtyValue = document.querySelector('[data-qty-value]');
  if (qtyValue) {
    qtyMinus?.addEventListener('click', () => {
      qtyValue.textContent = Math.max(1, parseInt(qtyValue.textContent, 10) - 1);
    });
    qtyPlus?.addEventListener('click', () => {
      qtyValue.textContent = parseInt(qtyValue.textContent, 10) + 1;
    });
  }

  // Product detail: tabs
  document.querySelectorAll('[data-tab]').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      const target = tabBtn.getAttribute('data-tab');
      document.querySelectorAll('[data-tab]').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('[data-tab-panel]').forEach(p => p.classList.remove('active'));
      tabBtn.classList.add('active');
      document.querySelector(`[data-tab-panel="${target}"]`)?.classList.add('active');
    });
  });

  // Checkout: step switching (Shipping / Payment / Review)
  document.querySelectorAll('[data-step-trigger]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-step-trigger');
      document.querySelectorAll('[data-step]').forEach(s => s.classList.remove('active'));
      document.querySelector(`[data-step="${target}"]`)?.classList.add('active');
      document.querySelectorAll('.step-pill').forEach(p => p.classList.remove('current'));
      document.querySelector(`.step-pill[data-pill="${target}"]`)?.classList.add('current');
    });
  });
});
