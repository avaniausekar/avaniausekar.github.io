---
layout: single
title:  "Debugging 101 - Love Your Bugs"
date:   2023-06-10 09:30:45 +0530
categories: 
        - tech-views
tags:
        - bugs
        - debugging
toc: true
---
Errors and bugs are a necessary evil in any software developement field, and learning the art of debugging is a very vital step if you want to:

- Improve your developer productivity
- Write reliable code

In this article I have tried to document all the debugging methods that I learnt while working on my projects.


<img src="{{ site.baseurl }}/images/bugs.png">


Whenever you encounter a bug in any of your code/installation it is always helpful to remember the following things:
- The error happens for a logical reason - its never magic
- Be confident that you can fix it
- Being stuck is temporary

Now that you have these 3 things in your toolkit let us proceed for some debugging steps so that you can feel your inherent superpower. :)

## Step 1: Read error message carefully

Error messages usually contain a lot of information about what went wrong. But they sometimes can be very large and overwhelming to read. You can  use these tricks to extract the necessary information from them:
1. Start fixing the first error message in case of multiple error messages. Fixing the first one often fixes the remaining errors
2. Search if any solution is available on the internet for the error

## Step 2: Brainstorm possible reasons for the error

Now here I won't be able to give exact reasons but some examples may include:
1. Is there something wrong with the server?
2. Am I using correct package version?
3. Have I followed all the instructions?(In case of errors in installations)

After finding possible reasons try to narrow it down to the most possible reason, also draw a diagram of the process if possible


## Step 3: Investigate

1. Read the documentation (Important)
2. Add lots of print statements
3. Use a debugger
4. Look at logs 

A meme that highlights the importance of reading the docs:

<img src="{{ site.baseurl }}/images/joke.png">

## Step 4: Make complex things simple

1. Fix one problem at a time
2. Write clean code
3. Reduce randomness
4. Shorten your feedback/output loop (when you need to run the code many times)

## Step 5: This also helps

1. Take a break
2. Ask a friend
3. Explain the error/bug out loud
4. Finding tools that make debugging easier - eg. debuggers, profilers, tracers, fuzzers, etc

## Step 6: After fixing the bug
1. Celebrate - dance a little
2. Tell somebody what you learnt - that way you won't forget it
3. Document your bug 

----
Debugging can be an interesting adventure.

I would like to end this article by quoting Edsger Dijkstra:
>" Program testing can be used to show the presence of bugs, but never to show their absence! "
