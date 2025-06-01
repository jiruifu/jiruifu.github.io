---
title: Research Papers
cms_exclude: true

# View.
view: citation

sections:
  - block: collection
    content:
      title: Conference Papers
      filters:
        folders:
          - ./papers/conference
      sort_by: 'Date'
      sort_ascending: false
    design:
      columns: '1'
      view: citation

  - block: collection
    content:
      title: Book Chapters
      filters:
        folders:
          - ./papers/book_chapter
      sort_by: 'Date'
      sort_ascending: false
    design:
      columns: '1'
      view: citation

  - block: collection
    content:
      title: Peer-Reviewed Journals
      filters:
        folders:
          - ./papers/journal
      sort_by: 'Date'
      sort_ascending: false
    design:
      columns: '1'
      view: citation

---
