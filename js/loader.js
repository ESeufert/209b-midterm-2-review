// loader.js

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
          });
      });
      listItem.appendChild(link);
      navLinks.appendChild(listItem);
    });
  } catch (err) {
    console.error("Error loading lecture files dynamically:", err);
  }
});

function handleSubmit(questionId) {
  const question = document.getElementById(questionId);
  const radios = question.querySelectorAll("input[type='radio']");
  const checkboxes = question.querySelectorAll("input[type='checkbox']");
  const context = question.querySelector(".context");

  const isMultiAnswer = checkboxes.length > 0;
  const options = isMultiAnswer ? checkboxes : radios;

  const correctAnswers = Array.from(question.querySelectorAll(".correct")).map(el => el.id);
  const selectedAnswers = Array.from(options).filter(opt => opt.checked).map(opt => opt.id);

  // Reset styles
  options.forEach(option => {
    const label = question.querySelector(`label[for='${option.id}']`);
    label?.classList.remove("correct-style", "incorrect-style");
  });

  // Apply styles
  options.forEach(option => {
    const label = question.querySelector(`label[for='${option.id}']`);
    const isCorrect = correctAnswers.includes(option.id);
    const isSelected = option.checked;

    if (isSelected && isCorrect) {
      label?.classList.add("correct-style");
    } else if (isSelected && !isCorrect) {
      label?.classList.add("incorrect-style");
    } else if (!isSelected && isCorrect && isMultiAnswer) {
      label?.classList.add("correct-style"); // Indicate missed correct options
    }
  });

  context.style.display = "block";
}

