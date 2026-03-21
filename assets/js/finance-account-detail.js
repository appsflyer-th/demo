(function() {
  var accounts = window.FruitBankAccounts || {};
  var appConfig = window.FruitBankAppConfig || {};
  var type = document.body.getAttribute('data-account-key') || 'apple';
  var account = accounts[type] || accounts.apple;
  var appLinks = appConfig.accountLinks || {};
  var linkIds = {
    apple: 'apple_link',
    banana: 'banana_link',
    peach: 'peach_link'
  };
  var qrLinkIds = {
    apple: 'apple_qr_link',
    banana: 'banana_qr_link',
    peach: 'peach_qr_link'
  };
  var appDownloadLink = appLinks[type] || appLinks.apple;
  if (!account) return;

  function setText(id, value) {
    var element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  document.body.classList.add(account.bodyClass);
  setText('heroEmoji', account.emoji);
  setText('heroBadge', account.badge);
  setText('heroTitle', account.title);
  setText('heroRate', account.rate);
  setText('ctaTitle', account.ctaTitle);
  setText('ctaDesc', account.ctaDesc);
  document.title = 'FruitBank – ' + account.title;

  var fl = document.getElementById('featureList');
  if (fl) {
    fl.innerHTML = account.features.map(function(feature) {
      return '<li><span class="check">✓</span> ' + feature + '</li>';
    }).join('');
  }

  var sg = document.getElementById('statGrid');
  if (sg) {
    sg.innerHTML = account.stats.map(function(stat) {
      return '<div class="stat-item"><div class="stat-val">' + stat.val + '</div><div class="stat-desc">' + stat.desc + '</div></div>';
    }).join('');
  }

  var applyBtn = document.getElementById(linkIds[type]);
  if (applyBtn && appDownloadLink) applyBtn.href = appDownloadLink;

  var ctaQrLink = document.getElementById(qrLinkIds[type]);
  var desktopQuery = window.matchMedia('(min-width: 768px)');

  function syncQrLinkState() {
    if (!ctaQrLink) return;

    if (desktopQuery.matches) {
      ctaQrLink.removeAttribute('href');
      ctaQrLink.setAttribute('aria-disabled', 'true');
      ctaQrLink.setAttribute('tabindex', '-1');
      return;
    }

    if (appDownloadLink) ctaQrLink.href = appDownloadLink;
    ctaQrLink.removeAttribute('aria-disabled');
    ctaQrLink.removeAttribute('tabindex');
  }

  syncQrLinkState();
  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener('change', syncQrLinkState);
  } else if (desktopQuery.addListener) {
    desktopQuery.addListener(syncQrLinkState);
  }

})();
