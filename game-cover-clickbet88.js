(function () {
  'use strict';

  const GAME_GIFS = {
    'gates of olympus 1000':
      'https://www.image2url.com/r2/default/gifs/1788870139092-704827a2-e595-43c2-a849-f18eff278f1e.gif',

    'starlight princess 1000':
      'https://www.image2url.com/r2/default/gifs/1788870406964-79eb59d4-a939-40e9-99c8-c8b8e694ff98.gif',

    'gates of olympus super scatter':
      'https://www.image2url.com/r2/default/gifs/1788870166450-2b0a7432-a7ac-4f1e-842d-176a07a917f0.gif',

    'starlight princess super scatter':
      'https://www.image2url.com/r2/default/gifs/1788870452071-8c43c1d1-7073-4f24-a286-425e62dbba50.gif',

    'gates of olympus':
      'https://www.image2url.com/r2/default/gifs/1788870193706-7fd6e8e9-de02-4d52-9ff3-c590edd01282.gif',

    'starlight princess':
      'https://www.image2url.com/r2/default/gifs/1788870646917-4e225d79-553f-458c-90d1-9707364bdcab.gif',

    'sweet bonanza':
      'https://www.image2url.com/r2/default/gifs/1788870625395-3f409d9f-065e-4f8a-b9d8-de16d6db2a90.gif',

    'mahjong wins - gong xi fa cai':
      'https://www.image2url.com/r2/default/gifs/1788870262987-53e5b5cf-1dcb-4afe-8fbc-2e61f6fd158f.gif',

    'mahjong wins 3 - black scatter':
      'https://www.image2url.com/r2/default/gifs/1788870377809-6445a8bd-691e-4bfc-9bc7-f0f2195adca5.gif',

    'the dog house megaways':
      'https://www.image2url.com/r2/default/gifs/1788870792399-dc050a72-845b-46d9-b9fc-bdc0e59aa833.gif',

    'aztec gems':
      'https://www.image2url.com/r2/default/gifs/1788870115868-b6840cc1-0e22-46cf-83cc-8063edd63536.gif',

    '5 lions megaways':
      'https://www.image2url.com/r2/default/gifs/1788870058789-81273863-f458-4f19-a771-d53325f8c190.gif'
  };

  const COVER_CLASS = 'cb88-animated-game-cover';
  const WRAPPER = 'div[data-radix-aspect-ratio-wrapper]';

  function normalizeName(name) {
    return String(name || '')
      .replace(/[\u2012\u2013\u2014\u2212]/g, '-')
      .replace(/\s*-\s*/g, ' - ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  function installCSS() {
    if (document.getElementById('cb88-game-cover-css')) return;

    const style = document.createElement('style');
    style.id = 'cb88-game-cover-css';

    style.textContent = `
      [data-game-name] ${WRAPPER} {
        position: relative !important;
        overflow: hidden !important;
      }

      [data-game-name] ${WRAPPER} > .${COVER_CLASS} {
        position: absolute !important;
        inset: 0 !important;

        width: 100% !important;
        height: 100% !important;
        max-width: none !important;

        object-fit: cover !important;
        object-position: center !important;

        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;

        z-index: 25 !important;

        pointer-events: none !important;
        user-select: none !important;
        -webkit-user-drag: none !important;
      }

      @media (max-width: 1080px) {
        [data-game-name] ${WRAPPER} > .${COVER_CLASS} {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
      }

      @media (max-width: 768px) {
        [data-game-name] ${WRAPPER} > .${COVER_CLASS} {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center !important;
        }
      }

      @media (max-width: 575px) {
        [data-game-name] ${WRAPPER} > .${COVER_CLASS} {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
      }
    `;

    (document.head || document.documentElement).appendChild(style);
  }

  function applyCover(card) {
    const gameName = normalizeName(
      card.getAttribute('data-game-name')
    );

    const gifURL = GAME_GIFS[gameName];

    if (!gifURL) return;

    const wrapper = card.querySelector(WRAPPER);

    if (!wrapper) return;

    let cover = wrapper.querySelector(
      '.' + COVER_CLASS
    );

    if (!cover) {
      cover = document.createElement('img');

      cover.className = COVER_CLASS;
      cover.alt = '';
      cover.draggable = false;
      cover.decoding = 'async';

      cover.addEventListener('error', function () {
        this.remove();
      });

      wrapper.appendChild(cover);
    }

    if (cover.getAttribute('src') !== gifURL) {
      cover.setAttribute('src', gifURL);
    }
  }

  function applyAllGameCovers() {
    document
      .querySelectorAll('[data-game-name]')
      .forEach(applyCover);
  }

  let queued = false;

  function scheduleUpdate() {
    if (queued) return;

    queued = true;

    requestAnimationFrame(function () {
      queued = false;
      applyAllGameCovers();
    });
  }

  function init() {
    installCSS();

    applyAllGameCovers();

    const root =
      document.body ||
      document.documentElement;

    const observer = new MutationObserver(
      scheduleUpdate
    );

    observer.observe(root, {
      childList: true,
      subtree: true
    });

    window.addEventListener(
      'load',
      scheduleUpdate
    );

    window.addEventListener(
      'popstate',
      scheduleUpdate
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      init,
      { once: true }
    );
  } else {
    init();
  }
})();
