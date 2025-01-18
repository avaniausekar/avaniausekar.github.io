---
layout: single
title:  "The TCP/IP Model and Security"
date:   2024-12-23 10:30:45 +0530
categories: 
        - networking
tags: 
        - networks 
        - tls
        - security
        - tcp/ip
toc: true
---

The TCP/IP (Transmission Control Protocol/Internet Protocol) reference model defines how information moves from sender to receiver. TCP/IP was not originally designed with security, so we must secure the network using many external methods.  Many protocols are designed to secure network traffic at various levels. The choice of where to implement security in the stack depends on the application's and user's requirements. Regardless of where security is applied in the stack, it must provide the following fundamental services to the user:
1.	Key management 
2.	Confidentiality
3.	Nonrepudiation
4.	Integrity / Authentication
5.	Authorization

The security measures implemented at different layers of the stack can offer varying services. In some instances, it is beneficial to assign certain capabilities to one layer while allocating others to a different layer. This blog explores the benefits and nuances of providing security at various levels within the TCP/IP stack.

<img src="{{ site.baseurl }}/images/network-models.png">

## Security at the Application Layer
The application layer connects applications to the underlying network for message transmission. Host-to-host communication occurs at the application layer, so security has to be implemented in end hosts. Applications should design their security mechanisms when their specific needs cannot be met by the lower layers. One example of this is non-repudiation. The lower layers struggle to provide non-repudiation services because they do not have access to the data. Some examples of the security mechanisms implemented at the applicaion layer include [<span style="color: blue;"> PGP</span>](https://en.wikipedia.org/wiki/Pretty_Good_Privacy), [<span style="color: blue;">Kerberos</span>](https://web.mit.edu/kerberos/), and Secure Shell.
### Benefits
- Executing in the context of the user enables easy access to user credentials such as private keys.
- Ensures complete access to the data the user aims to protect, making it easier to offer services like non-repudiation. 
- An application can be extended without relying on the operating system to provide these services.

### Key Considerations
- Security mechanisms have to be designed independently for each application, so there is a greater probability of making mistakes and hence opening up security holes for attacks.

## Security at the Transport Layer
The transport layer is responsible for logical communications between applications running on different hosts. Adding security at the transport layer does not need enhancements in each application. TLS (Transport Layer Security) protocol is implemented in the transport layer which provides security services such as authentication, integrity, and confidentiality on top of TCP. (TLS is not implemented over UDP as it needs to maintain context for a connection)
### Benefits
- It bundles authentication with encryption.
- Easy to install and execute.
- It reinforces the integrity of the communication.
- The TLS protocol allows client and server applications to detect message tampering, message interception and message forgery.

### Key Considerations
- Obtaining the user context is complicated.
- TLS can only be implemented on an end system.
- Applications need modification to request security services from the transport layer.

## Security at the Network Layer
The network layer is concerned with addressing and routing packets from the source to the destination. It is the lowest layer in the OSI model that deals with end-to-end transmission. Implementing security at this layer has many advantages.
### Benefits
- Decreased overheads of key negotiations.
- If security implemented at the network and lower levels, fewer applications need changes.
- Ability to build VPNs and intranets which are subnet based, and network layer supports subnet-based security.
- IPSec, the protocol that can secure all and any kind of Internet traffic operates at the network level. IPSec also allows per flow or per connection security and thus allows for very fine-grained security control.
### Key Considerations
- Difficulty in handling issues such as non - repudiation of data. [As discussed above, this is better handled in higher layers]
- Difficult to exercise control on a per user basis on a multiuser machine when security is implemented at network layer.

## Security at the Link Layer
The Data Link layer is responsible for communications between end-device network interface cards. This layer encapsulates network packets into frames and also performs error detection. If a dedicated link between two hosts or routers is present, then traffic needs encryption to prevent snooping, here hardware encryption devices can be used. For devices connected to IP networks, security at the data link layer is insufficient; one must move up a layer to provide adequate security services.
### Benefits
- Speedy and fast to implement because of hardware encryption devices

### Key Considerations
- Not scalable
- This works well only on dedicated links – for e.g. ATM machines
- The two entities involved in communication have to be physically connected.

## References
1. Doraswamy, N. and Harkins, D. (1999) IPSec: The New Security Standard for the internet, intranets, and Virtual Private Networks. Upper Saddle River, NJ: Prentice Hall. 
2. [<span style="color: blue;"> What is TLS </span>](https://www.spiceworks.com/it-security/vulnerability-management/articles/what-is-ssl-tls/)

