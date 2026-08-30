const VERSION='lean-abs-coach-v2.0.0';
const STATIC_CACHE=`${VERSION}-static`;
const CORE=['./','./index.html','./manifest.webmanifest','./favicon-32.png','./apple-touch-icon.png','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./icon.svg'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(STATIC_CACHE).then(cache=>cache.addAll(CORE)));
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==STATIC_CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message',event=>{
  if(event.data && event.data.type==='SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin) return;

  if(event.request.mode==='navigate'){
    event.respondWith((async()=>{
      try{
        const fresh=await fetch(event.request,{cache:'no-store'});
        const cache=await caches.open(STATIC_CACHE);
        cache.put('./index.html',fresh.clone());
        return fresh;
      }catch(e){
        return (await caches.match(event.request)) || (await caches.match('./index.html'));
      }
    })());
    return;
  }

  event.respondWith((async()=>{
    const cached=await caches.match(event.request);
    const network=fetch(event.request).then(async response=>{
      if(response && response.ok){const cache=await caches.open(STATIC_CACHE);cache.put(event.request,response.clone());}
      return response;
    }).catch(()=>null);
    return cached || await network || new Response('Offline',{status:503,statusText:'Offline'});
  })());
});
