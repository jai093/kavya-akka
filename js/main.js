/* ============================================================
   KAVYA'S BIRTHDAY EXPERIENCE — MAIN SCRIPT
   ============================================================ */
(function(){
  "use strict";

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  gsap.registerPlugin(ScrollTrigger);

  /* ---------------------------------------------------------
     0. LOADER
  --------------------------------------------------------- */
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
      initIntroSequence();
    }, 1200);
  });

  /* ---------------------------------------------------------
     1. AMBIENT PARTICLE / STAR CANVAS (global, subtle)
  --------------------------------------------------------- */
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];
  function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;
  }
  function createStars(){
    const count = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 9000));
    stars = Array.from({length: count}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      speed: Math.random() * 0.25 + 0.05,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2
    }));
  }
  function drawStars(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scrollY = window.scrollY;
    stars.forEach(s => {
      s.twinklePhase += s.twinkleSpeed;
      const tw = (Math.sin(s.twinklePhase) + 1) / 2;
      const y = (s.y - scrollY * s.speed * 0.15) % canvas.height;
      const finalY = y < 0 ? y + canvas.height : y;
      ctx.beginPath();
      ctx.arc(s.x, finalY, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232,192,125,${s.opacity * tw})`;
      ctx.fill();
    });
    if(!reduceMotion) requestAnimationFrame(drawStars);
  }
  resizeCanvas();
  createStars();
  drawStars();
  window.addEventListener('resize', () => { resizeCanvas(); createStars(); });

  /* ---------------------------------------------------------
     2. CURSOR GLOW (desktop only)
  --------------------------------------------------------- */
  const cursorGlow = document.getElementById('cursor-glow');
  if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){
    window.addEventListener('mousemove', (e) => {
      cursorGlow.classList.add('active');
      gsap.to(cursorGlow, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'power2.out' });
    });
    document.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
  }

  /* ---------------------------------------------------------
     3. PROGRESS BAR
  --------------------------------------------------------- */
  const progressBar = document.getElementById('progress-bar');
  function updateProgress(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------------------------------------------------------
     4. MUSIC TOGGLE
  --------------------------------------------------------- */
  const musicBtn = document.getElementById('music-toggle');
  const audio = document.getElementById('bg-audio');
  let musicReady = false;
  musicBtn.addEventListener('click', () => {
    if(!musicReady){
      audio.src = SITE_CONFIG.music.src;
      musicReady = true;
    }
    if(audio.paused){
      audio.play().then(() => {
        musicBtn.classList.add('playing');
        musicBtn.setAttribute('aria-pressed', 'true');
      }).catch(() => { /* file may not exist yet - fail silently */ });
    } else {
      audio.pause();
      musicBtn.classList.remove('playing');
      musicBtn.setAttribute('aria-pressed', 'false');
    }
  });

  /* ---------------------------------------------------------
     5. SCREEN 1 — MYSTERY INTRO SEQUENCE
  --------------------------------------------------------- */
  function createIntroStars(){
    const wrap = document.querySelector('.intro-stars');
    if(!wrap) return;
    const frag = document.createDocumentFragment();
    for(let i=0;i<70;i++){
      const dot = document.createElement('div');
      const size = Math.random()*2.5+1;
      dot.style.cssText = `position:absolute;left:${Math.random()*100}%;top:${Math.random()*100}%;width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,255,255,${Math.random()*0.6+0.2});box-shadow:0 0 ${size*3}px rgba(232,192,125,0.5);animation: twinkle ${3+Math.random()*4}s ease-in-out infinite ${Math.random()*3}s;`;
      frag.appendChild(dot);
    }
    wrap.appendChild(frag);
    const styleTag = document.createElement('style');
    styleTag.textContent = '@keyframes twinkle{0%,100%{opacity:0.15;}50%{opacity:1;}}';
    document.head.appendChild(styleTag);
  }
  createIntroStars();

  function initIntroSequence(){
    const lines = document.querySelectorAll('.intro-line');
    const enterBtn = document.getElementById('enter-btn');
    const scrollHint = document.getElementById('scroll-hint');
    const tl = gsap.timeline({ delay: 0.3 });
    lines.forEach((line, i) => {
      tl.to(line, { opacity:1, y:0, duration:0.9, ease:'power2.out' }, i===0?0:'+=0.5');
      if(i < lines.length - 1){
        tl.to(line, { opacity:0.35, duration:0.6, ease:'power1.out' }, '+=0.9');
      }
    });
    tl.to(enterBtn, { opacity:1, y:0, duration:0.8, ease:'back.out(1.7)' }, '+=0.3');
    tl.call(() => scrollHint.classList.add('show'));
  }

  /* ---------------------------------------------------------
     6. ENTER BUTTON -> TRANSITION INTO EXPERIENCE
  --------------------------------------------------------- */
  const enterBtn = document.getElementById('enter-btn');
  const introScreen = document.getElementById('screen-intro');
  const experience = document.getElementById('experience');

  enterBtn.addEventListener('click', enterExperience);

  function enterExperience(){
    const tl = gsap.timeline();
    tl.to(introScreen, {
      opacity: 0,
      scale: 1.08,
      filter: 'blur(12px)',
      duration: 1.1,
      ease: 'power2.inOut'
    });
    tl.call(() => {
      introScreen.style.display = 'none';
      document.body.style.overflow = 'auto';
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
      ScrollTrigger.refresh();
    });
    tl.from(experience, { opacity: 0, duration: 0.8 }, '-=0.2');
  }

  // Lock scroll until entered (mobile + desktop) — but allow scroll after entering.
  document.body.style.overflow = 'hidden';

  /* ---------------------------------------------------------
     7. POPULATE DYNAMIC CONTENT FROM CONFIG
  --------------------------------------------------------- */
  // Memory cards
  const memoryCardsWrap = document.getElementById('memory-cards');
  SITE_CONFIG.memoryCards.forEach(card => {
    const el = document.createElement('div');
    el.className = 'memory-card';
    el.textContent = card.text + ' ' + card.emoji;
    memoryCardsWrap.appendChild(el);
  });

  // Sister gallery strip
  const sisterGalleryWrap = document.getElementById('sister-gallery');
  SITE_CONFIG.sisterStrip.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.loading = 'lazy';
    img.alt = 'A memory with Kavya';
    sisterGalleryWrap.appendChild(img);
  });

  // Stats grid
  const statsGrid = document.getElementById('stats-grid');
  SITE_CONFIG.stats.forEach(stat => {
    const row = document.createElement('div');
    row.className = 'stat-row';
    const displayVal = stat.display || (stat.value + '%');
    row.innerHTML = `
      <div class="stat-label-row">
        <span class="stat-label">${stat.label}</span>
        <span class="stat-value" data-target="${stat.value}" data-display="${displayVal}">0%</span>
      </div>
      <div class="stat-track"><div class="stat-fill" data-fill="${Math.min(stat.value,100)}"></div></div>
    `;
    statsGrid.appendChild(row);
  });

  // Letter
  const letterBody = document.getElementById('letter-body');
  const letter = SITE_CONFIG.letter;
  const salutationEl = document.createElement('p');
  salutationEl.className = 'letter-line salutation';
  salutationEl.textContent = letter.salutation;
  letterBody.appendChild(salutationEl);
  letter.paragraphs.forEach(p => {
    const el = document.createElement('p');
    el.className = 'letter-line';
    el.textContent = p;
    letterBody.appendChild(el);
  });
  const signoffEl = document.createElement('p');
  signoffEl.className = 'letter-line signoff';
  signoffEl.textContent = letter.signoff;
  letterBody.appendChild(signoffEl);
  const signatureEl = document.createElement('p');
  signatureEl.className = 'letter-line signature';
  signatureEl.textContent = letter.signature;
  letterBody.appendChild(signatureEl);

  // Polaroid wall
  const polaroidWall = document.getElementById('polaroid-wall');
  const stickers = ['💕','⭐','❤️','✨','🌸'];
  SITE_CONFIG.gallery.forEach((item, i) => {
    const rot = (Math.random() * 10 - 5).toFixed(1);
    const card = document.createElement('div');
    card.className = 'polaroid';
    card.style.setProperty('--rot', rot + 'deg');
    const sticker = stickers[i % stickers.length];
    const stickerPos = i % 2 === 0 ? 'top:-10px;right:-8px;' : 'top:-10px;left:-8px;';
    card.innerHTML = `
      <span class="polaroid-sticker" style="${stickerPos}">${sticker}</span>
      <img src="${item.src}" alt="${item.caption}" loading="lazy">
      <div class="polaroid-caption">${item.caption}</div>
    `;
    polaroidWall.appendChild(card);
  });

  // Final reveal lines (map config to existing DOM by index where possible)
  // The HTML already has hand-placed final lines matching SITE_CONFIG.finalReveal ordering.

  /* ---------------------------------------------------------
     8. SCROLL-TRIGGERED ANIMATIONS PER SCREEN
  --------------------------------------------------------- */

  // --- Screen 2: Countdown ---
  gsap.timeline({ scrollTrigger: { trigger: '#screen-countdown', start: 'top 70%' } })
    .from('#huge-27', { opacity:0, scale:0.5, duration:1, ease:'back.out(1.6)' })
    .to('.lead-text:nth-of-type(1)', { opacity:1, y:0, duration:0.7 }, '-=0.3');

  gsap.timeline({ scrollTrigger: { trigger: '.lead-text--2', start: 'top 80%' } })
    .to('.lead-text--2', { opacity:1, y:0, duration:0.8 });

  gsap.timeline({
    scrollTrigger: { trigger: '#memory-cards', start: 'top 85%' }
  }).to('.memory-card', { opacity:1, y:0, scale:1, duration:0.7, stagger:0.18, ease:'back.out(1.5)' });

  gsap.timeline({ scrollTrigger: { trigger: '.closer-text--1', start: 'top 85%' } })
    .to('.closer-text--1', { opacity:1, y:0, duration:0.7 })
    .to('.closer-text--2', { opacity:1, y:0, duration:0.7 }, '+=0.3');

  // --- Screen 3: Daughter ---
  gsap.from('.daughter-frame', {
    scrollTrigger: { trigger: '.daughter-frame', start: 'top 80%' },
    opacity:0, scale:0.85, y:40, duration:1, ease:'power3.out'
  });
  gsap.from('.daughter-text p', {
    scrollTrigger: { trigger: '.daughter-text', start: 'top 85%' },
    opacity:0, y:20, duration:0.7, stagger:0.25
  });

  // Gold particles for screen 3
  createFloatingEmoji('.gold-particles', ['✨','⭐','🌟'], 14, 'rgba(232,192,125,0.7)');

  // --- Screen 4: Sister ---
  gsap.timeline({ scrollTrigger: { trigger: '#screen-sister', start: 'top 70%' } })
    .from('.sister-line.big:first-of-type', { opacity:0, y:30, duration:0.8 })
    .from('.sister-line:not(.big):not(.reveal-later)', { opacity:0, y:20, duration:0.6 }, '-=0.3')
    .to('.sister-list li', { opacity:1, x:0, duration:0.6, stagger:0.15 }, '-=0.2')
    .to('.reveal-later', { opacity:1, y:0, duration:0.7, stagger:0.3 }, '+=0.3')
    .to('.sister-gallery img', { opacity:1, y:0, duration:0.7, stagger:0.15, ease:'back.out(1.6)' }, '-=0.2');

  // --- Screen 5: Lieutenant reveal ---
  const revealTl = gsap.timeline({
    scrollTrigger: { trigger: '#screen-reveal', start: 'top 60%' }
  });
  document.querySelectorAll('.reveal-slow').forEach((el, i) => {
    revealTl.to(el, { opacity:1, y:0, duration:0.8, ease:'power2.out' }, i===0?0:'+=0.5');
  });
  revealTl.to('.lieutenant-title', { opacity:1, scale:1, duration:1, ease:'back.out(1.4)' }, '+=0.4')
    .to('.army-photo-frame', { opacity:1, y:0, duration:0.9, ease:'power3.out' }, '-=0.3')
    .to('.army-lines', { opacity:1, y:0, duration:0.8 }, '-=0.3')
    .to('.reveal-proud', { opacity:1, y:0, duration:0.8 }, '-=0.2');

  createFloatingEmoji('.army-particles', ['⭐','✨'], 18, 'rgba(107,122,94,0.8)');

  // --- Screen 6: Stats ---
  ScrollTrigger.create({
    trigger: '#screen-stats',
    start: 'top 60%',
    once: true,
    onEnter: () => {
      document.querySelectorAll('.stat-fill').forEach((fill, i) => {
        gsap.to(fill, { width: fill.dataset.fill + '%', duration: 1.4, delay: i*0.12, ease:'power2.out' });
      });
      document.querySelectorAll('.stat-value').forEach((valEl, i) => {
        const target = parseFloat(valEl.dataset.target);
        const display = valEl.dataset.display;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 1.4, delay: i*0.12, ease:'power2.out',
          onUpdate: () => { valEl.textContent = Math.round(obj.val) + '%'; },
          onComplete: () => { valEl.textContent = display; }
        });
      });
      gsap.from('.stats-footer p', { opacity:0, y:20, duration:0.7, stagger:0.2, delay:1.2 });
    }
  });
  gsap.from('.stats-sub', { scrollTrigger:{trigger:'#screen-stats', start:'top 70%'}, opacity:0, y:10, duration:0.7 });

  // --- Screen 7: Letter (handwritten reveal) ---
  ScrollTrigger.create({
    trigger: '#screen-letter',
    start: 'top 55%',
    once: true,
    onEnter: () => {
      gsap.to('.letter-line', { opacity:1, duration:0.9, stagger:0.35, ease:'power1.out' });
    }
  });

  // --- Screen 8: Polaroid wall ---
  gsap.utils.toArray('.polaroid').forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: { trigger: card, start: 'top 90%' },
      opacity:1, y:0, duration:0.8, delay: (i % 4) * 0.08, ease:'back.out(1.4)'
    });
  });

  /* ---------------------------------------------------------
     9. SCREEN 9 — FINAL REVEAL SEQUENCE (triggers once)
  --------------------------------------------------------- */
  let finalTriggered = false;
  ScrollTrigger.create({
    trigger: '#screen-final',
    start: 'top 65%',
    onEnter: () => { if(!finalTriggered){ finalTriggered = true; playFinalSequence(); } }
  });

  function createFinalStars(){
    const wrap = document.getElementById('final-stars');
    const frag = document.createDocumentFragment();
    for(let i=0;i<90;i++){
      const dot = document.createElement('div');
      const size = Math.random()*3+1;
      dot.style.cssText = `position:absolute;left:${Math.random()*100}%;top:${Math.random()*100}%;width:${size}px;height:${size}px;border-radius:50%;background:#fff;opacity:0;box-shadow:0 0 ${size*4}px rgba(232,192,125,0.8);`;
      frag.appendChild(dot);
      gsap.to(dot, { opacity: Math.random()*0.7+0.3, duration:0.6, delay: Math.random()*2.5, repeat:-1, yoyo:true, ease:'sine.inOut' });
    }
    wrap.appendChild(frag);
  }
  createFinalStars();

  function playFinalSequence(){
    const tl = gsap.timeline();
    const finalLines = document.querySelectorAll('.final-line[data-f]');
    // data-f 0,1 = simple lines; 2 = big birthday; 3,4 = gold/soft lines
    const line0 = document.querySelector('[data-f="0"]');
    const line1 = document.querySelector('[data-f="1"]');
    const bigBday = document.querySelector('[data-f="2"]');
    const line3 = document.querySelector('[data-f="3"]');
    const line4 = document.querySelector('[data-f="4"]');
    const affirmations = document.querySelector('[data-f="5"]');
    const celebration = document.querySelector('[data-f="6"]');

    tl.to(line0, { opacity:1, y:0, duration:1 })
      .to(line0, { opacity:0.3, duration:0.6 }, '+=0.8')
      .to(line1, { opacity:1, y:0, duration:1 }, '-=0.2')
      .to(line1, { opacity:0.3, duration:0.6 }, '+=0.8')
      .call(() => triggerConfetti())
      .to(bigBday, { opacity:1, scale:1, duration:1.2, ease:'elastic.out(1,0.6)' }, '-=0.1')
      .to(line3, { opacity:1, y:0, duration:0.9 }, '+=0.3')
      .to(line4, { opacity:1, y:0, duration:0.9 }, '+=0.2')
      .to(affirmations, { opacity:1, duration:0.5 }, '+=0.3')
      .from(affirmations.querySelectorAll('p'), { opacity:0, y:16, duration:0.6, stagger:0.35 }, '-=0.3')
      .to(celebration, { opacity:1, y:0, duration:0.9, ease:'power3.out' }, '+=0.5')
      .call(() => triggerConfetti(true));
  }

  /* ---------------------------------------------------------
     10. CONFETTI / CELEBRATION
  --------------------------------------------------------- */
  function triggerConfetti(big){
    if(typeof confetti !== 'function') return;
    const colors = ['#e8c07d','#f3b9c9','#b7a9ec','#ffffff','#6b7a5e'];
    if(big){
      const duration = 2500;
      const end = Date.now() + duration;
      (function frame(){
        confetti({ particleCount: 4, angle: 60, spread: 65, origin: { x: 0 }, colors });
        confetti({ particleCount: 4, angle: 120, spread: 65, origin: { x: 1 }, colors });
        if(Date.now() < end) requestAnimationFrame(frame);
      })();
      confetti({ particleCount: 140, spread: 100, origin: { y: 0.5 }, colors, startVelocity: 45 });
      // balloons via floating emoji burst
      spawnEmojiBurst(['🎈','🎉','💛','🎊'], 16);
    } else {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.4 }, colors });
    }
  }

  function spawnEmojiBurst(emojis, count){
    const wrap = document.getElementById('final-inner');
    for(let i=0;i<count;i++){
      const span = document.createElement('span');
      span.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      span.style.cssText = `position:fixed;left:${Math.random()*100}vw;bottom:-40px;font-size:${1.5+Math.random()*1.5}rem;z-index:60;pointer-events:none;`;
      document.body.appendChild(span);
      gsap.to(span, {
        y: -(window.innerHeight + 200),
        x: (Math.random()-0.5) * 200,
        rotation: (Math.random()-0.5) * 180,
        opacity: 0,
        duration: 4 + Math.random()*2,
        ease: 'power1.out',
        onComplete: () => span.remove()
      });
    }
  }

  /* ---------------------------------------------------------
     11. REPLAY BUTTON
  --------------------------------------------------------- */
  document.getElementById('replay-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    location.reload();
  });

  /* ---------------------------------------------------------
     12. HELPER: floating emoji particle generator for a container
  --------------------------------------------------------- */
  function createFloatingEmoji(selector, emojis, count, glowColor){
    const wrap = document.querySelector(selector);
    if(!wrap) return;
    const frag = document.createDocumentFragment();
    for(let i=0;i<count;i++){
      const span = document.createElement('span');
      span.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      const size = 0.8 + Math.random()*1.2;
      span.style.cssText = `position:absolute;left:${Math.random()*100}%;top:${Math.random()*100}%;font-size:${size}rem;opacity:${Math.random()*0.5+0.2};filter:drop-shadow(0 0 8px ${glowColor});`;
      frag.appendChild(span);
      if(!reduceMotion){
        gsap.to(span, {
          y: (Math.random()-0.5)*60,
          x: (Math.random()-0.5)*40,
          duration: 4 + Math.random()*4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    }
    wrap.appendChild(frag);
  }

  /* ---------------------------------------------------------
     13. REFRESH SCROLLTRIGGER AFTER IMAGES LOAD (layout shifts)
  --------------------------------------------------------- */
  window.addEventListener('load', () => {
    setTimeout(() => ScrollTrigger.refresh(), 1500);
  });

})();
