(function() {
  var appConfig = window.FruitBankAppConfig || {};
  var accountLinks = appConfig.accountLinks || {};
  var accountQr = appConfig.accountQr || {};
  var defaultQr = appConfig.defaultQr || '../assets/image/qr_code.png';
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
    button.setAttribute('data-qr', accountQr[accountKey] || defaultQr);
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

    slides.forEach(function(slide) {
      var wasActive = slide.classList.contains('is-active');
      slide.classList.add('is-measuring');
      slide.classList.remove('is-active');
      maxHeight = Math.max(maxHeight, slide.offsetHeight);
      slide.classList.remove('is-measuring');
      if (wasActive) slide.classList.add('is-active');
    });

    if (activeSlide) activeSlide.classList.add('is-active');
    slider.querySelector('.promo-stage').style.height = maxHeight + 'px';
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
    resizeTimer = window.setTimeout(syncSlideHeights, 140);
  });

  showSlide(0);
  // Preload next slide image right after first render for smoother first transition.
  ensureSlideImage(1);
  syncSlideHeights();
  startAuto();
})();

(function() {
  var popup = document.getElementById('qr-popup');
  if (!popup) return;

  var appConfig = window.FruitBankAppConfig || {};
  var defaultQr = appConfig.defaultQr || '../assets/image/qr_code.png';
  var closeBtn = document.getElementById('qr-popup-close');
  var popupLink = document.getElementById('qr-popup-link');
  var popupImage = document.getElementById('qr-popup-image');
  var triggers = Array.prototype.slice.call(document.querySelectorAll('.js-qr-popup-trigger'));
  var desktopQuery = window.matchMedia('(min-width: 768px)');

  function openPopup(link, qrSrc) {
    if (popupLink && link) popupLink.href = link;
    if (popupImage) popupImage.src = qrSrc || defaultQr;
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
      openPopup(trigger.getAttribute('href'), trigger.getAttribute('data-qr'));
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
