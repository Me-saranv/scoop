// SCOOP INNOVATIONS - APPLICATION LOGIC, 3D ECOSYSTEM CORE BRIDGE & KINETIC TRANSITIONS
// "Transforming Ideas Into Digital Solutions"
// Official Contact: info@scoopinnovations.in | https://scoopinnovations.in/

const SOLUTIONS_DATA = [
    {
        id: "hospital",
        title: "Hospital Management",
        badge: "Healthcare",
        color: "#00d2ff",
        icon: "🏥",
        tagline: "End-to-end clinical workflows, in-patient/out-patient governance & regulatory healthcare compliance.",
        modules: [
            "Patients & Electronic Health Records (EHR)",
            "Appointment Scheduling & Queues",
            "Out-Patient (OP) & In-Patient (IP) Admissions",
            "Doctor Duty Rosters & Consultations",
            "Integrated In-House Pharmacy & Formularies",
            "Diagnostic Laboratory (LIMS) Sync",
            "Automated Medical Billing & Invoicing",
            "Insurance & TPA Claims Processing"
        ],
        stats: "99.9% Uptime • HIPAA & NABH Compliant"
    },
    {
        id: "school",
        title: "School & College Management",
        badge: "Education",
        color: "#10b981",
        icon: "🎓",
        tagline: "Comprehensive campus administration system for universities, colleges, and K-12 institutions.",
        modules: [
            "Online Admissions & Enrollment CRM",
            "Student Lifecycle & Academic Records",
            "Fee Management & Digital Receipts",
            "RFID / Biometric Student Attendance",
            "Examinations, Grading & Report Cards",
            "Automated Timetable & Faculty Rosters",
            "Staff Payroll & Performance Tracking",
            "Unified Parent & Student Mobile Portal"
        ],
        stats: "50,000+ Students Handled • Mobile App Ready"
    },
    {
        id: "hotel",
        title: "Hotel & Restaurant Management",
        badge: "Hospitality",
        color: "#f59e0b",
        icon: "🏨",
        tagline: "All-in-one hospitality engine combining room reservation desk with restaurant tables and kitchen display.",
        modules: [
            "Real-time Room Reservations & OTA Engine",
            "Front Desk Check-in / Express Check-out",
            "Housekeeping & Room Status Automation",
            "Restaurant & Dine-in POS System",
            "Kitchen Display System (KDS) & Order Routing",
            "Split Invoicing, Tips & Taxes",
            "Inventory & Recipe Costing Control",
            "Guest Feedback & Loyalty CRM"
        ],
        stats: "Instant OTA Channel Sync • Fast POS Checkout"
    },
    {
        id: "retail",
        title: "Retail Management & POS",
        badge: "Retail & Commerce",
        color: "#0ea5e9",
        icon: "🛍️",
        tagline: "High-speed multi-store billing, inventory balancing, customer loyalty programs, and promotional campaigns.",
        modules: [
            "Ultra-Fast Barcode POS Billing",
            "Centralized Product Catalog & SKU Matrix",
            "Multi-Store Inventory & Warehouse Sync",
            "Customer Database & Tiered Loyalty Rewards",
            "Automated Discounts, Coupons & Offers",
            "Purchase Orders & Supplier Invoicing",
            "Cash Drawer & Shift Settlement Tracking",
            "Omnichannel Online Store Integration"
        ],
        stats: "Sub-Second Barcode Scans • Offline POS Sync"
    },
    {
        id: "manufacturing",
        title: "Manufacturing ERP (Industry 4.0)",
        badge: "Industrial ERP",
        color: "#6366f1",
        icon: "⚙️",
        tagline: "Precision production forecasting, Bill of Materials (BOM), shop-floor control, and preventative maintenance.",
        modules: [
            "Master Production Scheduling (MPS)",
            "Multi-level Bill of Materials (BOM)",
            "Material Requirements Planning (MRP)",
            "Shop Floor Work Orders & Job Cards",
            "Quality Assurance (QA/QC) Inspection",
            "Preventive Machinery Maintenance Logs",
            "Scrap, Wastage & Cost Accounting",
            "Vendor Supply Chain Procurement"
        ],
        stats: "Industry 4.0 Telemetry • Reduced Downtime"
    },
    {
        id: "textile",
        title: "Textile & Garment Management",
        badge: "Apparel & Manufacturing",
        color: "#0284c7",
        icon: "🧵",
        tagline: "Specialized fashion apparel lifecycle: sampling, fabric cutting, stitching bundles, dyeing batches & export dispatch.",
        modules: [
            "Buyer Merchandising & Style Tech Packs",
            "Fabric & Yarn Procurement Management",
            "Pattern Cutting & Marker Optimization",
            "Line Balancing & Stitching Progress (WIP)",
            "Dyeing, Washing & Printing Batches",
            "Garment Finishing, Pressing & Packing",
            "Barcode-Based Bundle Tracking",
            "Export Documentation & Container Dispatch"
        ],
        stats: "Bundle Ticket Tracking • Zero WIP Bottlenecks"
    },
    {
        id: "logistics",
        title: "Logistics & Fleet Transport",
        badge: "Supply Chain",
        color: "#38bdf8",
        icon: "🚚",
        tagline: "Real-time dispatching, live GPS vehicle tracking, driver shift management, and freight billing.",
        modules: [
            "Vehicle & Trailer Fleet Registry",
            "Trip Dispatcher & Route Optimization",
            "Driver License, Duty & Shift Rostering",
            "Integrated Real-Time GPS Tracking",
            "Freight Invoicing & Proof of Delivery (e-POD)",
            "Fuel Log Tracking & Mileage Analytics",
            "Vehicle Preventative Maintenance & Tyre Health",
            "Toll & Transit Expense Settlement"
        ],
        stats: "Live GPS Stream • 15% Fuel Savings"
    },
    {
        id: "pharmacy",
        title: "Pharmacy Management Suite",
        badge: "Healthcare",
        color: "#14b8a6",
        icon: "💊",
        tagline: "Strict batch-level drug traceability, doctor e-prescriptions, expiry alerts, and GST billing.",
        modules: [
            "Batch & Expiry Date Lifecycle Monitoring",
            "Digital Prescription Ingestion & Dispensing",
            "Fast OTC & Scheduled Drug Billing",
            "Automated Minimum Stock Reorder Alerts",
            "Narcotics & Controlled Substance Registers",
            "Supplier Returns for Near-Expiry Stock",
            "Generic Drug Substitute Suggestions",
            "Multi-Counter POS & Cash Register Controls"
        ],
        stats: "Zero Expiry Losses • Regulatory Compliance"
    },
    {
        id: "lims",
        title: "Laboratory Information System (LIMS)",
        badge: "Healthcare",
        color: "#00d2ff",
        icon: "🔬",
        tagline: "Clinical pathology and diagnostic automation from specimen barcoding to signed digital PDF results.",
        modules: [
            "Patient Specimen Collection & Barcode Labeling",
            "Bidirectional Diagnostic Analyzer Interfacing",
            "Automated Test Parameter Validation & Flags",
            "Pathologist Digital Signature Workflow",
            "SMS & WhatsApp PDF Report Delivery",
            "Lab Reagent & Consumables Inventory",
            "Referral Doctor Commission Ledger",
            "Diagnostic Billing & Health Packages"
        ],
        stats: "ASTM / HL7 Ready • Instant WhatsApp Delivery"
    },
    {
        id: "legal",
        title: "Legal Practice Management",
        badge: "Legal & Corporate",
        color: "#f43f5e",
        icon: "⚖️",
        tagline: "High-security case file repository, court hearing calendar, billable time ledger, and corporate document repository.",
        modules: [
            "Case File Repository & Matter Management",
            "Client Contacts & Conflict of Interest Checks",
            "Encrypted Legal Document Vault with Versioning",
            "Court Hearing Dates & Calendar Alerts",
            "Billable Hours & Retainer Accounting",
            "Court Causelist Sync & Case Status Feeds",
            "Associate Task Delegation & Deadlines",
            "Client Portal for Case Updates & Invoicing"
        ],
        stats: "End-to-End Encryption • Court Calendar Sync"
    }
];

