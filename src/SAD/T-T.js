async function cat(ch) {
    const the = await fetch(`SAD/${ch}.html`);
    if (!the.ok) {
        throw new Error(`😭 Error catching = ${ch}.html`);
    }
    return the.text();
}

function turn(th, is) {
    const dom = new DOMParser();

    const doc = dom.parseFromString(th, 'text/html');
    is.forEach((i, s) => {
        const id = doc.querySelector(`[T-T="${s}"]`);
        if (!id) return;

        const up = i.replace(/\n/g, '').trim();
        if (id) {
            switch (id.tagName) {
                case 'IMG':
                    id.setAttribute('src', up);
                    break;
                case 'A':
                    id.setAttribute('href', up);
                    id.textContent = up;
                    break;
                case 'BUTTON':
                    id.setAttribute('onclick', `window.open('${up}'); return true;`);
                    break;
                default:
                    id.textContent = up;
            }
        }
    });
    return doc.body.innerHTML;
}

async function sad() {
    const magic = document.querySelectorAll('[😭]');
    for (const element of magic) {
        const ch = element.getAttribute('😭');
        const th = await cat(ch);
        const is = element.innerHTML.trim().split('||');
        const sus = turn(th, is);
        element.outerHTML = sus;
    }
}

window.onload = sad;


// ░░░░░░░░░░░░░░░░░░░░░░░░░░░ Title: Simply Awful Design
// ░░█▀█░█▀█░█░░░█░░░█░█░█▀▀░░ Act: replace 😭 element with T-T template
// ░░█░█░█▀█░░▀▄░░▀▄░▀▄▀░█▀▀░░ Cast[ user device ]
// ░░▀░▀░▀░▀░░░▀░░░▀░░▀░░▀▀▀░░ Writers[ illlustr ]
// ░ Projects ░░░░░░░░░░░░░░░░ https://github.com/naiiveprojects
  