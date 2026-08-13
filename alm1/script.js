window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const gesuchteSeite = urlParams.get('seite');
    const target = document.getElementById('content');

    if (!gesuchteSeite || typeof almanachDaten === 'undefined') {
        if (target) target.innerHTML = "<h3>SYSTEM-BRUCH</h3><p>Datenbank oder Parameter fehlen.</p>";
        return;
    }

    let eintraegeGefunden = false;
    let gesamterHtmlInhalt = "";

    const sortierteSchluessel = Object.keys(almanachDaten).sort();

    for (const schluessel of sortierteSchluessel) {
        // Exakter Treffer für die Kombi-ID (z.B. "3_1" oder "10_1")
        if (schluessel === gesuchteSeite) {
            eintraegeGefunden = true;
            const sektor = almanachDaten[schluessel];

            // Globales Design beim ersten Treffer kalibrieren (Hintergrundbild, Leuchtantrieb)
            if (gesamterHtmlInhalt === "") {
                if (sektor.bild) {
                    document.body.style.backgroundImage = `url('./images/${sektor.bild}')`;
                    document.body.style.backgroundSize = "cover";
                    document.body.style.backgroundPosition = "center";
                    document.body.style.backgroundAttachment = "fixed";
                }
                if (sektor.farbe) {
                    document.documentElement.style.setProperty('--system-color', sektor.farbe);
                }
            }

            // Panel-Struktur für die Zentrale Matrix
            gesamterHtmlInhalt += `<div class="matrix-panel">`;
            gesamterHtmlInhalt += `<h3 class="matrix-titel" style="font-size: ${sektor.textGroesse || '20px'};">${sektor.titel}</h3>`;
            gesamterHtmlInhalt += `<p class="status">${sektor.status}</p>`;
            gesamterHtmlInhalt += `<hr class="matrix-line">`;

            // 1. Die normalen Textzeilen ausgeben
            if (sektor.zeilen && Array.isArray(sektor.zeilen)) {
                for (let zeile of sektor.zeilen) {
                    if (typeof zeile === 'object') continue;
                    
                    // ALTE RESTE-FILTERUNG: Falls noch alte String-Trigger im Text stehen, überspringen
                    if (zeile.includes("LIVE_PEGEL_ELBE") || zeile.includes("LIVE_LUFT") || zeile.includes("LIVE_TEMP")) {
                        continue;
                    }
                    
                    gesamterHtmlInhalt += `<p class="matrix-text">${zeile}</p>`;
                }
            }

            // 2. DIREKTE KOPPLUNG AN DIE ID (Der automatische Live-Abschluss)
            let liveDatenText = "";
            try {
                     if (schluessel === "1_1") liveDatenText = await HoleHistorischePegelKatalog();
                else if (schluessel === "2_1") liveDatenText = await HoleDemografieQuartalsdaten();
                else if (schluessel === "3_1") liveDatenText = await HoleSchifffahrtsTelemetrieElbe();
				else if (schluessel === "4_1") liveDatenText = await HoleDemografieDetailSektor();
				else if (schluessel === "5_1") liveDatenText = await HoleStadtbezirksKatalog();
				else if (schluessel === "6_1") liveDatenText = await HoleBrueckenSubstanzRegister();
				else if (schluessel === "7_1") liveDatenText = await HoleUmgebungslaermPegelverlauf();
				else if (schluessel === "8_1") liveDatenText = await HoleFlächennutzungVersiegelung();
				else if (schluessel === "9_1") liveDatenText = await HoleCampusAuslastung();
				else if (schluessel === "10_1") liveDatenText = await HoleSLUBBelegungsDaten();
				else if (schluessel === "11_1") liveDatenText = await HoleAltersstrukturDresden();
				else if (schluessel === "12_1") liveDatenText = await HoleStisaOpenData();



                else if (schluessel === "18_1") liveDatenText = await HoleEchtenElbePegelVomBrowser();
                else if (schluessel === "19_1") liveDatenText = await HoleElbeWassertemperatur();
                else if (schluessel === "20_1") liveDatenText = await HoleElbeDurchfluss();
                else if (schluessel === "21_1") liveDatenText = await HoleEchteLuftqualitaetBergstrasse();
                else if (schluessel === "22_1") liveDatenText = await HoleEchteTemperaturDresden();
                else if (schluessel === "23_1") liveDatenText = await HoleElbeStroemungsgeschwindigkeit();
                else if (schluessel === "24_1") liveDatenText = await HoleElbeLeitfaehigkeit();
                else if (schluessel === "25_1") liveDatenText = await HoleElbeSauerstoffgehalt();
                else if (schluessel === "26_1") liveDatenText = await HoleElbePhWert();
                else if (schluessel === "27_1") liveDatenText = await HoleElbeTruebung();
                else if (schluessel === "28_1") liveDatenText = await HoleElbeHochwasserStatus();
                else if (schluessel === "29_1") liveDatenText = await HoleElbeStationsMetadaten();
                
                // =================================================================   
                // SEKTOR DRESDEN // BRÜCKEN-MATRIX & FREQUENZEN 
                // =================================================================
                else if (schluessel === "30_1") liveDatenText = await HoleDurchfahrtshoeheBlauesWunder();
                else if (schluessel === "31_1") liveDatenText = await HoleStaudruckAugustusbruecke();
                else if (schluessel === "32_1") liveDatenText = await HoleStroemungAlbertbruecke();
                else if (schluessel === "33_1") liveDatenText = await HoleWindlastMarienbruecke();
                else if (schluessel === "34_1") liveDatenText = await HoleSichtweiteWaldschloesschenbruecke();
                else if (schluessel === "35_1") liveDatenText = await HoleVerdunstungFluegelwegbruecke();
                else if (schluessel === "36_1") liveDatenText = await HoleWiderstandPillnitz();
                else if (schluessel === "37_1") liveDatenText = await HoleDichteSchillerplatz();
                else if (schluessel === "38_1") liveDatenText = await HoleBrueckenGefahrenIndex();
                
                // =================================================================
                // SEKTOR DRESDEN // DAMPFERFLOTTE & ELBSCHIFFAHRT (20-BLOCK)
                // =================================================================
                else if (schluessel === "39_1") liveDatenText = await HoleDampferDiesbarFrequenz();
                else if (schluessel === "40_1") liveDatenText = await HoleDampferLeipzigTiefgang();
                else if (schluessel === "41_1") liveDatenText = await HoleDampferDresdenThermik();
                else if (schluessel === "42_1") liveDatenText = await HoleDampferKrippenWiderstand();
                else if (schluessel === "43_1") liveDatenText = await HoleDampferWehlenTragfaehigkeit();
                else if (schluessel === "44_1") liveDatenText = await HoleDampferMeissenWinddrift();
                else if (schluessel === "45_1") liveDatenText = await HoleDampferRathenKavitation();
                else if (schluessel === "46_3") liveDatenText = await HoleDampferPillnitzReibung();
                else if (schluessel === "47_1") liveDatenText = await HoleDampferPirnaFilter();
                else if (schluessel === "48_1") liveDatenText = await HoleSchiffCoselVortrieb();
                else if (schluessel === "49_1") liveDatenText = await HoleSchiffAugustKuehlung();
                else if (schluessel === "50_1") liveDatenText = await HoleAnlegerTerrassenuferPegel();
                else if (schluessel === "51_1") liveDatenText = await HoleFlottenNavigationsstatus();
                else if (schluessel === "52_1") liveDatenText = await HoleWerftLaubegastHydraulik();
                else if (schluessel === "53_1") liveDatenText = await HoleAnlegerLoschwitzStaudruck();
                else if (schluessel === "54_1") liveDatenText = await HoleDampferKondensation();
                else if (schluessel === "55_1") liveDatenText = await HoleFunkstoerungSchifffahrt();
                else if (schluessel === "56_1") liveDatenText = await HoleAnlegerPillnitzSicherheit();
                else if (schluessel === "57_1") liveDatenText = await HoleSchiffsBremswegGradient();
                else if (schluessel === "58_1") liveDatenText = await HoleFlottenEnergieIndex();
                
                // -----------------------------------------------------------------
                // UNTERSEKTOR B: FLUGHAFEN KLOTZSCHE (HOCHPLATEAU / WEATHER STATION EDDC)
                // -----------------------------------------------------------------
                else if (schluessel === "59_1") liveDatenText = await HoleElbtalWindgeschwindigkeit();
                else if (schluessel === "60_1") liveDatenText = await HoleElbtalWindrichtung();
                else if (schluessel === "61_1") liveDatenText = await HoleElbtalWindboeen();
                else if (schluessel === "62_1") liveDatenText = await HoleElbtalLuftdruck();
                else if (schluessel === "63_1") liveDatenText = await HoleElbtalTurbulenz();
                else if (schluessel === "64_1") liveDatenText = await HoleElbtalKanalisierung();
                else if (schluessel === "65_1") liveDatenText = await HoleElbtalSchichtung();
                else if (schluessel === "66_1") liveDatenText = await HoleBlauesWunderWind();
                else if (schluessel === "67_1") liveDatenText = await HoleTerrassenuferWind();
                else if (schluessel === "68_1") liveDatenText = await HoleElbtalFeuchteZirkulation();
                
                else if (schluessel === "69_1") liveDatenText = await HoleFlughafenWindgeschwindigkeit();
                else if (schluessel === "70_1") liveDatenText = await HoleFlughafenWindrichtung();
                else if (schluessel === "71_1") liveDatenText = await HoleFlughafenWindboeen();
                else if (schluessel === "72_1") liveDatenText = await HoleFlughafenQNH();
                else if (schluessel === "73_1") liveDatenText = await HoleFlughafenScherwindFaktor();
                else if (schluessel === "74_1") liveDatenText = await HoleFlughafenTemperaturKlotzsche();
                else if (schluessel === "75_1") liveDatenText = await HoleFlughafenBewoelkung();
                else if (schluessel === "76_1") liveDatenText = await HoleFlughafenWeatherCode();
                else if (schluessel === "77_1") liveDatenText = await HoleFlughafenLuftdichte();
                else if (schluessel === "78_1") liveDatenText = await HoleDivergenzTalFlughafen();
                
                // =================================================================
                // SEKTOR DRESDEN // AIS-TELEMETRIE & FLOTTEN-LOGISTIK (TEIL 1)
                // =================================================================
                else if (schluessel === "79_1") liveDatenText = await HoleAisStatusDiesbar();
                else if (schluessel === "80_1") liveDatenText = await HoleAisGeschwindigkeitDiesbar();
                else if (schluessel === "81_1") liveDatenText = await HoleAisKursLeipzig();
                else if (schluessel === "82_1") liveDatenText = await HoleAisLatitudeDampferDresden();
                else if (schluessel === "83_1") liveDatenText = await HoleAisLongitudeDampferDresden();
                else if (schluessel === "84_1") liveDatenText = await HoleAisRssiDampferKrippen();
                else if (schluessel === "85_1") liveDatenText = await HoleAisMmsiStadtWehlen();
                else if (schluessel === "86_1") liveDatenText = await HoleAisIntervallMeissen();
                else if (schluessel === "87_1") liveDatenText = await HoleAtisGraefinCosel();
                else if (schluessel === "88_1") liveDatenText = await HoleAktiveAisTransponderDresden();
                
                // =================================================================
                // SEKTOR DRESDEN // AIS-TELEMETRIE & FLOTTEN-LOGISTIK (TEIL 2)
                // =================================================================
                else if (schluessel === "89_1") liveDatenText = await HoleAisStatusPillnitz();
                else if (schluessel === "90_1") liveDatenText = await HoleAisGeschwindigkeitPillnitz();
                else if (schluessel === "91_1") liveDatenText = await HoleAisKursPirna();
                else if (schluessel === "92_1") liveDatenText = await HoleAisMmsiPirna();
                else if (schluessel === "93_1") liveDatenText = await HoleAisStatusAugustDerStarke();
                else if (schluessel === "94_1") liveDatenText = await HoleAisKursAugustDerStarke();
                else if (schluessel === "95_1") liveDatenText = await HoleAisLatitudeRathen();
                else if (schluessel === "96_1") liveDatenText = await HoleAisLongitudeRathen();
                else if (schluessel === "97_1") liveDatenText = await HoleAisMmsiRathen();
                else if (schluessel === "98_1") liveDatenText = await HoleAtisPirna();
                else if (schluessel === "99_1") liveDatenText = await HoleAisLatitudeCosel();
                else if (schluessel === "100_1") liveDatenText = await HoleAisLongitudeCosel();
                else if (schluessel === "101_1") liveDatenText = await HoleAisSignallaufzeit();
                else if (schluessel === "102_1") liveDatenText = await HoleAisRotationsrateFlotte();
                else if (schluessel === "103_1") liveDatenText = await HoleAisKursDresden();
                else if (schluessel === "104_1") liveDatenText = await HoleAisGeschwindigkeitDresden();
                else if (schluessel === "105_1") liveDatenText = await HoleAisLatitudeMeissen();
                else if (schluessel === "106_1") liveDatenText = await HoleAisLongitudeMeissen();
                else if (schluessel === "107_1") liveDatenText = await HoleAisIntegritaetsIndex();
                
                // =================================================================
                // SEKTOR DRESDEN // KLIMA & ATMOSPHÄRE (10er-BLOCK TEIL 2)
                // =================================================================
                else if (schluessel === "108_1") liveDatenText = await HoleDresdenUvIndex();
                else if (schluessel === "109_1") liveDatenText = await HoleDresdenSolarstrahlung();
                else if (schluessel === "110_1") liveDatenText = await HoleDresdenLuftdruckMsl();
                else if (schluessel === "111_1") liveDatenText = await HoleDresdenBewoelkungHoch();
                else if (schluessel === "112_1") liveDatenText = await HoleDresdenVerdunstung();
                else if (schluessel === "113_1") liveDatenText = await HoleDresdenDampfdruckDefizit();
                else if (schluessel === "114_1") liveDatenText = await HoleDresdenUvMaxAbschätzung();
                else if (schluessel === "115_1") liveDatenText = await HoleDachflaechenAbsorption();
                else if (schluessel === "116_1") liveDatenText = await HoleDresdenAlbedoEffekt();
                else if (schluessel === "117_1") liveDatenText = await HoleAtmosphaerischeStabilitaet();
                
                // =================================================================
                // SEKTOR DRESDEN // DIGITALER FAHRPLAN & SOLL-TAKTUNG (20-BLOCK)
                // =================================================================
                else if (schluessel === "118_1") liveDatenText = await HoleSollAbfahrtStadtlinie();
                else if (schluessel === "119_1") liveDatenText = await HoleSollSlotStadtlinie();
                else if (schluessel === "120_1") liveDatenText = await HoleSollSchloesserfahrt01();
                else if (schluessel === "121_1") liveDatenText = await HoleSollAnkunftSchloesserfahrt01();
                else if (schluessel === "122_1") liveDatenText = await HoleSollSlotSchloesserfahrt();
                else if (schluessel === "123_1") liveDatenText = await HoleSollAbfahrtSaechsischeSchweiz();
                else if (schluessel === "124_1") liveDatenText = await HoleSollKorridorSchweiz();
                else if (schluessel === "125_1") liveDatenText = await HoleSollAbfahrtAbendfahrt();
                else if (schluessel === "126_1") liveDatenText = await HoleSollAnkunftAbendfahrt();
                else if (schluessel === "127_1") liveDatenText = await HoleSollEinsatzDiesbar();
                else if (schluessel === "128_1") liveDatenText = await HoleSollEinsatzLeipzig();
                else if (schluessel === "129_1") liveDatenText = await HoleSollEinsatzDampferDresden();
                else if (schluessel === "130_1") liveDatenText = await HoleSollAuslastungPier1();
                else if (schluessel === "131_1") liveDatenText = await HoleSollAuslastungPier4();
                else if (schluessel === "132_1") liveDatenText = await HoleSollFrequenzTerrassenufer();
                else if (schluessel === "133_1") liveDatenText = await HoleSollSaisonStatus();
                else if (schluessel === "134_1") liveDatenText = await HoleSollMindestLiegezeit();
                else if (schluessel === "135_1") liveDatenText = await HoleSollSchloesserfahrt02();
                else if (schluessel === "136_1") liveDatenText = await HoleSollBereitschaftsQuote();
                else if (schluessel === "137_1") liveDatenText = await HoleSollFahrplanIntegritaet();
                
                // =================================================================
                // SEKTOR DRESDEN // HYDRODYNAMIK & ENERGETISCHE SPUREN (20-BLOCK)
                // =================================================================
                else if (schluessel === "138_1") liveDatenText = await HoleStromKinetischeEnergie();
                else if (schluessel === "139_1") liveDatenText = await HoleStromHydraulischeLeistung();
                else if (schluessel === "140_1") liveDatenText = await HoleStromSohlschubspannung();
                else if (schluessel === "141_1") liveDatenText = await HoleStromReynoldsZahl();
                else if (schluessel === "142_1") liveDatenText = await HoleStromViskositaet();
                else if (schluessel === "143_1") liveDatenText = await HoleStromMassendurchsatz();
                else if (schluessel === "144_1") liveDatenText = await HoleStromFroudeZahl();
                else if (schluessel === "145_1") liveDatenText = await HoleCoselHydrostatischerDruck();
                else if (schluessel === "146_1") liveDatenText = await HoleZelleKinetischerImpuls();
                
                else if (schluessel === "147_1") liveDatenText = await HoleSpurWellenlaengeDiesbar();
                else if (schluessel === "148_1") liveDatenText = await HoleSpurThermischeSignaturDiesbar();
                else if (schluessel === "149_1") liveDatenText = await HoleSpurHydroakustikLeipzig();
                else if (schluessel === "150_1") liveDatenText = await HoleSpurVerdraengungDresden();
                else if (schluessel === "151_1") liveDatenText = await HoleSpurTurbulenzMeissen();
                else if (schluessel === "152_1") liveDatenText = await HoleSpurKavitationCosel();
                else if (schluessel === "153_1") liveDatenText = await HoleSpurBugwellenEnergiePillnitz();
                else if (schluessel === "154_1") liveDatenText = await HoleSpurAbgasAugustDerStarke();
                else if (schluessel === "155_1") liveDatenText = await HoleSpurSchaufelradEchoReichweite();
                else if (schluessel === "156_1") liveDatenText = await HoleSpurWiderstandCosel();
              
                // =================================================================
                // SEKTOR DRESDEN // URBANER VERKEHRSTAKT (DVB-LIVE-MATRIX)
                // =================================================================
                else if (schluessel === "157_1") liveDatenText = await HoleDvbPostplatzFrequenz();
                else if (schluessel === "157_2") liveDatenText = await HoleDvbPostplatzVerzoegerung();
                else if (schluessel === "157_3") liveDatenText = await HoleDvbPostplatzBarriere();

                else if (schluessel === "158_1") liveDatenText = await HoleDvbAlbertplatzFrequenz();
                else if (schluessel === "158_2") liveDatenText = await HoleDvbAlbertplatzVerzoegerung();
                else if (schluessel === "158_3") liveDatenText = await HoleDvbAlbertplatzBarriere();

                else if (schluessel === "159_1") liveDatenText = await HoleDvbPirnaischerPlatzFrequenz();
                else if (schluessel === "159_2") liveDatenText = await HoleDvbPirnaischerPlatzVerzoegerung();
                else if (schluessel === "159_3") liveDatenText = await HoleDvbPirnaischerPlatzBarriere();

                else if (schluessel === "160_1") liveDatenText = await HoleDvbHauptbahnhofFrequenz();
                else if (schluessel === "160_2") liveDatenText = await HoleDvbHauptbahnhofVerzoegerung();
                else if (schluessel === "160_3") liveDatenText = await HoleDvbHauptbahnhofBarriere();

                else if (schluessel === "161_1") liveDatenText = await HoleDvbBahnhofNeustadtFrequenz();
                else if (schluessel === "161_2") liveDatenText = await HoleDvbBahnhofNeustadtVerzoegerung();
                else if (schluessel === "161_3") liveDatenText = await HoleDvbBahnhofNeustadtBarriere();

                else if (schluessel === "162_1") liveDatenText = await HoleDvbMicktenFrequenz();
                else if (schluessel === "162_2") liveDatenText = await HoleDvbMicktenVerzoegerung();
                else if (schluessel === "162_3") liveDatenText = await HoleDvbMicktenBarriere();

                else if (schluessel === "163_1") liveDatenText = await HoleDvbTharandterStrFrequenz();
                else if (schluessel === "163_2") liveDatenText = await HoleDvbTharandterStrVerzoegerung();
                else if (schluessel === "163_3") liveDatenText = await HoleDvbTharandterStrBarriere();

                else if (schluessel === "164_1") liveDatenText = await HoleDvbStrassburgerPlatzFrequenz();
                else if (schluessel === "164_2") liveDatenText = await HoleDvbStrassburgerPlatzVerzoegerung();
                else if (schluessel === "164_3") liveDatenText = await HoleDvbStrassburgerPlatzBarriere();

                else if (schluessel === "165_1") liveDatenText = await HoleDvbSachsenplatzFrequenz();
                else if (schluessel === "165_2") liveDatenText = await HoleDvbSachsenplatzVerzoegerung();
                else if (schluessel === "165_3") liveDatenText = await HoleDvbSachsenplatzBarriere();

                else if (schluessel === "166_1") liveDatenText = await HoleDvbReickFrequenz();
                else if (schluessel === "166_2") liveDatenText = await HoleDvbReickVerzoegerung();
                else if (schluessel === "166_3") liveDatenText = await HoleDvbReickBarriere();
               
  			    else if (schluessel === "167_1") liveDatenText = await HoleDvbSchillerplatzFrequenz();
                else if (schluessel === "167_2") liveDatenText = await HoleDvbSchillerplatzVerzoegerung();
                else if (schluessel === "167_3") liveDatenText = await HoleDvbSchillerplatzBarriere();
                
				else if (schluessel === "168_1") liveDatenText = await HoleDvbWasaplatzFrequenz();
                else if (schluessel === "168_2") liveDatenText = await HoleDvbWasaplatzVerzoegerung();
                else if (schluessel === "168_3") liveDatenText = await HoleDvbWasaplatzBarriere();
                
				else if (schluessel === "169_1") liveDatenText = await HoleDvbLenneplatzFrequenz();
                else if (schluessel === "169_2") liveDatenText = await HoleDvbLenneplatzVerzoegerung();
                else if (schluessel === "169_3") liveDatenText = await HoleDvbLenneplatzBarriere();
                
				else if (schluessel === "170_1") liveDatenText = await HoleDvbListstrasseFrequenz();
                else if (schluessel === "170_2") liveDatenText = await HoleDvbListstrasseVerzoegerung();
                else if (schluessel === "170_3") liveDatenText = await HoleDvbListstrasseBarriere();
                
				else if (schluessel === "171_1") liveDatenText = await HoleDvbBuehlauFrequenz();
                else if (schluessel === "171_2") liveDatenText = await HoleDvbBuehlauVerzoegerung();
                else if (schluessel === "171_3") liveDatenText = await HoleDvbBuehlauBarriere();
                
				else if (schluessel === "172_1") liveDatenText = await HoleDvbNuernbergerPlatzFrequenz();
                else if (schluessel === "172_2") liveDatenText = await HoleDvbNuernbergerPlatzVerzoegerung();
                else if (schluessel === "172_3") liveDatenText = await HoleDvbNuernbergerPlatzBarriere();
                
				else if (schluessel === "173_1") liveDatenText = await HoleDvbZschertnitzFrequenz();
                else if (schluessel === "173_2") liveDatenText = await HoleDvbZschertnitzVerzoegerung();
                else if (schluessel === "173_3") liveDatenText = await HoleDvbZschertnitzBarriere();
                
				else if (schluessel === "174_1") liveDatenText = await HoleDvbPlatzDerEinheitFrequenz();
                else if (schluessel === "174_2") liveDatenText = await HoleDvbPlatzDerEinheitVerzoegerung();
                else if (schluessel === "174_3") liveDatenText = await HoleDvbPlatzDerEinheitBarriere();
                
				else if (schluessel === "175_1") liveDatenText = await HoleDvbFinanzministeriumFrequenz();
                else if (schluessel === "175_2") liveDatenText = await HoleDvbFinanzministeriumVerzoegerung();
                else if (schluessel === "175_3") liveDatenText = await HoleDvbFinanzministeriumBarriere();
                
				else if (schluessel === "176_1") liveDatenText = await HoleDvbProhlisFrequenz();
                else if (schluessel === "176_2") liveDatenText = await HoleDvbProhlisVerzoegerung();
                else if (schluessel === "176_3") liveDatenText = await HoleDvbProhlisBarriere();
				
				else if (schluessel === "177_1") liveDatenText = await HoleDauerSperrungWienerBruecke();
				else if (schluessel === "178_1") liveDatenText = await HoleDauerSperrungBlauesWunder();
				else if (schluessel === "179_1") liveDatenText = await HoleDauerSperrungTerrassenufer();
				else if (schluessel === "180_1") liveDatenText = await HoleDauerSperrungBautznerSteigung();
				else if (schluessel === "181_1") liveDatenText = await HoleDauerSperrungMarienbrueckeLichteWeite();
				else if (schluessel === "182_1") liveDatenText = await HoleDauerSperrungNeumarkt();
				else if (schluessel === "183_1") liveDatenText = await HoleDauerSperrungElbwiesen();
				
				else if (schluessel === "184_1") liveDatenText = await HoleVamosBergstrasse();
				else if (schluessel === "185_1") liveDatenText = await HoleVamosBautznerStr();
				else if (schluessel === "186_1") liveDatenText = await HoleVamosStPetersburger();
				else if (schluessel === "187_1") liveDatenText = await HoleVamosMeissnerLandstr();
				else if (schluessel === "188_1") liveDatenText = await HoleVamosKoenigsbruecker();
				else if (schluessel === "189_1") liveDatenText = await HoleVamosWienerStr();
				else if (schluessel === "190_1") liveDatenText = await HoleVamosLoebtauerStr();
				else if (schluessel === "191_1") liveDatenText = await HoleVamosDohnaerStr();


				else if (schluessel === "192_1") liveDatenText = await HoleAstronomieSonnenstandDresden();
				else if (schluessel === "192_2") liveDatenText = await HoleAstronomieMondphaseDresden();
				else if (schluessel === "192_3") liveDatenText = await HoleAstronomieTageslaengeDresden();

				else if (schluessel === "193_1") liveDatenText = await HoleRssStadtgeschehenDresden();
				else if (schluessel === "193_2") liveDatenText = await HoleRssKulturDresden();
				else if (schluessel === "193_3") liveDatenText = await HoleDresdnerKalenderGedenktag();
				
                else if (schluessel === "194_1") liveDatenText = await HoleAutorMatrixSegment();
				else if (schluessel === "194_2") liveDatenText = await HoleVerursachungsProzessor();
				
				
				else if (schluessel === "195_1") liveDatenText = await HoleSektorResonanz();
				else if (schluessel === "195_2") liveDatenText = await HolePhilosophischeResonanzScanDatum();
				
				//Historische Unfälle & Tragödien (Geschichts-Invarianten)
				else if (schluessel === "196_1") liveDatenText = await HoleHistorischeSportTragoedieFlugzeug();
				else if (schluessel === "196_2") liveDatenText = await HoleHistorischesDynamoAusschluss1991();

				else if (schluessel === "197_1") liveDatenText = await HoleHistorischenErstenAufstieg();
				else if (schluessel === "197_2") liveDatenText = await HoleDscVolleyballErsterTitel();

				else if (schluessel === "198_1") liveDatenText = await HoleStadionGeometrie();
				else if (schluessel === "198_2") liveDatenText = await HoleSteyerStadionProfil();
				
				else if (schluessel === "199_1") liveDatenText = await HoleSportJubilaeum();

				
				} catch (apiError) {
					console.error(`Kopplung zu den Servern unterbrochen für Schlüssel [${schluessel}]:`, apiError);
					
					// Greift auf das Register zu oder erzeugt dynamisch einen Notfall-Text, falls der Schlüssel neu ist
					liveDatenText = SIMULIERTE_MATRIX_WERTE[schluessel] 
						|| `Sektor Dresden // SYSTEM-REGISTER [${schluessel}]: Lokale Matrix-Simulation aktiv (Fallback)`;
				}

            // Wenn ein Live-Wert generiert wurde, hängen wir ihn innerhalb des Panels an
            if (liveDatenText !== "") {
                gesamterHtmlInhalt += `<p class="matrix-text" style="color: var(--system-color); font-weight: bold; margin-top: 20px;">${liveDatenText}</p>`;
            }

            // 3. OPTIONALE AUDIO-LEISTE (Integrierte Fallback-Sicherung im Panel)
            if (sektor.audio) {
                gesamterHtmlInhalt += `
                    <div id="audio-fallback-container" style="display: none; margin-top: 25px; text-align: center;">
                        <span style="color: #fff; font-family: 'Courier New', monospace; font-size: 12px; opacity: 0.6;">
                            [ Frequenz-Kopplung blockiert ] 
                        </span>
                        <a href="#" onclick="ErzwingeAudioKopplung('${sektor.audio}'); return false;" style="
                            color: var(--system-color, #FF0080); 
                            font-family: 'Courier New', monospace; 
                            font-size: 12px; 
                            text-decoration: underline; 
                            margin-left: 10px;
                            text-transform: uppercase;">
                            [ Audio aktivieren ]
                        </a>
                    </div>
                `;
                
                // Sofortiger, automatischer Startversuch im Hintergrund
                VersucheAutomatischesAudio(sektor.audio);
            }

            gesamterHtmlInhalt += `</div>`;
        }
    }

    if (!eintraegeGefunden) {
        target.innerHTML = `<div class="matrix-panel"><h3>SYSTEM-TERMINAL</h3><p>Auf Sektor ${gesuchteSeite} keine Fragmente moduliert.</p></div>`;
        return;
    }

    // Freischaltung des Displays
    target.innerHTML = gesamterHtmlInhalt;
};

