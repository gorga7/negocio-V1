// === Datos estructurados negocio local + FAQ (inyectados dinámicamente) ===
function addJSONLD(id, data) {
  try {
    if (document.getElementById(id)) return;
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.id = id;
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
  const ldLocal = {
    "@context": "https://schema.org",
    "@type": "ComputerRepairService",
    "name": "RG Tech",
    "areaServed": "UY",
    "telephone": "+59892737362",
    "address": {"@type": "PostalAddress","addressLocality": "Montevideo","addressCountry": "UY"},
    "geo": {"@type": "GeoCoordinates", "latitude": -34.865938472748226, "longitude": -56.27318278848271}
  };
  const ldFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {"@type":"Question","name":"¿Hacen retiro y entrega a domicilio?","acceptedAnswer":{"@type":"Answer","text":"Sí, en Montevideo y área metropolitana coordinamos retiro/entrega. Consultá por tu zona."}},
      {"@type":"Question","name":"¿Cuánto demora un diagnóstico?","acceptedAnswer":{"@type":"Answer","text":"Generalmente 24 horas. Casos complejos pueden requerir más tiempo; te mantenemos al tanto."}},
      {"@type":"Question","name":"¿Puedo tener soporte remoto?","acceptedAnswer":{"@type":"Answer","text":"Sí, para software y configuración ofrecemos asistencia remota segura."}},
      {"@type":"Question","name":"¿Garantía?","acceptedAnswer":{"@type":"Answer","text":"Todas las reparaciones cuentan con garantía. La duración depende del servicio y repuestos."}}
    ]
  };
  addJSONLD('ld-business', ldLocal);
  addJSONLD('ld-faq', ldFAQ);
});

// === AOS seguro ===
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    AOS.init({ duration: 1000, once: true });
  }
});

// === Typed.js (hero y sobre mí) seguro ===
document.addEventListener('DOMContentLoaded', () => {
  if (window.Typed) {
    const ab = (localStorage.getItem('rg_ab') || (localStorage.setItem('rg_ab', Math.random() < 0.5 ? 'A' : 'B'), localStorage.getItem('rg_ab')));
    const heroCopy = (ab === 'A') ? 'Reparación de PCs' : 'Armado de equipos';
    new Typed('#typed-text', { strings: [heroCopy, 'Soporte de celulares', 'Asesoramiento IT'], typeSpeed: 60, backSpeed: 40, backDelay: 2000, loop: true });
    new Typed('#typed-sobre', { strings: ['Soy Rodrigo Gorga, técnico en informática y fundador de RG Tech. Me especializo en la reparación, armado y soporte de PCs y celulares, además de brindar asesoramiento personalizado a cada cliente. También ayudo a optimizar sistemas, instalar software profesional y mejorar el rendimiento de tus dispositivos para que siempre funcionen al máximo.'], typeSpeed: 22, backSpeed: 35, showCursor: false });
  }
});

// === iFrame Resizer (sin romper si no carga) ===
document.addEventListener('DOMContentLoaded', () => {
  if (window.iFrameResize) {
    try { iFrameResize({ checkOrigin: false }, 'iframe[data-resizable]'); } catch (e) {}
  }
});

