---
title: Manual
---
#### Any question about the website contact Henrik van Leeuwen (van Leeuwen & van Leeuwen - Web development agency) via  henrik@vanleeuwen.studio
{{< br >}}
The overall structure of the OpenFF website is as follows:
- Archetypes
- Content
- Data
- Public
- Resources
- Static
- Themes
*This structure is the default Hugo CMS structure.*

**For the OpenFF manual the folders of interest are Content, Data and Themes.**
{{< br >}}{{< br >}}
## Identation
For the .toml and .yaml file the correct use of indentation is important. Please check existing files to check the correct indentation.
{{< br >}}{{< br >}}
## Logos
In the root of the OpenFF Hugo folder the openff_logos.zip can be found.
openff_logos.zip is a zipfile with all the logo files linked in the branding page.
{{< br >}}{{< br >}}
## Config file
In the root of the OpenFF Hugo folder the file config.toml can be found.
In config.toml you can adjust settings such a language, title, etc. Besides there default settings additional OpenFF specific settings can be found
- Header title and subtitle
- the link to the different copyright usages used in the website. This should be in lowercase and without spaces.
- Menu settings.
{{< br >}}{{< br >}}
## Menu Settings
Menu settings have the following possibilities:

- name = "Publications"
{{< br >}}
*The visible name in the main menu*

- url = "/science/publications/"
{{< br >}}
*The location of the page*

- weight = 2
{{< br >}}
*Where the visible name of the menu should be in relation to the other menu items*

- identifier = "science"
{{< br >}}
*Unique identifier to the menu item and has to be set correctly for the correct connection between parent and children.*

- pre = "red"
{{< br >}}
*The color of the submenu*

- parent = "science"
{{< br >}}
*Under which parent menu this menu items falls. (Only applicable for children menu items)*
{{< br >}}{{< br >}}
## Content
The content folder has all the content of the website and exists of the following structure:
About, Community, Data, Footer, Force fields, Minutes, Science and Software
{{< br >}}{{< br >}}

