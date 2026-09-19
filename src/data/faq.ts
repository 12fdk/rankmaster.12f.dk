// One source for the homepage FAQ, the support page, and the FAQPage JSON-LD
// on both. Answers are ported from ~/Git/12f.dk/content/rankmaster/support.md
// (written 2026-09-16) — the substance is not rewritten here, only the
// internal links are repointed at this site.
//
// `answer` is plain text for the structured data. `html` is what the page
// renders; where they differ it is only markup, never meaning.
export interface FaqItem {
  q: string;
  answer: string;
  html?: string;
  /** Homepage FAQ shows a short set; the support page shows all of them. */
  home?: boolean;
}

export const FAQ: FaqItem[] = [
  {
    q: "How is my score worked out?",
    home: true,
    answer:
      "By how close you were, not by right or wrong. An exact answer takes all ten points, one place off takes eight, two places off takes six, and so on down to zero at five places or more. Being nearly right is worth something, which is the whole idea.",
  },
  {
    q: "Is RankMaster free?",
    home: true,
    answer:
      "Yes. There is no subscription, nothing to buy inside the app, and no advertising. There is nothing to upsell, so there is nothing to interrupt you.",
  },
  {
    q: "Are there ads?",
    home: true,
    answer:
      "No. There are no ads, no interstitials between questions, no lives and no timers. We never touch the advertising identifier, we run no attribution or ad-network software, and nothing is ever sold or shared with data brokers.",
  },
  {
    q: "Do I need an account?",
    home: true,
    answer:
      "Not to play. You are playing within seconds of opening the app. You only need to sign in — with Apple — if you want your scores kept and your name on a leaderboard.",
  },
  {
    q: "Why do I need an account to appear on a leaderboard?",
    home: true,
    answer:
      "Because a leaderboard is a list of people, and without an account there is nobody to list. When you first open RankMaster you get an anonymous session so you can play immediately, but that session belongs to one installation of the app. It cannot be signed back into, and it does not survive a new phone. So rounds played without an account are not sent to the leaderboards at all. Sign in with Apple and they are, from that point on.",
  },
  {
    q: "I signed in with Apple. What happened to my earlier scores?",
    answer:
      "If the anonymous session you were playing under is still active when you sign in, it is upgraded — the same player, now with an account, and your record comes with you. If that Apple Account has already been used with RankMaster on another device, you are signed back into that player instead, and the anonymous one is left behind. That is usually what you want; it is the reason to have an account.",
  },
  {
    q: "Can other people see my name?",
    answer:
      "Yes. Your display name appears on the leaderboards, which is what makes them leaderboards. Nothing else about you is shown — not your email, not your Apple Account, not your country. You are given a generated name like Quiet Meridian when you start, and you can change it at any time under the profile icon, then Change name.",
  },
  {
    q: "How do I change my name?",
    answer:
      "Tap the profile icon at the top right of the home screen, then Change name. It is capped at 32 characters and appears on every board you are on.",
  },
  {
    q: "Why is today's daily challenge already played?",
    answer:
      "The daily is one shared round: the same ten questions for everyone, everywhere, once a day. You get one attempt at it. It resets at midnight UTC.",
  },
  {
    q: "Why did my round end early, or say questions were unavailable?",
    answer:
      "Questions are translated one language at a time, and RankMaster only ever shows you a question that exists in yours. If a category does not have a full round in your language yet, you get a shorter round and the app says so rather than showing you English.",
  },
  {
    q: "Where do the facts come from?",
    home: true,
    answer:
      "Every question cites its source and the year it is from, shown when the answer is revealed. Rankings change, so we tell you which vintage you are playing rather than pretending a number is timeless.",
  },
  {
    q: "What languages is it in?",
    home: true,
    answer:
      "Ten: English, Danish, German, Spanish, French, Italian, Dutch, Norwegian, Portuguese and Swedish. RankMaster follows your iPhone's language. Change it in the iOS Settings app under General, then Language & Region, or per-app under Settings, then RankMaster, then Language.",
  },
  {
    q: "Which iPhones does it run on?",
    home: true,
    answer:
      "Any iPhone running iOS 17.6 or later. The app is 24 MB and is rated 4+.",
  },
  {
    q: "Does RankMaster work offline?",
    answer:
      "You can play, but you need a connection to fetch questions and to save a score. A round finished offline is kept on your device and sent the next time the app has a connection.",
  },
  {
    q: "How do I delete my account and my data?",
    answer:
      "In the app: profile icon, then Delete account. This removes your account, your profile and your leaderboard entries from our server. Deleting the app alone does not do this — it removes what is on the device, but an account that exists on the server stays there until you delete it.",
  },
];

export const HOME_FAQ = FAQ.filter((item) => item.home);

/** FAQPage structured data for a given set of questions. */
export function faqSchema(items: FaqItem[], id: string) {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
