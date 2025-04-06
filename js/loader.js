window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('content-container');

  try {
    const response = await fetch('lecture_html/');
    const text = await response.text();

    // Parse HTML directory listing (requires directory listing enabled on GH Pages)
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(text, 'text/html');
    const links = Array.from(htmlDoc.querySelectorAll('a'))
      .map(link => link.getAttribute('href'))
      .filter(href => href.endsWith('.html'))
      .sort();

    for (const file of links) {
      const res = await fetch(`lecture_html/${file}`);
      const html = await res.text();
      const div = document.createElement('div');
      div.innerHTML = html;
      container.appendChild(div);
    }
  } catch (err) {
    console.error('Error loading lecture content:', err);
    container.innerHTML = '<p>Failed to load content.</p>';
  }
});