// =================== BACKGROUND ORIGINAL (SEGURO) ===================
(function () {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Menos carga en móvil
  const STAR_COUNT = window.matchMedia('(max-width: 640px)').matches ? 180 : 300;

  let stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1 + 0.2,
      depth: Math.random() * 2 + 0.5,
      blink: Math.random() * Math.PI * 2,
      blinkSpeed: 0.02 + Math.random() * 0.05,
      blinkRange: 0.3 + Math.random() * 0.3,
      flickerOffset: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.2,
      driftY: (Math.random() - 0.5) * 0.2
    });
  }
  let meteors = [];
  function createMeteor() {
    meteors.push({
      x: Math.random() * canvas.width,
      y: -50,
      length: Math.random() * 100 + 50,
      speed: Math.random() * 12 + 6,
      angle: Math.random() * Math.PI / 6 + Math.PI / 12,
      alpha: 1
    });
  }

  let lastScrollY = window.scrollY;
  let paused = false; // pausa cuando la pestaña no está visible

  function drawParticles() {
    if (paused) { requestAnimationFrame(drawParticles); return; }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height, 0, canvas.width / 2, canvas.height, canvas.height);
    gradient.addColorStop(0, "#000008");
    gradient.addColorStop(0.7, "#070718");
    gradient.addColorStop(1, "#0f0f20");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const scrollDiff = window.scrollY - lastScrollY;
    stars.forEach(s => {
      s.blink += s.blinkSpeed;
      const flicker = Math.sin(s.blink + s.flickerOffset) + Math.sin(s.blink * 1.5 + s.flickerOffset * 0.7);
      const opacity = 0.2 + Math.abs(flicker) * s.blinkRange;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      ctx.fill();
      s.x += s.driftX;
      s.y += s.driftY;
      s.y -= scrollDiff * s.depth * 0.5;
      if (s.y < 0) s.y = canvas.height;
      if (s.y > canvas.height) s.y = 0;
      if (s.x < 0) s.x = canvas.width;
      if (s.x > canvas.width) s.x = 0;
    });

    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255,255,255,${m.alpha})`;
      ctx.lineWidth = 1.5;
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(m.x - m.length * Math.cos(m.angle), m.y + m.length * Math.sin(m.angle));
      ctx.stroke();
      m.x += -m.speed * Math.cos(m.angle);
      m.y += m.speed * Math.sin(m.angle);
      m.alpha -= 0.01;
      if (m.alpha <= 0 || m.x < -200 || m.y > canvas.height + 200) meteors.splice(i, 1);
    }
    lastScrollY = window.scrollY;
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  // crear meteoros sólo si no está en pausa
  setInterval(() => { if (!paused) createMeteor(); }, 2000);

  // pausa/retoma animación cuando la pestaña cambia de visibilidad
  document.addEventListener('visibilitychange', () => { paused = document.hidden; });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
})();
// =====================================================================

// === Dot nav activation ===
const sectionsEls = document.querySelectorAll('section');
const dots = {
  'hero': document.getElementById('dot-hero'),
  'servicios': document.getElementById('dot-servicios'),
  'casos': document.getElementById('dot-casos'),
  'portafolio': document.getElementById('dot-portafolio'),
  'reseñas': document.getElementById('dot-reseñas'),
  'sobre-mi': document.getElementById('dot-sobre'),
  'contacto': document.getElementById('dot-contacto'),
  'faq': document.getElementById('dot-faq')
};
function activateDot() {
  const scrollPos = window.scrollY + window.innerHeight / 2;
  sectionsEls.forEach(sec => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      Object.values(dots).forEach(d => d && d.classList.remove('active'));
      const id = sec.getAttribute('id');
      if (dots[id]) dots[id].classList.add('active');
    }
  });
}
window.addEventListener('scroll', activateDot, { passive: true });
window.addEventListener('load', activateDot);

// === Carrusel marcas: loop real (duplica) + pausa fuera de viewport ===
(function () {
  const track = document.getElementById('brandTrack');
  if (track) { track.innerHTML += track.innerHTML; }
  const wrap = document.querySelector('.brand-carousel-wrapper');
  if ('IntersectionObserver' in window && wrap && track) {
    const io = new IntersectionObserver(([e]) => { track.style.animationPlayState = e.isIntersecting ? 'running' : 'paused'; });
    io.observe(wrap);
  }
})();

// === Form WhatsApp + honeypot ===
function enviarWhatsApp(event) {
  event.preventDefault();
  const form = event.target;
  if (form.website && form.website.value) { return; }
  const nombre = encodeURIComponent(form.nombre.value.trim());
  const dispositivo = encodeURIComponent(form.dispositivo.value);
  const mensaje = encodeURIComponent(form.mensaje.value.trim());
  const texto = `Hola, soy ${nombre}. Tengo un ${dispositivo} y ${mensaje}`;
  const url = `https://wa.me/59892737362?text=${texto}`;
  window.open(url, "_blank", 'noopener');
}

// === Estado WA por horario + Sticky bar inteligente + CTA contextual ===
(function () {
  const badge = document.getElementById('wa-status');
  const bar = document.getElementById('stickyBar');
  const copy = document.getElementById('stickyCopy');
  const order = ['hero', 'servicios', 'casos', 'portafolio', 'reseñas', 'sobre-mi', 'contacto', 'faq'];
  const ab = (localStorage.getItem('rg_ab') || (localStorage.setItem('rg_ab', Math.random() < 0.5 ? 'A' : 'B'), localStorage.getItem('rg_ab')));
  const mapCopy = { servicios: '¿Querés un presupuesto ahora?', casos: '¿Querés un upgrade similar?', portafolio: '¿Te armo uno a medida?', reseñas: '¿Listo para contactarnos?', 'sobre-mi': 'Hablemos por WhatsApp', contacto: 'Escribime ahora y te respondo', hero: (ab === 'A' ? '¿Necesitás ayuda ahora?' : '¿Querés tu presupuesto ya?'), faq: '¿Tenés más dudas? ¡Escribime!' };
  function businessOpen() { const h = new Date().getHours(); return h >= 9 && h < 19; }
  function setState() {
    if (!badge) return;
    const open = businessOpen();
    badge.textContent = open ? 'En línea' : 'Fuera de horario';
    badge.className = open ? 'align-middle text-xs ml-2 px-2 py-1 rounded-full bg-green-600 bg-opacity-20 text-green-300' : 'align-middle text-xs ml-2 px-2 py-1 rounded-full bg-yellow-600 bg-opacity-20 text-yellow-300';
  }
  function onScroll() { if (!bar) return; if (window.scrollY > 360 && businessOpen()) { bar.classList.add('visible'); } else { bar.classList.remove('visible'); } }
  setState(); onScroll();
  setInterval(setState, 60000);
  window.addEventListener('scroll', onScroll, { passive: true });
  const io = new IntersectionObserver((ents) => {
    ents.forEach(e => { if (e.isIntersecting && mapCopy[e.target.id] && copy) { copy.textContent = mapCopy[e.target.id]; } });
  }, { rootMargin: '-45% 0px -55% 0px' });
  order.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
})();