// ==========================================================================
// DUAL THEME ENGINE (RADIANT LIGHT & CYBER DARK)
// ==========================================================================
function initTheme() {
    const savedTheme = localStorage.getItem("scoop_theme") || "dark";
    applyTheme(savedTheme);
}

window.toggleTheme = function () {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "radiant" : "dark";
    applyTheme(next);
};

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("scoop_theme", theme);

    const icon = document.getElementById("theme-icon");
    const label = document.getElementById("theme-label");

    if (theme === "radiant") {
        if (icon) icon.textContent = "🌙";
        if (label) label.textContent = "Dark Theme";
        showToast("Switched to Radiant Light Theme");
        if (window.update3DTheme) window.update3DTheme(true);
    } else {
        if (icon) icon.textContent = "☀️";
        if (label) label.textContent = "Radiant Theme";
        showToast("Switched to Cyber Dark Theme");
        if (window.update3DTheme) window.update3DTheme(false);
    }
}

// ==========================================================================
// MOBILE NAVIGATION DRAWER
// ==========================================================================
window.toggleMobileDrawer = function (forceState) {
    const drawer = document.getElementById("mobile-drawer");
    if (!drawer) return;

    if (typeof forceState === "boolean") {
        if (forceState) drawer.classList.add("open");
        else drawer.classList.remove("open");
    } else {
        drawer.classList.toggle("open");
    }
};

