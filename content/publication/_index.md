---
title: Publications
cms_exclude: true

# View.
# view: citation

# # Optional header image (relative to `static/media/` folder).
# banner:
#   caption: ''
#   image: ''
sections:
  - block: collection
    content:
      title: Conference Proceedings
      filters:
        folders:
          - publication/CONF*
      sort_by: 'Date'
      sort_ascending: false
    design:
      columns: '2'
      view: citation

  - block: collection
    content:
      title: Peer-Reviewed Journals
      filters:
        folders:
          - publication/journal-article
      sort_by: 'Date'
      sort_ascending: false
    design:
      columns: '2'
      view: citation

  - block: collection
    content:
      title: Book Chapters
      filters:
        folders:
          - publication/book
      sort_by: 'Date'
      sort_ascending: false
    design:
      columns: '2'
      view: citation

---
