---
layout: single
title:  "Secret Life of A DNS Query"
date:   2023-04-22 09:30:45 +0530
categories: 
        - networking
tags: 
        - networks
        - DNS
toc: true
---
This article describes how a DNS query gets resolved. Though a website is loaded in just one-click on our devices, a lot of work goes on at the back end to render that webpage. Let's see how it's done.

Before you read further, these are the terms you need to get acquainted with:
## Important Terms: 

### IP Address

*An IP address is a unique address that identifies a device on the internet or a local network.*

### Query

*A query is a message sent by the client to the server.*

### Cache

*Computing component that transparently stores data so that future requests for that data can be served faster.*

### DNS - the Internet's Directory Service

*The browser needs to translate "www.blogger.com" to its corresponding IP address, because hostnames can consist of variable-length alphanumeric characters, they would be difficult to process by routers. For these reasons, hosts are also identified by so-called IP addresses.*

### DNS Resolver

*Servers designed to receive DNS queries from web browsers and other applications.*

### Authoritative Name Servers

*Servers where the DNS records are stored. Consists of root name servers, TLD servers and authoritative servers.*

----

****
## Interaction of DNS Servers:
<img src="{{ site.baseurl }}/images/dns_query.jpg">

Consider you click on the URL www.blogger.com

1.     Browser first checks if IP address is present in its DNS cache, if not it calls the function present in the operating system to do DNS lookups. For E.g. on Linux that function is `getaddrinfo`.

2.     The OS might also have a DNS cache, if it has, then the function first checks if IP address is present in this cache. If IP is still not found, the function sends request to a server called DNS resolver

3.     The resolver checks if IP address is present in its cache, if not it contacts the root name server.

4.     The root name server checks if IP is present in its cache, if yes, it sends the corresponding IP address, if not it replies with “I don’t know this name but ask the TLD server.” 

5.     The resolver then asks/queries the TLD server.

6.     The TLD server checks if IP is present in its cache, if yes, it sends the corresponding IP address, if not it replies with “I don’t know this name but ask the Authoritative name server.” 

7.     The resolver then queries the authoritative name server.

8.     The authoritative name server has the IP Address of the requested website in its database. It responds with the corresponding IP to the resolver.


9.     The resolver/local DNS server then sends this IP to the OS.

10.  This IP is communicated to the browser and it starts opening a TCP connection to the server.


As shown above, the DNS query is iterative in nature, as recursive queries put heavy load of name resolution in upper levels of hierarchy.

----
## References:

*James Kurose, Keith Ross, Computer Networking A Top-Down Approach, 7th Edition.*
