# NOVA – Gebäudereinigung & Sanierung

Erster Design-/Content-Prototyp für den neuen Kunden. Der aktuelle Markenname **NOVA** ist bewusst nur ein Platzhalter, bis Firmenname und Logo vorliegen.

## Struktur

- `index.html` – Split-Einstieg mit Auswahl zwischen Gebäudereinigung und Sanierung
- `reinigung.html` – eigenständiger Bereich Gebäudereinigung
- `sanierung.html` – eigenständiger Bereich Sanierung
- `styles.css` – gemeinsames responsive Design
- `app.js` – Mobile Navigation, Reveal Animation und Demoformular

## Cloudflare Pages

Die Seite ist bewusst statisch gehalten und braucht keinen Build-Step.

- Framework preset: **None**
- Build command: **leer lassen**
- Build output directory: **/**
- Root directory: **/**

Damit kann das Repository direkt als Cloudflare Pages Projekt deployed werden.

## Vor Go-Live ersetzen / ergänzen

1. Firmenname und Logo
2. Telefon, E-Mail und Adresse
3. Einsatzgebiet / Städte
4. finale Leistungen für Gebäudereinigung
5. finale Leistungen für Sanierung
6. echte Projektbilder / Referenzen
7. Impressum und Datenschutz
8. Formularziel (z. B. E-Mail/CRM/Cloudflare Function)
9. Social Links falls vorhanden

## Designidee

Der Einstieg trennt die beiden Geschäftsbereiche bereits auf der ersten Seite. Die Unterseiten haben bewusst unterschiedliche Farbwelten, bleiben aber als eine Marke erkennbar. Inhaltlich orientiert sich die Informationsarchitektur an bewährten Bau-/Dienstleistungsseiten: Leistungen, Qualitätsargumente, Ablauf und klare Anfrage-CTA.
