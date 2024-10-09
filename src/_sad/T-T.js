async function cat(ch) {
    const sad = import.meta.url;
    const the = await fetch(`${sad.substring(0, sad.lastIndexOf('/'))}/${ch}.html`);
    if (!the.ok) {
        throw new Error(`😭 Error catching = ${ch}.html`);
    }
    return the.text();
}

function turn(th, is) {
    const dom = new DOMParser();
    const doc = dom.parseFromString(is, 'text/html');
    th.forEach((i, s) => {
        const id = doc.querySelector(`[T-T="${s}"]`);
        if (id) {
            const up = i.replace(/\n/g, '').trim();
            switch (id.tagName) {
                case 'IMG':
                    id.setAttribute('src', up);
                    break;
                case 'A':
                    id.setAttribute('href', up);
                    id.innerHTML = up;
                    break;
                case 'BUTTON':
                    id.setAttribute('onclick', `window.open('${up}'); return true;`);
                    break;
                default:
                    id.innerHTML = up;
            }
        }
    });
    return doc.body.innerHTML;
}

async function sad() {
    for (const pain of document.querySelectorAll('[😭]')) {
        const th = pain.innerHTML.trim().split('||');
        const is = await cat(pain.getAttribute('😭'));
        pain.outerHTML = turn(th, is);
    }
}

window.onload = sad;

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░ Title: Simply Awful Design
// ░░█▀█░█▀█░█░░░█░░░█░█░█▀▀░░ Act: replace 😭 element with T-T template
// ░░█░█░█▀█░░▀▄░░▀▄░▀▄▀░█▀▀░░ Cast[ user device ]
// ░░▀░▀░▀░▀░░░▀░░░▀░░▀░░▀▀▀░░ Writers[ illlustr ]
// ░ Projects ░░░░░░░░░░░░░░░░ https://github.com/naiiveprojects
