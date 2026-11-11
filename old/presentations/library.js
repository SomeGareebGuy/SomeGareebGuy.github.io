
document.addEventListener("DOMContentLoaded", () => {
  // Get the presentation data and page elements.
  const allPresentations = window.presentations || [];

  const searchInput = document.getElementById("presentation-search");
  const subjectFilter = document.getElementById("subject-filter");
  const sortFilter = document.getElementById("sort-filter");
  const clearButton = document.getElementById("clear-filters");

  const presentationGrid = document.getElementById("presentation-grid");
  const presentationCount = document.getElementById("presentation-count");
  const resultsDescription = document.getElementById("results-description");
  const noResults = document.getElementById("no-results");

  // Stop if this script is loaded on a page without the library.
  if (!presentationGrid) return;

  // Read a subject from the URL, e.g. ?subject=Geometry.
  const params = new URLSearchParams(window.location.search);
  const requestedSubject = params.get("subject");

  if (requestedSubject && subjectFilter) {
    const matchingOption = [...subjectFilter.options].find(
      option => option.value.toLowerCase() === requestedSubject.toLowerCase()
    );

    if (matchingOption) {
      subjectFilter.value = matchingOption.value;
    }
  }

  // Format dates for display.
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

  // Escape text before inserting it into HTML.
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

  // Create a card for one presentation.
  function createCard(presentation) {
    const title = escapeHTML(presentation.title);
    const subject = escapeHTML(presentation.subject);
    const description = escapeHTML(presentation.description);
    const date = escapeHTML(formatDate(presentation.date));

    const viewerURL =
      `./view.html?id=${encodeURIComponent(presentation.id)}`;

    const thumbnail = presentation.thumbnail
      ? `
        <img
          class="presentation-thumbnail"
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
              View presentation →
            </span>
          </div>
        </a>
      </article>
    `;
  }

  // Apply search, subject filtering and sorting.
  function getFilteredPresentations() {
    const searchTerm = searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";

    const selectedSubject = subjectFilter
      ? subjectFilter.value
      : "all";

    const sortOrder = sortFilter
      ? sortFilter.value
      : "newest";

    let filtered = allPresentations.filter(presentation => {
      const searchableText = [
        presentation.title,
        presentation.subject,
        presentation.description,
        ...(presentation.tags || [])
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(searchTerm);

      const matchesSubject =
        selectedSubject === "all" ||
        selectedSubject === "" ||
        presentation.subject.toLowerCase() === selectedSubject.toLowerCase();

      return matchesSearch && matchesSubject;
    });

    // Sort the results.
    filtered.sort((a, b) => {
      if (sortOrder === "oldest") {
        return new Date(a.date) - new Date(b.date);
      }

      if (sortOrder === "title") {
        return a.title.localeCompare(b.title);
      }

      // Default: newest first.
      return new Date(b.date) - new Date(a.date);
    });

    return filtered;
  }

  // Render the library.
  function renderPresentations() {
    const filtered = getFilteredPresentations();

    presentationGrid.innerHTML = filtered
      .map(createCard)
      .join("");

    // Update the result count.
    if (presentationCount) {
      presentationCount.textContent =
        `${filtered.length} ${filtered.length === 1 ? "presentation" : "presentations"}`;
    }

    if (resultsDescription) {
      resultsDescription.textContent =
        filtered.length === allPresentations.length
          ? "Browse the complete collection."
          : `Showing ${filtered.length} of ${allPresentations.length} presentations.`;
    }

    // Show or hide the empty state.
    if (noResults) {
      noResults.hidden = filtered.length > 0;
    }

    presentationGrid.hidden = filtered.length === 0;
  }

  // Listen for changes.
  if (searchInput) {
    searchInput.addEventListener("input", renderPresentations);
  }

  if (subjectFilter) {
    subjectFilter.addEventListener("change", renderPresentations);
  }

  if (sortFilter) {
    sortFilter.addEventListener("change", renderPresentations);
  }

  // Reset all filters.
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (subjectFilter) subjectFilter.value = "all";
      if (sortFilter) sortFilter.value = "newest";

      // Remove the subject query from the URL.
      window.history.replaceState(
        {},
        "",
        window.location.pathname
      );

      renderPresentations();
    });
  }

  // Initial render.
  renderPresentations();
});
