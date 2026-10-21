/**
 * CRWU sign-ups -> Google Sheet.
 *
 * In the "CRWU Sign-ups" sheet: Extensions > Apps Script, paste this, Save.
 * Deploy > New deployment > Web app, Execute as: Me, Who has access: Anyone.
 * The web app URL goes into SHEET_URL in app.js.
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActive().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Signed up', 'Name', 'Email', 'Phone', "How they're coming", 'Wants reminders']);
      sheet.setFrozenRows(1);
    }
    const d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const name = clean(d.name, 120);
    const email = clean(d.email, 200);
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return done();
    sheet.appendRow([new Date(), name, email, clean(d.phone, 40), clean(d.mode, 40), d.remind ? 'Yes' : 'No']);
  } finally {
    lock.releaseLock();
  }
  return done();
}

// Trim, cap the length, and stop a value like "=..." being run as a formula.
function clean(value, max) {
  const s = String(value == null ? '' : value).trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function done() {
  return ContentService.createTextOutput('ok');
}
