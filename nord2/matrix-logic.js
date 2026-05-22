function resetSystem() {
    console.log("Reset-Vektor initialisiert...");
    
    // 1. Alle Videos stoppen (Synchronisations-Exekutive)
    document.querySelectorAll('iframe').forEach(f => {
        f.src = "";
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

    // --- NEU: INITIALISIERUNG DES INTERSECTION-OBSERVERS FÜR LINEARES SCROLLEN ---
    // Lädt Videos dynamisch nach, sobald man sich ihnen im Sektor nähert
    const sektorObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target.querySelector('iframe');
                // Nur laden, wenn ein IFrame existiert und noch keine src gesetzt wurde
                if (iframe && !iframe.src) {
                    const source = iframe.getAttribute('data-src');
                    if (source) {
                        iframe.src = source + "?playsinline=1&rel=0&modestbranding=1";
                        console.log(`Sektor ${entry.target.id} via Scroll-Integrität geladen.`);
                    }
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: "120px 0px", // Lädt das Video etwas vor dem Sichtkontakt
        threshold: 0.05
    });

    // Alle Einträge im System für die Scroll-Überwachung registrieren
    document.querySelectorAll('.entry').forEach(sektor => {
        sektorObserver.observe(sektor);
    });


    // --- BESTEHENDE DIREKT-AUFRUF-LOGIK (UNVERÄNDERT & ERWEITERT) ---
    if (!fullHash) return;

    // Splitten in Anker (#L111) und Parameter (?p=1...)
    const parts = fullHash.split('?');
    const targetAnchor = parts[0]; 
    const paramString = parts[1];

    if (paramString) {
        // --- LOGIK FÜR VIDEO-SEKTOREN ---
        const urlParams = new URLSearchParams(paramString);
        const coordsData = urlParams.get('coords');

        if (coordsData) {
            const idPart = coordsData.split('|')[0].split(':')[0];
            const coordValues = coordsData.split('|')[0].split(':')[1];
            
            // Aktiviert das Video und setzt die korrekten Dimensionen
            activateSektor("L" + idPart, coordValues);
            
            setTimeout(() => {
                const targetEl = document.querySelector(targetAnchor);
                if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500); 
        }
    } else {
        // --- LOGIK FÜR REINE TEXT-SEKTOREN (z.B. #L111) ---
        // Lädt das Video direkt, falls der Anker zufällig auf ein Video ohne Parameter zeigt
        const directId = targetAnchor.replace('#', '');
        const directEl = document.getElementById(directId);
        if (directEl) {
            const iframe = directEl.querySelector('iframe');
            if (iframe && !iframe.src) {
                const source = iframe.getAttribute('data-src');
                if (source) iframe.src = source + "?playsinline=1&rel=0&modestbranding=1";
            }
        }

        // Der visuelle Trigger für die Kohärenz-Kuratoren
        setTimeout(() => {
            const targetEl = document.querySelector(targetAnchor);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Rotes Neon-Design bei Fokus
                targetEl.style.backgroundColor = "rgba(255, 17, 17, 0.2)";
                setTimeout(() => { targetEl.style.backgroundColor = "transparent"; }, 1000);
            }
        }, 100); // 100ms reicht für Text-Sektoren auf GitHub aus
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
            // autoplay=1 zündet hier direkt, weil der Nutzer den Sektor explizit aufgerufen hat
            const inlineParams = "?autoplay=1&playsinline=1&rel=0&modestbranding=1";
            iframe.src = source + inlineParams;
        }
    }
}
