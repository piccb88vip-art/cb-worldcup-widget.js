/*
 * CB88 Banner Slider Controls
 * Lightweight Navy Edition
 * Version 1.1
 */

(function () {
  "use strict";

  const STYLE_ID = "cb88-slider-style";
  const BANNER_ID = "cb88-main-banner";

  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");

  style.id = STYLE_ID;
  style.textContent = `

    /* ===============================
       DESKTOP
    =============================== */

    #${BANNER_ID} {
      --organic-arrow-color: #ffffff !important;
      --organic-arrow-thickness: 3px !important;
      --organic-arrow-height: 21px !important;
    }

    #${BANNER_ID} .awssld__controls {
      visibility: visible !important;
      pointer-events: none !important;
    }

    /* Tombol navigasi */
    #${BANNER_ID} .awssld__prev,
    #${BANNER_ID} .awssld__next {
      width: 48px !important;
      height: 48px !important;
      top: 50% !important;

      display: flex !important;
      align-items: center !important;
      justify-content: center !important;

      padding: 0 !important;
      margin: 0 !important;

      background: rgba(3, 12, 57, 0.88) !important;
      border: 1.5px solid rgba(86, 161, 255, 0.9) !important;
      border-radius: 50% !important;

      box-shadow:
        0 0 10px rgba(30, 125, 255, 0.45),
        0 4px 12px rgba(0, 0, 0, 0.45) !important;

      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
      cursor: pointer !important;

      transform: translateY(-50%) !important;
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease !important;

      z-index: 30 !important;
    }

    #${BANNER_ID} .awssld__prev {
      left: 22px !important;
      right: auto !important;
    }

    #${BANNER_ID} .awssld__next {
      right: 22px !important;
      left: auto !important;
    }

    /* Ikon panah */
    #${BANNER_ID} .awssld__controls__arrow-left,
    #${BANNER_ID} .awssld__controls__arrow-right {
      width: 17px !important;
      height: 21px !important;
      opacity: 1 !important;
      transform: none !important;
    }

    #${BANNER_ID}
      .awssld__controls__arrow-left::before,
    #${BANNER_ID}
      .awssld__controls__arrow-left::after,
    #${BANNER_ID}
      .awssld__controls__arrow-right::before,
    #${BANNER_ID}
      .awssld__controls__arrow-right::after {
      background-color: #ffffff !important;
      opacity: 1 !important;
    }

    /* Pagination */
    #${BANNER_ID} .awssld__bullets {
      width: auto !important;
      height: 26px !important;

      left: 50% !important;
      right: auto !important;
      bottom: 10px !important;

      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 6px !important;

      padding: 0 12px !important;
      margin: 0 !important;

      background: rgba(3, 12, 57, 0.82) !important;
      border: 1px solid rgba(86, 161, 255, 0.75) !important;
      border-radius: 20px !important;

      box-shadow:
        0 0 9px rgba(30, 125, 255, 0.35),
        0 3px 10px rgba(0, 0, 0, 0.35) !important;

      transform: translateX(-50%) !important;
      z-index: 35 !important;
    }

    /* Titik normal */
    #${BANNER_ID} .awssld__bullets button {
      flex: 0 0 auto !important;

      width: 7px !important;
      height: 7px !important;

      padding: 0 !important;
      margin: 0 !important;

      background: rgba(210, 226, 255, 0.65) !important;
      border: 0 !important;
      border-radius: 50% !important;

      opacity: 1 !important;
      box-shadow: none !important;
      transform: none !important;

      transition:
        width 0.2s ease,
        background-color 0.2s ease !important;
    }

    /* Titik aktif */
    #${BANNER_ID}
      .awssld__bullets
      .awssld__bullets--active {
      width: 20px !important;
      height: 7px !important;

      background: #5eb2ff !important;
      border-radius: 8px !important;

      box-shadow:
        0 0 7px rgba(62, 158, 255, 0.75) !important;

      transform: none !important;
    }

    /* Hover desktop */
    @media (hover: hover) {
      #${BANNER_ID} .awssld__prev:hover,
      #${BANNER_ID} .awssld__next:hover {
        background: #0b2e78 !important;
        border-color: #ffffff !important;

        box-shadow:
          0 0 13px rgba(55, 145, 255, 0.65),
          0 4px 12px rgba(0, 0, 0, 0.5) !important;
      }
    }

    /* ===============================
       TABLET
    =============================== */

    @media (min-width: 521px) and (max-width: 991px) {
      #${BANNER_ID} .awssld__prev,
      #${BANNER_ID} .awssld__next {
        width: 43px !important;
        height: 43px !important;
      }

      #${BANNER_ID} .awssld__prev {
        left: 13px !important;
      }

      #${BANNER_ID} .awssld__next {
        right: 13px !important;
      }

      #${BANNER_ID} .awssld__bullets {
        height: 24px !important;
        bottom: 7px !important;
      }
    }

    /* ===============================
       MOBILE
    =============================== */

    @media (max-width: 520px) {
      #${BANNER_ID} .awssld__controls {
        visibility: visible !important;
      }

      #${BANNER_ID} .awssld__prev,
      #${BANNER_ID} .awssld__next {
        width: 36px !important;
        height: 36px !important;
        border-width: 1px !important;
      }

      #${BANNER_ID} .awssld__prev {
        left: 6px !important;
      }

      #${BANNER_ID} .awssld__next {
        right: 6px !important;
      }

      #${BANNER_ID} .awssld__controls__arrow-left,
      #${BANNER_ID} .awssld__controls__arrow-right {
        width: 12px !important;
        height: 16px !important;
      }

      #${BANNER_ID} .awssld__bullets {
        height: 19px !important;
        bottom: 4px !important;

        gap: 4px !important;
        padding: 0 8px !important;

        box-shadow:
          0 0 6px rgba(30, 125, 255, 0.3) !important;
      }

      #${BANNER_ID} .awssld__bullets button {
        width: 4px !important;
        height: 4px !important;
      }

      #${BANNER_ID}
        .awssld__bullets
        .awssld__bullets--active {
        width: 13px !important;
        height: 4px !important;
      }
    }
  `;

  document.head.appendChild(style);

  /* Cari slider banner terbesar */
  function markBanner() {
    if (document.getElementById(BANNER_ID)) return true;

    const sliders = Array.from(
      document.querySelectorAll(".awssld")
    ).filter(function (slider) {
      return (
        slider.querySelector(".awssld__prev") &&
        slider.querySelector(".awssld__next")
      );
    });

    if (!sliders.length) return false;

    sliders.sort(function (a, b) {
      const areaA =
        a.getBoundingClientRect().width *
        a.getBoundingClientRect().height;

      const areaB =
        b.getBoundingClientRect().width *
        b.getBoundingClientRect().height;

      return areaB - areaA;
    });

    sliders[0].id = BANNER_ID;

    return true;
  }

  /* Retry maksimal 5 detik */
  let attempts = 0;

  const timer = window.setInterval(function () {
    attempts++;

    if (markBanner() || attempts >= 20) {
      window.clearInterval(timer);
    }
  }, 250);
})();
