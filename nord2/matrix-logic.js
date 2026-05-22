function resetSystem() {
    console.log("Reset-Vektor initialisiert...");
    
    // 1. Alle Videos stoppen, aber Vorschaubilder erhalten (Synchronisations-Exekutive)
    document.querySelectorAll('iframe').forEach(f => {
        const source = f.getAttribute('data-src');
        if (source) {
            // Wir überschreiben die src mit den Basis-Parametern ohne Autoplay.
            // Das stoppt das Video sofort und lädt die Vorschau neu, statt alles schwarz zu färben.
            f.src = source + "?playsinline=1&rel=0&modestbranding=1";
        }
    });

    // 2. Das Overlay sicher adressieren
    const overlay = document.getElementById('reset-overlay');
    if (overlay) {
        overlay.style.display = 'block';
    } else {
        console.error("Fehler: reset-overlay im Ur-Depot nicht gefunden!");
    }

    // 3. URL säubern (Anker entfernen)
    history.pushState("", document.title, window.location.pathname);
    
    // 4. Sanfter Scroll nach oben
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


window.addEventListener('load', () => {
    const fullHash = window.location.hash;
    if (!fullHash) return;

    // Splitten in Anker (#L111) und Parameter (?p=1...)[cite: 2]
    const parts = fullHash.split('?');
    const targetAnchor = parts[0]; 
    const paramString = parts[1];

    if (paramString) {
        // --- LOGIK FÜR VIDEO-SEKTOREN ---[cite: 2]
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
        // --- LOGIK FÜR REINE TEXT-SEKTOREN (z.B. #L111) ---[cite: 2]
        setTimeout(() => {
            const targetEl = document.querySelector(targetAnchor);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Rotes Neon-Design bei Fokus[cite: 2]
                targetEl.style.backgroundColor = "rgba(255, 17, 17, 0.2)";
                setTimeout(() => { targetEl.style.backgroundColor = "transparent"; }, 1000);
            }
        }, 100); // 100ms reicht für Text-Sektoren auf GitHub aus[cite: 2]
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
            // Muted=1 ist zwingend erforderlich, damit Mobilgeräte Autoplay erlauben
            const inlineParams = "?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1";
            iframe.src = source + inlineParams;
        }
    }
}
