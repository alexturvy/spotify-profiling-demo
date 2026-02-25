import { Question } from '@/types/survey'

export const questions: Question[] = [
  {
    id: 1,
    construct: 'Perceived Fit',
    text: 'Last week, your Discover Weekly included tracks from Khruangbin, Mdou Moctar, and Sault. How well did that playlist reflect what you actually wanted to hear?',
    context: 'Khruangbin, Mdou Moctar, and Sault',
    scaleLeft: 'Completely off',
    scaleRight: 'Exactly right',
    methodNote:
      'Measures playlist-level perceived accuracy for Discover Weekly — the flagship personalization surface. Grounding in specific artists forces recall of actual experience rather than general impression.',
    framingNote:
      'Naming specific artists anchors the response in episodic memory rather than semantic judgment, reducing recency bias and social desirability effects.',
    experimentNote:
      'Pre/post measurement for algorithm changes to Discover Weekly. Compare perceived fit scores across cohorts exposed to different recommendation models.',
    scaleNote:
      'At scale: 7-point Likert administered weekly to a rotating panel (n=2,000/market), segmented by listening tenure and genre diversity index.',
    latentNote:
      'The respondent thinks they are rating how well Discover Weekly matched their taste. They are actually providing a direct measure of perceived algorithmic accuracy — the surface-level construct. This anchoring question establishes baseline trust before the latent items shift to indirect measurement.',
    tracks: [
      { artist: 'Khruangbin', title: 'A Calf Born in Winter', colors: ['#1a1a2e', '#e94560'] },
      { artist: 'Mdou Moctar', title: 'Afrique Victime', colors: ['#0f3460', '#e8a838'] },
      { artist: 'Sault', title: 'Free', colors: ['#16213e', '#53a653'] },
    ],
  },
  {
    id: 2,
    construct: 'Perceived Fit',
    text: 'Here are the 8 tracks from your Release Radar this Friday. Scrolling through them, how many made you want to press play?',
    context: '8 tracks from your Release Radar',
    scaleLeft: 'None of them',
    scaleRight: 'All of them',
    methodNote:
      'Measures perceived signal quality through engagement intent rather than self-reported accuracy. The behavioral framing ("want to press play") captures approach motivation — a stronger signal than evaluative judgment.',
    framingNote:
      'Shifting from "genuine discoveries versus algorithmic noise" to "made you want to press play" makes the question behavioral rather than evaluative. The respondent rates intent to engage, not a metacognitive assessment of discovery quality.',
    experimentNote:
      'A/B test: vary the ratio of safe picks to stretch picks in Release Radar. Measure whether higher novelty increases engagement intent or decreases it — and whether the perception-behavior gap (intent vs. actual plays) varies by segment.',
    scaleNote:
      'At scale: paired with behavioral play-through data to build a perception-behavior gap metric per user segment. The gap between "wanted to play" and "actually played" is itself a research variable.',
    latentNote:
      'The respondent thinks they are counting how many tracks look appealing. They are actually revealing their signal-to-noise threshold — the point at which algorithmic output feels curated vs. random. High scores indicate the algorithm has crossed the "worth my attention" bar; low scores indicate perceived noise regardless of actual accuracy.',
    tracks: [
      { artist: 'Floating Points', title: 'Del Oro', colors: ['#2d1b69', '#11998e'] },
      { artist: 'Nilüfer Yanya', title: 'Method Actor', colors: ['#1f1c2c', '#928dab'] },
      { artist: 'Arooj Aftab', title: 'Whisper', colors: ['#0c0c1d', '#e07c24'] },
      { artist: 'JPEGMAFIA', title: 'SIN MIEDO', colors: ['#1a1a1a', '#ff4757'] },
      { artist: 'BADBADNOTGOOD', title: 'Open Channels', colors: ['#0d1b2a', '#48bb78'] },
      { artist: 'Hiatus Kaiyote', title: 'Dreamboat', colors: ['#2c003e', '#d4a5a5'] },
      { artist: 'Yves Tumor', title: 'Operator', colors: ['#1b1b2f', '#e23e57'] },
      { artist: 'Tirzah', title: 'Soft Landing', colors: ['#1a1a2e', '#a29bfe'] },
    ],
    hasPlayButton: true,
    scaleRange: [0, 8],
  },
  {
    id: 3,
    construct: 'Algorithmic Transparency',
    text: "Your AI DJ says: 'I've been noticing you're into jazz lately' — but you listened to one jazz album, two weeks ago. How does that land?",
    context: "'I've been noticing you're into jazz lately'",
    scaleLeft: 'Caught in a lie',
    scaleRight: 'Close enough',
    methodNote:
      "Measures credibility tolerance for AI DJ's natural language framing when the explanation is slightly wrong. Tests whether imprecise algorithmic narration erodes or preserves trust.",
    framingNote:
      'The scenario creates a specific credibility test — the AI DJ\'s explanation is demonstrably imprecise (one album, two weeks ago ≠ "into jazz lately"). The response reveals tolerance for approximate algorithmic narration vs. demand for literal accuracy.',
    experimentNote:
      'Test different degrees of explanation accuracy: literally correct ("you played one jazz album") vs. approximately correct ("you\'re into jazz lately") vs. overclaimed ("you\'re a huge jazz fan"). Measure credibility thresholds.',
    scaleNote:
      'At scale: intercept survey triggered after AI DJ transitions, capturing in-moment perception rather than retrospective judgment.',
    latentNote:
      'The respondent thinks they are judging whether the AI DJ got it right. They are actually revealing their tolerance for imprecise algorithmic narration — a core dimension of the transparency construct. "Caught in a lie" signals that even small inaccuracies destroy credibility; "close enough" signals that approximate pattern recognition feels like understanding.',
  },
  {
    id: 4,
    construct: 'Algorithmic Transparency',
    text: "A song you've never heard shows up in your Daily Mix 3. What's your first instinct?",
    context: 'Daily Mix 3',
    scaleLeft: 'Figure out why it\'s there',
    scaleRight: 'Just let it play',
    methodNote:
      'Measures attribution need indirectly — whether the user requires an explanation for unfamiliar recommendations or trusts the system by default. Maps to the transparency construct without asking directly about "understanding."',
    framingNote:
      'The scenario-based framing ("your first instinct") captures automatic orientation rather than deliberate evaluation. This bypasses social desirability — people say they want transparency, but their instinct reveals whether they actually seek it.',
    experimentNote:
      'Test adding brief "because you listened to X" labels to Daily Mix tracks. Measure whether users who instinctively investigate (left-side responders) show greater satisfaction gains from added context than those who let it play.',
    scaleNote:
      'At scale: combined with behavioral data on whether users who score "figure it out" actually navigate to artist pages, read bios, or check related artists more frequently — validating the self-report against behavior.',
    latentNote:
      'The respondent thinks they are describing what they would do when encountering an unfamiliar track. They are actually revealing their attribution need — a core dimension of the transparency construct. "Figure out why" indicates high need for algorithmic legibility; "just let it play" indicates comfort with opacity. Neither is better; both are design-relevant.',
  },
  {
    id: 5,
    construct: 'Emotional Resonance',
    text: 'Think about the last time a Spotify recommendation hit at exactly the right moment — the right song for the right mood. How often does that happen?',
    context: 'the right song for the right mood',
    scaleLeft: 'Almost never',
    scaleRight: 'Regularly',
    methodNote:
      "Measures moment-level resonance frequency — how often personalization creates an affective peak experience rather than just functional accuracy.",
    framingNote:
      "The 'right moment' frame activates emotional memory rather than evaluative judgment. We're measuring felt experience, not rated quality.",
    experimentNote:
      'Correlate with time-of-day listening patterns and context signals. Test whether mood-aware recommendations (time, weather, activity) increase resonance scores.',
    scaleNote:
      'At scale: experience sampling method (ESM) — push notification survey 2x/week triggered after 15+ minute sessions, capturing resonance in-situ.',
    latentNote:
      'The respondent thinks they are estimating how often recommendations feel emotionally right. They are actually calibrating the frequency of affective peak experiences — the emotional ceiling of personalization. This is the most direct item on the resonance construct, measuring felt quality rather than functional accuracy.',
  },
  {
    id: 6,
    construct: 'Emotional Resonance',
    text: "Your Daylist is called 'melancholy indie Tuesday afternoon.' Seeing that name, you already know whether it'll match your mood right now.",
    context: 'melancholy indie Tuesday afternoon',
    scaleLeft: 'Not for me',
    scaleRight: 'Exactly',
    methodNote:
      'Measures anticipatory accuracy — whether naming produces a specific prediction about mood-fit, not just a vague feeling. This is a higher bar than "did it create a feeling" because it requires the respondent to claim predictive confidence.',
    framingNote:
      'Presenting a declarative statement ("you already knew") and asking for agreement is more precise than asking "did the name create a feeling." It forces the respondent to evaluate whether they experience anticipatory certainty — a stronger indicator of contextual framing power.',
    experimentNote:
      'A/B test Daylist naming strategies: purely descriptive ("indie rock mix") vs. evocative ("melancholy indie Tuesday afternoon") vs. abstract ("deep blue hour"). Measure whether anticipatory accuracy (this item) predicts pre-play engagement rates.',
    scaleNote:
      'At scale: conjoint analysis varying name components (mood word × genre × temporal marker) to identify which naming dimensions drive the strongest anticipatory response, segmented by listener type.',
    latentNote:
      'The respondent thinks they are agreeing or disagreeing with a specific claim about Daylist naming. They are actually revealing whether language-based personalization produces anticipatory certainty — the ability to predict mood-fit before listening. This is the latent variable that separates "nice label" from "meaningful personalization signal."',
  },
  {
    id: 7,
    construct: 'Agency & Trust',
    text: 'When you skip a recommendation, how confident are you that Spotify learns the right lesson from that skip?',
    context: 'skip a recommendation',
    scaleLeft: 'Not confident',
    scaleRight: 'Very confident',
    methodNote:
      "Measures feedback loop confidence — whether users believe their behavioral signals are correctly interpreted by the algorithm.",
    framingNote:
      '"The right lesson" acknowledges that a skip is ambiguous (wrong song? wrong moment? wrong mood?) — this ambiguity IS the research question.',
    experimentNote:
      'Test post-skip micro-interactions: "Not feeling this right now" vs. "Not my taste" vs. no prompt. Measure whether disambiguation increases feedback loop confidence.',
    scaleNote:
      'At scale: tracked longitudinally to measure whether confidence changes as users accumulate more listening history (trust calibration over time).',
    latentNote:
      'The respondent thinks they are rating their confidence in Spotify\'s learning system. They are actually revealing their perceived agency in the human-algorithm relationship — whether they feel their signals are heard. Low confidence signals a one-directional relationship (algorithm → user); high confidence signals a collaborative one (user ↔ algorithm).',
  },
  {
    id: 8,
    construct: 'Agency & Trust',
    text: "Spotify just added a song to your library you've never heard. Turns out, you love it. What's your first reaction?",
    context: 'added a song to your library',
    scaleLeft: "That's unsettling",
    scaleRight: 'I love that',
    methodNote:
      'Measures the comfort/discomfort axis for proactive algorithmic action — the emotional response to an algorithm that acts autonomously and gets it right. The concrete scenario replaces the abstract hypothetical, producing more reliable responses.',
    framingNote:
      'The scenario-based framing (something already happened, you already love it) isolates the emotional reaction from accuracy judgment. Left = boundary violation, creepiness. Right = delight, embrace. The poles now capture felt comfort rather than cognitive orientation.',
    experimentNote:
      'Segment users by this response into comfort zones — test whether delight-dominant users adopt new personalization features faster and with higher satisfaction than discomfort-dominant users.',
    scaleNote:
      'At scale: annual tracking item that serves as a macro-indicator of shifting cultural attitudes toward algorithmic agency, segmented by age, market, and listening tenure.',
    latentNote:
      'The respondent thinks they are describing their emotional reaction to a specific scenario. They are actually revealing their comfort threshold for autonomous algorithmic action — the point at which proactive personalization feels like care vs. surveillance. Left = boundary violation ("that\'s unsettling" signals the algorithm overstepped). Right = embrace ("I love that" signals delight in being known). This captures the affective dimension of agency, not just the cognitive one.',
  },
]

export const mockListeningData = [
  { label: 'tracks this month', value: 847 },
  { label: 'unique artists', value: 94 },
  { label: 'Top genre', value: 'Indie Rock' },
  { label: 'Discover Weekly saves', value: 23 },
  { label: 'AI DJ sessions', value: 12 },
  { label: 'Prompted Playlists created', value: 3 },
]
