# 🎂 Kavya's 27th Birthday Surprise Website

A cinematic, emotional, highly-animated one-page birthday experience built for **Kavya**, turning 27 on **18 August 2026**. It is designed to feel like a personal mini-movie made by her younger sister — not a generic birthday template.

---

## ✅ Completed Features

### The 9-screen cinematic journey
1. **Mystery Intro** — full-screen dark starfield, sequential fade-in text ("Hey Kavya...", "I made something for you.", "But there's one little rule...", "Don't skip. ❤️"), glowing "Enter Your Surprise ✨" button. Scroll/interaction is locked until she clicks Enter, with a smooth blur/zoom transition into the experience.
2. **Countdown of Memories** — animated giant "27" gradient number, "27 years of being YOU," five staggered glassmorphic identity cards ("A proud daughter", "A loving sister", "A fearless soldier 🇮🇳", etc.), and a closing "you became all of these at once" reveal.
3. **The Proud Daughter** — glowing rotating-border photo frame (real family photo), warm emotional copy, golden floating particles.
4. **The Sister Section** — playful heading, animated list ("annoy, laugh with, fight with, make fun of, and still count on"), floating heart/star doodles, mini photo strip of sister memories.
5. **The Unexpected Reveal — Lieutenant Kavya** — dark heartbeat-pulse background, slow sequential text build-up, dramatic "YOU'RE A LIEUTENANT. 🇮🇳" cinematic typography in army-green/gold tones, her real uniform photo in a glowing frame, and a set of "Strong enough to lead / Brave enough to serve..." lines.
6. **Official Kavya Report** — funny animated stat bars (Coolness 100%, Chaos 101%, Awesomeness ∞%, etc.) that count up and fill on scroll.
7. **The Personal Letter** — handwritten-script styled letter from the config file, revealed line-by-line as you scroll.
8. **Photo Memory Wall** — a 12-photo polaroid-style scrapbook grid with captions, rotation, stickers, and hover-lift animation, built from Kavya's real photos.
9. **The Final Surprise** — dark screen, growing starfield, slow reveal of "Kavya... Ready?", huge animated "HAPPY BIRTHDAY ❤️" gradient title, affirmation lines, a gold-toned celebration card ("🎂 HAPPY 27TH BIRTHDAY, KAVYA 🎂ᐟ Lieutenant Kavya 🇮🇳"), confetti + floating emoji celebration burst, and a **Replay the Surprise** button that restarts the whole experience.

### Interactive / technical features
- Scroll-triggered animations throughout (GSAP + ScrollTrigger)
- Ambient twinkling star/particle canvas background (whole site) + dedicated dense starfields for the intro and finale
- Floating gold/army-green particle emojis in the daughter & Lieutenant sections
- Desktop-only soft cursor glow that follows the mouse
- Scroll progress bar pinned to the top of the page
- Background **music toggle** (visible button, bottom-right) — music never autoplays; only starts after the user clicks
- Confetti + floating balloon/heart/star burst celebration (canvas-confetti) at the finale
- Fully responsive: tested and verified at mobile (390px), and desktop (1280px+) widths
- Respects `prefers-reduced-motion` (disables non-essential animation/transition durations)
- Lazy-loaded images (`loading="lazy"`) throughout the gallery/photo sections
- Loading screen with a soft glowing spinner shown while fonts/assets warm up

---

## 🗂️ Project Structure

```
index.html          → all 9 screens/sections (single page)
css/style.css        → full visual theme, animations, responsive rules
js/config.js         → ⭐ ALL editable content lives here (see below)
js/main.js           → animation logic, scroll triggers, music, confetti, particles
images/              → Kavya's real photos (32 photos supplied, reused across
                        the daughter section, sister strip, Lieutenant reveal,
                        and the 12-photo memory wall)
audio/README.txt     → instructions for adding a real background-music file
```

There are no query parameters or routes — it's a single scrolling page at `/index.html`.

---

## ✏️ How to Edit Content (no code digging required)

Open **`js/config.js`** — everything editable lives in one `SITE_CONFIG` object:

| What you want to change | Field in `SITE_CONFIG` |
|---|---|
| Her name / birthdate / age | `sisterName`, `birthDate`, `birthdayShort`, `age` |
| Background music file | `music.src` (drop an mp3 into `/audio` and point to it) |
| Intro mystery lines | `intro.lines`, `intro.buttonText` |
| The 5 "you are..." identity cards | `memoryCards` |
| Daughter section photo | `daughterPhoto` |
| Sister section mini photo strip | `sisterStrip` (array of image paths) |
| Lieutenant reveal photo | `armyPhoto` |
| Fun stats/percentages | `stats` |
| The personal letter | `letter.salutation`, `letter.paragraphs`, `letter.signoff`, `letter.signature` |
| The 12-photo memory wall + captions | `gallery` (array of `{ src, caption }`) |
| Final reveal lines | `finalReveal` |

Simply replacing an image path in `config.js` (or in `images/`) updates every place that photo is used — nothing is hardcoded elsewhere.

---

## 🎵 Adding Real Music

1. Get a soft instrumental/emotional MP3 (keep it small, ideally < 5MB for fast mobile loading on WhatsApp shares).
2. Save it as `audio/birthday-theme.mp3` (matching the path already set in `js/config.js`).
3. That's it — the existing music toggle button will play/pause it. No code changes needed.

Until a real file is added, clicking the music button simply does nothing (fails silently, no errors).

---

## 📸 Photos Used

All of Kavya's supplied photos were saved into `/images` and distributed across the daughter section, sister section, Lieutenant reveal (her real uniform photo), and the 12-photo scrapbook wall. You can swap any of them at any time via `js/config.js` or by replacing the files directly in `/images`.

---

## 🚧 Not Yet Implemented / Optional Next Steps

- **Real background music file** — currently a placeholder path; add an actual MP3 to `audio/birthday-theme.mp3` (see above).
- **Custom cursor trail on desktop** is implemented as a soft glow only (not a trailing particle stream) — could be enhanced further if desired.
- **Analytics / view tracking** — not included (this is a private gift page, not meant to be indexed or tracked).
- **Countdown timer to the exact birthday moment** — a `targetBirthdayISO` field already exists in the config for this, but no live countdown clock is currently wired up (can be added easily if wanted).
- Could add a **shareable "highlights" auto-scroll video** in the future, but that would require server-side rendering, which is outside static-site scope.

---

## 🌐 Deployment

This is a static site (`code_sandbox_light_git`) — no backend, no database, no table API used (there is no dynamic data to persist; all content is static and lives in `js/config.js`).

To make this live and share the link with Kavya on WhatsApp, use the **Publish tab** in the builder — it will handle deployment automatically and give you a shareable live URL.

---

## 💡 Design Notes

- **Palette**: Midnight navy (`#0a0e27`/`#131a3a`), soft lavender (`#b7a9ec`), blush pink (`#f3b9c9`), warm gold (`#e8c07d`), white, and a subtle army green (`#6b7a5e`) reserved specifically for the Lieutenant reveal section.
- **Typography**: Playfair Display (headings/cinematic moments), Cormorant Garamond (elegant body/lead lines), Dancing Script (the handwritten letter), Poppins/Inter (UI + supporting text).
- No official military insignia or copyrighted logos were used in the Lieutenant section — only tasteful color, typography, and her own real uniform photo.

Made with ❤️ — Happy 27th Birthday, Lieutenant Kavya! 🇮🇳
