const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const faqItems = document.querySelectorAll(".faq-item");
const footerYear = document.getElementById("footer-year");
const mailtoForms = document.querySelectorAll("[data-mailto-form]");
const guidedForms = document.querySelectorAll("[data-guided-form]");
const serviceMapElement = document.getElementById("service-map");

if (footerYear) {
  footerYear.textContent = `Copyright ${new Date().getFullYear()} Quest Roofing`;
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open", !expanded);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    });
  });
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
