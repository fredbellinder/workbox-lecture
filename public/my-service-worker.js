importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);
workbox.setConfig({
  debug: true
});
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
  /\.(?:js|css|html)$/,
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  "http://localhost:3000",
  new workbox.strategies.NetworkFirst()
);

/** "Handle todo" routes: */
// Get todos, first try from the network, if that fails, render the todos in cache.
workbox.routing.registerRoute(
  "http://localhost:8000/todos",
  new workbox.strategies.NetworkFirst(),
  "GET"
);

const bgSyncPlugin = new workbox.backgroundSync.Plugin("addTodoQueue", {
  maxRetentionTime: 24 * 60
});

workbox.routing.registerRoute(
  "http://localhost:8000/todos",
  new workbox.strategies.NetworkFirst({
    plugin: [bgSyncPlugin]
  }),
  "POST"
);
workbox.routing.registerRoute(
  "http://localhost:8000/todos",
  new workbox.strategies.NetworkFirst({
    plugin: [bgSyncPlugin]
  }),
  "DELETE"
);
