import type {
  Root,
  Html,
  BlockContent,
  PhrasingContent,
  DefinitionContent,
  Paragraph,
  Code,
  Parent,
  Literal,
  Image,
  Link,
} from "mdast";
import type { Node } from "unist";
import type { Element, Root as HtmlRoot } from "hast";
import type { PluggableList } from "unified";
import type { QuartzTransformerPlugin, JSResource, CSSResource } from "@quartz-community/types";
import path from "path";
import remarkObsidian from "@quartz-community/remark-obsidian";
import rehypeObsidian from "@quartz-community/rehype-obsidian";
import rehypeRaw from "rehype-raw";
import { SKIP, visit } from "unist-util-visit";
import {
  pathToRoot,
  slugTag,
  slugifyFilePath,
  capitalize,
} from "@quartz-community/utils";
import type { FilePath, FullSlug } from "@quartz-community/utils";
// @ts-expect-error -- inline script import
import calloutScript from "./scripts/callout.inline";
// @ts-expect-error -- inline script import
import checkboxScript from "./scripts/checkbox.inline";
// @ts-expect-error -- inline script import
import mermaidScript from "./scripts/mermaid.inline";
import mermaidStyle from "./styles/mermaid.inline.scss";
import { toHast } from "mdast-util-to-hast";
import { toHtml } from "hast-util-to-html";

export interface ObsidianFlavoredMarkdownOptions {
  comments: boolean;
  highlight: boolean;
  wikilinks: boolean;
  callouts: boolean;
  mermaid: boolean;
  parseTags: boolean;
  parseBlockReferences: boolean;
  enableInHtmlEmbed: boolean;
  enableYouTubeEmbed: boolean;
  enableTweetEmbed: boolean;
  enableVideoEmbed: boolean;
  enableCheckbox: boolean;
  enableObsidianUri: boolean;
  disableBrokenWikilinks: boolean;
}

const defaultOptions: ObsidianFlavoredMarkdownOptions = {
  comments: true,
  highlight: true,
  wikilinks: true,
  callouts: true,
  mermaid: true,
  parseTags: true,
  parseBlockReferences: true,
  enableInHtmlEmbed: false,
  enableYouTubeEmbed: true,
  enableTweetEmbed: true,
  enableVideoEmbed: true,
  enableCheckbox: false,
  enableObsidianUri: true,
  disableBrokenWikilinks: false,
};

const calloutMapping = {
  note: "note",
  abstract: "abstract",
  summary: "abstract",
  tldr: "abstract",
  info: "info",
  todo: "todo",
  tip: "tip",
  hint: "tip",
  important: "tip",
  success: "success",
  check: "success",
  done: "success",
  question: "question",
  help: "question",
  faq: "question",
  warning: "warning",
  attention: "warning",
  caution: "warning",
  failure: "failure",
  missing: "failure",
  fail: "failure",
  danger: "danger",
  error: "danger",
  bug: "bug",
  example: "example",
  quote: "quote",
  cite: "quote",
} as const;

function canonicalizeCallout(calloutName: string): keyof typeof calloutMapping {
  const normalizedCallout = calloutName.toLowerCase() as keyof typeof calloutMapping;
  // if callout is not recognized, make it a custom one
  return calloutMapping[normalizedCallout] ?? calloutName;
}

export const externalLinkRegex = /^https?:\/\//i;

