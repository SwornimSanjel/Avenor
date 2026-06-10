/**
 * Outward-facing content for the Avenor marketing site.
 *
 * Public language uses the sales-friendly flow:
 *   Capture → Respond → Qualify → Nurture → Follow Up → Report
 * "Generate" is used only where campaign / content volume is discussed.
 *
 * Tone: premium, confident, business-owner friendly. The site sells the
 * System Audit conversation — it does not teach the full internal model.
 */

export type FlowStep = {
  step: string;
  title: string;
  description: string;
  benefit: string;
};

export const flowSteps: FlowStep[] = [
  {
    step: "01",
    title: "Capture",
    description: "Every inquiry is captured the second it arrives.",
    benefit: "Nothing gets buried in the inbox.",
  },
  {
    step: "02",
    title: "Respond",
    description: "Buyers get a fast, accurate first reply.",
    benefit: "Interest stays warm instead of cooling off.",
  },
  {
    step: "03",
    title: "Qualify",
    description: "Real buyers are identified and scored by intent.",
    benefit: "Your team focuses only on conversations that matter.",
  },
  {
    step: "04",
    title: "Nurture",
    description: "Warm leads stay engaged until they are ready.",
    benefit: "Fewer deals slip away mid-decision.",
  },
  {
    step: "05",
    title: "Follow Up",
    description: "Hot leads are flagged for priority follow-up.",
    benefit: "Your team knows exactly who to call first.",
  },
  {
    step: "06",
    title: "Report",
    description: "Owners see response speed, lead quality, and follow-up status.",
    benefit: "You always know where every opportunity stands.",
  },
];

export type Industry = {
  name: string;
  blurb: string;
};

export const industries: Industry[] = [
  { name: "Education and training", blurb: "Course, fee, and timing questions answered in seconds." },
  { name: "Clinics and appointments", blurb: "Appointment intent captured before patients move on." },
  { name: "Gyms and fitness", blurb: "Membership interest answered while it is still hot." },
  { name: "Showrooms and considered buys", blurb: "Product interest captured the moment it lands." },
  { name: "Real estate and high-ticket", blurb: "Serious buyers identified by budget and timeline." },
  { name: "Local and service businesses", blurb: "Steady inquiry flow that deserves real follow-up." },
];

export const industriesNote =
  "Not sure if your business fits? Book a system audit and we will map your inquiry flow together.";

export type Package = {
  id: string;
  name: string;
  tier: string;
  summary: string;
  whoFor: string;
  depth: string;
  features: string[];
  featured?: boolean;
};

export const packages: Package[] = [
  {
    id: "core",
    name: "Avenor Core",
    tier: "Basic Inquiry System",
    summary: "For businesses that need faster replies and simple inquiry tracking.",
    whoFor: "Teams starting to handle inquiries seriously.",
    depth: "Capture + fast response",
    features: [
      "AI first response on FB & Instagram",
      "FAQ knowledge base",
      "Inquiry capture to CRM",
      "Owner alerts for key inquiries",
      "Monthly performance report",
    ],
  },
  {
    id: "growth",
    name: "Avenor Growth",
    tier: "Main Operating Package",
    summary: "For businesses that want qualification, CRM visibility and follow-up priority.",
    whoFor: "Teams that want qualified conversations, not just replies.",
    depth: "Full Capture → Report system",
    featured: true,
    features: [
      "Everything in Core",
      "Lead qualification & intent scoring",
      "Structured CRM with pipeline view",
      "Priority follow-up alerts",
      "Nurture sequences for warm leads",
      "Campaign support + regular reporting",
    ],
  },
  {
    id: "scale",
    name: "Avenor Scale",
    tier: "Full Growth System",
    summary: "For businesses ready for stronger campaigns, reporting and optimisation.",
    whoFor: "Higher-volume teams optimising reach and follow-up.",
    depth: "Optimised system + active management",
    features: [
      "Everything in Growth",
      "Stronger multi-angle campaigns",
      "Advanced scoring & CRM dashboard",
      "Weekly performance reviews",
      "Monthly strategy call",
      "Priority technical support",
    ],
  },
];

