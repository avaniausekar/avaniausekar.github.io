---
# ─────────────────────────────────────────────────────────────────────────────
#  PROJECT TEMPLATE: copy this file to `_projects/<short-name>.md` and fill it in.
#  The file name becomes the URL: _projects/my-app.md  →  /portfolio/my-app/
#  (This file is ignored by Jekyll because its name starts with "_".)
# ─────────────────────────────────────────────────────────────────────────────
published: false

title: My Project                       # required
description: >-                         # one or two sentences; shown on the card, the page header and in search results
  What the project does and why it matters.
date: 2025-01-01                        # used for the year and for sorting (newest first)
type: software                          # software | hardware: which column it appears in (default: software)
category: Web                           # e.g. Security, Full Stack, Systems, AI (filter chips appear once you have 5+ projects)
tech: [Python, FastAPI, PostgreSQL]     # shown as chips; also searchable

# ── Optional ──────────────────────────────────────────────────────────────────
featured: true                          # "Featured" badge, listed first in its column
status: Completed                       # Completed | In progress | Prototype | Archived (coloured dot)
role: Solo developer
timeline: Jan – Mar 2025                # shown instead of the year on the project page
team: 3 people

# Cover image (16:9 works best). Leave it out to get generated cover art with `icon`.
image:
  path: /images/my-project.png
  alt: Screenshot of the dashboard
icon: fas fa-rocket                     # any Font Awesome 6 free icon: https://fontawesome.com/search?ic=free
hue: 160                                # optional 0–360 colour for the generated cover art (default: orange)

links:
  github: https://github.com/avaniausekar/my-project
  demo: https://my-project.example.com
  post: /posts/my-project-write-up/     # a related blog post on this site
---

Everything below the front matter becomes the case study on the project page.
Leave it empty and the page shows just the summary, links and facts.

## Overview

What problem does it solve, and for whom?

## How it works

Architecture, interesting technical decisions, screenshots.

## Results & lessons

What happened, what you learned, what you'd do differently.
