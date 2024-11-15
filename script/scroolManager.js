const scrollContainer = document.querySelector("main");
let lastScrollLeft = 0;

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
    update();
});

let startX = null;
let lastX = null;
let inertiaTimeout = null;
let velocity = 0;
const deceleration = 0.95;

scrollContainer.addEventListener("touchstart", (evt) => {
    startX = evt.touches[0].pageX;
    lastX = startX;
    velocity = 0;
    clearTimeout(inertiaTimeout);
});

scrollContainer.addEventListener("touchmove", (evt) => {
    if (startX !== null) {
        const deltaX = lastX - evt.touches[0].pageX;
        lastX = evt.touches[0].pageX;
        evt.preventDefault();
        scrollContainer.scrollLeft += deltaX;
        velocity = deltaX;
        update();
    }
});

scrollContainer.addEventListener("touchend", () => {
    if (startX !== null) {
        function inertiaScroll() {
            if (Math.abs(velocity) > 0.1) {
                scrollContainer.scrollLeft += velocity;
                velocity *= deceleration;
                requestAnimationFrame(inertiaScroll);
                update();
            }
        }

        requestAnimationFrame(inertiaScroll);
    }
});

const slider = document.querySelector('#galleryContainer');
let scrollInterval = null;

function toggleAutomaticScroll() {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
    } else {
        scrollInterval = setInterval(automaticScroll, 10);
    }
}

function automaticScroll() {
    const scrollAmount = 2;
    slider.scrollLeft += scrollAmount;

    if (Math.abs(slider.scrollLeft - lastScrollLeft) >= pixelsToLoadImage()) {
        lastScrollLeft = slider.scrollLeft;
    }

    if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
        clearInterval(scrollInterval);
        scrollInterval = null;
    }
}

// Gestione dello slider usando jQuery
$(document).ready(function () {
    const slider = $("#galleryContainer"); // Correzione del selettore

    slider.on("mousedown", function (e) {
        $(this).addClass("dragging"); // Usiamo $(this) invece di 'slider'
        e.preventDefault();
    });

    $(document).on("mouseup", function () {
        slider.removeClass("dragging"); // Usiamo 'slider' invece di 'scrollContainer'
    });

    slider.on("mouseenter", function () {
        $(this).css("cursor", "grab"); // Usiamo $(this) invece di 'slider'
    });

    slider.on("mouseleave", function () {
        $(this).css("cursor", ""); // Usiamo $(this) invece di 'slider'
    });

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.on('mousedown', (e) => { // Usiamo 'slider' invece di 'slider'
        isDown = true;
        slider.addClass('active'); // Usiamo 'slider' invece di 'slider'
        startX = e.pageX - slider.offset().left; // Usiamo 'slider' invece di 'slider' e correggiamo la proprietà 'offsetLeft'
        scrollLeft = slider.scrollLeft();
    });

    slider.on('mouseleave', () => { // Usiamo 'slider' invece di 'slider'
        isDown = false;
        slider.removeClass('active'); // Usiamo 'slider' invece di 'slider'
    });

    slider.on('mouseup', () => { // Usiamo 'slider' invece di 'slider'
        isDown = false;
        slider.removeClass('active'); // Usiamo 'slider' invece di 'slider'
    });

    slider.on('mousemove', (e) => { // Usiamo 'slider' invece di 'slider'
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offset().left; // Usiamo 'slider' invece di 'slider' e correggiamo la proprietà 'offsetLeft'
        const walk = (x - startX); //scroll-fast
        slider.scrollLeft(scrollLeft - walk); // Usiamo 'slider' invece di 'slider'
        update();
    });
});
