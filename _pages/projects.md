---
layout: archive
title: ""
permalink: /projects/
author_profile: true
---

<div class="research-container">
  <!-- Project 1 -->
  <div class="project-card">
    <div class="project-header" onclick="toggleProject('project1')">
      <h2>
        Cable-Driven Upper Body Exosuit (CUBE)
        <span class="expand-icon"><i class="fas fa-chevron-down"></i></span>
      </h2>
      <div class="project-tags">
        <span class="tag">Robotics</span>
        <span class="tag">Wearable Technology</span>
        <span class="tag">Human Augmentation</span>
      </div>
    </div>

    <div class="project-content" id="project1">
      <div class="project-image">
        <img src="/images/CUBE.png" alt="CUBE Exosuit" />
      </div>
      <div class="project-description">
        <h3>Overview</h3>
        <p>A novel bilateral upper body augmentation and rehabilitation system incorporating cable-driven mechanics and myoelectric control.</p>
        
        <h3>Key Innovations</h3>
        <ul>
          <li>Four-degrees-of-freedom bilateral design with minimally rigid architecture</li>
          <li>Real-time myoelectric control system using surface EMG sensors</li>
          <li>Comprehensive validation through human subject testing (30+ participants)</li>
        </ul>

        <div class="project-details">
          <h3>Detailed Description</h3>
          <p>[Detailed project description to be added]</p>
          
          <h3>Methods</h3>
          <p>[Research methods to be added]</p>
          
          <h3>Results</h3>
          <p>[Key findings and results to be added]</p>
          
          <h3>Publications</h3>
          <p>[Related publications to be added]</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Project 2 -->
  <div class="project-card">
    <div class="project-header" onclick="toggleProject('project2')">
      <h2>
        Deep Reinforcement Learning-based Auto-tuner
        <span class="expand-icon"><i class="fas fa-chevron-down"></i></span>
      </h2>
      <div class="project-tags">
        <span class="tag">AI/ML</span>
        <span class="tag">Neural Systems</span>
        <span class="tag">Biomechanics</span>
      </div>
    </div>

    <div class="project-content" id="project2">
      <div class="project-image">
        <img src="/images/DRL.png" alt="DRL System" />
      </div>
      <div class="project-description">
        <h3>Overview</h3>
        <p>An innovative approach to auto-tune the internal model of the human central nervous system using deep reinforcement learning.</p>

        <h3>Key Achievements</h3>
        <ul>
          <li>Developed neuromusculoskeletal simulation in Mujoco physics engine</li>
          <li>Implemented DDPG algorithm for internal model tuning</li>
          <li>Achieved superior accuracy and response time compared to conventional methods</li>
        </ul>

        <div class="project-details">
          <h3>Detailed Description</h3>
          <p>[Detailed project description to be added]</p>
          
          <h3>Methods</h3>
          <p>[Research methods to be added]</p>
          
          <h3>Results</h3>
          <p>[Key findings and results to be added]</p>
          
          <h3>Publications</h3>
          <p>[Related publications to be added]</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Project 3 -->
  <div class="project-card">
    <div class="project-header" onclick="toggleProject('project3')">
      <h2>
        Cable-driven Ankle Perturbation System
        <span class="expand-icon"><i class="fas fa-chevron-down"></i></span>
      </h2>
      <div class="project-tags">
        <span class="tag">Biomechanics</span>
        <span class="tag">Safety Systems</span>
        <span class="tag">Fall Prevention</span>
      </div>
    </div>

    <div class="project-content" id="project3">
      <div class="project-image">
        <img src="/images/FallFES.png" alt="Fall Prevention System" />
      </div>
      <div class="project-description">
        <h3>Overview</h3>
        <p>A sophisticated system designed to study fall mechanics through controlled slip and trip simulations.</p>

        <h3>Technical Features</h3>
        <ul>
          <li>FEA-validated protective frame design</li>
          <li>Dual-mode perturbation system (slip and trip simulation)</li>
          <li>Real-time gait segmentation using plantar pressure measurement</li>
        </ul>

        <div class="project-details">
          <h3>Detailed Description</h3>
          <p>[Detailed project description to be added]</p>
          
          <h3>Methods</h3>
          <p>[Research methods to be added]</p>
          
          <h3>Results</h3>
          <p>[Key findings and results to be added]</p>
          
          <h3>Publications</h3>
          <p>[Related publications to be added]</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .research-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .project-card {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.1);
    margin-bottom: 40px;
    overflow: hidden;
    transition: transform 0.3s ease;
  }

  .project-card:hover {
    transform: translateY(-5px);
  }

  .project-header {
    background: #f8f9fa;
    padding: 20px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .project-header:hover {
    background: #e9ecef;
  }

  .project-header h2 {
    margin: 0;
    color: #2a7ae2;
    font-size: 1.8em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .expand-icon {
    font-size: 0.6em;
    transition: transform 0.3s ease;
  }

  .expand-icon.rotate {
    transform: rotate(180deg);
  }

  .project-tags {
    margin-top: 10px;
  }

  .tag {
    display: inline-block;
    background: #e9ecef;
    padding: 4px 10px;
    border-radius: 15px;
    font-size: 0.9em;
    margin-right: 8px;
    color: #495057;
  }

  .project-content {
    display: none;
    padding: 20px;
    animation: fadeIn 0.5s ease;
  }

  .project-content.show {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .project-image {
    flex: 1;
    min-width: 300px;
  }

  .project-image img {
    width: 100%;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .project-description {
    flex: 2;
    min-width: 300px;
  }

  .project-description h3 {
    color: #343a40;
    margin-top: 0;
  }

  .project-description ul {
    padding-left: 20px;
  }

  .project-description li {
    margin-bottom: 8px;
    color: #495057;
  }

  .project-details {
    width: 100%;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (max-width: 768px) {
    .project-content {
      flex-direction: column;
    }
    
    .project-image, .project-description {
      flex: 1 1 100%;
    }
  }
</style>

<script>
function toggleProject(projectId) {
  const content = document.getElementById(projectId);
  const header = content.previousElementSibling;
  const icon = header.querySelector('.expand-icon');
  
  content.classList.toggle('show');
  icon.classList.toggle('rotate');
}

// Initialize all projects as collapsed
document.addEventListener('DOMContentLoaded', function() {
  const projects = document.querySelectorAll('.project-content');
  projects.forEach(project => {
    project.classList.remove('show');
  });
});
</script>