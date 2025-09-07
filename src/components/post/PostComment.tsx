"use client";

export default function PostComment() {
  return (
    <section
      className="[&>.utterances]:max-w-full"
      ref={(element) => {
        if (!element) {
          return;
        }

        const scriptElement = document.createElement("script");
        scriptElement.async = true;
        scriptElement.setAttribute("src", "https://utteranc.es/client.js");
        scriptElement.setAttribute("repo", "koty08/next13-study");
        scriptElement.setAttribute("issue-term", "pathname");
        scriptElement.setAttribute("theme", "github-light");
        scriptElement.setAttribute("crossorigin", "anonymous");
        element.replaceChildren(scriptElement);
      }}
    />
  );
}
