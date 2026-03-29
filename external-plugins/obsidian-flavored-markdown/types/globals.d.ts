declare module "*.scss" {
  const content: string;
  export default content;
}

declare module "*.inline.ts" {
  const content: string;
  export default content;
}

interface CustomEventMap {
  nav: CustomEvent<{ url: string }>;
  prenav: CustomEvent<undefined>;
  themechange: CustomEvent<{ theme: "light" | "dark" }>;
  readermodechange: CustomEvent<{ mode: "on" | "off" }>;
  render: CustomEvent<object>;
}

interface Document {
  addEventListener<K extends keyof CustomEventMap>(
    type: K,
    listener: (this: Document, ev: CustomEventMap[K]) => void,
  ): void;
  removeEventListener<K extends keyof CustomEventMap>(
    type: K,
    listener: (this: Document, ev: CustomEventMap[K]) => void,
  ): void;
  dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K] | UIEvent): void;
}

interface Window {
  addCleanup(fn: (...args: unknown[]) => void): void;
  spaNavigate?(url: URL, isBack: boolean): Promise<void>;
}

declare const fetchData: Promise<Record<string, unknown>>;
