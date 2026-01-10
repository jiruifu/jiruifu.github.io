# BibTeX Files for Publications

This directory contains BibTeX files that are automatically parsed and displayed on the Publications page.

## Files

- **journal.bib** - Peer-reviewed journal articles
- **conference.bib** - Conference proceedings

## Usage

Simply edit these `.bib` files with your publications in BibTeX format. The website will automatically:
- Parse the BibTeX entries
- Format them for display
- Sort by year (newest first)
- Display them in the appropriate subsections

## BibTeX Entry Format

### Journal Article Example:
```bibtex
@article{key2024,
  title={Your Paper Title},
  author={Your Name and Co-Author One and Co-Author Two},
  journal={Journal Name},
  volume={42},
  number={3},
  pages={123--145},
  year={2024},
  doi={10.1000/example123},
  url={https://example.com/paper},
  abstract={Your abstract or description here.}
}
```

### Conference Paper Example:
```bibtex
@inproceedings{key2024,
  title={Your Conference Paper Title},
  author={Your Name and Co-Author},
  booktitle={Proceedings of Conference Name (Abbreviation)},
  pages={789--801},
  year={2024},
  url={https://example.com/paper},
  code={https://github.com/example/code},
  slides={https://example.com/slides},
  abstract={Your abstract or description here.}
}
```

## Supported Fields

- **Required**: `title`, `author`, `year`
- **Venue**: `journal` (for articles), `booktitle` (for conferences), `volume`, `number`, `pages`
- **Links**: `url`, `doi`, `code`, `slides`
- **Description**: `abstract` or `note`

## Notes

- The first author in the `author` field will be automatically bolded
- Publications are automatically sorted by year (newest first)
- LaTeX commands in titles and abstracts are automatically cleaned
- Multiple authors should be separated by ` and ` (with spaces)

