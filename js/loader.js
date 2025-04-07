// loader.js

window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('content-container');
  const navLinks = document.getElementById('nav-links');

  // Manually specify the HTML files to load
  const lectureFiles = [
    'LEC_13.html'
    // Add more HTML filenames here if needed, e.g., 'LEC_14.html', 'LEC_15.html'
  ];

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
      })
      .catch(err => {
        console.error(`Failed to load ${file}:`, err);
      });
  });
});

// Handles both single- and multiple-answer questions
function checkAnswer(questionId, correctValue) {
  const question = document.getElementById(questionId);
  const options = question.querySelectorAll("input");
  const context = question.querySelector(`#context-${questionId}`);

  options.forEach(option => {
    const label = option.parentElement;
    label.classList.remove("correct-style", "incorrect-style");

    const isCorrect = Array.isArray(correctValue)
      ? correctValue.includes(option.value)
      : option.value === correctValue;

    if (option.checked && isCorrect) {
      label.classList.add("correct-style");
    } else if (option.checked && !isCorrect) {
      label.classList.add("incorrect-style");
    } else if (!option.checked && isCorrect && option.type === "checkbox") {
      label.classList.add("correct-style");
    }
  });

  context.style.display = "block";
}
