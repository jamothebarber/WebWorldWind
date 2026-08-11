// Single source of truth for site copy. See /BRAND.md for rationale.
// Sections must pull copy from here rather than inventing their own —
// this is what keeps voice/tone consistent across a site built by many
// independent passes. Anything marked `placeholder: true` is draft content
// standing in for real client/business data and must stay visually flagged
// (e.g. small "illustrative example" caption) until replaced.

export const brand = {
  name: "Handled",
  nameSuffix: "AI",
  domain: "gethandled.ai",
  tagline: "Every call answered. Every lead followed up. Automatically.",
};

export const nav = {
  links: [
    { label: "Product", href: "#voice-demo" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Book a consultation", href: "#book" },
};

export const hero = {
  eyebrow: "AI Voice Agents · Built on GoHighLevel",
  headline: "Every call answered.\nEvery lead followed up.\nAutomatically.",
  subhead:
    "Handled builds the AI voice agent and automation system that picks up, qualifies, books, and follows up — so no lead ever waits on you again.",
  primaryCta: { label: "Book a free consultation", href: "#book" },
  secondaryCta: { label: "Hear the AI take a call", href: "#voice-demo" },
  microproof: "Live on your business number in days, not months.",
};

export const socialProof = {
  eyebrow: "Trusted by service businesses who used to miss calls",
  stats: [
    { value: "3.2M+", label: "calls answered by AI agents we've built" },
    { value: "41%", label: "average lift in booked appointments" },
    { value: "<1s", label: "average time to answer, day or night" },
    { value: "24/7", label: "coverage, no shift schedule required" },
  ],
  placeholder: true,
};

export const problem = {
  eyebrow: "The cost of a slow front desk",
  headline: "Your best lead called at 9:47pm.\nNobody picked up.",
  body: "Most buyers go with whoever answers first — and most small businesses can't staff a phone 24/7. Every missed call is a lead your competitor is about to close. Voicemail doesn't book appointments. A callback tomorrow is a callback too late.",
  points: [
    {
      stat: "78%",
      label: "of customers buy from the business that responds first",
      placeholder: true,
    },
    {
      stat: "62%",
      label: "of inbound calls to small businesses go unanswered",
      placeholder: true,
    },
    {
      stat: "5 min",
      label: "is roughly how long you have before a lead moves on",
      placeholder: true,
    },
  ],
};

export const voiceDemo = {
  eyebrow: "Not a script. A conversation.",
  headline: "Press play. This is the AI, live.",
  body: "Every Handled voice agent is trained on your services, your pricing, and your calendar — then tested against real call scenarios before it ever touches your number.",
  sampleTranscript: [
    { speaker: "caller", text: "Hey, do you guys have anything open this week for an AC repair?" },
    { speaker: "agent", text: "I can help with that. Is this for your home or a business?" },
    { speaker: "caller", text: "Home. It's been blowing warm air since yesterday." },
    { speaker: "agent", text: "Got it — I have a tech available Thursday at 2pm or Friday at 10am. Which works better?" },
    { speaker: "caller", text: "Thursday at 2 is perfect." },
    { speaker: "agent", text: "You're booked for Thursday at 2pm. I've sent a confirmation text — anything else I can help with?" },
  ],
  placeholder: true,
  embedNote:
    "GHL Voice AI widget embeds here once the real snippet is provided.",
};

export const howItWorks = {
  eyebrow: "How it works",
  headline: "Live in days. Not a six-month rollout.",
  steps: [
    {
      index: "01",
      title: "Audit",
      body: "We map every call, lead, and follow-up gap in your current pipeline — where leads actually go cold.",
    },
    {
      index: "02",
      title: "Build",
      body: "Your AI voice agent, workflows, and pipelines get built directly on your GoHighLevel subaccount.",
    },
    {
      index: "03",
      title: "Launch",
      body: "Live on your real business number in days, tested against real call scenarios before go-live.",
    },
    {
      index: "04",
      title: "Optimize",
      body: "We tune scripts and automations against real conversion data — this keeps improving after launch.",
    },
  ],
};

export const capabilities = {
  eyebrow: "Capabilities",
  headline: "One system. Every part of your front office.",
  body: "Everything below runs on your GoHighLevel subaccount — no separate logins, no duct-taped tools.",
  items: [
    {
      title: "AI Voice Receptionist",
      body: "Answers inbound calls, qualifies the lead, and books directly into your calendar — 24/7.",
      icon: "phone-call",
    },
    {
      title: "Missed-Call Text-Back",
      body: "Any call that slips through gets an instant text so the lead never goes cold.",
      icon: "message-square-text",
    },
    {
      title: "CRM & Pipelines",
      body: "Every lead lands in a pipeline built around how your business actually sells.",
      icon: "kanban-square",
    },
    {
      title: "Workflow Automation",
      body: "Nurture sequences, reactivation campaigns, and internal alerts that run without you.",
      icon: "workflow",
    },
    {
      title: "Calendar & Booking",
      body: "Appointments book themselves, synced to the calendars your team already uses.",
      icon: "calendar-check-2",
    },
    {
      title: "Reputation Management",
      body: "Automated review requests and response workflows that keep your rating climbing.",
      icon: "star",
    },
    {
      title: "Funnels & Websites",
      body: "Conversion-focused pages built to turn traffic into booked calls.",
      icon: "layout-panel-left",
    },
    {
      title: "Email & SMS Campaigns",
      body: "Follow-up sequences that keep you top of mind until a lead is ready to buy.",
      icon: "send",
    },
  ],
};

export const results = {
  eyebrow: "Results",
  headline: "Illustrative outcomes — swap for your real case studies.",
  placeholder: true,
  cases: [
    {
      industry: "HVAC & Home Services",
      problem: "Missing ~40% of after-hours calls during peak season.",
      build: "AI voice receptionist + missed-call text-back + booking automation.",
      outcome: "+34% booked jobs in 60 days",
      placeholder: true,
    },
    {
      industry: "Dental Practice",
      problem: "Front desk overwhelmed, new-patient calls going to voicemail.",
      build: "AI receptionist for overflow calls + automated recall workflows.",
      outcome: "+27% new patient bookings",
      placeholder: true,
    },
    {
      industry: "Law Firm (Intake)",
      problem: "Intake speed-to-lead averaging 6+ hours.",
      build: "Voice AI intake qualification + instant pipeline routing.",
      outcome: "Speed-to-lead cut to under 60 seconds",
      placeholder: true,
    },
  ],
};

export const pricing = {
  eyebrow: "Pricing",
  headline: "Sales-assisted, not self-serve — every build starts with a consultation.",
  tiers: [
    {
      name: "Starter",
      tagline: "Launch your AI receptionist",
      features: [
        "1 AI voice agent, trained on your services",
        "Missed-call text-back",
        "Calendar booking automation",
        "Go-live in under 2 weeks",
      ],
      cta: "Book a consultation",
      highlighted: false,
    },
    {
      name: "Growth",
      tagline: "Full front-office automation",
      features: [
        "Everything in Starter",
        "CRM pipelines built to your sales process",
        "Nurture & reactivation workflows",
        "Reputation management automation",
        "Monthly optimization review",
      ],
      cta: "Book a consultation",
      highlighted: true,
    },
    {
      name: "Scale",
      tagline: "Multi-location or custom",
      features: [
        "Everything in Growth",
        "Multi-location / multi-agent setup",
        "Custom workflow & integration builds",
        "Dedicated ongoing optimization",
      ],
      cta: "Talk to us",
      highlighted: false,
    },
  ],
};

export const testimonials = {
  eyebrow: "What it's like to work with us",
  placeholder: true,
  quotes: [
    {
      quote:
        "We stopped losing after-hours calls to competitors within the first week. It books appointments better than some of my front desk staff did.",
      name: "Illustrative example",
      role: "Owner, Home Services Business",
      placeholder: true,
    },
    {
      quote:
        "It doesn't feel like a phone tree. Patients don't realize they're not talking to a person until we tell them.",
      name: "Illustrative example",
      role: "Practice Manager, Dental Clinic",
      placeholder: true,
    },
    {
      quote:
        "Our intake speed-to-lead went from hours to seconds. That alone changed our close rate.",
      name: "Illustrative example",
      role: "Managing Partner, Law Firm",
      placeholder: true,
    },
  ],
};

export const faq = {
  eyebrow: "FAQ",
  headline: "Before you ask",
  items: [
    {
      q: "Does this replace my front desk staff?",
      a: "Not usually — most clients use it to cover after-hours, overflow, and the calls that would otherwise hit voicemail. Your team stays in control; the AI just makes sure nothing falls through.",
    },
    {
      q: "What happens to calls the AI can't handle?",
      a: "It escalates — warm-transferring to a real person or flagging the conversation for immediate follow-up, based on rules we set together during the build.",
    },
    {
      q: "Do I need to already use GoHighLevel?",
      a: "No. If you're already on GHL, we build inside your existing subaccount. If not, we can set one up as part of the engagement.",
    },
    {
      q: "How fast can this go live?",
      a: "Most Starter builds go live in under two weeks. Larger, multi-location builds take longer depending on scope.",
    },
    {
      q: "Does the AI sound robotic?",
      a: "No — that's the whole point. We tune tone, pacing, and responses against real call scenarios before launch, not a generic script.",
    },
    {
      q: "What does it cost?",
      a: "It depends on scope — number of agents, workflows, and integrations. Pricing is set during your free consultation once we understand what you need.",
    },
  ],
};

export const finalCta = {
  eyebrow: "Get started",
  headline: "See it answer your first call this week.",
  body: "Book a free consultation — we'll map your current call and lead flow, then show you exactly what a Handled build would look like for your business.",
  formNote: "GHL lead-capture form embeds here once the real snippet is provided.",
  calendarNote: "GHL calendar embeds here once the real snippet is provided.",
};

export const footer = {
  columns: [
    {
      title: "Capabilities",
      links: [
        "AI Voice Receptionist",
        "Missed-Call Text-Back",
        "CRM & Pipelines",
        "Workflow Automation",
        "Reputation Management",
      ],
    },
    {
      title: "Company",
      links: ["How it works", "Pricing", "FAQ", "Book a consultation"],
    },
  ],
  legal: `© ${new Date().getFullYear()} Handled AI. All rights reserved.`,
};
