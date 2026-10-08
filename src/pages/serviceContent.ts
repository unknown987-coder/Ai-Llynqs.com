// DUMMY CONTENT — replace the text with your real copy. Each key = a /services/<slug> page.
export type ServiceContent = {
  scene: string;
  tagline: string;
  intro: string;
  features: [string, string][];
  goodFor: string[];
};

export const serviceContent: Record<string, ServiceContent> = {
  "ai-chatbots": {
    scene: "chatbot",
    tagline: "A smart assistant that talks to your customers 24/7.",
    intro: "We build chatbots trained on your own business information, so they answer questions, capture leads and hand over to your team when needed.",
    features: [
      ["Trained on your data", "Answers come from your services, prices and policies."],
      ["Lead capture", "Collects names and contacts and sends them to you."],
      ["English & Roman Urdu", "Understands customers the way they actually write."],
      ["Easy website install", "One widget, designed to match your brand."],
    ],
    goodFor: ["Service businesses", "Online stores", "Agencies"],
  },
  "ai-rag": {
    scene: "rag",
    tagline: "AI that answers from your own documents — not guesses.",
    intro: "RAG systems let an AI read your files, PDFs and knowledge base, then answer with information that is specific, current and traceable.",
    features: [
      ["Your documents, searchable", "Upload files and ask questions in plain language."],
      ["Fewer wrong answers", "The AI is grounded in your content."],
      ["Always up to date", "Update a document and the answers update too."],
      ["Private by design", "Your data stays under your control."],
    ],
    goodFor: ["Support teams", "Internal knowledge", "Consultants"],
  },
  "workflow-automation": {
    scene: "automation",
    tagline: "Turn repetitive tasks into systems that run themselves.",
    intro: "We connect your tools and add AI where it helps, so routine work like follow-ups, reports and data entry happens automatically.",
    features: [
      ["Tools connected", "Forms, email, sheets, CRMs and chat working together."],
      ["AI where it helps", "Classify, summarise and decide inside the workflow."],
      ["Fewer manual errors", "Consistent results every single time."],
      ["Monitored & improved", "We watch it run and refine it over time."],
    ],
    goodFor: ["Busy teams", "Operations", "Growing startups"],
  },
  "machine-learning": {
    scene: "ml",
    tagline: "Models that learn from your data and predict what's next.",
    intro: "From prediction to image and text understanding, we design, train and deploy machine learning solutions for real business problems.",
    features: [
      ["Problem first", "We confirm ML is the right tool before building."],
      ["Data preparation", "Cleaning and structuring the data models need."],
      ["Training & testing", "Models measured against clear success metrics."],
      ["Deployment", "Delivered as an API or inside your product."],
    ],
    goodFor: ["Data-rich companies", "Product teams", "Researchers"],
  },
  "web-scraping": {
    scene: "scraping",
    tagline: "Collect the web's data and turn it into clean datasets.",
    intro: "We build reliable scrapers and data pipelines that gather public web data and deliver it in the format you can use.",
    features: [
      ["Structured output", "Delivered as Excel, CSV, JSON or via API."],
      ["Scheduled runs", "Fresh data on the schedule you need."],
      ["Clean & organised", "Duplicates and noise removed."],
      ["Built to last", "Designed to handle site changes gracefully."],
    ],
    goodFor: ["Market research", "E-commerce", "Lead generation"],
  },
  "web-development": {
    scene: "web",
    tagline: "Fast, beautiful websites that turn visitors into enquiries.",
    intro: "Custom-built websites and web apps focused on speed, clarity and conversion — designed around your brand, not a template.",
    features: [
      ["Custom design", "Unique, professional and on-brand."],
      ["Fast & responsive", "Great on every phone, tablet and laptop."],
      ["SEO-ready foundation", "Clean structure search engines understand."],
      ["Built to grow", "Easy to extend as your business grows."],
    ],
    goodFor: ["Businesses", "Startups", "Personal brands"],
  },
  "wordpress-woocommerce": {
    scene: "web",
    tagline: "Flexible WordPress sites and WooCommerce stores you can manage.",
    intro: "We build and customise WordPress websites and WooCommerce shops that are easy for you to update and ready to sell.",
    features: [
      ["Custom themes & plugins", "Tailored to your needs, not bloated."],
      ["WooCommerce setup", "Products, payments and shipping configured."],
      ["Easy to manage", "Update content without a developer."],
      ["Speed & security", "Optimised and hardened from day one."],
    ],
    goodFor: ["Online shops", "Blogs & media", "Small businesses"],
  },
  shopify: {
    scene: "shop",
    tagline: "Shopify stores built to look premium and sell more.",
    intro: "From store setup to theme customisation and conversion improvements, we help you launch and grow on Shopify.",
    features: [
      ["Store setup", "Collections, products and checkout configured."],
      ["Theme customisation", "A look that matches your brand."],
      ["Conversion focus", "Layouts designed to turn browsers into buyers."],
      ["Apps & integrations", "Connect the tools your store needs."],
    ],
    goodFor: ["New stores", "Growing brands", "Dropshippers"],
  },
  seo: {
    scene: "seo",
    tagline: "Get found by the customers already searching for you.",
    intro: "A complete SEO approach covering technical health, content and local visibility to grow steady, measurable traffic.",
    features: [
      ["Technical audit", "Find and fix what holds your site back."],
      ["Keyword strategy", "Target what your customers really search."],
      ["On-page optimisation", "Content and structure search engines reward."],
      ["Clear reporting", "See progress in plain, simple terms."],
    ],
    goodFor: ["Local businesses", "Online stores", "Service providers"],
  },
};

export const processSteps: [string, string][] = [
  ["Discover", "We learn your goals and what success looks like."],
  ["Plan & quote", "A clear scope, timeline and price — no surprises."],
  ["Build", "We build, share progress and refine with you."],
  ["Launch & support", "We go live and keep improving the result."],
];
