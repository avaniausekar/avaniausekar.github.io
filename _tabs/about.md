---
# the default layout is 'page'
icon: fas fa-info-circle
order: 5
---

> A personal collection of insights and lessons I have gained throughout my academic journey.

Hello ! I am *Avani*, and I have a keen interest in fascinating tech concepts. My plan is to upload all the interesting things I discover here, including my projects, explanations of various concepts, and helpful installation guides. I’m also looking to collaborate on open-source projects, so feel free to connect with me!

## What I write about

{% assign categories = site.categories | sort -%}
<div class="about-topics">
{%- for category in categories -%}
{%- assign name = category[0] -%}
{%- assign topic = site.data.topics[name] -%}
{%- capture category_url -%}/categories/{{ name | slugify | url_encode }}/{%- endcapture -%}
<a class="about-topic" href="{{ category_url | relative_url }}"><span class="about-topic__icon"><i class="{{ topic.icon | default: 'far fa-folder' }}" aria-hidden="true"></i></span><span class="about-topic__body"><span class="about-topic__name">{{ name }}</span><span class="about-topic__desc">{{ topic.description | default: 'Posts' }} &middot; {{ category[1].size }} {% if category[1].size == 1 %}post{% else %}posts{% endif %}</span></span></a>
{%- endfor -%}
</div>

## Projects

Things I have built, with the story behind each one, live in the [portfolio]({{ '/portfolio/' | relative_url }}).

## Get in touch

<div class="about-contact">
<a class="nt-btn nt-btn--primary" href="mailto:{{ site.social.email }}"><i class="fas fa-envelope" aria-hidden="true"></i><span>Email me</span></a>
<a class="nt-btn" href="https://github.com/{{ site.github.username }}" target="_blank" rel="noopener noreferrer"><i class="fab fa-github" aria-hidden="true"></i><span>GitHub</span></a>
<a class="nt-btn" href="https://www.linkedin.com/in/avaniausekar" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin" aria-hidden="true"></i><span>LinkedIn</span></a>
</div>

Comments on posts are welcome. Please keep them in line with the [comment policy]({{ '/comment-policy/' | relative_url }}).

Thank you for visiting my website.
