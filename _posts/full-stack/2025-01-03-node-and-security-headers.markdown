---
layout: single
title: "Node Production Headache: Security Headers"
date: 2025-01-18 09:30:45 +0530
categories:
  - full-stack
tags:
  - node js
  - security headers
  - web app
  - helmet
  - production
toc: true
classes: wide
---

## Introduction

Hearing the term "_security headers_" might be intimidating for someone new to computer science, especially in the field of web development. Security headers are HTTP response headers that provide essential security measures that your application can use to enhance its overall security. These headers play a critical role in ensuring the safety of a website.

The following table outlines some of the most important security headers.

## Common Security Headers

| Security Header                   | Expected Value                      | Use                                                                                         |
| --------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------- |
| Content-Security-Policy           | default-src 'self';                 | Restricts sources for content to mitigate cross-site scripting (XSS) and data injection.    |
| Cross-Origin-Opener-Policy        | same-origin                         | Isolates browsing contexts to prevent cross-origin information leaks.                       |
| Cross-Origin-Resource-Policy      | same-origin                         | Limits the sharing of resources to the same origin.                                         |
| Origin-Agent-Cluster              | ?1                                  | Changes process isolation to be origin-based for improved security.                         |
| Referrer-Policy                   | no-referrer or strict-origin        | Controls how much referrer information is included with requests.                           |
| Strict-Transport-Security         | max-age=31536000; includeSubDomains | Enforces HTTPS for all connections and prevents downgrade attacks.                          |
| X-Content-Type-Options            | nosniff                             | Prevents the browser from MIME-sniffing a response away from the declared content-type.     |
| X-DNS-Prefetch-Control            | on or off                           | Controls DNS prefetching to reduce potential information leaks.                             |
| X-Download-Options                | noopen                              | Forces downloads to be saved instead of auto-executed (Internet Explorer only).             |
| X-Frame-Options                   | DENY or SAMEORIGIN                  | Prevents the webpage from being framed to protect against clickjacking attacks.             |
| X-Permitted-Cross-Domain-Policies | none or master-only                 | Controls cross-domain behavior for Adobe products, like Acrobat.                            |
| X-Powered-By                      | (Header removed entirely)           | Prevents revealing server information to mitigate potential attacks.                        |
| X-XSS-Protection                  | 0                                   | Disables buggy XSS filters in older browsers to avoid unintended issues.                    |
| Permissions-Policy                | geolocation=(), microphone=()       | Restricts access to browser features like geolocation and microphone.                       |
| Expect-CT                         | enforce, max-age=86400              | Ensures that valid Certificate Transparency information is included for HTTPS.              |
| Cross-Origin-Embedder-Policy      | require-corp                        | Mitigates cross-origin attacks for resources embedded in the page.                          |
| Cache-Control                     | no-store, no-cache, must-revalidate | Prevents sensitive information from being stored in the cache.                              |
| Set-Cookie                        | Secure; HttpOnly; SameSite=Strict   | Protects cookies by making them secure, accessible only to HTTP, and tied to the same site. |

When building a web application, the developer must set these response headers in the code.

## How to Set Security Headers

Let's consider an example in Node.js. We can set security headers either manually or by using a popular library called '_helmet_', which acts as middleware to automatically set these headers for you. Using a library like helmet is convenient, so we'll focus on its implementation. First, we will look at how to use helmet in your code, and then we will discuss the importance of carefully setting security headers when deploying to production.

- Install Helmet using this command

```
$ npm install helmet
```

- Call the helmet middleware in your application's main file for e.g _index.js_ or _app.js_

```js
import helmet from "helmet";

const app = express();

app.use(helmet());
```

