/**
 * Personal Portfolio Resume Application
 * Authored in pure Vanilla JavaScript (ES6+)
 * Covers 10 distinct interactive features with error handling.
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Modal dataset for all featured projects
  const projectDetails = [
    {
      title: "India Tour: Cinematic Documentary & Photo Study",
      description: "A comprehensive multimedia project blending field photography and video post-production. Captures architectural landmarks, vibrant street scenes, and travel culture across India.",
      specs: [
        "Software & Ingest: DaVinci Resolve (Cut, Edit, Color, and Fairlight workspaces).",
        "Color Grading: Primary balance adjustments, shot-matching between varied ambient sunlight conditions, and custom contrast curves.",
        "Audio Engineering: Integrated ambient environmental field recordings with dynamic musical timing and audio ducking.",
        "Visual Asset Capture: On-location digital photography emphasizing leading lines, frame symmetry, and natural lighting."
      ]
    },
    {
      title: "Campus-Wide Secure Enterprise Network Topology",
      description: "A complete multi-departmental network architecture built to prevent unauthorized inter-VLAN access, spoofing, and broadcast storms across large academic buildings.",
      specs: [
        "VLAN Segmentation: 8 distinct departmental subnets separated by 802.1Q encapsulation.",
        "Security: Configured Standard & Extended ACLs, dynamic DHCP snooping, and strict port security (MAC binding).",
        "Redundancy: Implemented Spanning Tree Protocol (STP) to eliminate switching loops across distribution layers."
      ]
    },
    {
      title: "SDG-4 Quality Education Learning Suite",
      description: "Desktop software suite supporting educational access goals. Designed with decoupled architectural layers separating data modeling, view handling, and file streaming.",
      specs: [
        "Language & Paradigm: Pure Java leveraging OOP encapsulation, inheritance, and polymorphism.",
        "Persistence: Custom binary and plaintext file streaming serialization with error-safe recovery.",
        "Testing: Verified modular components through comprehensive unit test suites."
      ]
    },
    {
      title: "Industrial Edge IoT Connectivity Framework",
      description: "A resilience model addressing real-world telemetry loss in agricultural processing mills subject to intermittent grid power and high wireless interference.",
      specs: [
        "Hybrid Topology: Dual WAN links with automated failover from fiber backhaul to cellular 4G/LTE.",
        "Store-and-Forward Caching: Edge gateway architecture capable of caching 72 hours of telemetry during blackouts.",
        "Bandwidth Throttling: MQTT payload compression minimizing transmission costs over metered networks."
      ]
    },
    {
      title: "Autonomous Network Server Health Diagnostics Tool",
      description: "A diagnostic script suite that continuously analyzes server throughput, active socket connections, and daemon crash dumps.",
      specs: [
        "Metrics Monitored: TCP socket states (SYN_RECV, TIME_WAIT), memory consumption, and port reachability.",
        "Anomaly Detection: Regex-based pattern matching on syslog outputs to detect brute-force attempts.",
        "Notification Pipeline: Automated trigger system broadcasting critical outages to administrative endpoints."
      ]
    },
    {
      title: "Frameworkless Portfolio & Systems Presentation Hub",
      description: "A minimal, responsive website demonstrating clean-code principles, WCAG AAA accessible color ratios, and sub-millisecond execution times.",
      specs: [
        "Zero Third-Party Dependencies: Built without React, Tailwind, jQuery, or external CDNs.",
        "Accessibility: ARIA landmark regions, keyboard focus management, and skip navigation.",
        "Performance: 100% responsive, optimized asset footprint, and native DOM manipulation."
      ]
    }
  ];

  /* -------------------------------------------------------------
     Feature 1: Scroll Reading Progress Indicator
  ------------------------------------------------------------- */
  try {
    const progressBar = document.getElementById("scroll-progress");
    window.addEventListener("scroll", () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = `${scrolled}%`;
      }
    }, { passive: true });
  } catch (err) {
    console.error("Scroll progress failed to initialize:", err);
  }

  /* -------------------------------------------------------------
     Feature 2: Responsive Mobile Navigation Drawer
  ------------------------------------------------------------- */
  try {
    const navToggle = document.getElementById("nav-toggle");
    const primaryNav = document.getElementById("primary-nav");
    const navLinks = document.querySelectorAll(".nav-link");

    if (navToggle && primaryNav) {
      navToggle.addEventListener("click", () => {
        const isOpen = primaryNav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
      });

      navLinks.forEach(link => {
        link.addEventListener("click", () => {
          if (primaryNav.classList.contains("open")) {
            primaryNav.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
          }
        });
      });
    }
  } catch (err) {
    console.error("Mobile navigation drawer failed:", err);
  }

  /* -------------------------------------------------------------
     Feature 3: Dark/Light Mode Switch with LocalStorage
  ------------------------------------------------------------- */
  try {
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const savedTheme = localStorage.getItem("preferred-theme") || "light";

    const applyTheme = (theme) => {
      if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        if (themeIcon) themeIcon.textContent = "☀️";
      } else {
        document.documentElement.removeAttribute("data-theme");
        if (themeIcon) themeIcon.textContent = "🌙";
      }
    };

    applyTheme(savedTheme);

    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        localStorage.setItem("preferred-theme", nextTheme);
      });
    }
  } catch (err) {
    console.error("Theme toggle failed:", err);
  }

  /* -------------------------------------------------------------
     Feature 4: Dynamic Typewriter Text Effect
  ------------------------------------------------------------- */
  try {
    const typewriterEl = document.getElementById("typewriter");
    const phrases = [
      "Enterprise Network Architecture",
      "DaVinci Resolve & Digital Media",
      "Cisco IOS & Routing Systems",
      "Modular Java Development"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const eraseSpeed = 40;
    const pauseDelay = 1800;

    const runTypewriter = () => {
      if (!typewriterEl) return;
      const currentPhrase = phrases[phraseIndex];

      if (!isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          setTimeout(runTypewriter, pauseDelay);
          return;
        }
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(runTypewriter, isDeleting ? eraseSpeed : typeSpeed);
    };

    runTypewriter();
  } catch (err) {
    console.error("Typewriter failed:", err);
  }

  /* -------------------------------------------------------------
     Feature 5: Skill Category Filter
  ------------------------------------------------------------- */
  try {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const skillPills = document.querySelectorAll(".skill-pill");

    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const targetCategory = btn.getAttribute("data-filter");
        skillPills.forEach(pill => {
          const pillCategory = pill.getAttribute("data-category");
          if (targetCategory === "all" || pillCategory === targetCategory) {
            pill.style.display = "block";
            pill.style.opacity = "1";
          } else {
            pill.style.display = "none";
            pill.style.opacity = "0";
          }
        });
      });
    });
  } catch (err) {
    console.error("Skill filtering failed:", err);
  }

  /* -------------------------------------------------------------
     Feature 6: Accessible Project Inspection Modal
  ------------------------------------------------------------- */
  try {
    const modal = document.getElementById("project-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const modalTechList = document.getElementById("modal-tech-list");
    const closeBtn = document.getElementById("modal-close-btn");
    const triggers = document.querySelectorAll(".modal-trigger");
    let lastActiveElement = null;

    const openModal = (index) => {
      const data = projectDetails[index];
      if (!data || !modal) return;

      lastActiveElement = document.activeElement;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.description;
      modalTechList.innerHTML = "";

      data.specs.forEach(spec => {
        const li = document.createElement("li");
        li.textContent = spec;
        modalTechList.appendChild(li);
      });

      modal.removeAttribute("hidden");
      closeBtn.focus();
      document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
      if (!modal) return;
      modal.setAttribute("hidden", "");
      document.body.style.overflow = "";
      if (lastActiveElement) lastActiveElement.focus();
    };

    triggers.forEach(btn => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.getAttribute("data-project"), 10);
        openModal(index);
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (modal) {
      modal.querySelector(".modal-backdrop").addEventListener("click", closeModal);
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && !modal.hasAttribute("hidden")) {
        closeModal();
      }
    });
  } catch (err) {
    console.error("Modal subsystem failed:", err);
  }

  /* -------------------------------------------------------------
     Feature 7: Form Validation & Input Sanitization
  ------------------------------------------------------------- */
  try {
    const contactForm = document.getElementById("contact-form");
    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const msgInput = document.getElementById("contact-message");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const msgError = document.getElementById("message-error");
    const formFeedback = document.getElementById("form-feedback");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const sanitizeString = (str) => {
      const temp = document.createElement("div");
      temp.textContent = str;
      return temp.innerHTML;
    };

    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let isValid = true;

        nameError.textContent = "";
        emailError.textContent = "";
        msgError.textContent = "";
        formFeedback.className = "form-status";
        formFeedback.textContent = "";

        const cleanName = sanitizeString(nameInput.value.trim());
        const cleanEmail = sanitizeString(emailInput.value.trim());
        const cleanMsg = sanitizeString(msgInput.value.trim());

        if (cleanName.length < 2) {
          nameError.textContent = "Please provide your name (at least 2 characters).";
          isValid = false;
        }

        if (!emailRegex.test(cleanEmail)) {
          emailError.textContent = "Please enter a valid email address.";
          isValid = false;
        }

        if (cleanMsg.length < 10) {
          msgError.textContent = "Message must be at least 10 characters long.";
          isValid = false;
        }

        if (isValid) {
          formFeedback.classList.add("success");
          formFeedback.textContent = `Thank you, ${cleanName}! Your message has been sent successfully.`;
          contactForm.reset();
          const counter = document.getElementById("char-counter");
          if (counter) counter.textContent = "0 / 500 characters";
        } else {
          formFeedback.classList.add("error");
          formFeedback.textContent = "Please correct the errors in the fields above.";
        }
      });
    }
  } catch (err) {
    console.error("Form validation failed:", err);
  }

  /* -------------------------------------------------------------
     Feature 8: Real-Time Character Counter
  ------------------------------------------------------------- */
  try {
    const messageInput = document.getElementById("contact-message");
    const charCounter = document.getElementById("char-counter");
    const maxLength = 500;

    if (messageInput && charCounter) {
      messageInput.setAttribute("maxlength", maxLength);
      messageInput.addEventListener("input", () => {
        const count = messageInput.value.length;
        charCounter.textContent = `${count} / ${maxLength} characters`;
        if (count >= maxLength) {
          charCounter.style.color = "var(--danger)";
        } else {
          charCounter.style.color = "var(--text-muted)";
        }
      });
    }
  } catch (err) {
    console.error("Character counter failed:", err);
  }

  /* -------------------------------------------------------------
     Feature 9: Smooth Back-to-Top Button
  ------------------------------------------------------------- */
  try {
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }
  } catch (err) {
    console.error("Back-to-top failed:", err);
  }

  /* -------------------------------------------------------------
     Feature 10: Dynamic Year & Active Scroll Spy
  ------------------------------------------------------------- */
  try {
    const yearEl = document.getElementById("current-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const sections = document.querySelectorAll("main section");
    const navItems = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
      let currentSectionId = "";
      const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

      sections.forEach(section => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = section.getAttribute("id");
        }
      });

      navItems.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
          link.classList.add("active");
        }
      });
    }, { passive: true });
  } catch (err) {
    console.error("Scroll spy failed:", err);
  }
});
