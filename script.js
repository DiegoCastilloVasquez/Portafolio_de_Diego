// Datos de los proyectos
const projectsData = [
    {
        id: 1,
        title: "Homenaje a Armor Mayhem",
        description: "Desarrollé un pequeño juego de disparos como homenaje al clásico juego Flash Armor Mayhem.",
        image: "https://raw.githubusercontent.com/DiegoCastilloVasquez/Homenaje_Armor_Mayhem/refs/heads/main/captura_1.png",
        category: "web",
        technologies: ["HTML5", "CSS3", "JavaScript", "2D"],
        demoLink: "https://diegocastillovasquez.github.io/Homenaje_Armor_Mayhem",
        githubLink: "https://github.com/DiegoCastilloVasquez/Homenaje_Armor_Mayhem"
    },
    {
        id: 2,
        title: "Pong Recreado",
        description: "Pong Recreado es una implementación moderna del clásico juego Pong, desarrollado con HTML5, CSS3 y JavaScript. Este proyecto ofrece una experiencia de juego personalizable con diferentes opciones de configuración y controles ajustables.",
        image: "https://raw.githubusercontent.com/DiegoCastilloVasquez/Pong-Recreado/refs/heads/main/captura_1.png",
        category: "web",
        technologies: ["HTML", "CSS", "JavaScript", "Canvas"],
        demoLink: "https://diegocastillovasquez.github.io/Pong-Recreado",
        githubLink: "https://github.com/DiegoCastilloVasquez/Pong-Recreado"
    },
    {
        id: 3,
        title: "Martdown",
        description: "Un editor de Markdown minimalista, desarrollado para el Centro de Estudiantes de Matemática (CEM) y la Facultad de Ciencias Matemáticas (FCM) de la Universidad Nacional Mayor de San Marcos (UNMSM). Esta herramienta pretende facilitar la escritura académica mediante una experiencia intuitiva y estéticamente refinada, con soporte nativo para fórmulas matemáticas mediante TeX y diagramas Mermaid. Surge como recurso para tomar apuntes en el próximo curso organizado por el CEM: Filosofía de las Matemáticas, y todas las clases centradas en contenido matemático. Desarrollado como contribución a la comunidad estudiantil, este proyecto busca facilitar la producción de documentación académica y técnica con un enfoque especializado en las necesidades matemáticas.",
        image: "https://raw.githubusercontent.com/DiegoCastilloVasquez/Martdown/refs/heads/main/captura.png",
        category: "desktop",
        technologies: ["JavaScript", "HTML", "CSS", "Electron"],
        demoLink: "https://diegocastillovasquez.github.io/Pagina-Web-de-Martdown",
        githubLink: "https://github.com/DiegoCastilloVasquez/Martdown"
    }
];

// Elementos del DOM
const modal = document.getElementById('projectModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTech = document.getElementById('modalTech');
const demoLink = document.getElementById('demoLink');
const githubLink = document.getElementById('githubLink');
const closeModal = document.querySelector('.close-modal');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const viewProjectButtons = document.querySelectorAll('.view-project');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const header = document.querySelector('header');
const fadeElements = document.querySelectorAll('.fade-in');

// Scroll effects
window.addEventListener('scroll', () => {
    // Header scroll effect
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Fade in elements on scroll
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });

    // Active nav link based on scroll position
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Initialize fade elements on page load
window.addEventListener('load', () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
});

// Abrir modal con detalles del proyecto
viewProjectButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const project = projectsData[index];
        openModal(project);
    });
});

// También permitir hacer clic en la tarjeta completa para abrir el modal
projectCards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
        // Evitar que se abra el modal si se hace clic en el botón "Ver Proyecto"
        if (!e.target.classList.contains('view-project') &&
            !e.target.parentElement.classList.contains('view-project')) {
            const project = projectsData[index];
            openModal(project);
        }
    });
});

// Función para abrir el modal
function openModal(project) {
    modalImg.src = project.image;
    modalImg.alt = project.title;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;

    // Limpiar y agregar tecnologías
    modalTech.innerHTML = '';
    project.technologies.forEach(tech => {
        const techElement = document.createElement('span');
        techElement.classList.add('tech-item');
        techElement.textContent = tech;
        modalTech.appendChild(techElement);
    });

    // Establecer enlaces
    demoLink.href = project.demoLink;
    githubLink.href = project.githubLink;

    // Mostrar modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Filtrado de proyectos
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Actualizar botón activo
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                // Añadir retraso para efecto de aparición
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Menu hamburguesa
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Cerrar menú al hacer clic en un enlace
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.textContent = '☰';
    });
});

