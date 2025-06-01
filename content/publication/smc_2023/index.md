---
title: 'Deep Reinforcement Learning Based Upper Limb Neuromusculoskeletal Simulator for Modelling Human Motor Control'

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here
# and it will be replaced with their full name and linked to their profile.
authors:
  - Jirui Fu
  - Renoa Choudhury
  - Joon-Hyuk Park

# Author notes (optional)
# author_notes:
#   - 'First Author'
#   - 'Second Author'
#   - 'Corresponding Author'

date: '2013-07-01T00:00:00Z'
doi: 'doi.org/10.1109/SMC53992.2023.10394268'

# Schedule page publish date (NOT publication's date).
publishDate: '2024-01-29'

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ['paper-conference']

# Publication name and optional abbreviated publication name.
publication: In *2023 IEEE International Conference on Systems, Man, and Cybernetics (SMC)*
publication_short: In *IEEE SMC 2023*

abstract: The neuromusculoskeletal modeling and simulator (NMMS) have been widely utilized in various fields and applications. The deep reinforcement learning (DRL) algorithm is a promising method to study human motor controls and movement biomechanics via NMMS without experimental data. However, existing research lacks exploration of the DRL implementation for controlling neuromusculoskeletal simulators, and only a few have presented myoelectric control systems applied to the DRL-based NMMS. In this work, an off-policy DRL algorithm, Deep Deterministic Policy Gradient (DDPG), was implemented on an upper limb NMMS with two different types of action space - direct muscle activation output and PD-based internal model, and compared their control performance. In addition, we evaluated the performance of proportional myoelectric control systems implemented on the DRL-based upper limb NMMS. The results indicate that the DRL-based NMMS can execute upper limb movements accurately, and the proportional myoelectric control system reduced the muscle activation under both types of action space. Moreover, the PD-based internal model action space shows better learning and error-tracking performance than the direct muscle activation output action space.

# # Summary. An optional shortened abstract.
# summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere tellus ac convallis placerat. Proin tincidunt magna sed ex sollicitudin condimentum.

# tags: []

# # Display this page in the Featured widget?
# featured: true

# # Custom links (uncomment lines below)
# # links:
# # - name: Custom Link
# #   url: http://example.org

# url_pdf: ''
# url_code: 'https://github.com/HugoBlox/hugo-blox-builder'
# url_dataset: 'https://github.com/HugoBlox/hugo-blox-builder'
# url_poster: ''
# url_project: ''
# url_slides: ''
# url_source: 'https://github.com/HugoBlox/hugo-blox-builder'
# url_video: 'https://youtube.com'

# # Featured image
# # To use, add an image named `featured.jpg/png` to your page's folder.
# image:
#   caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/pLCdAaMFLTE)'
#   focal_point: ''
#   preview_only: false

# # Associated Projects (optional).
# #   Associate this publication with one or more of your projects.
# #   Simply enter your project's folder or file name without extension.
# #   E.g. `internal-project` references `content/project/internal-project/index.md`.
# #   Otherwise, set `projects: []`.
# projects:
#   - example

# # Slides (optional).
# #   Associate this publication with Markdown slides.
# #   Simply enter your slide deck's filename without extension.
# #   E.g. `slides: "example"` references `content/slides/example/index.md`.
# #   Otherwise, set `slides: ""`.
# slides: example
---

{{% callout note %}}
Click the _Cite_ button above to demo the feature to enable visitors to import publication metadata into their reference management software.
{{% /callout %}}

{{% callout note %}}
Create your slides in Markdown - click the _Slides_ button to check out the example.
{{% /callout %}}

Add the publication's **full text** or **supplementary notes** here. You can use rich formatting such as including [code, math, and images](https://docs.hugoblox.com/content/writing-markdown-latex/).