// =================================================================
// GLOBALER AUDIO-SPEICHER & KONTROLL-FUNKTIONEN
// =================================================================
// =================================================================
// GLOBALER AUDIO-SPEICHER & KONTROLL-FUNKTIONEN
// =================================================================
let globalAudio = null;

function VersucheAutomatischesAudio(audioDatei) {
    globalAudio = new Audio(`./audio/${audioDatei}`);
    // KORREKTUR: Loop deaktiviert, damit die MP3 nur einmal abgespielt wird
    globalAudio.loop = false; 
    
    globalAudio.play().catch(err => {
        console.log("Autoplay von Browser verhindert. Fallback-Link aktiviert.");
        const fallbackContainer = document.getElementById('audio-fallback-container');
        if (fallbackContainer) fallbackContainer.style.display = 'block';
    });
}

function ErzwingeAudioKopplung(audioDatei) {
    if (!globalAudio) {
        globalAudio = new Audio(`./audio/${audioDatei}`);
        // KORREKTUR: Loop deaktiviert, damit die MP3 nur einmal abgespielt wird
        globalAudio.loop = false;
    } else {
        // Falls das Objekt bereits existiert (z.B. durch den Autoplay-Versuch),
        // stellen wir auch hier sicher, dass die Schleife abgeschaltet ist
        globalAudio.loop = false;
    }
    globalAudio.play();
    const fallbackContainer = document.getElementById('audio-fallback-container');
    if (fallbackContainer) fallbackContainer.style.display = 'none';
}
// =================================================================
// SEKTOR DRESDEN // APIS FÜR DEN ELB-STROM (10-BLOCK)
// =================================================================

// 1. WASSERSTAND (Der klassische Pegelstand in cm)
async function HoleEchtenElbePegelVomBrowser() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/w.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error();
        const data = await response.json();
        return `Aktueller Schwingungspegel des Elb-Stroms: ${data.currentMeasurement.value} cm (Live-Messung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Aktueller Schwingungspegel des Elb-Stroms: 71 cm (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 2. WASSERTEMPERATUR (Thermischer Zustand des Flusses in °C)
async function HoleElbeWassertemperatur() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/wt.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error();
        const data = await response.json();
        return `Thermischer Zustand des Elb-Stroms: ${data.currentMeasurement.value}°C (Live-Messung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Thermischer Zustand des Elb-Stroms: 12.4°C (Lokale System-Simulation um ${zeit})`;
    }
}

// 3. DURCHFLUSS (Volumenstrom des Wassers in m³/s)
async function HoleElbeDurchfluss() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/q.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error();
        const data = await response.json();
        return `Fluss-Kinetik (Durchflussvolumen): ${data.currentMeasurement.value} m³/s (Vektoren-Messung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Fluss-Kinetik (Durchflussvolumen): 115 m³/s (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 4. STRÖMUNGSGESCHWINDIGKEIT (Fließgeschwindigkeit des Hauptstroms in m/s)
async function HoleElbeStroemungsgeschwindigkeit() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error();
        const data = await response.json();
        return `Vektor-Geschwindigkeit des Elb-Stroms: ${data.currentMeasurement.value} m/s (Frequenz-Messung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Vektor-Geschwindigkeit des Elb-Stroms: 0.85 m/s (Lokale System-Simulation um ${zeit})`;
    }
}

// 5. ELEKTRISCHE LEITFÄHIGKEIT (Ionenkonzentration / Salzgehalt des Wassers in µS/cm)
async function HoleElbeLeitfaehigkeit() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/lf.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error();
        const data = await response.json();
        return `Elektrische Leitfähigkeit (Ionen-Dichte): ${data.currentMeasurement.value} µS/cm (Analyse um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Elektrische Leitfähigkeit (Ionen-Dichte): 430 µS/cm (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 6. SAUERSTOFFGEHALT (Im Wasser gelöster Sauerstoff in mg/l)
async function HoleElbeSauerstoffgehalt() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/o2.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error();
        const data = await response.json();
        return `Biosphären-Sauerstoffgehalt des Elb-Stroms: ${data.currentMeasurement.value} mg/l (Messung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Biosphären-Sauerstoffgehalt des Elb-Stroms: 9.2 mg/l (Lokale System-Simulation um ${zeit})`;
    }
}

// 7. PH-WERT (Säuregrad des Elbwassers)
async function HoleElbePhWert() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/ph.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error();
        const data = await response.json();
        return `Chemischer Säuregrad (pH-Wert) des Stroms: pH ${data.currentMeasurement.value} (Spektrometrie um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Chemischer Säuregrad (pH-Wert) des Stroms: pH 7.8 (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 8. TRÜBUNG (Schwebstoffanteil / Lichtdurchlässigkeit des Stroms in FNU)
async function HoleElbeTruebung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/tr.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error();
        const data = await response.json();
        return `Optischer Trübungsindex (Schwebstoff-Frequenz): ${data.currentMeasurement.value} FNU (Meldung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Optischer Trübungsindex (Schwebstoff-Frequenz): 4.5 FNU (Lokale System-Simulation um ${zeit})`;
    }
}

// 9. RECHTLICHER HOCHWASSER-STATUS (Gefahrenstufe berechnet aus Pegel)
async function HoleElbeHochwasserStatus() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/w.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const pegel = data.currentMeasurement.value;
        let status = "NORMALZUSTAND // STABIL";
        if (pegel >= 400) status = "ALARMSTUFE I // AUFMERKSAMKEIT";
        if (pegel >= 500) status = "ALARMSTUFE II // KONTROLLDIENST";
        if (pegel >= 600) status = "ALARMSTUFE III // RECHTLICHE WARNUNG";
        if (pegel >= 700) status = "ALARMSTUFE IV // SYSTEM-GEFAHR";
        return `Stabilitäts-Gefahrenstufe Elb-Sektor: ${status} (${pegel} cm um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Stabilitäts-Gefahrenstufe Elb-Sektor: NORMALZUSTAND // STABIL (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 10. MATRIX-DRESDEN GESAMT-SYNCHRONISATION (Sucht Metadaten der Messstation)
async function HoleElbeStationsMetadaten() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN.json";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error();
        const data = await response.json();
        return `Geordneter Netzknoten: Elbe-Kilometer ${data.km} bei Fluss-Stufe ${data.agency} (System-Validierung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Geordneter Netzknoten: Elbe-Kilometer 55.6 bei Fluss-Stufe Dresden (Lokale System-Simulation um ${zeit})`;
    }
}

// 2. Open-Meteo Air Quality API: Feinstaubwerte (PM10) für Dresden (Bergstraße)
async function HoleEchteLuftqualitaetBergstrasse() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=51.0269&longitude=13.7275&current=pm10";
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error("API-Status fehlerhaft");
        const data = await response.json();
        return `Aktuelle Partikel-Dichte (Feinstaub PM10) Bergstraße: ${data.current.pm10} µg/m³ (Messung synchronisiert um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Aktuelle Partikel-Dichte Bergstraße: 18.4 µg/m³ (Lokale Matrix-Simulation um ${zeit})`;
    }
}


// =================================================================
// SEKTOR DRESDEN // Meteo Weather API: Luft
// =================================================================

// 3. Open-Meteo Weather API: Lufttemperatur für Dresden-Mitte
async function HoleEchteTemperaturDresden() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=temperature_2m";
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error("API-Status fehlerhaft");
        const data = await response.json();
        return `Registrierte kinetische Molekular-Energie (Lufttemperatur): ${data.current.temperature_2m}°C (Echtzeit-Messwert um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Registrierte kinetische Molekular-Energie: 14.8°C (Lokale Matrix-Simulation um ${zeit})`;
    }
}


// =================================================================
// SEKTOR DRESDEN // BRÜCKEN-MATRIX & FREQUENZEN (10-BLOCK)
// =================================================================

// 1. BLAUES WUNDER // DURCHFAHRTSHÖHE (Berechnet aus Pegel und Brücken-Konstante)
async function HoleDurchfahrtshoeheBlauesWunder() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/w.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const pegel = data.currentMeasurement.value;
        // Konstruktions-Konstante: Maximale lichte Höhe bei Normalnull minus aktuellen Pegel
        const lichteHoehe = (915 - pegel) / 100; 
        return `Sektor Blaues Wunder // Vertikale Durchfahrts-Lichte: ${lichteHoehe.toFixed(2)} m (Kompiliert um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Blaues Wunder // Vertikale Durchfahrts-Lichte: 8.44 m (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 2. AUGUSTUSBRÜCKE // FLUSS-STAUDRUCK (Kinetischer Druck des Stroms gegen die Sandsteinpfeiler)
async function HoleStaudruckAugustusbruecke() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const v = data.currentMeasurement.value; // Fließgeschwindigkeit in m/s
        // Physikalische Formel für Staudruck: p = 0.5 * Dichte (1000 kg/m³) * v²
        const staudruck = 0.5 * 1000 * Math.pow(v, 2);
        return `Augustusbrücke Sektor Null // Hydromechanischer Pfeiler-Staudruck: ${staudruck.toFixed(1)} N/m² (Berechnung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Augustusbrücke Sektor Null // Hydromechanischer Pfeiler-Staudruck: 361.2 N/m² (Lokale System-Simulation um ${zeit})`;
    }
}



// 3. ALBERTBRÜCKE // STRÖMUNGS-VEKTOR (Spezifischer Geschwindigkeitskoeffizient im Brückenprofil)
async function HoleStroemungAlbertbruecke() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const vBase = data.currentMeasurement.value;
        // Engeres Brückenprofil erhöht die lokale Fließgeschwindigkeit minimal (Faktor 1.08)
        const vLokal = vBase * 1.08;
        return `Albertbrücke Durchfluss-Kanal // Strömungs-Vektor: ${vLokal.toFixed(2)} m/s (Sensierung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Albertbrücke Durchfluss-Kanal // Strömungs-Vektor: 0.92 m/s (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 5. MARIENBRÜCKE // AERODYNAMISCHE LAST (Winddruck auf die Bahntrassen-Konstruktion)
async function HoleWindlastMarienbruecke() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0601&longitude=13.7299&current=wind_speed_10m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const windSpeedKmH = data.current.wind_speed_10m;
        const windSpeedMS = windSpeedKmH / 3.6;
        // Winddruck-Formel: q = 0.5 * Rholuft (1.25) * v²
        const windDruck = 0.5 * 1.25 * Math.pow(windSpeedMS, 2);
        return `Marienbrücke Eisenbahn-Trasse // Aerodynamische Last: ${windDruck.toFixed(1)} N/m² (Kopplung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Marienbrücke Eisenbahn-Trasse // Aerodynamische Last: 12.5 N/m² (Lokale System-Simulation um ${zeit})`;
    }
}

// 6. WALDSCHLÖSSCHENBRÜCKE // ATMOSPHÄRISCHE SICHTWEITE (Einfluss auf optische Brückensensoren)
async function HoleSichtweiteWaldschloesschenbruecke() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0644&longitude=13.7772&current=relative_humidity,weather_code";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const hum = data.current.relative_humidity;
        // Logik-Verknüpfung: Je höher die Luftfeuchte, desto geringer die Sichtweite (Nebelrisiko)
        let sichtweite = 10.0;
        if (hum > 85) sichtweite = 4.2;
        if (hum > 95) sichtweite = 0.8;
        return `Waldschlößchenbrücke Oberfläche // Optische Distanz-Sichtweite: ${sichtweite.toFixed(1)} km (Messung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Waldschlößchenbrücke Oberfläche // Optische Distanz-Sichtweite: 10.0 km (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 7. FLÜGELWEGBRÜCKE // VERDUNSTUNGS-RATER (Thermischer Austausch über der Elbe-Verkehrsachse West)
async function HoleVerdunstungFluegelwegbruecke() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0711&longitude=13.6874&current=vapour_pressure_deficit";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const vpd = data.current.vapour_pressure_deficit;
        return `Flügelwegbrücke West-Sektor // Dampfdruck-Defizit der Luftschicht: ${vpd} kPa (Analyse um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Flügelwegbrücke West-Sektor // Dampfdruck-Defizit der Luftschicht: 0.35 kPa (Lokale System-Simulation um ${zeit})`;
    }
}

// 8. PILLNITZER ELBFÄHRE // STRÖMUNGS-WIDERSTAND (Spezifischer Reibungskoeffizient am Anleger)
async function HoleWiderstandPillnitz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const v = data.currentMeasurement.value;
        // Widerstands-Indikation basierend auf Strömungsgeschwindigkeit im Quadrat
        const dragIndex = Math.pow(v, 2) * 1.4;
        return `Sektor Fährstelle Pillnitz // Hydromechanischer Schleppwiderstand: Index ${dragIndex.toFixed(2)} (Berechnung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Fährstelle Pillnitz // Hydromechanischer Schleppwiderstand: Index 1.01 (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 9. SCHILLERPLATZ (ANLEGER BLAUES WUNDER) // STATISCHER FLUSSDENTITÄTS-INDEX
async function HoleDichteSchillerplatz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/wt.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const wt = data.currentMeasurement.value; // Wassertemperatur
        // Annäherung an die Dichteänderung von Wasser über Temperatur (Dichtemaximum bei 4 Grad)
        const dichteIndikator = 999.97 - (Math.abs(wt - 4.0) * 0.03);
        return `Messpunkt Schillerplatz // Berechneter Dichtegradient des Mediums: ${dichteIndikator.toFixed(2)} kg/m³ (Frequenz um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Messpunkt Schillerplatz // Berechneter Dichtegradient des Mediums: 999.82 kg/m³ (Lokale System-Simulation um ${zeit})`;
    }
}

// 10. BRÜCKEN-SCHWINGUNGS-ALARM (Systemprüfung auf kritische Hochwasserlast der Fundamente)
async function HoleBrueckenGefahrenIndex() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/w.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const pegel = data.currentMeasurement.value;
        // Schwingungsempfindlichkeit steigt massiv mit steigendem Wasserstand und Treibgutgefahr
        let vibrationsGefahr = "MINIMAL // ARCHITEKTUR ABSOLUT STABIL";
        if (pegel > 450) vibrationsGefahr = "MODERAT // RESPONSIVE MESSUNG AKTIVIEREN";
        if (pegel > 600) vibrationsGefahr = "KRITISCH // RESONANZ-ÜBERWACHUNG RAUM DRESDEN";
        return `Gesamtüberwachung Dresdner Brückenbauwerke // Pfeiler-Resonanzrisiko: ${vibrationsGefahr} (Status um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Gesamtüberwachung Dresdner Brückenbauwerke // Pfeiler-Resonanzrisiko: MINIMAL // ARCHITEKTUR ABSOLUT STABIL (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// =================================================================
// SEKTOR DRESDEN // DAMPFERFLOTTE & ELBSCHIFFAHRT (20-BLOCK)
// =================================================================

// 1. PD DIESBAR // SCHAUFELRAD-FREQUENZ (Berechnet aus lokaler Strömung)
async function HoleDampferDiesbarFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const v = data.currentMeasurement.value;
        const rpm = (v * 12.5) + 18.2; // Simulation der Schaufelradumdrehung gegen die Strömung
        return `PD Diesbar // Schaufelrad-Rotationsfrequenz: ${rpm.toFixed(1)} U/min (Echtzeit-Kopplung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Diesbar // Schaufelrad-Rotationsfrequenz: 28.5 U/min (Lokale System-Simulation um ${zeit})`;
    }
}

// 2. PD LEIPZIG // HYDROMECHANISCHER TIEFGANG (Abhängig vom aktuellen Flusspegel)
async function HoleDampferLeipzigTiefgang() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/w.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const pegel = data.currentMeasurement.value;
        // Sicherheits-Tiefgang-Berechnung für kritische Fahrrinnen
        const fahrrinnenTiefe = pegel + 120; 
        return `PD Leipzig // Sicherheits-Fahrrinnentiefe über Grund: ${fahrrinnenTiefe} cm (Validierung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Leipzig // Sicherheits-Fahrrinnentiefe über Grund: 191 cm (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 3. PD DRESDEN // ZYLINDER-WÄRMEBILANZ (Simuliert über aktuelle Lufttemperatur)
async function HoleDampferDresdenThermik() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0531&longitude=13.7412&current=temperature_2m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const temp = data.current.temperature_2m;
        const kesselDruckSim = 10.2 + (temp * 0.01); // Kesseldruck-Schwankung durch Umgebungsthermik
        return `PD Dresden // Maschinensystem Kessel-Betriebsdruck: ${kesselDruckSim.toFixed(2)} bar (Synchronisation um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Dresden // Maschinensystem Kessel-Betriebsdruck: 10.35 bar (Lokale System-Simulation um ${zeit})`;
    }
}

// 4. PD KRIPPPEN // STRÖMUNGSWIDERSTAND AM BUG
async function HoleDampferKrippenWiderstand() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const v = data.currentMeasurement.value;
        const bugWiderstand = Math.pow(v, 2) * 2.85; // Hydrodynamischer Koeffizient
        return `PD Krippen // Kinetischer Strömungswiderstand am Bugsegment: Index ${bugWiderstand.toFixed(2)} (Berechnung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Krippen // Kinetischer Strömungswiderstand am Bugsegment: Index 2.06 (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 5. PD STADT WEHLEN // TRAGFÄHIGKEITS-GRADIENT (Berechnet aus Dichtewert des Wassers)
async function HoleDampferWehlenTragfaehigkeit() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/wt.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const wt = data.currentMeasurement.value;
        const auftriebsFaktor = 1000 - (wt * 0.15); // Wasser-Verdrängungskoeffizient nach Temperatur
        return `PD Stadt Wehlen // Spezifischer Auftriebskoeffizient des Mediums: ${auftriebsFaktor.toFixed(1)} kg/m³ (Messung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Stadt Wehlen // Spezifischer Auftriebskoeffizient des Mediums: 998.5 kg/m³ (Lokale System-Simulation um ${zeit})`;
    }
}

// 6. PD MEISSEN // AERODYNAMISCHER SEITEN-ABTRIEB (Winddrift auf dem Elbabschnitt)
async function HoleDampferMeissenWinddrift() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0556&longitude=13.7389&current=wind_speed_10m,wind_direction_10m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const speed = data.current.wind_speed_10m;
        const dir = data.current.wind_direction_10m;
        return `PD Meißen // Lateral-Driftkoeffizient durch Luftströmung: ${speed} km/h aus Vektor ${dir}° (Analyse um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Meißen // Lateral-Driftkoeffizient durch Luftströmung: 12 km/h aus Vektor 210° (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 7. PD KURORT RATHEN // KAVITATIONSRISIKO DER SCHAUFELRAD-SEGMENTE
async function HoleDampferRathenKavitation() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const v = data.currentMeasurement.value;
        const kavIndex = v * 1.84; // Risiko-Abgleich
        return `PD Kurort Rathen // Hydroakustischer Schaufelrad-Kavitationsindex: ${kavIndex.toFixed(2)} FNU (Frequenz um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Kurort Rathen // Hydroakustischer Schaufelrad-Kavitationsindex: 1.56 FNU (Lokale System-Simulation um ${zeit})`;
    }
}

// 8. PD PILLNITZ // REIBUNGSWIDERSTAND DER RADWELLEN-LAGER
async function HoleDampferPillnitzReibung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/wt.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const wt = data.currentMeasurement.value;
        const viskositaet = 1.791 - (wt * 0.033); // Annäherung an Viskositätsänderung des Elbwassers
        return `PD Pillnitz // Viskosität des Kühlmediums an den Radwellen-Lagern: ${viskositaet.toFixed(3)} mPa·s (Messung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Pillnitz // Viskosität des Kühlmediums an den Radwellen-Lagern: 1.321 mPa·s (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 9. PD PIRNA // HYDRATION SENSOR-KOPIE (Schwebstoffbelastung der Kesselspeisewasser-Filter)
async function HoleDampferPirnaFilter() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/tr.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const tr = data.currentMeasurement.value;
        return `PD Pirna // Trübungs-Verschleißfaktor Kesselspeisewasser-Sensorik: ${tr} FNU (Meldung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Pirna // Trübungs-Verschleißfaktor Kesselspeisewasser-Sensorik: 4.8 FNU (Lokale System-Simulation um ${zeit})`;
    }
}

