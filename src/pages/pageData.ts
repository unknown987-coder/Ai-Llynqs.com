export type PageInfo = {
  path: string;
  title: string;
  eyebrow: string;
  blurb: string;
};

export type ServiceItem = { path: string; title: string; short: string };
export type ServiceGroup = {
  title: string;
  tag: string;
  icon: string;
  items: ServiceItem[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    title: "AI & LLM Solutions",
    tag: "Intelligence layer",
    icon: "✦",
    items: [
      {
        path: "/services/ai-chatbots",
        title: "Website Chatbots & Custom Model Training",
        short: "Chatbots & Model Training",
      },
      {
        path: "/services/ai-rag",
        title: "AI RAG (Retrieval-Augmented Generation) Models",
        short: "AI RAG Models",
      },
    ],
  },
  {
    title: "Automation & Intelligence",
    tag: "Systems that operate",
    icon: "⌁",
    items: [
      {
        path: "/services/workflow-automation",
        title: "AI Workflow Automation",
        short: "AI Workflow Automation",
      },
      {
        path: "/services/machine-learning",
        title: "Machine Learning & Deep Learning Solutions",
        short: "ML & Deep Learning",
      },
      {
        path: "/services/web-scraping",
        title: "Web Scraping & Data Extraction",
        short: "Web Scraping & Data",
      },
    ],
  },
  {
    title: "Development & E-commerce",
    tag: "Digital products",
    icon: "◈",
    items: [
      {
        path: "/services/web-development",
        title: "Custom Web Development",
        short: "Custom Web Development",
      },
      {
        path: "/services/wordpress-woocommerce",
        title: "WordPress & WooCommerce Development",
        short: "WordPress & WooCommerce",
      },
      {
        path: "/services/shopify",
        title: "Shopify E-commerce Solutions",
        short: "Shopify Solutions",
      },
    ],
  },
  {
    title: "Digital Growth",
    tag: "Visibility & growth",
    icon: "↗",
    items: [
      {
        path: "/services/seo",
        title: "Complete SEO Services",
        short: "Complete SEO Services",
      },
    ],
  },
];

const mainPages: PageInfo[] = [
  {
    path: "/services",
    title: "Services",
    eyebrow: "What we build",
    blurb:
      "A complete overview of our AI, automation and development services is being crafted.",
  },
  {
    path: "/portfolio",
    title: "Portfolio",
    eyebrow: "Selected work",
    blurb:
      "A curated showcase of the systems, agents and websites we've built is on its way.",
  },
];

const servicePages: PageInfo[] = serviceGroups.flatMap((g) =>
  g.items.map((i) => ({
    path: i.path,
    title: i.title,
    eyebrow: `Services · ${g.title}`,
    blurb:
      "We're preparing a detailed page for this service — what we do, how we work and what you can expect.",
  }))
);

export const allPages: PageInfo[] = [...mainPages, ...servicePages];

export function findPage(path: string): PageInfo {
  const hit = allPages.find((p) => p.path === path);
  if (hit) return hit;

  const last = path.split("/").filter(Boolean).pop() ?? "Page";
  const title = last
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    path,
    title,
    eyebrow: "aiLLynqs",
    blurb: "This page is being crafted and will be available shortly.",
  };
}
