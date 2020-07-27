// import { myTimer } from "../../src/index";
export let tesCurrSlide = 0;
export const sliders = [
  ...document.getElementsByClassName("testimonial__slider"),
];
export const dots = [
  ...document.getElementsByClassName("testimonial__dots-dot"),
];

let myTimer = setInterval(() => {
  plusSlider(tesCurrSlide, sliders, dots);
}, 3000);

export function showSlider(index, slidersArr, dotsArr) {
  for (let i = 0; i < slidersArr.length; i++) {
    if (tesCurrSlide > slidersArr.length - 1) {
      tesCurrSlide = 0;
    }
    if (i !== index) {
      slidersArr[i].className = "testimonial__slider";
      dotsArr[i].className = "testimonial__dots-dot";
    }
  }
  slidersArr[index].className = "testimonial__slider active";
  dotsArr[index].className = "testimonial__dots-dot active";
}

export function plusSlider(n, slidersArr, dotsArr) {
  clearInterval(myTimer);
  slidersArr[tesCurrSlide].className = "testimonial__slider left";
  dotsArr[tesCurrSlide].className = "testimonial__dots-dot";
  showSlider(tesCurrSlide++, slidersArr, dotsArr);

  myTimer = setInterval(() => {
    plusSlider(n + 1, slidersArr, dotsArr);
  }, 3000);
}

export function tesClick(n) {
  clearInterval(myTimer);
  myTimer = setInterval(() => {
    plusSlider(n + 1, sliders, dots);
  }, 3000);
  showSlider((tesCurrSlide = n), sliders, dots);
}
