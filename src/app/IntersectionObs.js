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

export const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0.7) {
      entry.target.classList.add("appeared");
    }
  });
}, options);

export const cupObserver = new IntersectionObserver((entries) => {
  if (entries[0].intersectionRatio > 0) {
    entries[0].target.classList.add("moveUp");
    cupObserver.unobserve(entries[0].target);
  }
}, cupOptions);
