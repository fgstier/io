/**
 * jump-logic.js
 * Spezifischer Anker-Treiber für dusseline2_jump.html
 * Dekoppelt vom Video-HUD zur Vermeidung von Timing-Konflikten.
 */
window.addEventListener('DOMContentLoaded', () => {
    const targetAnchor = window.location.hash;

    if (targetAnchor && targetAnchor.startsWith('#L')) {
        // Den Kohärenz-Kuratoren 300ms Render-Zeit gewähren,
        // damit der DOM-Baum auf den GitHub-Servern stabil steht
        setTimeout(() => {
            const targetElement = document.querySelector(targetAnchor);
            
            if (targetElement) {
                // Sanft und präzise an den Ziel-Sektor heranscrollen
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });

                // Optischer Fokus-Effekt: Sektor kurz dezent flashen lassen
                targetElement.style.transition = "background-color 0.5s ease";
                targetElement.style.backgroundColor = "rgba(0, 243, 255, 0.08)";
                
                // Nach 1,5 Sekunden die Markierung wieder weich ausblenden
                setTimeout(() => {
                    targetElement.style.backgroundColor = "transparent";
                }, 1500);
            }
        }, 300);
    }
});