// Año dinámico en footer
document.getElementById('year').textContent = new Date().getFullYear();

// Formulario contacto
const form = document.querySelector('form');
form.addEventListener('submit', function(e){
  e.preventDefault();
  alert("¡Gracias por preferirnos, te responderemos a la brevedad!");
  form.reset();
});

// Slider productos destacados
const track = document.querySelector('.slider-track');
const slides = Array.from(track.children);
const slideWidth = slides[0].getBoundingClientRect().width + 24; // ancho + gap
let slideIndex = 0;

function moveSlider() {
  slideIndex++;
  if(slideIndex > slides.length - 2) { // 3 visibles
    slideIndex = 0; // vuelve al primero
  }
  track.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
}

setInterval(moveSlider, 3000);
