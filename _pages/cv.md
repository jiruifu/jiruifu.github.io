---
layout: archive
title: "Curriculum Vitae"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* Ph.D in Mechanical Engineering, University of Central Florida, 2024 (Advisor: Dr. Joon-Hyuk Park)
* M.S. in Mechanical Engineering, University of Southern California, 2019 (Advisor: Dr. Yan Jin)
* B.S. in Mechanical Engineering, Florida Institute of Technology, 2017

Research Project
======
## Graduate Research Assistant at Wearable Engienering and Assistive Robotics Laboratory
### University of Central Florida
* Myoelectric Cable Driven Upper Body Exosuit for Bilateral Human Power Augmentation (Dissertation Project)
  * Engineered a Cable-Driven Soft Exosuit: Designed and built an upper limb exosuit to reduce the risk of work-related musculoskeletal disorders during load-carrying and eye-level tasks.
  * Developed Myoelectric Control Systems: Programmed a proportional myoelectric control system with an admittance controller using LabVIEW and NI FPGA, integrating surface EMG and IMU sensors for precise control of the upper limb exosuit in load-carrying and eye-level applications.
  * Conducted Human Subject Research: Developed an IRB protocol for human subject experiments to validate the exosuit's effectiveness in reducing muscle fatigue, and conducted research on human biofeedback while using the exosuit.

* Deep Reinforcement Learning-based Motor Controller of Upper Limb Neuromusculoskeletal Simulator 
  * textit{Engineered Neuromusculoskeletal Simulation:} Developed an upper limb neuromusculoskeletal simulation using the MyoSuite model within the Mujoco physics engine to replicate elbow joint movements with and without exoskeleton assistance.
  * \textit{Innovated Deep Reinforcement Learning Auto-Tuner:} Constructed a novel deep reinforcement learning-based auto-tuner for the human central nervous system's internal model, eliminating the need for experimental data or prior knowledge.
  * \textit{Proven Efficacy of Auto-Tuner:} Demonstrated the efficiency of the deep reinforcement learning-based auto-tuner in accurately tuning the internal model of the central nervous system.
  * \textit{Benchmarking and Performance Improvement:} Benchmarked the auto-tuner against a deep reinforcement learning agent trained to output muscle activation, showcasing enhanced accuracy and reduced response time with the auto-tuner.

* Summer 2015: Research Assistant
  * Github University
  * Duties included: Tagging issues
  * Supervisor: Professor Git
  
Skills
======
* Skill 1
* Skill 2
  * Sub-skill 2.1
  * Sub-skill 2.2
  * Sub-skill 2.3
* Skill 3

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul>
  
Teaching
======
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Service and leadership
======
* Currently signed in to 43 different slack teams
