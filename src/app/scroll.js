export const scrollFunction = (root) => {
  if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
    root.style.top = "0";
  } else {
    root.style.top = "-7rem";
  }
};
