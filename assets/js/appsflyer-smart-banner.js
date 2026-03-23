(function () {
  if (window.__afSmartBannerInit) return;
  window.__afSmartBannerInit = true;

  var bannerKey = '8f836600-49b8-4a1c-95d4-78058bb2bd45';
  var deepMap = { apple: 'apples', banana: 'bananas', peach: 'peaches' };
  var accountKey = document.body && document.body.getAttribute('data-account-key');
  var deepValue = deepMap[accountKey] || '';

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

  if (deepValue) {
    window.AF('banners', 'showBanner', {
      additionalParams: { deep_link_value: deepValue }
    });
    return;
  }

  window.AF('banners', 'showBanner');
})();