// INITIALIZE APP ON LOAD
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    renderSolutionCards(SOLUTIONS_DATA);
    setupFilters();
    setupConfigurator();
    setupModals();
    setupChatbot();
    setupSmoothScroll();
    setupScrollReveal();
    setup3DCardTilt();
});

// Render Solution Cards Grid with Filter Transition
function renderSolutionCards(data) {
    const grid = document.getElementById("solutions-grid");
    if (!grid) return;

    grid.innerHTML = data.map((sol, index) => `
        <div class="solution-card filter-animating" id="card-${sol.id}" style="--card-accent: ${sol.color}; animation-delay: ${index * 0.05}s;">
            <div>
                <div class="card-top">
                    <div class="solution-icon-box" style="border-color: ${sol.color}50;">
                        <span>${sol.icon}</span>
                    </div>
                    <span class="category-tag">${sol.badge}</span>
                </div>
                <h3>${sol.title}</h3>
                <p>${sol.tagline}</p>
                <div class="card-feature-chips">
                    ${sol.modules.slice(0, 4).map(mod => `<span class="feature-chip">${mod.split(' ')[0]} ${mod.split(' ')[1] || ''}</span>`).join('')}
                    <span class="feature-chip" style="color: ${sol.color};">+${sol.modules.length - 4} more</span>
                </div>
            </div>
            <div>
                <div class="card-footer-action">
                    <button type="button" class="link-btn" onclick="openSolutionDetails('${sol.id}')">
                        View Modules & Specs
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                    <button type="button" class="node-focus-btn" onclick="trigger3DFocus('${sol.id}')" title="Locate in 3D Ecosystem Core">
                        3D View
                    </button>
                </div>
            </div>
        </div>
    `).join("");

    setup3DCardTilt();
}

// Filter Solutions with Smooth Transition
function setupFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filter = btn.getAttribute("data-filter");

            if (filter === "all") {
                renderSolutionCards(SOLUTIONS_DATA);
            } else {
                const filtered = SOLUTIONS_DATA.filter(s => s.badge.toLowerCase().includes(filter.toLowerCase()));
                renderSolutionCards(filtered);
            }
        });
    });
}

// 3D Interactive Mouse Tilt Effect
function setup3DCardTilt() {
    const cards = document.querySelectorAll(".solution-card, .feature-box, .configurator-card");

    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });
    });
}

// Scroll Reveal Transition
function setupScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal-on-scroll, .section-header, .feature-box, .configurator-card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-revealed");
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px"
    });

    revealElements.forEach(el => {
        if (!el.classList.contains("reveal-on-scroll")) {
            el.classList.add("reveal-on-scroll");
        }
        observer.observe(el);
    });
}

// 3D Focus bridge
window.trigger3DFocus = function (id) {
    const canvasSection = document.getElementById("hero-section");
    if (canvasSection) {
        canvasSection.scrollIntoView({ behavior: "smooth" });
    }
    showToast(`Focused ${id.toUpperCase()} on 3D Ecosystem Core`);
};

// Canvas click bridge
window.highlightSolutionCard = function (id) {
    const card = document.getElementById(`card-${id}`);
    if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.classList.add("highlighted");
        setTimeout(() => card.classList.remove("highlighted"), 1800);
    }
};

// Solution Modal Details
window.openSolutionDetails = function (id) {
    const sol = SOLUTIONS_DATA.find(s => s.id === id);
    if (!sol) return;

    const modal = document.getElementById("details-modal");
    const title = document.getElementById("modal-sol-title");
    const icon = document.getElementById("modal-sol-icon");
    const badge = document.getElementById("modal-sol-badge");
    const desc = document.getElementById("modal-sol-desc");
    const modulesGrid = document.getElementById("modal-sol-modules");

    if (modal && title && icon && badge && desc && modulesGrid) {
        title.textContent = sol.title;
        icon.textContent = sol.icon;
        badge.textContent = sol.badge;
        desc.textContent = sol.tagline;

        modulesGrid.innerHTML = sol.modules.map(mod => `
            <div class="module-item">
                <span style="color: ${sol.color}; font-weight: bold;">✓</span>
                <span>${mod}</span>
            </div>
        `).join("");

        modal.classList.add("open");
    }
};

