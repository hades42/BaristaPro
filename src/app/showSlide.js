export function showSlide(n) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("slidershow__dots-dot");
  if (n > slides.length) {
    n = 1;
  }
  if (n < 1) {
    n = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].classList.remove("active");
    dots[i].classList.remove("active");
  }

  dots[n - 1].classList.add("active");
  slides[n - 1].style.display = "block";
  slides[n - 1].classList.add("active");
}
