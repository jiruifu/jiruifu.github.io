---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

<div class="cv-container">
  <div class="section-title">
    <h2>Curriculum Vitae</h2>
    <p class="download-text">
      <i class="fas fa-download"></i> 
      <a href="{{ site.baseurl }}/assets/files/CV.pdf" target="_blank">Download PDF Version</a>
    </p>
  </div>

  <div class="pdf-container">
    <embed 
      src="{{ site.baseurl }}/assets/files/CV.pdf" 
      type="application/pdf" 
      width="100%" 
      height="100%" 
    />
  </div>

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

  .section-title {
    text-align: center;
    margin-bottom: 30px;
  }

  .section-title h2 {
    color: #333;
    margin-bottom: 10px;
  }

  .download-text {
    color: #666;
    font-size: 1.1em;
  }

  .download-text i {
    margin-right: 5px;
  }

  .pdf-container {
    position: relative;
    width: 100%;
    height: 80vh;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .pdf-container embed {
    position: absolute;
    top: 0;
    left: 0;
    border: none;
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
      height: 70vh;
    }
    
    .fallback-message li {
      display: block;
      margin: 10px 0;
    }
  }
</style>
