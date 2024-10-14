const FIXED = '||';
const SPLIT = '|\\';
const DYNAMIC = '|+';
const cache = new Map();
async function catching(template) {
    if (cache.has(template)) {
        return cache.get(template);
    }
    const response = await fetch(`${import.meta.url.substring(0, import.meta.url.lastIndexOf('/'))}/${template}.html`);
    if (!response.ok) {
        throw new Error(`Error fetching template: ${template}.html (Status: ${response.status})`);
    }
    const result = await response.text();
    cache.set(template, result);
    return result;
}
function update(element, value) {
    if (element.tagName === 'IMG') {
        element.src = value;
    } else if (['A', 'BUTTON'].includes(element.tagName)) {
        const [href, innerHTML] = value.split('~').map(item => item?.trim() || '');
        if (href) {
            if (element.tagName === 'BUTTON') {
                element.setAttribute('onclick', `window.open('${href}', '_blank'); return false;`);
            } else {
                element.href = href;
            }
        }
        if (innerHTML) {
            element.innerHTML = innerHTML;
        }
    } else {
        element.innerHTML = value;
    }
}
function populate(fixed, dynamic, template) {
    const doc = new DOMParser().parseFromString(template, 'text/html');
    fixed.forEach((value, id) => {
        const element = doc.querySelector(`[T-T="${id}"]`);
        if (element) {
            update(element, value.trim().replace(/\n/g, ''));
        }
    });
    const holder = doc.querySelector(`[T-T="+"]`);
    if (holder && dynamic.length > 0) {
        dynamic.forEach(value => {
            const element = holder.cloneNode(true);
            update(element, value.trim().replace(/\n/g, ''));
            holder.parentNode.insertBefore(element, holder);
        });
        holder.remove();
    }
    return doc.body.innerHTML;
}
async function init() {
    const elements = document.querySelectorAll('[😭]');
    const promises = Array.from(elements).map(async (element) => {
        const values = element.innerHTML.trim();
        const [fc, dc] = values.split(SPLIT).map(item => item.trim());
        const fixed = fc.split(FIXED).map(item => item.trim()).filter(Boolean);
        const dynamic = dc ? dc.split(DYNAMIC).map(item => item.trim()).filter(Boolean) : [];
        const page = element.getAttribute('😭');
        const template = await catching(page);
        element.outerHTML = populate(fixed, dynamic, template);
    });

    await Promise.all(promises);
}
window.addEventListener('DOMContentLoaded', init);
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░ Title: Simply Awful Design
// ░░█▀█░█▀█░█░░░█░░░█░█░█▀▀░░ Act: replace 😭 element with T-T template
// ░░█░█░█▀█░░▀▄░░▀▄░▀▄▀░█▀▀░░ Cast[ user device ]
// ░░▀░▀░▀░▀░░░▀░░░▀░░▀░░▀▀▀░░ Writers[ illlustr ]
// ░ Projects ░░░░░░░░░░░░░░░░ https://github.com/naiiveprojects