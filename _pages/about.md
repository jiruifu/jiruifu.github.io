---
permalink: /
title: "About Me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I received my Ph.D. degree at the University of Central Florida working at the Wearable Engineering and Assistive Robotics (WEAR) Laboratory under Dr. Joon-Hyuk Park. My research focuses on **developing wearable robots to assist and enhance human physical performance**. Recent advancements in sensors, electronics, materials, and power sources have paved the way for innovative wearable robots designed to aid, enable, or augment human activities. Despite these advancements, several challenges still hinder the effectiveness and practicality of current wearable robots. Fundamental questions remain unanswered: How can we create wearable robots that are both effective and user-friendly? How can we develop human-centric wearable robots that incorporate the human element into their control systems? How can we ensure the safety of subjects while developing novel wearable robots? During my Ph.D. training, my major research projects focused on developing a myoelectric bilateral cable-driven exosuit for bilateral upper body augmentation and investigating the implementation of deep reinforcement learning in a predictive neuromusculoskeletal simulator.

Design and Validation of an Innovative Cable-Driven Upper Body Exosuit (CUBE)
======
My research on designing and validating an exosuit has focused on bilateral upper body augmentation and rehabilitation, incorporating a cable-driven system and a myoelectric control system. 

Upper limb exoskeletons are widely used to prevent work-related musculoskeletal disorders (WMSDs) in daily and industrial activities. However, they are often bulky, require precise alignment with biological joints, and suffer from high inertia due to rigid linkages, limiting their adoption. To address these issues, upper limb exosuits have been developed, but most current models provide only single-degree-of-freedom and unilateral assistance or rehabilitation. Their control schemes, typically compensates the interactive force measured by force sensor, fail to integrate seamlessly with the user’s movements. During my doctoral training, I focused on designing and validating a more versatile upper limb Exosuit controlled by the user's movement intentions.

![CUBE Exosuit](/images/CUBE.png)

In this project, my research sought to answer these fundamental questions: (i) How can we facilitate efficient human-machine interactions of wearable robots to maximize the benefits? (ii) What needs to be implemented to design and control a human-centric wearable robot in order to make it more adaptive and intelligent in response to changes in the user-, task- and environment-specific parameters? To address these questions, I developed the mechanical and electrical system of a modular four-degrees-of-freedom bilateral cable-driven upper body exosuit (CUBE) with minimally rigid architecture to develop. I also developed the software system of the CUBE exosuit on the LabVIEW. Besides, the CUBE incorporated on-board surface electromyography (sEMG) sensors to detect the human’s motion intention and implements proportional myoelectric control system to ensure real-time control through human’s motion intention with a limited computational cost. Furthermore, I designed the experimental protocol to validate the CUBE exosuit under the pick-and-place task with forearm and eye-level screwing task, the human-subject research included 30 subject which is still ongoing.

Getting started
======
1. Register a GitHub account if you don't have one and confirm your e-mail (required!)
1. Fork [this repository](https://github.com/academicpages/academicpages.github.io) by clicking the "fork" button in the top right. 
1. Go to the repository's settings (rightmost item in the tabs that start with "Code", should be below "Unwatch"). Rename the repository "[your GitHub username].github.io", which will also be your website's URL.
1. Set site-wide configuration and create content & metadata (see below -- also see [this set of diffs](http://archive.is/3TPas) showing what files were changed to set up [an example site](https://getorg-testacct.github.io) for a user with the username "getorg-testacct")
1. Upload any files (like PDFs, .zip files, etc.) to the files/ directory. They will appear at https://[your GitHub username].github.io/files/example.pdf.  
1. Check status by going to the repository settings, in the "GitHub pages" section

Site-wide configuration
------
The main configuration file for the site is in the base directory in [_config.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_config.yml), which defines the content in the sidebars and other site-wide features. You will need to replace the default variables with ones about yourself and your site's github repository. The configuration file for the top menu is in [_data/navigation.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_data/navigation.yml). For example, if you don't have a portfolio or blog posts, you can remove those items from that navigation.yml file to remove them from the header. 

Create content & metadata
------
For site content, there is one markdown file for each type of content, which are stored in directories like _publications, _talks, _posts, _teaching, or _pages. For example, each talk is a markdown file in the [_talks directory](https://github.com/academicpages/academicpages.github.io/tree/master/_talks). At the top of each markdown file is structured data in YAML about the talk, which the theme will parse to do lots of cool stuff. The same structured data about a talk is used to generate the list of talks on the [Talks page](https://academicpages.github.io/talks), each [individual page](https://academicpages.github.io/talks/2012-03-01-talk-1) for specific talks, the talks section for the [CV page](https://academicpages.github.io/cv), and the [map of places you've given a talk](https://academicpages.github.io/talkmap.html) (if you run this [python file](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.py) or [Jupyter notebook](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.ipynb), which creates the HTML for the map based on the contents of the _talks directory).

**Markdown generator**

I have also created [a set of Jupyter notebooks](https://github.com/academicpages/academicpages.github.io/tree/master/markdown_generator
) that converts a CSV containing structured data about talks or presentations into individual markdown files that will be properly formatted for the Academic Pages template. The sample CSVs in that directory are the ones I used to create my own personal website at stuartgeiger.com. My usual workflow is that I keep a spreadsheet of my publications and talks, then run the code in these notebooks to generate the markdown files, then commit and push them to the GitHub repository.

How to edit your site's GitHub repository
------
Many people use a git client to create files on their local computer and then push them to GitHub's servers. If you are not familiar with git, you can directly edit these configuration and markdown files directly in the github.com interface. Navigate to a file (like [this one](https://github.com/academicpages/academicpages.github.io/blob/master/_talks/2012-03-01-talk-1.md) and click the pencil icon in the top right of the content preview (to the right of the "Raw | Blame | History" buttons). You can delete a file by clicking the trashcan icon to the right of the pencil icon. You can also create new files or upload files by navigating to a directory and clicking the "Create new file" or "Upload files" buttons. 

Example: editing a markdown file for a talk
![Editing a markdown file for a talk](/images/editing-talk.png)

For more info
------
More info about configuring Academic Pages can be found in [the guide](https://academicpages.github.io/markdown/). The [guides for the Minimal Mistakes theme](https://mmistakes.github.io/minimal-mistakes/docs/configuration/) (which this theme was forked from) might also be helpful.
