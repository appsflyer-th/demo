(function() {
  var appConfig = window.FruitBankAppConfig || {};
  var accountLinks = appConfig.accountLinks || {};
  var idToAccount = {
    apple_link: 'apple',
    banana_link: 'banana',
    peach_link: 'peach'
  };

  Object.keys(idToAccount).forEach(function(linkId) {
    var accountKey = idToAccount[linkId];
    var button = document.getElementById(linkId);
    if (!button) return;

    var link = accountLinks[accountKey];
    if (link) button.href = link;
  });
})();

(function() {
  var slider = document.getElementById('promo-slider');
  if (!slider) return;

  var slides = Array.prototype.slice.call(slider.querySelectorAll('.promo-slide'));
  var dots = Array.prototype.slice.call(slider.querySelectorAll('.promo-dot'));
  var prevBtn = document.getElementById('promo-prev');
  var nextBtn = document.getElementById('promo-next');
  var current = 0;
  var timerId = null;
  var resizeTimer = null;
  var intervalMs = 5200;

  function scheduleHeightSync() {
    window.requestAnimationFrame(function() {
      window.requestAnimationFrame(syncSlideHeights);
    });
  }

  function ensureSlideImage(index) {
    var slide = slides[index];
    if (!slide) return;
    var image = slide.querySelector('img[data-src]');
    if (!image) return;
    image.src = image.getAttribute('data-src');
    image.removeAttribute('data-src');
  }

  function syncSlideHeights() {
    var maxHeight = 0;
    var activeSlide = slides[current] || slides[0];
    var stage = slider.querySelector('.promo-stage');

    if (!stage || !slides.length) return;

    slides.forEach(function(slide) {
      var wasActive = slide.classList.contains('is-active');
      slide.classList.add('is-measuring');
      slide.classList.remove('is-active');
      maxHeight = Math.max(maxHeight, slide.offsetHeight);
      slide.classList.remove('is-measuring');
      if (wasActive) slide.classList.add('is-active');
    });

    if (activeSlide) activeSlide.classList.add('is-active');
    if (maxHeight > 0) stage.style.height = maxHeight + 'px';
  }

  function showSlide(nextIndex) {
    var total = slides.length;
    current = (nextIndex + total) % total;
    ensureSlideImage(current);

    slides.forEach(function(slide, index) {
      slide.classList.toggle('is-active', index === current);
    });

    dots.forEach(function(dot, index) {
      dot.classList.toggle('is-active', index === current);
      dot.setAttribute('aria-selected', index === current ? 'true' : 'false');
    });
  }

  function startAuto() {
    stopAuto();
    timerId = window.setInterval(function() {
      showSlide(current + 1);
    }, intervalMs);
  }

  function stopAuto() {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      showSlide(current - 1);
      startAuto();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      showSlide(current + 1);
      startAuto();
    });
  }

  dots.forEach(function(dot, index) {
    dot.addEventListener('click', function() {
      showSlide(index);
      startAuto();
    });
  });

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);
  slider.addEventListener('focusin', stopAuto);
  slider.addEventListener('focusout', startAuto);
  window.addEventListener('resize', function() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(scheduleHeightSync, 140);
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', scheduleHeightSync);
  }

  slides.forEach(function(slide) {
    var image = slide.querySelector('img');
    if (!image) return;
    if (image.complete) return;
    image.addEventListener('load', scheduleHeightSync, { once: true });
  });

  window.addEventListener('load', scheduleHeightSync);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleHeightSync).catch(function() {});
  }

  showSlide(0);
  // Preload next slide image right after first render for smoother first transition.
  ensureSlideImage(1);
  scheduleHeightSync();
  window.setTimeout(scheduleHeightSync, 180);
  window.setTimeout(scheduleHeightSync, 600);
  window.setTimeout(scheduleHeightSync, 1400);
  startAuto();
})();

(function() {
  var popup = document.getElementById('qr-popup');
  if (!popup) return;

  var closeBtn = document.getElementById('qr-popup-close');
  var popupCodeDiv = document.getElementById('qr-popup-code-div');
  var triggers = Array.prototype.slice.call(document.querySelectorAll('.js-qr-popup-trigger'));
  var desktopQuery = window.matchMedia('(min-width: 768px)');

  function renderQr(link) {
    if (!popupCodeDiv || !link) return;
    popupCodeDiv.innerHTML = '';
    // Render from the exact clicked URL so popup QR always matches card link params.
    var fallbackImg = document.createElement('img');
    fallbackImg.alt = 'QR code for app download';
    fallbackImg.style.width = '100%';
    fallbackImg.style.height = '100%';
    fallbackImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=' + encodeURIComponent(link);
    popupCodeDiv.appendChild(fallbackImg);
  }

  function openPopup(link) {
    if (!link) return;
    renderQr(link);
    popup.classList.add('show');
    popup.setAttribute('aria-hidden', 'false');
    document.body.classList.add('qr-popup-open');
  }

  function closePopup() {
    popup.classList.remove('show');
    popup.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('qr-popup-open');
  }

  triggers.forEach(function(trigger) {
    trigger.addEventListener('click', function(event) {
      if (!desktopQuery.matches) return;
      event.preventDefault();
      openPopup(trigger.getAttribute('href'));
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closePopup);
  popup.addEventListener('click', function(event) {
    if (event.target === popup) closePopup();
  });
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && popup.classList.contains('show')) closePopup();
  });
})();
