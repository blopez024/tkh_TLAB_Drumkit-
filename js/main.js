let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function playSound(e) {

    let audio;
    let key;

    if (slideIndex == 1) {
        audio = document.querySelector(`audio[data-drum="${e.keyCode}"]`);
        key = document.querySelector(`.key[data-drum="${e.keyCode}"]`);

    }
    else if (slideIndex == 2) {
        audio = document.querySelector(`audio[data-guitar="${e.keyCode}"]`);
        key = document.querySelector(`.key[data-guitar="${e.keyCode}"]`);
    }

    // const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    // const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    if (!audio) return;

    audio.currentTime = 0; // rewind to the start
    audio.play();

    key.classList.add('playing');
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return; // skip

    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach((key) =>
    key.addEventListener('transitionend', removeTransition),
);

window.addEventListener('keydown', playSound);