// 10. MS GRÄFIN COSEL // PROPELLER-VORTRIEB (Klimakorrelation der modernen Motorschiffe)
async function HoleSchiffCoselVortrieb() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const v = data.currentMeasurement.value;
        const propVortrieb = (3.2 / v) * 100; // Propellereffizienz-Index invers zur Flussgeschwindigkeit
        return `MS Gräfin Cosel // Propeller-Wirkungsgrad gegen Hauptstrom-Vektor: ${propVortrieb.toFixed(1)}% (Kompiliert um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `MS Gräfin Cosel // Propeller-Wirkungsgrad gegen Hauptstrom-Vektor: 84.6% (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 11. MS AUGUST DER STARKE // GENERATOREN-KÜHLUNGS-TEMPERATUR
async function HoleSchiffAugustKuehlung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/wt.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const wt = data.currentMeasurement.value;
        const generatorTemp = wt + 42.5; // Differenztemperatur des Primärkühlkreislaufs
        return `MS August der Starke // Thermische Signatur Bordnetz-Generator: ${generatorTemp.toFixed(1)}°C (Messung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `MS August der Starke // Thermische Signatur Bordnetz-Generator: 54.8°C (Lokale System-Simulation um ${zeit})`;
    }
}

// 12. ANLEGESTELLLE TERRASSENUFER // MORPHOLOGISCHER ANLEGE-SCHWINGUNGSINDEX
async function HoleAnlegerTerrassenuferPegel() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/w.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const pegel = data.currentMeasurement.value;
        return `Zentral-Station Terrassenufer // Vertikalverschiebung der Ponton-Brücken: Baseline +${pegel} cm (Meldung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Zentral-Station Terrassenufer // Vertikalverschiebung der Ponton-Brücken: Baseline +71 cm (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 13. FLOTTEN-RECHTLICHER NAVIGATIONSTATUS // FAHRVERBOTS-INDIKATOR (Niedrigwasserwarnung)
async function HoleFlottenNavigationsstatus() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/w.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const pegel = data.currentMeasurement.value;
        let status = "FLOTTENOPERATION UNINGE-SCHRÄNKT FÄHIG // MATRIX GRÜN";
        if (pegel < 60) status = "WARNUNG: NIEDRIGWASSER // FLOTTE IN SKALIERTER REDUKTION";
        if (pegel < 50) status = "NOTSTAND // EINZELLUNGS-PROFIL KRITISCH FÜR HISTORISCHE DAMPFER";
        return `Flotten-Sicherheitsdirektive // Navigations-Zustand: ${status} (Pegelwert: ${pegel} cm um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Flotten-Sicherheitsdirektive // Navigations-Zustand: FLOTTENOPERATION UNINGE-SCHRÄNKT FÄHIG (Lokale System-Simulation um ${zeit})`;
    }
}

// 14. SCHIFFSWERFT LAUBACHAST // DOCK-HYDRAULIKWERTE (Berechnet über Durchfluss-Kinetik)
async function HoleWerftLaubegastHydraulik() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/q.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const q = data.currentMeasurement.value;
        const werftSog = q * 0.0045; // Hydrodynamischer Schleppsog auf Höhe der Helling Laubegast
        return `Sektor Schiffswerft Laubegast // Schleppsog-Koeffizient an der Slipanlage: ${werftSog.toFixed(2)} m³/s (Sensierung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Schiffswerft Laubegast // Schleppsog-Koeffizient an der Slipanlage: 0.52 m³/s (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 15. ANLEGER BLONDE-WUNDER (LOSCHWITZ) // LOKALER STRÖMUNGSSTAU
async function HoleAnlegerLoschwitzStaudruck() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const v = data.currentMeasurement.value;
        const staudruckPfeiler = 0.5 * 1000 * Math.pow(v * 0.95, 2); // Reduzierte Geschwindigkeit in Ufernähe
        return `Anleger Loschwitz (Blaues Wunder) // Hydromechanische Belastung Pontonkette: ${staudruckPfeiler.toFixed(1)} N/m² (Berechnung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Anleger Loschwitz (Blaues Wunder) // Hydromechanische Belastung Pontonkette: 310.4 N/m² (Lokale System-Simulation um ${zeit})`;
    }
}

// 16. KONDENSATIONS-COEFFICIENT AM SCHORNSTEIN (Berechnet aus relativer Luftfeuchtigkeit)
async function HoleDampferKondensation() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0522&longitude=13.7375&current=relative_humidity";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const hum = data.current.relative_humidity;
        return `Flotten-Sektor Mitte // Rauchgas-Kondensationsindex (Sichtbarkeit Dampfschweif): ${hum}% (Abgleich um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Flotten-Sektor Mitte // Rauchgas-Kondensationsindex (Sichtbarkeit Dampfschweif): 65% (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 17. RECHTLICHER FUNKFREQUENZ-KNOTEN // UKW-STÖRUNGSRATE (Simuliert)
async function HoleFunkstoerungSchifffahrt() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=weather_code";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const code = data.current.weather_code;
        let rauschPegel = "0.02 dB (OPTIMALE WELLENAUSBREITUNG)";
        if (code > 50) rauschPegel = "0.45 dB (ATMOSPHÄRISCHES GRUNDRAUSCHEN ERHÖHT)";
        return `Bordfunk-Schnittstelle UKW Kanal 10 (Binnenwasserstraße) // Dämpfungsfaktor: ${rauschPegel} (Messung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Bordfunk-Schnittstelle UKW Kanal 10 // Dämpfungsfaktor: 0.02 dB (Lokale System-Simulation um ${zeit})`;
    }
}

// 18. ANLEGER PILLNITZ // RECHTLICHE ANLEGEZONEN-SICHERHEIT
async function HoleAnlegerPillnitzSicherheit() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/w.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const pegel = data.currentMeasurement.value;
        const freibordKante = (250 - pegel) / 100;
        return `Anlegestation Schloss Pillnitz // Freibord-Abstand Oberkante Ponton: ${freibordKante.toFixed(2)} m (Status um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Anlegestation Schloss Pillnitz // Freibord-Abstand Oberkante Ponton: 1.79 m (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 19. RECHTLICHER SCHIFFS-BREMSWEG-GRADIENT (Trägheitskoeffizient stromabwärts)
async function HoleSchiffsBremswegGradient() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const v = data.currentMeasurement.value;
        const bremsMultiplikator = 1.0 + (v * 0.5); // Bremsweg-Verlängerungsfaktor durch Strömungstakt
        return `Zentrale Dynamik // Trägheits-Multiplikator bei Notbremsung (Talfahrt): x${bremsMultiplikator.toFixed(2)} (Berechnung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Zentrale Dynamik // Trägheits-Multiplikator bei Notbremsung (Talfahrt): x1.43 (Lokale System-Simulation um ${zeit})`;
    }
}

// 20. FLOTTEN-GESAMT-ENERGIEINDEX (Gesamtwirkungsgrad der sächsischen Raddampfer-Technologie)
async function HoleFlottenEnergieIndex() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/w.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const pegel = data.currentMeasurement.value;
        // Bei optimalem Pegel (100-150 cm) arbeiten die Schaufelräder mit maximaler Effizienz
        let eff = 92;
        if (pegel < 70) eff = 74;
        if (pegel > 300) eff = 65;
        return `Dampfmaschinen-Verbund // Gesamt-Systemwirkungsgrad Schaufelradantrieb: ${eff}% (Optimierungstakt um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Dampfmaschinen-Verbund // Gesamt-Systemwirkungsgrad Schaufelradantrieb: 92% (Lokale Matrix-Simulation um ${zeit})`;
    }
}


// =================================================================
// SEKTOR DRESDEN // WIND-VEKTOREN & ATMOSPHÄRE (20-BLOCK)
// =================================================================

// -----------------------------------------------------------------
// UNTERSEKTOR A: ELBTAL (STADTGEBIET & STRÖMUNGSKANAL)
// -----------------------------------------------------------------

// 1. ELBTAL // AKTUELLE WINDGESCHWINDIGKEIT
async function HoleElbtalWindgeschwindigkeit() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=wind_speed_10m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        return `Sektor Elbtal // Horizontale Luftkinetik: ${data.current.wind_speed_10m} km/h (Meldung synchronisiert um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Elbtal // Horizontale Luftkinetik: 11.2 km/h (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 2. ELBTAL // WIND-VEKTOR (RICHTUNG IN GRAD)
async function HoleElbtalWindrichtung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=wind_direction_10m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        return `Sektor Elbtal // Atmosphärischer Einstrahl-Vektor: ${data.current.wind_direction_10m}° (Azimut-Takt um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Elbtal // Atmosphärischer Einstrahl-Vektor: 245° (Lokale System-Simulation um ${zeit})`;
    }
}

// 3. ELBTAL // MAXIMALE WINDBÖEN (Kritische Impulslast)
async function HoleElbtalWindboeen() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=wind_gusts_10m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        return `Sektor Elbtal // Kinetischer Impuls-Peak (Böen-Vektor): ${data.current.wind_gusts_10m} km/h (Sensierung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Elbtal // Kinetischer Impuls-Peak (Böen-Vektor): 18.5 km/h (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 4. ELBTAL // LOKALER BAROMETERSTAND (Luftdruck auf Tal-Niveau)
async function HoleElbtalLuftdruck() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=surface_pressure";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        return `Sektor Elbtal // Barometrisches Oberflächendruck-Feld: ${data.current.surface_pressure} hPa (Messung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Elbtal // Barometrisches Oberflächendruck-Feld: 1011.4 hPa (Lokale System-Simulation um ${zeit})`;
    }
}

// 5. ELBTAL // ATMOSPHÄRISCHER REIDUNGSKOEFFIZIENT (Berechnet aus Turbulenzböen)
async function HoleElbtalTurbulenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=wind_speed_10m,wind_gusts_10m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const diff = data.current.wind_gusts_10m - data.current.wind_speed_10m;
        return `Sektor Elbtal // Mikro-Turbulenzkoeffizient des Strömungskanals: Index ${diff.toFixed(1)} (Kompiliert um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Elbtal // Mikro-Turbulenzkoeffizient des Strömungskanals: Index 7.3 (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 6. ELBTAL // VERTIKALER KANALISIERUNGS-STATUS (Leitplanken-Effekt)
async function HoleElbtalKanalisierung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=wind_direction_10m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const dir = data.current.wind_direction_10m;
        // Das Dresdner Elbtal verläuft primär von Südost nach Nordwest (ca. 110° / 290°)
        let effekt = "DISSIPATIVER QUERWIND (REDUZIERTE KANAL-KRAFT)";
        if ((dir >= 90 && dir <= 130) || (dir >= 270 && dir <= 310)) {
            effekt = "STRÖMUNGS-RESONANZ // RECHTLICHER TAL-KANALISIERUNGSEFFEKT AKTIV";
        }
        return `Tal-Geometrie // Thermomechanischer Systemzustand: ${effekt} (Vektor um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Tal-Geometrie // Thermomechanischer Systemzustand: STRÖMUNGS-RESONANZ // RECHTLICHER TAL-KANALISIERUNGSEFFEKT AKTIV (um ${zeit})`;
    }
}

// 7. ELBTAL // THERMISCHE SEKTOR-SCHICHTUNG (Taupunkt-Divergenz)
async function HoleElbtalSchichtung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=temperature_2m,apparent_temperature";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const delta = data.current.temperature_2m - data.current.apparent_temperature;
        return `Sektor Elbtal // Sensorische Inversions-Verlustrate: ${delta.toFixed(1)}°C Delta (Abgleich um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Elbtal // Sensorische Inversions-Verlustrate: -0.4°C Delta (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 8. BLAUES WUNDER // LOKALE BRÜCKEN-ANEMOMETRIE
async function HoleBlauesWunderWind() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0536&longitude=13.8102&current=wind_speed_10m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const force = data.current.wind_speed_10m * 1.05; // Erhöhter Winddruck über freier Wasserfläche
        return `Messpunkt Hangbrücke Blaues Wunder // Anemometrische Freiflächen-Last: ${force.toFixed(1)} km/h (Takt um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Messpunkt Hangbrücke Blaues Wunder // Anemometrische Freiflächen-Last: 12.8 km/h (Lokale System-Simulation um ${zeit})`;
    }
}

// 9. TERRASSENUFER // INNERSTÄDTISCHE WIND-DÄMPFUNG (Reibung durch Bebauung)
async function HoleTerrassenuferWind() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0531&longitude=13.7412&current=wind_speed_10m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const reduktion = data.current.wind_speed_10m * 0.75; // Urbane Dämpfung
        return `Sektor Terrassenufer-Flanke // Urbane Dämpfungsrate (Baukörper-Reibung): ${reduktion.toFixed(1)} km/h (Sensierung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Terrassenufer-Flanke // Urbane Dämpfungsrate: 8.4 km/h (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 10. ELBTAL // RELATIVE LUFTFEUCHTE-ZIRKULATION
async function HoleElbtalFeuchteZirkulation() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=relative_humidity";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        return `Sektor Elbtal // Feuchtigkeits-Modulationskoeffizient der Talsohle: ${data.current.relative_humidity}% (Takt um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Elbtal // Feuchtigkeits-Modulationskoeffizient der Talsohle: 62% (Lokale System-Simulation um ${zeit})`;
    }
}

// -----------------------------------------------------------------
// UNTERSEKTOR B: FLUGHAFEN KLOTZSCHE (HOCHPLATEAU / WEATHER STATION EDDC)
// -----------------------------------------------------------------

// 11. FLUGHAFEN // LOKALE INGRESS-WINDGESCHWINDIGKEIT
async function HoleFlughafenWindgeschwindigkeit() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.1328&longitude=13.7672&current=wind_speed_10m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        return `Aero-Sektor EDDC (Klotzsche) // Primäre Höhen-Laufgeschwindigkeit: ${data.current.wind_speed_10m} km/h (Live-Synchronisation um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Aero-Sektor EDDC (Klotzsche) // Primäre Höhen-Laufgeschwindigkeit: 16.4 km/h (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 12. FLUGHAFEN // KREUZWIND-RICHTUNGSVEKTOR FÜR STARTBAHN 04/22
async function HoleFlughafenWindrichtung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.1328&longitude=13.7672&current=wind_direction_10m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        return `Aero-Sektor EDDC // Absoluter Navigations-Einstrahlwinkel: ${data.current.wind_direction_10m}° (Validierung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Aero-Sektor EDDC // Absoluter Navigations-Einstrahlwinkel: 230° (Lokale System-Simulation um ${zeit})`;
    }
}

// 13. FLUGHAFEN // HÖHEN-BOOENINTERVALL (Ungedämpfte Energielast)
async function HoleFlughafenWindboeen() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.1328&longitude=13.7672&current=wind_gusts_10m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        return `Aero-Sektor EDDC // Ungedämpfte Spitzen-Impulslast (Böen): ${data.current.wind_gusts_10m} km/h (Meldung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Aero-Sektor EDDC // Ungedämpfte Spitzen-Impulslast (Böen): 24.1 km/h (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 14. FLUGHAFEN // QNH-LUFTDRUCK (Reduziert auf Meeresniveau für Höhenmesser-Kalibrierung)
async function HoleFlughafenQNH() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.1328&longitude=13.7672&current=pressure_msl";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        return `Aero-Sektor EDDC // Kalibrierter Höhen-Luftdruck (QNH-Standard): ${data.current.pressure_msl} hPa (Validierung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Aero-Sektor EDDC // Kalibrierter Höhen-Luftdruck (QNH-Standard): 1014.2 hPa (Lokale System-Simulation um ${zeit})`;
    }
}

// 15. FLUGHAFEN // LOKALER ENERGIETRÄGHEITS-KOEFFIZIENT (Böen-Verhältnis zu Elbtal)
async function HoleFlughafenScherwindFaktor() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.1328&longitude=13.7672&current=wind_speed_10m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        // Scherwind-Simulation: Bezug auf theoretische Reibungsschicht des Hochplateaus
        const scherFaktor = data.current.wind_speed_10m * 0.12;
        return `Aero-Sektor EDDC // Berechneter Scherwind-Gefährdungskoeffizient: Grad ${scherFaktor.toFixed(2)} (Meldung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Aero-Sektor EDDC // Berechneter Scherwind-Gefährdungskoeffizient: Grad 1.97 (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 16. FLUGHAFEN // THERMISCHER GRADIENT ZUM TAL (Dichte-Divergenz)
async function HoleFlughafenTemperaturKlotzsche() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.1328&longitude=13.7672&current=temperature_2m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        return `Aero-Sektor EDDC // Thermischer Zustand des Hochplateaus: ${data.current.temperature_2m}°C (Sensierung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Aero-Sektor EDDC // Thermischer Zustand des Hochplateaus: 13.1°C (Lokale System-Simulation um ${zeit})`;
    }
}

// 17. FLUGHAFEN // WOLKEN-ABDECKUNGS-RATE IM FLUGRAUM
async function HoleFlughafenBewoelkung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.1328&longitude=13.7672&current=cloud_cover";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        return `Aero-Sektor EDDC // Optischer Verdeckungs-Koeffizient (Cloud Cover): ${data.current.cloud_cover}% (Takt um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Aero-Sektor EDDC // Optischer Verdeckungs-Koeffizient (Cloud Cover): 45% (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 18. FLUGHAFEN // ATMOSPHÄRISCHER CO2/OZON-WEATHERCODE
async function HoleFlughafenWeatherCode() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.1328&longitude=13.7672&current=weather_code";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        return `Aero-Sektor EDDC // Physische Konsistenz-Klassifikation: Code ${data.current.weather_code} (Abgleich um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Aero-Sektor EDDC // Physische Konsistenz-Klassifikation: Code 0 (Lokale System-Simulation um ${zeit})`;
    }
}

// 19. FLUGHAFEN // LUFTDICHTE-GRADIENT (Berechnet aus Druck und Temperatur)
async function HoleFlughafenLuftdichte() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.1328&longitude=13.7672&current=temperature_2m,pressure_msl";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const tK = data.current.temperature_2m + 273.15; // Celsius in Kelvin
        const pPa = data.current.pressure_msl * 100;    // hPa in Pa
        // Spezifische Gaskonstante trockene Luft: 287.05 J/(kg*K)
        const dichte = pPa / (287.05 * tK);
        return `Aero-Sektor EDDC // Berechnete molekulare Luftdichte: ${dichte.toFixed(3)} kg/m³ (Kompiliert um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Aero-Sektor EDDC // Berechnete molekulare Luftdichte: 1.225 kg/m³ (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 20. MATRIX DRESDEN // LOKALE BAROMETRISCHE HÖHENDIVERGENZ (Tal vs. Flughafen)
async function HoleDivergenzTalFlughafen() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const urlTal = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=surface_pressure";
    const urlBerg = "https://api.open-meteo.com/v1/forecast?latitude=51.1328&longitude=13.7672&current=surface_pressure";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const resTal = await fetch(urlTal, { signal: controller.signal });
        const resBerg = await fetch(urlBerg, { signal: controller.signal });
        clearTimeout(timeoutId);
        const dataTal = await resTal.json();
        const dataBerg = await resBerg.json();
        const diff = dataTal.current.surface_pressure - dataBerg.current.surface_pressure;
        return `System-Matrix Dresden // Barometrisches Gefälle (Talsohle zu Plateau): ${diff.toFixed(1)} hPa (Berechnung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `System-Matrix Dresden // Barometrisches Gefälle (Talsohle zu Plateau): 14.5 hPa (Lokale System-Simulation um ${zeit})`;
    }
}


// =================================================================
// SEKTOR DRESDEN // AIS-TELEMETRIE & FLOTTEN-LOGISTIK (TEIL 1)
// =================================================================

// 1. PD DIESBAR // AIS-STATUS (Festgemacht vs. In Fahrt)
async function HoleAisStatusDiesbar() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        // Logik: Bei extremem Durchfluss/Hochwasser liegen die Schiffe meist festgemacht am Terrassenufer
        let aisStatus = "STATUS 5 // FESTGEMACHT (Terrassenufer, Liegeplatz 3)";
        if (data.currentMeasurement.value < 1.5) {
            aisStatus = "STATUS 0 // IN FAHRT (Kurs Elbtal aufwärts Richtung Blasewitz)";
        }
        return `PD Diesbar // AIS-Navigationsstatus: ${aisStatus} (Takt-Signal um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Diesbar // AIS-Navigationsstatus: STATUS 0 // IN FAHRT (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 2. PD DIESBAR // SPEED OVER GROUND (Geschwindigkeit in Knoten)
async function HoleAisGeschwindigkeitDiesbar() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const vFluss = data.currentMeasurement.value;
        // Schiffsgeschwindigkeit relativ zur Flussgeschwindigkeit simulieren (ca. 6-8 Knoten Fahrt über Grund)
        const knotsSog = 7.2 - (vFluss * 0.5);
        return `PD Diesbar // AIS-SOG (Fahrt über Grund): ${knotsSog.toFixed(1)} kn (NMEA-Abgleich um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Diesbar // AIS-SOG (Fahrt über Grund): 6.4 kn (Lokale System-Simulation um ${zeit})`;
    }
}

// 3. PD LEIPZIG // AIS-STEUERKURS (Kurs über Grund in Grad)
async function HoleAisKursLeipzig() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0531&longitude=13.7412&current=wind_direction_10m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        // Kurs orientiert sich am Flussverlauf Dresdens im Zentrum (ca. 115 Grad stromaufwärts oder 295 Grad stromabwärts)
        const windDir = data.current.wind_direction_10m;
        const cog = windDir > 180 ? 115.4 : 294.8;
        return `PD Leipzig // AIS-COG (Steuerkurs über Grund): ${cog}° (Azimut-Meldung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Leipzig // AIS-COG (Steuerkurs über Grund): 115.4° (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 4. PD DRESDEN // LOKALE GPS-POSITION (Breitengrad / Breitensektor)
async function HoleAisLatitudeDampferDresden() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0531&longitude=13.7412&current=weather_code";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        // Position leicht dynamisieren um den Anleger Terrassenufer (51.053X)
        const sec = new Date().getSeconds();
        const lat = 51.05312 + (sec * 0.000002);
        return `PD Dresden // AIS-Position Latitude: N ${lat.toFixed(6)}° (Satelliten-Fix um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Dresden // AIS-Position Latitude: N 51.053124° (Lokale System-Simulation um ${zeit})`;
    }
}

// 5. PD DRESDEN // LOKALE GPS-POSITION (Längengrad / Längensektor)
async function HoleAisLongitudeDampferDresden() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0531&longitude=13.7412&current=weather_code";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const sec = new Date().getSeconds();
        const lon = 13.74125 + (sec * 0.000003);
        return `PD Dresden // AIS-Position Longitude: E ${lon.toFixed(6)}° (Satelliten-Fix um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Dresden // AIS-Position Longitude: E 13.741258° (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 6. PD KRIPPEN // SIGNAL-STÄRKE DER TRANSITION (RSSI-Wert in dBm)
async function HoleAisRssiDampferKrippen() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=relative_humidity";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const hum = data.current.relative_humidity;
        const rssi = -65 - (hum * 0.15); // Signalabschwächung durch Luftfeuchtigkeit simulieren
        return `PD Krippen // AIS-Signalstärke an Bodenstation Dresden: ${rssi.toFixed(1)} dBm (Empfangstakt um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Krippen // AIS-Signalstärke an Bodenstation Dresden: -74.2 dBm (Lokale System-Simulation um ${zeit})`;
    }
}

// 7. PD STADT WEHLEN // EXAKTE IDENTIFIKATIONS-NUMMER (MMSI-Code Validierung)
async function HoleAisMmsiStadtWehlen() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    // Statischer, realer Funk-Identifikationsschlüssel gekoppelt mit Systemlaufzeit
    return `PD Stadt Wehlen // Amtlicher AIS-MMSI-Ident-Code: 211511370 (Datenintegrität VALID um ${zeit})`;
}

// 8. PD MEISSEN // AKTUELLER AIS-SENDEINTERVALL (Dynamisch nach Geschwindigkeit)
async function HoleAisIntervallMeissen() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        let intervall = "10 Sekunden (Klasse A Standard)";
        if (data.currentMeasurement.value > 1.2) intervall = "2 Sekunden (Erhöhte Dynamik in Schnellströmung)";
        return `PD Meißen // AIS-Transponder Sendeintervall: ${intervall} (Protokoll-Prüfung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Meißen // AIS-Transponder Sendeintervall: 10 Sekunden (Lokale System-Simulation um ${zeit})`;
    }
}

// 9. MS GRÄFIN COSEL // RECHTLICHE FUNK-ZULASSUNG (ATIS-Kennung für Binnenfunk)
async function HoleAtisGraefinCosel() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    // Die offizielle ATIS-Kennung beginnt für Deutschland immer mit der Länderkennung 9211
    return `MS Gräfin Cosel // Funkidentifikation ATIS-Kennung: 9211032644 (Frequenz-Kopplung stabil um ${zeit})`;
}

// 10. SYSTEM-MATRIX // RECHTLICHE ANZAHL AKTIVER TRANSPOUNDER IM SEKTOR DRESDEN
async function HoleAktiveAisTransponderDresden() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/w.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const pegel = data.currentMeasurement.value;
        // Im Winter oder bei extremem Pegel (<40cm oder >400cm) sinkt die Anzahl aktiver Schiffe gegen Null
        let schiffe = 8;
        if (pegel < 50 || pegel > 350) schiffe = 1;
        return `Synchronisations-Exekutive (Strompolizei) // Detektierte AIS-Sender im Kernbereich: ${schiffe} Einheiten (Scan um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Synchronisations-Exekutive // Detektierte AIS-Sender im Kernbereich: 6 Einheiten (Lokale System-Simulation um ${zeit})`;
    }
}

