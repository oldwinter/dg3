---
title: EncryptedPages
tags:
  - plugin/transformer
  - plugin/filter
image: "#FF1493"
---

Password-protected encrypted pages. Encrypts page content at build time using AES-256-GCM and decrypts client-side with the Web Crypto API. Passwords are set per-page via frontmatter.

> [!example] Live demo
> Try it yourself: [[EncryptedPages Demo]]. The password is `quartz`.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

## Usage

Add a `password` field to any page's frontmatter to encrypt it:

```yaml
---
title: My Secret Page
password: mysecretpassword
---
```

The page content will be encrypted at build time. Visitors must enter the correct password to view the content.

Successful passwords are cached in the browser's session storage and automatically tried on other encrypted pages for convenience.

## Configuration

This plugin provides a transformer, a filter, and a component.

### Transformer options

- `visibility`: How encrypted pages appear in graph, explorer, and backlinks. `"visible"` shows the page normally, `"icon"` adds a lock indicator, `"hidden"` hides the page completely. Defaults to `"icon"`.
- `iterations`: PBKDF2 iteration count for key derivation. Higher values are more secure but slower to unlock. Defaults to `600000`.
- `passwordField`: Frontmatter field name that holds the page password. Defaults to `"password"`.

### Filter options

- `visibility`: Controls whether encrypted pages appear in search, RSS, and sitemap. When set to `"hidden"`, encrypted pages are excluded from content indices entirely. Defaults to `"icon"`.

### Component options

- `className`: CSS class for the component wrapper. Defaults to `"encrypted-page-wrapper"`.

### Default options

```yaml title="quartz.config.yaml"
- source: github:quartz-community/encrypted-pages
  enabled: true
  options:
    visibility: icon
    iterations: 600000
    passwordField: password
```

## Security

- Content is encrypted with AES-256-GCM using PBKDF2 SHA-256 key derivation.
- Plaintext is stripped from search indices and RSS feeds regardless of visibility setting.
- Passwords are set per-page in frontmatter. Avoid committing passwords to public repositories.
- This is client-side encryption of a static site. It protects against casual browsing but not against determined attackers with access to the page source.

## API

- Category: Transformer, Filter
- Function name: `ExternalPlugin.EncryptedPages()`, `ExternalPlugin.EncryptedPageFilter()`.
- Source: [`quartz-community/encrypted-pages`](https://github.com/quartz-community/encrypted-pages)
- Install: `npx quartz plugin add github:quartz-community/encrypted-pages`
