(() => {
  const footerYear = document.getElementById("footer-year");
  if (footerYear) footerYear.textContent = String(new Date().getFullYear());
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  if (navToggle && siteNav) {
    const closeNav = () => { navToggle.setAttribute("aria-expanded", "false"); navToggle.setAttribute("aria-label", "Open navigation"); siteNav.classList.remove("is-open"); document.body.classList.remove("nav-open"); };
    const openNav = () => { navToggle.setAttribute("aria-expanded", "true"); navToggle.setAttribute("aria-label", "Close navigation"); siteNav.classList.add("is-open"); document.body.classList.add("nav-open"); };
    navToggle.addEventListener("click", () => navToggle.getAttribute("aria-expanded") === "true" ? closeNav() : openNav());
    siteNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeNav(); });
    document.addEventListener("click", (event) => { const target = event.target; if (target instanceof Element && !siteNav.contains(target) && !navToggle.contains(target)) closeNav(); });
  }
  const mobileCta = document.querySelector(".mobile-cta-bar");
  if (mobileCta) {
    const updateMobileCta = () => {
      const active = document.activeElement;
      const formFocused = active instanceof Element && Boolean(active.closest("[data-estimate-form]"));
      mobileCta.classList.toggle("is-visible", window.scrollY > 360 && !formFocused);
    };
    window.addEventListener("scroll", updateMobileCta, { passive: true });
    window.addEventListener("resize", updateMobileCta);
    document.addEventListener("focusin", updateMobileCta);
    document.addEventListener("focusout", () => window.setTimeout(updateMobileCta, 0));
    updateMobileCta();
  }
  document.querySelectorAll(".faq-list").forEach((list) => {
    list.querySelectorAll("details").forEach((item) => {
      item.addEventListener("toggle", () => { if (item.open) list.querySelectorAll("details").forEach((other) => { if (other !== item) other.open = false; }); });
    });
  });
  const serviceMapEl = document.getElementById("service-map");
  if (serviceMapEl && window.L) {
    const questBase = [33.2487, -111.6343];
    const phoenixCenter = [33.4484, -112.0740];
    const metroCenter = [33.45, -111.94];
    const serviceCities = [
      ["Queen Creek", 33.2487, -111.6343, true],
      ["Gilbert", 33.3528, -111.7890],
      ["Chandler", 33.3062, -111.8413],
      ["Mesa", 33.4152, -111.8315],
      ["Tempe", 33.4255, -111.9400],
      ["Scottsdale", 33.4942, -111.9261],
      ["Paradise Valley", 33.5312, -111.9426],
      ["Phoenix", 33.4484, -112.0740]
    ];
    const map = L.map(serviceMapEl, {
      center: metroCenter,
      zoom: serviceMapEl.offsetWidth < 520 ? 8 : 9,
      boxZoom: false,
      doubleClickZoom: false,
      dragging: false,
      keyboard: false,
      scrollWheelZoom: false,
      touchZoom: false,
      tap: false
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    L.circle(phoenixCenter, {
      radius: 54000,
      color: "#E85D24",
      weight: 2,
      opacity: 0.95,
      fillColor: "#E85D24",
      fillOpacity: 0.12
    }).addTo(map).bindPopup("Approximate Greater Phoenix service radius.");
    serviceCities.forEach(([name, lat, lng, isBase]) => {
      L.circleMarker([lat, lng], {
        radius: isBase ? 8 : 6,
        color: isBase ? "#E85D24" : "#0B1D33",
        weight: 2,
        fillColor: isBase ? "#E85D24" : "#12A8D8",
        fillOpacity: 0.95
      }).addTo(map).bindTooltip(name, { direction: "top", offset: [0, -8] }).bindPopup(name);
    });
  }
  document.querySelectorAll("[data-estimate-form]").forEach((form) => {
    const steps = Array.from(form.querySelectorAll("[data-step]"));
    const tabs = Array.from(form.querySelectorAll("[data-step-target]"));
    const status = form.querySelector(".form-status");
    const stepStatus = form.querySelector("[data-step-status]");
    let activeStep = 1;
    const fieldsForStep = (stepNumber) => {
      const step = form.querySelector('[data-step="' + stepNumber + '"]');
      return step ? Array.from(step.querySelectorAll("input, select, textarea")) : [];
    };
    const setStep = (stepNumber) => {
      activeStep = Math.min(Math.max(stepNumber, 1), steps.length);
      steps.forEach((step) => { const isActive = Number(step.dataset.step) === activeStep; step.classList.toggle("is-active", isActive); step.hidden = !isActive; });
      tabs.forEach((tab) => { const isActive = Number(tab.dataset.stepTarget) === activeStep; tab.classList.toggle("is-active", isActive); tab.setAttribute("aria-current", isActive ? "step" : "false"); });
      if (stepStatus) {
        const labels = ["roof need", "contact", "property and details"];
        stepStatus.textContent = "Step " + activeStep + " of " + steps.length + ": " + labels[activeStep - 1] + ".";
      }
    };
    const validateStep = (stepNumber) => {
      const invalid = fieldsForStep(stepNumber).find((field) => !field.checkValidity());
      if (invalid) { invalid.reportValidity(); return false; }
      return true;
    };
    const validateAll = () => {
      for (let index = 1; index <= steps.length; index += 1) {
        if (!validateStep(index)) { setStep(index); return false; }
      }
      return true;
    };
    form.querySelectorAll("[data-next-step]").forEach((button) => button.addEventListener("click", () => { if (validateStep(activeStep)) setStep(activeStep + 1); }));
    form.querySelectorAll("[data-prev-step]").forEach((button) => button.addEventListener("click", () => setStep(activeStep - 1)));
    tabs.forEach((tab) => tab.addEventListener("click", () => {
      const nextStep = Number(tab.dataset.stepTarget);
      if (nextStep <= activeStep) {
        setStep(nextStep);
        return;
      }
      if (nextStep === activeStep + 1 && validateStep(activeStep)) {
        setStep(nextStep);
      }
    }));
    form.addEventListener("submit", (event) => {
      if (!validateAll()) { event.preventDefault(); if (status) status.textContent = "Complete the required fields before submitting your estimate request."; return; }
      const isLocal = window.location.protocol === "file:" || ["", "localhost", "127.0.0.1"].includes(window.location.hostname);
      if (!isLocal) { if (status) status.textContent = "Submitting your estimate request."; return; }
      event.preventDefault();
      const formData = new FormData(form);
      const lines = ["Quest Roofing estimate request", "", "Service needed: " + (formData.get("service_needed") || ""), "Urgency: " + (formData.get("urgency") || ""), "Name: " + (formData.get("full_name") || ""), "Phone: " + (formData.get("phone") || ""), "Email: " + (formData.get("email") || ""), "Property location: " + (formData.get("property_location") || ""), "", "Project details:", String(formData.get("project_details") || "")];
      const mailto = "mailto:info@questroofing.com?subject=" + encodeURIComponent("Estimate request from website") + "&body=" + encodeURIComponent(lines.join("\n"));
      if (status) status.textContent = "Your request is ready. Email info@questroofing.com or call 602-399-6455.";
      window.location.href = mailto;
    });
    setStep(1);
  });
})();
