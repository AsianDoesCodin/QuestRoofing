(() => {
  const footerYear = document.getElementById("footer-year");
  if (footerYear) footerYear.textContent = String(new Date().getFullYear());
  const navToggles = Array.from(document.querySelectorAll(".nav-toggle[aria-controls='site-nav']"));
  const siteNav = document.querySelector(".site-nav");
  if (navToggles.length && siteNav) {
    const setNavState = (isOpen) => {
      navToggles.forEach((toggle) => {
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      });
      siteNav.classList.toggle("is-open", isOpen);
      document.body.classList.toggle("nav-open", isOpen);
    };
    const closeNav = () => setNavState(false);
    const openNav = () => setNavState(true);
    navToggles.forEach((toggle) => toggle.addEventListener("click", () => toggle.getAttribute("aria-expanded") === "true" ? closeNav() : openNav()));
    siteNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeNav(); });
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof Element && !siteNav.contains(target) && !navToggles.some((toggle) => toggle.contains(target))) closeNav();
    });
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
  document.querySelectorAll("[data-blog-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const slides = track ? Array.from(track.querySelectorAll("[data-carousel-slide]")) : [];
    const prev = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    if (!track || !slides.length || !prev || !next) return;
    let activeIndex = 0;
    const scrollToSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      const slide = slides[activeIndex];
      track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
    };
    prev.addEventListener("click", () => scrollToSlide(activeIndex - 1));
    next.addEventListener("click", () => scrollToSlide(activeIndex + 1));
    track.addEventListener("scroll", () => {
      const nearest = slides.reduce((best, slide, index) => {
        const distance = Math.abs(slide.offsetLeft - track.offsetLeft - track.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      }, { index: activeIndex, distance: Number.POSITIVE_INFINITY });
      activeIndex = nearest.index;
    }, { passive: true });
  });
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
    const validateFields = (fields) => {
      const invalid = fields.find((field) => !field.checkValidity());
      if (invalid) { invalid.reportValidity(); return false; }
      return true;
    };
    const setStep = (stepNumber) => {
      activeStep = Math.min(Math.max(stepNumber, 1), steps.length);
      steps.forEach((step) => { const isActive = Number(step.dataset.step) === activeStep; step.classList.toggle("is-active", isActive); step.hidden = !isActive; });
      tabs.forEach((tab) => { const isActive = Number(tab.dataset.stepTarget) === activeStep; tab.classList.toggle("is-active", isActive); tab.setAttribute("aria-current", isActive ? "step" : "false"); });
      if (stepStatus) {
        const labels = ["roof need", "contact", "property and details"];
        stepStatus.textContent = "Step " + activeStep + " of " + steps.length + ": " + (labels[activeStep - 1] || "details") + ".";
      }
    };
    const validateStep = (stepNumber) => {
      return validateFields(fieldsForStep(stepNumber));
    };
    const validateAll = () => {
      if (!steps.length) {
        return validateFields(Array.from(form.querySelectorAll("input, select, textarea")));
      }
      for (let index = 1; index <= steps.length; index += 1) {
        if (!validateStep(index)) { setStep(index); return false; }
      }
      return true;
    };
    if (steps.length) {
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
      setStep(1);
    }
    form.addEventListener("submit", (event) => {
      if (!validateAll()) { event.preventDefault(); if (status) status.textContent = "Complete the required fields before submitting your estimate request."; return; }
      const isLocal = window.location.protocol === "file:" || ["", "localhost", "127.0.0.1"].includes(window.location.hostname);
      if (!isLocal) { if (status) status.textContent = "Submitting your estimate request."; return; }
      event.preventDefault();
      const formData = new FormData(form);
      const photo = formData.get("attachment");
      const hasPhoto = photo instanceof File && photo.name;
      const lines = ["Quest Roofing estimate request", "", "Service needed: " + (formData.get("service_needed") || ""), "Urgency: " + (formData.get("urgency") || ""), "Name: " + (formData.get("full_name") || ""), "Phone: " + (formData.get("phone") || ""), "Email: " + (formData.get("email") || ""), "Property location: " + (formData.get("property_location") || ""), "Roof photo selected: " + (hasPhoto ? photo.name + " (attach this file before sending)" : "No"), "", "Project details:", String(formData.get("project_details") || "")];
      const mailto = "mailto:info@questroofing.com?subject=" + encodeURIComponent("Estimate request from website") + "&body=" + encodeURIComponent(lines.join("\n"));
      if (status) status.textContent = hasPhoto ? "Your email app is opening. Attach the selected roof photo before sending." : "Your email app is opening with your request.";
      window.location.href = mailto;
    });
  });
})();
