import React from "react";
import StoryScene from "../components/StoryScene";
import { Link } from "../router";
import { Shell } from "./ServicePage";
import { sortedPosts, type Post } from "../data/posts";
import "./Blog.css";

const fmt = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

function Card({ p, big }: { p: Post; big?: boolean }) {
  return (
    <Link to={`/blog/${p.slug}`} className={`bl-card ${big ? "bl-big" : ""}`}>
      <div className="bl-art"><StoryScene name={p.scene} /></div>
      <div className="bl-body">
        <div className="bl-meta"><span>{p.category}</span> · {fmt(p.date)} · {p.readTime}</div>
        <h3>{p.title}</h3>
        <p>{p.excerpt}</p>
        <span className="bl-more">Read article →</span>
      </div>
    </Link>
  );
}

export function BlogList() {
  const [first, ...rest] = sortedPosts;
  return (
    <Shell title="Blog">
      <main className="sp-main">
        <section className="sp-head">
          <span className="sp-kick">The aiLLynqs blog</span>
          <h1>Ideas on AI, automation <em>&amp; growth.</em></h1>
          <p className="sp-intro">Practical articles to help your business use technology smarter.</p>
        </section>

        {first ? (
          <>
            <Card p={first} big />
            <div className="bl-grid">{rest.map((p) => <Card key={p.slug} p={p} />)}</div>
          </>
        ) : (
          <p className="sp-intro" style={{ textAlign: "center" }}>New articles are coming soon.</p>
        )}

        <section className="sp-cta">
          <h2>Want results like <em>these?</em></h2>
          <p>Tell us what you're building and we'll reply with a clear plan and quote.</p>
          <Link to="/contact" className="sp-btn sp-solid">Start a Project ↗</Link>
        </section>
      </main>
    </Shell>
  );
}

function renderContent(lines: string[]) {
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) out.push(<ul key={"u" + out.length}>{list.map((l, i) => <li key={i}>{l}</li>)}</ul>);
    list = [];
  };
  lines.forEach((l, i) => {
    if (l.startsWith("- ")) return void list.push(l.slice(2));
    flush();
    if (l.startsWith("## ")) out.push(<h2 key={i}>{l.slice(3)}</h2>);
    else out.push(<p key={i}>{l}</p>);
  });
  flush();
  return out;
}

export function BlogPost({ post }: { post: Post }) {
  const more = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
  return (
    <Shell title={post.title}>
      <main className="sp-main">
        <article className="bl-article">
          <div className="sp-crumb"><Link to="/blog">Blog</Link> / {post.category}</div>
          <h1>{post.title}</h1>
          <div className="bl-meta bl-meta-lg">{fmt(post.date)} · {post.readTime}</div>
          <div className="bl-cover"><StoryScene name={post.scene} /></div>
          <div className="bl-content">{renderContent(post.content)}</div>

          <div className="sp-cta bl-cta">
            <h2>Need help with this?</h2>
            <p>Talk to us — we'll suggest the right approach for your business.</p>
            <Link to="/contact" className="sp-btn sp-solid">Get a Quote ↗</Link>
          </div>
        </article>

        {more.length > 0 && (
          <section className="sp-sec">
            <span className="sp-kick">Keep reading</span>
            <div className="bl-grid">{more.map((p) => <Card key={p.slug} p={p} />)}</div>
          </section>
        )}
      </main>
    </Shell>
  );
}
