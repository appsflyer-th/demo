(function () {
  // Prevent duplicate Smart Script initialization.
  if (window.__afSmartScriptInit) return;
  window.__afSmartScriptInit = true;

  // Smart Script base config.
  var smartScriptUrl = 'https://onelinksmartscript.appsflyer.com/onelink-smart-script-latest.js';
  var oneLinkURL = 'https://onelink-sim.onelink.me/coiD';
  var deepMap = { apple: 'apples', banana: 'bananas', peach: 'peaches' };

  var mediaSource = { keys: ['utm_source'], defaultValue: 'website' };
  var campaign = { keys: ['utm_campaign'], defaultValue: 'none' };
  var adSet = { keys: ['utm_adset'], defaultValue: 'none' };
  var ad = { keys: ['utm_ad'], defaultValue: 'none' };
  var channel = { keys: ['utm_medium'], defaultValue: 'none' };
  var af_dp = { paramKey: 'af_dp', keys: ['af_dp'], defaultValue: 'afbasicapp%3A%2F%2Fmainactivity' };
  var is_retargeting = { paramKey: 'is_retargeting', keys: ['is_retargeting'], defaultValue: 'true' };
  var custom_ss_ui = { paramKey: 'af_ss_ui', defaultValue: 'true' };
  var custom_ss_gtm_ui = { paramKey: 'af_ss_gtm_ui', defaultValue: 'true' };

  function generateResult(deepValue) {
    // Build params once per deeplink value to keep URL generation consistent.
    var params = {
      mediaSource: mediaSource,
      campaign: campaign,
      adSet: adSet,
      ad: ad,
      channel: channel,
      afCustom: [af_dp, is_retargeting, custom_ss_ui, custom_ss_gtm_ui]
    };

    if (deepValue) {
      params.deepLinkValue = { defaultValue: deepValue };
      params.afCustom = params.afCustom.concat([
        { paramKey: 'deep_link_value', defaultValue: deepValue }
      ]);
    }

    return window.AF_SMART_SCRIPT.generateOneLinkURL({
      oneLinkURL: oneLinkURL,
      afParameters: params
    });
  }

  function setHref(id, url) {
    var el = document.getElementById(id);
    if (el && url) el.setAttribute('href', url);
  }

  function drawQr(divId, result) {
    // Smart Script QR rendering uses AF_SMART_SCRIPT_RESULT as implicit input.
    var div = document.getElementById(divId);
    if (!div || !result || !result.clickURL) return;
    div.innerHTML = '';
    window.AF_SMART_SCRIPT_RESULT = result;
    window.AF_SMART_SCRIPT.displayQrCode(divId);
  }

  function run() {
    // Home-level links and QR codes.
    if (!window.AF_SMART_SCRIPT || !window.AF_SMART_SCRIPT.generateOneLinkURL) return;

    var rApple = generateResult('apples');
    var rBanana = generateResult('bananas');
    var rPeach = generateResult('peaches');
    var rDownload = generateResult('');

    setHref('download_link', rDownload && rDownload.clickURL);
    setHref('apple_link', rApple && rApple.clickURL);
    setHref('banana_link', rBanana && rBanana.clickURL);
    setHref('peach_link', rPeach && rPeach.clickURL);

    drawQr('download_qr_code_div', rDownload);
    drawQr('apple_qr_code_div', rApple);
    drawQr('banana_qr_code_div', rBanana);
    drawQr('peach_qr_code_div', rPeach);

    // Account page override by data-account-key.
    var key = (document.body && document.body.getAttribute('data-account-key')) || '';
    var deep = deepMap[key];
    if (!deep) return;

    var result = generateResult(deep);
    setHref(key + '_link', result && result.clickURL);
    setHref(key + '_qr_link', result && result.clickURL);
    drawQr(key + '_qr_code_div', result);
  }

  function loadAndRun() {
    // Load Smart Script library lazily if it is not already present.
    if (window.AF_SMART_SCRIPT && window.AF_SMART_SCRIPT.generateOneLinkURL) {
      run();
      return;
    }

    var script = document.createElement('script');
    script.async = true;
    script.src = smartScriptUrl;
    script.onload = run;
    document.head.appendChild(script);
  }

  // Wait for DOM so element IDs exist before replacing href/QR.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAndRun);
    return;
  }

  loadAndRun();
})();
