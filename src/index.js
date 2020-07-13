import { scrollFunction } from "./app/scroll";
import "./scss/main.scss";

const navBarLight = document.querySelector(".navbar-light");
window.onscroll = function () {
  scrollFunction(navBarLight);
};

// Slider intro
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

const options = {
  root: null,
  threshold: 0.7,
  rootMargin: "0px 0px -50px 0px",
};
const cupOptions = {
  root: null,
  threshold: 0,
  rootMargin: "0px 0px -50px 0px",
};

const boxs = [...document.getElementsByClassName("category__box")];
const cup = document.getElementsByClassName("category__cup");

const observer = new IntersectionObserver((entries) => {
  // console.log(entries);
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0.7) {
      entry.target.classList.add("appeared");
    }
  });
}, options);

const cupObserver = new IntersectionObserver((entries) => {
  if (entries[0].intersectionRatio > 0) {
    entries[0].target.classList.add("moveUp");
    cupObserver.unobserve(entries[0].target);
  }
}, cupOptions);

cupObserver.observe(cup[0]);

boxs.forEach((box) => {
  observer.observe(box);
});