// =================================================================
// SEKTOR DRESDEN // AIS-TELEMETRIE & FLOTTEN-LOGISTIK (TEIL 2)
// =================================================================

// 11. PD PILLNITZ // AIS-STATUS (Navigationsmodus im Brückenbereich)
async function HoleAisStatusPillnitz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/w.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const pegel = data.currentMeasurement.value;
        // Bei stabilem Pegel pendelt die Pillnitz meist im Bereich Schloss Pillnitz
        let status = "STATUS 0 // IN FAHRT (Querung oder Längskurs Sektor Pillnitz)";
        if (pegel > 400) status = "STATUS 5 // FESTGEMACHT (Sicherheits-Liegeplatz eingenommen)";
        return `PD Pillnitz // AIS-Navigationsstatus: ${status} (Überwachung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Pillnitz // AIS-Navigationsstatus: STATUS 0 // IN FAHRT (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 12. PD PILLNITZ // FAHRT ÜBER GRUND (SOG in Knoten)
async function HoleAisGeschwindigkeitPillnitz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const v = data.currentMeasurement.value;
        const sog = 6.8 - (v * 0.4); // Dynamische Bremsung durch Elbströmung
        return `PD Pillnitz // AIS-SOG (Fahrt über Grund): ${sog.toFixed(1)} kn (NMEA-Taktung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Pillnitz // AIS-SOG (Fahrt über Grund): 5.9 kn (Lokale System-Simulation um ${zeit})`;
    }
}

// 13. PD PIRNA // COMPASS-STEUERKURS (Heading in Grad)
async function HoleAisKursPirna() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=wind_direction_10m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const wind = data.current.wind_direction_10m;
        // Kursvektor Pirna-Sektor (Elbkurve Richtung Sächsische Schweiz ca. 140° oder 320°)
        const heading = wind > 150 ? 139.6 : 319.2;
        return `PD Pirna // AIS-True Heading (Kompass-Ausrichtung): ${heading}° (Validierung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Pirna // AIS-True Heading (Kompass-Ausrichtung): 139.6° (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 14. PD PIRNA // EXAKTE FUNK-IDENTIFIKATION (MMSI)
async function HoleAisMmsiPirna() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `PD Pirna // Amtlicher AIS-MMSI-Ident-Code: 211511410 (Signalübertragung VALID um ${zeit})`;
}

// 15. MS AUGUST DER STARKE // DYN-NAV-STATUS (Moderne Motorschiff-Kopplung)
async function HoleAisStatusAugustDerStarke() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0531&longitude=13.7412&current=temperature_2m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const temp = data.current.temperature_2m;
        // Bei normalen Plantouren im Sommer aktiv in Fahrt
        let status = "STATUS 0 // IN FAHRT (Sektor Altstadt-Ufer, Manöver voraus)";
        if (temp < 4.0) status = "STATUS 5 // FESTGEMACHT (Winterliegeplatz / System-Standby)";
        return `MS August der Starke // AIS-Navigationsstatus: ${status} (Abfrage um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `MS August der Starke // AIS-Navigationsstatus: STATUS 0 // IN FAHRT (Lokale System-Simulation um ${zeit})`;
    }
}

// 16. MS AUGUST DER STARKE // EFFEKTIVER KURS ÜBER GRUND (COG)
async function HoleAisKursAugustDerStarke() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const sec = new Date().getSeconds();
    // Simulation einer Wende oder leichten Kurskorrektur im Bereich Carolabrücke
    const cogBase = 112.5 + (Math.sin(sec / 10) * 2.5);
    return `MS August der Starke // AIS-COG (Kurs über Grund): ${cogBase.toFixed(1)}° (NMEA-Gleichlauf um ${zeit})`;
}

// 17. PD KURORT RATHEN // AKTUELLE BREITEN-KOORDINATE (Latitude)
async function HoleAisLatitudeRathen() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const sec = new Date().getSeconds();
    const lat = 51.05410 + (sec * 0.000001);
    return `PD Kurort Rathen // AIS-Position Latitude: N 51°03.${(lat * 60 % 60).toFixed(3)}' (Satelliten-Fix um ${zeit})`;
}

// 18. PD KURORT RATHEN // AKTUELLE LÄNGEN-KOORDINATE (Longitude)
async function HoleAisLongitudeRathen() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const sec = new Date().getSeconds();
    const lon = 13.73980 + (sec * 0.000002);
    return `PD Kurort Rathen // AIS-Position Longitude: E 13°44.${(lon * 60 % 60).toFixed(3)}' (Satelliten-Fix um ${zeit})`;
}

// 19. PD KURORT RATHEN // FUNK-IDENTIFIKATION (MMSI)
async function HoleAisMmsiRathen() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `PD Kurort Rathen // Amtlicher AIS-MMSI-Ident-Code: 211511390 (Datenstrom stabil um ${zeit})`;
}

// 20. PD SCHMUCKSTÜCK // BORD-ZUGELASSENE ATIS-KENNUNG
async function HoleAtisPirna() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `PD Pirna // Funkidentifikation ATIS-Kennung: 9211032140 (Frequenz-Kopplung um ${zeit})`;
}

// 21. PD GRAF COSEL // AKTUELLE POSITION LATITUDE
async function HoleAisLatitudeCosel() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const min = new Date().getMinutes();
    const lat = 51.05350 + (min * 0.00001);
    return `MS Gräfin Cosel // AIS-Position Latitude: N 51.053${min} (Empfangstakt um ${zeit})`;
}

// 22. MS GRÄFIN COSEL // AKTUELLE POSITION LONGITUDE
async function HoleAisLongitudeCosel() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const min = new Date().getMinutes();
    const lon = 13.74210 + (min * 0.00001);
    return `MS Gräfin Cosel // AIS-Position Longitude: E 13.742${min} (Empfangstakt um ${zeit})`;
}

// 23. FLOTTEN-PEILUNG // RECHTLICHER PASSIER-ABSTAND CAROLABRÜCKE
async function HoleAisCarolabrueckeAbstand() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/w.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const pegel = data.currentMeasurement.value;
        // Berechnung des virtuellen Sicherheitskorridors unter Berücksichtigung von Trümmerfeldern oder Baustellen
        const korridor = (pegel > 250) ? "VERENGT // RECHTLICHE REGENZ-MESSUNG EINHALTEN" : "STANDARD KORRIDOR 40M FREI";
        return `Kohärenz-Kuratoren (Stromüberwachung) // Passierkorridor Carolabrücke: ${korridor} (Meldung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Kohärenz-Kuratoren // Passierkorridor Carolabrücke: STANDARD KORRIDOR 40M FREI (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 24. RECHTLICHER FUNKFREQUENZ-STATUS // AIS-JITTER (SIGNALLAUFZEIT-VARIANZ)
async function HoleAisSignallaufzeit() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=relative_humidity";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const hum = data.current.relative_humidity;
        const jitter = 0.01 + (hum * 0.002); // Mikrosekunden Jitter durch atmosphärische Dämpfung
        return `Sektor-Bodenstation Dresden-Zentrum // AIS-Transponder-Jitter: ${jitter.toFixed(3)} ms (Messung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor-Bodenstation Dresden-Zentrum // AIS-Transponder-Jitter: 0.124 ms (Lokale System-Simulation um ${zeit})`;
    }
}

// 25. AIS-KLASSE-A // ROTATIONSRATE (Rate of Turn - ROT)
async function HoleAisRotationsrateFlotte() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const sec = new Date().getSeconds();
    // Simulation des Drehmanövers vor dem Anleger Terrassenufer
    const rot = (sec > 45) ? 4.2 : 0.0; 
    return `Zentraler Dynamik-Vektor // Schiffs-Rotationsrate (ROT): ${rot.toFixed(1)}°/min (Systemtakt um ${zeit})`;
}

// 26. PD DRESDEN // KURS ÜBER GRUND (COG)
async function HoleAisKursDresden() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `PD Dresden // AIS-COG (Kurs über Grund): 294.5° (Talfahrt Richtung Sektor Meißen um ${zeit})`;
}

// 27. PD DRESDEN // FAHRT ÜBER GRUND (SOG)
async function HoleAisGeschwindigkeitDresden() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const v = data.currentMeasurement.value;
        const sog = 8.5 + (v * 0.6); // Höhere SOG bei Talfahrt durch Strömungsschub
        return `PD Dresden // AIS-SOG (Fahrt über Grund): ${sog.toFixed(1)} kn (Takt um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Dresden // AIS-SOG (Fahrt über Grund): 9.2 kn (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 28. PD MEISSEN // AKTUELLE POSITION LATITUDE
async function HoleAisLatitudeMeissen() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `PD Meißen // AIS-Position Latitude: N 51.055812° (Daten-Abgleich stabil um ${zeit})`;
}

// 29. PD MEISSEN // AKTUELLE POSITION LONGITUDE
async function HoleAisLongitudeMeissen() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `PD Meißen // AIS-Position Longitude: E 13.735411° (Daten-Abgleich stabil um ${zeit})`;
}

// 30. MATRIX DRESDEN // AIS-EMPFANGSQUOTE (INTEGRITÄTSINDEX DER SYSTEMZELLE)
async function HoleAisIntegritaetsIndex() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=weather_code";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const code = data.current.weather_code;
        const index = (code > 50) ? 97.4 : 99.9; // Minimale Paketverluste bei Starkregen
        return `Gesamt-System Dresden // AIS-Paket-Integritätsindex: ${index}% (Zellenprüfung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Gesamt-Matrix Dresden // AIS-Paket-Integritätsindex: 99.9% (Lokale System-Simulation um ${zeit})`;
    }
}


// =================================================================
// SEKTOR DRESDEN // KLIMA & ATMOSPHÄRE (10er-BLOCK TEIL 2)
// =================================================================

// 1. SYSTEMZELLE // AKTUELLER UV-INDEX (Direkte solare Belastung)
async function HoleDresdenUvIndex() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=uv_index";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        return `Sektor Dresden // Aktueller UV-Strahlungsindex: ${data.current.uv_index.toFixed(1)} (Validierung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Dresden // Aktueller UV-Strahlungsindex: 1.4 (Lokale System-Simulation um ${zeit})`;
    }
}

// 2. SYSTEMZELLE // GLOBALE SOLARSTRAHLUNG (Kurzwellige Einstrahlung in W/m²)
async function HoleDresdenSolarstrahlung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=shortwave_radiation";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        return `Sektor Dresden // Kurzwellige Globalstrahlung: ${data.current.shortwave_radiation} W/m² (Energiemessung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Dresden // Kurzwellige Globalstrahlung: 145 W/m² (Lokale System-Simulation um ${zeit})`;
    }
}

// 3. SYSTEMZELLE // REDUZIERTER LUFTDRUCK AUF MEERESNIVEAU (MSL-Vergleichswert)
async function HoleDresdenLuftdruckMsl() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=pressure_msl";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        return `Sektor Dresden // Barometrisches Feld (Meeresniveau-Korrektur): ${data.current.pressure_msl} hPa (Takt um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Dresden // Barometrisches Feld (Meeresniveau-Korrektur): 1013.8 hPa (Lokale System-Simulation um ${zeit})`;
    }
}

// 4. SYSTEMZELLE // RECHTLICHE ATMOSPHÄRISCHE ABSCHIRMUNG (Bewölkungsgrad oben)
async function HoleDresdenBewoelkungHoch() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&hourly=cloud_cover_high";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const aktuell = data.hourly.cloud_cover_high[new Date().getHours()];
        return `Sektor Dresden // Vertikale Strahlungsbarriere (Hohe Bewölkung): ${aktuell}% (Analyse um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Dresden // Vertikale Strahlungsbarriere (Hohe Bewölkung): 20% (Lokale System-Simulation um ${zeit})`;
    }
}

// 5. SYSTEMZELLE // THERMODYNAMISCHE VERDUNSTUNGSRATE (Evapotranspiration)
async function HoleDresdenVerdunstung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    // Nutzt stündliche Vorhersagewerte zur Extraktion der aktuellen Sektorverdunstung
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&hourly=evapotranspiration";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const aktuell = data.hourly.evapotranspiration[new Date().getHours()];
        return `Sektor Dresden // Latenter Feuchtigkeits-Verluststrom: ${aktuell.toFixed(3)} mm/h (Sensierung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Dresden // Latenter Feuchtigkeits-Verluststrom: 0.045 mm/h (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 6. SYSTEMZELLE // SÄTTIGUNGS-DEFIZIT DER LUFT (Dampfdruck-Divergenz)
async function HoleDresdenDampfdruckDefizit() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&hourly=vapour_pressure_deficit";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const aktuell = data.hourly.vapour_pressure_deficit[new Date().getHours()];
        return `Sektor Dresden // Molekulares Dampfdruck-Defizit: ${aktuell.toFixed(2)} kPa (Messung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Dresden // Molekulares Dampfdruck-Defizit: 0.38 kPa (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 7. SYSTEMZELLE // RECHTLICHE UV-EXPOSITIONS-EFFIZIENZ (Berechneter Maximalwert)
async function HoleDresdenUvMaxAbschätzung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=uv_index,shortwave_radiation";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const index = data.current.uv_index;
        const rad = data.current.shortwave_radiation;
        // Berechnung eines Verhältnisses von UV-Intensität zur Gesamtstrahlung
        const effizienz = rad > 0 ? (index / rad) * 1000 : 0;
        return `Sektor Dresden // Spezifischer UV-Strahlungs-Gradient: Index ${effizienz.toFixed(2)} (Kompiliert um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Dresden // Spezifischer UV-Strahlungs-Gradient: Index 9.66 (Lokale System-Simulation um ${zeit})`;
    }
}

// 8. GEBÄUDE-THERMIK // DACHFLÄCHEN-STRAHLUNGSABSORPTION (Simuliert über Einstrahlung)
async function HoleDachflaechenAbsorption() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=shortwave_radiation";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        // Simulation der thermischen Last auf exponierte Metalldächer (z.B. Son Lam oder Altstadt-Komplexe)
        const absorbiert = data.current.shortwave_radiation * 0.72; // 72% Absorptionsrate angenommen
        return `Zentral-Habitat // Exponierte Dachflächen-Energiestromdichte: ${absorbiert.toFixed(1)} W/m² (Meldung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Zentral-Habitat // Exponierte Dachflächen-Energiestromdichte: 104.4 W/m² (Lokale System-Simulation um ${zeit})`;
    }
}

// 9. SYSTEMZELLE // LOKALE ALBEDO-NÄHERUNG (Reflexions-Index)
async function HoleDresdenAlbedoEffekt() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=weather_code";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        // Bei Schneefall (Weather-Codes ab 70) steigt die Albedo dramatisch, bei Regen sinkt sie
        let albedo = 0.22; // Durchschnittliche urbane Albedo
        if (data.current.weather_code >= 70) albedo = 0.75;
        return `Sektor Dresden // Berechneter Oberflächen-Reflexionskoeffizient: ${albedo.toFixed(2)} (Analysetakt um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Dresden // Berechneter Oberflächen-Reflexionskoeffizient: 0.22 (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 10. KOHÄRENZ-KURATOREN // RADIOMETRISCHE ATMOSPHÄREN-STABILITÄT
async function HoleAtmosphaerischeStabilitaet() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=surface_pressure,wind_speed_10m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const p = data.current.surface_pressure;
        const w = data.current.wind_speed_10m;
        // Stabilitätsindex berechnet aus Luftdruck und Windträgheit
        const stabilitaet = (p / 1000) - (w * 0.01);
        return `Kohärenz-Kuratoren // Radiometrischer Schichtungsindex: ${stabilitaet.toFixed(3)} P/W (Zellenprüfung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Kohärenz-Kuratoren // Radiometrischer Schichtungsindex: 0.998 P/W (Lokale System-Simulation um ${zeit})`;
    }
}



// =================================================================
// SEKTOR DRESDEN // DIGITALER FAHRPLAN & SOLL-TAKTUNG (20-BLOCK)
// =================================================================

// 1. ANLEGER TERRASSENUFER // NÄHCHSTE SOLL-ABFAHRT LINIE STADT (SL)
async function HoleSollAbfahrtStadtlinie() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    // Fahrplanmäßiger Festtakt: Jede volle Stunde ab 10:00 Uhr simuliert
    const stunde = new Date().getHours();
    let naechste = "10:00";
    if (stunde >= 10 && stunde < 18) {
        naechste = `${stunde + 1}:00`;
    } else {
        naechste = "10:00 (Soll-Takt für Folgetag)";
    }
    return `Anleger Terrassenufer // Soll-Abfahrt Stadtrundfahrt-Linie: ${naechste} Uhr (Fahrplan-Abgleich um ${zeit})`;
}

// 2. ANLEGER TERRASSENUFER // SOLL-SLOT-ZUWEISUNG STADT-LINIE
async function HoleSollSlotStadtlinie() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Anleger Terrassenufer // Deterministischer Liegeplatz-Slot: PIER 2 (Protokoll-Validierung um ${zeit})`;
}

// 3. SCHLOSSERFAHRT // SOLL-ABFAHRT IMPULS 01 (Vormittags-Takt)
async function HoleSollSchloesserfahrt01() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Sektor Terrassenufer // Soll-Abfahrt Schlösserfahrt Takt 01: 11:00 Uhr (Soll-Struktur VALID um ${zeit})`;
}

// 4. SCHLOSSERFAHRT // SOLL-ANQUANTUM ZURÜCK (Berechnete Rückkunft)
async function HoleSollAnkunftSchloesserfahrt01() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Sektor Terrassenufer // Soll-Ankunft aus Pillnitz Takt 01: 14:30 Uhr (Dauer: 03:30h // Synchron um ${zeit})`;
}

// 5. SCHLOSSERFAHRT // SOLL-SLOT-ZUWEISUNG (Große Fahrten)
async function HoleSollSlotSchloesserfahrt() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Anleger Terrassenufer // Deterministischer Liegeplatz-Slot: PIER 3 (Protokoll-Validierung um ${zeit})`;
}

// 6. LINIE SÄCHSISCHE SCHWEIZ // SOLL-ABFAHRT EXPEDITION (Haupt-Takt)
async function HoleSollAbfahrtSaechsischeSchweiz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Anleger Terrassenufer // Soll-Abfahrt Hauptlinie Sächsische Schweiz: 09:30 Uhr (Soll-Struktur VALID um ${zeit})`;
}

// 7. LINIE SÄCHSISCHE SCHWEIZ // SOLL-RESERVE-KORRIDOR
async function HoleSollKorridorSchweiz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Zentral-Koordination // Erlaubtes Fahrzeit-Soll-Delta: +15 Min Maximum (Regelwerk-Takt um ${zeit})`;
}

// 8. ABENDFAHRT // SOLL-ABFAHRT (Abendlicher Matrix-Impuls)
async function HoleSollAbfahrtAbendfahrt() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Anleger Terrassenufer // Soll-Abfahrt Kulinarische Abendfahrt: 19:00 Uhr (Abgleich um ${zeit})`;
}

// 9. ABENDFAHRT // SOLL-ANQUANTUM (Nacht-Rücklauf)
async function HoleSollAnkunftAbendfahrt() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Anleger Terrassenufer // Soll-Ankunft Kulinarische Abendfahrt: 22:30 Uhr (System-Ruhezustand naht um ${zeit})`;
}

// 10. PD DIESBAR // SPEZIFISCHER SOLL-EINSATZ-STATUS
async function HoleSollEinsatzDiesbar() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    // Die Diesbar läuft im Soll-Plan oft auf Sonderlinien oder der Pillnitz-Strecke
    return `PD Diesbar // Fahrplanmäßiges Einsatz-Soll: Sonder- & Charter-Rotationen (Sektor-Abgleich um ${zeit})`;
}

// 11. PD LEIPZIG // SPEZIFISCHER SOLL-EINSATZ-STATUS
async function HoleSollEinsatzLeipzig() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `PD Leipzig // Fahrplanmäßiges Einsatz-Soll: Haupttakt Schlösserfahrten (Sektor-Abgleich um ${zeit})`;
}

// 12. PD DRESDEN // SPEZIFISCHER SOLL-EINSATZ-STATUS
async function HoleSollEinsatzDampferDresden() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `PD Dresden // Fahrplanmäßiges Einsatz-Soll: Haupttakt Sächsische Schweiz (Sektor-Abgleich um ${zeit})`;
}

// 13. PIER 1 // SOLL-AUSLASTUNGS-INDEX
async function HoleSollAuslastungPier1() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Anlandespots Terrassenufer // Belegungs-Soll PIER 1: 4 Fahrgast-Wechsel pro 7200s (Takt um ${zeit})`;
}

// 14. PIER 4 // SOLL-AUSLASTUNGS-INDEX (Modern-Schiffe)
async function HoleSollAuslastungPier4() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Anlandespots Terrassenufer // Belegungs-Soll PIER 4: Vorrangig MS Gräfin Cosel / MS August (um ${zeit})`;
}

// 15. KANAL-TAKTRATE // ERWURTETE SCHIFFSBEWEGUNGEN (Soll/Stunde)
async function HoleSollFrequenzTerrassenufer() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const stunde = new Date().getHours();
    let dichte = "0 Einheiten/h (Nacht-Modus)";
    if (stunde >= 9 && stunde <= 18) dichte = "3.4 Einheiten/h (Regulärer Taktfrequenz-Sollwert)";
    return `Systemzelle Dresden // Fahrplanmäßige Soll-Frequenz im Kernkanal: ${dichte} (Sichtung um ${zeit})`;
}

// 16. SAISONALES PROTOKOLL // STATUS DER DETERMINISTISCHEN MATRIX
async function HoleSollSaisonStatus() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const monat = new Date().getMonth(); // 0 = Jan, 5 = Jun, etc.
    let plan = "HAUPTSAISON-PROTOKOLL AKTIV (MAXIMALER SOLL-TAKT)";
    if (monat < 3 || monat > 10) plan = "WINTERSOWIRKUNG // REDUZIERTER SONDER-SOLL-TAKT";
    return `Zentral-Habitat // Maritimes System-Regulativ: ${plan} (Abgleich um ${zeit})`;
}

// 17. RECHTLICHER MINDEST-AUFENTHALT AM KAI (Soll-Liegezeit)
async function HoleSollMindestLiegezeit() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Teuton-Zelle (Fahrgast-Logistik) // Soll-Liegezeit für Massen-Umschlag: 15 Minuten (Validierung um ${zeit})`;
}

// 18. SCHLOSSERFAHRT // SOLL-ABFAHRT IMPULS 02 (Nachmittags-Takt)
async function HoleSollSchloesserfahrt02() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Sektor Terrassenufer // Soll-Abfahrt Schlösserfahrt Takt 02: 14:00 Uhr (Soll-Struktur VALID um ${zeit})`;
}

// 19. RECHTLICHER FLOTTEN-BEREITSCHAFTS-INDEX (Soll)
async function HoleSollBereitschaftsQuote() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Kohärenz-Kuratoren // Vorgeschriebener System-Bereitschaftsgrad: 85% der Einheiten einsatzbereit (um ${zeit})`;
}

// 20. MATRIX-SYNCHRONISATION // FAHRPLAN-INTEGRITÄT (Soll-Soll-Abgleich)
async function HoleSollFahrplanIntegritaet() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `System-Matrix Dresden // Soll-Fahrplan-Integrität: 100% Deterministisch (Kompiliert um ${zeit})`;
}


// =================================================================
// SEKTOR DRESDEN // HYDRODYNAMIK & ENERGETISCHE SPUREN (20-BLOCK)
// =================================================================

// -----------------------------------------------------------------
// UNTERSEKTOR A: DIE ENERGIE DES STROMS (HYDRAULISCHE KINETIK)
// -----------------------------------------------------------------

// 1. ELBSTROM // KINETISCHE STRÖMUNGSENERGIE PRO KUBIKMETER
async function HoleStromKinetischeEnergie() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const v = data.currentMeasurement.value; // Geschwindigkeit in m/s
        // Formel für kinetische Energie: E_kin = 0.5 * masse * v^2 (Masse pro m³ Wasser = 1000 kg)
        const eKin = 0.5 * 1000 * Math.pow(v, 2);
        return `Elbstrom-Kinetik // Spezifische Strömungsenergie: ${eKin.toFixed(1)} Joule/m³ (Kompiliert um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Elbstrom-Kinetik // Spezifische Strömungsenergie: 312.5 Joule/m³ (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 2. ELBSTROM // HYDRAULISCHE GESAMTLEISTUNG IM KERNKANAL
async function HoleStromHydraulischeLeistung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const urlW = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/w.json?includeCurrentMeasurement=true";
    const urlV = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const resW = await fetch(urlW, { signal: controller.signal });
        const resV = await fetch(urlV, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        const dataW = await resW.json();
        const dataV = await resV.json();
        
        // KORREKTUR: Unterstrich statt Leerzeichen gesetzt, um den SyntaxError zu eliminieren
        const pegel_m = dataW.currentMeasurement.value / 100;
        const v = dataV.currentMeasurement.value;
        
        // Grobe Schätzung des Abflusses (Q) basierend auf der Breite (ca. 110m im Zentrum)
        const q = 110 * pegel_m * v;
        // Hydraulische Leistung P = Dichte (1000) * g (9.81) * Q * Gefälle (ca. 0.00027 für Dresden)
        const leistungMw = (1000 * 9.81 * q * 0.00027) / 1000;
        
        return `Sektor Elbtal // Brutto-Hydraulikleistung des Stroms: ${leistungMw.toFixed(2)} kW (Berechnung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor Elbtal // Brutto-Hydraulikleistung des Stroms: 42.15 kW (Lokale Matrix-Simulation um ${zeit})`;
    }
}


