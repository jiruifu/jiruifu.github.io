/**
 * Simple BibTeX Parser for JavaScript
 * Parses BibTeX files and converts them to JavaScript objects
 */

class BibTeXParser {
    constructor() {
        this.entries = [];
    }

    /**
     * Parse a BibTeX string
     * @param {string} bibtex - The BibTeX content as a string
     * @returns {Array} Array of parsed entries
     */
    parse(bibtex) {
        this.entries = [];
        
        // Remove comments
        bibtex = bibtex.replace(/@comment\s*\{[^}]*\}/gi, '');
        
        // Find all @ entries
        const entryRegex = /@(\w+)\s*\{([^,]+),\s*([\s\S]*?)(?=@\w+\s*\{|$)/g;
        let match;
        
        while ((match = entryRegex.exec(bibtex)) !== null) {
            const entryType = match[1].toLowerCase();
            const entryKey = match[2].trim();
            const entryContent = match[3].trim();
            
            const entry = {
                type: entryType,
                key: entryKey,
                fields: this.parseFields(entryContent)
            };
            
            this.entries.push(entry);
        }
        
        return this.entries;
    }

    /**
     * Parse fields from BibTeX entry content
     * @param {string} content - The content between braces
     * @returns {Object} Object with field names as keys
     */
    parseFields(content) {
        const fields = {};
        
        // Remove outer braces if present
        content = content.trim();
        if (content.startsWith('{') && content.endsWith('}')) {
            content = content.slice(1, -1).trim();
        }
        
        // More robust field parsing that handles nested braces
        let pos = 0;
        while (pos < content.length) {
            // Find field name
            const nameMatch = content.substring(pos).match(/^\s*(\w+)\s*=\s*/);
            if (!nameMatch) break;
            
            const fieldName = nameMatch[1].trim().toLowerCase();
            pos += nameMatch[0].length;
            
            // Find field value
            let fieldValue = '';
            let braceDepth = 0;
            let inQuotes = false;
            let startPos = pos;
            
            while (pos < content.length) {
                const char = content[pos];
                
                if (char === '"' && (pos === 0 || content[pos - 1] !== '\\')) {
                    inQuotes = !inQuotes;
                } else if (!inQuotes) {
                    if (char === '{') {
                        braceDepth++;
                    } else if (char === '}') {
                        braceDepth--;
                    } else if (char === ',' && braceDepth === 0) {
                        // End of field
                        fieldValue = content.substring(startPos, pos).trim();
                        pos++; // Skip comma
                        break;
                    }
                }
                pos++;
            }
            
            // If we reached the end, get the remaining value
            if (pos >= content.length) {
                fieldValue = content.substring(startPos).trim();
            }
            
            // Clean up the value
            fieldValue = this.cleanFieldValue(fieldValue);
            fields[fieldName] = fieldValue;
        }
        
        return fields;
    }

    /**
     * Clean and format a field value
     * @param {string} value - Raw field value
     * @returns {string} Cleaned value
     */
    cleanFieldValue(value) {
        if (!value) return '';
        
        value = value.trim();
        
        // Remove outer braces
        if (value.startsWith('{') && value.endsWith('}')) {
            value = value.slice(1, -1).trim();
        }
        
        // Remove quotes
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1).trim();
        }
        
        // Handle concatenation with #
        value = value.replace(/\s*#\s*/g, ' ');
        
        // Clean up LaTeX commands
        value = this.cleanLaTeX(value);
        
        return value;
    }

