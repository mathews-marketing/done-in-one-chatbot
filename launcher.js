/* Done In One chatbot launcher. Keep this URL in the website once. */
(function () {
  'use strict';
  if (window.__archieLauncherInstalled) return;
  window.__archieLauncherInstalled = true;

  const ownScript = document.currentScript;
  if (!ownScript || !ownScript.src) return;
  const pageBase = new URL('./', ownScript.src);
  const frameOrigin = pageBase.origin;
  const keys = ['doiChatVisitorId', 'chatSessionId', 'implantBotName'];

  function storageSnapshot() {
    const result = {};
    for (const key of keys) {
      try {
        const value = window.localStorage.getItem(key);
        if (value !== null) result[key] = value;
      } catch (_) { /* Storage may be unavailable. The widget has a fallback. */ }
    }
    return result;
  }

  function mount() {
    if (document.getElementById('archie-chat-frame')) return;
    const frame = document.createElement('iframe');
    frame.id = 'archie-chat-frame';
    frame.title = 'Chat with Done In One';
    frame.setAttribute('aria-label', 'Done In One chat assistant');
    frame.setAttribute('sandbox', 'allow-scripts allow-forms allow-same-origin');
    frame.setAttribute('allow', 'autoplay');
    frame.setAttribute('scrolling', 'no');

    const styles = {
      position: 'fixed', left: '0', bottom: '0', top: 'auto', right: 'auto',
      width: 'min(290px, 100vw)', height: 'min(110px, 100dvh)',
      border: '0', margin: '0', padding: '0', display: 'block',
      background: 'transparent', overflow: 'hidden', zIndex: '2147483647'
    };
    for (const [property, value] of Object.entries(styles)) {
      frame.style.setProperty(property.replace(/[A-Z]/g, c => '-' + c.toLowerCase()), value, 'important');
    }

    function sendContext() {
      frame.contentWindow?.postMessage({
        type: 'archie-host-context',
        pageUrl: window.location.href,
        pageTitle: document.title || '',
        referrer: document.referrer || '',
        storage: storageSnapshot()
      }, frameOrigin);
    }

    window.addEventListener('message', function (event) {
      if (event.source !== frame.contentWindow || event.origin !== frameOrigin) return;
      const data = event.data;
      if (data?.type === 'archie-widget-ready') sendContext();
      if (data?.type === 'archie-widget-size') {
        const resize = () => {
          frame.style.setProperty('width', data.open ? 'min(374px, 100vw)' : 'min(290px, 100vw)', 'important');
          frame.style.setProperty('height', data.open ? 'min(680px, 100dvh)' : 'min(110px, 100dvh)', 'important');
        };
        if (data.open) resize(); else setTimeout(resize, 280);
      }
      if (data?.type === 'archie-storage-set' && keys.includes(data.key) && typeof data.value === 'string') {
        try { window.localStorage.setItem(data.key, data.value); } catch (_) {}
      }
    });

    frame.addEventListener('load', sendContext);
    document.body.appendChild(frame);
    const iframeUrl = new URL('index.html', pageBase);
    iframeUrl.searchParams.set('v', String(Date.now()));
    frame.src = iframeUrl.href;
  }

  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount, { once: true });
})();