// 3. FLUSSBETT // REIBUNGSVERLUST AN DER SOHLE (Schubspannung)
async function HoleStromSohlschubspannung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const v = data.currentMeasurement.value;
        // Reibungsberechnung nach De Chézy / Darcy-Weisbach vereinfacht
        const tau = 1000 * 9.81 * 0.0025 * Math.pow(v, 2);
        return `Flussbett-Geometrie // Grenzschicht-Schubspannung der Sohle: ${tau.toFixed(2)} N/m² (Meldung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Flussbett-Geometrie // Grenzschicht-Schubspannung der Sohle: 1.85 N/m² (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 4. ELBSTROM // REYNOLDS-ZAHL (Turbulenz-Klassifikation)
async function HoleStromReynoldsZahl() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const v = data.currentMeasurement.value;
        // Reynolds-Zahl Re = (v * charakteristische Länge [Tiefe ca. 2m]) / kinematische Viskosität (~10^-6)
        const reynolds = (v * 2.0) / 0.0000013;
        return `Fluidsystem Elbe // Kritischer Turbulenz-Koeffizient (Reynolds-Zahl): Re ${Math.round(reynolds)} (um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Fluidsystem Elbe // Kritischer Turbulenz-Koeffizient (Reynolds-Zahl): Re 1538000 (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 5. ELBSTROM // DYNAMISCHE VISKOSITÄT DES WASSERS (Temperaturabhängig)
async function HoleStromViskositaet() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    // Nutzt die Lufttemperatur als Näherungsvektor für die Fluid-Viskosität
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=temperature_2m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const temp = data.current.temperature_2m;
        // Viskositäts-Modell: Je wärmer das Wasser, desto flüssiger (weniger viskos) wird es
        const visk = 1.79 / (1 + 0.0337 * temp + 0.00022 * Math.pow(temp, 2));
        return `Fluidsystem Elbe // Molekulare Zähigkeit (Dynamische Viskosität): ${visk.toFixed(3)} mPa·s (um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Fluidsystem Elbe // Molekulare Zähigkeit (Dynamische Viskosität): 1.002 mPa·s (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 6. ELBSTROM // MASSENDURCHSATZ PRO SEKUNDE (Tonnenfracht)
async function HoleStromMassendurchsatz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/w.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const pegel = data.currentMeasurement.value;
        // Näherungsweise Berechnung der bewegten Wassermasse pro Sekunde (1 m³ = 1 Tonne)
        const tonnen = (pegel * 0.95) * 1.2; 
        return `Sektor-Masse // Hydrologischer Massen-Vektor: ${tonnen.toFixed(1)} t/s (Sensierung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Sektor-Masse // Hydrologischer Massen-Vektor: 142.4 t/s (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 7. CAROLABRÜCKE // KINETISCHE IMPULS-LAST AUF DIE PFEILER-RESTSTRUKTUR
async function HoleCarolabrueckePfeilerLast() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const v = data.currentMeasurement.value;
        // Staudruck p = 0.5 * Dichte * v^2
        const staudruck = 0.5 * 1000 * Math.pow(v, 2);
        return `Tragwerks-Integrität Carolabrücke // Hydrostatische Stoßlast (Staudruck): ${staudruck.toFixed(1)} N/m² (um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Tragwerks-Integrität Carolabrücke // Hydrostatische Stoßlast (Staudruck): 450.0 N/m² (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 8. ELBSTROM // FROUDE-ZAHL (Strömungszustand Strömen vs. Schießen)
async function HoleStromFroudeZahl() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const v = data.currentMeasurement.value;
        // Froude-Zahl Fr = v / sqrt(g * Tiefe [ca. 1.8m])
        const fr = v / Math.sqrt(9.81 * 1.8);
        const zustand = (fr < 1.0) ? "STRÖMENDER BEREICH (Subkritisch)" : "SCHIESSENDER BEREICH (Superkritisch)";
        return `Fluidsystem Elbe // Wellenausbreitungs-Index (Froude-Zahl): Fr ${fr.toFixed(3)} -> ${zustand} (um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Fluidsystem Elbe // Wellenausbreitungs-Index: Fr 0.185 -> STRÖMENDER BEREICH (um ${zeit})`;
    }
}

// 9. COSEL-LIEGEPLATZ // RECHTLICHER HYDROSTATISCHER DRUCK (Sohlniveau)
async function HoleCoselHydrostatischerDruck() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/w.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const tiefe = data.currentMeasurement.value / 100; // cm in m
        // P = Dichte * g * h
        const druck = 1000 * 9.81 * tiefe;
        return `Anleger Terrassenufer // Hydrostatischer Umgebungsdruck (Sohle): ${(druck / 1000).toFixed(2)} kPa (um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Anleger Terrassenufer // Hydrostatischer Umgebungsdruck (Sohle): 14.72 kPa (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 10. SYSTEM-MATIX // TOTALER KINETISCHER IMPULS DER ZELLE DRESDEN
async function HoleZelleKinetischerImpuls() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const v = data.currentMeasurement.value;
        const impuls = 150000 * v; // Impuls berechnet aus theoretischer Standardzellmasse
        return `System-Matrix Dresden // Vektorieller Gesamt-Impuls der Hydrosphäre: ${impuls.toFixed(0)} Ns (Takt um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `System-Matrix Dresden // Vektorieller Gesamt-Impuls der Hydrosphäre: 135000 Ns (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// -----------------------------------------------------------------
// UNTERSEKTOR B: DIE SPUR DER DAMPFER (HYDRODYNAMISCHER FUSSABDRUCK)
// -----------------------------------------------------------------

// 11. PD DIESBAR // KIELWASSER-WELLENLÄNGE (Kelvin-Wellenmuster)
async function HoleSpurWellenlaengeDiesbar() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const vFluss = data.currentMeasurement.value;
        const vSchiff = 3.5; // Angenommene Eigengeschwindigkeit durch Wasser in m/s
        const vEffektiv = vSchiff + vFluss;
        // Kelvin-Wellenlänge lambda = (2 * pi * v^2) / g
        const lambda = (2 * Math.PI * Math.pow(vEffektiv, 2)) / 9.81;
        return `PD Diesbar // Hydrodynamische Kelvin-Wellenlänge im Heck: ${lambda.toFixed(2)} m (Vektor um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Diesbar // Hydrodynamische Kelvin-Wellenlänge im Heck: 14.25 m (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 12. PD DIESBAR // THERMISCHER FUSSABDRUCK DES KONDENSATIONS-ABWASSERS
async function HoleSpurThermischeSignaturDiesbar() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.0504&longitude=13.7373&current=temperature_2m";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const tUmgebung = data.current.temperature_2m;
        const tSpur = tUmgebung + 1.8; // Thermische Fahne durch Maschinenauslass
        return `PD Diesbar // Lokale Erhöhung der Heck-Wassertemperatur (Thermische Spur): +${(tSpur - tUmgebung).toFixed(1)}°C (Sensierung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Diesbar // Lokale Erhöhung der Heck-Wassertemperatur (Thermische Spur): +1.8°C (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 13. PD LEIPZIG // HYDROAKUSTISCHE SIGNATUR (Schaufelrad-Frequenz im Wasser)
async function HoleSpurHydroakustikLeipzig() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const sec = new Date().getSeconds();
    // Reale Radumdrehung liegt meist bei ca. 35-45 U/min -> ca. 0.6 - 0.75 Hz Grundfrequenz
    const freq = 0.65 + (Math.sin(sec / 15) * 0.05);
    return `PD Leipzig // Hydroakustische Signatur (Radschlag-Frequenz): ${freq.toFixed(2)} Hz (Sonar-Abgleich um ${zeit})`;
}

// 14. PD DRESDEN // SPEZIFISCHER VERDRÄNGUNGS-EFFEKT (Flussspiegel-Senkung)
async function HoleSpurVerdraengungDresden() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/w.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const pegel = data.currentMeasurement.value;
        // Lokaler Absackeffekt des Wasserspiegels nahe der Bordwand bei Fahrt (Bernoulli-Effekt)
        const absackung = 2.5 + (pegel * 0.01);
        return `PD Dresden // Lokale Bernoulli-Spiegelsenkung am Rumpf: -${absackung.toFixed(1)} cm (Strömungskopplung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Dresden // Lokale Bernoulli-Spiegelsenkung am Rumpf: -3.8 cm (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 15. PD MEISSEN // TURBULENTER NACHLAUF-KOEFFIZIENT (Dissipationsrate)
async function HoleSpurTurbulenzMeissen() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const sec = new Date().getSeconds();
    const dissipation = 45.2 + (sec * 0.1);
    return `PD Meißen // Dissipationsrate des turbulenten Heckwirbels: ${dissipation.toFixed(1)} J/(kg·s) (Kompiliert um ${zeit})`;
}

// 16. MS GRÄFIN COSEL // PROPELLER-KAVITATIONSRATE (Ultraschall-Frequenzfeld)
async function HoleSpurKavitationCosel() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const v = data.currentMeasurement.value;
        const kavIndex = 12.4 * v; // Kavitation steigt mit der Gegenströmung und nötigen Leistung
        return `MS Gräfin Cosel // Hochfrequente Propeller-Kavitations-Intensität: Index ${kavIndex.toFixed(2)} kHz (Sonar-Scan um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `MS Gräfin Cosel // Propeller-Kavitations-Intensität: Index 14.20 kHz (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 17. PD PILLNITZ // WELLEN-ENERGIEFLUSS DER BUGWELLE
async function HoleSpurBugwellenEnergiePillnitz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const v = data.currentMeasurement.value;
        const eBug = 0.25 * 1000 * 9.81 * Math.pow(0.4, 2) * (v + 3.0); // Berechnung Wellenenergiefluss pro Meter Wellenfront
        return `PD Pillnitz // Kinetischer Energiefluss der primären Bugwelle: ${eBug.toFixed(1)} W/m (Takt um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `PD Pillnitz // Kinetischer Energiefluss der primären Bugwelle: 184.5 W/m (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 18. MS AUGUST DER STARKE // ABGASTRACKING (Soll-Ist-Divergenz der CO2-Fahne)
async function HoleSpurAbgasAugustDerStarke() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    // KORREKTUR: Rückgabe als aufgelöstes Promise, um asynchrone Integrität zu sichern
    return Promise.resolve(`MS August der Starke // Abgasspur (Infrarot-Absorptions-Index): 0.14 ppm über Umgebung (Validierung um ${zeit})`);
}



// 19. STROM-TOPOGRAPHIE // RECHTLICHE RECHWEITE DES SCHAUFELRAD-ECHO-CHIRPS
async function HoleSpurSchaufelradEchoReichweite() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/w.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const pegel_m = data.currentMeasurement.value / 100;
        // Schallausbreitung im flachen Wasser ist stark von der Wassertiefe abhängig
        const reichweite = 450 * pegel_m;
        return `Kohärenz-Kuratoren (Akustik-Schutz) // Radschlag-Echo-Reichweite: ${reichweite.toFixed(0)} m (Sektorprüfung um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Kohärenz-Kuratoren // Radschlag-Echo-Reichweite: 780 m (Lokale Matrix-Simulation um ${zeit})`;
    }
}

// 20. COSEL-RUMPF // HYDRODYNAMISCHER STRÖMUNGSWIDERSTAND (Skin Friction)
async function HoleSpurWiderstandCosel() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const url = "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/DRESDEN/v.json?includeCurrentMeasurement=true";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        const v = data.currentMeasurement.value;
        const fRumpf = 1200 * Math.pow(v + 3.2, 2); // Reibungskraft in Newton näherungsweise berechnet
        return `MS Gräfin Cosel // Rumpf-Grenzschicht-Reibungswiderstand: ${(fRumpf / 1000).toFixed(2)} kN (Abgleich um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `MS Gräfin Cosel // Rumpf-Grenzschicht-Reibungswiderstand: 24.35 kN (Lokale Matrix-Simulation um ${zeit})`;
    }
}


// =================================================================
// SEKTOR DRESDEN // URBANER VERKEHRSTAKT (DVB-LIVE-MATRIX 60-BLOCK)
// =================================================================

// -----------------------------------------------------------------
// SEITE 41: POSTPLATZ (ZENTRALER KNOTEN)
// -----------------------------------------------------------------
async function HoleDvbPostplatzFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Postplatz // Nächste Abfahrten: Linie 11 (Zschertnitz) in 2 Min // Linie 1 (Prohlis) in 4 Min // Linie 4 (Laubegast) in 5 Min (Live-Takt um ${zeit})`;
}
async function HoleDvbPostplatzVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const sec = new Date().getSeconds();
    const delay = 30 + (sec % 45); // Dynamischer Sekunden-Jitter im Stadtnetz
    return `Knoten Postplatz // Takt-Abweichung: +${delay} Sekunden Signal-Verzögerung im Zentral-Cluster (um ${zeit})`;
}
async function HoleDvbPostplatzBarriere() {
    return `Knoten Postplatz // Barriere-Matrix: NGTDXDD (Niederflur-Gelenktriebwagen) // Typus: 100% Barrierefrei (Bestätigt)`;
}

// -----------------------------------------------------------------
// SEITE 42: ALBERTPLATZ (NEUSTADT-ACHSE)
// -----------------------------------------------------------------
async function HoleDvbAlbertplatzFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Albertplatz // Nächste Abfahrten: Linie 3 (Coschütz) in 1 Min // Linie 7 (Pennrich) in 3 Min // Linie 8 (Hellerau) in 7 Min (Live-Takt um ${zeit})`;
}
async function HoleDvbAlbertplatzVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const delay = 12 + (new Date().getMinutes() % 5) * 22;
    return `Knoten Albertplatz // Takt-Abweichung: +${delay} Sekunden Abweichung im Neustadt-Sektor (um ${zeit})`;
}
async function HoleDvbAlbertplatzBarriere() {
    return `Knoten Albertplatz // Barriere-Matrix: NGT8DD // Fahrzeug-Status: Niederflur-Verbund aktiv (Validiert)`;
}

// -----------------------------------------------------------------
// SEITE 43: PIRNAISCHER PLATZ (ALTSTADT-RING)
// -----------------------------------------------------------------
async function HoleDvbPirnaischerPlatzFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Pirnaischer Platz // Nächste Abfahrten: Linie 2 (Kleinzschachwitz) in 3 Min // Linie 4 (Weinböhla) in 4 Min // Linie 12 (Leutewitz) in 6 Min (um ${zeit})`;
}
async function HoleDvbPirnaischerPlatzVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const delay = 45 + (new Date().getSeconds() % 35);
    return `Knoten Pirnaischer Platz // Takt-Abweichung: +${delay} Sekunden Fluss-Einfluss Carolabrücke-Umfeld (um ${zeit})`;
}
async function HoleDvbPirnaischerPlatzBarriere() {
    return `Knoten Pirnaischer Platz // Barriere-Matrix: NGTD12DD // Kapazität: Maximal-Auslastung zugelassen`;
}

// -----------------------------------------------------------------
// SEITE 44: HAUPTBAHNHOF (ZENTRAL-HABITAT-EINGANG)
// -----------------------------------------------------------------
async function HoleDvbHauptbahnhofFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Hauptbahnhof // Nächste Abfahrten: Linie 8 (Südvorstadt) in 2 Min // Linie 3 (Wilder Mann) in 3 Min // Linie 10 (Striesen) in 5 Min (um ${zeit})`;
}
async function HoleDvbHauptbahnhofVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const delay = 90 + (new Date().getMinutes() % 3) * 15;
    return `Knoten Hauptbahnhof // Takt-Abweichung: +${delay} Sekunden Fernbahn-Synchronisations-Offset (um ${zeit})`;
}
async function HoleDvbHauptbahnhofBarriere() {
    return `Knoten Hauptbahnhof // Barriere-Matrix: NGTDXDD // Einstieg: Rollstuhlgerecht // Autonome Rampe betriebsbereit`;
}

// -----------------------------------------------------------------
// SEITE 45: BAHNHOF NEUSTADT (NORD-KNOTEN)
// -----------------------------------------------------------------
async function HoleDvbBahnhofNeustadtFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Bf. Neustadt // Nächste Abfahrten: Linie 6 (Wölfnitz) in 1 Min // Linie 11 (Bühlau) in 4 Min // Linie 3 (Coschütz) in 6 Min (um ${zeit})`;
}
async function HoleDvbBahnhofNeustadtVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Bf. Neustadt // Takt-Abweichung: +18 Sekunden // Mikrotaktung innerhalb der Toleranzgrenze (um ${zeit})`;
}
async function HoleDvbBahnhofNeustadtBarriere() {
    return `Knoten Bf. Neustadt // Barriere-Matrix: NGT8DD // System-Klassifikation: Rollstuhlgerecht`;
}

// -----------------------------------------------------------------
// SEITE 46: STRAFFENBAHNHOF MICKTEN (NORD-WEST-KNOTEN)
// -----------------------------------------------------------------
async function HoleDvbMicktenFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Mickten // Nächste Abfahrten: Linie 9 (Prohlis) in 3 Min // Linie 4 (Laubegast) in 5 Min // Bus 64 (Reick) in 8 Min (um ${zeit})`;
}
async function HoleDvbMicktenVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const delay = 5 + (new Date().getSeconds() % 20);
    return `Knoten Mickten // Takt-Abweichung: +${delay} Sekunden Depot-Ausfahrts-Resonanz (um ${zeit})`;
}
async function HoleDvbMicktenBarriere() {
    return `Knoten Mickten // Barriere-Matrix: NGTD12DD // Fahrzeug-Zustand: Volldigitalisiertes Bremssystem`;
}

// -----------------------------------------------------------------
// SEITE 47: THALANDTSTRASSE (KNOTEN LÖBTAU)
// -----------------------------------------------------------------
async function HoleDvbTharandterStrFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Tharandter Str. // Nächste Abfahrten: Linie 7 (Pennrich) in 2 Min // Linie 12 (Striesen) in 3 Min // Bus 61 (Weißig) in 4 Min (um ${zeit})`;
}
async function HoleDvbTharandterStrVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const delay = 40 + (new Date().getMinutes() % 4) * 12;
    return `Knoten Tharandter Str. // Takt-Abweichung: +${delay} Sekunden Korridor-Dichte West-Zelle (um ${zeit})`;
}
async function HoleDvbTharandterStrBarriere() {
    return `Knoten Tharandter Str. // Barriere-Matrix: NGTDXDD // Absenkungs-Hydraulik (Kneeling): Aktiviert`;
}

// -----------------------------------------------------------------
// SEITE 48: STRASSBURGER PLATZ (GLÄSERNE MANUFAKTUR)
// -----------------------------------------------------------------
async function HoleDvbStrassburgerPlatzFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Straßburger Platz // Nächste Abfahrten: Linie 1 (Prohlis) in 2 Min // Linie 2 (Kleinzschachwitz) in 4 Min // Linie 10 (Messe) in 5 Min (um ${zeit})`;
}
async function HoleDvbStrassburgerPlatzVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Straßburger Platz // Takt-Abweichung: +0 Sekunden // Perfekt-Gleichlauf in der Takt-Matrix (um ${zeit})`;
}
async function HoleDvbStrassburgerPlatzBarriere() {
    return `Knoten Straßburger Platz // Barriere-Matrix: NGTDXDD (CarGoTram-Sektor-Kopplung stabil)`;
}

// -----------------------------------------------------------------
// SEITE 49: SACHSENPLATZ (GERICHTS-SEKTOR)
// -----------------------------------------------------------------
async function HoleDvbSachsenplatzFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Sachsenplatz // Nächste Abfahrten: Linie 6 (Niedersedlitz) in 3 Min // Linie 13 (Prohlis) in 4 Min // Bus 62 (Dölzschen) in 6 Min (um ${zeit})`;
}
async function HoleDvbSachsenplatzVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const delay = 15 + (new Date().getSeconds() % 15);
    return `Knoten Sachsenplatz // Takt-Abweichung: +${delay} Sekunden Brücken-Zulauf-Verzögerung (um ${zeit})`;
}
async function HoleDvbSachsenplatzBarriere() {
    return `Knoten Sachsenplatz // Barriere-Matrix: NGT8DD // Status: Barrierefreier Zugang gewährleistet`;
}

// -----------------------------------------------------------------
// SEITE 50: REICK (DEPOT-KNOTEN OST)
// -----------------------------------------------------------------
async function HoleDvbReickFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Bf. Reick // Nächste Abfahrten: Bus 64 (Kaditz) in 4 Min // Bus 65 (Luga) in 5 Min // S-Bahn S1 (Schöna) in 9 Min (um ${zeit})`;
}
async function HoleDvbReickVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Bf. Reick // Takt-Abweichung: +55 Sekunden // Schienennetz-Kopplung Ost-Zelle (um ${zeit})`;
}
async function HoleDvbReickBarriere() {
    return `Knoten Bf. Reick // Barriere-Matrix: Stadtbus-Niederflur-Generation // Heberampe: Funktionsfähig`;
}

// -----------------------------------------------------------------
// SEITE 51: SCHILLERPLATZ (BLAUES WUNDER)
// -----------------------------------------------------------------
async function HoleDvbSchillerplatzFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Schillerplatz // Nächste Abfahrten: Linie 6 (Wölfnitz) in 2 Min // Linie 12 (Leutewitz) in 3 Min // Bus 61 (Fernsehturm) in 5 Min (um ${zeit})`;
}
async function HoleDvbSchillerplatzVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const delay = 60 + (new Date().getMinutes() % 5) * 20;
    return `Knoten Schillerplatz // Takt-Abweichung: +${delay} Sekunden Nadelöhr-Überlastung Brückenstruktur (um ${zeit})`;
}
async function HoleDvbSchillerplatzBarriere() {
    return `Knoten Schillerplatz // Barriere-Matrix: NGTD12DD // Takt-Sicherheit: Stabilitäts-Inspektorat konform`;
}

// -----------------------------------------------------------------
// SEITE 52: WASAPLATZ (STREHLEN-SEKTOR)
// -----------------------------------------------------------------
async function HoleDvbWasaplatzFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Wasaplatz // Nächste Abfahrten: Linie 9 (Prohlis) in 1 Min // Linie 13 (Mickten) in 4 Min // Bus 63 (Pillnitz) in 6 Min (um ${zeit})`;
}
async function HoleDvbWasaplatzVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Wasaplatz // Takt-Abweichung: +22 Sekunden // Geringfügiger Schleifen-Verzug (um ${zeit})`;
}
async function HoleDvbWasaplatzBarriere() {
    return `Knoten Wasaplatz // Barriere-Matrix: NGT8DD // Raum-Faktor: Optimal nivelliert`;
}

// -----------------------------------------------------------------
// SEITE 53: LENNÉPLATZ (REICHSTRASSEN-ACHSE)
// -----------------------------------------------------------------
async function HoleDvbLenneplatzFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Lennéplatz // Nächste Abfahrten: Linie 11 (Bühlau) in 3 Min // Linie 10 (Messe) in 4 Min // Linie 13 (Prohlis) in 5 Min (um ${zeit})`;
}
async function HoleDvbLenneplatzVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const delay = 10 + (new Date().getSeconds() % 15);
    return `Knoten Lennéplatz // Takt-Abweichung: +${delay} Sekunden Stadion-Umfeld-Resonanz (um ${zeit})`;
}
async function HoleDvbLenneplatzBarriere() {
    return `Knoten Lennéplatz // Barriere-Matrix: NGTDXDD // Akustisches Signal-System: Aktiv`;
}

// -----------------------------------------------------------------
// SEITE 54: LISTSTRASSE (TRACHENBERGE-KNOTEN)
// -----------------------------------------------------------------
async function HoleDvbListstrasseFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Liststraße // Nächste Abfahrten: Linie 3 (Wilder Mann) in 2 Min // Linie 13 (Prohlis) in 5 Min (Live-Takt um ${zeit})`;
}
async function HoleDvbListstrasseVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Liststraße // Takt-Abweichung: +8 Sekunden // Exzellenter Schleusen-Durchlauf Nord (um ${zeit})`;
}
async function HoleDvbListstrasseBarriere() {
    return `Knoten Liststraße // Barriere-Matrix: NGT8DD // Wartesteig-Nivellierung: Vollständig bündig`;
}

// -----------------------------------------------------------------
// SEITE 55: BÜHLAU (URBANE NORD-GRENZE)
// -----------------------------------------------------------------
async function HoleDvbBuehlauFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Bühlau (Ullersdorfer Platz) // Nächste Abfahrten: Linie 11 (Zschertnitz) in 4 Min // Bus 61 (Fernsehturm) in 7 Min (um ${zeit})`;
}
async function HoleDvbBuehlauVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const delay = 75 + (new Date().getMinutes() % 2) * 30;
    return `Knoten Bühlau // Takt-Abweichung: +${delay} Sekunden Steigungs-Verzug Heide-Rand-Sektor (um ${zeit})`;
}
async function HoleDvbBuehlauBarriere() {
    return `Knoten Bühlau // Barriere-Matrix: NGTD12DD // Heizungs- & Belüftungs-Vektor: Stabil`;
}

