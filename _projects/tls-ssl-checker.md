---
# Starter entry written from the "Deploy a Python Server with Flask" post. Edit or delete freely.
title: TLS/SSL Checker
description: >-
  A web app that reports which TLS protocol a website is using and lists the SSL
  vulnerabilities the site may be prone to.
date: 2023-07-22
type: software
category: Security
tech: [Python, Flask, TLS/SSL, IIS, wfastcgi]
featured: true
icon: fas fa-shield-halved
links:
  post: /tech-views/Ways-to-deploy-a-python-server-on-apache/
  # github: https://github.com/avaniausekar/<repo>
  # demo: https://<live-url>
---

## Overview

A TLS/SSL checker web app: point it at a website and it reports which TLS protocol the site is using, along with a list of SSL vulnerabilities the site may be prone to.

## How it's built

- Written in **Python** with the **Flask** framework.
- Deployed on a **Windows IIS** server through the **wfastcgi** module, bound to its own port.

## What I learned

Deploying a Flask app on Windows turned out to be trickier than writing it. I documented the IIS and WAMP setups, including the fix for the "unknown FastCGI error", in [Deploy a Python Server with Flask on Windows Apache Server](/tech-views/Ways-to-deploy-a-python-server-on-apache/).
