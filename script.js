// Execute once DOM elements are ready
function initPortfolio() {

    // 1. Sticky Navbar scroll shadow & background
    const header = document.querySelector("header");

    function updateNavbar() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
            header.style.background = "#f8f7f4";
            header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.05)";
        } else {
            header.classList.remove("scrolled");
            header.style.background = "transparent";
            header.style.boxShadow = "none";
        }
    }

    window.addEventListener("scroll", updateNavbar, { passive: true });
    // Check initial scroll state in case the page is refreshed after scrolling
    updateNavbar();


    // 2. IntersectionObserver card reveal animation
    const cards = document.querySelectorAll(
        ".skill-card, .project-card, .about-card"
    );

    if ("IntersectionObserver" in window && cards.length > 0) {
        const observer = new IntersectionObserver(
            function (entries, observerInstance) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";

                        // Remove inline transform after reveal transition completes
                        // so CSS :hover transforms work cleanly without specificity conflicts
                        const onTransitionEnd = function () {
                            entry.target.style.transform = "";
                            entry.target.removeEventListener("transitionend", onTransitionEnd);
                        };
                        entry.target.addEventListener("transitionend", onTransitionEnd);

                        observerInstance.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        cards.forEach(function (card) {
            card.style.opacity = "0";
            card.style.transform = "translateY(30px)";
            card.style.transition = "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease";
            observer.observe(card);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        cards.forEach(function (card) {
            card.style.opacity = "1";
            card.style.transform = "none";
        });
    }

}

// Ensure execution whether loaded via defer or directly
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPortfolio);
} else {
    initPortfolio();
}