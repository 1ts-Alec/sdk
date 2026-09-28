// No-op GameMonetize / GameDistribution SDK. The real SDKs load ad and tracking code; this keeps
// the events games wait for (SDK_READY, then SDK_GAME_START after a "break") without any ads.
(function () {
  var emit = function (name) {
    var opts = window.SDK_OPTIONS || window.GD_OPTIONS;
    if (opts && typeof opts.onEvent === 'function') {
      try { opts.onEvent({ name: name, status: name, message: '' }); } catch (e) { console.error(e); }
    }
  };
  var skipBreak = function () {
    emit('SDK_GAME_PAUSE');
    setTimeout(function () { emit('SDK_GAME_START'); }, 0);
    return Promise.resolve();
  };
  var sdk = {
    showBanner: skipBreak,
    showAd: skipBreak,
    preloadAd: function () { return Promise.resolve(); },
    cancelAd: function () {},
    openConsole: function () {},
    AdType: { Interstitial: 'interstitial', Rewarded: 'rewarded', Display: 'display' }
  };
  window.sdk = sdk;
  window.gdsdk = sdk;
  setTimeout(function () { emit('SDK_READY'); }, 0);
})();
