 /**
* Template Name: Personal
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')

    // Lógica para ocultar/mostrar el chatbot cuando el menú móvil se abre/cierra
    let chatbotContainer = select('#chatbot-container');
    if (chatbotContainer) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        // Si el menú móvil se abre, oculta el chatbot
        chatbotContainer.style.display = 'none';
      } else {
        // Si el menú móvil se cierra, muestra el chatbot
        chatbotContainer.style.display = 'block'; // Puedes cambiar a 'flex' o 'initial' si es necesario
      }
    }
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      // =====> AÑADE ESTA LÍNEA AQUÍ <=====
      select('#chatbot-container').style.display = 'block';

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links (y para la carga inicial sin hash)
   */
  window.addEventListener('load', () => {
    // Obtener todas las secciones del documento
    let sections = select('section', true);
    let header = select('#header');
    let navlinks = select('#navbar .nav-link', true);

    if (window.location.hash) {
      // Si hay un hash en la URL, intentar mostrar esa sección
      let initial_nav = select(window.location.hash);

      if (initial_nav) {
        header.classList.add('header-top');

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });

        setTimeout(function() {
          // Asegurarse de que todas las demás secciones estén ocultas
          sections.forEach((item) => {
            item.classList.remove('section-show');
          });
          initial_nav.classList.add('section-show');
        }, 350);

        scrollto(window.location.hash);
      } else {
        // Si el hash no corresponde a una sección válida, o si simplemente no hay hash
        // Comportamiento por defecto: mostrar la sección de Inicio
        // Ocultar todas las secciones primero
        sections.forEach((item) => {
          item.classList.remove('section-show');
        });

        // Mostrar la sección de Inicio (#header)
        let homeSection = select('#header');
        if (homeSection) {
          homeSection.classList.add('section-show');
        }

        // Activar el enlace de "Inicio"
        navlinks.forEach((item) => {
          if (item.getAttribute('href') === '#header') {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });

        header.classList.remove('header-top');
      }
    } else {
      // Si NO hay un hash en la URL (carga normal de la página)
      // Ocultar todas las secciones primero
      sections.forEach((item) => {
        item.classList.remove('section-show');
      });

      // Mostrar la sección de Inicio (#header)
      let homeSection = select('#header');
      if (homeSection) {
        homeSection.classList.add('section-show');
      }

      // Activar el enlace de "Inicio"
      navlinks.forEach((item) => {
        if (item.getAttribute('href') === '#header') {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      header.classList.remove('header-top');
    }

    // Código para el chatbot
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 2500); // Esperamos 2.5 segundos para dar tiempo a que el widget se cargue.
  });


  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Cursos isotope and filter
   */
  window.addEventListener('load', () => {
    let cursosContainer = select('.cursos-container');
    if (cursosContainer) {
      let cursosIsotope = new Isotope(cursosContainer, {
        itemSelector: '.cursos-item',
        layoutMode: 'fitRows'
      });

      let cursosFilters = select('#cursos-flters li', true);

      on('click', '#cursos-flters li', function(e) {
        e.preventDefault();
        cursosFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        cursosIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }
  });

  /**
   * Initiate cursos lightbox
   */
  const cursosLightbox = GLightbox({
    selector: '.cursos-lightbox'
  });

  /**
   * Initiate cursos details lightbox
   */
  const cursosDetailsLightbox = GLightbox({
    selector: '.cursos-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * cursos details slider
   */
  new Swiper('.cursos-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();
})()