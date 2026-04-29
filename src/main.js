import './style.css'

// Intersection Observer for Reveal Animations
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1
});

revealElements.forEach(el => revealObserver.observe(el));

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.padding = '10px 30px';
    navbar.style.background = 'rgba(10, 10, 10, 0.8)';
  } else {
    navbar.style.padding = '12px 30px';
    navbar.style.background = 'rgba(255, 255, 255, 0.03)';
  }
});

// GitHub API Integration
async function fetchGithubProjects() {
  const container = document.getElementById('github-projects');
  const username = 'msc00078';

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    if (!response.ok) throw new Error('Failed to fetch repos');

    const repos = await response.json();

    container.innerHTML = '';

    repos.forEach(repo => {
      if (!repo.fork) {
        const card = document.createElement('div');
        card.className = 'project-card glass reveal';

        card.innerHTML = `
          <h3>${repo.name.replace(/-/g, ' ')}</h3>
          <p>${repo.description || 'Sin descripción disponible.'}</p>
          <div class="project-meta">
            <span class="project-lang">${repo.language || 'Code'}</span>
            <a href="${repo.html_url}" target="_blank" class="project-link">Ver Código &rarr;</a>
          </div>
        `;

        container.appendChild(card);
        revealObserver.observe(card);
      }
    });

    if (container.innerHTML === '') {
      container.innerHTML = '<p>No se encontraron proyectos públicos.</p>';
    }

  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    container.innerHTML = '<p>Error al cargar proyectos. Por favor, visita mi perfil de GitHub.</p>';
  }
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  fetchGithubProjects();
});
