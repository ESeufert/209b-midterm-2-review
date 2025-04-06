window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('content-container');

  try {
    const lectureFiles = [
      "lec_dummy_1.html"
      // add more files here as needed
    ];

    lectureFiles.forEach(file => {
      fetch(`lecture_html/${file}`)
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
