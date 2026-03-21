(function (window, document) {
  var gtmId = 'GTM-54P6PTRS';

  if (!gtmId || window.__gtmBootstrapped) return;
  window.__gtmBootstrapped = true;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': Date.now(),
    event: 'gtm.js'
  });

  var firstScript = document.getElementsByTagName('script')[0];
  if (!firstScript || !firstScript.parentNode) return;

  var gtmScript = document.createElement('script');
  gtmScript.async = true;
  gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=' + gtmId;
  firstScript.parentNode.insertBefore(gtmScript, firstScript);
})(window, document);