export const packagesNote =
  "Packages are recommended after a system audit, based on your inquiry volume, ad activity, and follow-up process. Sales depend on your offer, pricing, follow-up, and market demand. Avenor strengthens the inquiry system that supports those outcomes.";

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "What does the AI actually do?",
    answer:
      "It gives every inquiry a fast first reply and answers your common questions accurately. It also qualifies the buyer, captures their details, and flags serious prospects for your team, all logged in your CRM.",
  },
  {
    question: "How do you think about sales outcomes?",
    answer:
      "We improve response speed, lead visibility, and follow-up discipline, the part of the process where most businesses leak deals. Your team still owns the conversation and the close.",
  },
  {
    question: "Do we need an ad budget?",
    answer:
      "The system works best with a steady flow of inquiries to handle. If you already get strong organic volume, we can start there. Otherwise campaigns help create consistent volume. Ad spend always goes directly to the platform, separate from our fee.",
  },
  {
    question: "Who owns the lead data?",
    answer:
      "You do, 100%. Your customer data and CRM log stay yours. Avenor uses the data only for reporting and optimisation while we work together.",
  },
  {
    question: "What if the AI isn't sure of an answer?",
    answer:
      "It never guesses. It hands off cleanly to your team with a line like \"Let me get someone to confirm that for you,\" and flags the conversation for a human. The lead is captured instead of lost.",
  },
  {
    question: "We already have staff replying. How does this help?",
    answer:
      "Avenor gives your team a clearer path from inquiry to conversation: instant first replies, an organised inbox, and a priority view of who to call first. Their time goes to the prospects most likely to convert.",
  },
];

export type Founder = {
  name: string;
  role: string;
  focus: string;
  featured?: boolean;
  /** Path to the member's photo in /public. */
  photo: string;
  /** CSS object-position for the photo. Defaults to "center". */
  photoPosition?: string;
  /** Optional LinkedIn URL. Leave undefined to hide the icon until known. */
  linkedin?: string;
};

export const founders: Founder[] = [
  {
    name: "Swornim Sanjel",
    role: "Business Lead",
    focus:
      "Leads growth, delivery, and client success — the link between the team, the work, and the businesses we build for.",
    featured: true,
    photo: "/team/swornim.webp",
    // linkedin: "https://www.linkedin.com/in/…", // TODO: add real URL to show the icon
  },
  {
    name: "Pragyan Maharjan",
    role: "AI & Automation Lead",
    focus: "Builds the engine — the AI, integrations, and logic that make every system run.",
    photo: "/team/pragyan.webp",
    // linkedin: "https://www.linkedin.com/in/…",
  },
  {
    name: "Sushant Sapkota",
    role: "Creative Lead",
    focus: "Shapes how Avenor looks and sounds — turning systems into content that earns attention.",
    photo: "/team/sushant.webp",
    // linkedin: "https://www.linkedin.com/in/…",
  },
];

/** Services grouped into a small set of clear pillars. */
export type ServiceGroup = {
  phase: string;
  title: string;
  blurb: string;
  services: { name: string; why: string }[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    phase: "01",
    title: "Inquiry Capture",
    blurb: "Bring inquiries in and never lose one.",
    services: [
      { name: "Meta campaign support", why: "Turns ad budget into real conversations." },
      { name: "Inquiry capture", why: "Every message saved the moment it lands." },
    ],
  },
  {
    phase: "02",
    title: "Instant Response",
    blurb: "Answer fast, before interest cools.",
    services: [
      { name: "AI first response", why: "Fast, accurate replies on FB & Instagram." },
      { name: "FAQ knowledge base", why: "Consistent answers without staff effort." },
    ],
  },
  {
    phase: "03",
    title: "Lead Qualification",
    blurb: "Separate serious buyers from browsers.",
    services: [
      { name: "Qualification logic", why: "Surfaces real intent automatically." },
      { name: "Intent scoring", why: "Shows your team who to call first." },
    ],
  },
  {
    phase: "04",
    title: "CRM Visibility",
    blurb: "See every lead in one place.",
    services: [
      { name: "Structured CRM", why: "Organised, searchable, and owned by you." },
      { name: "Pipeline view", why: "Status visible to owners and staff." },
    ],
  },
  {
    phase: "05",
    title: "Follow-Up & Reporting",
    blurb: "Prioritise follow-up and prove the result.",
    services: [
      { name: "Priority alerts", why: "Hot leads flagged for fast follow-up." },
      { name: "Owner reporting", why: "Response speed, lead quality, follow-up status." },
    ],
  },
];

/** Expectation-setting line for the footer — honest about what we do and don't promise. */
export const legalNote =
  "Avenor improves inquiry handling, tracking, qualification, and reporting. We do not guarantee sales or revenue.";

/**
 * Real proof — case studies / outcomes.
 *
 * INTENTIONALLY EMPTY. Avenor has no clients yet, so we show nothing here
 * rather than inventing results. When a real, permissioned case study exists,
 * add an entry below and the CaseStudies section will render automatically —
 * no redesign needed. Never add fabricated numbers, logos or testimonials.
 */
export type CaseStudy = {
  client: string;
  sector: string;
  challenge: string;
  whatWeDid: string;
  result: string; // only with the client's permission and real figures
  quote?: { text: string; attribution: string };
};

export const caseStudies: CaseStudy[] = [];
