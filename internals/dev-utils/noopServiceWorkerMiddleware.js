module.exports = function createNoopServiceWorkerMiddleware() {
  return function noopServiceWorkerMiddleware(req, res, next) {
    if (req.url === '/service-worker.js') {
      res.setHeader('Content-Type', 'text/javascript');
      res.send(
        `// This service worker file is effectively a 'no-op' that will reset any
// previous service worker registered for the same host:port combination.

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', () => {
  self.clients.matchAll({ type: 'window' }).then(windowClients => {
    for (let windowClient of windowClients) {
      // Force open pages to refresh, so that they have a chance to load the
      // fresh navigation response from the local dev server.
      windowClient.navigate(windowClient.url);
    }
  });
});
`
      );
    } else {
      next();
    }
  };
};