// !?                 -> optional embedding
// \[\[               -> open brace
// ([^\[\]\|\#]+)     -> one or more non-special characters ([,],|, or #) (name)
// (#[^\[\]\|\#]+)?   -> # then one or more non-special characters (heading link)
// (\\?\|[^\[\]\#]+)? -> optional escape \ then | then zero or more non-special characters (alias)
// Deprecated: retained for backwards compatibility only; parsing now uses remark-obsidian.
export const wikilinkRegex = new RegExp(
  /!?\[\[([^[]\]#|\\]+)?(#+[^[]\]#|\\]+)?(\\?\|[^[]\]#]*)?\]\]/g,
);
// from https://github.com/escwxyz/remark-obsidian-callout/blob/main/src/index.ts
const calloutRegex = new RegExp(/^\[!([\w-]+)\|?(.+?)?\]([+-]?)/);
const calloutLineRegex = new RegExp(/^> *\[!\w+\|?.*?\][+-]?.*$/gm);
// (?<=^| )             -> a lookbehind assertion, tag should start be separated by a space or be the start of the line
// #(...)               -> capturing group, tag itself must start with #
// (?:[-_\p{L}\d\p{Z}])+       -> non-capturing group, non-empty string of (Unicode-aware) alpha-numeric characters and symbols, hyphens and/or underscores
// (?:\/[-_\p{L}\d\p{Z}]+)*)   -> non-capturing group, matches an arbitrary number of tag strings separated by "/"
const videoExtensionRegex = new RegExp(/\.(mp4|webm|ogg|avi|mov|flv|wmv|mkv|mpg|mpeg|3gp|m4v)$/);
const wikilinkImageEmbedRegex = new RegExp(
  /^(?<alt>(?!^\d*x?\d*$).*?)?(\|?\s*?(?<width>\d+)(x(?<height>\d+))?)?$/,
);

type WikilinkNode = Node & {
  type: "wikilink";
  path?: string;
  heading?: string;
  alias?: string;
  embedded?: boolean;
};

type HighlightNode = Parent & {
  type: "highlight";
};

type TagNode = Literal & {
  type: "tag";
  value: string;
};

function isResolvableWikilink(fp: string, allSlugs: FullSlug[] | undefined): boolean {
  if (!allSlugs || allSlugs.length === 0) return false;

  const targetCanonical = slugifyFilePath(fp as FilePath);

  if (allSlugs.includes(targetCanonical as FullSlug)) {
    return true;
  }

  const targetFileName = targetCanonical.split("/").filter(Boolean).at(-1);
  if (!targetFileName) return false;

  const matchingFileNames = allSlugs.filter((slug) => slug.split("/").at(-1) === targetFileName);
  return matchingFileNames.length === 1;
}

const getLiteralValue = (child: Node): string => {
  const literalChild = child as { value?: unknown };
  if (typeof literalChild.value === "string") {
    return literalChild.value;
  }
  return "";
};

export const ObsidianFlavoredMarkdown: QuartzTransformerPlugin<
  Partial<ObsidianFlavoredMarkdownOptions>
> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts };

  const mdastToHtml = (ast: PhrasingContent | Paragraph) => {
    const hast = toHast(ast, { allowDangerousHtml: true })!;
    return toHtml(hast, { allowDangerousHtml: true });
  };

  return {
    name: "ObsidianFlavoredMarkdown",
    textTransform(_ctx, src) {
      // pre-transform blockquotes
      if (opts.callouts) {
        src = src.replace(calloutLineRegex, (value) => {
          // force newline after title of callout
          return value + "\n> ";
        });
      }

      return src;
    },
    markdownPlugins(ctx) {
      const plugins: PluggableList = [];

      plugins.push([
        remarkObsidian,
        {
          wikilinks: opts.wikilinks,
          highlights: opts.highlight,
          comments: opts.comments,
          tags: opts.parseTags,
          customTaskChars: opts.enableCheckbox,
        },
      ]);

      plugins.push(() => {
        return (tree: Root, file) => {
          const base = pathToRoot(file.data.slug! as FullSlug);

          if (opts.wikilinks) {
            visit(
              tree,
              (node) => node.type === "wikilink",
              (node, index: number | undefined, parent: Parent | undefined) => {
                if (parent == null || index == null) return;
                const wikilinkNode = node as WikilinkNode;

                const fp = wikilinkNode.path?.trim() ?? "";
                const anchor = wikilinkNode.heading?.trim() ?? "";
                const aliasRaw = wikilinkNode.alias?.trim() ?? "";
                const alias = aliasRaw.length > 0 ? aliasRaw : undefined;

                let replacement: BlockContent | PhrasingContent | Html;

                if (wikilinkNode.embedded) {
                  const ext: string = path.extname(fp).toLowerCase();
                  const url = slugifyFilePath(fp as FilePath);
                  if ([".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp"].includes(ext)) {
                    const match = wikilinkImageEmbedRegex.exec(alias ?? "");
                    const alt = match?.groups?.alt ?? "";
                    const width = match?.groups?.width ?? "auto";
                    const height = match?.groups?.height ?? "auto";
                    const imageNode: Image = {
                      type: "image",
                      url,
                      alt: "",
                      data: {
                        hProperties: {
                          width,
                          height,
                          alt,
                        },
                      },
                    };
                    replacement = imageNode;
                  } else if (ext === ".svg") {
                    const match = wikilinkImageEmbedRegex.exec(alias ?? "");
                    const alt = match?.groups?.alt ?? "";
                    const width = match?.groups?.width ?? "auto";
                    const height = match?.groups?.height ?? "auto";
                    replacement = {
                      type: "html",
                      value: `<object data="${url}" type="image/svg+xml" width="${width}" height="${height}" aria-label="${alt}"></object>`,
                    };
                  } else if ([".mp4", ".webm", ".ogv", ".mov", ".mkv"].includes(ext)) {
                    replacement = {
                      type: "html",
                      value: `<video src="${url}" controls></video>`,
                    };
                  } else if (
                    [".mp3", ".webm", ".wav", ".m4a", ".ogg", ".3gp", ".flac"].includes(ext)
                  ) {
                    replacement = {
                      type: "html",
                      value: `<audio src="${url}" controls></audio>`,
                    };
                  } else if ([".pdf"].includes(ext)) {
                    replacement = {
                      type: "html",
                      value: `<iframe src="${url}" class="pdf"></iframe>`,
                    };
                  } else {
                    // For page transclusions (e.g. ![[file.canvas]]), strip the file extension
                    // so the embed URL targets the virtual page slug (which has no extension)
                    // rather than the raw source file path.
                    const transcludeUrl = slugifyFilePath(fp as FilePath, true);
                    const block = anchor ? `#${anchor}` : "";
                    replacement = {
                      type: "html",
                      data: { hProperties: { transclude: true } },
                      value: `<blockquote class="transclude" data-url="${transcludeUrl}" data-block="${block}" data-embed-alias="${alias ?? ""}"><a href="${
                        transcludeUrl + block
                      }" class="transclude-inner">Transclude of ${transcludeUrl}${block}</a></blockquote>`,
                    };
                  }
                } else if (fp.match(externalLinkRegex)) {
                  const linkNode: Link = {
                    type: "link",
                    url: fp,
                    children: [{ type: "text", value: alias ?? fp }],
                  };
                  replacement = linkNode;
                } else if (opts.disableBrokenWikilinks) {
                  const exists = isResolvableWikilink(fp, ctx.allSlugs as FullSlug[] | undefined);
                  if (!exists) {
                    replacement = {
                      type: "html",
                      value: `<a class="internal broken">${alias ?? fp}</a>`,
                    };
                  } else {
                    const anchorPart = anchor ? `#${anchor}` : "";
                    const linkNode: Link = {
                      type: "link",
                      url: fp + anchorPart,
                      children: [{ type: "text", value: alias ?? fp }],
                    };
                    replacement = linkNode;
                  }
                } else {
                  const anchorPart = anchor ? `#${anchor}` : "";
                  const linkNode: Link = {
                    type: "link",
                    url: fp + anchorPart,
                    children: [{ type: "text", value: alias ?? fp }],
                  };
                  replacement = linkNode;
                }

                parent.children[index] = replacement;
                return SKIP;
              },
            );
          }

          if (opts.highlight) {
            visit(
              tree,
              (node) => node.type === "highlight",
              (node, index: number | undefined, parent: Parent | undefined) => {
                if (parent == null || index == null) return;
                const highlightNode = node as HighlightNode;
                const text = highlightNode.children?.map(getLiteralValue).join("") ?? "";
                parent.children[index] = {
                  type: "html",
                  value: `<span class="text-highlight">${text}</span>`,
                };
                return SKIP;
              },
            );
          }

          if (opts.parseTags) {
            visit(
              tree,
              (node) => node.type === "tag",
              (node, index: number | undefined, parent: Parent | undefined) => {
                if (parent == null || index == null) return;
                const tagNode = node as TagNode;
                if (/^[/\d]+$/.test(tagNode.value ?? "")) {
                  parent.children[index] = {
                    type: "text",
                    value: `#${tagNode.value ?? ""}`,
                  };
                  return SKIP;
                }

                const tag = slugTag(tagNode.value);
                if (file.data.frontmatter) {
                  const frontmatter = file.data.frontmatter as { tags?: string[] };
                  const noteTags = frontmatter.tags ?? [];
                  frontmatter.tags = [...new Set([...noteTags, tag])];
                }

                const tagLink: Link = {
                  type: "link",
                  url: base + `/tags/${tag}`,
                  data: {
                    hProperties: {
                      className: ["tag-link"],
                    },
                  },
                  children: [{ type: "text", value: tag }],
                };
                parent.children[index] = tagLink;
                return SKIP;
              },
            );
          }

          if (opts.enableInHtmlEmbed) {
            visit(tree, "html", (node: Html) => {
              if (opts.wikilinks) {
                node.value = node.value.replace(
                  wikilinkRegex,
                  (fullMatch, rawFp?: string, rawHeading?: string, rawAlias?: string) => {
                    const fp = rawFp?.trim() ?? "";
                    const anchor = rawHeading?.trim().replace(/^#+/, "") ?? "";
                    const isEmbed = fullMatch.startsWith("!");
                    let alias = rawAlias?.replace(/^\\\||\|/, "").trim() ?? "";
                    if (alias.length === 0) alias = fp;

                    if (isEmbed) {
                      return fullMatch;
                    }

                    const anchorPart = anchor ? `#${anchor}` : "";
                    if (fp.match(externalLinkRegex)) {
                      return `<a href="${fp}">${alias}</a>`;
                    }
                    return `<a href="${fp}${anchorPart}">${alias}</a>`;
                  },
                );
              }

              if (opts.highlight) {
                node.value = node.value.replace(
                  /==((?!=).+?)==/g,
                  `<span class="text-highlight">$1</span>`,
                );
              }

              if (opts.parseTags) {
                node.value = node.value.replace(
                  /(?<=^|\s)#((?:[-_\p{L}\d])+(?:\/[-_\p{L}\d]+)*)/gu,
                  (_match, tag: string) => {
                    if (/^[\d/]+$/.test(tag)) return `#${tag}`;
                    const slug = slugTag(tag);
                    return `<a href="${base}/tags/${slug}" class="tag-link">${slug}</a>`;
                  },
                );
              }
            });
          }
        };
      });

      if (opts.enableVideoEmbed) {
        plugins.push(() => {
          return (tree: Root, _file) => {
            visit(tree, "image", (node, index, parent) => {
              if (parent && index !== undefined && videoExtensionRegex.test(node.url)) {
                const newNode: Html = {
                  type: "html",
                  value: `<video controls src="${node.url}"></video>`,
                };

                parent.children.splice(index, 1, newNode);
                return SKIP;
              }
            });
          };
        });
      }

      if (opts.callouts) {
        plugins.push(() => {
          return (tree: Root, _file) => {
            visit(tree, "blockquote", (node) => {
              if (node.children.length === 0) {
                return;
              }

              // find first line and callout content
              const [firstChild, ...calloutContent] = node.children;
              if (!firstChild || firstChild.type !== "paragraph") {
                return;
              }
              const firstText = firstChild.children[0];
              if (firstText?.type !== "text") {
                return;
              }

              const text = firstText.value;
              const restOfTitle = firstChild.children.slice(1);
              const [firstLine, ...remainingLines] = text.split("\n") as [string, ...string[]];
              const remainingText = remainingLines.join("\n");

              const match = firstLine.match(calloutRegex);
              if (match && match.input) {
                const [calloutDirective, typeString, calloutMetaData, collapseChar] = match;
                const typeStringValue = typeString ?? "";
                const calloutType = canonicalizeCallout(typeStringValue.toLowerCase());
                const collapse = collapseChar === "+" || collapseChar === "-";
                const defaultState = collapseChar === "-" ? "collapsed" : "expanded";
                const titleContent = match.input.slice(calloutDirective.length).trim();
                const useDefaultTitle = titleContent === "" && restOfTitle.length === 0;
                const titleNode: Paragraph = {
                  type: "paragraph",
                  children: [
                    {
                      type: "text",
                      value: useDefaultTitle
                        ? capitalize(typeStringValue).replace(/-/g, " ")
                        : titleContent + " ",
                    },
                    ...restOfTitle,
                  ],
                };
                const title = mdastToHtml(titleNode);

                const toggleIcon = `<div class="fold-callout-icon"></div>`;

                const titleHtml: Html = {
                  type: "html",
                  value: `<div
                  class="callout-title"
                >
                  <div class="callout-icon"></div>
                  <div class="callout-title-inner">${title}</div>
                  ${collapse ? toggleIcon : ""}
                </div>`,
                };

                const blockquoteContent: (BlockContent | DefinitionContent)[] = [titleHtml];
                if (remainingText.length > 0) {
                  blockquoteContent.push({
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        value: remainingText,
                      },
                    ],
                  });
                }

                // For the rest of the MD callout elements other than the title, wrap them with
                // two nested HTML <div>s (use some hacked mdhast component to achieve this) of
                // class `callout-content` and `callout-content-inner` respectively for
                // grid-based collapsible animation.
                if (calloutContent.length > 0) {
                  node.children = [
                    node.children[0]!,
                    {
                      data: { hProperties: { className: ["callout-content"] }, hName: "div" },
                      type: "blockquote",
                      children: [...calloutContent],
                    },
                  ];
                }

                // replace first line of blockquote with title and rest of the paragraph text
                node.children.splice(0, 1, ...blockquoteContent);

                const classNames = ["callout", calloutType];
                if (collapse) {
                  classNames.push("is-collapsible");
                }
                if (defaultState === "collapsed") {
                  classNames.push("is-collapsed");
                }

                // add properties to base blockquote
                node.data = {
                  hProperties: {
                    ...(node.data?.hProperties ?? {}),
                    className: classNames.join(" "),
                    "data-callout": calloutType,
                    "data-callout-fold": collapse,
                    "data-callout-metadata": calloutMetaData,
                  },
                };
              }
            });
          };
        });
      }

      if (opts.mermaid) {
        plugins.push(() => {
          return (tree: Root, file) => {
            visit(tree, "code", (node: Code) => {
              if (node.lang === "mermaid") {
                file.data.hasMermaidDiagram = true;
                node.data = {
                  hProperties: {
                    className: ["mermaid"],
                    "data-clipboard": JSON.stringify(node.value),
                  },
                };
              }
            });
          };
        });
      }

      return plugins;
    },
    htmlPlugins() {
      const plugins: PluggableList = [rehypeRaw];

      plugins.push([
        rehypeObsidian,
        {
          blockReferences: opts.parseBlockReferences,
          youTubeEmbed: opts.enableYouTubeEmbed,
          tweetEmbed: opts.enableTweetEmbed,
          checkbox: opts.enableCheckbox,
          mermaid: opts.mermaid,
          obsidianUri: opts.enableObsidianUri,
        },
      ]);

      return plugins;
    },
    externalResources() {
      const js: JSResource[] = [];
      const css: CSSResource[] = [];

      if (opts.enableCheckbox) {
        js.push({
          script: checkboxScript,
          loadTime: "afterDOMReady",
          contentType: "inline",
        });
      }

      if (opts.callouts) {
        js.push({
          script: calloutScript,
          loadTime: "afterDOMReady",
          contentType: "inline",
        });
      }

      if (opts.mermaid) {
        js.push({
          script: mermaidScript,
          loadTime: "afterDOMReady",
          contentType: "inline",
          moduleType: "module",
        });

        css.push({
          content: mermaidStyle,
          inline: true,
        });
      }

      return { js, css };
    },
  };
};

declare module "vfile" {
  interface DataMap {
    blocks: Record<string, Element>;
    htmlAst: HtmlRoot;
    hasMermaidDiagram: boolean | undefined;
  }
}
