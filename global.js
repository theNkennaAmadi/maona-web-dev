let selector = document.querySelector(".nav-highlight");
const navLinks = [...document.querySelectorAll(".nav-link")];
navLinks.map((link) => {
  link.addEventListener("mouseenter", () => {
    let state = Flip.getState(selector);
    link.append(selector);
    Flip.from(state, {
      duration: 0.6,
      ease: "expo.out",
    });
    selector.style.display = "block";
  });
  link.addEventListener("mouseleave", () => {
    selector.style.display = "none";
  });
});

window.addEventListener("load", () => {
  gsap.to(".page-wrapper", { autoAlpha: 1, duration: 0.5 });
});
