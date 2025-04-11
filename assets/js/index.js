
// Our Product Categories start ================================================

window.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.nav.prev');
    const nextBtn = document.querySelector('.nav.next');
    const dotsContainer = document.querySelector('.dots');

    let currentIndex = Array.from(carouselItems).findIndex(item => item.classList.contains('active'));
    if (currentIndex === -1) currentIndex = 0;

    // Create dots
    dotsContainer.innerHTML = '';
    carouselItems.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active-dot');
        dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('.dot');

    function centerItem(index) {
        const item = carouselItems[index];
        const itemRect = item.getBoundingClientRect();
        const carouselRect = carousel.getBoundingClientRect();

        const itemCenter = itemRect.left + itemRect.width / 2;
        const carouselCenter = carouselRect.left + carouselRect.width / 2;
        const scrollOffset = itemCenter - carouselCenter;

        const currentTransform = getComputedStyle(track).transform;
        let currentX = 0;
        if (currentTransform !== 'none') {
            const matrix = new WebKitCSSMatrix(currentTransform);
            currentX = matrix.m41;
        }

        const newTransform = currentX - scrollOffset;
        track.style.transform = `translateX(${newTransform}px)`;
    }

    function updateCarousel(index) {
        carouselItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
            dots[i]?.classList.toggle('active-dot', i === index);
        });
        requestAnimationFrame(() => centerItem(index));
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel(currentIndex);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel(currentIndex);
        });
    });

    carouselItems.forEach((item, i) => {
        item.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel(currentIndex);
        });
    });

    updateCarousel(currentIndex);
});

// Our Product Categories end ================================================

