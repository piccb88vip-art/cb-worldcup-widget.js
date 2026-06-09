(function () {
  const API_URL = "https://script.google.com/macros/s/AKfycbwtg26SSgLniBFMJ2jVc9ZVdSfsuQmk8_70w6KEtE_gR-qWBpyUlpB90GumTYDgQB-x/exec";
  const PREDIKSI_LINK = "https://click-lynk.com/CBEVNT2-FIFAWORLDCUP";
  const SBO_LINK = "https://click-lynk.com/SBO_CBWL";
  const LOGO_URL = "http://plcl.me/images/A3XC9.png";

  const flags = {
    "Mexico": "🇲🇽",
    "South Africa": "🇿🇦",
    "Korea Republic": "🇰🇷",
    "Czechia": "🇨🇿",
    "Canada": "🇨🇦",
    "Bosnia and Herzegovina": "🇧🇦",
    "United States": "🇺🇸",
    "Paraguay": "🇵🇾",
    "Qatar": "🇶🇦",
    "Switzerland": "🇨🇭",
    "Brazil": "🇧🇷",
    "Morocco": "🇲🇦",
    "Haiti": "🇭🇹",
    "Scotland": "🏴",
    "Australia": "🇦🇺",
    "Turkiye": "🇹🇷",
    "Germany": "🇩🇪",
    "Curacao": "🇨🇼",
    "Netherlands": "🇳🇱",
    "Japan": "🇯🇵",
    "Ivory Coast": "🇨🇮",
    "Ecuador": "🇪🇨",
    "Sweden": "🇸🇪",
    "Tunisia": "🇹🇳",
    "Spain": "🇪🇸",
    "Cape Verde": "🇨🇻",
    "Belgium": "🇧🇪",
    "Egypt": "🇪🇬",
    "Saudi Arabia": "🇸🇦",
    "Uruguay": "🇺🇾",
    "Iran": "🇮🇷",
    "New Zealand": "🇳🇿",
    "France": "🇫🇷",
    "Senegal": "🇸🇳",
    "Iraq": "🇮🇶",
    "Norway": "🇳🇴",
    "Argentina": "🇦🇷",
    "Algeria": "🇩🇿",
    "Austria": "🇦🇹",
    "Jordan": "🇯🇴",
    "Portugal": "🇵🇹",
    "DR Congo": "🇨🇩",
    "England": "🏴",
    "Croatia": "🇭🇷",
    "Ghana": "🇬🇭",
    "Panama": "🇵🇦",
    "Uzbekistan": "🇺🇿",
    "Colombia": "🇨🇴"
  };

  function getFlag(name) {
    return flags[String(name || "").trim()] || "⚽";
  }

  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function buildWidget(matches) {
    const section = document.createElement("section");
    section.id = "cb-worldcup-widget";

    section.innerHTML = `
      <style>
        #cb-worldcup-widget {
          width: calc(100% - 24px);
          max-width: 1240px;
          margin: 14px auto;
          padding: 14px;
          border-radius: 18px;
          position: relative;
          overflow: hidden;
          color: #fff;
          font-family: Arial, Helvetica, sans-serif;
          background:
            radial-gradient(circle at 18% 0%, rgba(0, 102, 255, .34), transparent 35%),
            radial-gradient(circle at 88% 12%, rgba(255, 215, 70, .25), transparent 32%),
            linear-gradient(180deg, rgba(0, 12, 55, .74), rgba(0, 0, 0, .74));
          border: 1px solid rgba(255, 214, 90, .55);
          box-shadow: 0 0 22px rgba(0, 76, 255, .38), inset 0 0 18px rgba(255, 214, 90, .08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-sizing: border-box;
        }

        #cb-worldcup-widget:before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.12) 45%, transparent 55%);
          transform: translateX(-120%);
          animation: cbwcShine 5s infinite;
          pointer-events: none;
        }

        @keyframes cbwcShine {
          0% { transform: translateX(-120%); }
          45% { transform: translateX(120%); }
          100% { transform: translateX(120%); }
        }

        .cbwc-header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 12px;
        }

        .cbwc-title-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .cbwc-logo {
          height: 42px;
          width: auto;
          max-width: 170px;
          object-fit: contain;
          flex-shrink: 0;
          filter: drop-shadow(0 0 7px rgba(255,215,0,.6)) drop-shadow(0 0 12px rgba(0,102,255,.45));
        }

        .cbwc-title-box {
          min-width: 0;
        }

        .cbwc-title {
          font-size: 17px;
          font-weight: 900;
          letter-spacing: .4px;
          color: #ffd95b;
          text-shadow: 0 0 12px rgba(255, 208, 66, .45);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cbwc-subtitle {
          font-size: 12px;
          font-weight: 700;
          color: #cfe3ff;
          opacity: .95;
          white-space: nowrap;
        }

        .cbwc-scroll {
          position: relative;
          z-index: 2;
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding: 4px 2px 8px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }

        .cbwc-scroll::-webkit-scrollbar {
          height: 5px;
        }

        .cbwc-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #005cff, #ffd45a);
          border-radius: 999px;
        }

        .cbwc-card {
          flex: 0 0 250px;
          scroll-snap-align: start;
          border-radius: 16px;
          padding: 12px;
          text-align: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(14, 37, 94, .86), rgba(3, 8, 26, .9));
          border: 1px solid rgba(255, 214, 90, .65);
          box-shadow: inset 0 0 16px rgba(255, 214, 90, .08), 0 8px 18px rgba(0,0,0,.28);
          transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
          box-sizing: border-box;
        }

        .cbwc-card:hover {
          transform: translateY(-3px) scale(1.025);
          border-color: rgba(255, 230, 130, .95);
          box-shadow: 0 0 20px rgba(255, 214, 90, .38), 0 10px 22px rgba(0,0,0,.34);
        }

        .cbwc-league {
          font-size: 10px;
          font-weight: 900;
          color: #ffd95b;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: .3px;
        }

        .cbwc-teams {
          display: grid;
          grid-template-columns: 1fr 42px 1fr;
          align-items: center;
          gap: 6px;
          min-height: 62px;
        }

        .cbwc-team {
          min-width: 0;
          font-size: 12px;
          font-weight: 900;
          color: #fff;
          line-height: 1.2;
        }

        .cbwc-flag {
          display: block;
          font-size: 28px;
          margin-bottom: 5px;
          filter: drop-shadow(0 0 6px rgba(255,255,255,.22));
        }

        .cbwc-vs {
          font-size: 13px;
          font-weight: 1000;
          color: #ffd95b;
          text-shadow: 0 0 10px rgba(255,217,91,.55);
        }

        .cbwc-time {
          margin: 11px 0 6px;
          font-size: 13px;
          font-weight: 900;
          color: #fff;
        }

        .cbwc-group {
          display: inline-block;
          margin-bottom: 12px;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 900;
          color: #d8e8ff;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.12);
        }

        .cbwc-copy {
          font-size: 10px;
          color: #cfe3ff;
          line-height: 1.35;
          margin: 0 0 10px;
          min-height: 28px;
        }

        .cbwc-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .cbwc-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 34px;
          border-radius: 10px;
          text-decoration: none;
          color: #fff !important;
          font-size: 11px;
          font-weight: 1000;
          border: 1px solid rgba(255, 214, 90, .75);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.25);
          transition: transform .18s ease, filter .18s ease;
        }

        .cbwc-btn:hover {
          transform: scale(1.04);
          filter: brightness(1.16);
        }

        .cbwc-prediksi {
          background: linear-gradient(180deg, #1266ff, #082f9f);
        }

        .cbwc-bet {
          background: linear-gradient(180deg, #ffb400, #b36b00);
        }

        .cbwc-empty {
          position: relative;
          z-index: 2;
          padding: 14px;
          text-align: center;
          color: #fff;
          font-weight: 800;
        }

@media (max-width: 768px) {
  #cb-worldcup-widget {
    width: calc(100% - 14px);
    margin: 10px auto;
    padding: 10px;
    border-radius: 16px;
  }

  .cbwc-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }

  .cbwc-logo {
    height: 32px;
    max-width: 135px;
  }

  .cbwc-title {
    font-size: 14px;
    white-space: normal;
    line-height: 1.2;
  }

  .cbwc-subtitle {
    font-size: 10px;
    white-space: normal;
    line-height: 1.25;
  }

  .cbwc-scroll {
    gap: 12px;
    padding: 6px 0 26px;
    scroll-snap-type: x mandatory;
  }

  .cbwc-scroll:after {
    content: "GESER ➜";
    position: sticky;
    right: 6px;
    bottom: 0;
    align-self: flex-end;
    min-width: 72px;
    height: 24px;
    padding: 5px 9px;
    border-radius: 999px;
    background: linear-gradient(180deg, #ffe27a, #b57900);
    color: #07102d;
    font-size: 10px;
    font-weight: 1000;
    box-shadow: 0 0 12px rgba(255, 214, 90, .65);
    z-index: 5;
  }

  .cbwc-card {
    flex: 0 0 calc(100vw - 76px);
    max-width: 330px;
    min-width: 280px;
    padding: 14px;
    border-radius: 18px;
    scroll-snap-align: center;
  }

  .cbwc-teams {
    grid-template-columns: 1fr 38px 1fr;
    min-height: 68px;
  }

  .cbwc-flag {
    font-size: 25px;
  }

  .cbwc-time {
    font-size: 12px;
  }

  .cbwc-copy {
    font-size: 11px;
  }

  .cbwc-actions {
    gap: 8px;
  }

  .cbwc-btn {
    font-size: 10px;
    min-height: 36px;
    border-radius: 9px;
  }
}

@media (max-width: 390px) {
  .cbwc-card {
    flex-basis: calc(100vw - 68px);
    min-width: 265px;
  }

  .cbwc-logo {
    height: 30px;
    max-width: 125px;
  }

  .cbwc-title {
    font-size: 13px;
  }
}

        @media (max-width: 390px) {
          .cbwc-card {
            flex-basis: 205px;
          }

          .cbwc-logo {
            height: 30px;
            max-width: 125px;
          }

          .cbwc-title {
            font-size: 12px;
          }
        }
      </style>

      <div class="cbwc-header">
        <div class="cbwc-title-wrap">
          <img class="cbwc-logo" src="${LOGO_URL}" alt="CLICKBET88">
          <div class="cbwc-title-box">
            <div class="cbwc-title">WORLD CUP MATCH CENTER</div>
            <div class="cbwc-subtitle">Prediksi Skor • Bet Sport • Rebut Hadiah World Cup</div>
          </div>
        </div>
      </div>

      ${
        matches && matches.length
          ? `<div class="cbwc-scroll">
              ${matches.slice(0, 30).map(function (m) {
                const teamA = escapeHtml(m.teamA);
                const teamB = escapeHtml(m.teamB);
                const tanggal = escapeHtml(m.tanggal);
                const jam = escapeHtml(m.jam);
                const group = escapeHtml(m.group || "WORLD CUP");

                return `
                  <div class="cbwc-card">
                    <div class="cbwc-league">🏆 World Cup 2026</div>
                    <div class="cbwc-teams">
                      <div class="cbwc-team">
                        <span class="cbwc-flag">${getFlag(m.teamA)}</span>
                        ${teamA}
                      </div>
                      <div class="cbwc-vs">VS</div>
                      <div class="cbwc-team">
                        <span class="cbwc-flag">${getFlag(m.teamB)}</span>
                        ${teamB}
                      </div>
                    </div>
                    <div class="cbwc-time">${tanggal} • ${jam} WIB</div>
                    <div class="cbwc-group">${group}</div>
                    <div class="cbwc-copy">Punya tiket World Cup? Prediksi skor & rebut hadiahnya.</div>
                    <div class="cbwc-actions">
                      <a class="cbwc-btn cbwc-prediksi" href="${PREDIKSI_LINK}" target="_blank" rel="noopener">PREDIKSI</a>
                      <a class="cbwc-btn cbwc-bet" href="${SBO_LINK}" target="_blank" rel="noopener">BET SEKARANG</a>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>`
          : `<div class="cbwc-empty">Belum ada jadwal pertandingan aktif.</div>`
      }
    `;

    return section;
  }

  function findInsertTarget() {
    const candidates = [
      '[class*="dLTxpX"]',
      '[class*="provider"]',
      '[class*="Top"]',
      '[class*="top"]',
      '[class*="game"]'
    ];

    for (let i = 0; i < candidates.length; i++) {
      const el = document.querySelector(candidates[i]);
      if (el && el.parentNode) return el;
    }

    return null;
  }

  function insertWidget(widget) {
    if (document.getElementById("cb-worldcup-widget")) return;

    const target = findInsertTarget();

    if (target && target.parentNode) {
      target.parentNode.insertBefore(widget, target.nextSibling);
      return;
    }

    const page = document.querySelector("#page-wrap") || document.querySelector("main") || document.body;
    page.prepend(widget);
  }

  function init() {
    fetch(API_URL + "?t=" + Date.now())
      .then(function (r) {
        return r.json();
      })
      .then(function (res) {
        const matches = res.matches || res.data || [];
        insertWidget(buildWidget(matches));
      })
      .catch(function (err) {
        console.log("CB World Cup Widget Error:", err);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    setTimeout(init, 800);
  }
})();
