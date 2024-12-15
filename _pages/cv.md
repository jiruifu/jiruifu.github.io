---
layout: archive
title: ""
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

<div class="pdf-wrapper">
  <div class="pdf-controls">
    <button onclick="toggleFullScreen()" class="fullscreen-btn">
      <i class="fas fa-expand"></i>
      <span>Full Screen</span>
    </button>
  </div>
  
  <div class="pdf-container" id="pdfContainer">
    <embed 
      src="{{ site.baseurl }}/assets/files/CV.pdf" 
      type="application/pdf" 
      width="100%" 
      height="100%" 
      id="pdfEmbed"
    />
  </div>
</div>

<div class="cv-container">
  <p class="download-text">
    <i class="fas fa-download"></i> 
    <a href="{{ site.baseurl }}/assets/files/CV.pdf" target="_blank">Download PDF Version</a>
  </p>
  
  <div class="fallback-message">
    <p>If the PDF viewer doesn't load properly, you can:</p>
    <ul>
      <li><a href="{{ site.baseurl }}/assets/files/CV.pdf" target="_blank">Open in a new tab</a></li>
      <li><a href="{{ site.baseurl }}/assets/files/CV.pdf" download>Download directly</a></li>
    </ul>
  </div>
</div>

<style>
  .cv-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .pdf-wrapper {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  .pdf-controls {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10000;
  }

  .fullscreen-btn {
    background: rgba(42, 122, 226, 0.9);
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: all 0.3s ease;
    z-index: 10000;
  }

  .fullscreen-btn:hover {
    background: rgba(42, 122, 226, 1);
  }

  .fullscreen-btn i {
    font-size: 1em;
  }

  .pdf-container {
    position: relative;
    width: 100%;
    height: 75vh;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    background: white;
    margin-bottom: 20px;
  }

  .pdf-container.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    margin: 0;
    border: none;
    border-radius: 0;
  }

  .pdf-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  .download-text {
    color: #666;
    font-size: 1.1em;
  }

  .download-text i {
    margin-right: 5px;
  }

  .fallback-message {
    margin-top: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 4px;
    text-align: center;
  }

  .fallback-message ul {
    list-style: none;
    padding: 0;
    margin: 10px 0 0;
  }

  .fallback-message li {
    display: inline-block;
    margin: 0 15px;
  }

  .fallback-message a {
    color: #2a7ae2;
    text-decoration: none;
    font-weight: 500;
  }

  .fallback-message a:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 768px) {
    .pdf-container {
      height: 65vh;
    }
    
    .fallback-message li {
      display: block;
      margin: 10px 0;
    }
  }
</style>

<script>
function toggleFullScreen() {
  const container = document.getElementById('pdfContainer');
  const button = document.querySelector('.fullscreen-btn');
  const icon = button.querySelector('i');
  const text = button.querySelector('span');
  
  if (!container.classList.contains('fullscreen')) {
    container.classList.add('fullscreen');
    icon.classList.remove('fa-expand');
    icon.classList.add('fa-compress');
    text.textContent = 'Exit Full Screen';
    button.style.position = 'fixed';
    button.style.right = '10px';
    button.style.top = '10px';
    button.style.zIndex = '10000';
  } else {
    container.classList.remove('fullscreen');
    icon.classList.remove('fa-compress');
    icon.classList.add('fa-expand');
    text.textContent = 'Full Screen';
    button.style.position = 'absolute';
    button.style.zIndex = '100';
  }
}

// Add keyboard listener for ESC key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const container = document.getElementById('pdfContainer');
    if (container.classList.contains('fullscreen')) {
      toggleFullScreen();
    }
  }
});
</script>
