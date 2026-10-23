---
layout: post
title: "Data Communication - An Introduction"
date: 2026-10-23 00:00:00 +0530
categories: [CS, Notes]
tags: [blog, networks, data, cs]
---

Data communication is one of the subjects that appears in most Computer Science degrees. At first, it can feel like a collection of unfamiliar words: packets, protocols, layers, routers, and topologies. The basic idea, however, is quite simple: **one device sends information, another device receives it, and both follow an agreed set of rules**.

This article is my beginner-friendly introduction to that idea. We will start with the parts of a communication system, then connect them to networks, the Internet, OSI, and TCP/IP.

## In this article

1. [What is data communication?](#data-communication)
2. [Components of data communication](#components-of-data-communication)
3. [What makes communication effective?](#what-makes-communication-effective)
4. [Physical connections and topologies](#physical-connections-and-topologies)
5. [Types of networks](#types-of-networks)
6. [What is the Internet?](#what-is-the-internet)
7. [The OSI model](#the-osi-model)
8. [The TCP/IP model](#the-tcpip-model)
9. [A practical walkthrough](#a-practical-walkthrough)
10. [Summary](#summary)

## Data Communication

Data communication is the exchange of data between two or more devices through a transmission medium. The medium can be a cable, fibre-optic line, radio signal, or even a satellite link.

The data might be a text message, an image, a song, a video, or a request to a web server. Before it travels, it is represented as bits (0s and 1s). For example:

- Text is encoded using a character encoding such as Unicode.
- Numbers are represented in binary.
- An image is represented by pixels, with each pixel storing colour information.
- Audio and video are sampled and encoded into digital data.

The sender breaks larger data into manageable pieces called **packets**. Packets can be checked, addressed, and sent across a network. The receiver puts the pieces back together and converts them into something we can read, hear, or see.

![A message travelling from a sender to a receiver through a network](/assets/images/data-communication-overview.svg)

## Components of data communication

A basic communication system has five important components:

1. **Message** - the information being communicated, such as an email or a photo.
2. **Sender** - the device that creates and sends the message.
3. **Receiver** - the device that accepts and processes the message.
4. **Transmission medium** - the physical or wireless path used by the message.
5. **Protocol** - the rules that define how the devices communicate.

A protocol answers practical questions: How should a message be formatted? How does the receiver know who sent it? What should happen if part of the message is lost? HTTP, TCP, IP, Ethernet, and Wi-Fi are examples of protocols used at different parts of a network.

## What makes communication effective?

Communication is useful only when it meets a few basic requirements:

- **Delivery:** The data must reach the correct destination.
- **Accuracy:** The data must arrive without undetected changes. Error-detection methods help the receiver identify damaged data.
- **Timeliness:** The data must arrive when it is needed. A late result can be as unhelpful as a missing result.
- **Low jitter:** Packets should arrive at reasonably regular intervals. Jitter is especially noticeable during voice calls, live video, and online games.

These requirements can conflict. A system may retransmit a lost packet to improve accuracy, but the retransmission can add delay. Network design is often about choosing the right balance for the application.

## Physical connections and topologies

A physical connection can be **point-to-point** or **multipoint**:

- A **point-to-point** connection is a dedicated link between exactly two devices.
- A **multipoint** connection is shared by several devices.

## Topologies
Network topology is the physical or logical arrangement of devices and links in a network. The common topologies are:

### Mesh topology

In a full mesh, every device has a direct connection to every other device. This gives excellent redundancy: if one link fails, another route may still be available. The disadvantage is cost and complexity, because the number of links grows quickly as devices are added.

### Star topology

In a star, each device has a separate link to a central switch or hub. This is the most common arrangement in modern local networks. Adding or removing a device is easy, and a broken cable usually affects only one device. The central device is a critical point, though: if it fails, the connected devices lose their network connection.

### Bus topology

In a bus network, all devices share one main cable called the backbone. It is simple and inexpensive for a small setup, but a damaged backbone can affect the whole network. Shared traffic can also create collisions and slow the network.

### Ring topology

Each device connects to two neighbours, forming a ring. Data travels around the ring, sometimes in one direction and sometimes in both directions depending on the design. A break can interrupt communication unless the network has a second path or a mechanism for bypassing the failed link.

### Hybrid topology

A hybrid network combines two or more topologies. For example, an organisation may use star networks inside individual offices and connect those offices using a partial mesh. Real networks are often hybrid because different parts have different requirements.

## Types of networks

Networks are also classified by their geographic size:

- **PAN (Personal Area Network):** A few metres around a person, such as a phone connected to wireless earbuds.
- **LAN (Local Area Network):** A home, classroom, office, or building.
- **WLAN (Wireless LAN):** A LAN that uses Wi-Fi rather than network cables.
- **MAN (Metropolitan Area Network):** A network covering a city or a large campus.
- **WAN (Wide Area Network):** A network covering large geographic areas. The Internet is the best-known example.

The names describe scale, not quality. A LAN can be faster than a WAN because the devices are closer and the path is controlled by one organisation.

## What is the Internet?

The Internet is not one giant computer. It is a **network of networks**. Home networks, university networks, mobile networks, cloud providers, and internet service providers connect to one another and agree to forward traffic using common protocols.

When you open a website, a simplified version of the journey looks like this:

1. Your device connects to a local router using Wi-Fi or Ethernet.
2. DNS translates the website name into an IP address.
3. Routers forward packets towards the destination network.
4. The web server receives the request and sends a response back.
5. Your browser reassembles the response and displays the page.

Packets do not always take the same physical route. Routers choose paths based on current network information, so the Internet can continue working even when some links are busy or unavailable.

## The OSI model

The **Open Systems Interconnection (OSI) model** is a seven-layer reference model. It is not a single protocol; it is a way to divide a complicated communication process into understandable responsibilities.

| Layer | Name | Main responsibility | Examples |
| --- | --- | --- | --- |
| 7 | Application | Services used directly by applications | HTTP, DNS, SMTP |
| 6 | Presentation | Format, encryption, and compression | TLS, JPEG, UTF-8 |
| 5 | Session | Starts, manages, and ends conversations | Session control |
| 4 | Transport | End-to-end delivery, reliability, and ports | TCP, UDP |
| 3 | Network | Logical addressing and routing | IP, routers |
| 2 | Data Link | Frames, local delivery, and MAC addresses | Ethernet, Wi-Fi |
| 1 | Physical | Sends raw bits as signals | Cables, radio, fibre |

The model is read from the top when an application sends data and from the bottom when the data travels over the medium. At the receiver, the process happens in reverse. Each layer adds its own control information; this is called **encapsulation**.

## The TCP/IP model

The TCP/IP model describes the protocols that power the Internet. Its layers are usually grouped like this:

| TCP/IP layer | Purpose | Common examples |
| --- | --- | --- |
| Application | Network services for applications | HTTP, DNS, SSH |
| Transport | Communication between processes | TCP, UDP |
| Internet | Addressing and routing between networks | IP, ICMP |
| Network access | Local delivery and physical transmission | Ethernet, Wi-Fi |

The OSI model is useful for learning and troubleshooting, while the TCP/IP model maps more closely to real Internet protocols. They are not competing networks; they are two ways of describing the same general communication process.

## A practical walkthrough

Imagine opening `https://example.com` in a browser:

1. **Application:** The browser creates an HTTPS request. DNS may first be used to find the server's IP address.
2. **Transport:** TCP creates a connection and uses a port to identify the browser's conversation. It can retransmit missing data.
3. **Internet:** IP adds source and destination addresses. Routers use the destination address to forward the packet.
4. **Network access:** Wi-Fi or Ethernet places the packet inside a local frame and sends it to the next device.
5. **Physical:** The frame becomes radio waves, electrical signals, or pulses of light.
6. At the server, the layers remove their information in reverse order. The web server processes the request and sends a response back.

This layered approach is powerful because each layer can do its own job without needing to understand every implementation detail of the other layers. A browser does not need to know whether the final connection uses Wi-Fi or fibre.

## Summary

Data communication is the organised exchange of information between devices. A complete communication system needs a message, sender, receiver, transmission medium, and protocol. Good communication delivers data to the right place, accurately, on time, and with acceptable jitter.

Topologies describe how devices are arranged, while PAN, LAN, MAN, and WAN describe the size of a network. The Internet connects many independent networks through routers and shared protocols.

Finally, the OSI and TCP/IP models help us reason about networking one layer at a time. When a website loads, data moves down the layers at the sender, crosses the network as signals and packets, and moves back up the layers at the receiver. That is the central idea behind almost every networked application we use today.
