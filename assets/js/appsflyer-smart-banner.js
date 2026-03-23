(function () {
  // Prevent duplicate banner initialization when scripts are included multiple times.
  if (window.__afSmartBannerInit) return;
  window.__afSmartBannerInit = true;

  // Static configuration for Smart Banner behavior.
  var bannerKey = '8f836600-49b8-4a1c-95d4-78058bb2bd45';
  var deepMap = { apple: 'apples', banana: 'bananas', peach: 'peaches' };
  var path = (window.location.pathname || '').toLowerCase();
  var isRootHome = /^\/(?:index\.html)?$/.test(path);
  var isFinanceHome = /^\/finance(?:\/|\/index\.html)?$/.test(path);
  var isAccountPage = /^\/finance\/account-(apple|banana|peach)(\/|\/index\.html)?$/.test(path);
  var accountKey = (document.body && document.body.getAttribute('data-account-key')) || '';

  (function (t, e, n, s, a, c, i, o, p) {
    t.AppsFlyerSdkObject = a;
    t.AF = t.AF || function () {
      (t.AF.q = t.AF.q || []).push([Date.now()].concat(Array.prototype.slice.call(arguments)));
    };
    t.AF.id = t.AF.id || i;
    t.AF.plugins = {};
    o = e.createElement(n);
    p = e.getElementsByTagName(n)[0];
    o.async = 1;
    o.src = 'https://websdk.appsflyersdk.com?' + (c.length > 0 ? 'st=' + c.split(',').sort().join(',') + '&' : '') + (i.length > 0 ? 'af_id=' + i : '');
    p.parentNode.insertBefore(o, p);
  })(window, document, 'script', 0, 'AF', 'banners', { banners: { key: bannerKey } });

  // Build additional params once and reuse them for all pages.
  var additionalParams = {
    page_type: isAccountPage ? 'account-page' : ((isRootHome || isFinanceHome) ? 'home-page' : 'content-page')
  };

  if (isAccountPage && deepMap[accountKey]) {
    additionalParams.account_key = accountKey;
    additionalParams.deep_link_value = deepMap[accountKey];
  }

  // Show banner globally with page-aware params.
  window.AF('banners', 'showBanner', { additionalParams: additionalParams });
})();
