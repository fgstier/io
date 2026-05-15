function resetSystem() {
    document.querySelectorAll('iframe').forEach(f => f.src = "");
    document.getElementById('reset-overlay').style.display = 'block';
    history.pushState("", document.title, window.location.pathname);
}


window.addEventListener('load', () => {
    const fullHash = window.location.hash;
    if (!fullHash) return;

    const parts = fullHash.split('?');
    const targetAnchor = parts[0]; 
    const paramString = parts[1];

    if (paramString) {
        const urlParams = new URLSearchParams(paramString);
        const coordsData = urlParams.get('coords');

        if (coordsData) {
            const idPart = coordsData.split('|')[0].split(':')[0];
            const coordValues = coordsData.split('|')[0].split(':')[1];
            
            // 1. Sektor aktivieren (Raum aufspannen & Video laden)
            activateSektor("L" + idPart, coordValues);
            
            // 2. Verzögerter Sprung, damit die Seite "Zeit hat zu wachsen"
            setTimeout(() => {
                const targetEl = document.querySelector(targetAnchor);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 500); // 500ms ist der Sicherheits-Puffer
        }
    }
});

function activateSektor(elementId, coordString) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const parts = coordString.split(',');
    const w = parts[2] || "100"; 
    const h = parts[3] || "177"; 

    const wrapper = el.querySelector('.video-wrapper');
    const iframe = el.querySelector('iframe');

    if (wrapper && iframe) {
        wrapper.style.width = w + "%";
        wrapper.style.paddingBottom = h + "%"; 
        
        const source = iframe.getAttribute('data-src');
        if (source) {
            // playsinline=1 ist kritisch für iPhone-Stabilität
            const inlineParams = "?autoplay=1&playsinline=1&rel=0&modestbranding=1";
            iframe.src = source + inlineParams;
        }
    }
}
