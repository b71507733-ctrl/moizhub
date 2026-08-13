/* =========================================================
   MOIZHUB — MAIN JAVASCRIPT
   Works with the provided index.html + style.css
   ========================================================= */

(() => {
    "use strict";

    /* =====================================================
       CONFIG
       ===================================================== */

    const CONFIG = {
        email: "abdulmoizmeer2@gmail.com",
        whatsapp: "03301250824",

        socialLinks: {
            github: "https://github.com/b71507733-ctrl",
            tiktok: "https://www.tiktok.com/search?q=m26_offical&t=1786555371231",
            whatsapp: "https://wa.me/03301250824",
            instagram: "https://www.instagram.com/moiz_shahid7/"
        },

        projects: [
            {
                number: "01",
                title: "Portfolio Website",
                description: "A carefully crafted personal portfolio designed to showcase my development work, technical skills, and creative approach to building modern digital experiences. Built with a strong focus on responsive design, smooth interactions, clean structure, and a distinctive visual identity.",
                image: "project-1.jpg",
                stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
                features: [
                    "Fully responsive across devices",
                    "Smooth interactive animations",
                    "Custom visual design system",
                    "SEO-friendly structure",
                    "Interactive navigation and components",
                    "Performance-focused frontend"
                ],
                contact: "#connect"
            },

            {
                number: "02",
                title: "E-Commerce Website",
                description: "A modern e-commerce experience focused on presenting products clearly, keeping navigation effortless, and creating a smooth shopping journey across every screen. Built with a responsive interface, custom components, and dynamic functionality that brings the storefront to life.",
                image: "project-4.jpg",
                stack: ["Bootstrap", "JavaScript", "PHP"],
                features: [
                    "Fully responsive storefront",
                    "Custom product components",
                    "Dynamic product interactions",
                    "Clean and intuitive navigation",
                    "Mobile-first user experience",
                    "Structured frontend architecture"
                ],
                contact: "#connect"
            },

            {
                number: "03",
                title: "Laravel Management System",
                description: "A database-driven web application built around a structured Laravel backend, with a clean foundation for managing data, users, and application workflows. The project combines reliable server-side logic with MySQL and a responsive interface to create a practical full stack system.",
                image: "project-3.jpg",
                stack: ["Laravel", "PHP", "MySQL"],
                features: [
                    "Structured Laravel backend",
                    "MySQL database integration",
                    "Complete CRUD functionality",
                    "Organized application architecture",
                    "Dynamic data management",
                    "Responsive administration interface"
                ],
                contact: "#connect"
            }
        ]
    };


    /* =====================================================
       HELPERS
       ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const reducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const touchDevice =
        window.matchMedia("(pointer: coarse)").matches;


    const escapeHTML = (value = "") => {
        return String(value).replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[char]));
    };


    const validUrl = url => {
        if (!url || url === "#") return false;

        if (
            url.includes("YOUR_") ||
            url.includes("example.com")
        ) {
            return false;
        }

        try {
            new URL(url, window.location.href);
            return true;
        } catch {
            return false;
        }
    };


    /* =====================================================
       1. LOADER
       ===================================================== */

    function initLoader() {

        const loader = $("#loader");
        const fill = $("#loaderFill");
        const percentage = $("#loaderPct");

        if (!loader || !fill || !percentage) return;

        if (reducedMotion) {
            fill.style.width = "100%";
            percentage.textContent = "100%";

            setTimeout(() => {
                loader.classList.add("is-hidden");
            }, 100);

            return;
        }

        let progress = 0;

        const interval = setInterval(() => {

            progress += Math.floor(Math.random() * 8) + 3;

            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);

                setTimeout(() => {
                    loader.classList.add("is-hidden");
                    document.body.classList.add("is-ready");
                }, 400);
            }

            fill.style.width = `${progress}%`;
            percentage.textContent =
                `${String(progress).padStart(2, "0")}%`;

        }, 45);
    }


    /* =====================================================
       2. ROLE ROTATOR
       ===================================================== */

    function initRoleRotator() {

        const words = $$("#roleRotator .hero__role-word");

        if (words.length < 2 || reducedMotion) return;

        let current = 0;

        setInterval(() => {

            const oldWord = words[current];

            current = (current + 1) % words.length;

            const newWord = words[current];

            oldWord.classList.remove("is-active");
            oldWord.classList.add("is-leaving");

            newWord.classList.remove("is-leaving");
            newWord.classList.add("is-active");

            setTimeout(() => {
                oldWord.classList.remove("is-leaving");
            }, 600);

        }, 2800);
    }


    /* =====================================================
       3. SCROLL REVEAL
       ===================================================== */

    function initReveal() {

        const elements = $$("[data-reveal]");

        if (!elements.length) return;

        if (
            reducedMotion ||
            !("IntersectionObserver" in window)
        ) {
            elements.forEach(element => {
                element.classList.add("is-visible");
            });

            return;
        }

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px"
            }
        );

        elements.forEach(element => {
            observer.observe(element);
        });
    }


    /* =====================================================
       4. MOUSE BACKGROUND GLOW
       ===================================================== */

    function initBackgroundGlow() {

        const glow = $("#bgGlow");

        if (!glow || touchDevice || reducedMotion) return;

        let targetX = 50;
        let targetY = 20;

        let currentX = 50;
        let currentY = 20;

        window.addEventListener(
            "pointermove",
            event => {

                targetX =
                    (event.clientX / window.innerWidth) * 100;

                targetY =
                    (event.clientY / window.innerHeight) * 100;

            },
            { passive: true }
        );


        function animate() {

            currentX += (targetX - currentX) * 0.08;
            currentY += (targetY - currentY) * 0.08;

            document.documentElement.style.setProperty(
                "--gx",
                `${currentX}%`
            );

            document.documentElement.style.setProperty(
                "--gy",
                `${currentY}%`
            );

            requestAnimationFrame(animate);
        }

        animate();
    }


    /* =====================================================
       5. HERO PARTICLES
       ===================================================== */

    function initHeroParticles() {

        const field = $("#heroField");

        if (!field || touchDevice || reducedMotion) return;

        const particleCount =
            window.innerWidth > 1400 ? 50 : 32;

        const fragment =
            document.createDocumentFragment();

        for (let i = 0; i < particleCount; i++) {

            const particle = document.createElement("span");

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.top =
                `${Math.random() * 100}%`;

            particle.style.opacity =
                `${0.2 + Math.random() * 0.5}`;

            particle.style.transform =
                `scale(${0.5 + Math.random() * 1.5})`;

            fragment.appendChild(particle);
        }

        field.appendChild(fragment);


        window.addEventListener(
            "pointermove",
            event => {

                const x =
                    (event.clientX / window.innerWidth - 0.5) * 15;

                const y =
                    (event.clientY / window.innerHeight - 0.5) * 10;

                field.style.transform =
                    `translate3d(${x}px, ${y}px, 0)`;

            },
            { passive: true }
        );
    }


    /* =====================================================
       6. CUSTOM CURSOR
       ===================================================== */

    function initCursor() {

        const cursor = $("#cursor");

        if (!cursor || touchDevice || reducedMotion) {

            document.documentElement
                .classList.add("no-custom-cursor");

            return;
        }

        const label = $("#cursorLabel");

        let mouseX = -100;
        let mouseY = -100;

        let currentX = -100;
        let currentY = -100;


        window.addEventListener(
            "pointermove",
            event => {

                mouseX = event.clientX;
                mouseY = event.clientY;

                cursor.classList.remove("is-hidden");

            },
            { passive: true }
        );


        function animateCursor() {

            currentX +=
                (mouseX - currentX) * 0.20;

            currentY +=
                (mouseY - currentY) * 0.20;

            cursor.style.transform =
                `translate3d(${currentX}px, ${currentY}px, 0)`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();


        $$("[data-cursor]").forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    const type =
                        element.dataset.cursor;

                    cursor.classList.toggle(
                        "is-view",
                        type === "view"
                    );

                    cursor.classList.toggle(
                        "is-open",
                        type === "open"
                    );

                    if (label) {
                        label.textContent =
                            type === "view"
                                ? "VIEW"
                                : "OPEN";
                    }
                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursor.classList.remove(
                        "is-view",
                        "is-open"
                    );

                    if (label) {
                        label.textContent = "";
                    }
                }
            );

        });
    }


    /* =====================================================
       7. SCROLL PROGRESS
       ===================================================== */

    function initScrollProgress() {

        const fill = $("#scrollFill");
        const coordinate = $("#railCoord");

        if (!fill) return;

        function update() {

            const documentHeight =
                document.documentElement.scrollHeight;

            const viewportHeight =
                window.innerHeight;

            const scrollable =
                documentHeight - viewportHeight;

            const percent =
                scrollable > 0
                    ? (window.scrollY / scrollable) * 100
                    : 0;

            fill.style.width =
                `${Math.min(100, percent)}%`;

            if (coordinate) {
                coordinate.textContent =
                    `${percent.toFixed(2).padStart(5, "0")}%`;
            }
        }

        window.addEventListener(
            "scroll",
            update,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            update,
            { passive: true }
        );

        update();
    }


    /* =====================================================
       8. ACTIVE SECTION NAVIGATION
       ===================================================== */

    function initActiveNavigation() {

        const links =
            $$("[data-section]");

        const sections =
            $$("main section[id]");

        if (!sections.length) return;


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        links.forEach(link => {

                            link.classList.toggle(
                                "is-active",
                                link.dataset.section ===
                                entry.target.id
                            );

                        });

                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );


        sections.forEach(section => {
            observer.observe(section);
        });
    }


    /* =====================================================
       9. MOBILE NAVIGATION
       ===================================================== */

    function initMobileNavigation() {

        const toggle =
            $("#mobileNavToggle");

        const nav =
            $("#mobileNav");

        if (!toggle || !nav) return;


        function closeMenu() {

            nav.classList.remove("is-open");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "nav-open"
            );
        }


        toggle.addEventListener(
            "click",
            () => {

                const open =
                    nav.classList.toggle("is-open");

                toggle.setAttribute(
                    "aria-expanded",
                    String(open)
                );

                document.body.classList.toggle(
                    "nav-open",
                    open
                );
            }
        );


        $$("#mobileNav a").forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


        document.addEventListener(
            "keydown",
            event => {

                if (event.key === "Escape") {
                    closeMenu();
                }

            }
        );
    }


    /* =====================================================
       10. SKILL MAP
       ===================================================== */

    function initSkillMap() {

        const map = $("#skillMap");
        const svg = $("#skillLines");
        const core = $("#skillCore");

        const nodes =
            $$(".skill-map__node[data-skill]");

        const description =
            $("#skillDesc");

        if (
            !map ||
            !svg ||
            !core ||
            !nodes.length
        ) return;


        const positions = [
            [18, 22],
            [50, 12],
            [82, 24],
            [87, 66],
            [66, 88],
            [34, 88],
            [12, 64]
        ];


        nodes.forEach((node, index) => {

            const position =
                positions[index];

            if (!position) return;

            node.style.setProperty(
                "--x",
                `${position[0]}%`
            );

            node.style.setProperty(
                "--y",
                `${position[1]}%`
            );
        });


        function drawLines() {

            svg.innerHTML = "";

            const mapRect =
                map.getBoundingClientRect();

            const coreRect =
                core.getBoundingClientRect();


            const centerX =
                coreRect.left -
                mapRect.left +
                coreRect.width / 2;

            const centerY =
                coreRect.top -
                mapRect.top +
                coreRect.height / 2;


            nodes.forEach(node => {

                const rect =
                    node.getBoundingClientRect();

                const x =
                    rect.left -
                    mapRect.left +
                    rect.width / 2;

                const y =
                    rect.top -
                    mapRect.top +
                    rect.height / 2;


                const line =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "path"
                    );

                line.setAttribute(
                    "d",
                    `M ${centerX} ${centerY} L ${x} ${y}`
                );

                line.dataset.skill =
                    node.dataset.skill;

                svg.appendChild(line);
            });
        }


        function activateNode(node) {

            const skill =
                node.dataset.skill;

            nodes.forEach(item => {

                item.classList.toggle(
                    "is-active",
                    item === node
                );

            });


            $$("path", svg).forEach(path => {

                path.classList.toggle(
                    "is-active",
                    path.dataset.skill === skill
                );

            });


            if (description) {

                description.textContent =
                    `${skill} — ${node.dataset.desc || ""}`;

            }
        }


        nodes.forEach(node => {

            node.addEventListener(
                "mouseenter",
                () => activateNode(node)
            );

            node.addEventListener(
                "focus",
                () => activateNode(node)
            );

            node.addEventListener(
                "click",
                () => activateNode(node)
            );

        });


        window.addEventListener(
            "resize",
            drawLines,
            { passive: true }
        );

        window.addEventListener(
            "load",
            drawLines
        );

        setTimeout(drawLines, 300);
    }


    /* =====================================================
       11. PROJECTS
       ===================================================== */

    function renderProjects() {

        const container =
            $("#projectList");

        if (!container) return;


        container.innerHTML =
            CONFIG.projects.map((project, index) => {

                const live =
                    validUrl(project.live);

                const github =
                    validUrl(project.github);


                return `
                    <article
                        class="project"
                        data-project="${escapeHTML(project.number)}"
                        data-reveal
                    >

                        <div class="project__grid">

                            <div
                                class="project__media"
                                data-cursor="view"
                            >

                                <img
                                    src="${escapeHTML(project.image)}"
                                    alt="${escapeHTML(project.title)} preview"
                                    loading="${index === 0 ? "eager" : "lazy"}"
                                >

                                <div
                                    class="project__media-frame"
                                    aria-hidden="true"
                                ></div>

                                <span
                                    class="project__media-tag"
                                >
                                    PROJECT ${escapeHTML(project.number)}
                                </span>

                            </div>


                            <div class="project__body">

                                <span class="project__index">
                                    PROJECT ${escapeHTML(project.number)}
                                </span>

                                <h3 class="project__title">
                                    ${escapeHTML(project.title)}
                                </h3>

                                <p class="project__desc">
                                    ${escapeHTML(project.description)}
                                </p>


                                <div class="project__stack">

                                    ${project.stack.map(
                    tech => `
                                            <span>
                                                ${escapeHTML(tech)}
                                            </span>
                                        `
                ).join("")}

                                </div>


                                <ul class="project__features">

                                    ${project.features.map(
                    feature => `
                                            <li>
                                                ${escapeHTML(feature)}
                                            </li>
                                        `
                ).join("")}

                                </ul>


                                <div class="project__actions">

    <a
        href="https://wa.me/923301250824"
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="open"
        aria-label="Let's connect with me on WhatsApp"
    >
        <i class="bi bi-whatsapp" aria-hidden="true"></i>
        <span>LET'S CONNECT WITH ME</span>
        <span>↗</span>
    </a>

</div>

                            </div>

                        </div>

                    </article>
                `;

            }).join("");


        initReveal();
        initCursor();
        initProjectParallax();
    }


    /* =====================================================
       12. PROJECT IMAGE PARALLAX
       ===================================================== */

    function initProjectParallax() {

        if (touchDevice || reducedMotion) return;


        $$(".project__media").forEach(media => {

            const image =
                $("img", media);

            if (!image) return;


            media.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        media.getBoundingClientRect();

                    const x =
                        (event.clientX - rect.left) /
                        rect.width -
                        0.5;

                    const y =
                        (event.clientY - rect.top) /
                        rect.height -
                        0.5;


                    image.style.transform =
                        `
                        scale(1.08)
                        translate3d(
                            ${x * 10}px,
                            ${y * 10}px,
                            0
                        )
                        `;
                }
            );


            media.addEventListener(
                "pointerleave",
                () => {
                    image.style.transform = "";
                }
            );

        });
    }


    /* =====================================================
       13. SERVICES
       ===================================================== */

    function initServices() {

        const services =
            $$(".service-line");

        const description =
            $("#serviceDesc");

        services.forEach(service => {

            function activate() {

                services.forEach(item => {
                    item.classList.remove("is-active");
                });

                service.classList.add("is-active");


                if (description) {

                    description.textContent =
                        `${service.dataset.desc}  [ ${service.dataset.tech} ]`;

                }
            }


            service.addEventListener(
                "mouseenter",
                activate
            );

            service.addEventListener(
                "focus",
                activate
            );

            service.addEventListener(
                "click",
                activate
            );

            service.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();
                        activate();

                    }

                }
            );
        });
    }


    /* =====================================================
       14. SOCIAL LINKS
       ===================================================== */

    function initSocialLinks() {

        const panel =
            $("#socialPanel");

        const footer =
            $("#footerSocial");

        const socialInfo = {

            github: {
                name: "GitHub",
                description: "Code, repositories and experiments",
                icon: "bi-github"
            },

            linkedin: {
                name: "LinkedIn",
                description: "Professional profile and network",
                icon: "bi-linkedin"
            },

            tiktok: {
                name: "TikTok",
                description: "Creative work and short-form content",
                icon: "bi-tiktok"
            },

            whatsapp: {
                name: "WhatsApp",
                description: "Direct project conversations",
                icon: "bi-whatsapp"
            },

            instagram: {
                name: "Instagram",
                description: "Visual work and updates",
                icon: "bi-instagram"
            }

        };


        const available =
            Object.entries(CONFIG.socialLinks)
                .filter(([key, url]) => {
                    return socialInfo[key] &&
                        validUrl(url);
                });


        if (panel) {

            panel.innerHTML =
                available.map(([key, url]) => {

                    const item =
                        socialInfo[key];

                    return `
                        <li>
                            <a
                                class="social-panel__item"
                                href="${escapeHTML(url)}"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor="open"
                            >

                                <span class="social-panel__icon">
                                    <i class="bi ${item.icon}"></i>
                                </span>

                                <span>
                                    <span class="social-panel__name">
                                        ${item.name}
                                    </span>

                                    <span class="social-panel__desc">
                                        ${item.description}
                                    </span>
                                </span>

                                <span class="social-panel__arrow">
                                    ↗
                                </span>

                            </a>
                        </li>
                    `;

                }).join("");

        }


        if (footer) {

            footer.innerHTML =
                available.map(([key, url]) => {

                    const item =
                        socialInfo[key];

                    return `
                        <a
                            href="${escapeHTML(url)}"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="${item.name}"
                            data-cursor="open"
                        >
                            <i
                                class="bi ${item.icon}"
                                aria-hidden="true"
                            ></i>
                        </a>
                    `;

                }).join("");
        }


        initCursor();
    }


    /* =====================================================
       15. COPY EMAIL / WHATSAPP
       ===================================================== */

    function initCopyButtons() {

        const emailButton =
            $("#copyEmailBtn");

        const whatsappButton =
            $("#copyWhatsappBtn");

        const emailDisplay =
            $("#emailDisplay");

        const whatsappDisplay =
            $("#whatsappDisplay");

        const note =
            $("#copyNote");


        if (emailDisplay) {
            emailDisplay.textContent =
                CONFIG.email;
        }

        if (whatsappDisplay) {
            whatsappDisplay.textContent =
                CONFIG.whatsapp;
        }


        async function copy(value, name) {

            if (
                !value ||
                value.includes("YOUR_") ||
                value.includes("example.com")
            ) {

                if (note) {
                    note.textContent =
                        `Add your real ${name} first.`;
                }

                return;
            }


            try {

                await navigator.clipboard.writeText(value);

                if (note) {
                    note.textContent =
                        `${name} copied to clipboard.`;
                }

            } catch {

                if (note) {
                    note.textContent =
                        `Unable to copy ${name}.`;
                }

            }


            setTimeout(() => {

                if (note) {
                    note.textContent = "";
                }

            }, 2500);
        }


        emailButton?.addEventListener(
            "click",
            () => copy(CONFIG.email, "Email")
        );


        whatsappButton?.addEventListener(
            "click",
            () => copy(CONFIG.whatsapp, "WhatsApp")
        );
    }


    /* =====================================================
       16. CONTACT FORM
       ===================================================== */

    function initContactForm() {

        const form =
            $("#contactForm");

        const status =
            $("#contactStatus");

        if (!form) return;


        // Show any status message the server (send.php) sent back
        // via ?sent=1 / ?sent=0&reason=... after a redirect.
        if (status && status.textContent.trim()) {
            status.dataset.serverType =
                status.dataset.serverType || "";
        }

        form.addEventListener(
            "submit",
            event => {

                const name =
                    $("#cfName")?.value.trim();

                const email =
                    $("#cfEmail")?.value.trim();

                const message =
                    $("#cfMessage")?.value.trim();


                if (!name || !email || !message) {

                    event.preventDefault();

                    status.textContent =
                        "Please complete all fields.";

                    return;
                }


                const emailValid =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        .test(email);


                if (!emailValid) {

                    event.preventDefault();

                    status.textContent =
                        "Please enter a valid email address.";

                    return;
                }

                // Validation passed — let the form submit normally
                // to send.php (core PHP), which validates again on
                // the server and sends the message straight to
                // WhatsApp via the CallMeBot API — the visitor
                // doesn't need to do anything else.
                status.textContent =
                    "Sending your message…";
            }
        );
    }


    /* =====================================================
       17. COMMAND PALETTE
       ===================================================== */

    function initCommandPalette() {

        const palette =
            $("#palette");

        const overlay =
            $("#paletteOverlay");

        const input =
            $("#paletteInput");

        const list =
            $("#paletteList");

        if (
            !palette ||
            !overlay ||
            !input ||
            !list
        ) return;


        const commands = [

            {
                title: "Go to Home",
                tag: "NAV",
                action: () => goTo("#hero")
            },

            {
                title: "Open Identity",
                tag: "NAV",
                action: () => goTo("#identity")
            },

            {
                title: "Open Skills",
                tag: "NAV",
                action: () => goTo("#skills")
            },

            {
                title: "View Projects",
                tag: "NAV",
                action: () => goTo("#work")
            },

            {
                title: "View Services",
                tag: "NAV",
                action: () => goTo("#services")
            },

            {
                title: "Open Journey",
                tag: "NAV",
                action: () => goTo("#journey")
            },

            {
                title: "Open Contact",
                tag: "NAV",
                action: () => goTo("#connect")
            },

            {
                title: "Open GitHub",
                tag: "SOCIAL",
                action: () =>
                    openExternal(CONFIG.socialLinks.github)
            },

            {
                title: "Open LinkedIn",
                tag: "SOCIAL",
                action: () =>
                    openExternal(CONFIG.socialLinks.linkedin)
            },

            {
                title: "Open TikTok",
                tag: "SOCIAL",
                action: () =>
                    openExternal(CONFIG.socialLinks.tiktok)
            },

            {
                title: "Open WhatsApp",
                tag: "SOCIAL",
                action: () =>
                    openExternal(CONFIG.socialLinks.whatsapp)
            },

            {
                title: "Copy Email",
                tag: "CONTACT",
                action: () =>
                    $("#copyEmailBtn")?.click()
            },

            {
                title: "Back to Top",
                tag: "SYSTEM",
                action: () => {

                    window.scrollTo({
                        top: 0,
                        behavior:
                            reducedMotion
                                ? "auto"
                                : "smooth"
                    });

                    closePalette();
                }
            }

        ];


        let filtered =
            [...commands];

        let selected = 0;


        function goTo(selector) {

            closePalette();

            document
                .querySelector(selector)
                ?.scrollIntoView({
                    behavior:
                        reducedMotion
                            ? "auto"
                            : "smooth"
                });
        }


        function openExternal(url) {

            if (!validUrl(url)) {

                input.value =
                    "This URL is not configured.";

                render();

                return;
            }


            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

            closePalette();
        }


        function render() {

            const query =
                input.value
                    .trim()
                    .toLowerCase();


            filtered =
                commands.filter(command =>
                    `${command.title} ${command.tag}`
                        .toLowerCase()
                        .includes(query)
                );


            if (!filtered.length) {

                list.innerHTML = `
                    <li>
                        <span>No command found.</span>
                        <span class="tag">ESC</span>
                    </li>
                `;

                return;
            }


            selected =
                Math.min(
                    selected,
                    filtered.length - 1
                );


            list.innerHTML =
                filtered.map((command, index) => {

                    return `
                        <li
                            class="${index === selected
                        ? "is-selected"
                        : ""}"
                            data-index="${index}"
                            role="option"
                            aria-selected="${index === selected}"
                        >

                            <span>
                                ${escapeHTML(command.title)}
                            </span>

                            <span class="tag">
                                ${escapeHTML(command.tag)}
                            </span>

                        </li>
                    `;

                }).join("");


            $$(
                "li[data-index]",
                list
            ).forEach(item => {

                item.addEventListener(
                    "mouseenter",
                    () => {

                        selected =
                            Number(item.dataset.index);

                        render();

                    }
                );


                item.addEventListener(
                    "click",
                    () => {

                        filtered[selected]?.action();

                    }
                );

            });
        }


        function openPalette() {

            palette.hidden = false;
            overlay.hidden = false;

            document.body.classList.add(
                "palette-open"
            );

            input.value = "";
            selected = 0;

            render();

            setTimeout(() => {
                input.focus();
            }, 50);
        }


        function closePalette() {

            palette.hidden = true;
            overlay.hidden = true;

            document.body.classList.remove(
                "palette-open"
            );
        }


        $("#openPaletteBtn")
            ?.addEventListener(
                "click",
                openPalette
            );


        $("#openPaletteBtnMobile")
            ?.addEventListener(
                "click",
                openPalette
            );


        overlay.addEventListener(
            "click",
            closePalette
        );


        input.addEventListener(
            "input",
            () => {

                selected = 0;

                render();

            }
        );


        input.addEventListener(
            "keydown",
            event => {

                if (event.key === "ArrowDown") {

                    event.preventDefault();

                    selected =
                        Math.min(
                            selected + 1,
                            filtered.length - 1
                        );

                    render();
                }


                if (event.key === "ArrowUp") {

                    event.preventDefault();

                    selected =
                        Math.max(
                            selected - 1,
                            0
                        );

                    render();
                }


                if (event.key === "Enter") {

                    event.preventDefault();

                    filtered[selected]?.action();
                }


                if (event.key === "Escape") {

                    closePalette();
                }

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    (event.ctrlKey || event.metaKey) &&
                    event.key.toLowerCase() === "k"
                ) {

                    event.preventDefault();

                    if (palette.hidden) {
                        openPalette();
                    } else {
                        closePalette();
                    }
                }


                if (
                    event.key === "Escape" &&
                    !palette.hidden
                ) {

                    closePalette();
                }

            }
        );
    }


    /* =====================================================
       18. EASTER EGG
       TYPE "MOIZ"
       ===================================================== */

    function initEasterEgg() {

        const overlay =
            $("#devmode");

        if (!overlay) return;

        let typed = "";

        const secret = "moiz";


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.ctrlKey ||
                    event.metaKey ||
                    event.altKey
                ) return;


                if (event.key.length !== 1) return;


                typed =
                    (typed + event.key.toLowerCase())
                        .slice(-secret.length);


                if (typed === secret) {

                    overlay.hidden = false;

                    overlay.setAttribute(
                        "aria-hidden",
                        "false"
                    );


                    setTimeout(() => {

                        overlay.hidden = true;

                        overlay.setAttribute(
                            "aria-hidden",
                            "true"
                        );

                    }, 3000);


                    typed = "";
                }

            }
        );
    }


    /* =====================================================
       19. BACK TO TOP + YEAR
       ===================================================== */

    function initFooter() {

        const year =
            $("#footerYear");

        const top =
            $("#backToTop");


        if (year) {
            year.textContent =
                new Date().getFullYear();
        }


        top?.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior:
                        reducedMotion
                            ? "auto"
                            : "smooth"
                });

            }
        );
    }


    /* =====================================================
       20. INITIALIZE EVERYTHING
       ===================================================== */

    function init() {

        renderProjects();

        initLoader();
        initRoleRotator();
        initReveal();

        initBackgroundGlow();
        initHeroParticles();

        initCursor();

        initScrollProgress();
        initActiveNavigation();

        initMobileNavigation();

        initSkillMap();

        initServices();

        initSocialLinks();

        initCopyButtons();

        initContactForm();

        initCommandPalette();

        initEasterEgg();

        initFooter();

    }


    /* =====================================================
       START
       ===================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init,
            { once: true }
        );

    } else {

        init();

    }

})();