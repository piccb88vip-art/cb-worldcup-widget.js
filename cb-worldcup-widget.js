(function () {
  const API_URL = "https://script.google.com/macros/s/AKfycbwtg26SSgLniBFMJ2jVc9ZVdSfsuQmk8_70w6KEtE_gR-qWBpyUlpB90GumTYDgQB-x/exec";
  const PREDIKSI_LINK = "https://click-lynk.com/CBEVNT2-FIFAWORLDCUP";
  const SBO_LINK = "https://click-lynk.com/SBO_CBWL";

  const flagCodes = {
    "Mexico": "mx",
    "South Africa": "za",
    "Korea Republic": "kr",
    "Czechia": "cz",
    "Canada": "ca",
    "Bosnia and Herzegovina": "ba",
    "United States": "us",
    "USA": "us",
    "Paraguay": "py",
    "Qatar": "qa",
    "Switzerland": "ch",
    "Brazil": "br",
    "Morocco": "ma",
    "Haiti": "ht",
    "Scotland": "gb-sct",
    "Australia": "au",
    "Turkiye": "tr",
    "Turkey": "tr",
    "Germany": "de",
    "Curacao": "cw",
    "Netherlands": "nl",
    "Japan": "jp",
    "Ivory Coast": "ci",
    "Ecuador": "ec",
    "Sweden": "se",
    "Tunisia": "tn",
    "Spain": "es",
    "Cape Verde": "cv",
    "Belgium": "be",
    "Egypt": "eg",
    "Saudi Arabia": "sa",
    "Uruguay": "uy",
    "Iran": "ir",
    "New Zealand": "nz",
    "France": "fr",
    "Senegal": "sn",
    "Iraq": "iq",
    "Norway": "no",
    "Argentina": "ar",
    "Algeria": "dz",
    "Austria": "at",
    "Jordan": "jo",
    "Portugal": "pt",
    "DR Congo": "cd",
    "England": "gb-eng",
    "Croatia": "hr",
    "Ghana": "gh",
    "Panama": "pa",
    "Uzbekistan": "uz",
    "Colombia": "co"
  };

  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function shortName(name) {
    const map = {
      "Korea Republic": "South Korea",
      "Bosnia and Herzegovina": "Bosnia & Her...",
      "United States": "USA"
    };
    return map[name] || name;
  }

  function getFlag(name) {
    const team = String(name || "").trim();
    const code = flagCodes[team];

    if (!code) return `<span class="cbwc-ball">⚽</span>`;

    return `
      <img
        class="cbwc-flag-img"
        src="https://flagcdn.com/w40/${code}.png"
        alt="${escapeHtml(team)}"
        loading="lazy"
      >
    `;
  }

  function makeOdd(i, side) {
    const home = [0.82, 0.80, 0.78, -0.95, 0.65, -0.86, 0.85, 0.72];
    const away = [-0.92, -0.90, -0.88, 0.85, -0.75, 0.76, -0.95, -0.82];
    const arr = side === "home" ? home : away;
    return arr[i % arr.length];
  }

  function buildWidget(matches) {
    const section = document.createElement("section");
    section.id = "cb-worldcup-widget";

    section.innerHTML = `
      <style>
        #cb-worldcup-widget {
          width: calc(100% - 16px);
          max-width: 1485px;
          margin: 10px auto;
          padding: 16px 18px 14px;
          border-radius: 8px;
          color: #fff;
          font-family: Arial, Helvetica, sans-serif;
          background: linear-gradient(180deg, #191504, #090805);
          box-shadow: inset 0 0 0 1px rgba(255,196,45,.08);
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        #cb-worldcup-widget * {
          box-sizing: border-box;
        }

        .cbwc-top {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255,208,64,.28);
          margin-bottom: 12px;
        }

        .cbwc-icon {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle, #2446ff, #050934);
          border: 1px solid #caa12b;
          font-size: 14px;
          box-shadow: 0 0 10px rgba(255,207,58,.25);
        }

        .cbwc-heading {
          font-size: 17px;
          font-weight: 900;
          color: #fff;
          text-shadow: 0 1px 2px #000;
        }

        .cbwc-scroll-wrap {
          position: relative;
        }

        .cbwc-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 0 0 2px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }

        .cbwc-scroll::-webkit-scrollbar {
          height: 0;
        }

        .cbwc-card {
          flex: 0 0 218px;
          min-height: 154px;
          padding: 9px 9px 8px;
          border-radius: 7px;
          background: linear-gradient(180deg, #4c3d04, #382d04);
          border: 1px solid rgba(255,217,76,.22);
          scroll-snap-align: start;
          position: relative;
          color: #fff;
          cursor: pointer;
          text-decoration: none;
        }

        .cbwc-card:hover {
          filter: brightness(1.1);
        }

        .cbwc-card:after {
          content: "›";
          position: absolute;
          top: 7px;
          right: 8px;
          color: #ffe45f;
          font-size: 16px;
          font-weight: 900;
        }

        .cbwc-league {
          font-size: 6px;
          font-weight: 900;
          color: #ffc928;
          text-transform: uppercase;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-right: 16px;
          margin-bottom: 8px;
        }

        .cbwc-match {
          display: grid;
          grid-template-columns: 1fr 54px 1fr;
          align-items: start;
          gap: 5px;
        }

        .cbwc-team {
          min-width: 0;
          text-align: center;
        }

        .cbwc-flag-img {
          width: 29px;
          height: 20px;
          object-fit: cover;
          border-radius: 2px;
          display: block;
          margin: 0 auto 5px;
          box-shadow: 0 0 4px rgba(0,0,0,.55);
        }

        .cbwc-ball {
          display: block;
          font-size: 18px;
          margin-bottom: 5px;
        }

        .cbwc-name {
          display: block;
          color: #fff;
          font-size: 7px;
          font-weight: 800;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cbwc-mid {
          text-align: center;
          padding-top: 2px;
        }

        .cbwc-date {
          font-size: 7px;
          color: rgba(255,255,255,.38);
          margin-bottom: 2px;
        }

        .cbwc-time {
          font-size: 11px;
          font-weight: 900;
          color: #fff;
          letter-spacing: .5px;
        }

        .cbwc-live {
          font-size: 9px;
          color: rgba(255,255,255,.35);
          margin-top: 3px;
        }

        .cbwc-market {
          margin-top: 13px;
          text-align: center;
          font-size: 7px;
          font-weight: 900;
          color: #fff;
        }

        .cbwc-odds {
          margin-top: 8px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px;
        }

        .cbwc-odd {
          height: 36px;
          border-radius: 4px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,219,75,.12);
          padding: 5px 6px;
        }

        .cbwc-odd-label {
          font-size: 6px;
          color: rgba(255,255,255,.32);
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cbwc-odd-num {
          font-size: 13px;
          line-height: 13px;
          font-weight: 1000;
          color: #fff;
          letter-spacing: .5px;
        }

        .cbwc-next {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(255,207,45,.55);
          background: #050505;
          color: #ffd42f;
          font-size: 26px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 16px rgba(255,207,45,.24);
          z-index: 5;
          pointer-events: none;
        }

        .cbwc-empty {
          padding: 16px;
          text-align: center;
          font-size: 13px;
          font-weight: 800;
          color: #fff;
        }

        @media (max-width: 768px) {
          #cb-worldcup-widget {
            width: calc(100% - 10px);
            padding: 12px 10px;
            margin: 8px auto;
          }

          .cbwc-heading {
            font-size: 15px;
          }

          .cbwc-card {
            flex: 0 0 214px;
          }

          .cbwc-next {
            width: 31px;
            height: 31px;
            font-size: 22px;
          }
        }
      </style>

      <div class="cbwc-top">
        <div class="cbwc-icon">🏆</div>
        <div class="cbwc-heading">Rekomendasi Pertandingan</div>
      </div>

      ${
        matches && matches.length
          ? `
            <div class="cbwc-scroll-wrap">
              <div class="cbwc-scroll">
                ${matches.slice(0, 30).map(function (m, i) {
                  const aRaw = String(m.teamA || "");
                  const bRaw = String(m.teamB || "");

                  const teamA = escapeHtml(shortName(aRaw));
                  const teamB = escapeHtml(shortName(bRaw));
                  const tanggal = escapeHtml(m.tanggal || "");
                  const jam = escapeHtml(m.jam || "");
                  const homeOdd = makeOdd(i, "home");
                  const awayOdd = makeOdd(i, "away");

                  return `
                    <a class="cbwc-card" href="${SBO_LINK}" target="_blank" rel="noopener">
                      <div class="cbwc-league">🏆 WORLD CUP 2026 (IN CANADA, MEXICO & USA)</div>

                      <div class="cbwc-match">
                        <div class="cbwc-team">
                          ${getFlag(aRaw)}
                          <span class="cbwc-name">${teamA}</span>
                        </div>

                        <div class="cbwc-mid">
                          <div class="cbwc-date">${tanggal}</div>
                          <div class="cbwc-time">${jam} WIB</div>
                          <div class="cbwc-live">⚽</div>
                        </div>

                        <div class="cbwc-team">
                          ${getFlag(bRaw)}
                          <span class="cbwc-name">${teamB}</span>
                        </div>
                      </div>

                      <div class="cbwc-market">FT Handicap</div>

                      <div class="cbwc-odds">
                        <div class="cbwc-odd">
                          <div class="cbwc-odd-label">Home 0</div>
                          <div class="cbwc-odd-num">${homeOdd}</div>
                        </div>

                        <div class="cbwc-odd">
                          <div class="cbwc-odd-label">Away 0</div>
                          <div class="cbwc-odd-num">${awayOdd}</div>
                        </div>
                      </div>
                    </a>
                  `;
                }).join("")}
              </div>

              <div class="cbwc-next">›</div>
            </div>
          `
          : `<div class="cbwc-empty">Belum ada jadwal pertandingan aktif.</div>`
      }
    `;

    return section;
  }

  function findInsertTarget() {
    const candidates = [
      '[class*="provider"]',
      '[class*="Provider"]',
      '[class*="dLTxpX"]',
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
