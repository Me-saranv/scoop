// SCOOP INNOVATIONS - shared site behaviour (theme, nav drawer, reveal, contact form)

function applyTheme(theme) {
    if (theme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
    } else {
        document.documentElement.removeAttribute("data-theme");
    }
    try { localStorage.setItem("scoop_theme", theme); } catch (e) {}

    document.querySelectorAll(".theme-toggle-row .toggle-label").forEach((el) => {
        el.textContent = theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode";
    });
}
window.applyTheme = applyTheme;

window.toggleSiteTheme = function () {
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    applyTheme(current === "light" ? "dark" : "light");
};

function toggleDrawer(open) {
    const drawer = document.getElementById("mobile-drawer");
    const backdrop = document.getElementById("drawer-backdrop");
    if (!drawer || !backdrop) return;
    const shouldOpen = typeof open === "boolean" ? open : !drawer.classList.contains("open");
    drawer.classList.toggle("open", shouldOpen);
    backdrop.classList.toggle("open", shouldOpen);
    document.body.style.overflow = shouldOpen ? "hidden" : "";
}
window.toggleDrawer = toggleDrawer;

function setupScrollReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach((el) => observer.observe(el));
}

function setupContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("cf-name").value.trim();
        const email = document.getElementById("cf-email").value.trim();
        const phone = document.getElementById("cf-phone") ? document.getElementById("cf-phone").value.trim() : "";
        const message = document.getElementById("cf-message").value.trim();

        if (!name || !email || !message) return;

        const subject = encodeURIComponent(`Enquiry from ${name} — Scoop Innovations website`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);
        window.location.href = `mailto:info@scoopinnovations.in?subject=${subject}&body=${body}`;

        const btn = form.querySelector("button[type='submit']");
        if (btn) {
            const original = btn.innerHTML;
            btn.innerHTML = "<span>Opening your email app…</span>";
            setTimeout(() => { btn.innerHTML = original; }, 2500);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupScrollReveal();
    setupContactForm();
    applyTheme(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
});
