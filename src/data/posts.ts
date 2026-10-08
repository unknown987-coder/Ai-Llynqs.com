/**
 * BLOG POSTS — to publish a new post, copy one block below, paste it at the TOP of the
 * list, change the text, and save. The site updates automatically.
 *
 *  slug     : the web address, lowercase with dashes  → /blog/<slug>
 *  date     : "YYYY-MM-DD"
 *  scene    : picture style: chatbot | automation | scraping | web | shop | seo | rag | ml
 *  content  : each line is a paragraph.  "## Title"  = heading,  "- text"  = bullet point.
 */
export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  scene: string;
  excerpt: string;
  content: string[];
};

// DUMMY POSTS — replace with your own
export const posts: Post[] = [
  {
    slug: "how-ai-chatbots-save-your-team-hours",
    title: "How AI chatbots save your team hours every week",
    date: "2026-10-01",
    category: "AI & Chatbots",
    readTime: "4 min read",
    scene: "chatbot",
    excerpt: "Most customer questions repeat. Here's how a trained chatbot answers them instantly — and frees your team for work that matters.",
    content: [
      "Every business gets the same questions again and again: prices, services, delivery, how to get started. Answering them by hand is slow and expensive.",
      "## Why a trained chatbot is different",
      "A chatbot trained on your own information answers in your voice, using your real details, instead of giving generic replies.",
      "- Answers customers 24/7, even at 2 AM",
      "- Captures leads while your team is offline",
      "- Hands over to a human when it matters",
      "## Where to start",
      "Begin with your top ten questions. Write clear answers, train the bot on them, and improve it weekly using the questions it couldn't answer.",
    ],
  },
  {
    slug: "rag-vs-fine-tuning",
    title: "RAG vs fine-tuning: what your business actually needs",
    date: "2026-09-20",
    category: "AI Explained",
    readTime: "5 min read",
    scene: "rag",
    excerpt: "Two ways to teach AI about your business. One is faster and cheaper to keep up to date. Here's how to choose.",
    content: [
      "When people say 'train an AI on my data', they usually mean one of two very different things.",
      "## RAG: let the AI read your documents",
      "The AI looks up the relevant part of your documents and answers from it. Update a document and the answers update too.",
      "## Fine-tuning: change how the AI behaves",
      "Fine-tuning adjusts the model's style and behaviour. It's useful for tone and format, but it's not the best way to add facts.",
      "## So which one?",
      "For most businesses wanting accurate answers about their own services and policies, RAG is the practical starting point.",
    ],
  },
  {
    slug: "why-your-website-isnt-getting-leads",
    title: "Why your website isn't getting leads (and how to fix it)",
    date: "2026-09-08",
    category: "Web & SEO",
    readTime: "3 min read",
    scene: "seo",
    excerpt: "Traffic without enquiries usually comes down to a few fixable things. Check these first.",
    content: [
      "A good-looking website isn't enough. Visitors need to quickly understand what you do and what to do next.",
      "## Three quick checks",
      "- Is your main offer clear in the first five seconds?",
      "- Is there one obvious button to contact you?",
      "- Does the site load fast on a phone?",
      "Fixing these three often lifts enquiries more than any new design.",
    ],
  },
];

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
