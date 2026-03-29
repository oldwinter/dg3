---
title: Encrypted Pages Demo
password: quartz
tags:
  - plugin/transformer
image:
---

Congratulations! You've successfully decrypted this page. 🎉

This is a live demo of the [[EncryptedPages]] plugin. The content you're reading was encrypted at build time using AES-256-GCM and decrypted in your browser using the Web Crypto API.

## What just happened?

1. At build time, the plugin read the `password` field from this page's frontmatter and encrypted all content below the title.
2. When you visited this page, you were shown a password prompt instead of the page content.
3. After entering the correct password, the plugin derived an encryption key using PBKDF2 and decrypted the content client-side.
4. A `render` event was dispatched so other components (graph, explorer, etc.) could re-initialize with the decrypted content.

## Password caching

Your password has been cached in session storage. If there were other encrypted pages on this site, the plugin would automatically try this password before showing the prompt — so you'd only need to enter it once per session for pages that share the same password.

## Try it yourself

To add encrypted pages to your own Quartz site, install the plugin and add a `password` field to any page's frontmatter. See [[EncryptedPages]] for full setup instructions.
