window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('content-container');
  const BASE_URL = 'https://eseufert.github.io/209b-midterm-2-review/lecture_html/';

  try {
    const lectureFiles = [
      "lec_dummy_1.html"
      // add more files here
    ];

    lectureFiles.forEach(file => {
      fetch(`${BASE_URL}${file}`)
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
