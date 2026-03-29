import { Element, Root } from 'hast';
import { QuartzTransformerPlugin } from '@quartz-community/types';
export { QuartzTransformerPlugin } from '@quartz-community/types';

interface ObsidianFlavoredMarkdownOptions {
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
declare const ObsidianFlavoredMarkdown: QuartzTransformerPlugin<Partial<ObsidianFlavoredMarkdownOptions>>;
declare module "vfile" {
    interface DataMap {
        blocks: Record<string, Element>;
        htmlAst: Root;
        hasMermaidDiagram: boolean | undefined;
    }
}

export { ObsidianFlavoredMarkdown, type ObsidianFlavoredMarkdownOptions };