// === Analytics ligero (localStorage + console) ===
(function () {
  window.RG = window.RG || {};
  RG.track = RG.track || function (name, data) {
    try {
      const k = 'rg_' + name;
      localStorage.setItem(k, (parseInt(localStorage.getItem(k) || '0', 10)) + 1);
      console.debug('[RG]', name, data || {});
    } catch (e) { }
  };
  document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
    a.addEventListener('click', () => RG.track('whatsapp_click', { section: a.closest('#stickyBar') ? 'sticky' : (a.closest('#contacto') ? 'contacto' : (a.closest('#hero') ? 'hero' : 'otro')) }));
  });
  const tel = document.querySelector('#stickyBar a[href^="tel:"]'); if (tel) { tel.addEventListener('click', () => RG.track('phone_call', { section: 'sticky' })); }
  const form = document.querySelector('form[onsubmit*="enviarWhatsApp"]'); if (form) { form.addEventListener('submit', () => RG.track('form_submit')); }
  document.querySelectorAll('.dot-nav a.dot').forEach(d => { d.addEventListener('click', () => RG.track('nav_click', { to: d.getAttribute('href') })); });
})();

// === Google Maps: carga bajo demanda ===
(function () {
  const btn = document.getElementById('loadMapBtn');
  const ph = document.getElementById('map-ph');
  const tpl = document.getElementById('map-tpl');
  if (btn && ph && tpl) {
    btn.addEventListener('click', () => {
      try {
        const node = tpl.content.cloneNode(true);
        ph.replaceWith(node);
        RG && RG.track && RG.track('map_load');
      } catch (e) { }
    });
  }
})();

