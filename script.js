const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const faqItems = document.querySelectorAll(".faq-item");
const footerYear = document.getElementById("footer-year");
const mailtoForms = document.querySelectorAll("[data-mailto-form]");
const guidedForms = document.querySelectorAll("[data-guided-form]");
const serviceMapElement = document.getElementById("service-map");
const galleryCarousels = document.querySelectorAll("[data-gallery-carousel]");
const mobileNavQuery = window.matchMedia("(max-width: 56rem)");

if (footerYear) {
  footerYear.textContent = `Copyright ${new Date().getFullYear()} Quest Roofing`;
}

if (navToggle && siteNav) {
  const navTriggers = Array.from(siteNav.querySelectorAll(".nav-trigger"));
  const navGroups = navTriggers
    .map((trigger) => ({
      trigger,
      group: trigger.closest(".nav-group"),
      menu: trigger.closest(".nav-group")?.querySelector(".nav-menu")
    }))
    .filter(({ group, menu }) => group && menu);

  const closeSubmenus = (exceptGroup = null) => {
    navGroups.forEach(({ trigger, group }) => {
      if (group === exceptGroup) {
        return;
      }

      group.classList.remove("is-submenu-open");
      trigger.setAttribute("aria-expanded", "false");
    });
  };

  const closeMobileNav = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    closeSubmenus();
  };

  const openMobileNav = () => {
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close navigation");
    siteNav.classList.add("is-open");
    document.body.classList.add("nav-open");
  };

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";

    if (expanded) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  navTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const group = trigger.closest(".nav-group");
      const shouldOpen = trigger.getAttribute("aria-expanded") !== "true";

      closeSubmenus(shouldOpen ? group : null);
      group?.classList.toggle("is-submenu-open", shouldOpen);
      trigger.setAttribute("aria-expanded", String(shouldOpen));
    });
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileNav();
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element) || siteNav.contains(target) || navToggle.contains(target)) {
      return;
    }

    if (mobileNavQuery.matches) {
      closeMobileNav();
    } else {
      closeSubmenus();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileNav();
    }
  });

  const handleNavBreakpointChange = (event) => {
    if (!event.matches) {
      closeMobileNav();
    }
  };

  if (typeof mobileNavQuery.addEventListener === "function") {
    mobileNavQuery.addEventListener("change", handleNavBreakpointChange);
  } else if (typeof mobileNavQuery.addListener === "function") {
    mobileNavQuery.addListener(handleNavBreakpointChange);
  }
}

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) {
      return;
    }

    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.open = false;
      }
    });
  });
});

if (serviceMapElement && typeof window.L !== "undefined") {
  const serviceAreas = [
    {
      name: "East Valley Priority",
      detail: "Queen Creek, Gilbert, Chandler, Mesa, Tempe, Apache Junction, San Tan Valley",
      center: [33.292, -111.72],
      radius: 36000,
      color: "#2458ad",
      fillOpacity: 0.22,
      weight: 3
    },
    {
      name: "Premium Northeast Valley",
      detail: "Scottsdale, Paradise Valley, Fountain Hills, North Phoenix",
      center: [33.58, -111.88],
      radius: 31000,
      color: "#2f7fc1",
      fillOpacity: 0.14,
      weight: 2
    }
  ];

  const map = window.L.map(serviceMapElement, {
    zoomControl: false,
    scrollWheelZoom: false
  }).setView([33.43, -112.02], 9);

  window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  const bounds = window.L.latLngBounds();

  serviceAreas.forEach((area) => {
    const circle = window.L.circle(area.center, {
      radius: area.radius,
      color: area.color,
      fillColor: area.color,
      fillOpacity: area.fillOpacity,
      opacity: 0.82,
      weight: area.weight,
      interactive: true
    }).addTo(map);

    circle.bindTooltip(`<strong>${area.name}</strong><span>${area.detail}</span>`, {
      sticky: true,
      className: "service-area-label"
    });

    bounds.extend(circle.getBounds());
  });

  map.fitBounds(bounds, {
    padding: [18, 18]
  });

  window.setTimeout(() => {
    map.invalidateSize();
  }, 150);
}

