window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('content-container');
  const navLinks = document.getElementById('nav-links');
  const BASE_URL = 'https://eseufert.github.io/209b-midterm-2-review/lecture_html/';
  try {
    const lectureFiles = [
      "lec_dummy_1.html"
      // add more files here
    ];
    
    // Process each lecture file
    lectureFiles.forEach((file, index) => {
      fetch(`${BASE_URL}${file}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to load ${file}`);
          }
          return response.text();
        })
        .then(html => {
          // Create a unique ID for this lecture section
          const lectureId = `lecture-${index}`;
          
          // Create the section for the lecture content
          const section = document.createElement("section");
          section.innerHTML = html;
          section.id = lectureId;
          container.appendChild(section);
          
          // Extract the title from the lecture content
          const titleElement = section.querySelector('h2');
          const title = titleElement ? titleElement.textContent : `Lecture ${index + 1}`;
          
          // Create a navigation link for this lecture
          const navItem = document.createElement('li');
          const navLink = document.createElement('a');
          navLink.href = `#${lectureId}`;
          navLink.textContent = title;
          navItem.appendChild(navLink);
          navLinks.appendChild(navItem);
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