// === Filtros Portafolio ===
(function () {
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('#portafolio article.card');
  function apply(filter) {
    chips.forEach(c => {
      const active = c.dataset.filter === filter;
      c.classList.toggle('active', active);
      c.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    cards.forEach(card => {
      const tags = (card.dataset.tags || '').split(',');
      const show = (filter === 'all') || tags.includes(filter);
      card.style.display = show ? '' : 'none';
    });
  }
  chips.forEach(ch => ch.addEventListener('click', () => {
    const f = ch.dataset.filter; try { localStorage.setItem('rg_pf', f); } catch (e) { }
    apply(f);
  }));
  let start = 'all';
  try { start = localStorage.getItem('rg_pf') || 'all'; } catch (e) { }
  apply(start);
})();

// === Beneficios sticky (mostrar/ocultar en desktop) ===
(function () {
  const bar = document.getElementById('benefitsBar'); if (!bar) return;
  function toggle() { bar.classList[window.scrollY > 120 ? 'add' : 'remove']('show'); }
  toggle(); window.addEventListener('scroll', toggle, { passive: true });
})();

// === Anti-bot humano: habilitar botón tras breve retardo ===
(function () { const btn = document.getElementById('sendBtn'); if (!btn) return; setTimeout(() => { btn.disabled = false; }, 500); })();

// === Botón Volver Arriba ===
(function () {
  const btn = document.getElementById('toTop'); if (!btn) return;
  function toggle() { btn.classList[window.scrollY > 420 ? 'add' : 'remove']('show'); }
  toggle(); window.addEventListener('scroll', toggle, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ===== Admin-only: inyectar UI de Stats si activado (Ctrl+Alt+S o #stats) =====
(function () {
  function isAdmin() { try { return location.hash.includes('stats') || localStorage.getItem('rg_admin') === '1'; } catch (e) { return false; } }
  function createUI() {
    if (document.getElementById('statsBtn')) return;
    const style = document.createElement('style');
    style.textContent = `
      .stats-btn{ position:fixed; left:1rem; bottom:1rem; z-index:56; background:rgba(30,41,59,.9); color:#fff; border:1px solid rgba(255,255,255,.12); border-radius:9999px; padding:.5rem .9rem; box-shadow:0 10px 22px rgba(0,0,0,.35); font-weight:700; }
      .stats-panel{ position:fixed; left:1rem; bottom:4.5rem; z-index:56; background:rgba(0,0,0,.7); backdrop-filter: blur(8px); color:#e5e7eb; border:1px solid rgba(255,255,255,.12); border-radius:12px; padding:12px 14px; min-width:220px; display:none; }
      .stats-panel.show{ display:block; }
      .stats-panel h4{ font-weight:700; margin:0 0 6px 0; }
      .stats-panel .row{ display:flex; align-items:center; justify-content:space-between; gap:8px; font-size:.9rem; }
      .stats-panel button{ margin-top:8px; font-size:.8rem; }`;
    document.head.appendChild(style);
    const btn = document.createElement('button'); btn.id = 'statsBtn'; btn.className = 'stats-btn'; btn.type = 'button'; btn.setAttribute('aria-expanded', 'false'); btn.textContent = 'Stats';
    const panel = document.createElement('div'); panel.id = 'statsPanel'; panel.className = 'stats-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'false'); panel.innerHTML = `
      <h4 id="statsTitle">Métricas</h4>
      <div class="row"><span>WhatsApp</span><strong id="stat-wa">0</strong></div>
      <div class="row"><span>Llamadas</span><strong id="stat-phone">0</strong></div>
      <div class="row"><span>Formulario</span><strong id="stat-form">0</strong></div>
      <div class="row"><span>Mapa</span><strong id="stat-map">0</strong></div>
      <button id="statsReset" class="mt-2 px-3 py-1 rounded border border-white border-opacity-20">Reiniciar</button>`;
    document.body.appendChild(btn); document.body.appendChild(panel);
    const ids = { wa: 'whatsapp_click', phone: 'phone_call', form: 'form_submit', map: 'map_load' };
    function get(k) { try { return parseInt(localStorage.getItem('rg_' + k) || '0', 10); } catch (e) { return 0; } }
    function setK(k, v) { try { localStorage.setItem('rg_' + k, String(v)); } catch (e) { } }
    function refresh() {
      const id = (x) => document.getElementById(x);
      id('stat-wa').textContent = get(ids.wa);
      id('stat-phone').textContent = get(ids.phone);
      id('stat-form').textContent = get(ids.form);
      id('stat-map').textContent = get(ids.map);
    }
    btn.addEventListener('click', () => {
      const show = !panel.classList.contains('show');
      panel.classList.toggle('show', show);
      btn.setAttribute('aria-expanded', show ? 'true' : 'false');
      refresh();
    });
    document.getElementById('statsReset').addEventListener('click', () => { Object.values(ids).forEach(k => setK(k, 0)); refresh(); });
  }
  function setAdmin(flag) { try { localStorage.setItem('rg_admin', flag ? '1' : '0'); } catch (e) { } }
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 's') {
      const cur = isAdmin();
      setAdmin(!cur);
      if (!cur) createUI();
      else {
        const b = document.getElementById('statsBtn');
        const p = document.getElementById('statsPanel');
        if (b) b.remove();
        if (p) p.remove();
      }
    }
  });
  if (isAdmin()) createUI();
})();

/* === CAMBIO SUGERIDO: FAQ expandir/contraer todo + enlaces profundos ===
   - Botones opcionales (en HTML): <button id="faqExpand">...</button> y <button id="faqCollapse">...</button>
   - Deep links: usar #faq-q=2 para abrir la 2ª, o ?open=all / #open=all para abrir todas
*/
(function(){
  const faq = document.getElementById('faq');
  if(!faq) return;

  const details = faq.querySelectorAll('details');
  const btnExpand = document.getElementById('faqExpand');
  const btnCollapse = document.getElementById('faqCollapse');

  // Expandir / Contraer (si existen los botones)
  if (btnExpand) {
    btnExpand.setAttribute('aria-pressed','false');
    btnExpand.addEventListener('click', ()=>{
      details.forEach(d=> d.open = true);
      btnExpand.setAttribute('aria-pressed','true');
      btnCollapse && btnCollapse.setAttribute('aria-pressed','false');
    });
  }
  if (btnCollapse) {
    btnCollapse.setAttribute('aria-pressed','false');
    btnCollapse.addEventListener('click', ()=>{
      details.forEach(d => d.open = false); // contrae todas
      btnCollapse.setAttribute('aria-pressed','true');
      btnExpand && btnExpand.setAttribute('aria-pressed','false');
    });
  }

  // Deep links desde hash o query
  function getParamFromHash(regex){ const m=(location.hash||'').match(regex); return m?m[1]:null; }
  const q = getParamFromHash(/faq-q=(\d+)/i);
  const all = /open=all/i.test(location.hash) || /[?&]open=all/i.test(location.search);

  if(all) {
    details.forEach(d=> d.open = true);
  } else if(q && details[q-1]) {
    details.forEach((d,i)=> d.open = (i === (q-1)));
    details[q-1].scrollIntoView({behavior:'smooth', block:'center'});
  }
})();
