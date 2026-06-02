/* Yasmin Rossafa — comportamento da página */
(function () {
  /* ---- Accordion ---- */
  function setBody(sec, body, open) {
    body.style.maxHeight = open ? 'none' : '0px';
  }

  document.querySelectorAll('.sec-head').forEach(function (head) {
    head.addEventListener('click', function () {
      var sec = head.closest('.sec');
      var body = sec.querySelector('.sec-body');
      var open = sec.classList.toggle('open');
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
      setBody(sec, body, open);
    });
  });
  // seção(ões) abertas por padrão crescem livremente
  document.querySelectorAll('.sec.open .sec-body').forEach(function (b) {
    b.style.maxHeight = 'none';
  });

  /* ---- Efeito de digitação no hero ---- */
  var typedEl = document.getElementById('typed');
  var phrases = [
    'Desenvolvedora focada em impacto social.',
  ];
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var typingOn = true;

  function runTyping() {
    if (!typedEl) return;
    if (!typingOn || prefersReduced) {
      typedEl.textContent = phrases[0];
      return;
    }
    var p = 0, c = 0, deleting = false;
    (function tick() {
      if (!typingOn) { typedEl.textContent = phrases[0]; return; }
      var full = phrases[p];
      c += deleting ? -1 : 1;
      typedEl.textContent = full.slice(0, c);
      var delay = deleting ? 32 : 58;
      if (!deleting && c === full.length) { delay = 2000; deleting = true; }
      else if (deleting && c === 0) { deleting = false; p = (p + 1) % phrases.length; delay = 420; }
      setTimeout(tick, delay);
    })();
  }
  runTyping();

  // permite que o painel de Tweaks ligue/desligue a digitação
  window.__setTyping = function (on) {
    typingOn = on;
    if (!on && typedEl) typedEl.textContent = phrases[0];
    else if (on) runTyping();
  };

  /* ---- Reveal on scroll ---- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal, .sec').forEach(function (el) {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
    io.observe(el);
  });

  /* ---- Stats numbers: mostra imediatamente (sem contar números falsos) ---- */

  /* ---- Download currículo → abre diálogo de impressão (PDF) ---- */
  var cvBtn = document.getElementById('cv-btn');
  if (cvBtn) {
    cvBtn.addEventListener('click', function () {
      document.querySelectorAll('.sec').forEach(function (s) { s.classList.add('open', 'in'); });
      document.querySelectorAll('.sec-body').forEach(function (b) { b.style.maxHeight = 'none'; });
      setTimeout(function () { window.print(); }, 160);
    });
  }
})();
