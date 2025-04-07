window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('content-container');
  const navLinks = document.getElementById('nav-links');
  const BASE_URL = 'https://eseufert.github.io/209b-midterm-2-review/lecture_html/';
  try {
    const lectureFiles = [
      "lec_dummy_1.html",
      "LEC_13.html"  // Added this line for the new lecture
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

// Function to check a single answer (radio button) question
function checkAnswer(questionId, correctAnswer) {
  const options = document.querySelectorAll(`#${questionId} input[type="radio"]`);
  let isCorrect = false;
  
  options.forEach(option => {
    if (option.checked) {
      if (option.value === correctAnswer) {
        option.parentElement.classList.add('correct');
        isCorrect = true;
      } else {
        option.parentElement.classList.add('incorrect');
      }
    } else if (option.value === correctAnswer) {
      option.parentElement.classList.add('correct');
    }
  });
  
  // Show the context
  const contextDiv = document.getElementById(`context-${questionId}`);
  if (contextDiv) {
    contextDiv.style.display = 'block';
  }
  
  // Disable the submit button
  const submitBtn = document.querySelector(`#${questionId} .submit-btn`);
  if (submitBtn) {
    submitBtn.disabled = true;
  }
  
  return isCorrect;
}

// Function to check multiple answers (checkbox) question
function checkMultipleAnswers(questionId, correctAnswers) {
  const checkboxes = document.querySelectorAll(`#${questionId} input[type="checkbox"]`);
  let allCorrect = true;
  
  checkboxes.forEach(checkbox => {
    const isChecked = checkbox.checked;
    const shouldBeChecked = correctAnswers.includes(checkbox.value);
    
    if (isChecked && shouldBeChecked) {
      checkbox.parentElement.classList.add('correct');
    } else if (isChecked && !shouldBeChecked) {
      checkbox.parentElement.classList.add('incorrect');
      allCorrect = false;
    } else if (!isChecked && shouldBeChecked) {
      checkbox.parentElement.classList.add('correct');
      allCorrect = false;
    }
  });
  
  // Show the context
  const contextDiv = document.getElementById(`context-${questionId}`);
  if (contextDiv) {
    contextDiv.style.display = 'block';
  }
  
  // Disable the submit button
  const submitBtn = document.querySelector(`#${questionId} .submit-btn`);
  if (submitBtn) {
    submitBtn.disabled = true;
  }
  
  return allCorrect;
}

// Function to handle text answers
function checkTextAnswer(questionId) {
  // For text answers, we just show the context since we can't automatically grade free text
  const contextDiv = document.getElementById(`context-${questionId}`);
  if (contextDiv) {
    contextDiv.style.display = 'block';
  }
  
  // Disable the submit button
  const submitBtn = document.querySelector(`#${questionId} .submit-btn`);
  if (submitBtn) {
    submitBtn.disabled = true;
  }
}