    /**
     * Clean LaTeX commands from text
     * @param {string} text - Text with LaTeX commands
     * @returns {string} Cleaned text
     */
    cleanLaTeX(text) {
        // Remove common LaTeX commands
        text = text.replace(/\\[a-z]+\{([^}]+)\}/gi, '$1');
        text = text.replace(/\\&/g, '&');
        text = text.replace(/\\%/g, '%');
        text = text.replace(/\\_/g, '_');
        text = text.replace(/\\\{/g, '{');
        text = text.replace(/\\\}/g, '}');
        text = text.replace(/\\text\{([^}]+)\}/gi, '$1');
        text = text.replace(/\\textbf\{([^}]+)\}/gi, '$1');
        text = text.replace(/\\textit\{([^}]+)\}/gi, '$1');
        text = text.replace(/\\emph\{([^}]+)\}/gi, '$1');
        
        return text.trim();
    }

    /**
     * Format author names for plain bibliography
     * @param {string} authors - Author string
     * @returns {string} Formatted authors (HTML with bold for first author)
     */
    formatAuthors(authors) {
        if (!authors) return '';
        
        // Split by 'and'
        const authorList = authors.split(/\s+and\s+/i).map(a => a.trim());
        
        // Bold the first author (assuming it's you)
        // You can customize this logic
        return authorList.map((author, index) => {
            if (index === 0) {
                return `<strong>${author}</strong>`;
            }
            return author;
        }).join(', ');
    }

    /**
     * Format a publication entry for display
     * @param {Object} entry - Parsed BibTeX entry
     * @returns {Object} Formatted entry object
     */
    formatEntry(entry) {
        const fields = entry.fields;
        
        // Determine title
        const title = fields.title || 'Untitled';
        
        // Format authors
        const authors = this.formatAuthors(fields.author);
        
        // Format venue for bibliography style: Journal Name, Year
        let venue = '';
        const year = fields.year || '';
        
        if (entry.type === 'article') {
            venue = fields.journal || '';
            if (fields.volume && fields.number) {
                venue += `, Vol. ${fields.volume}, No. ${fields.number}`;
            } else if (fields.volume) {
                venue += `, Vol. ${fields.volume}`;
            }
            if (fields.pages) venue += `, pp. ${fields.pages}`;
            if (year) venue += `, ${year}`;
        } else if (entry.type === 'inproceedings' || entry.type === 'conference') {
            venue = fields.booktitle || fields.journal || '';
            if (fields.pages) venue += `, pp. ${fields.pages}`;
            if (year) venue += `, ${year}`;
        } else if (year) {
            venue = year;
        }
        
        // Links
        const links = {};
        if (fields.url) links.paper = fields.url;
        if (fields.doi) links.doi = `https://doi.org/${fields.doi}`;
        if (fields.code) links.code = fields.code;
        if (fields.slides) links.slides = fields.slides;
        
        // Abstract
        const abstract = fields.abstract || fields.note || '';
        
        return {
            title: title,
            authors: authors,
            venue: venue,
            year: year,
            links: links,
            abstract: abstract,
            type: entry.type,
            key: entry.key
        };
    }
}

/**
 * Load and parse BibTeX files
 * @param {string} filePath - Path to the BibTeX file
 * @returns {Promise<Array>} Promise that resolves to array of formatted entries
 */
async function loadBibTeX(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
        }
        const bibtex = await response.text();
        
        const parser = new BibTeXParser();
        const entries = parser.parse(bibtex);
        
        return entries.map(entry => parser.formatEntry(entry));
    } catch (error) {
        console.error(`Error loading BibTeX file ${filePath}:`, error);
        return [];
    }
}

/**
 * Render publications to the DOM as plain bibliography
 * @param {Array} publications - Array of formatted publication objects
 * @param {string} containerId - ID of the container element
 */
function renderPublications(publications, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }
    
    // Sort by year (newest first)
    publications.sort((a, b) => {
        const yearA = parseInt(a.year) || 0;
        const yearB = parseInt(b.year) || 0;
        return yearB - yearA;
    });
    
    container.innerHTML = '';
    
    publications.forEach((pub, index) => {
        const pubElement = document.createElement('div');
        pubElement.className = 'bibliography-item';
        
        // Build links
        let linksHTML = '';
        if (pub.links.paper) {
            linksHTML += `<a href="${pub.links.paper}" class="bib-link" target="_blank">[Paper]</a>`;
        }
        if (pub.links.code) {
            linksHTML += `<a href="${pub.links.code}" class="bib-link" target="_blank">[Code]</a>`;
        }
        if (pub.links.slides) {
            linksHTML += `<a href="${pub.links.slides}" class="bib-link" target="_blank">[Slides]</a>`;
        }
        if (pub.links.doi) {
            linksHTML += `<a href="${pub.links.doi}" class="bib-link" target="_blank">[DOI]</a>`;
        }
        
        // Format as plain bibliography: Authors. Title. Venue. [Links]
        let bibText = '';
        bibText += `${pub.authors}. `;
        bibText += `${pub.title}. `;
        if (pub.venue) {
            bibText += `${pub.venue}`;
            if (!pub.venue.endsWith('.')) {
                bibText += '.';
            }
            bibText += ' ';
        }
        
        // Create the paragraph element with text content first, then add links
        const textNode = document.createTextNode(bibText);
        const para = document.createElement('p');
        para.className = 'bibliography-text';
        para.appendChild(textNode);
        
        // Add links after the text
        if (linksHTML) {
            const tempDiv = document.createElement('span');
            tempDiv.innerHTML = linksHTML;
            while (tempDiv.firstChild) {
                para.appendChild(tempDiv.firstChild);
            }
        }
        
        pubElement.appendChild(para);
        container.appendChild(pubElement);
    });
}

/**
 * Initialize publications - can be called from any page
 */
async function initPublications() {
    // Load journal publications
    const journals = await loadBibTeX('assets/bib/journal.bib');
    renderPublications(journals, 'journal-publications');
    
    // Load conference publications
    const conferences = await loadBibTeX('assets/bib/conference.bib');
    renderPublications(conferences, 'conference-publications');
}

// Auto-initialize when DOM is ready if containers exist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('journal-publications') || document.getElementById('conference-publications')) {
            initPublications();
        }
    });
} else {
    if (document.getElementById('journal-publications') || document.getElementById('conference-publications')) {
        initPublications();
    }
}