## Styling
In the website we only use 1 typeface: Montserrat in different Uppercase and normal use.
To style a page we use the following markdown styles and shortcodes:
*Hashtags (#) are used for the headlines:*{{< br >}}
'#' is for H1 and only used as headers in pages if needed (for example # Core infrastructure in the software page){{< br >}}
'##' is for H2 and used to make subheadings in pages{{< br >}}
'###' is for H3, which is similar to H2 but then as Uppercase.{{< br >}}
'####' is for H4, which is to Uppercase in the regular text and used as an open expert on most pages.{{< br >}}

*Within the Hugo website HTML can be used, for example to style the tables better.*
{{< br >}}{{< br >}}
## Page Settings
Every page has settings in the very top of the page.

- color: darkblue
{{< br >}}
*In color you can subscribe the color of the page. The colors are darkblue, lightblue, red and orange.*

- title: Careers
{{< br >}}
*The head title in the top.*

- subheader: "sub"
{{< br >}}
*To show the sub pages in a menu in the mean page. (Some pages have the filtering also in the subheaders (such as at team).*

- class: small-images
{{< br >}}
*To show images next to the text (for example with the force fields page)
(Some pages also have some additional classes to control specific visual elements such as with the roadmap page)*

- Weight:2
{{< br >}}
*When children pages are visible in the sub menu you can determine the location in the menu by changing the weight.*

- header_list: [
  {
    title: "Automated infrastructure",
    description: "Engineer a modern, open, extensible, and sustainable framework for automated force field parameterization and application",
    icon: "tools.svg"
  }, (etc)
{{< br >}}
*header_list is used to create the 2 column list with icons as used on the home, mission and science pages.*

- header_intro: Mission
{{< br >}}
*Header_intro is used to show a header above the 2 column header_list.*
{{< br >}}{{< br >}}
## Structure

- Content > ABOUT{{< br >}}
*The about section has branding, careers, mission, roadmap and team*

- About > BRANDING{{< br >}}
*In the folder ‘img’ all the images shown at the branding page are stored. The zip file with all logo files is stores in the root folder.*

- About > CAREERS > EXTERNAL{{< br >}}
*All external job opportunities. You can add separate .md files to add separate external careers opportunities.*

- About > CAREERS > openff{{< br >}}
*All openff opportunities. You can add separate .md files to add separate openff careers opportunities.*
{{< br >}}{{< br >}}
## Mission
The 2 column layout can be adjusted by changing the header_list. The icons are in the ‘img’ folder as .svg files.
{{< br >}}{{< br >}}
## Roadmap
The index file in the roadmap folder can be left as the actual roadmap can be controlled at data > roadmap > index.yaml

The separate circles with labels are controlled in the following manner (as example):
- title: toolkit 0.5.0
{{< br >}}
*Title of the label*

- subtitle: >{{< br >}}
GBSA support, easier{{< br >}}
access to indexed{{< br >}}
attributes, parameter{{< br >}}
coverage example{{< br >}}
notebook{{< br >}}
*Text below the label title*

- size: smallest{{< br >}}
*You can use size:smallest or no size at all*

- direction: down{{< br >}}
*Which direction the label should be in relation to the circle)*

- valign: down{{< br >}}
*By adding valign:down the label and text will be placed down even more to go below other labels if needed)*

- align: right{{< br >}}
*Which direction the label should go*

- style: "margin-top: -2rem"{{< br >}}
*To have some additional control over the labels with css*

- date: 2019-11-01{{< br >}}
*Date next to the label*
{{< br >}}{{< br >}}

## Team
Team has a filter menu which is being controlled by subheader: settings. Via the filter you can show the different roles.
To control the team members can be added and controlled by going to data > members.
Each member can have the following options:
- name: Andrea Rizzi{{< br >}}
*Name of the member*

- role: Researcher{{< br >}}
*Visible roles*{{< br >}}

- filter-role: Alumni{{< br >}}
*Role to be used in the filter (can be komma separated)*

- lab: Chodera lab{{< br >}}
*Lab connected to the member*

- title: Graduate Student, Sloan Kettering Institute{{< br >}}
*Title of the member*

- current_position: Postdoctoral Fellow in Parrinello lab{{< br >}}
*Current position of the member*

- institution: Sloan Kettering Institute{{< br >}}
*Institution connected to the member*

- img: andrea-rizzi.jpg{{< br >}}
*Image of the member, the ‘img’ folder is located at content > team*

- google_scholar: https://scholar.google.com/citations?user=EIF9n3EAAAAJ&hl=en{{< br >}}
*Google scholar link*

- webpage: "http://choderalab.org/members#andrea-rizzi"{{< br >}}
*Website link of the member (use https://)*

- description: Software architecture, free energy calculations, and high-performance molecular simulation{{< br >}}
*Description per member*

- ORCID: 0000-0001-7693-2013{{< br >}}
*ORCID number*

- twitter: andrrizzi{{< br >}}
*Twitter handle*

- github: andrrizzi{{< br >}}
*Github handle*

- Linkedin: andrrizzi{{< br >}}
*Linkedin handle*
{{< br >}}{{< br >}}
## Community > COLLABORATE
Standard page with subheads
{{< br >}}{{< br >}}
## Community > events > EVENT-CALENDAR
The event calendar has a short code for embedding the calendar:{{< br >}}
{{ < calendar "https://calendar.google.com/calendar/embed?src=openforcefield.org_acehqcu5o51ti8j0vpum493g90%40group.calendar.google.com&ctz=Pacific%2FAuckland" > }}
{{< br >}}{{< br >}}
## Community > events > WEBINAR
The webinar images go into the ‘img’ folder.
The webinar texts are located in data > webinars
These text use the following structure:
- title: "Automated Optimization Approaches for the CHARMM Lipid Force Field"{{< br >}}
*Title of the webinar*

- presenter: "[Andreas Krämer](https://orcid.org/0000-0002-7699-3083)"{{< br >}}
*Name of the presenter with link to website of the presenter*

- img: kramer.png{{< br >}}
*Image of the webinar*

- date: 2019-12-17{{< br >}}
*Date of the webinar*

- summary: Andreas Krämer (NIH) gave a talk about development of an automated optimization approach to improve the CHARMM36 lipid force field using pair-specific LJ parameters during his visit to MSKCC.{{< br >}}
*Summary text*

- abstract: |{{< br >}}
Abstract text{{< br >}}
*Abstract text*

- zenodo: https://doi.org/10.5281/zenodo.3583308{{< br >}}
*Zenodo link*

- youtube: https://youtu.be/Hsq1nGr_jo8{{< br >}}
*Youtube link*
{{< br >}}{{< br >}}
## Community > events > Workshops
The workshop page has an added class called ‘table-with-time’ to work with the different workshop folders.
Each workshop has its own dedicated folder in the workshops folder. Each workshop has a specialised header which looks like the following example:
- color: darkblue{{< br >}}
*Color of the header*

- weight: 3{{< br >}}
*Location in the submenu of the workshops*

- title: 1st Open Force Field Workshop{{< br >}}
*Title of the workshop*

- description: The First Open Force Field Workshop was held in La Jolla, CA on January 7-8, 2019. The meeting was open to Consortium members and collaborators, and parts of the meeting were recorded for posting online. Watch the videos from this workshop on YouTube and access presentation slides on Zenodo.{{< br >}}
*Description of the workshop*

- foldopen: true{{< br >}}
*Should the workshop fold open in the overview with a read more and read less button.*

{{< br >}}{{< br >}}
## Community > Events
The events page shows the webinars as standard page. This can be changed in the menu settings.
{{< br >}}{{< br >}}
## Community > FAQ
Standard page with all the FAQ
{{< br >}}{{< br >}}
## Community > Forum
The forum should be coming at a later stage
{{< br >}}{{< br >}}
## Community > News / Science Updates
The news page has separate header settings:
- color: darkblue{{< br >}}
*Color of the header*

- title: News{{< br >}}
*Title of the page*

- layout: list{{< br >}}
*All news items are shown as a list*

- subheader: main{{< br >}}
*News page and science updates page are shown in the submenu*

Every news and science updates item has its own folder under community > news > news or community > news > science_updates
Also it has its own header:

- date: "2019-10-10T00:00:00+00:00"{{< br >}}
*Date of the item*

- title: 'The Open Force Field 1.0 small molecule force field, our first optimized force field (codename "Parsley")'{{< br >}}
*Title of the item*

- tags: ["website", "news", "smirnoff", "optimization"]{{< br >}}
*Tags of the item*

- categories: ["news"]{{< br >}}
*Category of the item*

- draft: false{{< br >}}
*If the item is visible or not (draft true or false)*

- hidden: true # if true, will render to the specified slug, but won't be included in News list{{< br >}}
*Hidden: to make an item visible or hidden from the overview*

- description: 'At the end of our first year, the Open Force Field Consortium releases its first optimized force field: the Open Force Field 1.0 (codename "Parsley") small molecule force field'{{< br >}}
*Description of the item*

- weight: 10{{< br >}}
*Position of the item in the list*

- author: "David Mobley, Yudong Qiu, Simon Boothroyd, Lee-Ping Wang, and John Chodera"{{< br >}}
*Authors of the item*

- markup: mmark # mmark is necessary for LaTeX to work properly{{< br >}}
*For use of markdown with LaTeX*

- thumb: "5-The-Open-Force-Field-1.0-small-molecule-force-field,-our-first-optimized-force-field-(codename-_Parsley_).jpg"{{< br >}}
*Thumb image used with the item, the images are in the same folder as the items*
{{< br >}}{{< br >}}
## Data
The data page is orange and is for the test a standard page
{{< br >}}{{< br >}}
## Force-fields > Force-fields
The images next to each version of the force fields go into the ‘img’ folder in the force fields folder.
In the header the class: small-images is to show images next to the text
{{< br >}}{{< br >}}
## Force-fields > Versioning
A standard page. If no color is given in the header it will default to dark blue
{{< br >}}{{< br >}}
## Minutes > CAB
Pages with the CAB minutes. Each minute has its own .md file
{{< br >}}{{< br >}}
## Minutes > IAB
Pages with the IAB minutes. Each minute has its own .md file
{{< br >}}{{< br >}}
## Science > Collaboratives Projects
A standard page with one special element in the header:
Class: colour-footer.
The footer in science is grey instead of the standard dark blue.
{{< br >}}{{< br >}}
## Science > Publications
A standard page with one special element in the header:
- Class: colour-footer.{{< br >}}
*The footer in science is grey instead of the standard dark blue.
All publications are in data > publications
The images used in the publications are in the ‘img’ folder.*

The separate publications have the following settings:
- title: "Systematic Optimization of Water Models Using Liquid/Vapor Surface Tension Data"{{< br >}}
*Title of the publication*

- authors: "Yudong Qiu, Paul S. Nerenberg, Teresa Head-Gordon, Lee-Ping Wang"{{< br >}}
*Authors of the publication*

- summary: This work investigates whether experimental surface tension measurements, which are less sensitive to quantum and self-polarization corrections, are able to replace the usual reliance on the heat of vaporization as experimental reference data for fitting force field models of molecular liquids.{{< br >}}
*Summary of the publication*

- img: LPW_Chemrxiv_20190423.png{{< br >}}
*Image next to the publication*

- date: 2019-04-26 (nothing is being done with this at the moment){{< br >}}
*Date of the publication*

- preprint:{{< br >}}
server: chemRxiv{{< br >}}
url: https://chemrxiv.org/articles/{{< br >}}}
Systematic_Optimization_of_Water_Models_Using_Liquid_Vapor_Surface_Tension_Data/8016293/1{{< br >}}
*URL and server of the preprint*

- license: "CC BY 4.0"{{< br >}}
*License of the publication (you can fill in any copyright license, it is not connected to the license in the settings)*

- date: 2019-04-23{{< br >}}
*Date of the preprint (nothing is being done with this at the moment)*

- code: leeping/forcebalance{{< br >}}
*Link to the code of the publication*
{{< br >}}{{< br >}}
## Science > Research
In the header the numbered bullet points can be adjusted:
- title: "Biopolymers",{{< br >}}
*Title of the bullet point*

- description: "Extend the SMIRNOFF typing scheme to produce fully consistent comprehensive biomolecular force fields (including biopolymers such as proteins and nucleic acids, lipids, carbohydrates, and other biomolecules).",{{< br >}}
*Description of the bullet point*

- number: "2"{{< br >}}
*Number next to the bullet point*
{{< br >}}{{< br >}}
## Software
A standard page with the color lighblue in the header.
{{< br >}}{{< br >}}
## Data
In the ‘data’ folder the sub items of publications, team members, roadmap and webinars can be adjusted. Read the content description for more information
{{< br >}}{{< br >}}
## Themes
In the themes folder the folder openff can be found. In here the looks and feels of most of the openff website is being created.
Under Assets > SASS the sass files can be adjusted similar as adjusting CSS.
Under layouts > shortcodes all the the shortcodes can be found. Shortcodes is to create certain automated blocks in the Hugo website.
Under Static the folders img and fonts can be found. In the img folder the icons for the footer can be found and the openff logo used in the website.
{{< br >}}{{< br >}}
## List Shortcode
The list shortcode can be used to display lists where data is filled with yaml files in the data folder.{{< br >}}

The following attributes can be used:
- src: mandatory: name of the data folder
- title: name of the field in the data that should be treated as title
- subtitle, intro, extra, preprint, published, code (github link) are all similar to title
- foldopen: if provided this field will be behind a read more link
- filter: name of field that is used by javascript filter. This filter can be set in the header. See team.
- settings: list for extra settings. Currently only: "always-image". If set, this will provide a placeholder image if no image is set.
- columns: if 2 columns, split list in two column layout.
- exclude: used by filter to ignore specific values on filter field.
- ignore: list of fields to ignore even if provided in the data
- class: extra class for list layout.
  {{< br >}}{{< br >}}

In the data you can also use the fields:
- twitter, github, linkedin, zenodo, ORCID, webpage, google_scholar, youtube, img
{{< br >}}{{< br >}}
## Footer
Footer content has a separate folder in the content folder. There are 5 sections: left, column1, column2, column3 and right. The columns have a menu structure and the left and right have different contents that allow for icons.



{{< br >}}{{< br >}}
