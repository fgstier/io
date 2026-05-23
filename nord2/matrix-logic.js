function resetSystem() {
    console.log("Reset init...");
    document.querySelectorAll('iframe').forEach(f => {
        const source = f.getAttribute('data-src');
        if (source) {
            f.src = source + "?playsinline=1&rel=0&modestbranding=1";
        }
    });
    const overlay = document.getElementById('reset-overlay');
    if (overlay) overlay.style.display = 'block';
    history.pushState("", document.title, window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            
            activateSektor("L" + idPart, coordValues);
            
            setTimeout(() => {
                const targetEl = document.querySelector(targetAnchor);
                if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500); 
        }
    } else {
        setTimeout(() => {
            const targetEl = document.querySelector(targetAnchor);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                targetEl.style.backgroundColor = "rgba(255, 17, 17, 0.2)";
                setTimeout(() => { targetEl.style.backgroundColor = "transparent"; }, 1000);
            }
        }, 100);
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
            iframe.src = source + "?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1";
        }
    }
}