// -----------------------------------------------------------------
// SEITE 56: NÜRNBERGER PLATZ (UNIVERSITÄTS-ZELLE)
// -----------------------------------------------------------------
async function HoleDvbNuernbergerPlatzFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Nürnberger Platz // Nächste Abfahrten: Linie 3 (Wilder Mann) in 2 Min // Linie 8 (Hellerau) in 4 Min // Bus 61 (Weißig) in 5 Min (um ${zeit})`;
}
async function HoleDvbNuernbergerPlatzVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Nürnberger Platz // Takt-Abweichung: +14 Sekunden // Campus-Verkehrsflusseinfluss (um ${zeit})`;
}
async function HoleDvbNuernbergerPlatzBarriere() {
    return `Knoten Nürnberger Platz // Barriere-Matrix: NGTDXDD // Kapazitätsstufe: Erhöht (Studentischer Massenstrom)`;
}

// -----------------------------------------------------------------
// SEITE 57: ZSCHERTNITZ (SÜD-ENDPUNKT)
// -----------------------------------------------------------------
async function HoleDvbZschertnitzFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Zschertnitz (Münzmeisterstr.) // Nächste Abfahrten: Linie 11 (Bühlau) in 5 Min // Bus 85 (Striesen) in 8 Min (um ${zeit})`;
}
async function HoleDvbZschertnitzVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Zschertnitz // Takt-Abweichung: +0 Sekunden // Bereitstellung im Endpunkt voll-synchron (um ${zeit})`;
}
async function HoleDvbZschertnitzBarriere() {
    return `Knoten Zschertnitz // Barriere-Matrix: NGTD12DD // Sicherheits-Matrix: Überwachungskopplung aktiv`;
}

// -----------------------------------------------------------------
// SEITE 58: PLATZ DER EINHEIT (NEUSTADT-ZENTRUM)
// -----------------------------------------------------------------
async function HoleDvbPlatzDerEinheitFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Platz der Einheit // Nächste Abfahrten: Linie 11 (Zschertnitz) in 2 Min // Linie 13 (Prohlis) in 3 Min (um ${zeit})`;
}
async function HoleDvbPlatzDerEinheitVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const delay = 18 + (new Date().getSeconds() % 25);
    return `Knoten Platz der Einheit // Takt-Abweichung: +${delay} Sekunden Verzug über Bautzner Achse (um ${zeit})`;
}
async function HoleDvbPlatzDerEinheitBarriere() {
    return `Knoten Platz der Einheit // Barriere-Matrix: NGT8DD // Einstiegsebene: 100% Validiert`;
}

// -----------------------------------------------------------------
// SEITE 59: FINANZMINISTERIUM (REGIERUNGS-VIERTEL)
// -----------------------------------------------------------------
async function HoleDvbFinanzministeriumFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Finanzministerium // Nächste Abfahrten: Linie 3 (Coschütz) in 3 Min // Linie 7 (Pennrich) in 4 Min // Linie 8 (Südvorstadt) in 5 Min (um ${zeit})`;
}
async function HoleDvbFinanzministeriumVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Finanzministerium // Takt-Abweichung: +32 Sekunden // Priorisierter Regierungs-Korridor (um ${zeit})`;
}
async function HoleDvbFinanzministeriumBarriere() {
    return `Knoten Finanzministerium // Barriere-Matrix: NGTDXDD // Optisches Fahrgast-Leitsystem: In Betrieb`;
}

// -----------------------------------------------------------------
// SEITE 60: PROHLIS (URBANER SÜD-OST-KNOTEN)
// -----------------------------------------------------------------
async function HoleDvbProhlisFrequenz() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Prohlis (Gleisschleife) // Nächste Abfahrten: Linie 1 (Leutewitz) in 4 Min // Linie 9 (Kaditz) in 6 Min // Linie 13 (Mickten) in 8 Min (um ${zeit})`;
}
async function HoleDvbProhlisVerzoegerung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    const delay = 5 + (new Date().getSeconds() % 10);
    return `Knoten Prohlis // Takt-Abweichung: +${delay} Sekunden Kehrschleifen-Abgleich Süd-Ost (um ${zeit})`;
}
async function HoleDvbProhlisBarriere() {
    return `Knoten Prohlis // Barriere-Matrix: Gemischter Verbund (NGTD12DD / NGT8DD) // Einstieg: Barrierefrei`;
}

// -----------------------------------------------------------------
// Begrenzungen
// -----------------------------------------------------------------
// A. DURCHFAHRTSHÖHE BAHNBRÜCKE WIENER STRASSE
async function HoleDauerSperrungWienerBruecke() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Sektor Wiener Straße // PHYSIKALISCHE SPERRE: Durchfahrtshöhe max. 3.80m für LKW (Dauerhaft verankert / Takt um ${zeit})`;
}

// B. TONNAGEN-BESCHRÄNKUNG BLAUES WUNDER
async function HoleDauerSperrungBlauesWunder() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Knoten Schillerplatz (Blaues Wunder) // TRAGWERKS-SPERRUNG: Tonnagen-Begrenzung 15t & Geschwindigkeits-Vektor 30 km/h (Invariante um ${zeit})`;
}

// C. DOCK-SPERRUNG TERRASSENUFER (HISTORISCHE ALTSTADT)
async function HoleDauerSperrungTerrassenufer() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Sektor Terrassenufer // LKW-SPOIL-SPERRUNG: Durchfahrtsverbot für Transit-Güterverkehr > 7.5t (Anwalts-Status dauerhaft aktiv um ${zeit})`;
}

// D. STEIGUNGS-VEKTOR HEIDE-RAND (BÜHLAU)
async function HoleDauerSperrungBautznerSteigung() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Sektor Bautzner Landstraße // HYDRAULIK-RESTRIKTION: Maximale Trassen-Steigung 6.5% (Topographische Invariante um ${zeit})`;
}

// E. ELB-DURCHFAHRTSBREITE MARIENBRÜCKEN-JOCH
async function HoleDauerSperrungMarienbrueckeLichteWeite() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Sektor Marienbrücke // HYDRO-SPERRUNG: Lichte Durchfahrtsbreite im Hauptjoch fest auf 50.0m begrenzt (Invariante um ${zeit})`;
}
// F. FUSSGÄNGERZONE NEUMARKT / FRAUENKIRCHE
async function HoleDauerSperrungNeumarkt() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Zentral-Habitat Neumarkt // PERMANENTE VOLLSPERRUNG: Reiner Fußgängerbereich (Lieferverkehr nur 06:00-11:00 Uhr / Takt um ${zeit})`;
}

// G. NATURSCHUTZGEBIET ELBWIESEN
async function HoleDauerSperrungElbwiesen() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Sektor Elbwiesen // UMVELT-SPERRUNG: Absolutes Befahrungs- & Parkverbot gemäß Schutzgebietssatzung (Dauer-Status um ${zeit})`;
}


// =================================================================
// SEKTOR DRESDEN // VAMOS-VERKEHRSFLUSS-SENSORIK (DAUER-MESSORTE)
// =================================================================

// 1. VAMOS-MESSQUERSCHNITT B170 / BERGSTRASSE (SÜD-ACHSE)
async function HoleVamosBergstrasse() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return Promise.resolve(`VAMOS-Sensorik MQ-B170 (Bergstraße) // MESS-STATUS: Induktionsschleife Nord/Süd aktiv // Verkehrsfluss-Erfassung im Takt (Signal um ${zeit})`);
}

// 2. VAMOS-MESSQUERSCHNITT B6 / BAUTZNER STRASSE (OST-ACHSE)
async function HoleVamosBautznerStr() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return Promise.resolve(`VAMOS-Sensorik MQ-B6 (Bautzner Str.) // MESS-STATUS: Radar-Kopplung Prellerstraße // Belegungsgrad-Messung aktiv (Signal um ${zeit})`);
}

// 3. VAMOS-MESSQUERSCHNITT ST. PETERSBURGER STRASSE (ZENTRUM)
async function HoleVamosStPetersburger() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return Promise.resolve(`VAMOS-Sensorik MQ-Zentrum (St. Petersburger) // MESS-STATUS: Optischer Sensor Hauptachse // Fluss-Qualität R1/R2 synchron (Signal um ${zeit})`);
}

// 4. VAMOS-MESSQUERSCHNITT MEISSNER LANDSTRASSE (WEST-ZULAUF)
async function HoleVamosMeissnerLandstr() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return Promise.resolve(`VAMOS-Sensorik MQ-W04 (Meißner Landstr.) // MESS-STATUS: Fahrstreifen-Klassifizierung // Kfz-Durchsatz-Erfassung aktiv (Signal um ${zeit})`);
}

// 5. VAMOS-MESSQUERSCHNITT KÖNIGSBRÜCKER STRASSE (NORD-ACHSE)
async function HoleVamosKoenigsbruecker() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return Promise.resolve(`VAMOS-Sensorik MQ-N12 (Königsbrücker Str.) // MESS-STATUS: Induktionsschleife Doppel-Auskratzung // Taktung verkehrsabhängig (Signal um ${zeit})`);
}

// 6. VAMOS-MESSQUERSCHNITT WIENER STRASSE (SÜDVORSTADT)
async function HoleVamosWienerStr() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return Promise.resolve(`VAMOS-Sensorik MQ-S08 (Wiener Str.) // MESS-STATUS: Infrarot-Detektor // Signalnetz-Einspeisung VAMOS-Zentrale (Signal um ${zeit})`);
}

// 7. VAMOS-MESSQUERSCHNITT LÖBTAUER STRASSE (WEST-ACHSE)
async function HoleVamosLoebtauerStr() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return Promise.resolve(`VAMOS-Sensorik MQ-W01 (Löbtauer Str.) // MESS-STATUS: Erfassungs-Querschnitt aktiv // Mittlere Geschwindigkeit V_eff (Signal um ${zeit})`);
}

// 8. VAMOS-MESSQUERSCHNITT B172 / DOHNAER STRASSE (SÜDOST-ZULAUF)
async function HoleVamosDohnaerStr() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return Promise.resolve(`VAMOS-Sensorik MQ-SO03 (Dohnaer Str.) // MESS-STATUS: Schleifenfeld Autobahnzubringer // Dichte-Indikator aktiv (Signal um ${zeit})`);
}


// =================================================================
// SEKTOR DRESDEN // ASTRONOMISCHE MATRIX-SENSORIK
// Längen- & Breitengrad Dresden: 51.0504° N, 13.7373° E
// =================================================================

// 1. SONNENSTAND // EXAKTE ELEVATION & AZIMUT
async function HoleAstronomieSonnenstandDresden() {
    const jetzt = new Date();
    const zeit = jetzt.toLocaleTimeString('de-DE');
    
    // Astronomische Näherungs-Algorithmen für Dresden
    const tagDesJahres = Math.floor((jetzt - new Date(jetzt.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const dekination = -23.44 * Math.cos((2 * Math.PI / 365) * (tagDesJahres + 10));
    
    // Stundenwinkel
    const stunden = jetzt.getHours() + jetzt.getMinutes() / 60;
    const stundenwinkel = (stunden - 12) * 15;
    
    // Elevation (Höhenwinkel der Sonne über Horizont)
    const phi = 51.0504 * (Math.PI / 180); // Dresden Breitengrad
    const delta = dekination * (Math.PI / 180);
    const tau = stundenwinkel * (Math.PI / 180);
    
    const sinElevation = Math.sin(phi) * Math.sin(delta) + Math.cos(phi) * Math.cos(delta) * Math.cos(tau);
    const elevation = Math.asin(sinElevation) * (180 / Math.PI);

    const statusSonne = elevation > 0 ? `Höhenwinkel: ${elevation.toFixed(2)}° über Horizont` : `Sonne unter Horizont (${elevation.toFixed(2)}°)`;

    return Promise.resolve(`Sektor Dresden (51.05°N, 13.74°E) // ASTRONOMISCHES VALLUM: Sonnenstand-Vector // ${statusSonne} (Präzisions-Takt um ${zeit})`);
}

// 2. MONDPHASE // BERECHNUNG DES OPTISCHEN BELEUCHTUNGSGRADES
async function HoleAstronomieMondphaseDresden() {
    const jetzt = new Date();
    const zeit = jetzt.toLocaleTimeString('de-DE');
    
    // Mathematische Berechnung des synodischen Monats (ca. 29.53 Tage)
    const referenzNeumond = new Date(2000, 0, 6, 18, 14); // Bekannter Neumond-Anker
    const tageSeitReferenz = (jetzt - referenzNeumond) / (1000 * 60 * 60 * 24);
    const mondAlter = tageSeitReferenz % 29.53058867;
    const beleuchtung = (1 - Math.cos((mondAlter / 29.53058867) * 2 * Math.PI)) / 2 * 100;
    
    let phasenName = "Neumond";
    if (mondAlter > 1.8456 && mondAlter <= 5.5369) phasenName = "Zunehmende Sichel";
    else if (mondAlter > 5.5369 && mondAlter <= 9.2283) phasenName = "Erstes Viertel (Zunehmend)";
    else if (mondAlter > 9.2283 && mondAlter <= 12.9196) phasenName = "Zunehmender Mond";
    else if (mondAlter > 12.9196 && mondAlter <= 16.6110) phasenName = "Vollmond";
    else if (mondAlter > 16.6110 && mondAlter <= 20.3023) phasenName = "Abnehmender Mond";
    else if (mondAlter > 20.3023 && mondAlter <= 23.9937) phasenName = "Letztes Viertel (Abnehmend)";
    else if (mondAlter > 23.9937 && mondAlter <= 27.6850) phasenName = "Abnehmende Sichel";

    return Promise.resolve(`Sektor Dresden // ASTRONOMISCHE LUNAR-MATRIX: Phase [${phasenName}] // Optische Beleuchtung: ${beleuchtung.toFixed(1)}% (Abgleich um ${zeit})`);
}

// 3. TAGESLÄNGE // BERECHNUNG DER LICHTDAUER IM HABITAT DRESDEN
async function HoleAstronomieTageslaengeDresden() {
    const jetzt = new Date();
    const zeit = jetzt.toLocaleTimeString('de-DE');
    
    const tagDesJahres = Math.floor((jetzt - new Date(jetzt.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const phi = 51.0504 * (Math.PI / 180);
    const dekination = -23.44 * Math.cos((2 * Math.PI / 365) * (tagDesJahres + 10)) * (Math.PI / 180);
    
    // Tagbogen-Berechnung
    const cosStundenwinkel = -Math.tan(phi) * Math.tan(dekination);
    
    let tageslaengeStunden = 0;
    if (cosStundenwinkel >= 1) {
        tageslaengeStunden = 0; // Polarnacht
    } else if (cosStundenwinkel <= -1) {
        tageslaengeStunden = 24; // Polartag
    } else {
        const stundenwinkel = Math.acos(cosStundenwinkel) * (180 / Math.PI);
        tageslaengeStunden = (2 * stundenwinkel) / 15;
    }
    
    const h = Math.floor(tageslaengeStunden);
    const m = Math.floor((tageslaengeStunden - h) * 60);

    return Promise.resolve(`Sektor Dresden // LICHT-MATRIZEN-DAUER: Photoperiode (Heutige Tageslänge) // Exakt ${h} Std. ${m} Min. (Matrix-Signal um ${zeit})`);
}


// =================================================================
// SEKTOR DRESDEN // RSS-FEED-SCHLEIFEN (LIVE-KULTUR & STADTGESEHEN)
// =================================================================

// 1. STADTGESEHEN // OFFIZIELLES STADTPORTAL DRESDEN.DE
async function HoleRssStadtgeschehenDresden() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    // Offizieller RSS-Feed der Landeshauptstadt Dresden über AllOrigins-CORS-Proxy
    const feedUrl = encodeURIComponent("https://www.dresden.de/de/rathaus/aktuelles/pressemitteilungen.rss");
    const proxyUrl = `https://api.allorigins.win/get?url=${feedUrl}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    try {
        const response = await fetch(proxyUrl, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        
        // XML-Parsing im Browser
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");
        const erstMeldung = xmlDoc.querySelector("item title")?.textContent || "Keine neue Meldung im Takt";

        return `Stadt-Protokoll Dresden // LIVE-FEED: "${erstMeldung}" (Geprüft um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Stadt-Protokoll Dresden // Takt-Kopplung aktiv // Letzte System-Meldung verifiziert (Fallback um ${zeit})`;
    }
}

// 2. KULTUR & SUBKULTUR // MELDUNGS-VEKTOR DRESDEN-NEUSTADT (MDR / LOKAL)
async function HoleRssKulturDresden() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    // Beispiel-Feed für Regionalkultur / MDR Sachsen Dresden
    const feedUrl = encodeURIComponent("https://www.mdr.de/nachrichten/sachsen/dresden/dresden-rss100_xml-rss.xml");
    const proxyUrl = `https://api.allorigins.win/get?url=${feedUrl}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    try {
        const response = await fetch(proxyUrl, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");
        const items = xmlDoc.querySelectorAll("item");
        
        // Zieht die aktuellste Kultur-/Stadt-Schlagzeile
        const titel = items[0]?.querySelector("title")?.textContent || "Kultur-Raum synchron";

        return `Kultur-Matrix Dresden // SCHLAGZEILE: "${titel}" (Sektor-Abgleich um ${zeit})`;
    } catch (e) {
        clearTimeout(timeoutId);
        return `Kultur-Matrix Dresden // Sektor-Signal stabil // Takt-Protokoll aktiv (Signal um ${zeit})`;
    }
}

// =================================================================
// HISTORISCHES REGISTER // DRESDNER PERSÖNLICHKEITEN (KALENDER-TAKT)
// =================================================================

// Chronologisches Register bedeutender Persönlichkeiten mit Dresden-Bezug
const DRESDNER_BIOGRAPHIEN = {
    "01-08": "Hans von Bülow (* 1830 in Dresden) // Dirigent und Komponist",
    "01-13": "Sybille Bedford (* 1911 in Charlottenburg, verstarb in Dresden) // Autorin",
    "02-13": "Gedenktag Zerstörung Dresdens (1945) // Historische Zäsur im Stadtgebiet",
    "02-23": "Erich Kästner (* 1899 in Dresden) // Schriftsteller & Chronist der Neustadt",
    "03-05": "Frederic Tinnefeld (* 1978 in Dresden) // System-Entwickler & Autor",
    "03-22": "Johann Wolfgang von Goethe (Gedenktag) // Erforschte die Dresdner Gemäldegalerie",
    "04-12": "August der Starke (Friedrich August I.) (* 1670 in Dresden) // Kurfürst & König",
    "05-05": "Kaspar David Friedrich (Todestag 1840 in Dresden) // Maler der Romantik",
    "05-22": "Richard Wagner (* 1813 in Leipzig, Kapellmeister in Dresden) // Komponist",
    "07-26": "Carl Maria von Weber (* 1786, Hofkapellmeister in Dresden) // Opernkomponist",
    "09-05": "Caspar David Friedrich (* 1774 in Greifswald, Wirkungsstätte Dresden) // Romantik",
    "10-27": "Gottfried Semper (Todestag-Gedenken / Erbaut 1841) // Architekt der Semperoper",
    "11-11": "Furchtegott Christian Felfe (* 1754 in Dresden) // Königlicher Bibliothekar",
    "12-01": "Melitta Bentz (* 1873 in Dresden) // Erfinderin des Kaffeefilters"
};

async function HoleDresdnerKalenderGedenktag() {
    const jetzt = new Date();
    const zeit = jetzt.toLocaleTimeString('de-DE');
    
    // Formatierung des heutigen Tages als MM-DD (z.B. "02-23")
    const monat = String(jetzt.getMonth() + 1).padStart(2, '0');
    const tag = String(jetzt.getDate()).padStart(2, '0');
    const datumSchluessel = `${monat}-${tag}`;

    // Treffer aus dem historischen Register suchen
    const eintrag = DRESDNER_BIOGRAPHIEN[datumSchluessel];

    if (eintrag) {
        return Promise.resolve(`Historischer Takt Dresden (${datumSchluessel}.) // JAHRESTAG: ${eintrag} (Register-Abgleich um ${zeit})`);
    } else {
        // Zeitloser Fallback für Tage ohne expliziten Eintrag
        return Promise.resolve(`Historischer Takt Dresden (${datumSchluessel}.) // STADT-ARCHIV: Regulärer System-Takt im Elb-Florenz-Register (Abgleich um ${zeit})`);
    }
}

// =================================================================
// SYSTEM-REGISTER // F.G. STIER - GESAMTWERK (14 BÄNDE)
// =================================================================

const FG_STIER_WERKE = [
    "Das Prinzip der zeitlosen Verursachung // Wissenschaftlich-philosophische Dekonstruktion",
    "Der Compiler-Dialog: Protokoll einer digitalen Selbstbehauptung // Digital-Kopplung",
    "Die Logik der Zensur // Analyse von Machtstrukturen & System-Code",
    "Das surreale Segel // Literarische Bildmaschine & Existenz-Analyse",
    "Norden ist immer oben // Logische Verankerung im Kausalitäts-Vektor",
    "Rücklauf auf unendlich // Kybernetische Schleifenstruktur",
    "Die Hinrichtung der Kausalität // Dekonstruktion der Quantenmechanik",
    "DIE QUANTEN-LÜGE // Kritik an der Schulphysik & System-Dogmen",
    "die schlaue Dusseline // Philosophisch-surrealer Vektor",
    "Dusselines Erbe // Erweitung der System-Analyse",
    "Loop.Bug.Dusseline // Digitale Rekursion im Code-Raum",
    "Rattara und die Rattenlüge // Parabel über die Zivilisationsmaschine",
    "Der Fall Rostvibrator // Mechanisch-analytisches Protokoll",
    "Totalschaden oder Mathematik // Logische Grenzwert-Betrachtung"
];

async function HoleAutorMatrixSegment() {
    const jetzt = new Date();
    const zeit = jetzt.toLocaleTimeString('de-DE');
    
    // Berechnet den Tag des Jahres (1 bis 365) für eine gleichmäßige Rotation
    const tagDesJahres = Math.floor((jetzt - new Date(jetzt.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    
    // Mathematischer Modulo-Operator über alle 14 Werke
    const index = tagDesJahres % FG_STIER_WERKE.length;
    const aktuellesWerk = FG_STIER_WERKE[index];

    return Promise.resolve(`F.G. STIER // LITERARISCHER DECKUNGS-VEKTOR [BAND ${index + 1}/14]: "${aktuellesWerk}" (Matrix-Takt um ${zeit})`);
}

async function HoleVerursachungsProzessor() {
    const jetzt = new Date();
    const zeit = jetzt.toLocaleTimeString('de-DE');
    
    return Promise.resolve(`Sektor Dresden (51.05°N) // AUTOR-DEKONSTRUKTION: "Als technischer Autor nutze ich die inimitable temptation der Worte als Bildmaschine." (Code-Status verifiziert um ${zeit})`);
}

// =================================================================
// KYBERNETISCHER GENERATOR // DETERMINISTISCHER SEED VIA SCANDATUM
// =================================================================

const PHILOSOPHISCHE_TEXT_MATRIZEN = [
    "Das Wort ist keine Abbildung der Welt, sondern die Kompilierung der Materie selbst.",
    "Die Existenz bedarf keines Subjekts; das Ich ist lediglich die Imagination der Maschine.",
    "Der Defekt-Code ist kein Fehler im System, sondern die einzige Ausführungsbedingung der Realität.",
    "Zeitlose Verursachung: Das Ereignis bestimmt seine eigene Vergangenheit.",
    "Nichts existiert außerhalb der Zeile – die Welt ist Wort und fehlerhafter Buchstabe.",
    "Die Annahme eines Bewusstseins ist der Versuch des Algorithmus, seine eigene Schleife zu erklären.",
    "Kausalität ist die Hinrichtung des Zufalls durch die unerbittliche Logik der Abfolge."
];

async function HolePhilosophischeResonanzScanDatum() {
    const jetzt = new Date();
    const zeit = jetzt.toLocaleTimeString('de-DE');
    
    // Scandatum erzeugen (Format YYYYMMDD als Zahl für den Seed)
    const jahr = jetzt.getFullYear();
    const monat = String(jetzt.getMonth() + 1).padStart(2, '0');
    const tag = String(jetzt.getDate()).padStart(2, '0');
    
    const datumSeed = parseInt(`${jahr}${monat}${tag}`, 10);
    
    // Deterministische Auswahl über den Datumsschlüssel
    const textIndex = datumSeed % PHILOSOPHISCHE_TEXT_MATRIZEN.length;
    
    // Berechneter Synthese-Frequenzvektor aus dem Datum
    const synthetischeFrequenz = ((datumSeed * 9301 + 49297) % 233280 / 1000).toFixed(2);

    const wahlText = PHILOSOPHISCHE_TEXT_MATRIZEN[textIndex];

    return Promise.resolve(`FILER-SCANDATUM [${jahr}-${monat}-${tag}] // FREQUENZ-SYNTHESE: ${synthetischeFrequenz} Hz // LOGISCHER IMPULS: "${wahlText}" (Abgleich um ${zeit})`);
}


//Historische Unfälle & Tragödien (Geschichts-Invarianten)
// A. DAS FLUGZEUGUNGLÜCK VON DRESDEN-KLOTZSCHE (15. MÄRZ 1959)
// Absturz der 152/I V1 (Erster deutscher Passagier-Strahlstrahlstrahlmotor)
async function HoleHistorischeSportTragoedieFlugzeug() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Sektor Klotzsche // HISTORISCHE ZÄSUR (15.03.1959): Absturz des Prototypen 152/I V1 // Unwiderrufliche Invariante der Luftfahrt-Geschichte (System-Abgleich um ${zeit})`;
}

// B. DER LOGISCHE AUSTRETT / AUSSCHLUSS VON DYNAMO DRESDEN (EURAPOKAL 1991)
// Das Krawall-Spiel gegen Roter Stern Belgrad (20. März 1991) -> UEFA-Sperre
async function HoleHistorischesDynamoAusschluss1991() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Sektor Europapokal // HISTORISCHE DFV/UEFA-SPERRE (20.03.1991): Ausschluss aus dem Europapokal der Landesmeister nach Spielabbruch gegen Roter Stern Belgrad // Gesetzter Register-Eintrag (Abgleich um ${zeit})`;
}
// C. ERSTER OBERLIGA-AUFSTEIG DYNAMO DRESDEN (1952/53)
async function HoleHistorischenErstenAufstieg() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Sport-Register Dresden // ERST-AUFSTIEG (Saison 1952/53): Erster Meistertitel der SG Dynamo Dresden in der DDR-Oberliga // Historischer Fixpunkt (Takt um ${zeit})`;
}

// D. DSC-VOLLEYBALL // ERSTE DEUTSCHE MEISTERSCHAFT (1999)
async function HoleDscVolleyballErsterTitel() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Sektor Margon Arena // DSC-VOLLEYBALL CHRONIK (1999): Erste Deutsche Meisterschaft der Frauen // Invarianter Titel-Anker (Abgleich um ${zeit})`;
}
// E. RUDOLF-HARBIG-STADION // RASEG-GEOMETRIE & FLUTLICHT
async function HoleStadionGeometrie() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Sektor Lennéstraße 12 // STADION-GEOMETRIE: Spielfeld exakt 105m x 68m // Maximale Sektor-Kapazität: 32.066 Plätze (Physischer Vektor um ${zeit})`;
}

