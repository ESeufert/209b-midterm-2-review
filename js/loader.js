window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('content-container');

  try {
    const lectureFiles = [
      "lecture_html/lec_13.html",
      "lecture_html/lec_14.html",
      "lecture_html/lec_15.html"
      // add more files here as needed
    ];

    const container = document.getElementById("content-container");

    lectureFiles.forEach(file => {
      fetch(file)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to load ${file}`);
          }
          return response.text();
        })
        .then(html => {
          const section = document.createElement("section");
          section.innerHTML = html;
          container.appendChild(section);
        })
        .catch(error => {
          console.error("Error loading lecture file:", error);
        });
    });

  } catch (err) {
    console.error('Error loading lecture content:', err);
    container.innerHTML = '<p>Failed to load content.</p>';
  }
});
