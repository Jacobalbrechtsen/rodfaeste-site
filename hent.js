// Sender telefonen til den rigtige butik og tæller scanningen (kun kilde,
// telefontype og tidspunkt — ingen personlige oplysninger).
(function () {
  var APP_STORE = 'https://apps.apple.com/dk/app/rodf%C3%A6ste/id6794644430';
  var GOOGLE_PLAY = 'https://play.google.com/store/apps/details?id=com.jacobalbrechtsen.gartneros';
  var API = 'https://evxlszgdyxxjrqwohwtx.supabase.co/rest/v1/rpc/registrer_qr_scanning';
  var NOEGLE = 'sb_publishable_7XIqVPhrnCjUndDgjxa2Cw_LI2tPOGF';

  var kilde = document.body.getAttribute('data-kilde') || 'app';
  var ua = navigator.userAgent || '';
  var platform = /android/i.test(ua) ? 'android'
    : (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) ? 'ios'
    : 'computer';

  document.getElementById('appstore').href = APP_STORE;
  document.getElementById('googleplay').href = GOOGLE_PLAY;

  var log;
  try {
    log = fetch(API, {
      method: 'POST',
      keepalive: true,
      headers: { 'apikey': NOEGLE, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_kilde: kilde, p_platform: platform })
    }).catch(function () {});
  } catch (e) {
    log = Promise.resolve();
  }

  if (platform === 'computer') return;
  var maal = platform === 'ios' ? APP_STORE : GOOGLE_PLAY;
  var vent = new Promise(function (r) { setTimeout(r, 700); });
  Promise.race([log, vent]).then(function () { window.location.replace(maal); });
})();