// Interactive Configurator
function setupConfigurator() {
    const industryCards = document.querySelectorAll(".industry-radio-card");
    const addonBoxes = document.querySelectorAll(".addon-box");
    const summaryIndustry = document.getElementById("summary-industry");
    const summaryCount = document.getElementById("summary-addons-count");
    const summaryTime = document.getElementById("summary-time");

    let selectedIndustry = "Hospital Management";
    let selectedAddons = ["AI Copilot", "WhatsApp Business", "Cloud Deployment"];

    function updateSummary() {
        if (summaryIndustry) summaryIndustry.textContent = selectedIndustry;
        if (summaryCount) summaryCount.textContent = `${selectedAddons.length} Advanced Add-ons`;
        if (summaryTime) {
            const weeks = Math.max(2, 1 + Math.ceil(selectedAddons.length * 0.7));
            summaryTime.textContent = `Est. Deployment: ${weeks} Weeks`;
        }
    }

    industryCards.forEach(card => {
        card.addEventListener("click", () => {
            industryCards.forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            selectedIndustry = card.getAttribute("data-industry");
            updateSummary();
        });
    });

    addonBoxes.forEach(box => {
        box.addEventListener("click", () => {
            box.classList.toggle("active");
            const addonName = box.getAttribute("data-addon");
            if (box.classList.contains("active")) {
                if (!selectedAddons.includes(addonName)) selectedAddons.push(addonName);
            } else {
                selectedAddons = selectedAddons.filter(a => a !== addonName);
            }
            updateSummary();
        });
    });

    updateSummary();
}

// Modals Handling
function setupModals() {
    const detailsModal = document.getElementById("details-modal");
    const demoModal = document.getElementById("demo-modal");
    const closeButtons = document.querySelectorAll(".modal-close-btn");

    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (detailsModal) detailsModal.classList.remove("open");
            if (demoModal) demoModal.classList.remove("open");
        });
    });

    window.addEventListener("click", (e) => {
        if (e.target === detailsModal) detailsModal.classList.remove("open");
        if (e.target === demoModal) demoModal.classList.remove("open");
    });

    window.openDemoModal = function () {
        if (demoModal) demoModal.classList.add("open");
    };

    const demoForm = document.getElementById("demo-request-form");
    if (demoForm) {
        demoForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("demo-name") ? document.getElementById("demo-name").value : "Valued Client";
            const email = document.getElementById("demo-email") ? document.getElementById("demo-email").value : "";
            const phone = document.getElementById("demo-phone") ? document.getElementById("demo-phone").value : "";
            const vertical = document.getElementById("demo-vertical") ? document.getElementById("demo-vertical").value : "Enterprise Suite";
            const deploy = document.getElementById("demo-deployment") ? document.getElementById("demo-deployment").value : "Cloud";
            const notes = document.getElementById("demo-notes") ? document.getElementById("demo-notes").value : "";

            if (demoModal) demoModal.classList.remove("open");
            showToast(`Inquiry dispatched to info@scoopinnovations.in!`);

            addChatMessage(`📋 <strong>New Request Received for ${vertical}</strong><br>Thank you <strong>${name}</strong> (${email}). Your requirements have been forwarded to <code>info@scoopinnovations.in</code>. We will connect with you promptly!`, 'bot');

            const mailSubject = encodeURIComponent(`Inquiry: ${vertical} Demo Request from ${name}`);
            const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSolution: ${vertical}\nDeployment: ${deploy}\nNotes: ${notes}\n\nSent via Scoop Innovations Website`);
            window.location.href = `mailto:info@scoopinnovations.in?subject=${mailSubject}&body=${mailBody}`;

            demoForm.reset();
        });
    }
}

// Smooth scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetAttr = this.getAttribute('href');
            if (targetAttr && targetAttr.length > 1) {
                e.preventDefault();
                const target = document.querySelector(targetAttr);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Toast helper
function showToast(msg) {
    let toast = document.getElementById("app-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "app-toast";
        toast.className = "toast-notice";
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✨</span><span>${msg}</span>`;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);
}

// ==========================================================================
// SCOOP AI CHATBOT / COPILOT ENGINE
// ==========================================================================
window.toggleChatbot = function (forceState) {
    const chatWindow = document.getElementById("chatbot-window");
    if (!chatWindow) return;

    if (typeof forceState === "boolean") {
        if (forceState) chatWindow.classList.add("open");
        else chatWindow.classList.remove("open");
    } else {
        chatWindow.classList.toggle("open");
    }

    if (chatWindow.classList.contains("open")) {
        const input = document.getElementById("chatbot-input");
        if (input) setTimeout(() => input.focus(), 150);
    }
};

window.askQuickChip = function (query) {
    window.toggleChatbot(true);
    handleUserMessage(query);
};

function setupChatbot() {
    const form = document.getElementById("chatbot-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const input = document.getElementById("chatbot-input");
            if (!input) return;
            const text = input.value.trim();
            if (text) {
                handleUserMessage(text);
                input.value = "";
            }
        });
    }

    const input = document.getElementById("chatbot-input");
    if (input) {
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                const text = input.value.trim();
                if (text) {
                    handleUserMessage(text);
                    input.value = "";
                }
            }
        });
    }
}

function handleUserMessage(text) {
    addChatMessage(text, 'user');
    showTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator();
        processAIResponse(text);
    }, 550);
}

