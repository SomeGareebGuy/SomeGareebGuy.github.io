
document.addEventListener("DOMContentLoaded", () => {

  // Mobile navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav-links");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      navigation.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  // Presentation database
  const allPresentations = window.presentations || [];

  // Format dates
  function formatDate(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString + "T00:00:00");

    if (Number.isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  // Escape HTML
  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };

      return entities[character];
    });
  }

  // Create a presentation card
  function createPresentationCard(presentation) {
    const title = escapeHTML(presentation.title);
    const subject = escapeHTML(presentation.subject);
    const description = escapeHTML(presentation.description);
    const date = escapeHTML(formatDate(presentation.date));

    const viewerURL =
      `presentations/view.html?id=${encodeURIComponent(presentation.id)}`;

    const thumbnail = presentation.thumbnail
      ? `
        <img
          src="${escapeHTML(presentation.thumbnail)}"
          alt="${title}"
          loading="lazy"
        >
      `
      : `
        <div class="presentation-thumbnail-placeholder">
          <span>${subject}</span>
        </div>
      `;

    return `
      <article class="presentation-card">
        <a class="presentation-card-link" href="${viewerURL}">

          <div class="presentation-card-image">
            ${thumbnail}
          </div>

          <div class="presentation-card-content">

            <div class="presentation-meta">
              <span class="presentation-subject">${subject}</span>
              <span class="presentation-date">${date}</span>
            </div>

            <h3 class="presentation-title">${title}</h3>

            <p class="presentation-description">
              ${description}
            </p>

            <span class="presentation-read-more">
              Read presentation →
            </span>

          </div>

        </a>
      </article>
    `;
  }

  // Display featured presentations
  function loadFeaturedPresentations() {
    const container = document.getElementById("featured-presentations");

    if (!container) return;

    const featured = allPresentations
      .filter(presentation => presentation.featured)
      .slice(0, 3);

    if (featured.length === 0) {
      container.innerHTML = `
        <p class="empty-state">
          Featured presentations will appear here.
        </p>
      `;
      return;
    }

    container.innerHTML = featured
      .map(createPresentationCard)
      .join("");
  }

  // Display recent presentations
  function loadRecentPresentations() {
    const container = document.getElementById("recent-presentations");

    if (!container) return;

    const recent = [...allPresentations]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    if (recent.length === 0) {
      container.innerHTML = `
        <p class="empty-state">
          Recent additions will appear here.
        </p>
      `;
      return;
    }

    container.innerHTML = recent
      .map(presentation => {
        const title = escapeHTML(presentation.title);
        const subject = escapeHTML(presentation.subject);
        const date = escapeHTML(formatDate(presentation.date));

        const viewerURL =
          `presentations/view.html?id=${encodeURIComponent(presentation.id)}`;

        return `
          <a class="recent-item" href="${viewerURL}">
            <span class="recent-subject">${subject}</span>
            <span class="recent-title">${title}</span>
            <span class="recent-date">${date}</span>
          </a>
        `;
      })
      .join("");
  }

  // Load homepage content
  loadFeaturedPresentations();
  loadRecentPresentations();

});
