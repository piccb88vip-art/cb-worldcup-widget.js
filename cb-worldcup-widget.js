(function () {
  const API_URL = "https://script.google.com/macros/s/AKfycbwtg26SSgLniBFMJ2jVc9ZVdSfsuQmk8_70w6KEtE_gR-qWBpyUlpB90GumTYDgQB-x/exec";
  const SBO_LINK = "https://click-lynk.com/SBO_CBWL";

  const flagCodes = {
    "Mexico": "mx", "South Africa": "za", "Korea Republic": "kr", "Czechia": "cz",
    "Canada": "ca", "Bosnia and Herzegovina": "ba", "United States": "us", "USA": "us",
    "Paraguay": "py", "Qatar": "qa", "Switzerland": "ch", "Brazil": "br",
    "Morocco": "ma", "Haiti": "ht", "Scotland": "gb-sct", "Australia": "au",
    "Netherlands": "nl", "Japan": "jp", "Ivory Coast": "ci", "Ecuador": "ec",
    "Sweden": "se", "Tunisia": "tn", "Spain": "es", "Cape Verde": "cv",
    "Belgium": "be", "Egypt": "eg", "Saudi Arabia": "sa", "Uruguay": "uy",
    "Iran": "ir", "New Zealand": "nz", "France": "fr", "Senegal": "sn",
    "Argentina": "ar", "Portugal": "pt", "England": "gb-eng", "Croatia": "hr",
    "Ghana": "gh", "Panama": "pa", "Uzbekistan": "uz", "Colombia": "co"
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
    return {
      "Korea Republic": "South Korea",
      "Bosnia and Herzegovina": "Bosnia & Her...",
      "United States": "USA"
    }[name] || name;
  }

  function getFlag(name) {
    const team = String(name || "").trim();
    const code = flagCodes[team];
    return code
      ? `<img class="cbwc-flag-img" src="https://flagcdn.com/w40/${code}.png" alt="${escapeHtml(team)}" loading="lazy">`
      : `<span class="cbwc-ball">⚽</span>`;
  }

  function makeOdd(i, side) {
    const home = [0.82, 0.80, 0.78, -0.95, 0.65, -0.86, 0.85, 0.72];
    const away = [-0.92, -0.90, -0.88, 0.85, -0.75, 0.76, -0.95, -0.82];
    return (side === "home" ? home : away)[i % 8];
  }

  function buildWidget(matches) {
    const section = document.createElement("section");
    section.id = "cb-worldcup-widget";

    section.innerHTML = `
      <style>
        #cb-worldcup-widget {
          width: calc(100% - 16px);
          max-width: 1485px;
          margin: 12px auto 14px;
          padding: 16px 18px 14px;
          border-radius: 8px;
          color: #fff;
          font-family: Arial, Helvetica, sans-serif;
          background: linear-gradient(180deg, #07152a, #05080d);
          box-shadow: inset 0 0 0 1px rgba(75,140,255,.22);
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        #cb-worldcup-widget * { box-sizing: border-box; }

        .cbwc-top {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(95,155,255,.35);
          margin-bottom: 12px;
        }

        .cbwc-icon {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle, #2b6dff, #06183d);
          border: 1px solid rgba(100,165,255,.8);
          font-size: 14px;
        }

        .cbwc-heading {
          font-size: 17px;
          font-weight: 900;
          color: #fff;
        }

        .cbwc-brand {
          color: #ff1d1d;
          margin-left: 6px;
          text-shadow: 0 0 7px rgba(255,0,0,.75);
          font-weight: 1000;
        }

        .cbwc-scroll-wrap {
          position: relative;
          padding: 0 38px;
        }

        .cbwc-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 0 0 8px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }

        .cbwc-scroll::-webkit-scrollbar { height: 6px; }
        .cbwc-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,.12); border-radius: 999px; }
        .cbwc-scroll::-webkit-scrollbar-thumb { background: linear-gradient(90deg, #155dcb, #7db5ff); border-radius: 999px; }

        .cbwc-card {
          flex: 0 0 218px;
          min-height: 154px;
          padding: 9px;
          border-radius: 7px;
          background: linear-gradient(180deg, #12336d, #071b3d);
          border: 1px solid rgba(90,155,255,.32);
          scroll-snap-align: start;
          color: #fff;
          text-decoration: none;
        }

        .cbwc-card:hover { filter: brightness(1.1); }

        .cbwc-league {
          font-size: 6px;
          font-weight: 900;
          color: #8fc2ff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 8px;
        }

        .cbwc-match {
          display: grid;
          grid-template-columns: 1fr 54px 1fr;
          gap: 5px;
        }

        .cbwc-team { text-align: center; min-width: 0; }

        .cbwc-flag-img {
          width: 29px;
          height: 20px;
          object-fit: cover;
          border-radius: 2px;
          display: block;
          margin: 0 auto 5px;
        }

        .cbwc-name {
          display: block;
          font-size: 7px;
          font-weight: 800;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cbwc-mid { text-align: center; padding-top: 2px; }
        .cbwc-date { font-size: 7px; color: rgba(255,255,255,.45); }
        .cbwc-time { font-size: 11px; font-weight: 900; }
        .cbwc-live { font-size: 9px; color: rgba(255,255,255,.35); margin-top: 3px; }

        .cbwc-market {
          margin-top: 13px;
          text-align: center;
          font-size: 7px;
          font-weight: 900;
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
          background: rgba(120,170,255,.10);
          border: 1px solid rgba(120,170,255,.18);
          padding: 5px 6px;
        }

        .cbwc-odd-label { font-size: 6px; color: rgba(255,255,255,.35); }
        .cbwc-odd-num { font-size: 13px; font-weight: 1000; color: #fff; }

        .cbwc-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-58%);
          width: 34px;
          height: 46px;
          border-radius: 10px;
          border: 1px solid rgba(110,180,255,.75);
          background: linear-gradient(180deg, #123d8f, #061b47);
          color: #eaf4ff;
          font-size: 28px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 8;
          cursor: pointer;
          padding: 0;
        }

        .cbwc-prev { left: 0; }
        .cbwc-next { right: 0; }

        @media (max-width: 768px) {
          #cb-worldcup-widget { width: calc(100% - 10px); padding: 12px 10px; }
          .cbwc-scroll-wrap { padding: 0 32px; }
          .cbwc-card { flex: 0 0 214px; }
          .cbwc-heading { font-size: 15px; }
        }
      </style>

      <div class="cbwc-top">
        <div class="cbwc-icon">🏆</div>
        <div class="cbwc-heading">Rekomendasi Pertandingan <span class="cbwc-brand">CLICKBET88</span></div>
      </div>

      <div class="cbwc-scroll-wrap">
        <button class="cbwc-nav cbwc-prev" type="button">‹</button>

        <div class="cbwc-scroll">
          ${(matches || []).slice(0, 30).map(function (m, i) {
            const aRaw = String(m.teamA || "");
            const bRaw = String(m.teamB || "");

            return `
              <a class="cbwc-card" href="${SBO_LINK}" target="_blank" rel="noopener">
                <div class="cbwc-league">🏆 WORLD CUP 2026 (IN CANADA, MEXICO & USA)</div>

                <div class="cbwc-match">
                  <div class="cbwc-team">
                    ${getFlag(aRaw)}
                    <span class="cbwc-name">${escapeHtml(shortName(aRaw))}</span>
                  </div>

                  <div class="cbwc-mid">
                    <div class="cbwc-date">${escapeHtml(m.tanggal || "")}</div>
                    <div class="cbwc-time">${escapeHtml(m.jam || "")}<br>WIB</div>
                    <div class="cbwc-live">⚽</div>
                  </div>

                  <div class="cbwc-team">
                    ${getFlag(bRaw)}
                    <span class="cbwc-name">${escapeHtml(shortName(bRaw))}</span>
                  </div>
                </div>

                <div class="cbwc-market">FT Handicap</div>

                <div class="cbwc-odds">
                  <div class="cbwc-odd">
                    <div class="cbwc-odd-label">Home 0</div>
                    <div class="cbwc-odd-num">${makeOdd(i, "home")}</div>
                  </div>
                  <div class="cbwc-odd">
                    <div class="cbwc-odd-label">Away 0</div>
                    <div class="cbwc-odd-num">${makeOdd(i, "away")}</div>
                  </div>
                </div>
              </a>
            `;
          }).join("")}
        </div>

        <button class="cbwc-nav cbwc-next" type="button">›</button>
      </div>
    `;

    return section;
  }

  function findTopGamesBar() {
    const all = Array.from(document.querySelectorAll("div, section, nav"));

    const exact = all.find(function (el) {
      const text = (el.innerText || "").trim();
      const rect = el.getBoundingClientRect();
      return text.includes("Top Games") && rect.width > 600 && rect.height >= 40 && rect.height <= 120;
    });

    if (exact) return exact;

    return null;
  }

  function insertWidget(widget) {
    if (document.getElementById("cb-worldcup-widget")) return false;

    const topGames = findTopGamesBar();

    if (topGames && topGames.parentNode) {
      topGames.parentNode.insertBefore(widget, topGames);
      return true;
    }

    return false;
  }

  function attachButtons(widget) {
    const scrollBox = widget.querySelector(".cbwc-scroll");
    const prevBtn = widget.querySelector(".cbwc-prev");
    const nextBtn = widget.querySelector(".cbwc-next");

    if (!scrollBox) return;

    if (nextBtn) {
      nextBtn.onclick = function () {
        scrollBox.scrollBy({ left: 460, behavior: "smooth" });
      };
    }

    if (prevBtn) {
      prevBtn.onclick = function () {
        scrollBox.scrollBy({ left: -460, behavior: "smooth" });
      };
    }
  }

  function start(matches) {
    let tries = 0;

    const timer = setInterval(function () {
      tries++;

      if (document.getElementById("cb-worldcup-widget")) {
        clearInterval(timer);
        return;
      }

      const widget = buildWidget(matches);
      const ok = insertWidget(widget);

      if (ok) {
        attachButtons(widget);
        clearInterval(timer);
      }

      if (tries >= 40) {
        clearInterval(timer);
      }
    }, 500);
  }

  function init() {
    fetch(API_URL + "?t=" + Date.now())
      .then(function (r) { return r.json(); })
      .then(function (res) {
        start(res.matches || res.data || []);
      })
      .catch(function (err) {
        console.log("CB World Cup Widget Error:", err);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
