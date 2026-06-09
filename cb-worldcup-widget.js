(function () {
  const API_URL = "https://script.google.com/macros/s/AKfycbwtg26SSgLniBFMJ2jVc9ZVdSfsuQmk8_70w6KEtE_gR-qWBpyUlpB90GumTYDgQB-x/exec";
  const PREDIKSI_LINK = "https://click-lynk.com/CBEVNT2-FIFAWORLDCUP";
  const SBO_LINK = "https://click-lynk.com/SBO_CBWL";

  const flags = {
    "Mexico": "🇲🇽", "South Africa": "🇿🇦", "Korea Republic": "🇰🇷", "Czechia": "🇨🇿",
    "Canada": "🇨🇦", "Bosnia and Herzegovina": "🇧🇦", "United States": "🇺🇸", "Paraguay": "🇵🇾",
    "Qatar": "🇶🇦", "Switzerland": "🇨🇭", "Brazil": "🇧🇷", "Morocco": "🇲🇦",
    "Haiti": "🇭🇹", "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "Australia": "🇦🇺", "Turkiye": "🇹🇷",
    "Germany": "🇩🇪", "Curacao": "🇨🇼", "Netherlands": "🇳🇱", "Japan": "🇯🇵",
    "Ivory Coast": "🇨🇮", "Ecuador": "🇪🇨", "Sweden": "🇸🇪", "Tunisia": "🇹🇳",
    "Spain": "🇪🇸", "Cape Verde": "🇨🇻", "Belgium": "🇧🇪", "Egypt": "🇪🇬",
    "Saudi Arabia": "🇸🇦", "Uruguay": "🇺🇾", "Iran": "🇮🇷", "New Zealand": "🇳🇿",
    "France": "🇫🇷", "Senegal": "🇸🇳", "Iraq": "🇮🇶", "Norway": "🇳🇴",
    "Argentina": "🇦🇷", "Algeria": "🇩🇿", "Austria": "🇦🇹", "Jordan": "🇯🇴",
    "Portugal": "🇵🇹", "DR Congo": "🇨🇩", "England": "🏴", "Croatia": "🇭🇷",
    "Ghana": "🇬🇭", "Panama": "🇵🇦", "Uzbekistan": "🇺🇿", "Colombia": "🇨🇴"
  };

  function flag(name) {
    return flags[name] || "⚽";
  }

  function buildWidget(matches) {
    const box = document.createElement("section");
    box.id = "cb-worldcup-widget";
    box.innerHTML = `
      <style>
        #cb-worldcup-widget{
          margin:14px auto;
          max-width:1180px;
          padding:14px;
          background:linear-gradient(180deg,#08122d,#02050f);
          border:1px solid #ffd45a;
          border-radius:14px;
          box-shadow:0 0 18px rgba(0,95,255,.35);
          font-family:Arial,sans-serif;
          color:#fff;
        }
        .cbwc-head{
          display:flex;
          align-items:center;
          gap:10px;
          margin-bottom:12px;
          font-weight:900;
          color:#ffd45a;
          font-size:18px;
        }
        .cbwc-sub{
          font-size:12px;
          color:#cfe3ff;
          margin-left:auto;
        }
        .cbwc-scroll{
          display:flex;
          gap:12px;
          overflow-x:auto;
          padding-bottom:6px;
          scroll-snap-type:x mandatory;
        }
        .cbwc-card{
          flex:0 0 245px;
          scroll-snap-align:start;
          background:linear-gradient(180deg,#13245a,#07102c);
          border:1px solid rgba(255,212,90,.65);
          border-radius:12px;
          padding:12px;
          text-align:center;
          transition:.25s ease;
          box-shadow:inset 0 0 12px rgba(255,212,90,.08);
        }
        .cbwc-card:hover{
          transform:scale(1.035);
          box-shadow:0 0 16px rgba(255,212,90,.45);
        }
        .cbwc-league{
          font-size:10px;
          color:#ffd45a;
          font-weight:800;
          margin-bottom:8px;
        }
        .cbwc-teams{
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:8px;
          font-weight:800;
          font-size:12px;
          min-height:45px;
        }
        .cbwc-team{
          width:42%;
          overflow:hidden;
          text-overflow:ellipsis;
        }
        .cbwc-flag{
          font-size:25px;
          display:block;
          margin-bottom:4px;
        }
        .cbwc-vs{
          color:#ffd45a;
          font-weight:900;
        }
        .cbwc-time{
          margin:10px 0;
          color:#fff;
          font-size:13px;
          font-weight:800;
        }
        .cbwc-group{
          color:#9ec3ff;
          font-size:11px;
          margin-bottom:10px;
        }
        .cbwc-actions{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:7px;
        }
        .cbwc-btn{
          text-decoration:none;
          color:#fff;
          font-size:11px;
          font-weight:900;
          padding:8px 6px;
          border-radius:8px;
          border:1px solid #ffd45a;
        }
        .cbwc-prediksi{
          background:#0a44c9;
        }
        .cbwc-bet{
          background:#d99000;
        }
        @media(max-width:600px){
          #cb-worldcup-widget{
            margin:10px 8px;
            padding:10px;
          }
          .cbwc-card{
            flex-basis:220px;
          }
          .cbwc-head{
            font-size:15px;
          }
          .cbwc-sub{
            display:none;
          }
        }
      </style>

      <div class="cbwc-head">
        🏆 WORLD CUP MATCH CENTER
        <span class="cbwc-sub">Prediksi Skor & Dukung Tim Favoritmu</span>
      </div>

      <div class="cbwc-scroll">
        ${matches.slice(0, 24).map(m => `
          <div class="cbwc-card">
            <div class="cbwc-league">🏆 WORLD CUP 2026</div>
            <div class="cbwc-teams">
              <div class="cbwc-team">
                <span class="cbwc-flag">${flag(m.teamA)}</span>
                ${m.teamA}
              </div>
              <div class="cbwc-vs">VS</div>
              <div class="cbwc-team">
                <span class="cbwc-flag">${flag(m.teamB)}</span>
                ${m.teamB}
              </div>
            </div>
            <div class="cbwc-time">${m.tanggal} • ${m.jam} WIB</div>
            <div class="cbwc-group">${m.group || "WORLD CUP"}</div>
            <div class="cbwc-actions">
              <a class="cbwc-btn cbwc-prediksi" href="${PREDIKSI_LINK}" target="_blank">PREDIKSI</a>
              <a class="cbwc-btn cbwc-bet" href="${SBO_LINK}" target="_blank">BET SEKARANG</a>
            </div>
          </div>
        `).join("")}
      </div>
    `;
    return box;
  }

  function insertWidget(widget) {
    if (document.getElementById("cb-worldcup-widget")) return;

    const providerArea =
      document.querySelector('[class*="dLTxpX"]') ||
      document.querySelector('[class*="provider"]') ||
      document.querySelector('[class*="top"]');

    if (providerArea && providerArea.parentNode) {
      providerArea.parentNode.insertBefore(widget, providerArea.nextSibling);
      return;
    }

    const page = document.querySelector("#page-wrap") || document.body;
    page.prepend(widget);
  }

  fetch(API_URL)
    .then(r => r.json())
    .then(res => {
      if (!res.success || !res.matches || !res.matches.length) return;
      insertWidget(buildWidget(res.matches));
    })
    .catch(err => console.log("CB Worldcup Widget Error:", err));
})();
