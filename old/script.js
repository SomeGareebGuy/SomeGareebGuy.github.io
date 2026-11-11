
/* ================================================
   MATHEMATICAL ARCHIVE
   Anubhav Dash
   Homepage Functionality
================================================ */


/* --------------------------------
   01. MOBILE NAVIGATION
-------------------------------- */

const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mainNav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

    // Close menu after clicking a navigation link

    mainNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* --------------------------------
   02. DATE FORMATTING
-------------------------------- */

function formatDate(dateString) {

    if (!dateString) return "Undated";

    const date = new Date(dateString + "T00:00:00");

    if (Number.isNaN(date.getTime())) {
        return "Undated";
    }

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

}


/* --------------------------------
   03. PRESENTATION CARD
-------------------------------- */

function createPresentationCard(presentation) {

    const card = document.createElement("a");

    card.className = "presentation-card";

    card.href = presentation.url;

    // Thumbnail

    const imageContainer = document.createElement("div");

    imageContainer.className = "card-image";

    if (presentation.thumbnail) {

        const image = document.createElement("img");

        image.src = presentation.thumbnail;
        image.alt = presentation.title;
        image.loading = "lazy";

        imageContainer.appendChild(image);

    }

    // Content

    const content = document.createElement("div");

    content.className = "card-content";

    // Metadata

    const metadata = document.createElement("div");

    metadata.className = "card-meta";

    metadata.textContent =
        `${presentation.subject} · ${formatDate(presentation.date)}`;

    // Title

    const title = document.createElement("h3");

    title.className = "card-title";
    title.textContent = presentation.title;

    // Description

    const description = document.createElement("p");

    description.className = "card-description";
    description.textContent = presentation.description || "";

    content.append(
        metadata,
        title,
        description
    );

    card.append(
        imageContainer,
        content
    );

    return card;

}


/* --------------------------------
   04. RECENT PRESENTATION ITEM
-------------------------------- */

function createRecentItem(presentation) {

    const item = document.createElement("a");

    item.className = "recent-item";

    item.href = presentation.url;

    // Date

    const date = document.createElement("span");

    date.className = "recent-date";
    date.textContent = formatDate(presentation.date);

    // Main content

    const content = document.createElement("div");

    const title = document.createElement("h3");

    title.className = "recent-title";
    title.textContent = presentation.title;

    const subject = document.createElement("span");

    subject.className = "recent-subject";
    subject.textContent = presentation.subject;

    content.append(
        title,
        subject
    );

    // Arrow

    const arrow = document.createElement("span");

    arrow.className = "recent-arrow";
    arrow.textContent = "→";

    item.append(
        date,
        content,
        arrow
    );

    return item;

}


/* --------------------------------
   05. EMPTY STATE
-------------------------------- */

function showEmptyState(container, message) {

    if (!container) return;

    container.innerHTML = "";

    const element = document.createElement("p");

    element.className = "loading-message";
    element.textContent = message;

    container.appendChild(element);

}


/* --------------------------------
   06. LOAD HOMEPAGE PRESENTATIONS
-------------------------------- */

function loadHomepagePresentations() {

    const featuredContainer =
        document.getElementById("featured-presentations");

    const recentContainer =
        document.getElementById("recent-presentations");

    // Presentation database is loaded separately

    if (typeof presentations === "undefined") {

        showEmptyState(
            featuredContainer,
            "No presentations available yet."
        );

        showEmptyState(
            recentContainer,
            "The archive is waiting for its first entry."
        );

        return;

    }

    // Sort by date, newest first

    const sortedPresentations = [...presentations].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );


    /* FEATURED PRESENTATIONS */

    if (featuredContainer) {

        featuredContainer.innerHTML = "";

        const featured = sortedPresentations
            .filter(item => item.featured)
            .slice(0, 2);

        if (featured.length === 0) {

            showEmptyState(
                featuredContainer,
                "Featured presentations will appear here."
            );

        } else {

            featured.forEach(presentation => {

                featuredContainer.appendChild(
                    createPresentationCard(presentation)
                );

            });

        }

    }


    /* RECENT PRESENTATIONS */

    if (recentContainer) {

        recentContainer.innerHTML = "";

        const recent = sortedPresentations.slice(0, 5);

        if (recent.length === 0) {

            showEmptyState(
                recentContainer,
                "The archive is waiting for its first entry."
            );

        } else {

            recent.forEach(presentation => {

                recentContainer.appendChild(
                    createRecentItem(presentation)
                );

            });

        }

    }

}


/* --------------------------------
   07. INITIALIZE
-------------------------------- */

document.addEventListener("DOMContentLoaded", () => {

    loadHomepagePresentations();

});
