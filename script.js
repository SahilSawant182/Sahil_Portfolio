document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("main section[id]");
    const revealItems = document.querySelectorAll(".reveal");

    const setHeaderState = () => {
        header.classList.toggle("scrolled", window.scrollY > 24);
    };

    const closeMenu = () => {
        navLinks.classList.remove("show");
        document.body.classList.remove("menu-open");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    };

    hamburger.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("show");
        document.body.classList.toggle("menu-open", isOpen);
        hamburger.setAttribute("aria-expanded", String(isOpen));
        hamburger.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    navItems.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.16 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                navItems.forEach((link) => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
                });
            });
        },
        { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });
});
