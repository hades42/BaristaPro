import { scrollFunction } from "./app/scroll";
import { showSlide } from "./app/showSlide";
import { observer, cupObserver } from "./app/IntersectionObs";
import {
  showSlider,
  plusSlider,
  tesClick,
  tesCurrSlide,
  sliders,
  dots,
} from "./app/Testimonial";
import "./scss/main.scss";

const navBarLight = document.querySelector(".navbar-light");
window.onscroll = function () {
  scrollFunction(navBarLight);
};

// Slider intro
let slideIndex = 1;
showSlide(slideIndex);

function plusSlide(n) {
  showSlide((slideIndex += n));
}

function currentSlide(n) {
  showSlide((slideIndex = n));
}
window.plusSlide = plusSlide;
window.currentSlide = currentSlide;

// lazy loading

const boxs = [...document.getElementsByClassName("category__box")];
const cup = document.getElementsByClassName("category__cup");

cupObserver.observe(cup[0]);
boxs.forEach((box) => {
  observer.observe(box);
});

// Slider for testimonial
showSlider(tesCurrSlide, sliders, dots);
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
// console.log(items);

// To Top button
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 700) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});

function smoothScroll(name, duration) {
  const target = document.querySelector(name);
  let targetPosition = target.getBoundingClientRect().top;
  let startPosition = window.pageYOffset;
  let distance = targetPosition - startPosition;
  let startTime = null;

  function animationScroll(currentTime) {
    if (startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;
    let run = easeInOut(timeElapsed, startPosition, distance, duration);
    window.scroll(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animationScroll);
    // console.log(timeElapsed + ", " + duration);
  }

  function easeInOut(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t * t + b;
    t -= 2;
    return (-c / 2) * (t * t * t * t - 2) + b;
  }

  requestAnimationFrame(animationScroll);
}

let toTopBtn = document.querySelector(".to-top");

toTopBtn.addEventListener("click", () => {
  smoothScroll(".slidershow", 2000);
});

// console.log(document.querySelector(".t"));
const edge = document.querySelector(".edge");
const navEdge = document.querySelectorAll(".fas.fa-bars");
const container = document.querySelector(".container");
const closeEdge = document.querySelector(".edge__close");

// console.log(navEdge);
navEdge.forEach((el) =>
  el.addEventListener("click", () => {
    container.className = "container show-edge";
    edge.style.top = `${document.documentElement.scrollTop}px`;
    // console.log(pageYOffset);
  })
);

closeEdge.addEventListener("click", () => {
  container.className = "container";
});

window.addEventListener("scroll", () => {
  if (container.classList.contains("show-edge")) {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      container.className = "container";
    }
  }
});

//  Accordion
const mainHeader = document.querySelector(".navbar__headerwrap");
const mainBody = mainHeader.nextElementSibling;
let mainBodyHeigh = mainBody.scrollHeight;
const origin = mainBodyHeigh;

mainHeader.addEventListener("click", (e) => {
  mainHeader.classList.toggle("active");

  if (mainHeader.classList.contains("active")) {
    mainBody.style.maxHeight = mainBodyHeigh + "px";
  } else {
    mainBodyHeigh = origin;
    mainBody.style.maxHeight = 0;
    removeAllHeight(headerWrap);
  }
});

const headerWrap = document.querySelectorAll(".navbar__headerwrap--small");

headerWrap.forEach((headerItem) => {
  headerItem.addEventListener("click", (e) => {
    headerItem.classList.toggle("active");

    const body = headerItem.nextElementSibling;
    if (headerItem.classList.contains("active")) {
      mainBodyHeigh += body.scrollHeight;
      body.style.maxHeight = body.scrollHeight + "px";
      mainBody.style.maxHeight = mainBodyHeigh + "px";
    } else {
      // mainBody.style.maxHeight -= body.scrollHeight + "px";
      body.style.maxHeight = 0;
      mainBodyHeigh -= body.scrollHeight;
      mainBody.style.maxHeight = mainBodyHeigh + "px";
    }
  });
});

function removeAllHeight(allHeader) {
  allHeader.forEach((header) => {
    header.classList.remove("active");
    const body = header.nextElementSibling;
    body.style.maxHeight = 0;
  });
}
