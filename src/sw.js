const OFFLINE_MSG = 'У вас нет Интернета и Google Dino! :(';

self.addEventListener('install', function(event) {});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    if (event.request.url.includes('/api/')) {
        let fetchRequest = event.request.clone();

        // response to API requests, Cache Update Refresh strategy
        event.respondWith(
            fetch(fetchRequest).then(function(response) {
                if (!response.ok) {
                    throw Error('response status ' + response.status);
                }
                return response;
            })
            .catch(err => handleNoConn(err))
        );
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(function(response) {
                    if (response) {
                        console.log('[SW] We found in cache smth, yay! Smth is - ', response);
                        return response;
                    }
            
                    let fetchRequest = event.request.clone();
                    
                    return fetch(fetchRequest).then(function(response) {
                            // Проверка того, получили ли мы правильный ответ
                            if(!response || response.status !== 200 || response.type !== 'basic') {
                                console.log('[SW] Smth wrong with response from network... Smth - ', response)
                                return response;
                            }
                
                            let responseToCache = response.clone();
                
                            caches.open(CACHE_NAME)
                                .then(function(cache) {
                                    cache.put(event.request, responseToCache);
                                });
                
                            return response;
                        }
                    )
                    .catch(err => handleNoConn(err));
                })
        );
    }
});


handleNoConn = error => {
    console.warn('[SW] Constructing a fallback response, due to access to PWA on reload:', error);
    const fallbackResponse = {
        Description: OFFLINE_MSG, 
        Code: 404
    };
    return new Response(JSON.stringify(fallbackResponse), {
        headers: {'Content-Type': 'application/json'},
        status: 404,
    });
}