// Lógica del Modal de Email
const emailButton = document.getElementById('email-button');
const emailModal = document.getElementById('email-modal');
const closeModalButton = document.querySelector('.close-modal-button');
const copyEmailButton = document.getElementById('copy-email-button');
const emailAddressDisplay = document.getElementById('email-address-display');

function openEmailModal() {
    emailModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEmailModal() {
    emailModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

emailButton.addEventListener('click', openEmailModal);
closeModalButton.addEventListener('click', closeEmailModal);

emailModal.addEventListener('click', (event) => {
    if (event.target === emailModal) {
        closeEmailModal();
    }
});

copyEmailButton.addEventListener('click', () => {
    const email = emailAddressDisplay.textContent;

    navigator.clipboard.writeText(email).then(() => {
        copyEmailButton.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
        copyEmailButton.classList.add('copied');

        setTimeout(() => {
            copyEmailButton.innerHTML = '<i class="far fa-copy"></i> Copiar Correo';
            copyEmailButton.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar el correo: ', err);
        copyEmailButton.textContent = 'Error al copiar';
        setTimeout(() => {
            copyEmailButton.innerHTML = '<i class="far fa-copy"></i> Copiar Correo';
        }, 2000);
    });
});

// Lógica para Certificaciones
document.addEventListener('DOMContentLoaded', () => {

    const todasLasCertificaciones = [
        'cer/1.jpg',
        'cer/2.jpg',
        'cer/3.jpg',
        'cer/4.jpg',
        'cer/5.jpg',
        'cer/6.jpg',
        'cer/7.jpg',
        'cer/8.jpg',
        'cer/9.jpg',
        'cer/10.jpg',
        'cer/11.jpg',
        'cer/12.jpg',
        'cer/13.jpg',
        'cer/14.jpg',
        'cer/15.jpg',
        'cer/16.jpg',
        'cer/17.jpg',
        'cer/18.jpg',
        'cer/19.jpg',
        'cer/20.jpg',
        'cer/21.jpg',
        'cer/22.jpg',
        'cer/23.jpg',
        'cer/24.jpg',
        'cer/25.jpg',
        'cer/26.jpg',
        'cer/27.jpg',
        'cer/28.jpg',
        'cer/29.jpg',
        'cer/30.jpg',
        'cer/31.jpg',
        'cer/32.jpg',
        'cer/33.jpg',
        'cer/34.jpg',
        'cer/35.jpg',
        'cer/36.jpg',
        'cer/37.jpg',
        'cer/38.jpg',
        'cer/39.jpg',
        'cer/40.jpg',
        'cer/41.jpg',
        'cer/42.jpg',
        'cer/43.jpg',
        'cer/44.jpg',
        'cer/45.jpg',
        'cer/46.jpg',
        'cer/47.jpg',
        'cer/48.jpg',
        'cer/49.jpg',
        'cer/50.jpg',
        'cer/51.jpg',
        'cer/52.jpg',
        'cer/53.jpg',
        'cer/54.jpg',
        'cer/55.jpg',
        'cer/56.jpg',
        'cer/57.jpg',
        'cer/58.jpg',
        'cer/59.jpg',
        'cer/60.jpg',
        'cer/61.jpg',
        'cer/62.jpg',
        'cer/63.jpg',
        'cer/64.jpg',
        'cer/65.jpg',
        'cer/66.jpg',
        'cer/67.jpg',
        'cer/68.jpg',
        'cer/69.jpg
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function populateRow(rowId, imageList) {
        const track = document.querySelector(`#${rowId} .carousel-track`);
        if (!track) return;

        const repetitions = 5;
        const setA_fragment = document.createDocumentFragment();

        const createImage = (src) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = "Certificado";
            img.addEventListener('click', () => openLightbox(src));
            return img;
        };

        for (let i = 0; i < repetitions; i++) {
            imageList.forEach(src => {
                setA_fragment.appendChild(createImage(src));
            });
        }

        const setB_fragment = setA_fragment.cloneNode(true);

        track.appendChild(setA_fragment);
        track.appendChild(setB_fragment);
    }

    const shuffledCerts = shuffle([...todasLasCertificaciones]);

    const groupSize = Math.ceil(shuffledCerts.length / 4);
    const lists = [
        shuffledCerts.slice(0, groupSize),
        shuffledCerts.slice(groupSize, groupSize * 2),
        shuffledCerts.slice(groupSize * 2, groupSize * 3),
        shuffledCerts.slice(groupSize * 3)
    ];

    populateRow('row1', lists[0]);
    populateRow('row2', lists[1]);
    populateRow('row3', lists[2]);
    populateRow('row4', lists[3]);

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeButton = document.getElementById('lightbox-close');

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    closeButton.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Cerrar lightbox con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });

});
