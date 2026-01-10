# Personal Research Website

A clean, modern static website to showcase your research projects and CV, similar to [senli1073.github.io](https://senli1073.github.io/).

## Features

- **Home Page**: Welcome page with banner, profile photo, and quick links to main sections
- **Research Page**: Display of your research projects with images and brief descriptions
- **Project Detail Pages**: Click on any project to view detailed information
- **Publications Page**: List of your academic publications and papers
- **Awards Page**: Showcase of your honors and recognitions
- **CV Link**: Direct link to your CV PDF that opens in a new tab
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Clean Navigation**: Banner with "HOME", "RESEARCH", "PUBLICATIONS", "AWARDS", and "CV" links

## Setup Instructions

### 1. Add Your Images

Place your images in the following locations:

- **Banner Image**: `assets/img/banner.jpg`
  - This will be displayed at the top of the homepage
  
- **Your Photo**: `assets/img/photo.jpg`
  - This will be displayed as a circular profile image
  - Recommended size: 400x400px or square aspect ratio

- **Project Images**: `assets/img/projects/`
  - Place your project images here (e.g., `project1.jpg`, `project2.jpg`, `project3.jpg`)
  - Recommended size: 800x600px or similar aspect ratio

### 2. Add Your CV

Place your CV PDF file in the root directory and name it `cv.pdf`:
- The CV link in the navigation will automatically link to this file
- It will open in a new tab when clicked

### 3. Customize Content

#### Edit the Homepage (`index.html`)

Update the welcome section in `index.html`:
- Change the welcome text and introduction
- Update your name in the footer (across all pages)
- Modify the quick links section if needed

#### Edit the Research Page (`research.html`)

Update the project cards in `research.html`:
- Change project titles
- Update project descriptions
- Add or remove project cards as needed
- Update the number of projects to match your actual projects

#### Edit Project Detail Pages (`research/project1.html`, etc.)

For each project detail page:
- Update the title
- Change the image path if using different filenames
- Write detailed descriptions about your research
- Add sections for Background, Methodology, Results, Publications, etc.
- Remove or add sections as needed

#### Edit Publications Page (`publications.html`)

The publications page automatically loads publications from BibTeX files. You have two options:

**Option 1: Use BibTeX Files (Recommended)**
- Edit `assets/bib/journal.bib` for peer-reviewed journal articles
- Edit `assets/bib/conference.bib` for conference proceedings
- The page will automatically parse and display publications from these files
- Publications are sorted by year (newest first)
- Supported BibTeX fields:
  - `title`, `author`, `year` (required)
  - `journal`, `booktitle`, `volume`, `number`, `pages` (for venue)
  - `url`, `doi`, `code`, `slides` (for links)
  - `abstract` (for description)

**Option 2: Manual HTML (if you prefer)**
- You can manually edit `publications.html` and add publication items directly
- Remove the script tag and add your publications manually

**BibTeX Format Example:**
```bibtex
@article{key2024,
  title={Your Paper Title},
  author={Your Name and Co-Author},
  journal={Journal Name},
  volume={10},
  number={3},
  pages={123--145},
  year={2024},
  doi={10.1000/example},
  url={https://example.com/paper},
  code={https://github.com/example/code},
  abstract={Your abstract here.}
}
```

#### Edit Awards Page (`awards.html`)

Update your awards:
- Add or remove award items
- Update award names, organizations, and years
- Include descriptions of what each award recognizes

#### Update Footer

Edit the footer in all HTML files to include your name:
```html
<p>&copy; 2024 Your Name. All rights reserved.</p>
```

### 4. Add or Remove Projects

To add a new project:

1. Add a new project card to `research.html` in the projects grid:
```html
<div class="project-card">
    <a href="research/project4.html" class="project-link">
        <div class="project-image">
            <img src="assets/img/projects/project4.jpg" alt="Project 4">
        </div>
        <div class="project-content">
            <h2>Project Title 4</h2>
            <p>Brief description of your project.</p>
        </div>
    </a>
</div>
```

2. Create a new detail page `research/project4.html` (copy from an existing project page template)

3. Add the project image `assets/img/projects/project4.jpg`

To remove a project, simply delete the project card from `index.html` and the corresponding detail page from the `research/` folder.

## File Structure

```
.
├── index.html              # Homepage
├── research.html           # Research page with project cards
├── publications.html       # Publications page
├── awards.html             # Awards page
├── cv.pdf                  # Your CV (add this file)
├── README.md               # This file
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   └── bibtex-parser.js # BibTeX parser for publications
│   ├── bib/
│   │   ├── journal.bib     # Journal publications (BibTeX format)
│   │   └── conference.bib   # Conference publications (BibTeX format)
│   └── img/
│       ├── banner.jpg      # Add your banner image
│       ├── photo.jpg       # Add your photo
│       └── projects/
│           ├── project1.jpg  # Add your project images
│           ├── project2.jpg
│           └── project3.jpg
└── research/
    ├── project1.html       # Project 1 detail page
    ├── project2.html       # Project 2 detail page
    └── project3.html       # Project 3 detail page
```

## Deployment

### GitHub Pages

1. Push your repository to GitHub
2. Go to your repository settings
3. Navigate to "Pages" section
4. Select the branch (usually `main` or `master`)
5. Select the folder (usually `/ (root)`)
6. Your site will be available at `https://yourusername.github.io/repository-name/`

### Local Testing

You can test the website locally by opening `index.html` in a web browser, or by using a simple HTTP server:

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server installed)
npx http-server
```

Then open `http://localhost:8000` in your browser.

## Customization

### Colors

To change the color scheme, edit the CSS variables and color values in `assets/css/style.css`:

- Navigation active color: `#2c5aa0`
- Text colors: `#333`, `#666`, `#444`
- Background colors: `#fff`, `#f8f8f8`

### Fonts

The website uses serif fonts (Georgia, Times New Roman) for a academic feel. To change fonts, edit the `font-family` property in `assets/css/style.css`.

### Layout

All layout adjustments can be made in `assets/css/style.css`. The website uses a responsive grid layout that adapts to different screen sizes.

## Browser Support

This website works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Customize as needed for your personal website.

