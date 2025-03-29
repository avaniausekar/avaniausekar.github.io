---
layout: single
title:  "Deploy a Python Server with Flask on Windows Apache Server"
date:   2023-07-22 09:30:45 +0530
categories: 
        - tech-views
tags:
        - installation
        - flask
toc: true
---
Recently I programmed a TLS/SSL checker web app - which checks which tls protocol a website is using and also gives a list of SSL vulnerablities the website is prone to.
I programmed this script in python using flask framework and now I wanted to deploy it to the server.
But little did I know that deploying or setting up a python server with flask can be tricky especially on a apache server.

So, these are my learnings and some useful links - you can read them so that you can finish deploying a python server on Windows apache faster than me ! :)


## Prerequisites:
* Python - can be downloaded from [<span style="color: blue;"> https://www.python.org/downloads/</span>](https://www.python.org/downloads/)
* Flask - can be installed by typing the following command in cmd 
```
$ pip install flask
```
* WfastCGI module - installed by typing the following command in cmd
```
$ pip install wfastcgi
```
----

## **Deploying using Windows IIS Server:**

1. I have used this [<span style="color: blue;">link</span>](https://medium.com/@dpralay07/deploy-a-python-flask-application-in-iis-server-and-run-on-machine-ip-address-ddb81df8edf3) to install until step IV (As given in the article) with some changes.
**CGI** module will be found in 
*`Server Roles > Web Server(IIS) > Web Server > Application Development > CGI`* \
(If it is not found at the exact location as given in the above article)

2. After completing all steps – if you get *internal server* error when you access the website url - you can refer these steps: reference [<span style="color: blue;"> Error an unknown FastCGI error occurred</span>](https://stackoverflow.com/questions/6176093/http-error-500-0-internal-server-error-an-unknown-fastcgi-error-occured) \
<img src="{{ site.baseurl }}/images/help.png"> 

3. To deploy it on port eg say :4000:
- Go to IIS Manager
- In sites dropdown select the TLS checker website
- Select `edit site > Bindings`
- Select `https > edit >`
- Enter port 4000
- Add hostname
- You may have to open the port 4000 in inbound firewall rules

----
- **Deploying using WAMP Server :**

1. This article is very apt but I might go into more details about this installation in coming weeks.
[https://thilinamad.medium.com/flask-app-deployment-in-windows-apache-server-mod-wsgi-82e1cfeeb2ed](https://thilinamad.medium.com/flask-app-deployment-in-windows-apache-server-mod-wsgi-82e1cfeeb2ed) 


>Thank - You for reading !
>> Avani




