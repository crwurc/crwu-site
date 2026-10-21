/* CRWU sign-up page: tape strip and the form. Each sign-up is appended to the
   "CRWU Sign-ups" Google Sheet through its Apps Script web app
   (see google-sheet-script.gs). */
(function () {
  // The sheet's Apps Script web app URL (Deploy > Web app).
  var SHEET_URL = 'https://script.google.com/macros/s/AKfycbwn4lbR60LHz9Tp90YNJKiCjft1uGcUnNJRtEl8RShgx9tVZb25a9ak-bbkwcLRHqJy/exec';

  // Repeat the rallying cry twice so the marquee loops seamlessly.
  var tape = document.getElementById('tape');
  var html = '';
  for (var i = 0; i < 32; i++) html += '<span>ANY PACE ✦</span>';
  tape.innerHTML = html;

  var form = document.getElementById('signupForm');
  var statusEl = document.getElementById('status');
  var btn = document.getElementById('submitBtn');

  function setStatus(msg, err) {
    statusEl.textContent = msg || '';
    statusEl.className = 'status' + (err ? ' err' : '');
  }

  function showDone(name) {
    document.getElementById('formWrap').hidden = true;
    document.getElementById('done').hidden = false;
    var first = name ? name.split(' ')[0] + ', see' : 'See';
    document.getElementById('doneMsg').textContent = first + ' you Thursday at 6:30 PM.';
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var f = form.elements;
    if (f.website.value) { showDone(''); return; }

    var name = f.name.value.trim();
    var email = f.email.value.trim();
    if (!name) { setStatus('Add your name so we know who to look for.', true); f.name.focus(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus("That email doesn't look right. Check it and try again.", true); f.email.focus(); return; }
    if (!SHEET_URL) { setStatus('Sign-ups open soon. For now, DM @crwurc on Instagram.', true); return; }

    var modeEl = form.querySelector('input[name=mode]:checked');
    var data = {
      name: name.slice(0, 120),
      email: email.slice(0, 200),
      phone: f.phone.value.trim().slice(0, 40),
      mode: modeEl ? modeEl.value : '',
      remind: f.remind.checked
    };

    btn.disabled = true;
    setStatus('Saving…');
    try {
      // Apps Script can't answer a cross-site request in a way the page can
      // read, so a request that reaches Google counts as saved.
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data)
      });
      setStatus('');
      showDone(name);
    } catch (err) {
      setStatus("Couldn't save your sign-up. Check your connection and try again, or DM @crwurc on Instagram.", true);
    } finally {
      btn.disabled = false;
    }
  });
})();
