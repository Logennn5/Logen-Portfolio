
"use strict";

/* =====================================
   1. MOBILE NAVIGATION
===================================== */

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

function closeMenu() {
  if (!menuButton || !navigation) return;

  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  menuButton.textContent = "☰";
}

if (menuButton && navigation) {

  menuButton.addEventListener("click", function () {

    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";

  });

  navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Close menu using Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      navigation.classList.contains("open") &&
      !navigation.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeMenu();
    }
  });

}


/* =====================================
   2. DARK AND LIGHT THEME
===================================== */

const themeButton = document.getElementById("themeButton");

function applyTheme(theme) {

  const darkMode = theme === "dark";

  document.body.classList.toggle("dark", darkMode);

  if (themeButton) {
    themeButton.textContent = darkMode
      ? "Light mode"
      : "Dark mode";

    themeButton.setAttribute(
      "aria-label",
      darkMode ? "Switch to light mode" : "Switch to dark mode"
    );
  }

}

// Restore previously selected theme
let savedTheme = null;

try {
  savedTheme = localStorage.getItem("portfolio-theme");
} catch (error) {
  console.warn("Theme preference storage is unavailable.");
}

if (savedTheme !== "light" && savedTheme !== "dark") {
  savedTheme = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
}

applyTheme(savedTheme);

if (themeButton) {

  themeButton.addEventListener("click", function () {

    const newTheme = document.body.classList.contains("dark")
      ? "light"
      : "dark";

    applyTheme(newTheme);

    try {
      localStorage.setItem("portfolio-theme", newTheme);
    } catch (error) {
      console.warn("Unable to save theme preference.");
    }

  });

}


/* =====================================
   3. AUTOMATIC FOOTER YEAR
===================================== */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =====================================
   4. BACK TO TOP BUTTON
===================================== */

const topButton = document.getElementById("topButton");

if (topButton) {

  topButton.addEventListener("click", function () {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}


/* =====================================
   5. SCROLL PROGRESS INDICATOR
===================================== */

const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {

  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = scrollableHeight > 0
    ? Math.round((window.scrollY / scrollableHeight) * 100)
    : 0;

  if (scrollProgress) {
    scrollProgress.style.width = progress + "%";
    scrollProgress.setAttribute("aria-valuenow", String(progress));
  }

  if (topButton) {
    topButton.classList.toggle("visible", window.scrollY > 300);
  }

}

window.addEventListener("scroll", updateScrollProgress, {
  passive: true
});

window.addEventListener("resize", updateScrollProgress);

updateScrollProgress();


/* =====================================
   6. CONTACT FORM VALIDATION
===================================== */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {

  contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    formMessage.classList.remove("success", "error");

    if (!contactForm.checkValidity()) {

      contactForm.reportValidity();

      formMessage.textContent =
        "Please complete all fields correctly.";

      formMessage.classList.add("error");

      return;
    }

    formMessage.textContent =
      "Your form is valid! This demonstration does not send messages. Please use my email address to contact me.";

    formMessage.classList.add("success");

  });

}


/* =====================================
   7. ACTIVE NAVIGATION LINK
===================================== */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {

  const navObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

      if (entry.isIntersecting) {

        const currentId = entry.target.id;

        navLinks.forEach(function (link) {

          const isActive =
            link.getAttribute("href") === "#" + currentId;

          link.classList.toggle("active", isActive);

          if (isActive) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }

        });

      }

    });

  }, {
    rootMargin: "-25% 0px -65% 0px"
  });

  sections.forEach(function (section) {
    navObserver.observe(section);
  });

}


/* =====================================
   8. PROJECT CATEGORY FILTER
===================================== */

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const projectCount = document.getElementById("projectCount");

filterButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    const selectedCategory = button.dataset.filter;
    let visibleProjects = 0;

    filterButtons.forEach(function (filter) {

      const isActive = filter === button;

      filter.classList.toggle("active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));

    });

    projectCards.forEach(function (card) {

      const matchesCategory =
        selectedCategory === "all" ||
        card.dataset.category === selectedCategory;

      card.hidden = !matchesCategory;

      if (matchesCategory) {
        visibleProjects++;
      }

    });

    if (projectCount) {
      projectCount.textContent =
        "Showing " + visibleProjects +
        (visibleProjects === 1 ? " project" : " projects");
    }

  });

});


/* =====================================
   9. SCROLL REVEAL ANIMATION
===================================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(function (entries, observer) {

    entries.forEach(function (entry) {

      if (entry.isIntersecting) {

        entry.target.classList.add("is-visible");

        observer.unobserve(entry.target);

      }

    });

  }, {
    threshold: 0.12
  });

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });

} else {

  // Fallback for older browsers
  revealElements.forEach(function (element) {
    element.classList.add("is-visible");
  });

}


/* =====================================
   10. TYPING INTRODUCTION ANIMATION
===================================== */

const typedRole = document.getElementById("typedRole");

const roles = [
  "Computer Science Student",
  "Aspiring Developer",
  "Technology Enthusiast"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

const reducedMotion = window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function typeIntroduction() {

  if (!typedRole || reducedMotion) return;

  const currentRole = roles[roleIndex];

  if (deleting) {
    characterIndex--;
  } else {
    characterIndex++;
  }

  typedRole.textContent =
    currentRole.substring(0, characterIndex);

  let delay = deleting ? 45 : 90;

  if (!deleting && characterIndex === currentRole.length) {

    deleting = true;
    delay = 1600;

  } else if (deleting && characterIndex === 0) {

    deleting = false;

    roleIndex = (roleIndex + 1) % roles.length;

    delay = 400;

  }

  window.setTimeout(typeIntroduction, delay);

}

if (typedRole && !reducedMotion) {

  typedRole.textContent = "";

  typeIntroduction();

}


/* =====================================
   11. COPY EMAIL ADDRESS
===================================== */

const copyEmailButton = document.getElementById("copyEmail");
const copyMessage = document.getElementById("copyMessage");

if (copyEmailButton && copyMessage) {

  copyEmailButton.addEventListener("click", async function () {

    const email = "lpalanivel2002@gmail.com";

    copyMessage.classList.remove("success", "error");

    try {

      if (!navigator.clipboard ||
          !window.isSecureContext) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(email);

      copyMessage.textContent = "Email address copied successfully!";
      copyMessage.classList.add("success");

    } catch (error) {

      copyMessage.textContent =
        "Unable to copy automatically. Please use the email link above.";

      copyMessage.classList.add("error");

    }

  });

}
