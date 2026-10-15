/* =====================================================================
   IMAGINEERS: SHARED SITE SCRIPT
   ---------------------------------------------------------------------
   EDIT HERE: the SITE object below holds the menu, contact details and
   footer text for EVERY page. Change it once and all pages update.
   ===================================================================== */

const SITE = {
  company: "Imagineers Digital Systems Company LLC",
  email: "hello@imagineerscx.com",
  address: ["Ibn Zuriek St., Jubaiha", "Amman, Jordan"],
  hours: "Sunday to Thursday, 9:00 AM – 5:00 PM (GMT+3)",
  linkedin: "https://www.linkedin.com/company/imagineerscx",
  logo: "images/logo-nav.png",
  footerLine: "Cybersecurity consultancy and systems integrator specializing in biometric authentication, verifiable credentials, decentralized identity, and identity assurance solutions across MENA.",

  /* ---- MENUS: edit titles, one-line descriptions and links here ---- */
  products: [
    { title: "Unified Identity Assurance Platform", desc: "Identity, device and transaction, linked in one glance", href: "pages/unified-identity-assurance.html", icon: "face" },
    { title: "AnaVerify", desc: "One verified digital ID for your entire ecosystem", href: "pages/anaverify.html", icon: "shield" }
  ],
  solutions_need: [
    { title: "Authenticate & authorize", desc: "No passwords, no OTPs, in-person certainty", href: "pages/authentication-authorization.html", icon: "face" },
    { title: "Verify & reuse identity", desc: "Verified once, trusted everywhere, with consent", href: "pages/verify-reuse-identity.html", icon: "card" },
    { title: "Prepare for quantum", desc: "Protection that outlasts today's cryptography", href: "pages/pqc.html", icon: "lattice" }
  ],
  solutions_industry: [
    { title: "Banks & financial services", desc: "In-person certainty in every channel", href: "pages/industries-banks.html", icon: "bank" },
    { title: "Government", desc: "Certainty for every digital public service", href: "pages/industries-government.html", icon: "gov" },
    { title: "Telecom operators", desc: "From SMS gateway to identity provider", href: "pages/industries-telecom.html", icon: "antenna" }
  ],
  services: [
    { title: "Advisory & gap analysis", desc: "Understand why before deciding what", href: "pages/advisory.html", icon: "path" },
    { title: "Implementation & integration", desc: "From architecture to go-live, inside your stack", href: "pages/implementation.html", icon: "nodes" },
    { title: "Training & knowledge transfer", desc: "Build the expertise to run it yourselves", href: "pages/training.html", icon: "book" }
  ],
  company_links: [
    { title: "About", desc: "Who we are and how we work", href: "pages/about.html", icon: "about" },
    { title: "Contact", desc: "Let's talk", href: "pages/contact.html", icon: "mail" }
  ]
};