function addChatMessage(content, sender = 'bot') {
    const messagesContainer = document.getElementById("chatbot-messages");
    if (!messagesContainer) return;

    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = content;
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById("chatbot-messages");
    if (!messagesContainer) return;

    let typing = document.getElementById("chat-typing");
    if (!typing) {
        typing = document.createElement("div");
        typing.id = "chat-typing";
        typing.className = "chat-typing-dots";
        typing.innerHTML = "<span></span><span></span><span></span>";
        messagesContainer.appendChild(typing);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

function removeTypingIndicator() {
    const typing = document.getElementById("chat-typing");
    if (typing) typing.remove();
}

function processAIResponse(query) {
    const q = query.toLowerCase();

    // Greeting
    if (q === "hi" || q === "hello" || q === "hey" || q.includes("greeting") || q === "start") {
        addChatMessage(`
            👋 Hello! I am your <strong>Scoop AI Copilot</strong>.<br>
            At <strong>Scoop Innovations</strong>, we turn ideas into scalable digital solutions.
            <br><br>
            Which industry solution can I walk you through today?
            <div class="chat-quick-chips">
                <button type="button" class="quick-chip-btn" onclick="askQuickChip('Hospital Management')">🏥 Hospital HMS</button>
                <button type="button" class="quick-chip-btn" onclick="askQuickChip('School & College')">🎓 School ERP</button>
                <button type="button" class="quick-chip-btn" onclick="askQuickChip('Manufacturing ERP')">⚙️ Manufacturing</button>
                <button type="button" class="quick-chip-btn" onclick="askQuickChip('Logistics & Fleet')">🚚 Logistics</button>
                <button type="button" class="quick-chip-btn" onclick="showInChatLeadForm('General Inquiry')">📬 Connect to Sales</button>
            </div>
        `);
        return;
    }

    // 1. Hospital Management
    if (q.includes("hospital") || q.includes("clinic") || q.includes("patient") || q.includes("doctor") || q.includes("ehr") || q.includes("op/ip")) {
        addChatMessage(`
            🏥 <strong>Scoop Hospital Management Suite (HMS)</strong> includes:<br>
            • Patient Registration & Electronic Health Records (EHR)<br>
            • OP / IP Admissions & Bed Ward Management<br>
            • Doctor Duty Rosters & Token Scheduling<br>
            • Integrated Pharmacy & Diagnostic LIMS Sync<br>
            • Insurance / TPA Claims & Automated Medical Billing<br>
            <br>
            Would you like our engineering team to send you the full solution brochure or schedule a live demo?
            <div class="chat-quick-chips">
                <button type="button" class="quick-chip-btn" onclick="showInChatLeadForm('Hospital Management')">📅 Schedule Hospital Demo</button>
                <button type="button" class="quick-chip-btn" onclick="askQuickChip('Connect to Sales')">📬 Contact Team</button>
            </div>
        `);
        return;
    }

    // 2. School / College
    if (q.includes("school") || q.includes("college") || q.includes("campus") || q.includes("student") || q.includes("exam") || q.includes("fee")) {
        addChatMessage(`
            🎓 <strong>Scoop School & College Campus ERP</strong> covers:<br>
            • Online Admissions CRM & Enrollment Tracking<br>
            • Student Lifecycle, Academic Grades & Report Cards<br>
            • Digital Fee Invoicing & Automatic Receipt Generation<br>
            • RFID / Biometric Attendance & Timetable Automation<br>
            • Unified Mobile Portal for Parents & Students<br>
            <br>
            Interested in seeing the parent/student app interface?
            <div class="chat-quick-chips">
                <button type="button" class="quick-chip-btn" onclick="showInChatLeadForm('School & College ERP')">📅 Book Campus Demo</button>
                <button type="button" class="quick-chip-btn" onclick="askQuickChip('WhatsApp Integration')">💬 WhatsApp Sync</button>
            </div>
        `);
        return;
    }

    // 3. Hotel & Restaurant
    if (q.includes("hotel") || q.includes("restaurant") || q.includes("room") || q.includes("housekeeping") || q.includes("dine") || q.includes("kds")) {
        addChatMessage(`
            🏨 <strong>Scoop Hotel & Restaurant Management</strong> includes:<br>
            • Real-time Room Booking Engine & OTA Channel Sync<br>
            • Front Desk Guest Check-in & Housekeeping Status<br>
            • Fast Dine-in Restaurant POS with Split Billing<br>
            • Kitchen Display System (KDS) & Waiter Tablet App<br>
            • Ingredient Inventory & Recipe Costing<br>
            <br>
            Would you like an instant architecture walkthrough?
            <div class="chat-quick-chips">
                <button type="button" class="quick-chip-btn" onclick="showInChatLeadForm('Hotel & Restaurant Suite')">📅 Schedule Demo</button>
            </div>
        `);
        return;
    }

    // 4. Retail POS
    if (q.includes("retail") || q.includes("pos") || q.includes("barcode") || q.includes("billing") || q.includes("store")) {
        addChatMessage(`
            🛍️ <strong>Scoop Retail Management & Omnichannel POS</strong> features:<br>
            • Sub-second Barcode / QR Code Billing<br>
            • Centralized Multi-Store SKU Inventory & Warehouses<br>
            • Tiered Loyalty Programs, Gift Cards & Promo Coupons<br>
            • Offline POS Mode with Automatic Cloud Synchronization<br>
            • Cash Drawer Settlement & Daily Shift Audits<br>
            <br>
            Shall I arrange a demo for your retail chain?
            <div class="chat-quick-chips">
                <button type="button" class="quick-chip-btn" onclick="showInChatLeadForm('Retail POS')">📅 Request Retail Demo</button>
            </div>
        `);
        return;
    }

    // 5. Manufacturing ERP
    if (q.includes("manufacturing") || q.includes("mrp") || q.includes("bom") || q.includes("production") || q.includes("work order")) {
        addChatMessage(`
            ⚙️ <strong>Scoop Manufacturing ERP (Industry 4.0)</strong> features:<br>
            • Master Production Scheduling (MPS) & Job Cards<br>
            • Multi-level Bill of Materials (BOM) & Material Planning (MRP)<br>
            • Quality Assurance (QA/QC) Inspection Checklists<br>
            • Shop Floor Work Orders & Preventative Machine Maintenance<br>
            • Real-time Scrap, Wastage & Cost Accounting<br>
            <br>
            Would you like to connect with our ERP specialists?
            <div class="chat-quick-chips">
                <button type="button" class="quick-chip-btn" onclick="showInChatLeadForm('Manufacturing ERP')">📅 Connect With Architect</button>
            </div>
        `);
        return;
    }

    // 6. Textile & Garments
    if (q.includes("textile") || q.includes("garment") || q.includes("fabric") || q.includes("stitching") || q.includes("cutting") || q.includes("dyeing")) {
        addChatMessage(`
            🧵 <strong>Scoop Textile & Apparel Management</strong> covers:<br>
            • Style Tech Packs & Buyer Merchandising<br>
            • Fabric Procurement, Yarn Counting & Inventory<br>
            • Pattern Cutting Optimization & Line Balancing<br>
            • Dyeing, Washing & Printing Batch Logs<br>
            • Barcoded Bundle Ticket Tracking & Export Dispatch<br>
            <br>
            Would you like to review our garment tech specs?
            <div class="chat-quick-chips">
                <button type="button" class="quick-chip-btn" onclick="showInChatLeadForm('Textile & Garment Management')">📅 Request Demo</button>
            </div>
        `);
        return;
    }

    // 7. Logistics & Transport
    if (q.includes("logistics") || q.includes("transport") || q.includes("fleet") || q.includes("gps") || q.includes("truck") || q.includes("freight")) {
        addChatMessage(`
            🚚 <strong>Scoop Logistics & Fleet Suite</strong> provides:<br>
            • Vehicle & Trailer Registry with Maintenance Reminders<br>
            • Route Dispatcher & Electronic Proof of Delivery (e-POD)<br>
            • Live GPS Telematics, Geo-fencing & Speed Alerts<br>
            • Driver Duty Rostering, Trip Expenses & Toll Accounting<br>
            • Fuel Log Mileage Tracking with Leakage Detection<br>
            <br>
            Would you like a live demonstration of our fleet tracking?
            <div class="chat-quick-chips">
                <button type="button" class="quick-chip-btn" onclick="showInChatLeadForm('Logistics & Fleet')">📅 Schedule Live Demo</button>
            </div>
        `);
        return;
    }

    // 8. Pharmacy Management
    if (q.includes("pharmacy") || q.includes("drug") || q.includes("medicine") || q.includes("prescription") || q.includes("expiry")) {
        addChatMessage(`
            💊 <strong>Scoop Pharmacy Management Suite</strong> ensures:<br>
            • Batch-level Drug Tracking & Expiry Alerts<br>
            • Digital Doctor Prescription Ingestion & OTC Billing<br>
            • Narcotics & Controlled Substance Registers<br>
            • Automatic Minimum Stock Reordering<br>
            • Near-Expiry Supplier Return Management<br>
            <br>
            Would you like to test the pharmacy billing module?
            <div class="chat-quick-chips">
                <button type="button" class="quick-chip-btn" onclick="showInChatLeadForm('Pharmacy Management')">📅 Book Walkthrough</button>
            </div>
        `);
        return;
    }

    // 9. Laboratory LIMS
    if (q.includes("lab") || q.includes("lims") || q.includes("sample") || q.includes("pathology") || q.includes("test report")) {
        addChatMessage(`
            🔬 <strong>Scoop Laboratory Information Management (LIMS)</strong> features:<br>
            • Patient Specimen Collection & Barcode Labeling<br>
            • Bidirectional Interfacing with Pathology Diagnostic Analyzers<br>
            • Pathologist Digital Signature & Automated PDF Generation<br>
            • Instant WhatsApp & SMS Test Report Dispatch to Patients<br>
            • Lab Reagents Inventory & Doctor Referral Commissions<br>
            <br>
            Interested in analyzer integration details?
            <div class="chat-quick-chips">
                <button type="button" class="quick-chip-btn" onclick="showInChatLeadForm('Laboratory LIMS')">📅 Connect to Architect</button>
            </div>
        `);
        return;
    }

    // 10. Legal Practice
    if (q.includes("legal") || q.includes("law") || q.includes("court") || q.includes("case") || q.includes("hearing") || q.includes("advocate")) {
        addChatMessage(`
            ⚖️ <strong>Scoop Legal Practice Management</strong> provides:<br>
            • Case Matter Management & Conflict of Interest Checks<br>
            • Court Hearing Calendar with Automatic Reminders<br>
            • Encrypted Legal Document Vault with Versioning<br>
            • Billable Hours Tracking & Retainer Invoicing<br>
            • Secure Client Portal for Case Updates<br>
            <br>
            Would you like to schedule a confidential demo?
            <div class="chat-quick-chips">
                <button type="button" class="quick-chip-btn" onclick="showInChatLeadForm('Legal Practice')">📅 Book Legal Demo</button>
            </div>
        `);
        return;
    }

    // Advanced Features
    if (q.includes("ai") || q.includes("whatsapp") || q.includes("biometric") || q.includes("gps") || q.includes("cloud") || q.includes("on-premise") || q.includes("integration") || q.includes("api")) {
        addChatMessage(`
            ⚡ <strong>Scoop Advanced Capabilities & Integrations:</strong><br>
            • <strong>AI Copilot</strong>: Smart summaries, auto-scheduling & chatbot assistants<br>
            • <strong>WhatsApp Business</strong>: Automated notifications & billing PDF delivery<br>
            • <strong>Biometric Sync</strong>: RFID & facial recognition attendance devices<br>
            • <strong>GPS Telematics</strong>: Vehicle live tracking & geo-fencing<br>
            • <strong>Deployment</strong>: High-availability Cloud or offline air-gapped On-Premises<br>
            <br>
            Can I have our technical lead send you the integration specs?
            <div class="chat-quick-chips">
                <button type="button" class="quick-chip-btn" onclick="showInChatLeadForm('Advanced Integrations')">📬 Request Specs</button>
            </div>
        `);
        return;
    }

    // Connect to Sales / Email / Pricing / Demo
    if (q.includes("connect") || q.includes("sales") || q.includes("contact") || q.includes("email") || q.includes("mail") || q.includes("price") || q.includes("cost") || q.includes("demo") || q.includes("quote")) {
        showInChatLeadForm("Enterprise Solution Consultation");
        return;
    }

    // Smart Product Suggestion Fallback
    const suggestionRules = [
        { kw: ['manage','software','system','solution','platform','erp','crm','tool'], chips: ['Hospital Management','School & College','Manufacturing ERP','Retail POS'] },
        { kw: ['health','medical','clinic','icu','ward','nurse','bed','doctor'], chips: ['Hospital Management','Pharmacy Management','Laboratory LIMS'] },
        { kw: ['student','teacher','campus','school','college','fee','exam','timetable'], chips: ['School & College'] },
        { kw: ['staff','hr','payroll','employee','attendance','leave'], chips: ['School & College','Manufacturing ERP'] },
        { kw: ['inventory','stock','warehouse','purchase','supply','purchase order'], chips: ['Retail POS','Manufacturing ERP','Pharmacy Management'] },
        { kw: ['customer','sales','crm','followup','lead','client'], chips: ['Retail POS','Legal Practice'] },
        { kw: ['delivery','route','driver','truck','vehicle','trip','freight'], chips: ['Logistics & Fleet'] },
        { kw: ['billing','invoice','gst','tax','payment','receipt'], chips: ['Hospital Management','Retail POS','School & College'] },
        { kw: ['fabric','yarn','cutting','stitching','garment','apparel','thread'], chips: ['Textile & Garments'] },
        { kw: ['report','analytics','dashboard','kpi','insight'], chips: ['Manufacturing ERP','Hospital Management','Logistics & Fleet'] },
    ];

    let matchedRule = null;
    for (const rule of suggestionRules) {
        if (rule.kw.some(k => q.includes(k))) { matchedRule = rule; break; }
    }

    if (matchedRule) {
        const chipsHtml = `<div class="chat-quick-chips">${matchedRule.chips.map(c => `<button type="button" class="quick-chip-btn" onclick="askQuickChip('${c}')">${c}</button>`).join('')}<button type="button" class="quick-chip-btn" onclick="showInChatLeadForm('General Inquiry')">📬 Contact Us</button></div>`;
        addChatMessage(`
            Based on what you need, here are the Scoop solutions that can help you:<br><br>
            ${chipsHtml}<br>
            Click any solution to learn more, or share more details and I'll narrow it down further! 😊
        `);
    } else {
        addChatMessage(`
            At <strong>Scoop Innovations</strong>, we build complete enterprise software across 10 verticals:<br><br>
            🏥 Hospital &nbsp;|&nbsp; 🎓 School & College &nbsp;|&nbsp; 🏨 Hotel<br>
            🛍️ Retail POS &nbsp;|&nbsp; ⚙️ Manufacturing &nbsp;|&nbsp; 🧵 Textile<br>
            🚚 Logistics &nbsp;|&nbsp; 💊 Pharmacy &nbsp;|&nbsp; 🔬 Lab &nbsp;|&nbsp; ⚖️ Legal<br><br>
            📧 <a href="mailto:info@scoopinnovations.in" style="color:var(--scoop-cyan);font-weight:bold;">info@scoopinnovations.in</a><br><br>
            Which industry are you in? I'll suggest the perfect solution!
            <div class="chat-quick-chips">
                <button type="button" class="quick-chip-btn" onclick="askQuickChip('Hospital Management')">🏥 Hospital</button>
                <button type="button" class="quick-chip-btn" onclick="askQuickChip('Retail POS')">🛍️ Retail</button>
                <button type="button" class="quick-chip-btn" onclick="askQuickChip('Manufacturing ERP')">⚙️ Manufacturing</button>
                <button type="button" class="quick-chip-btn" onclick="showInChatLeadForm('General Inquiry')">📬 Contact Us</button>
            </div>
        `);
    }
}

// Interactive In-Chat Lead Form
window.showInChatLeadForm = function (solutionName) {
    const formId = "lead-form-" + Date.now();
    addChatMessage(`
        <div class="chat-lead-card" id="${formId}">
            <h5>📬 Connect with Scoop Solutions Team</h5>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 6px;">
                Topic: <strong>${solutionName}</strong>. Our team will review your requirements and respond via <strong>info@scoopinnovations.in</strong>.
            </p>
            <input type="text" class="chat-lead-input" id="${formId}-name" placeholder="Your Full Name *" required>
            <input type="email" class="chat-lead-input" id="${formId}-email" placeholder="Your Business Email *" required>
            <input type="tel" class="chat-lead-input" id="${formId}-phone" placeholder="Phone / WhatsApp Number *" required>
            <input type="text" class="chat-lead-input" id="${formId}-notes" placeholder="Specific requirements or branch count...">
            <button type="button" class="chat-lead-btn" onclick="submitInChatLead('${formId}', '${solutionName}')">
                Send Inquiry to info@scoopinnovations.in
            </button>
        </div>
    `);
};

window.submitInChatLead = function (formId, solutionName) {
    const nameEl = document.getElementById(`${formId}-name`);
    const emailEl = document.getElementById(`${formId}-email`);
    const phoneEl = document.getElementById(`${formId}-phone`);
    const notesEl = document.getElementById(`${formId}-notes`);

    const name = nameEl ? nameEl.value.trim() : "";
    const email = emailEl ? emailEl.value.trim() : "";
    const phone = phoneEl ? phoneEl.value.trim() : "";
    const notes = notesEl ? notesEl.value.trim() : "";

    if (!name || !email || !phone) {
        showToast("Please fill in your Name, Email, and Phone number.");
        return;
    }

    const card = document.getElementById(formId);
    if (card) {
        card.innerHTML = `
            <div class="chat-dispatch-notice">
                <span>✅ <strong>Inquiry Dispatched Successfully!</strong></span>
                <span>Thank you, <strong>${name}</strong>. Your details have been sent to our solution architects at <strong>info@scoopinnovations.in</strong>.</span>
                <span>We will contact you at <strong>${email}</strong> / <strong>${phone}</strong> shortly.</span>
                <span style="margin-top: 6px;">
                    🌐 Explore more on our official portal: 
                    <a href="https://scoopinnovations.in/" target="_blank" style="color: var(--scoop-cyan); font-weight: bold;">scoopinnovations.in</a>
                </span>
                <a href="mailto:info@scoopinnovations.in?subject=Inquiry for ${encodeURIComponent(solutionName)} - ${encodeURIComponent(name)}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0ASolution: ${encodeURIComponent(solutionName)}%0ANotes: ${encodeURIComponent(notes)}" 
                   style="margin-top: 6px; font-weight: bold; text-decoration: underline; color: var(--scoop-cyan);">
                    Click here to open email client directly
                </a>
            </div>
        `;
    }

    showToast(`Inquiry sent to info@scoopinnovations.in!`);
};
