window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('content-container');
  const navLinks = document.getElementById('nav-links');

  const lectureFiles = [
    'lec_dummy_1.html',
    'LEC_13.html',
    // Add more lecture files here
  ];

  lectureFiles.forEach(file => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = file;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      fetch(`lecture_html/${file}`)
        .then(response => response.text())
        .then(html => {
          container.innerHTML = '';
          const section = document.createElement("section");
          section.innerHTML = html;
          container.appendChild(section);
        })
        .catch(err => {
          container.innerHTML = `<p>Could not load ${file}</p>`;
          console.error(`Error loading ${file}:`, err);
        });
    });
    listItem.appendChild(link);
    navLinks.appendChild(listItem);
  });
});


