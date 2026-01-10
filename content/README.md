# Content Files (Markdown)

This directory contains Markdown files that are automatically loaded and rendered on the website. Edit these files to update your content without modifying HTML.

## Files Structure

```
content/
├── introduction.md          # Your self-introduction (loaded on homepage)
└── projects/
    ├── project1.md         # Project 1 description (loaded in project card)
    ├── project2.md         # Project 2 description (loaded in project card)
    └── project3.md         # Project 3 description (loaded in project card)
```

## How It Works

1. **Introduction**: The `introduction.md` file is automatically loaded into the introduction section on the homepage.
   - Edit `content/introduction.md` to update your introduction
   - Supports full Markdown syntax

2. **Project Descriptions**: Each project card loads its description from the corresponding markdown file.
   - `project1.md` → Project 1 card
   - `project2.md` → Project 2 card
   - `project3.md` → Project 3 card
   - Only the first paragraph is shown in the card preview

3. **Detail Pages**: You can also load markdown content in project detail pages (`research/project1.html`, etc.) by adding the markdown loader script.

## Markdown Syntax Support

All standard Markdown features are supported:

- **Headers**: `# H1`, `## H2`, `### H3`, etc.
- **Bold**: `**bold text**`
- **Italic**: `*italic text*`
- **Links**: `[text](url)`
- **Lists**: 
  - Unordered: `- item`
  - Ordered: `1. item`
- **Code**: `` `code` `` or code blocks
- **Blockquotes**: `> quote`
- **Horizontal rules**: `---`

## Examples

### Introduction Format

```markdown
# Your Name

Brief introduction about yourself. Describe your background, research interests, and current position.

## Contact

**Email:** [your.email@example.com](mailto:your.email@example.com)

## Education

- **Ph.D.,** Field of Study, University Name, Year - Present
- **M.S.,** Field of Study, University Name, Year - Year
```

### Project Description Format

```markdown
Brief description of your research project. This section provides an overview of the project's goals, methodology, and key findings.

## Key Features

- Feature 1
- Feature 2

## Impact

Describe the significance and impact of this work.
```

## Adding New Projects

1. Create a new markdown file: `content/projects/project4.md`
2. Add the project card to `index.html` with the corresponding container ID:
   ```html
   <div id="project4-description" class="project-description">
       <div class="loading-message">Loading description...</div>
   </div>
   ```
3. Update the markdown loader to include the new project in `loadProjectMarkdown()` function.

## Notes

- The markdown files are loaded automatically when the page loads
- Changes to markdown files will be reflected immediately after refreshing the page
- The markdown parser (marked.js) is loaded from CDN
- All markdown content is styled with consistent CSS
- Links in markdown will open in the same tab (add `target="_blank"` in HTML if needed)


