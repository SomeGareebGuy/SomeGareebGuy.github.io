
document.addEventListener("DOMContentLoaded", () => {
  const viewerContent = document.getElementById("viewer-content");

  if (!viewerContent) return;

  // Get the presentation ID from the URL.
  const params = new URLSearchParams(window.location.search);
  const presentationId = params.get("id");

  // Find the matching presentation.
  const presentation = (window.presentations || []).find(
    item => item.id === presentationId
  );

  // Escape HTML to safely display text.
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

  // Format the date.
  function formatDate(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString + "T00:00:00");

    if (Number.isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  // Display an error or missing-presentation message.
  function showMessage(title, description) {
    viewerContent.innerHTML = `
      <div class="viewer-message">
        <h2>${escapeHTML(title)}</h2>
        <p>${escapeHTML(description)}</p>
        <a href="./index.html" class="viewer-button viewer-button-primary">
          Return to library
        </a>
      </div>
    `;
  }

  // Check whether the presentation exists.
  if (!presentation) {
    document.title = "Presentation Not Found | Mathematical Archive";

    showMessage(
      "Presentation not found.",
      "The presentation may have been moved, renamed, or removed from the archive."
    );

    return;
  }

  // Check whether a PDF file has been assigned.
  if (!presentation.file) {
    showMessage(
      "PDF not available yet.",
      "The details for this presentation exist, but its PDF has not been uploaded."
    );

    return;
  }

  const title = escapeHTML(presentation.title);
  const subject = escapeHTML(presentation.subject);
  const description = escapeHTML(presentation.description);
  const date = escapeHTML(formatDate(presentation.date));

  // The file path is relative to this viewer page.
  const pdfURL = presentation.file;

  // Update browser tab title.
  document.title = `${presentation.title} | Mathematical Archive`;

  // Render the presentation.
  viewerContent.innerHTML = `
    <div class="viewer-meta">
      ${subject} &nbsp; / &nbsp; ${date}
    </div>

    <h1 class="viewer-title">${title}</h1>

    <p class="viewer-description">
      ${description}
    </p>

    <div class="viewer-actions">
      <a
        href="${escapeHTML(pdfURL)}"
        class="viewer-button viewer-button-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open PDF in new tab ↗
      </a>

      <a
        href="${escapeHTML(pdfURL)}"
        class="viewer-button"
        download
      >
        Download PDF ↓
      </a>

      <a
        href="./index.html"
        class="viewer-button"
      >
        Back to library
      </a>
    </div>

    <div class="pdf-container">
      <iframe
        class="pdf-frame"
        src="${escapeHTML(pdfURL)}#toolbar=1&navpanes=0&view=FitH"
        title="${title}"
        loading="lazy"
      ></iframe>
    </div>
  `;
});
