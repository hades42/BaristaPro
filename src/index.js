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

// Slider for testimonial
let tesCurrSlide = 0;
const sliders = [...document.getElementsByClassName("testimonial__slider")];
const dots = [...document.getElementsByClassName("testimonial__dots-dot")];

showSlider(tesCurrSlide);
let myTimer = setInterval(() => {
  plusSlider(tesCurrSlide);
}, 3000);

function showSlider(index) {
  for (let i = 0; i < sliders.length; i++) {
    if (tesCurrSlide > sliders.length - 1) {
      tesCurrSlide = 0;
    }
    if (i !== index) {
      sliders[i].className = "testimonial__slider ";
      dots[i].className = "testimonial__dots-dot";
    }
  }
  sliders[index].className = "testimonial__slider active";
  dots[index].className = "testimonial__dots-dot active";
}

function plusSlider(n) {
  clearInterval(myTimer);
  sliders[tesCurrSlide].className = "testimonial__slider left";
  dots[tesCurrSlide].className = "testimonial__dots-dot";
  showSlider(tesCurrSlide++);

  myTimer = setInterval(() => {
    plusSlider(n + 1);
  }, 3000);
}

function tesClick(n) {
  clearInterval(myTimer);
  myTimer = setInterval(() => {
    plusSlider(n + 1);
  }, 3000);
  showSlider((tesCurrSlide = n));
}

window.tesClick = tesClick;

// Brand Slider
const brandContainer = document.querySelector(".brand__slider");
const allBox = brandContainer.children;
const containerWidth = brandContainer.offsetWidth;
const margin = 30;
let items = 0;
let jumpSlideWidth = 0;

const responsive = [
  { breakPoint: { width: 0, item: 1 } },
  { breakPoint: { width: 600, item: 3 } },
  { breakPoint: { width: 1000, item: 5 } },
];

function load() {
  for (let i = 0; i < responsive.length; i++) {
    if (window.innerWidth > responsive[i].breakPoint.width) {
      items = responsive[i].breakPoint.item;
    }
  }
  start();
}

function start() {
  let totalItemWidth = 0;
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].style.width = containerWidth / items - margin + "px";
    allBox[i].style.margin = margin / 2 + "px";
    totalItemWidth += containerWidth / items;
  }
  brandContainer.style.width = totalItemWidth + "px";
}

function moveItem() {
  jumpSlideWidth = jumpSlideWidth + containerWidth / items;
}

setInterval(moveItem, 4000);

window.onload = load();
console.log(items);