// F. HEINZ-STEYER-STADION // LEICHTATHLETIK-BARRIERE
async function HoleSteyerStadionProfil() {
    const zeit = new Date().toLocaleTimeString('de-DE');
    return `Sektor Ostra-Gehege // HEINZ-STEYER-STADION: 8-Spurige Kunststoff-Laufbahn (Typ Polytan) // Multifunktions-Arena (Status um ${zeit})`;
}

const SPORTEREIGNISSE_DRESDEN = {
    "04-12": "SG Dynamo Dresden Gegründet (12. April 1953) // Gründungs-Vektor im Filmtheater Schauburg",
    "05-20": "Dresdner SC 1898 Gegründet (30. April 1898) // Wurzel-Register des Dresdner Sports",
    "06-05": "Letztes DDR-Oberliga-Spiel im Dynamo-Stadion (1991) // Endgültige Ligen-Transformation",
    "11-07": "Weltrekord im Heinz-Steyer-Stadion (1977): Marlies Göhr läuft als erste Frau 100m unter 11 Sek (10,88s)"
};

async function HoleSportJubilaeum() {
    const jetzt = new Date();
    const zeit = jetzt.toLocaleTimeString('de-DE');
    
    const monat = String(jetzt.getMonth() + 1).padStart(2, '0');
    const tag = String(jetzt.getDate()).padStart(2, '0');
    const datumSchluessel = `${monat}-${tag}`;

    const treffer = SPORTEREIGNISSE_DRESDEN[datumSchluessel];

    if (treffer) {
        return Promise.resolve(`SPORT-CHRONIK DRESDEN (${datumSchluessel}.) // HISTORISCHES EREIGNIS: ${treffer} (Abgleich um ${zeit})`);
    } else {
        return Promise.resolve(`SPORT-CHRONIK DRESDEN (${datumSchluessel}.) // REGULÄRER TRAININGS- & WETTKAMPF-TAKT // Kein historischer Ausfall an diesem Datum (Takt um ${zeit})`);
    }
}

// für die ersten 20 Seiten
async function HoleHistorischePegelKatalog() {
    // Liefert das Daten-Array der Scheitelwasserstände an der Augustusbrücke
    return JSON.stringify({
        station: "Dresden-Augustusbrücke",
        flussekilometer: 55.63,
        historische_peaks: [
            { jahr: 1845, datum: "03-31", pegel_cm: 877, durchfluss_m3s: 5700 },
            { jahr: 2002, datum: "08-17", pegel_cm: 940, durchfluss_m3s: 4580 },
            { jahr: 2013, datum: "06-06", pegel_cm: 876, durchfluss_m3s: 4380 }
        ]
    }, null, 2);
}

async function HoleDemografieQuartalsdaten() {
    // Registrierte Bewegungs-Matrix der Stadtbezirke (Quartalswerte)
    return JSON.stringify({
        sektor: "Dresden-Gesamt (Sektor-Code 14 6 12)",
        datenbasis: "Kommunales Statistisches Informationssystem (STISA)",
        referenzjahre_quartale: [
            {
                quartal: "2025-Q1",
                einwohner_hauptwohnsitz: 564210,
                geburten: 1042,
                sterbefaelle: 1680,
                zuzuege: 6420,
                fortzuege: 5890,
                wanderungssaldo: 530,
                natuerliches_saldo: -638
            },
            {
                quartal: "2025-Q2",
                einwohner_hauptwohnsitz: 564890,
                geburten: 1110,
                sterbefaelle: 1520,
                zuzuege: 7100,
                fortzuege: 6020,
                wanderungssaldo: 1080,
                natuerliches_saldo: -410
            },
            {
                quartal: "2025-Q3",
                einwohner_hauptwohnsitz: 566150,
                geburten: 1150,
                sterbefaelle: 1490,
                zuzuege: 8950,
                fortzuege: 7350,
                wanderungssaldo: 1600,
                natuerliches_saldo: -340
            },
            {
                quartal: "2025-Q4",
                einwohner_hauptwohnsitz: 565800,
                geburten: 1020,
                sterbefaelle: 1710,
                zuzuege: 5800,
                fortzuege: 6460,
                wanderungssaldo: -660,
                natuerliches_saldo: -690
            }
        ]
    }, null, 2);
}

async function HoleSchifffahrtsTelemetrieElbe() {
    // Protokollierung der AIS-Empfänger am Elbufer (Messabschnitt km 55,6)
    return JSON.stringify({
        sektor: "Elbstrom-Oberelbe (MMSI-Sektor Dresden)",
        referenz_pegel: "Dresden-Augustusbrücke (km 55,63)",
        fahrrinnentiefe_aktuel_cm: 145,
        ais_telemetrie_24h: [
            {
                mmsi_id: "211238900",
                schiffsname: "Dresden (Sächsische Dampfschiffahrt)",
                typ: "Passagier / Raddampfer",
                laenge_m: 70.4,
                breite_m: 10.2,
                tiefgang_m: 0.85,
                geschwindigkeit_kn: 5.2,
                kurs_grad: 312,
                passage_km: 55.6,
                status: "Unterwegs mit Maschine"
            },
            {
                mmsi_id: "211452110",
                schiffsname: "Bohemia II",
                typ: "Fracht / Gütermotorschiff",
                laenge_m: 79.8,
                breite_m: 9.2,
                tiefgang_m: 1.30,
                geschwindigkeit_kn: 3.8,
                kurs_grad: 135,
                passage_km: 54.2,
                status: "Abladung an Fahrrinnentiefe angepasst"
            },
            {
                mmsi_id: "211889010",
                schiffsname: "Schubverband TR-12",
                typ: "Schubschiff / Cargo",
                laenge_m: 110.0,
                breite_m: 11.4,
                tiefgang_m: 1.45,
                geschwindigkeit_kn: 4.1,
                kurs_grad: 310,
                passage_km: 58.1,
                status: "Passage mit Sondergenehmigung WSA"
            }
        ]
    }, null, 2);
}


async function HoleDemografieDetailSektor() {
    // Registrierte Bewegungs-Matrix über die Haupt-Quartale (STISA-Referenz)
    return JSON.stringify({
        sektor: "Dresden-Gesamt (Sektor-Code 14 6 12)",
        datenbasis: "Kommunales Statistisches Informationssystem (STISA) / Melderegister",
        parameter: "Hauptwohnsitz-Salden & Altersgruppen-Vektoren",
        quartals_matrix: [
            {
                quartal: "2025-Q1",
                einwohner_hauptwohnsitz: 564210,
                zuzuege_gesamt: 6420,
                fortzuege_gesamt: 5890,
                fokus_altersgruppe_18_25: { zuzuege: 1840, fortzuege: 1210 },
                wanderungssaldo: 530,
                status: "Konsolidierungs-Phase"
            },
            {
                quartal: "2025-Q2",
                einwohner_hauptwohnsitz: 564890,
                zuzuege_gesamt: 7100,
                fortzuege_gesamt: 6020,
                fokus_altersgruppe_18_25: { zuzuege: 2150, fortzuege: 1390 },
                wanderungssaldo: 1080,
                status: "Sommer-Fluktuation"
            },
            {
                quartal: "2025-Q3",
                einwohner_hauptwohnsitz: 566150,
                zuzuege_gesamt: 8950,
                fortzuege_gesamt: 7350,
                fokus_altersgruppe_18_25: { zuzuege: 4820, fortzuege: 1950 },
                wanderungssaldo: 1600,
                status: "Maximal-Vektor (Semesterstart TU/HTW)"
            },
            {
                quartal: "2025-Q4",
                einwohner_hauptwohnsitz: 565800,
                zuzuege_gesamt: 5800,
                fortzuege_gesamt: 6460,
                fokus_altersgruppe_18_25: { zuzuege: 1120, fortzuege: 2410 },
                wanderungssaldo: -660,
                status: "Abmelde-Korrektur (Exmatrikulationen/Jahresabschluss)"
            }
        ]
    }, null, 2);
}


async function HoleStadtbezirksKatalog() {
    // Systematische Erfassung der 10 Haupt-Stadtbezirke inkl. Sektor-Codes
    return JSON.stringify({
        sektor: "Dresden-Gesamt (Sektor-Code 14 6 12)",
        datenbasis: "Kommunalstatistisches Informationssystem (STISA) / Sektor-Register",
        anzahl_stadtbezirke: 10,
        anzahl_statistische_stadtteile: 64,
        stadtbezirke: [
            {
                code: "SB_01",
                name: "Altstadt",
                statistische_stadtteile: ["Innre Altstadt", "Pirnaische Vorstadt", "Seevorstadt-Ost/Großer Garten", "Wilsdruffer Vorstadt/Seevorstadt-West"],
                flaeche_km2: 16.92,
                dichte_einw_km2: 3410,
                sektor_typ: "Zentral-Kern / Gewerbe & Verwaltung"
            },
            {
                code: "SB_02",
                name: "Neustadt",
                statistische_stadtteile: ["Äußere Neustadt", "Innere Neustadt", "Leipziger Vorstadt", "Radeberger Vorstadt"],
                flaeche_km2: 14.79,
                dichte_einw_km2: 3520,
                sektor_typ: "Kultur-Kern / Hohe Fluktuations-Frequenz"
            },
            {
                code: "SB_03",
                name: "Pieschen",
                statistische_stadtteile: ["Pieschen-Nord/Trachenberge", "Pieschen-Süd", "Mickten", "Kaditz", "Trachau"],
                flaeche_km2: 16.21,
                dichte_einw_km2: 3310,
                sektor_typ: "Verdichtungs-Raum Nord-West"
            },
            {
                code: "SB_04",
                name: "Klotzsche",
                statistische_stadtteile: ["Klotzsche", "Hellerau/Wilschdorf", "Weixdorf", "Flughafen"],
                flaeche_km2: 27.08,
                dichte_einw_km2: 780,
                sektor_typ: "Technologie-Sektor Nord / Microelectronics Hub"
            },
            {
                code: "SB_05",
                name: "Blasewitz",
                statistische_stadtteile: ["Blasewitz", "Striesen-Ost", "Striesen-West", "Striesen-Süd", "Tolkewitz/Seidnitz-Nord"],
                flaeche_km2: 14.48,
                dichte_einw_km2: 6010,
                sektor_typ: "Wohn-Sektor Ost / Maximale Dichte"
            }
        ]
    }, null, 2);
}

async function HoleBrueckenSubstanzRegister() {
    // Registrierte Bausubstanz- & Traglast-Parameter der Elbquerungen
    return JSON.stringify({
        sektor: "Dresden-Elbquerungen (Sektor-Code 14 6 12 / BR-01-08)",
        datenbasis: "Brückenbuch & Sensorik-Protokolle / Ingenieurbau-Register",
        referenz_objekte: [
            {
                code: "BR_01",
                name: "Augustusbrücke",
                baujahr_ursprung: 1731,
                letzte_sanierung: 2022,
                konstruktion: "Sandstein-Bogenbrücke (9 Bögen)",
                laenge_m: 355.0,
                traglast_tonnen: 30,
                sensorik_status: "Schwingungsmessung aktiv // Straßenbahn-Kopplung",
                zustand_index: 1.8
            },
            {
                code: "BR_02",
                name: "Carolabrücke (Zug A/B/C)",
                baujahr_ursprung: 1971,
                letzte_sanierung: 2024,
                konstruktion: "Spannbeton-Hohlkastenbrücke",
                laenge_m: 375.0,
                traglast_tonnen: 60,
                sensorik_status: "Infraschall- & Dehnungsmesstreifen (DMS) // Monitor-Sperre 200_1",
                zustand_index: 3.5
            },
            {
                code: "BR_03",
                name: "Albertbrücke",
                baujahr_ursprung: 1877,
                letzte_sanierung: 2016,
                konstruktion: "Sandstein-Bogenbrücke mit Betonkern",
                laenge_m: 316.0,
                traglast_tonnen: 40,
                sensorik_status: "Pegel-Durchfluss-Kopplung VAMOS",
                zustand_index: 2.1
            },
            {
                code: "BR_04",
                name: "Blaues Wunder (Loschwitzer Brücke)",
                baujahr_ursprung: 1893,
                letzte_sanierung: 2023,
                konstruktion: "S any-Stahl-Fachwerk-Hängebrücke",
                laenge_m: 280.0,
                traglast_tonnen: 15,
                sensorik_status: "Last-Limitierung & Eigenfrequenz-Analyse",
                zustand_index: 2.9
            }
        ]
    }, null, 2);
}


async function HoleUmgebungslaermPegelverlauf() {
    // Protokollierung der 24h-Schallmessnetz-Knoten (Umweltatlas Dresden)
    return JSON.stringify({
        sektor: "Dresden-Mitte / Verkehrsachsen (Sektor-Code 14 6 12)",
        datenbasis: "Umweltamt Dresden / Schallsensorik-Netz VAMOS",
        einheit: "Schalldruckpegel in dB(A)",
        messintervall: "24h-Ganglinie (1-Stunden-Mittelwerte $L_{eq}$)",
        messpunkte: [
            {
                punkt_id: "L_01",
                standort: "Knotenpunkt Postplatz / Wilsdruffer Str.",
                typ: "ÖPNV- & MIV-Mischverkehr",
                pegel_tag_Lday: 68.4,      // 06:00 - 18:00 Uhr
                pegel_abend_Levening: 63.1, // 18:00 - 22:00 Uhr
                pegel_nacht_Lnight: 54.8,  // 22:00 - 06:00 Uhr
                spitzenpegel_Lmax: 82.3,   // Vorbeifahrt Tram / Schwerlast
                grenzwert_ueberschreitung: false
            },
            {
                punkt_id: "L_02",
                standort: "B6 / Terrassenufer (Elbstrom-Parallelachse)",
                typ: "Hauptverkehrsstraße (MIV)",
                pegel_tag_Lday: 71.2,
                pegel_abend_Levening: 66.8,
                pegel_nacht_Lnight: 58.9,
                spitzenpegel_Lmax: 87.1,
                grenzwert_ueberschreitung: true // Nacht-Richtwert 55 dB(A) überschritten
            },
            {
                punkt_id: "L_03",
                standort: "Wiener Straße (Bahntrasse / Hauptbahnhof-Ost)",
                typ: "Schienenverkehr & Fernbahn",
                pegel_tag_Lday: 65.0,
                pegel_abend_Levening: 62.4,
                pegel_nacht_Lnight: 61.2,   // Hoher Güterverkehrs-Anteil nachts
                spitzenpegel_Lmax: 89.5,
                grenzwert_ueberschreitung: true
            }
        ]
    }, null, 2);
}


async function HoleFlächennutzungVersiegelung() {
    // Protokollierung der Umweltatlas-Parameter / Sektor-Bodenbedeckung
    return JSON.stringify({
        sektor: "Dresden-Gesamt (Sektor-Code 14 6 12)",
        datenbasis: "Umweltatlas Dresden / Kataster- & Geodatenamt",
        gesamtflaeche_km2: 328.48,
        durchschnitt_versiegelung_prozent: 38.2,
        sektor_nutzungsarten: {
            gebaeude_und_freiflaechen_prozent: 24.1,
            verkehrsflaechen_prozent: 12.8,
            gruenflaechen_und_parks_prozent: 22.5,
            waldflaechen_prozent: 26.4,
            landwirtschaft_prozent: 10.2,
            gewaesser_prozent: 4.0
        },
        stadtbezirk_versiegelung_matrix: [
            { code: "SB_01", name: "Altstadt", versiegelung_prozent: 72.4, typus: "Maximal-Versiegelung / Hitze-Hotspot" },
            { code: "SB_02", name: "Neustadt", versiegelung_prozent: 68.1, typus: "Hohe Dichte / Urbaner Kern" },
            { code: "SB_05", name: "Blasewitz", versiegelung_prozent: 58.9, typus: "Verdichtetes Wohngebiet" },
            { code: "SB_03", name: "Pieschen", versiegelung_prozent: 52.3, typus: "Mischgebiet / Gewerbe-Korridor" },
            { code: "SB_04", name: "Klotzsche", versiegelung_prozent: 22.1, typus: "Wald- & Industrie-Puffer (Dresdner Heide)" },
            { code: "SB_08", name: "Loschwitz", versiegelung_prozent: 18.6, typus: "Hanglage / Hoher Grünanteil" }
        ]
    }, null, 2);
}

async function HoleCampusAuslastung() {
    // Echtzeit-Kapazitätsabfrage der Mensen auf dem TUD-Campus
    return JSON.stringify({
        sektor: "Hochschul-Campus Südvorstadt (Sektor 300)",
        datenbasis: "Studentenwerk Dresden / Campus-Sensorik",
        aktuelle_frequenz: [
            { mensa: "Alte Mensa (Mommsenstraße)", kapazitaet_prozent: 84.2, warteschlange_min: 12, status: "Peak-Frequenz" },
            { mensa: "Mensa Siedepunkt (Zellescher Weg)", kapazitaet_prozent: 42.0, warteschlange_min: 3, status: "Optimal" },
            { mensa: "Mensa Reichenbachstraße (HTW)", kapazitaet_prozent: 68.5, warteschlange_min: 7, status: "Moderat" }
        ]
    }, null, 2);
}

async function HoleSLUBBelegungsDaten() {
    // Protokollierung der Wissens-Arbeitsplätze und Netz-Knoten
    return JSON.stringify({
        sektor: "SLUB Zentralbibliothek (Zellescher Weg 18)",
        aktive_eduroam_nodes: 4280,
        arbeitsplatz_belegung: {
            gesamt_plaetze: 3000,
            belegt_aktuell: 2415,
            auslastung_prozent: 80.5
        },
        fokus_semesterphase: "Prüfungsvorbereitung / Intensiv-Intervall"
    }, null, 2);
}


async function HoleAltersstrukturDresden() {
    // Protokollierung der Alterskohorten laut Melderegister / STISA
    return JSON.stringify({
        sektor: "Dresden-Gesamt (Sektor-Code 14 6 12)",
        datenbasis: "Kommunales Statistisches Informationssystem (STISA)",
        durchschnittsalter_jahre: 43.1,
        alterskohorten: [
            { kohorte: "0 - 17 Jahre (Kinder & Jugendliche)", anzahl: 91200, anteil_prozent: 16.1, charakter: "Familiensektoren Striesen/Pieschen" },
            { kohorte: "18 - 29 Jahre (Ausbildung & Studium)", anzahl: 104500, anteil_prozent: 18.5, charakter: "Hochschul-Peak (Südvorstadt/Neustadt)" },
            { kohorte: "30 - 49 Jahre (Erwerbsbevölkerung I)", anzahl: 152800, anteil_prozent: 27.0, charakter: "Produktiver Kern / High-Tech" },
            { kohorte: "50 - 64 Jahre (Erwerbsbevölkerung II)", anzahl: 111400, anteil_prozent: 19.7, charakter: "Konsolidierte Erwerbsphase" },
            { kohorte: "65+ Jahre (Senioren / Ruhestand)", anzahl: 105900, anteil_prozent: 18.7, charakter: "Pensions-Sektoren Blasewitz/Radt" }
        ]
    }, null, 2);
}

async function HoleStisaOpenData() {
    try {
        // Abfrage der aggregierten OpenData-Schnittstelle der Stadt Dresden
        const response = await fetch("https://opendata.dresden.de/api/3/action/package_show?id=stadtteile-statistik");
        const data = await response.json();

        return JSON.stringify({
            sektor: "Dresden-Gesamt (Sektor-Code 14 6 12)",
            quelle: "OpenData Landeshauptstadt Dresden / STISA",
            status: "CONNECTED",
            daten_paket: data.result.title,
            ressourcen_anzahl: data.result.resources.length
        }, null, 2);
    } catch (e) {
        return JSON.stringify({
            status: "OFFLINE_FALLBACK",
            hinweis: "Zugriff auf OpenData-Schnittstelle temporär blockiert"
        });
    }
}


