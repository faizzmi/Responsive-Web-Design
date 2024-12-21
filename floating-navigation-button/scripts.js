const navBar = document.querySelector('.navigation-bar');
const iconBar = document.getElementById('icon');
const closeBtn = document.getElementById("closeBtn");
const topBar = document.getElementById("topBar");
const overlay = document.createElement('div');
overlay.classList.add('dark-overlay');
document.body.appendChild(overlay);

function disableInteractions(e) {
    e.preventDefault();
    e.stopPropagation();
}

function enableInteractions() {
    window.removeEventListener('wheel', disableInteractions, { passive: false });
    window.removeEventListener('touchmove', disableInteractions, { passive: false });
    document.removeEventListener('click', disableInteractions, { passive: false });
}

iconBar.addEventListener("click", () => {
    navBar.style.width = "350px";

    setTimeout(() => {
        topBar.style.bottom = "10px";
        topBar.style.opacity = "1";
        topBar.style.width = "390px";
        topBar.style.height = "200px";

        window.addEventListener('wheel', disableInteractions, { passive: false });
        window.addEventListener('touchmove', disableInteractions, { passive: false });

        overlay.style.display = 'block';
        document.body.classList.add('top-bar-visible');

        iconBar.classList.add('clicked');
    }, 200);
});

closeBtn.addEventListener("click", () => {
    topBar.style.bottom = "-430px";
    topBar.style.opacity = "0";

    setTimeout(() => {
        navBar.style.width = "220px";
        enableInteractions();

        overlay.style.display = 'none';
        document.body.classList.remove('top-bar-visible');
    }, 200);

    iconBar.classList.remove('clicked');
});

let isScrolling = false;

document.addEventListener('scroll', () => {
    if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(() => {
            handleScroll();
            isScrolling = false;
        });
    }
});

function handleScroll() {
    const projectsSection = document.querySelector('.test-page');
    const container = document.querySelector('.container-resume');
    const projectContainer = document.getElementById('projects');

    const sectionTop = projectsSection.offsetTop;
    const sectionBottom = sectionTop + projectsSection.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight;

    const sectionTopP = projectContainer.offsetTop;
    const sectionHeightP = projectContainer.offsetHeight;
    const scrollPositionP = window.scrollY + window.innerHeight;

    if (scrollPositionP > sectionTopP && window.scrollY < sectionTopP + sectionHeightP) {
        projectContainer.classList.add('scrolled');
    } else {
        projectContainer.classList.remove('scrolled');
    }

    if (scrollPosition > sectionTop && window.scrollY < sectionBottom) {
        container.classList.remove('expanded');
    } else {
        container.classList.add('expanded');
    }
}
