export type FullSlug = string;

export function getFullSlug(window: Window): FullSlug {
  const res = window.document.body.dataset.slug! as FullSlug;
  return res;
}
