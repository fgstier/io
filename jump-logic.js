/**
 * jump-logic.js
 * Spezifischer Anker-Treiber für dusseline2_jump.html
 * Dekoppelt vom Video-HUD zur Vermeidung von Timing-Konflikten.
 */
/**
 * jump-logic.js
 * Spezifischer Anker-Treiber für dusseline2_jump.html
 */
window.addEventListener('DOMContentLoaded', () => {
    // ===================================================
    // ANTI-KÄFIG-RADIKALKURI: HUD-Elemente im Parent kappen
    // ===================================================
    try {
        // Wir prüfen, ob ein übergeordnetes HUD-Fenster (window.top) existiert
        const masterWindow = window.top || window.opener;
        
        if (masterWindow && masterWindow !== window) {
            const doc = masterWindow.document;
            
            // 1. Den blockierten Mute-Button im HUD rigoros ausblenden
            const masterButton = doc.getElementById('audio-stop-btn');
            if (masterButton) {
                masterButton.style.display = 'none';
            }
            
            // 2. Das HUD-Textfeld auf der Hauptseite schließen
            const masterHud = doc.getElementById('hud');
            if (masterHud) {
                masterHud.classList.remove('active');
            }

            // 3. Eventuelle YouTube-Reste auf der Hauptseite stoppen
            const masterPlayer = doc.getElementById('youtube-player');
            const masterContainer = doc.getElementById('youtube-overlay-container');
            if (masterPlayer && masterContainer) {
                masterContainer.style.display = 'none';
                masterPlayer.src = '';
            }
        }
    } catch (e) {
        // Falls Browser-Sicherheitsrichtlinien (CORS) den Zugriff blockieren,
        // fangen wir den Fehler geräuschlos ab.
        console.log("HUD-Cleanup via Parent-Achse blockiert: ", e.message);
    }

    // ===================================================
    // ANKER-SPRUNG: Sofort-Schnitt statt zähes Gleiten
    // ===================================================
    const targetAnchor = window.location.hash;

    if (targetAnchor && targetAnchor.startsWith('#L')) {
        // Kurze Atempause für das GitHub-Rendering
        setTimeout(() => {
            const targetElement = document.querySelector(targetAnchor);
            
            if (targetElement) {
                // 'auto' sorgt für den blitzschnellen Sprung ohne Verzögerung
                targetElement.scrollIntoView({ 
                    behavior: 'auto', 
                    block: 'start' 
                });

                // Optischer Fokus: Sektor kurz im roten Neon-Stil flashen lassen
                targetElement.style.transition = "background-color 0.3s ease";
                targetElement.style.backgroundColor = "rgba(255, 17, 17, 0.15)";
                
                setTimeout(() => {
                    targetElement.style.backgroundColor = "transparent";
                }, 1000);
            }
        }, 150); 
    }
});
