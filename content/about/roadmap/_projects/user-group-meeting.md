---
id: user-group-meeting
title: "User group meeting"
category: usability
recommended: false
stages:
  - community_maintenance
summary: "Organise a multi-day in-person OpenFF User Group Meeting (UGM) modelled on the RDKit UGM — a community event open to pharma users, academics, and students, focused on direct interaction, talks, perhaps workshops and hackathons."
fte:
  infrastructure: 1.5
  science_code: 1
  science_exp: 0
  other: 1
timeline:
  - milestone: "Venue, dates, and budget confirmed"
    date: "Q3 2026"
  - milestone: "Programme, speakers, and registration open"
    date: "Q4 2026"
  - milestone: "OpenFF UGM held"
    date: "Q1 2027"
go_no_go:
  - gate: "Q3 2026"
    condition: "Sufficient confirmed attendee interest and funding secured; if fewer than 20 attendees can commit, consider a virtual or hybrid format as an alternative"
metrics:
  - "At least 20 attendees across pharma, academic, and student groups"
  - "Programme includes talks from both OpenFF team and external users (at least 3 external talks)"
  - "Hackathon day held with at least 3 working groups on concrete OpenFF topics"
  - "Post-meeting feedback survey satisfaction ≥4/5"
dependencies: []
enables: []
---

## Goals

- Organise a 2–3 day in-person OpenFF UGM, modelled on the RDKit UGM format: ~2 days of talks and posters followed by a hackathon day
- Target a broad audience: **pharma consortium members** (primary audience — industrial users running RBFE campaigns and force field workflows), **academic collaborators** (groups using OpenFF in research), and **students** (graduate students learning computational chemistry tools)
- Create an open, inclusive atmosphere where users at all career stages can ask questions, share workflows, and connect directly with the OpenFF development team
- Provide a programme of contributed talks from external users, not just from the OpenFF team: hearing how users are actually using the tools is as valuable as hearing from the developers

## Potential Format (RDKit UGM Model)

The RDKit UGM has run successfully for over a decade and provides a good template:

- **Day 1–2**: Talks (20–30 min slots) and lightning talks from OpenFF team members and invited external speakers; poster session; community social
- **Day 3**: Hackathon — participants self-organise into small groups around proposed topics; groups present outcomes at the end of the day
- **Remote access**: Live-streamed over video call for remote participants (typically 40–60 remote attendees at RDKit UGM); Discord or Slack for back-channel interaction
- **Registration**: Free (or low-cost) to balance between accessibility and attendance

## Benefits

**Direct user contact is irreplaceable.** There are things that pharma users will say in person — workflow frustrations, feature requests, concerns about accuracy or reliability — that they will not file as GitHub issues or raise on Slack. The UGM provides a structured space for this feedback, and the direct human relationship between developers and users builds the kind of trust that sustains long-term consortium membership.

**Reaching pharma users specifically.** Consortium members are the primary audience because they fund OpenFF and their needs should drive the roadmap. Industrial scientists are often constrained about what they can share publicly; in-person conversations at a community meeting allow much more candid discussion than open GitHub issues or public forums.

**Students and academics as future users.** Students who learn OpenFF at a UGM become the next generation of users and contributors. Academic groups who feel connected to the community are more likely to contribute datasets, methods, and code. The RDKit UGM actively cultivates this: accessible pricing and a welcoming programme structure ensures that PhD students and postdocs attend alongside senior industry scientists.

**Hackathon as direct productivity.** The hackathon day produces tangible outputs: documentation improvements, bug fixes, new tutorial notebooks. It also onboards new contributors in a low-stakes environment where they have immediate expert support. Several RDKit UGM hackathon contributions have made it into production releases.

**Community identity.** OpenFF is a distributed project — staff, consortium members, and academic collaborators rarely meet in person. The UGM reinforces that OpenFF is a community, not just a software product, which matters for long-term engagement and membership retention.