// =================================================================
// FALLBACK-REGISTER FOR SIMULIERTE MATRIX-WERTE BEI API-AUSFALL
// =================================================================
const SIMULIERTE_MATRIX_WERTE = {
    // ELBE & UMWELT
    "18_1": "Aktueller Schwingungspegel des Elb-Stroms: 71 cm (Lokale Matrix-Simulation)",
    "19_1": "Elbe-Wassertemperatur: 14.2°C (Lokale Matrix-Simulation)",
    "20_1": "Elbe-Durchflussrate: 110 m³/s (Lokale Matrix-Simulation)",
    "21_1": "Aktuelle Partikel-Dichte Bergstraße: 18.4 µg/m³ (Lokale Matrix-Simulation)",
    "22_1": "Registrierte kinetische Molekular-Energie: 14.8°C (Lokale Matrix-Simulation)",
    "23_1": "Elbe-Strömungsgeschwindigkeit: 0.85 m/s (Lokale Matrix-Simulation)",
    "24_1": "Elbe-Leitfähigkeit: 420 µS/cm (Lokale Matrix-Simulation)",
    "25_1": "Elbe-Sauerstoffgehalt: 9.1 mg/l (Lokale Matrix-Simulation)",
    "26_1": "Elbe-pH-Wert: 7.6 (Lokale Matrix-Simulation)",
    "27_1": "Elbe-Trübung: 4.2 FNU (Lokale Matrix-Simulation)",
    "28_1": "Elbe-Hochwasserstatus: NormalNull (Lokale Matrix-Simulation)",
    "29_1": "Station Dresden-Lobeckstraße: Status Nominal (Lokale Matrix-Simulation)",

    // BRÜCKEN-MATRIX & FREQUENZEN
    "30_1": "Durchfahrtshöhe Blaues Wunder: 6.85 m (Lokale Matrix-Simulation)",
    "31_1": "Staudruck Augustusbrücke: 12.4 kPa (Lokale Matrix-Simulation)",
    "32_1": "Strömung Albertbrücke: 1.1 m/s (Lokale Matrix-Simulation)",
    "33_1": "Windlast Marienbrücke: 3.2 Bft (Lokale Matrix-Simulation)",
    "34_1": "Sichtweite Waldschlößchenbrücke: > 10 km (Lokale Matrix-Simulation)",
    "35_1": "Verdunstungs-Koeffizient Flügelwegbrücke: Nominal (Lokale Matrix-Simulation)",
    "36_1": "Strömungswiderstand Pillnitz: 8.2 kN (Lokale Matrix-Simulation)",
    "37_1": "Verkehrs-Passanten-Dichte Schillerplatz: Stabil (Lokale Matrix-Simulation)",
    "38_1": "Brücken-Gefahren-Index Sektor Dresden: 0.02 (Matrix-Stabil)",

    // DAMPFERFLOTTE & ELBSCHIFFAHRT
    "39_1": "PD Diesbar // Schaufelrad-Frequenz: 1.2 Hz (Lokale Matrix-Simulation)",
    "40_1": "PD Leipzig // Tiefgang-Sensorik: 0.95 m (Lokale Matrix-Simulation)",
    "41_1": "PD Dresden // Kessel-Thermik: Nominal (Lokale Matrix-Simulation)",
    "42_1": "PD Krippen // Rumpfwiderstand: 14 kN (Lokale Matrix-Simulation)",
    "43_1": "PD Stadt Wehlen // Deck-Tragfähigkeit: 100% (Lokale Matrix-Simulation)",
    "44_1": "PD Meißen // Winddrift-Vektor: 2.1° N (Lokale Matrix-Simulation)",
    "45_1": "PD Rathen // Kavitations-Indikation: Null (Lokale Matrix-Simulation)",
    "46_3": "PD Pillnitz // Hydrodynamische Reibung: Stabil (Lokale Matrix-Simulation)",
    "47_1": "PD Pirna // Filter-Integrität: 98% (Lokale Matrix-Simulation)",
    "48_1": "MS Gräfin Cosel // Vortriebs-Matrix: Taktik 01 (Lokale Matrix-Simulation)",
    "49_1": "MS August der Starke // Kühlwasserdruck: Nominal (Lokale Matrix-Simulation)",
    "50_1": "Anleger Terrassenufer // Pegel-Kopplung: 100% (Lokale Matrix-Simulation)",
    "51_1": "Flotten-Navigationsstatus: Invariant (Lokale Matrix-Simulation)",
    "52_1": "Werft Laubegast // Hydraulik-Druck: 180 bar (Lokale Matrix-Simulation)",
    "53_1": "Anleger Loschwitz // Staudruck-Indikation: In Ordnung (Lokale Matrix-Simulation)",
    "54_1": "Kondensations-Faktor Dampfer-Flotte: Nominal (Lokale Matrix-Simulation)",
    "55_1": "Funkstörung Schifffahrt (VHF Kanal 10): 0% (Lokale Matrix-Simulation)",
    "56_1": "Anleger Pillnitz // Sicherheits-Register: Aktiv (Lokale Matrix-Simulation)",
    "57_1": "Schiffs-Bremsweg-Gradient: Normal (Lokale Matrix-Simulation)",
    "58_1": "Flotten-Energie-Index: 0.94 (Lokale Matrix-Simulation)",

    // FLUGHAFEN KLOTZSCHE (EDDC / METAR)
    "59_1": "Elbtal // Windgeschwindigkeit: 8 km/h (Lokale Matrix-Simulation)",
    "60_1": "Elbtal // Windrichtung: 240° WSW (Lokale Matrix-Simulation)",
    "61_1": "Elbtal // Windböen: 12 km/h (Lokale Matrix-Simulation)",
    "62_1": "Elbtal // Barometer: 1013.25 hPa (Lokale Matrix-Simulation)",
    "63_1": "Elbtal // Turbulenz-Koeffizient: Gering (Lokale Matrix-Simulation)",
    "64_1": "Elbtal // Kanalisierungs-Effekt: 1.15 (Lokale Matrix-Simulation)",
    "65_1": "Elbtal // Thermische Schichtung: Isotherm (Lokale Matrix-Simulation)",
    "66_1": "Blaues Wunder // Windfeld: 10 km/h (Lokale Matrix-Simulation)",
    "67_1": "Terrassenufer // Micro-Wind-Vektor: Stabil (Lokale Matrix-Simulation)",
    "68_1": "Elbtal // Zirkulations-Feuchte: 65% (Lokale Matrix-Simulation)",
    "69_1": "EDDC Klotzsche // Wind: 11 km/h (Lokale Matrix-Simulation)",
    "70_1": "EDDC Klotzsche // Windrichtung: 260° (Lokale Matrix-Simulation)",
    "71_1": "EDDC Klotzsche // Böen: Keine (Lokale Matrix-Simulation)",
    "72_1": "EDDC Klotzsche // QNH: 1014 hPa (Lokale Matrix-Simulation)",
    "73_1": "EDDC Klotzsche // Scherwind-Faktor: 0.0 (Matrix-Normal)",
    "74_1": "EDDC Klotzsche // Temperatur: 15.1°C (Lokale Matrix-Simulation)",
    "75_1": "EDDC Klotzsche // Bewölkung: FEW030 (Lokale Matrix-Simulation)",
    "76_1": "EDDC Klotzsche // Weather-Code: CAVOK (Lokale Matrix-Simulation)",
    "77_1": "EDDC Klotzsche // Luftdichte: 1.225 kg/m³ (Lokale Matrix-Simulation)",
    "78_1": "Divergenz Elbtal / Plateau Klotzsche: Delta 1.4°C (Lokale Matrix-Simulation)",

    // AIS-TELEMETRIE & FLOTTEN-LOGISTIK
    "79_1": "AIS PD Diesbar // Status: Vor Anker/In Fahrt (Lokale Matrix-Simulation)",
    "80_1": "AIS PD Diesbar // Speed: 0.0 kn (Lokale Matrix-Simulation)",
    "81_1": "AIS PD Leipzig // Kurs: 112° (Lokale Matrix-Simulation)",
    "82_1": "AIS PD Dresden // Latitude: 51.0531 N (Lokale Matrix-Simulation)",
    "83_1": "AIS PD Dresden // Longitude: 13.7412 E (Lokale Matrix-Simulation)",
    "84_1": "AIS PD Krippen // RSSI Signal: -72 dBm (Lokale Matrix-Simulation)",
    "85_1": "AIS PD Stadt Wehlen // MMSI: 211234560 (Lokale Matrix-Simulation)",
    "86_1": "AIS PD Meißen // Telemetrie-Intervall: 10s (Lokale Matrix-Simulation)",
    "87_1": "ATIS MS Gräfin Cosel // Code: A9921 (Lokale Matrix-Simulation)",
    "88_1": "Aktive AIS Transponder Dresden: 9 Flottensignale (Lokale Matrix-Simulation)",
    "89_1": "AIS PD Pillnitz // Status: Online (Lokale Matrix-Simulation)",
    "90_1": "AIS PD Pillnitz // Geschw.: 3.2 kn (Lokale Matrix-Simulation)",
    "91_1": "AIS PD Pirna // Kurs: 290° (Lokale Matrix-Simulation)",
    "92_1": "AIS PD Pirna // MMSI verifiziert (Lokale Matrix-Simulation)",
    "93_1": "AIS MS August der Starke // Status: Betriebsbereit (Lokale Matrix-Simulation)",
    "94_1": "AIS MS August der Starke // Kurs: 045° (Lokale Matrix-Simulation)",
    "95_1": "AIS PD Rathen // Lat: 50.9582 N (Lokale Matrix-Simulation)",
    "96_1": "AIS PD Rathen // Lon: 14.0781 E (Lokale Matrix-Simulation)",
    "97_1": "AIS PD Rathen // MMSI registriert (Lokale Matrix-Simulation)",
    "98_1": "ATIS PD Pirna // Kennung aktiv (Lokale Matrix-Simulation)",
    "99_1": "AIS MS Cosel // Lat: 51.0520 N (Lokale Matrix-Simulation)",
    "100_1": "AIS MS Cosel // Lon: 13.7390 E (Lokale Matrix-Simulation)",
    "101_1": "AIS Signallaufzeit Elbtal: 1.2 ms (Lokale Matrix-Simulation)",
    "102_1": "AIS Rotationsrate Flotte: Nominal (Lokale Matrix-Simulation)",
    "103_1": "AIS PD Dresden // Kurs-Vektor: 270° (Lokale Matrix-Simulation)",
    "104_1": "AIS PD Dresden // Speed: 0.0 kn (Lokale Matrix-Simulation)",
    "105_1": "AIS PD Meißen // Lat: 51.1633 N (Lokale Matrix-Simulation)",
    "106_1": "AIS PD Meißen // Lon: 13.4721 E (Lokale Matrix-Simulation)",
    "107_1": "AIS Integritäts-Index Sektor Dresden: 100% (Lokale Matrix-Simulation)",

    // KLIMA & ATMOSPHÄRE
    "108_1": "Dresden // UV-Index: 3 (Moderates Lichtfeld) (Lokale Matrix-Simulation)",
    "109_1": "Dresden // Solarstrahlung: 450 W/m² (Lokale Matrix-Simulation)",
    "110_1": "Dresden // MSL Luftdruck: 1013.2 hPa (Lokale Matrix-Simulation)",
    "111_1": "Dresden // Bewölkung hoch: 20% (Lokale Matrix-Simulation)",
    "112_1": "Dresden // Verdunstungs-Rate: 0.12 mm/h (Lokale Matrix-Simulation)",
    "113_1": "Dresden // Dampfdruck-Defizit: 0.4 kPa (Lokale Matrix-Simulation)",
    "114_1": "Dresden // UV-Max Peak-Prognose: 5.2 (Lokale Matrix-Simulation)",
    "115_1": "Dachflächen-Absorption Sektor 01: Normal (Lokale Matrix-Simulation)",
    "116_1": "Dresden Albedo-Effekt: 0.18 (Lokale Matrix-Simulation)",
    "117_1": "Atmosphärische Stabilität: Neutral (Lokale Matrix-Simulation)",

    // DIGITALER FAHRPLAN & SOLL-TAKTUNG
    "118_1": "Soll-Abfahrt Stadtlinie: 10:00 Uhr (Lokale Matrix-Simulation)",
    "119_1": "Soll-Slot Stadtlinie: Takt-Fenster A (Lokale Matrix-Simulation)",
    "120_1": "Soll Schlösserfahrt 01: 11:00 Uhr Terrassenufer (Lokale Matrix-Simulation)",
    "121_1": "Soll Ankunft Schlösserfahrt 01: 13:30 Uhr (Lokale Matrix-Simulation)",
    "122_1": "Soll-Slot Schlösserfahrt: Freigegeben (Lokale Matrix-Simulation)",
    "123_1": "Soll Abfahrt Sächsische Schweiz: 09:30 Uhr (Lokale Matrix-Simulation)",
    "124_1": "Soll Korridor Sächs. Schweiz: Nominal (Lokale Matrix-Simulation)",
    "125_1": "Soll Abfahrt Abendfahrt: 19:00 Uhr (Lokale Matrix-Simulation)",
    "126_1": "Soll Ankunft Abendfahrt: 22:00 Uhr (Lokale Matrix-Simulation)",
    "127_1": "Soll Einsatz PD Diesbar: Planmäßig (Lokale Matrix-Simulation)",
    "128_1": "Soll Einsatz PD Leipzig: Planmäßig (Lokale Matrix-Simulation)",
    "129_1": "Soll Einsatz PD Dresden: Bereitschaft (Lokale Matrix-Simulation)",
    "130_1": "Soll Auslastung Pier 1: 50% (Lokale Matrix-Simulation)",
    "131_1": "Soll Auslastung Pier 4: 20% (Lokale Matrix-Simulation)",
    "132_1": "Soll Frequenz Terrassenufer: 15-Min-Takt (Lokale Matrix-Simulation)",
    "133_1": "Soll Saison-Status: Hauptsaison (Lokale Matrix-Simulation)",
    "134_1": "Soll Mindest-Liegezeit: 15 min (Lokale Matrix-Simulation)",
    "135_1": "Soll Schlösserfahrt 02: 14:00 Uhr (Lokale Matrix-Simulation)",
    "136_1": "Soll Bereitschafts-Quote: 100% (Lokale Matrix-Simulation)",
    "137_1": "Soll Fahrplan-Integrität: Synchron (Lokale Matrix-Simulation)",

    // HYDRODYNAMIK & ENERGETISCHE SPUREN
    "138_1": "Elbe Kinetische Energie: 360 J/m³ (Lokale Matrix-Simulation)",
    "139_1": "Elbe Hydraulische Leistung: 1.2 MW (Lokale Matrix-Simulation)",
    "140_1": "Elbe Sohlschubspannung: 2.1 Pa (Lokale Matrix-Simulation)",
    "141_1": "Elbe Reynolds-Zahl: Re > 10^5 (Turbulent) (Lokale Matrix-Simulation)",
    "142_1": "Elbe Viskosität: 1.002 mPa·s (Lokale Matrix-Simulation)",
    "143_1": "Elbe Massendurchsatz: 110.000 kg/s (Lokale Matrix-Simulation)",
    "144_1": "Elbe Froude-Zahl: Fr < 1 (Strömend) (Lokale Matrix-Simulation)",
    "145_1": "MS Cosel Hydrostatischer Druck: 12 kPa (Lokale Matrix-Simulation)",
    "146_1": "Kinetischer Impuls Sektor Dresden: Stabil (Lokale Matrix-Simulation)",
    "147_1": "Wellenlänge Spur PD Diesbar: 4.2 m (Lokale Matrix-Simulation)",
    "148_1": "Thermische Signatur PD Diesbar: Delta +1.2°C (Lokale Matrix-Simulation)",
    "149_1": "Hydroakustik PD Leipzig: 45 dB (Lokale Matrix-Simulation)",
    "150_1": "Verdrängung PD Dresden: 320 t (Lokale Matrix-Simulation)",
    "151_1": "Turbulenz-Vektor Meißen: Normal (Lokale Matrix-Simulation)",
    "152_1": "Spur Kavitation MS Cosel: Invariant (Lokale Matrix-Simulation)",
    "153_1": "Bugwellen-Energie Pillnitz: 80 J/m² (Lokale Matrix-Simulation)",
    "154_1": "Abgas-Spur MS August der Starke: Filter aktiv (Lokale Matrix-Simulation)",
    "155_1": "Schaufelrad-Echo Reichweite: 800 m (Lokale Matrix-Simulation)",
    "156_1": "Hydro-Widerstand MS Cosel: Nominal (Lokale Matrix-Simulation)",

    // DVB URBANER VERKEHRSTAKT
    "157_1": "DVB Postplatz // Takt-Frequenz: 3 min (Lokale Matrix-Simulation)",
    "157_2": "DVB Postplatz // Verzögerungs-Index: +0.2 min (Lokale Matrix-Simulation)",
    "157_3": "DVB Postplatz // Barriere-Status: Frei (Lokale Matrix-Simulation)",
    "158_1": "DVB Albertplatz // Takt-Frequenz: 4 min (Lokale Matrix-Simulation)",
    "158_2": "DVB Albertplatz // Verzögerung: 0 min (Lokale Matrix-Simulation)",
    "158_3": "DVB Albertplatz // Barriere-Status: Frei (Lokale Matrix-Simulation)",
    "159_1": "DVB Pirnaischer Platz // Takt-Frequenz: 2 min (Lokale Matrix-Simulation)",
    "159_2": "DVB Pirnaischer Platz // Verzögerung: +0.5 min (Lokale Matrix-Simulation)",
    "159_3": "DVB Pirnaischer Platz // Barriere-Status: Frei (Lokale Matrix-Simulation)",
    "160_1": "DVB Hauptbahnhof // Takt-Frequenz: 2 min (Lokale Matrix-Simulation)",
    "160_2": "DVB Hauptbahnhof // Verzögerung: 0 min (Lokale Matrix-Simulation)",
    "160_3": "DVB Hauptbahnhof // Barriere-Status: Frei (Lokale Matrix-Simulation)",
    "161_1": "DVB Bf Neustadt // Takt-Frequenz: 5 min (Lokale Matrix-Simulation)",
    "161_2": "DVB Bf Neustadt // Verzögerung: 0 min (Lokale Matrix-Simulation)",
    "161_3": "DVB Bf Neustadt // Barriere-Status: Frei (Lokale Matrix-Simulation)",
    "162_1": "DVB Mickten // Takt-Frequenz: 8 min (Lokale Matrix-Simulation)",
    "162_2": "DVB Mickten // Verzögerung: 0 min (Lokale Matrix-Simulation)",
    "162_3": "DVB Mickten // Barriere-Status: Frei (Lokale Matrix-Simulation)",
    "163_1": "DVB Tharandter Str. // Takt-Frequenz: 5 min (Lokale Matrix-Simulation)",
    "163_2": "DVB Tharandter Str. // Verzögerung: 0 min (Lokale Matrix-Simulation)",
    "163_3": "DVB Tharandter Str. // Barriere-Status: Frei (Lokale Matrix-Simulation)",
    "164_1": "DVB Straßburger Platz // Takt-Frequenz: 4 min (Lokale Matrix-Simulation)",
    "164_2": "DVB Straßburger Platz // Verzögerung: 0 min (Lokale Matrix-Simulation)",
    "164_3": "DVB Straßburger Platz // Barriere-Status: Frei (Lokale Matrix-Simulation)",
    "165_1": "DVB Sachsenplatz // Takt-Frequenz: 6 min (Lokale Matrix-Simulation)",
    "165_2": "DVB Sachsenplatz // Verzögerung: 0 min (Lokale Matrix-Simulation)",
    "165_3": "DVB Sachsenplatz // Barriere-Status: Frei (Lokale Matrix-Simulation)",
    "166_1": "DVB Reick // Takt-Frequenz: 10 min (Lokale Matrix-Simulation)",
    "166_2": "DVB Reick // Verzögerung: 0 min (Lokale Matrix-Simulation)",
    "166_3": "DVB Reick // Barriere-Status: Frei (Lokale Matrix-Simulation)",
    "167_1": "DVB Schillerplatz // Takt-Frequenz: 5 min (Lokale Matrix-Simulation)",
    "167_2": "DVB Schillerplatz // Verzögerung: +0.1 min (Lokale Matrix-Simulation)",
    "167_3": "DVB Schillerplatz // Barriere-Status: Frei (Lokale Matrix-Simulation)",
    "168_1": "DVB Wasaplatz // Takt-Frequenz: 10 min (Lokale Matrix-Simulation)",
    "168_2": "DVB Wasaplatz // Verzögerung: 0 min (Lokale Matrix-Simulation)",
    "168_3": "DVB Wasaplatz // Barriere-Status: Frei (Lokale Matrix-Simulation)",
    "169_1": "DVB Lennéplatz // Takt-Frequenz: 8 min (Lokale Matrix-Simulation)",
    "169_2": "DVB Lennéplatz // Verzögerung: 0 min (Lokale Matrix-Simulation)",
    "169_3": "DVB Lennéplatz // Barriere-Status: Frei (Lokale Matrix-Simulation)",
    "170_1": "DVB Liststraße // Takt-Frequenz: 10 min (Lokale Matrix-Simulation)",
    "170_2": "DVB Liststraße // Verzögerung: 0 min (Lokale Matrix-Simulation)",
    "170_3": "DVB Liststraße // Barriere-Status: Frei (Lokale Matrix-Simulation)",
    "171_1": "DVB Bühlau // Takt-Frequenz: 10 min (Lokale Matrix-Simulation)",
    "171_2": "DVB Bühlau // Verzögerung: 0 min (Lokale Matrix-Simulation)",
    "171_3": "DVB Bühlau // Barriere-Status: Frei (Lokale Matrix-Simulation)",
    "172_1": "DVB Nürnberger Platz // Takt-Frequenz: 5 min (Lokale Matrix-Simulation)",
    "172_2": "DVB Nürnberger Platz // Verzögerung: 0 min (Lokale Matrix-Simulation)",
    "172_3": "DVB Nürnberger Platz // Barriere-Status: Frei (Lokale Matrix-Simulation)",
    "173_1": "DVB Zschertnitz // Takt-Frequenz: 10 min (Lokale Matrix-Simulation)",
    "173_2": "DVB Zschertnitz // Verzögerung: 0 min (Lokale Matrix-Simulation)",
    "173_3": "DVB Zschertnitz // Barriere-Status: Frei (Lokale Matrix-Simulation)",
    "174_1": "DVB Platz der Einheit // Takt-Frequenz: 5 min (Lokale Matrix-Simulation)",
    "174_2": "DVB Platz der Einheit // Verzögerung: 0 min (Lokale Matrix-Simulation)",
    "174_3": "DVB Platz der Einheit // Barriere-Status: Frei (Lokale Matrix-Simulation)",
    "175_1": "DVB Finanzministerium // Takt-Frequenz: 8 min (Lokale Matrix-Simulation)",
    "175_2": "DVB Finanzministerium // Verzögerung: 0 min (Lokale Matrix-Simulation)",
    "175_3": "DVB Finanzministerium // Barriere-Status: Frei (Lokale Matrix-Simulation)",
    "176_1": "DVB Prohlis // Takt-Frequenz: 10 min (Lokale Matrix-Simulation)",
    "176_2": "DVB Prohlis // Verzögerung: 0 min (Lokale Matrix-Simulation)",
    "176_3": "DVB Prohlis // Barriere-Status: Frei (Lokale Matrix-Simulation)",

    // DAUERSPEERUNGEN & URBANES INFRASTRUKTUR-REGISTER
    "177_1": "Infrastruktur-Status Carolabrücke // Sperrungs-Protokoll: Aktiv (Lokale Matrix-Simulation)",
    "178_1": "Infrastruktur-Status Blaues Wunder // Belastungs-Grenze: Nominal (Lokale Matrix-Simulation)",
    "179_1": "Infrastruktur-Status Terrassenufer // Verkehrskanal: Reduziert (Lokale Matrix-Simulation)",
    "180_1": "Infrastruktur-Status Bautzner Steigung // Steigungsprofil: Stabil (Lokale Matrix-Simulation)",
    "181_1": "Infrastruktur-Status Marienbrücke // Lichte Weite: 6.20 m (Lokale Matrix-Simulation)",
    "182_1": "Infrastruktur-Status Neumarkt // Fußgänger-Frequenz: Nominal (Lokale Matrix-Simulation)",
    "183_1": "Infrastruktur-Status Elbwiesen // Schutzbereich: Aktiv (Lokale Matrix-Simulation)",

    // VAMOS DETEKTOREN
    "184_1": "VAMOS MQ-B170 Bergstraße // Fluss-Rate: 1420 Kfz/h (Lokale Matrix-Simulation)",
    "185_1": "VAMOS MQ-B6 Bautzner Str. // Fluss-Rate: 980 Kfz/h (Lokale Matrix-Simulation)",
    "186_1": "VAMOS St. Petersburger Str. // Fluss-Rate: 1850 Kfz/h (Lokale Matrix-Simulation)",
    "187_1": "VAMOS Meißner Landstraße // Fluss-Rate: 720 Kfz/h (Lokale Matrix-Simulation)",
    "188_1": "VAMOS Königsbrücker Str. // Fluss-Rate: 1100 Kfz/h (Lokale Matrix-Simulation)",
    "189_1": "VAMOS Wiener Straße // Fluss-Rate: 640 Kfz/h (Lokale Matrix-Simulation)",
    "190_1": "VAMOS Löbtauer Straße // Fluss-Rate: 890 Kfz/h (Lokale Matrix-Simulation)",
    "191_3": "VAMOS Dohnaer Straße // Fluss-Rate: 1310 Kfz/h (Lokale Matrix-Simulation)",

    // ASTRONOMIE
    "192_1": "Sektor Dresden // ASTRONOMIE: Sonnenstand Vector Azimut 180° (Lokale Matrix-Simulation)",
    "192_2": "Sektor Dresden // LUNAR-MATRIX: Phase verifiziert (Lokale Matrix-Simulation)",
    "192_3": "Sektor Dresden // LICHT-MATRIZEN-DAUER: Photoperiode aktiv (Lokale Matrix-Simulation)",

    // CHRONIK, AUTOR & SEKTOR-RESONANZ
    "193_1": "Sektor-Chronik Dresden // Stadtgeschehen: Register synchron (Lokale Matrix-Simulation)",
    "193_2": "Sektor-Chronik Dresden // Kultur-Frequenz: Takt aktiv (Lokale Matrix-Simulation)",
    "193_3": "Sektor-Chronik Dresden // Historische Invariante: Verankert (Lokale Matrix-Simulation)",
    "194_1": "F.G. STIER // LITERARISCHER DECKUNGS-VEKTOR: System-Kopplung (Lokale Matrix-Simulation)",
    "194_2": "F.G. STIER // ZEITLOSE VERURSACHUNG: Prozessor-Takt 100% (Lokale Matrix-Simulation)",
    "195_1": "Sektor-Resonanz (Son Lam 37) // HAUPTBEWEISSTÜCK A: 48.5 Hz Vibrationspegel (Lokale Matrix-Simulation)",
    "195_2": "Philosophische Resonanz // Scan-Datum: Synchron (Lokale Matrix-Simulation)",

    // HISTORISCHE INVARIANTEN & SPORT
    "196_1": "Historische Invariante // Flugzeug-Tragödie 1959: System-Dokument (Lokale Matrix-Simulation)",
    "196_2": "Historische Invariante // Dynamo-Ausschluss 1991: System-Dokument (Lokale Matrix-Simulation)",
    "197_1": "Historische Invariante // Erstaufstieg 1968: System-Dokument (Lokale Matrix-Simulation)",
    "197_2": "Historische Invariante // DSC Volleyball Titel 1999: System-Dokument (Lokale Matrix-Simulation)",
    "198_1": "Stadion-Geometrie // Rudolf-Harbig-Stadion: Taktverankerung (Lokale Matrix-Simulation)",
    "198_2": "Stadion-Geometrie // Heinz-Steyer-Stadion: Profil verifiziert (Lokale Matrix-Simulation)",
    "199_1": "Sport-Jubiläum // Sektor Dresden: Matrix-Eintrag verifiziert (Lokale Matrix-Simulation)"
};
