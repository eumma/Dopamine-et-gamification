document.addEventListener('DOMContentLoaded', () => {

  // --- 1. ANIMATION PAGE D'ACCUEIL (.launch) ---
  const launchEl = document.querySelector('.launch');
  const launchStartBtn = document.querySelector('.launch__start');

  if (launchEl) {
    window.setTimeout(() => launchEl.classList.add('is-empty'), 1600);
    window.setTimeout(() => launchEl.classList.add('is-ready'), 2300);
  }

  if (launchStartBtn) {
    launchStartBtn.addEventListener('click', () => {
      window.location.href = 'introduction.html';
    });
  }


  // --- 2. MENU PAUSE ---
  const pauseMenu = document.querySelector('.pause-menu');
  const menuOpenBtns = document.querySelectorAll('[data-menu-open]');
  const menuCloseBtn = document.querySelector('[data-menu-close]');
  const pageBtns = document.querySelectorAll('[data-page]');

  if (pauseMenu) {
    menuOpenBtns.forEach((button) => {
      button.addEventListener('click', () => {
        pauseMenu.classList.add('is-open');
        pauseMenu.setAttribute('aria-hidden', 'false');
      });
    });

    if (menuCloseBtn) {
      menuCloseBtn.addEventListener('click', () => {
        pauseMenu.classList.remove('is-open');
        pauseMenu.setAttribute('aria-hidden', 'true');
      });
    }

    pageBtns.forEach((button) => {
      button.addEventListener('click', () => {
        const page = button.dataset.page;
        if (page === 'quitter') {
          window.location.href = 'index.html';
        } else {
          window.location.href = page + '.html';
        }
      });
    });
  }

  // --- 3. BOUTON NIVEAU SUIVANT ---
const nextBtn = document.querySelector('.next');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const currentPage = window.location.pathname.split('/').pop();

      if (currentPage === 'introduction.html') {
        window.location.href = 'chapter-I.html';
      } else if (currentPage === 'chapter-I.html') {
        window.location.href = 'chapter-II.html';
      } else if (currentPage === 'chapter-II.html') {
        window.location.href = 'chapter-III.html';
      } else if (currentPage === 'chapter-III.html') {
        window.location.href = 'chapter-IV.html';
      } else if (currentPage === 'chapter-IV.html') {
        window.location.href = 'conclusion.html';
      } else if (currentPage === 'conclusion.html') {
        window.location.href = 'bibliographie.html';
      } else if (currentPage === 'bibliographie.html') {
        window.location.href = 'index.html';
      }
    });
  }

  // --- 4. SOMMAIRE & INTERSECTION OBSERVER ---
  const toc = document.getElementById('toc');
  const headings = document.querySelectorAll('.content h2');
  const tocLinks = document.querySelectorAll('.toc a');

  if (headings.length > 0 && toc) {
    const firstHeading = headings[0];

    const handleTocVisibility = () => {
      if (firstHeading.getBoundingClientRect().top <= 200) {
        toc.classList.add('is-visible');
      } else {
        toc.classList.remove('is-visible');
      }
    };

    window.addEventListener('scroll', handleTocVisibility);
    handleTocVisibility(); // Vérification initiale au chargement

    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          tocLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
    }, { 
      rootMargin: '-100px 0px -66% 0px' 
    });

    headings.forEach(heading => activeObserver.observe(heading));

    tocLinks.forEach(link => {
      link.addEventListener('click', () => {
        tocLinks.forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');
      });
    });
  }

});

  // --- 5. CARDS CHAP 3 ---
document.addEventListener('DOMContentLoaded', () => {
  const cardsGrid = document.querySelector('.cards-grid');

  if (cardsGrid) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Dès que 15% de la grille entre dans la zone visible
        if (entry.isIntersecting) {
          cardsGrid.classList.add('is-visible');
          observer.unobserve(cardsGrid); // Stoppe la surveillance une fois activé
        }
      });
    }, {
      threshold: 0.15
    });

    observer.observe(cardsGrid);
  }
});