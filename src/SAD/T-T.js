async function cat(ch) {
    const the = await fetch(`sad/${ch}.html`);
    if (!the.ok) {
        throw new Error(`T-T Error catching = ${ch}.html`);
    }
    return the.text();
}

function turn(this, data) {
    const dom = new DOMParser();

    const doc = dom.parseFromString(this, 'text/html');
    data.forEach((value, index) => {
        const id = doc.querySelector(`[T-T="${index}"]`);
        if (!id) return;

        const up = value.replace(/\n/g, '').trim();
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
    const magic = document.querySelectorAll('[sad]');
    for (const element of magic) {
        const ch = element.getAttribute('sad');
        const th = await cat(ch);
        const dt = element.innerHTML.trim().split('):');
        const sus = turn(th, dt);
        element.outerHTML = sus;
    }
}

window.onload = sad;


// ░░░░░░░░░░░░░░░░░░░░░░░░░░░ Title: Sussy Awkward Design
// ░░█▀█░█▀█░█░░░█░░░█░█░█▀▀░░ Act: replace element with template
// ░░█░█░█▀█░░▀▄░░▀▄░▀▄▀░█▀▀░░ Cast[ user device ]
// ░░▀░▀░▀░▀░░░▀░░░▀░░▀░░▀▀▀░░ Writers[ illlustr ]
// ░ Projects ░░░░░░░░░░░░░░░░ https://github.com/naiiveprojects
  