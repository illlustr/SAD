const F = '||', S = '|\\', D = '|+', C = new Map();
async function c(t) {
  if (C.has(t)) return C.get(t);
  const r = await fetch(`${import.meta.url.substring(0, import.meta.url.lastIndexOf('/'))}/${t}.html`);
  const res = await r.text();
  C.set(t, res);
  return res;
}
function u(e, v) {
  const t = e.tagName, [h, i] = v.split('~').map(x => x.trim() || '');
  if (t === 'IMG') e.src = v;
  else if (['A', 'BUTTON'].includes(t)) {
    if (h) t === 'BUTTON' ? e.setAttribute('onclick', `window.open('${h}', '_blank'); return false;`) : e.href = h;
    if (i) e.innerHTML = i;
  } else e.innerHTML = v;
}
function p(f, d, t) {
  const doc = new DOMParser().parseFromString(t, 'text/html');
  f.forEach((v, id) => {
    const el = doc.querySelector(`[T-T="${id}"]`);
    if (el) u(el, v.trim().replace(/\n/g, ''));
  });
  const h = doc.querySelector(`[T-T="+"]`);
  if (h && d.length) {
    d.forEach(v => {
      const el = h.cloneNode(true);
      u(el, v.trim().replace(/\n/g, ''));
      h.parentNode.insertBefore(el, h);
    });
    h.remove();
  }
  return doc.body.innerHTML;
}
async function i() {
  const els = document.querySelectorAll('[😭]');
  const ps = Array.from(els).map(async el => {
    const [fc, dc] = el.innerHTML.trim().split(S).map(x => x.trim());
    const f = fc.split(F).map(x => x.trim()).filter(Boolean),
          d = dc ? dc.split(D).map(x => x.trim()).filter(Boolean) : [],
          t = await c(el.getAttribute('😭'));
    el.outerHTML = p(f, d, t);
  });
  await Promise.all(ps);
}
window.addEventListener('DOMContentLoaded', i);
// https://github.com/naiiveprojects/SAD/