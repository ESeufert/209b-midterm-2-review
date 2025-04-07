
window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('content-container');
  const navLinks = document.getElementById('nav-links');

  try {
    const response = await fetch('lecture_html/');
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const links = Array.from(doc.querySelectorAll('a'));

    const lectureFiles = links
      .map(link => link.getAttribute('href'))
      .filter(name => name && name.endsWith('.html'))
      .sort();

    lectureFiles.forEach(file => {
      fetch(`lecture_html/${file}`)
        .then(response => response.text())
        .then(html => {
          const section = document.createElement("section");
          section.innerHTML = html;
          section.id = file.replace(".html", "");
          container.appendChild(section);

          const listItem = document.createElement("li");
          const link = document.createElement("a");
          link.href = `#${section.id}`;
          link.textContent = file;
          listItem.appendChild(link);
          navLinks.appendChild(listItem);
        });
    });
  } catch (err) {
    console.error("Error loading lecture files dynamically:", err);
  }
});

function checkAnswer(questionId, correctValue) {
  const question = document.getElementById(questionId);
  const options = question.querySelectorAll("input");
  const context = question.querySelector(`#context-${questionId}`);

  options.forEach(option => {
    const label = option.parentElement;
    if (option.value === correctValue) {
      label.classList.add("correct-style");
    } else if (option.checked) {
      label.classList.add("incorrect-style");
    }
  });

  context.style.display = "block";
}
