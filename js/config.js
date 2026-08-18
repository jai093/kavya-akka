/**
 * ============================================================
 *  KAVYA'S BIRTHDAY EXPERIENCE — CONFIG FILE
 * ============================================================
 *  Edit everything here. Nothing else needs to change.
 *  - name / date / age
 *  - photos (just swap the file paths in /images)
 *  - letter text
 *  - timeline / gallery captions
 *  - music track
 * ============================================================
 */

const SITE_CONFIG = {
  // ---------- Core identity ----------
  sisterName: "Kavya",
  authorName: "Your annoying younger sister",
  birthDate: "18 August 1999",
  birthdayShort: "18 August",
  age: 27,
  targetBirthdayISO: "2026-08-18T00:00:00", // used for potential future countdown logic

  // ---------- Background music ----------
  // Place an mp3 in /audio and point to it here. Leave as-is for silent placeholder.
  music: {
    src: "audio/birthday-theme.mp3",
    title: "A little song for you"
  },

  // ---------- Screen 1: Mystery intro ----------
  intro: {
    lines: [
      "Hey Kavya...",
      "I made something for you.",
      "But there's one little rule...",
      "Don't skip. ❤️"
    ],
    buttonText: "Enter Your Surprise ✨"
  },

  // ---------- Screen 2: Countdown of memories ----------
  memoryCards: [
    { text: "A proud daughter", emoji: "❤️" },
    { text: "A loving sister", emoji: "💕" },
    { text: "A fearless soldier", emoji: "🇮🇳" },
    { text: "An incredible human being", emoji: "✨" },
    { text: "One of the coolest people I know.", emoji: "😎" }
  ],

  // ---------- Screen 3: Proud daughter ----------
  daughterPhoto: "images/kavya-family-hospital.jpg",

  // ---------- Screen 4: Sister section gallery (mini strip) ----------
  sisterStrip: [
    "images/kavya-goat.jpg",
    "images/kavya-flower-crown.jpg",
    "images/kavya-friend-bus.jpg",
    "images/kavya-mood-sister.jpg"
  ],

  // ---------- Screen 5: Lieutenant reveal ----------
  armyPhoto: "images/kavya-uniform.jpg",

  // ---------- Screen 6: Stats report ----------
  stats: [
    { label: "COOLNESS", value: 100 },
    { label: "AMAZINGNESS", value: 100 },
    { label: "SISTER ENERGY", value: 100 },
    { label: "ARMY POWER", value: 100 },
    { label: "CHAOS", value: 101 },
    { label: "AWESOMENESS", value: 999, display: "∞%" }
  ],

  // ---------- Screen 7: Letter ----------
  letter: {
    salutation: "Dear Kavuuu akkaaa,",
    paragraphs: [
      "You have always been someone I look up to.",
      "You've grown into someone strong, independent, brave and incredibly beautiful inside and out.",
      "You've made Mom and Dad proud.",
      "You've been an amazing sister.",
      "And watching you become a Lieutenant honestly makes me unbelievably proud.",
      "No matter how grown up you become, no matter how far life takes you... you'll always be my sister.",
      "And I'll always be cheering for you.",
      "Happy Birthday, Kavuuu akkkaaa❤️.",
      "Keep being ridiculously amazing."
    ],
    signoff: "With lots of love,",
    signature: "Your annoying younger brother ❤️"
  },

  // ---------- Screen 8: Photo memory wall ----------
  gallery: [
    { src: "images/kavya-park-rock.jpg", caption: "Then ❤️" },
    { src: "images/kavya-family-temple.jpg", caption: "Family." },
    { src: "images/kavya-goat.jpg", caption: "Chaos partners." },
    { src: "images/kavya-flower-crown.jpg", caption: "Unforgettable." },
    { src: "images/kavya-friend-bus.jpg", caption: "Always my sister." },
    { src: "images/kavya-yoga-mom.jpg", caption: "That's my girl." },
    { src: "images/kavya-father-tajmahal.jpg", caption: "Wandering hearts." },
    { src: "images/kavya-heart-family.jpg", caption: "Family forever." },
    { src: "images/kavya-mood-sister.jpg", caption: "mood ❤️" },
    { src: "images/kavya-uniform.jpg", caption: "Lieutenant Kavya 🇮🇳" },
    { src: "images/kavya-red-saree.jpg", caption: "Absolutely radiant." },
    { src: "images/kavya-heart-glasses.jpg", caption: "Certified cutie." }
  ],

  // ---------- Screen 9: Final reveal lines ----------
  finalReveal: [
    "Kavuuu akkaaa❤️...",
    "Ready?",
    "HAPPY BIRTHDAY ❤️",
    "27 looks AMAZING on you.",
    "Happy Birthday to one of the strongest, funniest, kindest and coolest people I've ever known.",
    "Keep shining.",
    "Keep leading.",
    "Keep making everyone proud.",
    "And please...",
    "Never stop being YOU."
  ]
};
