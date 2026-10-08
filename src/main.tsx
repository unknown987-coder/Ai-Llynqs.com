import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Contact from "./Contact";
import ComingSoon from "./pages/ComingSoon";
import { findPage } from "./pages/pageData";
import { ServicePage, ServicesOverview } from "./pages/ServicePage";
import { serviceContent } from "./pages/serviceContent";
import { BlogList, BlogPost } from "./pages/Blog";
import { posts } from "./data/posts";
import ChatWidget from "./components/ChatWidget";
import { usePath } from "./router";
import "./index.css";

function Pages() {
  const path = usePath();

  if (path === "/") return <App />;
  if (path === "/contact") return <Contact />;

  if (path === "/services") return <ServicesOverview />;
  if (path.startsWith("/services/") && serviceContent[path.split("/").pop() || ""])
    return <ServicePage path={path} />;

  if (path === "/blog") return <BlogList />;
  if (path.startsWith("/blog/")) {
    const post = posts.find((p) => p.slug === path.slice(6));
    if (post) return <BlogPost post={post} />;
  }

  // every other menu page (Services, Portfolio, each service) → Coming Soon
  return <ComingSoon page={findPage(path)} />;
}

function Root() {
  return (
    <>
      <Pages />
      <ChatWidget />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
