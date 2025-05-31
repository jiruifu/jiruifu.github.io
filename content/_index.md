---
# Leave the homepage title empty to use the site title
title:
date: 2022-10-24
type: landing

sections:
  - block: resume-biography
    content:
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
      text:
    design:
      css_class: dark
      background:
        color: black
        image:
          # Add your image background to `assets/media/`.
          filename: r_b1.webp
          filters:
            brightness: 0.4
          size: cover
          position: center
          parallax: false
  - block: stats
    content:
      items:
        - statistic: "12"
          description: |
            Publications
        - statistic: "90"
          description: |
            Citations
        - statistic: "3"
          description: |
            h-index
    design:
      # Section background color (CSS class)
      css_class: "bg-gray-100 dark:bg-gray-900"
      # Reduce spacing
      spacing:
        padding: [0, 0, 0, 0]
  - block: markdown
    content:
      title: 'Who Am I?'
      subtitle: ''
      text: |-
        I am a post-doctoral research scholar in the Department of Mechanical and Aerospace Engineering at the University of Central Florida, collaborating with Dr. Helen J. Huang and Dr. Yue Wen. My research encompasses three interconnected domains centered on neurorehabilitation: (1) neural machine interfaces utilizing high-density surface electromyography (HD-sEMG) for rehabilitation applications, (2) the development and implementation of rehabilitative wearable robotic systems, and (3) Mobile Brain/Body Imaging (MoBI) methodologies employing electroencephalography (EEG) to facilitate the control of rehabilitative devices.
    design:
      columns: '1'
  - block: collection
    content:
      title: Recent News
      subtitle: ''
      text: ''
      # Page type to display. E.g. post, talk, publication...
      page_type: post
      # Choose how many pages you would like to display (0 = all pages)
      count: 5
      # Filter on criteria
      filters:
        author: ""
        category: ""
        tag: ""
        exclude_featured: false
        exclude_future: false
        exclude_past: false
        publication_type: ""
      # Choose how many pages you would like to offset by
      offset: 0
      # Page order: descending (desc) or ascending (asc) date.
      order: desc
    design:
      # Choose a layout view
      view: date-title-summary
      # Reduce spacing
      spacing:
        padding: [0, 0, 0, 0]
---
