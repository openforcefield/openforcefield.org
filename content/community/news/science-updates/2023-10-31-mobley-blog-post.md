---
date: "2023-10-31T00:00:00+00:00"
title: 'I want to get out of building and improving force fields'
tags: ["strategy", "open science", "force field"]
categories: ["science"]
draft: false
description: 'It might seem odd for me to say this, because I’m one of the principal investigators helping to lead the Open Force Field Initiative. However, I think many of us involved in the project actually feel the same way.'
slug: 'mobley-update-2023-10-31'
weight: 10
markup: markdown
thumb: "OpenFF-Initiative.png"
author: "David Mobley"
---

I want to get out of building and improving force fields. 

It might seem odd for me to say this, because I’m one of the principal investigators helping to lead the Open Force Field Initiative. However, I think many of us involved in the project actually feel the same way. To be clear, however, this is not because we hate what we’re doing. The science and infrastructure work is exciting, and we’ve got a great team and group of collaborators. Rather, it’s because “success” would mean that force fields for molecular modeling become good enough that they are no longer limiting, either in terms of accuracy or domain of applicability.

Indeed, this is the same reason most of us are in this area – not because we deliberately chose to work on force fields, but because our research suffered from the lack of a set of open, permissive, easily-extensible force fields we could apply to our research problems. If we found clear errors with other force fields, the path to improvement and subsequent reuse was unclear and difficult. This could be because the force field was proprietary and commercial, controlled by a single entity with goals that might not match our own, or because the force field was open but with an unclear development trajectory and no clear way to get updates, changes, or fixes included. Thus, if we needed force field improvements to tackle our research, it increasingly seemed the best option was to do it ourselves in collaboration with others with the same goals. It was this set of shared problems which drove the creation of OpenFF.

At the same time, when starting OpenFF, we wanted to ensure that someday, we could reach the point where the project would no longer be needed and we could stop working on force fields. This drove our insistence that all of the infrastructure, tools, force fields, and data be fully open and permissively licensed. That way, when force fields are good enough, we and others will be able to continue to use them as long as needed without paying for them. Indeed, if they become as crucial to the community as we expect they will, the community will help ensure their continued maintenance and upkeep, allowing us to shift our focus elsewhere.

Long-term, we hope our science and infrastructure will lead to a vital ecosystem of force fields, whether they are developed by OpenFF or elsewhere. Perhaps innovations will lead to families of force fields, ranging from conventional LJ 12-6 fixed-charge force fields, to simply adding on direct polarization, to off-site charges, multipoles, cross-terms, and advanced functional forms. And perhaps these force fields will each stake out their own domains of applicability and relative benefit vs computational cost ratios, so that researchers targeting a specific application will be able to choose the option which is going to work best for their particular application given the relative cost/benefit analysis. This would be a huge success, regardless of who gets to produce these force fields. And that’s the future I hoped for when starting OpenFF – one where I can use reliable force fields in my research without having to worry that I’ll run into force field problems and get stuck.

So, in this future where I no longer work on force field development, what would I do? One of my group’s major focuses is in the area of binding free energy calculations and molecular simulations applied to early stage drug discovery, and there remains a tremendous amount of science and engineering to do in that area. Our recent [Separated Topologies](https://pubs.acs.org/doi/full/10.1021/acs.jctc.3c00282) method gives a flavor of what we want to do in that area. But I’d also like to further explore mixing MD and Monte Carlo for enhanced sampling, picking back up with our BLUES project and derivatives to make binding free energy calculations much more efficient and reliable and fix leading sampling problems. There’s just so much work left to be done in that space. And if, somehow, we get to the point where binding prediction becomes as reliable as we would like, there remains plenty of work to be done both in applications to help guide early stage drug discovery (including in academia) and in other areas like computational library design. I have my work cut out for me, even without research on force fields.

Still, perhaps sadly, there remains plenty of work to be done to improve force fields – even fixed-charge force fields of the traditional functional form. We still see clear systematic errors which need improvement, so unfortunately our work is not done. But I look forward to the day when force fields are good enough and OpenFF is no longer needed. 
