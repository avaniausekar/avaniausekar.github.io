---
# Starter entry written from the two full-stack posts. Edit or delete freely.
# Check the date: it controls the year shown and the sort order.
title: Internship Web Application
description: >-
  A full-stack web app built during my summer internship, with a React frontend, a Node.js
  backend and Microsoft sign-in, hardened with security headers for production.
date: 2024-06-01
timeline: Summer internship
role: Full-stack developer (intern)
type: software
category: Full Stack
tech: [React, Node.js, Express, Helmet, Microsoft sign-in, REST API]
icon: fas fa-layer-group
image:
  path: /images/webapp.jpg
  alt: Illustration of a developer building a web app backed by a database
links:
  post: /full-stack/a-node-js-web-app-an-overview/
---

## Overview

During my summer internship I built a full-stack web application to meet the company's needs. The stack was completely new to me, so a big part of the work was understanding how the React frontend, the Node.js backend and the database fit together.

## Architecture

- **Frontend:** React, calling the backend's REST API.
- **Backend:** Node.js with Express, handling the database queries.
- **Sign-in:** Microsoft login.
- In development the React dev server and the Node server run on separate ports; in production they are bundled to serve from a single port.

## Shipping to production

Going live surfaced a week of Content Security Policy problems: the Microsoft login popup didn't appear, and half of the stylesheets, scripts and images were blocked. I fixed them by tuning Helmet's CSP directives (`connectSrc`, `frameSrc`, `frameAncestors`, `scriptSrc`, `imgSrc` and `styleSrc`) along with the other security headers.

## Write-ups

- [Node Js and React Js Web App: An Overview](/full-stack/a-node-js-web-app-an-overview/)
- [Node Production Headache: Security Headers](/full-stack/node-and-security-headers/)