/* ---------------- Nothing below needs editing for content ---------------- */
(function () {
  const root = document.documentElement.dataset.root || "./";
  const u = (p) => (/^(https?:|mailto:|#)/.test(p) ? p : root + p);

  const ICONS = {
    face: '<path d="M12 3c-4 0-7 3-7 7.5S8 21 12 21s7-6 7-10.5S16 3 12 3Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="9.5" cy="10" r=".9" fill="currentColor"/><circle cx="14.5" cy="10" r=".9" fill="currentColor"/><path d="M9.5 15c1.5 1 3.5 1 5 0" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    lattice: '<g fill="currentColor"><circle cx="5" cy="5" r="1.4"/><circle cx="12" cy="5" r="1.4"/><circle cx="19" cy="5" r="1.4"/><circle cx="8.5" cy="12" r="1.4"/><circle cx="15.5" cy="12" r="1.4"/><circle cx="5" cy="19" r="1.4"/><circle cx="12" cy="19" r="1.4"/><circle cx="19" cy="19" r="1.4"/></g><path d="M5 19 8.5 12 15.5 12 19 5" fill="none" stroke="currentColor" stroke-width="1.3"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7 10h6M7 14h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="m15 13 1.6 1.6L19 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    nodes: '<circle cx="12" cy="5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="18" r="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="19" cy="18" r="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10.8 7 6.2 16M13.2 7l4.6 9M7.2 18h9.6" stroke="currentColor" stroke-width="1.3"/>',
    path: '<path d="M4 19c4 0 4-7 8-7s4-7 8-7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="4" cy="19" r="1.6" fill="currentColor"/><circle cx="20" cy="5" r="1.6" fill="currentColor"/>',
    book: '<path d="M4 5.5C6.5 4.5 9.5 4.5 12 6c2.5-1.5 5.5-1.5 8-.5v13c-2.5-1-5.5-1-8 .5-2.5-1.5-5.5-1.5-8-.5Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 6v13" stroke="currentColor" stroke-width="1.3"/>',
    bank: '<path d="M3 9.5 12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3.5 20.5h17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    gov: '<path d="M12 3 3.5 7.5h17Z M5.5 10v7M10 10v7M14 10v7M18.5 10v7M3.5 20h17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    antenna: '<path d="M12 10v11M8.5 21h7M7.8 6.2a6 6 0 0 0 0 8.5M16.2 6.2a6 6 0 0 1 0 8.5M5 3.5a10 10 0 0 0 0 14M19 3.5a10 10 0 0 1 0 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="10.5" r="1.6" fill="currentColor"/>',
    about: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5.5M12 7.8h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    shield: '<path d="M12 3 5 6v5.5c0 4.3 3 8 7 9.5 4-1.5 7-5.2 7-9.5V6Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="m9 12 2 2 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  const icon = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k] || ""}</svg>`;
  const caret = '<svg viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
  window.CHEV = '<svg class="chev" viewBox="0 0 10 10" aria-hidden="true"><path class="stem" d="M0 5h7" stroke="currentColor" stroke-width="1.6"/><path class="head" d="M1 1l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const megaLinks = (list) => list.map(s =>
    `<a href="${u(s.href)}"><span class="ico">${icon(s.icon)}</span><strong>${s.title}</strong><span>${s.desc}</span></a>`).join("");


  /* ---------- Brand icon gradient (blue → green → gold), used by every icon on the site ---------- */
  document.body.insertAdjacentHTML("afterbegin", '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>'
    + '<linearGradient id="ico-grad" gradientUnits="userSpaceOnUse" x1="2" y1="22" x2="22" y2="2"><stop offset="0" stop-color="#5B9BFF"/><stop offset=".55" stop-color="#3FD39A"/><stop offset="1" stop-color="#E9C766"/></linearGradient>'
    + '<linearGradient id="ico-grad-ink" gradientUnits="userSpaceOnUse" x1="2" y1="22" x2="22" y2="2"><stop offset="0" stop-color="#1F5FD6"/><stop offset=".55" stop-color="#0E7A5C"/><stop offset="1" stop-color="#B08A22"/></linearGradient>'
    + '</defs></svg>');
  /* ---------- Header ---------- */
  const header = document.getElementById("site-header");
  if (header) {
    header.outerHTML = `
    <a class="skip" href="#main">Skip to content</a>
    <header class="site-header" id="hdr">
      <div class="wrap">
        <a class="brand" href="${u("index.html")}" aria-label="Imagineers home">
          <img src="${u(SITE.logo)}" alt="Imagineers: Connecting Experiences" width="46" height="47">
        </a>
        <nav class="nav" aria-label="Main">
          <div class="nav-item"><button aria-expanded="false" aria-haspopup="true">Products ${caret}</button>
            <div class="mega narrow" role="menu"><p class="mega-intro">Platforms we deploy, on-premises or as SaaS</p>${megaLinks(SITE.products)}</div></div>
          <div class="nav-item"><button aria-expanded="false" aria-haspopup="true">Solutions ${caret}</button>
            <div class="mega two" role="menu"><div><p class="mega-head">By need</p>${megaLinks(SITE.solutions_need)}</div><div><p class="mega-head">By industry</p>${megaLinks(SITE.solutions_industry)}</div></div></div>
          <div class="nav-item"><button aria-expanded="false" aria-haspopup="true">Services ${caret}</button>
            <div class="mega narrow" role="menu"><p class="mega-intro">Advisors who deliver: why, then what, then done</p>${megaLinks(SITE.services)}</div></div>
          <div class="nav-item"><button aria-expanded="false" aria-haspopup="true">Company ${caret}</button>
            <div class="mega narrow" role="menu">${megaLinks(SITE.company_links)}</div></div>
        </nav>
        <div class="header-cta">
          <a class="btn btn-gold" href="mailto:${SITE.email}?subject=Consultation%20request">Get in touch ${CHEV}</a>
        </div>
        <button class="menu-btn" aria-label="Open menu" id="menuOpen"><svg viewBox="0 0 24 24"><path d="M4 8h16M4 16h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>
      </div>
    </header>
    <div class="drawer" id="drawer" aria-hidden="true">
      <div class="drawer-top">
        <img src="${u(SITE.logo)}" alt="Imagineers" style="height:46px">
        <button class="menu-btn" style="display:block;color:#fff" id="menuClose" aria-label="Close menu"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>
      </div>
      <a href="${u("index.html")}">Home</a>
      <h4>Products</h4>${SITE.products.map(s => `<a href="${u(s.href)}">${s.title}</a>`).join("")}
      <h4>Solutions by need</h4>${SITE.solutions_need.map(s => `<a href="${u(s.href)}">${s.title}</a>`).join("")}
      <h4>Solutions by industry</h4>${SITE.solutions_industry.map(s => `<a href="${u(s.href)}">${s.title}</a>`).join("")}
      <h4>Services</h4>${SITE.services.map(s => `<a href="${u(s.href)}">${s.title}</a>`).join("")}
      <h4>Company</h4>${SITE.company_links.map(s => `<a href="${u(s.href)}">${s.title}</a>`).join("")}
      <p style="margin-top:30px"><a class="btn btn-gold" style="display:inline-flex;border:0" href="mailto:${SITE.email}">Get in touch ${CHEV}</a></p>
    </div>`;
  }

  /* ---------- Footer ---------- */
  const footer = document.getElementById("site-footer");
  if (footer) {
    const col = (title, list) => `<div><h4>${title}</h4><ul>${list.map(l => `<li><a href="${u(l.href)}">${l.title}</a></li>`).join("")}</ul></div>`;
    footer.outerHTML = `
    <footer class="site-footer">
      <div class="wrap">
        <div class="footer-top">
          <div class="footer-brand">
            <img src="${u(SITE.logo)}" alt="Imagineers: Connecting Experiences">
            <p>${SITE.footerLine}</p>
          </div>
          ${col("Products", SITE.products)}
          ${col("Solutions", SITE.solutions_need.concat(SITE.solutions_industry))}
          ${col("Services", SITE.services)}
          <div><h4>Company</h4><ul>
            ${SITE.company_links.map(l => `<li><a href="${u(l.href)}">${l.title}</a></li>`).join("")}
            <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
            <li>${SITE.address.join("<br>")}</li>
            <li><a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
          </ul></div>
        </div>
        <div class="footer-bottom">
          <span>© <span id="yr"></span> ${SITE.company}</span>
          <span>The digital equivalent of face-to-face certainty.</span>
        </div>
      </div>
    </footer>`;
    document.getElementById("yr").textContent = new Date().getFullYear();
  }

  /* Fill any element with data-site="email" etc. */
  document.querySelectorAll("[data-site]").forEach(el => {
    const k = el.dataset.site;
    if (k === "email") { el.textContent = SITE.email; if (el.tagName === "A") el.href = "mailto:" + SITE.email; }
    if (k === "email-btn" && el.tagName === "A") el.href = "mailto:" + SITE.email + "?subject=Consultation%20request";
    if (k === "address") el.innerHTML = SITE.address.join("<br>");
    if (k === "hours") el.textContent = SITE.hours;
    if (k === "linkedin" && el.tagName === "A") el.href = SITE.linkedin;
  });
  document.querySelectorAll("[data-chev]").forEach(el => el.insertAdjacentHTML("beforeend", " " + CHEV));

  /* ---------- Sticky header ---------- */
  const hdr = document.getElementById("hdr");
  if (hdr) {
    const onScroll = () => hdr.classList.toggle("is-stuck", window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mega menus ---------- */
  document.querySelectorAll(".nav-item").forEach(item => {
    const btn = item.querySelector("button");
    let t;
    const open = (v) => { item.classList.toggle("open", v); btn.setAttribute("aria-expanded", v); };
    item.addEventListener("mouseenter", () => { clearTimeout(t); document.querySelectorAll(".nav-item.open").forEach(o => o !== item && o.classList.remove("open")); open(true); });
    item.addEventListener("mouseleave", () => { t = setTimeout(() => open(false), 160); });
    btn.addEventListener("click", () => open(!item.classList.contains("open")));
    item.addEventListener("keydown", e => { if (e.key === "Escape") { open(false); btn.focus(); } });
  });
  document.addEventListener("click", e => { if (!e.target.closest(".nav-item")) document.querySelectorAll(".nav-item.open").forEach(o => o.classList.remove("open")); });

  /* ---------- Mobile drawer ---------- */
  const drawer = document.getElementById("drawer");
  const setDrawer = (v) => { drawer.classList.toggle("open", v); drawer.setAttribute("aria-hidden", !v); document.body.style.overflow = v ? "hidden" : ""; };
  document.getElementById("menuOpen")?.addEventListener("click", () => setDrawer(true));
  document.getElementById("menuClose")?.addEventListener("click", () => setDrawer(false));

  /* ---------- Accordion tabs ---------- */
  document.querySelectorAll(".tabs").forEach(group => {
    group.querySelectorAll(".tab > button").forEach(b => {
      b.setAttribute("aria-expanded", b.parentElement.classList.contains("open"));
      b.addEventListener("click", () => {
        const tab = b.parentElement, isOpen = tab.classList.contains("open");
        group.querySelectorAll(".tab").forEach(t => { t.classList.remove("open"); t.querySelector("button").setAttribute("aria-expanded", "false"); });
        if (!isOpen) { tab.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
        const target = tab.dataset.photo; const img = document.querySelector("[data-tab-photo] img");
        if (target && img) img.src = u(target);
      });
    });
  });

  /* ---------- Photo slots: elegant placeholder when the file is missing ---------- */
  document.querySelectorAll(".photo").forEach(fig => {
    const img = fig.querySelector("img");
    const mark = () => { fig.classList.add("is-empty"); if (img) img.style.visibility = "hidden"; };
    if (!img || !img.getAttribute("src")) return mark();
    if (img.complete && img.naturalWidth === 0) mark();
    img.addEventListener("error", mark);
    img.addEventListener("load", () => { fig.classList.remove("is-empty"); img.style.visibility = ""; });
  });

  /* ---------- Edit mode: add ?edit to any URL ----------
     Drag a photo to move its focal point, scroll on it to zoom.
     Copy the generated style line back into the HTML file. */
  if (new URLSearchParams(location.search).has("edit")) {
    document.body.classList.add("edit-mode");
    const panel = document.createElement("div");
    panel.className = "edit-panel";
    panel.innerHTML = `<b>Photo edit mode</b><div style="opacity:.7;margin-top:4px">Drag a photo to reposition. Scroll on it to zoom. Then copy the line below into that photo's &lt;figure&gt; tag.</div><code id="editOut">Select a photo…</code><button id="editCopy">Copy style</button>`;
    document.body.appendChild(panel);
    const out = panel.querySelector("#editOut");
    panel.querySelector("#editCopy").onclick = () => navigator.clipboard?.writeText(out.textContent);
    document.querySelectorAll(".photo").forEach(fig => {
      const img = fig.querySelector("img");
      const tag = document.createElement("span"); tag.className = "edit-tag";
      tag.textContent = img ? img.getAttribute("src") : "no image"; fig.appendChild(tag);
      const cs = getComputedStyle(fig);
      let x = parseFloat(cs.getPropertyValue("--x")) || 50, y = parseFloat(cs.getPropertyValue("--y")) || 50, z = parseFloat(cs.getPropertyValue("--zoom")) || 1;
      const show = () => { fig.style.setProperty("--x", x + "%"); fig.style.setProperty("--y", y + "%"); fig.style.setProperty("--zoom", z);
        out.textContent = `style="--x:${Math.round(x)}%; --y:${Math.round(y)}%; --zoom:${z.toFixed(2)}"`; };
      let drag = null;
      fig.addEventListener("pointerdown", e => { drag = { sx: e.clientX, sy: e.clientY, x, y }; fig.setPointerCapture(e.pointerId); show(); });
      fig.addEventListener("pointermove", e => { if (!drag) return; const r = fig.getBoundingClientRect();
        x = Math.min(100, Math.max(0, drag.x - (e.clientX - drag.sx) / r.width * 100));
        y = Math.min(100, Math.max(0, drag.y - (e.clientY - drag.sy) / r.height * 100)); show(); });
      fig.addEventListener("pointerup", () => drag = null);
      fig.addEventListener("wheel", e => { e.preventDefault(); z = Math.min(3, Math.max(1, z - e.deltaY * 0.001)); show(); }, { passive: false });
    });
  }
})();