You can learn more about the default headers set by the Helmet.js by reading [<span style="color: blue;">here</span>](https://www.npmjs.com/package/helmet).

- If you want to customize the default headers set by Helmet, you can do so. _**It is essential to customize the headers** because relying solely on the default headers provided by Helmet in a production environment can hinder the functionality of your application._ Why is this the case ? Let's discuss it in the next section.

## Security Headers and Production Environment

After coding my Node.js application, I was ready to deploy it in production. I initially thought that the deployment process would go faster since I had already simulated it on my virtual machine, but I was mistaken. If you noticed, I mentioned "headache" in the title of this blog for a reason.

When I simulated the production environment on my virtual machine - it was set up on localhost, also the microsoft login was not set during that time.

When I deployed the application in production on my domain - the following issues were encountered over a span of one week

1. I encountered an issue where the Microsoft login popup was not appearing. After changing the popup setting to redirect, it directed me to the Microsoft Login page. However, after entering the correct login credentials, I ended up with a blank page.
- This happened because the Content Security Policy (CSP) was not configured to allow requests from the Microsoft website. The login popup was not appearing because the frameAncestors and frameSrc in the CSP was not configured for <ins>_"https://login.microsoftonline.com"_</ins>
- To resolve this, I updated the <mark>connectSrc</mark>, <mark>frameSrc</mark>, <mark>frameAncestors</mark> in the CSP to include not only the "self" variable but also all the domains from which we expected to receive requests.
```js
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: [
          "'self'",
          "https://login.microsoftonline.com",
          "https://graph.microsoft.com",
          "https://mydomain.com",
          "https://somethirdpartydomain.com",
        ],
        frameSrc: [
          "'self'",
          "https://login.microsoftonline.com",
          "https://mydomain.com",
          "blob:",
        ], // for tokens
        frameAncestors: [
          "'self'",
          "https://login.microsoftonline.com",
          "https://mydomain.com",
        ], // Allows embedding in Azure AD frames/popups
      },
    },
  })
);
```

2. After the above three changes, I was able to login, but still faced problems. Half of my stylesheet, scripts and images were not present and the pop ups were not showing small elements like a cross svg etc.
- To resolve that, I updated the <mark>scriptSrc</mark>, <mark>imgSrc</mark> and <mark>styleSrc</mark> in the CSP directives. <br>
```js
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: [
          "'self'",
          "https://login.microsoftonline.com",
          "https://graph.microsoft.com",
          "https://mydomain.com",
          "https://somethirdpartydomain.com",
        ],
        frameSrc: [
          "'self'",
          "https://login.microsoftonline.com",
          "https://mydomain.com",
          "blob:",
        ], // for tokens
        frameAncestors: [
          "'self'",
          "https://login.microsoftonline.com",
          "https://mydomain.com",
        ], // Allows embedding in Azure AD frames/popups
        scriptSrc: [
          "'self'",
          "https://login.microsoftonline.com",
          "https://mydomain.com",
        ],
        imgSrc: ["'self'", "blob:", "data:"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://mydomain.com"], // Allows inline styles
      },
    },
  })
);
```

The following is some of the security header configuration I used to deploy my application to production. Additionally, we need to implement CORS (Cross-Origin Resource Sharing), which is not included in Helmet. CORS can be quite tricky, so I will save that topic for another post. Thank you for reading until the end!
```js
import helmet from "helmet";

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: [
          "'self'",
          "https://login.microsoftonline.com",
          "https://graph.microsoft.com",
          "https://mydomain.com",
          "https://somethirdpartydomain.com",
        ],
        frameSrc: [
          "'self'",
          "https://login.microsoftonline.com",
          "https://mydomain.com",
          "blob:",
        ], // for tokens
        frameAncestors: [
          "'self'",
          "https://login.microsoftonline.com",
          "https://mydomain.com",
        ], // Allows embedding in Azure AD frames/popups
        scriptSrc: [
          "'self'",
          "https://login.microsoftonline.com",
          "https://mydomain.com",
        ],
        imgSrc: ["'self'", "blob:", "data:"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://mydomain.com"], // Allows inline styles
      },
    },
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "same-origin" },
    originAgentCluster: true,
    referrerPolicy: { policy: "no-referrer" },
    hsts: {
      maxAge: 31536000, //  HSTS policy remains in effect for one year
      includeSubDomains: true,
      preload: true,
    },
    noSniff: true,
    dnsPrefetchControl: { allow: false },
    frameguard: { action: "sameorigin" },
    permittedCrossDomainPolicies: { permittedPolicies: "none" },
  })
);
```
