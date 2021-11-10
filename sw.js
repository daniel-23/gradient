const CACHE_NAME = "v1_cache_gradient";
const urlsToCache = [
    "./",
    "./?umt_source=web_app_manifest",
    "./index.html",
    "./pages/fallback.html",
    "./img/favicon.ico",
    "./img/logo-48x48.png",
    "./img/logo-64x64.png",
    "./img/logo-128x128.png",
    "./img/maskable.png",
    "./img/logo-256x256.png",
    "./img/logo-512x512.png",
    "./img/logo-1024x1024.png",
    "./js/main.js",
    "./js/loadSW.js",
    "https://unpkg.com/vue@next",
    "./css/style.css",
    "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
    "./manifest.json"
];

self.addEventListener("install", e => {
    console.log("Instalando el SW");
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                cache.addAll(urlsToCache)
                    .then(() => self.skipWaiting)
                    .catch(err => console.log("Error de cache", err));
            })
    );
});

self.addEventListener("activate", e => {
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if(cacheWhiteList.indexOf(cacheName) === -1){
                        return caches.delete(cacheName);
                    }
                })
            )
        })
        //.then(() => self.clients.clain())
    )
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(res => {
            if(res){
                console.log("Respondiendo desde cache");
                return res;
            }
            console.log("Respondiendo desde web");
            return fetch(e.request)
        }).catch(() => caches.match("./pages/fallback.html"))
    );
});