galleryCarousels.forEach((carousel) => {
  const track = carousel.querySelector("[data-gallery-track]");
  const slides = Array.from(carousel.querySelectorAll(".real-gallery-slide"));
  const prevButton = carousel.querySelector("[data-gallery-prev]");
  const nextButton = carousel.querySelector("[data-gallery-next]");
  const currentText = carousel.querySelector("[data-gallery-current]");
  const totalText = carousel.querySelector("[data-gallery-total]");
  const dotsWrap = carousel.querySelector("[data-gallery-dots]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeIndex = 0;
  let ticking = false;

  if (!track || !slides.length) {
    return;
  }

  if (totalText) {
    totalText.textContent = String(slides.length);
  }

  const dots = slides.map((slide, index) => {
    if (!dotsWrap) {
      return null;
    }

    const dot = document.createElement("button");
    dot.className = "gallery-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Show gallery photo ${index + 1}`);
    dot.addEventListener("click", () => setActive(index));
    dotsWrap.appendChild(dot);
    return dot;
  });

  const updateState = (index) => {
    activeIndex = Math.min(Math.max(index, 0), slides.length - 1);

    if (currentText) {
      currentText.textContent = String(activeIndex + 1);
    }

    if (prevButton) {
      prevButton.disabled = activeIndex === 0;
    }

    if (nextButton) {
      nextButton.disabled = activeIndex === slides.length - 1;
    }

    dots.forEach((dot, dotIndex) => {
      if (!dot) {
        return;
      }

      const isActive = dotIndex === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  function setActive(index) {
    const nextIndex = Math.min(Math.max(index, 0), slides.length - 1);
    slides[nextIndex].scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "start"
    });
    updateState(nextIndex);
  }

  const syncFromScroll = () => {
    const nearestIndex = slides.reduce((bestIndex, slide, index) => {
      const bestDistance = Math.abs(slides[bestIndex].offsetLeft - track.scrollLeft);
      const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
      return distance < bestDistance ? index : bestIndex;
    }, 0);

    updateState(nearestIndex);
    ticking = false;
  };

  track.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(syncFromScroll);
      ticking = true;
    }
  });

  track.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActive(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActive(activeIndex + 1);
    }
  });

  prevButton?.addEventListener("click", () => setActive(activeIndex - 1));
  nextButton?.addEventListener("click", () => setActive(activeIndex + 1));

  updateState(0);
});

guidedForms.forEach((form) => {
  const steps = Array.from(form.querySelectorAll("[data-step]"));
  const tabs = Array.from(form.querySelectorAll("[data-step-target]"));
  let activeStep = 1;

  const fieldsForStep = (stepNumber) => {
    const step = form.querySelector(`[data-step="${stepNumber}"]`);
    return step ? Array.from(step.querySelectorAll("input, select, textarea")) : [];
  };

  const setStep = (stepNumber) => {
    activeStep = Math.min(Math.max(stepNumber, 1), steps.length);

    steps.forEach((step) => {
      const isActive = Number(step.dataset.step) === activeStep;
      step.classList.toggle("is-active", isActive);
      step.toggleAttribute("hidden", !isActive);
    });

    tabs.forEach((tab) => {
      const isActive = Number(tab.dataset.stepTarget) === activeStep;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-current", isActive ? "step" : "false");
    });
  };

  const validateStep = (stepNumber) => {
    const invalidField = fieldsForStep(stepNumber).find((field) => !field.checkValidity());

    if (invalidField) {
      invalidField.reportValidity();
      return false;
    }

    return true;
  };

  form.querySelectorAll("[data-next-step]").forEach((button) => {
    button.addEventListener("click", () => {
      if (validateStep(activeStep)) {
        setStep(activeStep + 1);
      }
    });
  });

  form.querySelectorAll("[data-prev-step]").forEach((button) => {
    button.addEventListener("click", () => {
      setStep(activeStep - 1);
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetStep = Number(tab.dataset.stepTarget);

      if (targetStep <= activeStep || validateStep(activeStep)) {
        setStep(targetStep);
      }
    });
  });

  setStep(activeStep);
});

mailtoForms.forEach((form) => {
  const status = form.querySelector(".form-status");
  const compact = form.dataset.compact === "true";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const serviceInterest = String(formData.get("service_interest") || "").trim();
    const address = String(formData.get("address") || "").trim();
    const details = String(formData.get("details") || "").trim();

    if (!name || !email || !phone || !serviceInterest || (!compact && (!address || !details))) {
      if (status) {
        status.textContent = "Complete every required field before preparing the request.";
      }
      return;
    }

    const lines = [
      "Quest Roofing estimate request",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Service interest: ${serviceInterest}`
    ];

    if (address) {
      lines.push(`Address: ${address}`);
    }

    if (details) {
      lines.push("", "Project details:", details);
    }

    const body = lines.join("\n");
    const mailto = [
      "mailto:info@questroofing.com",
      `?subject=${encodeURIComponent(`Estimate request from ${name}`)}`,
      `&body=${encodeURIComponent(body)}`
    ].join("");

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(body);
      }
    } catch (error) {
      // Clipboard support is optional in this static build.
    }

    if (status) {
      status.textContent =
        "Request prepared. If your email app does not open, call 602-399-6455 or email info@questroofing.com.";
    }

    window.location.href = mailto;
  });
});
