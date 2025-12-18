// MV3 background service worker aggregates the legacy background scripts.
// Exclude DOM-dependent scripts (e.g., info.js) to avoid document/Window errors in the worker.
importScripts('background.js', 'proxy.js', 'privacy.js');

// Keep the service worker alive long enough to finish startup tasks.
self.addEventListener('activate', () => {
  // No-op hook; can be extended if lifecycle work is needed later.
});
