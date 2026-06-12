const SHEET_ID = "1UtVYZpp1q9bmvySiIbPVyqi5tEY0BOinZGU4b3YJv8Y";
const SHEET_NAME = "MATCH";

function doGet() {
  const sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  if (!sh) return out({ success:false, matches:[] });

  SpreadsheetApp.flush();

  const lastRow = sh.getLastRow();
  if (lastRow < 2) return out({ success:true, matches:[] });

  const rows = sh.getRange(2, 1, lastRow - 1, 11).getDisplayValues();

  const matches = rows.map(r => ({
    matchId: String(r[0] || "").trim(),
    teamA: String(r[1] || "").trim(),
    teamB: String(r[2] || "").trim(),
    tanggal: String(r[3] || "").trim(),
    jam: String(r[4] || "").trim(),
    scoreA: String(r[5] || "").trim(),
    scoreB: String(r[6] || "").trim(),
    group: String(r[7] || "").trim(),
    status: String(r[8] || "UPCOMING").trim().toUpperCase(),
    homeOdds: String(r[9] || "").trim(),
    awayOdds: String(r[10] || "").trim()
  })).filter(m => m.matchId && m.teamA && m.teamB);

  return out({ success:true, total:matches.length, matches });
}

function out(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
