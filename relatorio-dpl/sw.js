/* Service worker AUTODESTRUTIVO — remove caches antigos e se desregistra.
   O app (APK) já tem os arquivos localmente; o SW só causava conteúdo desatualizado
   após atualizar o app. Esta versão limpa tudo e sai de cena. */
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
      await self.registration.unregister();
      const cs = await self.clients.matchAll({ type: 'window' });
      cs.forEach(c => { try { c.navigate(c.url); } catch (_) {} });
    } catch (_) {}
  })());
});
/* Sem handler de fetch: todas as requisições vão direto para a rede/servidor local. */
