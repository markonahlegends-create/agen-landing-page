'use client';

// Helper Meta (Facebook) Pixel — tracking sisi browser.
// Diisi otomatis dari NEXT_PUBLIC_META_PIXEL_ID (lihat .env.example).
// Dipasangkan dengan Conversions API di server (lib/metaCapi.js) agar data iklan
// tetap akurat walau browser user memblokir pixel (ad blocker / Safari ITP / iOS14+).

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
let initialized = false;

export function initPixel() {
  if (initialized || typeof window === 'undefined') return;
  if (!PIXEL_ID) {
    console.warn(
      '[Meta Pixel] NEXT_PUBLIC_META_PIXEL_ID belum diisi di file .env — event iklan belum terkirim ke Meta.'
    );
    return;
  }

  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', PIXEL_ID);
  window.fbq('track', 'PageView');
  initialized = true;
}

export function trackEvent(eventName, params = {}, eventId) {
  if (typeof window === 'undefined' || !window.fbq) return;
  if (eventId) {
    window.fbq('track', eventName, params, { eventID: eventId });
  } else {
    window.fbq('track', eventName, params);
  }
}

export function makeEventId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export function getFbCookies() {
  if (typeof document === 'undefined') return {};
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : undefined;
  };
  return { fbp: getCookie('_fbp'), fbc: getCookie('_fbc') };
}
