import { scrollFunction } from "./app/scroll";
import "./scss/main.scss";

const navBarLight = document.querySelector(".navbar-light");
window.onscroll = function () {
  scrollFunction(navBarLight);
};

let slideIndex = 1;
showSlide(1);

function plusSlide(n) {
  showSlide((slideIndex += n));
  console.log(slideIndex);
}
function currentSlide(n) {
  showSlide((slideIndex = n));
}

window.plusSlide = plusSlide;
window.currentSlide = currentSlide;

function showSlide(n) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("slidershow__dots-dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].classList.remove("active");
    dots[i].classList.remove("active");
  }

  dots[slideIndex - 1].classList.add("active");
  slides[slideIndex - 1].style.display = "block";
  slides[slideIndex - 1].classList.add("active");
}
